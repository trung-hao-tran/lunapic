export interface PortfolioItem {
    id: string;
    title: string;
    date: string;
    category: string;
    image: string;
    href?: string;
    weight?: number; // How many slots this item takes (default: 1). E.g., 1.5 = 1.5x width
    height?: string; // Optional fixed height for this item (e.g., "400px")
    row?: number; // Which row this item belongs to
}

export const portfolioItems: PortfolioItem[] = [
    {
        id: '1',
        title: 'Urban Dreams',
        date: 'Mai 3 2020',
        category: 'Documentary',
        image: '/images/portfolio-1.jpg',
        href: '#',
        weight: 1.5,
        height: '400px',
        row: 1
    },
    {
        id: '2',
        title: 'Sunset Sessions',
        date: 'Mai 3 2020',
        category: 'Music Video',
        image: '/images/portfolio-2.jpg',
        href: '#',
        weight: 2.25,
        height: '400px',
        row: 1
    },
    {
        id: '3',
        title: 'Behind the Lens',
        date: 'Mai 3 2020',
        category: 'Commercial',
        image: '/images/portfolio-3.jpg',
        href: '#',
        weight: 1,
        row: 2
    },
    {
        id: '4',
        title: 'Light Symphony',
        date: 'Mai 3 2020',
        category: 'Event',
        image: '/images/portfolio-4.jpg',
        href: '#',
        weight: 1,
        row: 2
    },
    {
        id: '5',
        title: 'Cinematic Moments',
        date: 'Mai 3 2020',
        category: 'Commercial',
        image: '/images/portfolio-5.jpg',
        href: '#',
        weight: 1,
        row: 2
    }
];
