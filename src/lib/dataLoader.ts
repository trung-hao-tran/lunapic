import { readFile, readdir, access } from 'fs/promises';
import { join } from 'path';
import type {
    PortfolioItem,
    Testimonial,
    HomepageConfig,
    AboutConfig,
    VFXConfig,
    ProductionConfig,
    ContactConfig,
    WorkConfig,
    TeamMember,
    AccordionItem,
    ShowreelItem,
    CategoryFilter
} from '@/types/content.types';

// Content directory path
const CONTENT_DIR = join(process.cwd(), 'content');

/**
 * Helper function to safely read JSON files
 */
async function readJsonFile<T>(filePath: string): Promise<T> {
    try {
        const data = await readFile(filePath, 'utf-8');

        return JSON.parse(data) as T;
    } catch (error) {
        console.error(`Error reading JSON file at ${filePath}:`, error);
        throw new Error(`Failed to load data from ${filePath}`);
    }
}

/**
 * Helper function to safely read markdown files
 * Returns empty string if file doesn't exist
 */
async function readMarkdownFile(filePath: string): Promise<string> {
    try {
        return await readFile(filePath, 'utf-8');
    } catch (error) {
        // File doesn't exist, return empty string
        return '';
    }
}

// ==================== PAGE CONFIGURATION ====================

/**
 * Load page configuration (config.json)
 * Automatically loads any referenced markdown files
 */
export async function loadPageConfig(page: 'homepage'): Promise<HomepageConfig>;
export async function loadPageConfig(page: 'about'): Promise<AboutConfig>;
export async function loadPageConfig(page: 'vfx'): Promise<VFXConfig>;
export async function loadPageConfig(page: 'production'): Promise<ProductionConfig>;
export async function loadPageConfig(page: 'contact'): Promise<ContactConfig>;
export async function loadPageConfig(page: 'work'): Promise<WorkConfig>;
export async function loadPageConfig(page: string): Promise<Record<string, unknown>>;
export async function loadPageConfig(page: string): Promise<HomepageConfig | AboutConfig | VFXConfig | ProductionConfig | ContactConfig | WorkConfig | Record<string, unknown>> {
    const configPath = join(CONTENT_DIR, 'pages', page, 'config.json');
    const config = await readJsonFile<HomepageConfig | AboutConfig | VFXConfig | ProductionConfig | ContactConfig | Record<string, unknown>>(configPath);

    // If config references markdown files, load them
    const configRecord = config as Record<string, unknown>;

    // Check for introText (general case)
    if (
        typeof configRecord.introText === 'string' &&
        configRecord.introText.endsWith('.md')
    ) {
        const mdPath = join(CONTENT_DIR, 'pages', page, configRecord.introText);
        configRecord.introTextContent = await readMarkdownFile(mdPath);
    }

    // Check for ourStory.content (About page specific)
    if (
        configRecord.ourStory &&
        typeof configRecord.ourStory === 'object' &&
        'content' in configRecord.ourStory &&
        typeof configRecord.ourStory.content === 'string' &&
        configRecord.ourStory.content.endsWith('.md')
    ) {
        const mdPath = join(CONTENT_DIR, 'pages', page, configRecord.ourStory.content);
        const storyContent = await readMarkdownFile(mdPath);
        (configRecord.ourStory as Record<string, unknown>).contentText = storyContent;
    }

    // Check for whyChooseUs.content (VFX/Production page specific)
    if (
        configRecord.whyChooseUs &&
        typeof configRecord.whyChooseUs === 'object' &&
        'content' in configRecord.whyChooseUs &&
        typeof configRecord.whyChooseUs.content === 'string' &&
        configRecord.whyChooseUs.content.endsWith('.md')
    ) {
        const mdPath = join(CONTENT_DIR, 'pages', page, configRecord.whyChooseUs.content);
        const whyChooseUsContent = await readMarkdownFile(mdPath);
        (configRecord.whyChooseUs as Record<string, unknown>).contentText = whyChooseUsContent;
    }

    return config;
}

