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

export const ourStoryText = `[Over the past three decades, Luna Pictures has been delighting and inspiring audiences worldwide, by creating some of Hollywood's most memorable screen moments.] /newline
RSP was established in 1995 in Adelaide, South Australia, by co-founders Tony Clark, Wayne Lewis and Gail Fuller, who named it after the Rising Sun Inn, the site of the first board meeting which was held over a Coopers Ale.
RSP's notable clients include Disney, Marvel, Warner Bros., Netflix, Amazon, and MGM, among many others.
Its Adelaide studio is home to more than 240 exceptional crew who enjoy the advantage of being located in one of the world's most liveable cities. Its sterling reputation, cemented by its creative leadership, has made it a trusted partner for studios and filmmakers worldwide.
Focusing on producing only the highest quality and innovative solutions, RSP has an extremely flexible, custom pipeline, which allows the company to scale up quickly and adjust its workflow to meet the needs of clients and audiences' demand for ever more spectacular visuals.
RSP has received countless awards for its work over the years, including the 2020 Australian Academy of Cinema and Television Arts (AACTA) 'Award for Best Visual Effects or Animation' for its work on The Eight Hundred, the winner of the Creative Industries award at the 57th Australian 2019 Export Awards, a plethora of Visual Effects Society (VES) and AEAF awards, accolades for its work on the Quicksilver Pentagon Kitchen sequence in X-Men: Days of Future Past including both an Academy Award ® and BAFTA Award nomination, as well as honours for its work on the 2013 Academy-Award® winning Gravity.`;
