import { readFile, readdir, access } from 'fs/promises';
import { join } from 'path';
import type { PortfolioItem, Testimonial, HomepageConfig } from '@/types/content.types';
import type { TeamMember, AccordionItem, ShowreelItem, CategoryFilter } from '@/data/dummyData';

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
export async function loadPageConfig(page: string): Promise<Record<string, unknown>>;
export async function loadPageConfig(page: string): Promise<HomepageConfig | Record<string, unknown>> {
    const configPath = join(CONTENT_DIR, 'pages', page, 'config.json');
    const config = await readJsonFile<HomepageConfig | Record<string, unknown>>(configPath);

    // If config references markdown files, load them
    const configRecord = config as Record<string, unknown>;
    if (
        typeof configRecord.introText === 'string' &&
        configRecord.introText.endsWith('.md')
    ) {
        const mdPath = join(CONTENT_DIR, 'pages', page, configRecord.introText);
        configRecord.introTextContent = await readMarkdownFile(mdPath);
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

// ==================== TEAM MEMBERS ====================

/**
 * Load page-specific team members
 * Merges shared team data with page-specific order
 */
export async function loadPageTeam(page: string): Promise<TeamMember[]> {
    const teamPath = join(CONTENT_DIR, 'pages', page, 'team.json');
    const teamData = await readJsonFile<{ members: Array<{ memberId: string; order: number }> }>(teamPath);

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