// ==================== PORTFOLIO ITEMS ====================

/**
 * Load page-specific portfolio items
 * Merges shared portfolio data with page-specific order/weight
 */
export async function loadPagePortfolio(page: string): Promise<PortfolioItem[]> {
    // Load page portfolio references
    const portfolioPath = join(CONTENT_DIR, 'pages', page, 'portfolio.json');
    const portfolioData = await readJsonFile<{ items: Array<{ itemId: string; order: number; weight?: number }> }>(
        portfolioPath
    );

    // Load each referenced item from shared pool
    const items = await Promise.all(
        portfolioData.items.map(async (ref) => {
            const itemPath = join(CONTENT_DIR, 'shared', 'portfolio-items', ref.itemId, 'data.json');
            const itemData = await readJsonFile<PortfolioItem>(itemPath);

            // Load markdown overview if exists
            const overviewPath = join(CONTENT_DIR, 'shared', 'portfolio-items', ref.itemId, 'overview.md');
            const overview = await readMarkdownFile(overviewPath);

            return {
                ...itemData,
                projectOverview: overview || itemData.projectOverview,
                order: ref.order, // Use page-specific order
                weight: ref.weight ?? itemData.weight // Use page-specific weight or fallback to item default
            };
        })
    );

    // Sort by order
    return items.sort((a, b) => a.order - b.order);
}

/**
 * Load a single portfolio item by ID (for detail pages)
 */
export async function loadPortfolioItem(itemId: string): Promise<PortfolioItem> {
    const itemPath = join(CONTENT_DIR, 'shared', 'portfolio-items', itemId, 'data.json');
    const itemData = await readJsonFile<PortfolioItem>(itemPath);

    // Load overview markdown
    const overviewPath = join(CONTENT_DIR, 'shared', 'portfolio-items', itemId, 'overview.md');
    const overview = await readMarkdownFile(overviewPath);

    return {
        ...itemData,
        projectOverview: overview || itemData.projectOverview
    };
}

/**
 * Get all portfolio item IDs (for generateStaticParams)
 */
export async function getAllPortfolioIds(): Promise<string[]> {
    const itemsDir = join(CONTENT_DIR, 'shared', 'portfolio-items');
    const entries = await readdir(itemsDir, { withFileTypes: true });

    return entries
        .filter((entry) => entry.isDirectory() && entry.name !== '_template')
        .map((entry) => entry.name);
}

/**
 * Load ALL portfolio items from shared pool (for work page)
 * Does not use page-specific order/weight
 */
export async function loadAllPortfolioItems(): Promise<PortfolioItem[]> {
    const allItemIds = await getAllPortfolioIds();

    const items = await Promise.all(
        allItemIds.map(async (itemId) => {
            return await loadPortfolioItem(itemId);
        })
    );

    return items;
}

/**
 * Load work page portfolio items (VFX and Production sections separately)
 * Each section has manually configured items with custom ratios
 */
