/**
 * Content types for Luna Pictures website
 * Types are organized by page/feature
 */

// ==================== PORTFOLIO ====================

/**
 * Portfolio item/project
 * Used for: Homepage portfolio gallery, Portfolio detail pages
 */
export interface PortfolioItem {
    id: string;
    title: string;
    date: string;
    categories: string[]; // Array of categories since one video might have multiple
    thumbnail: string;
    featureThumbnail?: string; // Large feature image for showreel/featured gallery
    order: number; // Determines sequence (1, 2, 3...)
    weight?: number; // How much space item takes (default: 1, min: 1, max: 3.1)

    // Portfolio detail page fields - URL will be /portfolio/{id}
    description?: string; // Project description
    headerLeft?: string; // Video URL or image path for left header
    headerRight?: string; // Video URL or image path for right header
    projectOverview?: string; // Detailed project overview text
    crew?: string[]; // Array of crew member names or IDs involved in the project
    gallery?: string[]; // Array of image URLs for horizontal gallery
    tags?: string[]; // Array of tags (e.g., ["VFX", "Production"])
    client?: string; // Client name for featured display
    type?: string; // Project type for featured display
}

// ==================== TESTIMONIALS ====================

/**
 * Client testimonial
 * Used for: Homepage testimonials section
 */
export interface Testimonial {
    id: string;
    name: string;
    title: string;
    company: string;
    quote: string; // Use [brackets] for highlighted text
    image: string;
    signatureImage?: string;
}

// ==================== TEAM MEMBERS ====================

/**
 * Team member data
 * Used for: About page, VFX page, Production page
 */
export interface TeamMember {
    id: string;
    name: string;
    role: string;
    tags: string[]; // Array of teams (e.g., ["VFX", "Production"])
    image: string;
    description: string; // Short description
    fullBio?: string; // Full biography in markdown format
    email?: string;
    phone?: string;
    contactLink?: string; // Link for "Get In Touch" button
}

// ==================== PAGE CONFIGURATIONS ====================

/**
 * Homepage configuration structure
 * Used for: Homepage (/) page configuration
 */
export interface HomepageConfig {
    hero: {
        backgroundMedia: string; // Image or YouTube/Vimeo URL
        mediaType?: 'image' | 'youtube' | 'vimeo'; // Type of media (default: 'image')
        subtitle: string;
    };
    aboutUs: {
        heading: string; // Use [brackets] for highlighted text
        description: string;
        image: string;
    };
    ourWork: {
        showreelUrl: string; // YouTube/Vimeo embed URL
        galleryConfig: {
            hasViewWorkButton: boolean;
            hasViewMoreButton: boolean;
        };
    };
    testimonials: {
        bannerNumber: number; // Number to animate to
    };
}

/**
 * About page configuration structure
 * Used for: About (/about) page configuration
 * Only includes customizable content (hero media, banner image, story content, mission statement)
 * Titles, section numbers, and other static text remain hardcoded
 */
export interface AboutConfig {
    hero: {
        backgroundMedia: string;
        mediaType?: 'image' | 'youtube' | 'vimeo';
    };
    ourStory: {
        content: string; // Path to markdown file (e.g., "story.md")
        contentText?: string; // Loaded markdown content (populated by dataLoader)
    };
    ourMission: {
        bannerImage: string;
        statement: string; // Mission statement text
    };
}

/**
 * VFX page configuration structure
 * Used for: VFX (/vfx) page configuration
 * Only includes customizable content (hero media, why choose us content)
 * Titles, section numbers, button links remain hardcoded
 */
export interface VFXConfig {
    hero: {
        backgroundMedia: string;
        mediaType?: 'image' | 'youtube' | 'vimeo';
    };
    whyChooseUs: {
        content: string; // Path to markdown file (e.g., "why-choose-us.md")
        contentText?: string; // Loaded markdown content (populated by dataLoader)
    };
}
