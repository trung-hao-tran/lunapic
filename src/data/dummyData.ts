/**
 * Dummy data for pages that haven't been configured yet
 * TODO: Move this data to content management system when configuring the work page
 */

import type { ShowreelItem, CategoryFilter } from '@/types/content.types';

// ==================== SHOWREEL ITEMS ====================
// TODO: Move to content/pages/work/showreel.json when configuring work page

export const showreelItems: ShowreelItem[] = [
    {
        id: '1',
        number: '01',
        title: 'THE SMOKE',
        date: "Aug '25",
        client: 'COMPANY',
        type: 'COMMERCIAL',
        image: '/images/projects/proj1.png'
    },
    {
        id: '2',
        number: '02',
        title: 'VIDEO TITLE',
        date: "Aug '25",
        client: 'COMPANY',
        type: 'COMMERCIAL',
        image: '/images/projects/proj2.png'
    },
    {
        id: '3',
        number: '03',
        title: 'URBAN NIGHTS',
        date: "Sep '25",
        client: 'STUDIO X',
        type: 'MUSIC VIDEO',
        image: '/images/projects/proj3.png'
    },
    {
        id: '4',
        number: '04',
        title: 'REFLECTION',
        date: "Oct '25",
        client: 'BRAND CO',
        type: 'DOCUMENTARY',
        image: '/images/projects/proj4.png'
    }
];

// ==================== CATEGORY FILTERS ====================
// TODO: Move to content/pages/work/categories.json when configuring work page

export const categoryFilters: CategoryFilter[] = [
    { id: 'commercial', label: 'Commercial', count: 12 },
    { id: 'documentary', label: 'Documentary', count: 8 },
    { id: 'music-video', label: 'Music Video', count: 15 },
    { id: 'corporate', label: 'Corporate', count: 6 },
    { id: 'social-media', label: 'Social Media', count: 20 },
    { id: 'event', label: 'Event Coverage', count: 4 },
    { id: 'animation', label: 'Animation', count: 9 },
    { id: 'short-film', label: 'Short Film', count: 3 }
];

// ==================== PORTFOLIO ITEMS ====================
// MIGRATED: Portfolio items now loaded from content/shared/portfolio-items/
// Use loadPagePortfolio(), loadAllPortfolioItems(), or loadPortfolioItem() from @/lib/dataLoader