export async function loadWorkPortfolio(): Promise<{
    vfxItems: PortfolioItem[];
    productionItems: PortfolioItem[];
}> {
    const portfolioPath = join(CONTENT_DIR, 'pages', 'work', 'portfolio.json');
    const portfolioData = await readJsonFile<{
        vfxItems: Array<{ itemId: string; order: number; ratio?: '9:16' | '16:9' | '4:3' | '3:4' }>;
        productionItems: Array<{ itemId: string; order: number; ratio?: '9:16' | '16:9' | '4:3' | '3:4' }>;
    }>(portfolioPath);

    // Load VFX items
    const vfxItems = await Promise.all(
        portfolioData.vfxItems.map(async (ref) => {
            const itemPath = join(CONTENT_DIR, 'shared', 'portfolio-items', ref.itemId, 'data.json');
            const itemData = await readJsonFile<PortfolioItem>(itemPath);

            const overviewPath = join(CONTENT_DIR, 'shared', 'portfolio-items', ref.itemId, 'overview.md');
            const overview = await readMarkdownFile(overviewPath);

            return {
                ...itemData,
                projectOverview: overview || itemData.projectOverview,
                order: ref.order,
                ratio: ref.ratio ?? itemData.ratio
            };
        })
    );

    // Load Production items
    const productionItems = await Promise.all(
        portfolioData.productionItems.map(async (ref) => {
            const itemPath = join(CONTENT_DIR, 'shared', 'portfolio-items', ref.itemId, 'data.json');
            const itemData = await readJsonFile<PortfolioItem>(itemPath);

            const overviewPath = join(CONTENT_DIR, 'shared', 'portfolio-items', ref.itemId, 'overview.md');
            const overview = await readMarkdownFile(overviewPath);

            return {
                ...itemData,
                projectOverview: overview || itemData.projectOverview,
                order: ref.order,
                ratio: ref.ratio ?? itemData.ratio
            };
        })
    );

    return {
        vfxItems: vfxItems.sort((a, b) => a.order - b.order),
        productionItems: productionItems.sort((a, b) => a.order - b.order)
    };
}

// ==================== TEAM MEMBERS ====================

/**
 * Load page-specific team members
 * Merges shared team data with page-specific order
 * If team.json is empty/blank, returns all team members (or filtered by tags if specified)
 * Supports filterByTags to show only team members with specific tags
 */
export async function loadPageTeam(page: string): Promise<TeamMember[]> {
    const teamPath = join(CONTENT_DIR, 'pages', page, 'team.json');
    const teamData = await readJsonFile<{
        filterByTags?: string[];
        members: Array<{ memberId: string; order: number }>;
    }>(teamPath);

    // If members array is empty, load all members (or filtered by tags)
    if (!teamData.members || teamData.members.length === 0) {
        if (teamData.filterByTags && teamData.filterByTags.length > 0) {
            // Filter by tags
            return await loadTeamByTags(teamData.filterByTags);
        }

        // Return all team members
        return await loadAllTeamMembers();
    }

    const members = await Promise.all(
        teamData.members.map(async (ref) => {
            const memberPath = join(CONTENT_DIR, 'shared', 'team-members', ref.memberId, 'data.json');
            const memberData = await readJsonFile<TeamMember>(memberPath);

            // Load markdown bio if exists
            const bioPath = join(CONTENT_DIR, 'shared', 'team-members', ref.memberId, 'bio.md');
            const bio = await readMarkdownFile(bioPath);

            return {
                ...memberData,
                fullBio: bio || memberData.fullBio,
                order: ref.order
            } as TeamMember & { order: number };
        })
    );

    // Sort by order
    return members.sort((a, b) => {
        const aOrder = (a as TeamMember & { order: number }).order;
        const bOrder = (b as TeamMember & { order: number }).order;

        return aOrder - bOrder;
    });
}

/**
 * Load a single team member by ID (for detail pages)
 */
export async function loadTeamMember(memberId: string): Promise<TeamMember> {
    const memberPath = join(CONTENT_DIR, 'shared', 'team-members', memberId, 'data.json');
    const memberData = await readJsonFile<TeamMember>(memberPath);

    // Load bio markdown
    const bioPath = join(CONTENT_DIR, 'shared', 'team-members', memberId, 'bio.md');
    const bio = await readMarkdownFile(bioPath);

    return {
        ...memberData,
        fullBio: bio || memberData.fullBio
    };
}

/**
 * Get all team member IDs (for generateStaticParams)
 */
export async function getAllTeamMemberIds(): Promise<string[]> {
    const membersDir = join(CONTENT_DIR, 'shared', 'team-members');
    const entries = await readdir(membersDir, { withFileTypes: true });

    return entries
        .filter((entry) => entry.isDirectory() && entry.name !== '_template')
        .map((entry) => entry.name);
}

/**
 * Load all team members (no filtering)
 */
