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

// ==================== PAGE CONFIGURATIONS ====================

/**
 * Homepage configuration structure
 * Used for: Homepage (/) page configuration
 */
export interface HomepageConfig {
    hero: {
        backgroundMedia: string; // Video or image URL
        mediaType?: 'image' | 'video' | 'youtube' | 'vimeo'; // Type of media (default: 'video')
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
