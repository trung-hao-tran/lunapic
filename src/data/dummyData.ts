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

export interface Testimonial {
    id: string;
    name: string;
    title: string;
    company: string;
    quote: string;
    image: string;
    signatureImage?: string;
}

export const testimonials: Testimonial[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        title: 'Director, Creative Studios',
        company: 'MG',
        quote: 'Luna Pictures transformed our vision into something [extraordinary]. Their attention to detail and creative expertise exceeded all our expectations. The final result was simply [breathtaking].',
        image: '/images/testimonial-1.jpg'
    },
    {
        id: '2',
        name: 'Michael Chen',
        title: 'CEO, Tech Innovations',
        company: 'TI',
        quote: 'Working with Luna Pictures was an absolute pleasure. Their professionalism and artistic vision brought our brand story to life in ways we never imagined possible.',
        image: '/images/testimonial-2.jpg'
    },
    {
        id: '3',
        name: 'Emma Rodriguez',
        title: 'Marketing Director',
        company: 'BR',
        quote: 'The team at Luna Pictures is exceptional. They understood our needs perfectly and delivered beyond our wildest expectations. Truly a game-changing partnership.',
        image: '/images/testimonial-3.jpg'
    }
];
