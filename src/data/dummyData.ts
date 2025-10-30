/**
 * Dummy data for pages that haven't been configured yet
 * TODO: Move this data to content management system when configuring the work page
 */

import type { ShowreelItem, CategoryFilter, PortfolioItem } from '@/types/content.types';

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
// TODO: Move to content/pages/work/portfolio.json when configuring work page
// TEMPORARY: This is a band-aid fix. You should migrate to the content system instead.

export const portfolioItems: PortfolioItem[] = [
    {
        id: '1',
        title: 'Urban Dreams (2020)',
        date: "Mai 3 2020",
        categories: ['Documentary'],
        tags: ['VFX', 'Production'],
        thumbnail: '/images/projects/proj1.png',
        order: 1,
        weight: 1.5
    },
    {
        id: '2',
        title: 'Sunset Sessions',
        date: "Jun 15 2021",
        categories: ['Music Video'],
        tags: ['VFX', 'Production'],
        thumbnail: '/images/projects/proj2.png',
        order: 2,
        weight: 1.8
    },
    {
        id: '3',
        title: 'Light Symphony',
        date: "Sep 22 2022",
        categories: ['Commercial'],
        tags: ['VFX'],
        thumbnail: '/images/projects/proj3.png',
        order: 3,
        weight: 1.25
    },
    {
        id: '4',
        title: 'Behind The Lens',
        date: "Dec 10 2023",
        categories: ['Documentary'],
        tags: ['Production'],
        thumbnail: '/images/projects/proj4.png',
        order: 4,
        weight: 2.0
    },
    {
        id: '5',
        title: 'City Lights',
        date: "Mar 5 2024",
        categories: ['Music Video'],
        tags: ['VFX', 'Production'],
        thumbnail: '/images/projects/proj1.png',
        order: 5,
        weight: 1.3
    },
    {
        id: '6',
        title: 'Ocean Waves',
        date: "Apr 20 2024",
        categories: ['Corporate'],
        tags: ['Production'],
        thumbnail: '/images/projects/proj2.png',
        order: 6,
        weight: 1.6
    },
    {
        id: '7',
        title: 'Mountain Peak',
        date: "May 30 2024",
        categories: ['Documentary'],
        tags: ['VFX'],
        thumbnail: '/images/projects/proj3.png',
        order: 7,
        weight: 1.4
    },
    {
        id: '8',
        title: 'Digital Dreams',
        date: "Jul 8 2024",
        categories: ['Animation'],
        tags: ['VFX'],
        thumbnail: '/images/projects/proj4.png',
        order: 8,
        weight: 2.2
    }
];