export async function loadAllTeamMembers(): Promise<TeamMember[]> {
    const allMemberIds = await getAllTeamMemberIds();

    const members = await Promise.all(
        allMemberIds.map(async (memberId) => {
            return await loadTeamMember(memberId);
        })
    );

    return members;
}

/**
 * Load team members filtered by tags (e.g., only VFX or Production)
 */
export async function loadTeamByTags(tags: string[]): Promise<TeamMember[]> {
    const allMemberIds = await getAllTeamMemberIds();

    const members = await Promise.all(
        allMemberIds.map(async (memberId) => {
            return await loadTeamMember(memberId);
        })
    );

    // Filter by tags
    return members.filter((member) => member.tags?.some((tag) => tags.includes(tag)));
}

// ==================== TESTIMONIALS ====================

/**
 * Load testimonials for a specific page or default to homepage
 */
export async function loadTestimonials(page: string = 'homepage'): Promise<Testimonial[]> {
    const filePath = join(CONTENT_DIR, 'pages', page, 'testimonials.json');
    const data = await readJsonFile<{ items: Testimonial[] }>(filePath);

    return data.items;
}

// ==================== FAQ ====================

/**
 * Load FAQ items for a specific page or default to about page
 */
export async function loadFAQ(page: string = 'about'): Promise<AccordionItem[]> {
    const filePath = join(CONTENT_DIR, 'pages', page, 'faq.json');
    const data = await readJsonFile<{ items: AccordionItem[] }>(filePath);

    return data.items;
}

// ==================== SHOWREEL ====================

/**
 * Load showreel items
 */
export async function loadShowreelItems(page: string = 'work'): Promise<ShowreelItem[]> {
    const filePath = join(CONTENT_DIR, 'pages', page, 'showreel.json');
    const data = await readJsonFile<{ items: ShowreelItem[] }>(filePath);

    return data.items;
}

// ==================== CATEGORY FILTERS ====================

/**
 * Load category filters for portfolio filtering
 */
export async function loadCategoryFilters(page: string = 'work'): Promise<CategoryFilter[]> {
    const filePath = join(CONTENT_DIR, 'pages', page, 'categories.json');
    const data = await readJsonFile<{ filters: CategoryFilter[] }>(filePath);

    return data.filters;
}

/**
 * Generate dynamic category filters for work page
 * Extracts unique categories from all portfolio items
 * Filters by whitelist if provided in categories.json
 * Calculates item counts for each category
 */
export async function loadWorkCategories(): Promise<CategoryFilter[]> {
    // Load all portfolio items
    const allItems = await loadAllPortfolioItems();

    // Load whitelist from categories.json
    const categoriesPath = join(CONTENT_DIR, 'pages', 'work', 'categories.json');
    const categoriesData = await readJsonFile<{ whitelist: string[] }>(categoriesPath);
    const whitelist = categoriesData.whitelist || [];

    // Extract all unique categories from portfolio items
    const categoryMap = new Map<string, number>();

    allItems.forEach((item) => {
        item.categories.forEach((category) => {
            const count = categoryMap.get(category) || 0;
            categoryMap.set(category, count + 1);
        });
    });

    // Convert to CategoryFilter array
    let categories = Array.from(categoryMap.entries()).map(([label, count]) => ({
        id: label.toLowerCase().replace(/\s+/g, '-'),
        label,
        count
    }));

    // Filter by whitelist if not empty
    if (whitelist.length > 0) {
        categories = categories.filter((cat) => whitelist.includes(cat.label));
    }

    // Sort alphabetically by label
    return categories.sort((a, b) => a.label.localeCompare(b.label));
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Check if a content file exists
 */
export async function contentExists(relativePath: string): Promise<boolean> {
    try {
        const fullPath = join(CONTENT_DIR, relativePath);
        await access(fullPath);

        return true;
    } catch {
        return false;
    }
}

/**
 * Load raw markdown content from any path relative to content directory
 */
export async function loadMarkdownContent(relativePath: string): Promise<string> {
    const fullPath = join(CONTENT_DIR, relativePath);

    return await readMarkdownFile(fullPath);
}
