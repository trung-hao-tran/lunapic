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
}

export const portfolioItems: PortfolioItem[] = [
    {
        id: '1',
        title: 'Urban Dreams (2020)',
        date: 'Mai 3 2020',
        categories: ['Documentary'],
        thumbnail: '/images/portfolio-1.jpg',
        order: 1,
        weight: 1.25,
        description:
            'Lorem ipsum dolor sit amet consectetur. Ipsum nibh odio dolor nulla eget adipiscing eget turpis dignissim suspendisse dictum nulla amet turpis facilisis magna vehicula elementum aliquam pharetra sit pellentesque feugiat turpis aliquam sem commodo aliquet volutpat ultricies egestas ipsum egestas iaculis magnis.',
        headerLeft: '/images/placeholder.png',
        headerRight: '/images/placeholder.png',
        projectOverview:
            'Venenatis sollicitudin posuere elit consequat et enim. Neque tortor amet dictum tempor. Leo facilisis aliquet viverra scelerisque eleifend viverra est. At massa erat vel amet enim laoreet dictum pellentesque. Urna cursus quam pulvinar tellus duis fermentum nibh volutpat.',
        crew: ['Minh Nguyen', 'Linh Mai', 'Tram Nguyen', 'Long Dinh'],
        gallery: [
            '/images/placeholder.png',
            '/images/placeholder.png',
            '/images/placeholder.png',
            '/images/placeholder.png',
            '/images/placeholder.png',
            '/images/placeholder.png',
            '/images/placeholder.png'
        ]
    },
    {
        id: '2',
        title: 'Sunset Sessions',
        date: 'Mai 3 2020',
        categories: ['Music Video', 'Commercial'],
        thumbnail: '/images/portfolio-2.jpg',
        order: 2,
        weight: 1.8
    },
    {
        id: '3',
        title: 'Behind the Lens',
        date: 'Mai 3 2020',
        categories: ['Commercial'],
        thumbnail: '/images/portfolio-3.jpg',
        order: 3,
        weight: 1
    },
    {
        id: '4',
        title: 'Light Symphony',
        date: 'Mai 3 2020',
        categories: ['Event'],
        thumbnail: '/images/portfolio-4.jpg',
        order: 4,
        weight: 1
    },
    {
        id: '5',
        title: 'Cinematic Moments',
        date: 'Mai 3 2020',
        categories: ['Commercial', 'Documentary'],
        thumbnail: '/images/portfolio-5.jpg',
        order: 5,
        weight: 1
    },
    {
        id: '6',
        title: 'Midnight Stories',
        date: 'Jun 15 2020',
        categories: ['Music Video'],
        thumbnail: '/images/portfolio-1.jpg',
        order: 6,
        weight: 2
    },
    {
        id: '7',
        title: 'Urban Pulse',
        date: 'Jul 8 2020',
        categories: ['Documentary'],
        thumbnail: '/images/portfolio-2.jpg',
        order: 7,
        weight: 1.5
    },
    {
        id: '8',
        title: 'Frame by Frame',
        date: 'Aug 22 2020',
        categories: ['Commercial'],
        thumbnail: '/images/portfolio-3.jpg',
        order: 8,
        weight: 1
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

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    tags: string[]; // Array of teams the member belongs to (e.g., ["VFX", "Production"])
    image: string;
    description: string; // Short description
    fullBio?: string; // Full biography in markdown format or path to .md file
    email?: string;
    phone?: string;
    contactLink?: string; // Link for "Get In Touch" button
}

export interface TeamMemberGalleryItem {
    portfolioItemId: string; // Reference to PortfolioItem by ID
    order: number; // Display order in this specific gallery
    weight?: number; // Custom weight for this gallery (overrides default if provided)
}

export const teamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'TRAM NGUYEN',
        role: 'VFX Team',
        tags: ['VFX'],
        image: '/images/team/Tram Nguyen.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        email: 'tram.nguyen@lunapictures.com',
        phone: '+1 (555) 123-4567'
    },
    {
        id: '2',
        name: 'LONG DINH',
        role: 'VFX Team',
        tags: ['VFX'],
        image: '/images/team/Long Dinh.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        email: 'long.dinh@lunapictures.com',
        phone: '+1 (555) 234-5678'
    },
    {
        id: '3',
        name: 'MINH NGUYEN',
        role: 'VFX & Production Team',
        tags: ['VFX', 'Production'],
        image: '/images/team/Minh Nguyen.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        email: 'minh.nguyen@lunapictures.com',
        phone: '+1 (555) 345-6789'
    },
    {
        id: '4',
        name: 'LINH MAI',
        role: 'Production Team',
        tags: ['Production'],
        image: '/images/team/Linh Mai.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        email: 'linh.mai@lunapictures.com',
        phone: '+1 (555) 456-7890'
    }
];

export const productionTeamMembers: TeamMember[] = [
    {
        id: '3',
        name: 'MINH NGUYEN',
        role: 'VFX & Production Team',
        tags: ['VFX', 'Production'],
        image: '/images/team/Minh Nguyen.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: '4',
        name: 'LINH MAI',
        role: 'Production Team',
        tags: ['Production'],
        image: '/images/team/Linh Mai.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
];

export const vfxTeamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'TRAM NGUYEN',
        role: 'VFX Team',
        tags: ['VFX'],
        image: '/images/team/Tram Nguyen.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: '2',
        name: 'LONG DINH',
        role: 'VFX Team',
        tags: ['VFX'],
        image: '/images/team/Long Dinh.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
        id: '3',
        name: 'MINH NGUYEN',
        role: 'VFX & Production Team',
        tags: ['VFX', 'Production'],
        image: '/images/team/Minh Nguyen.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
];

export interface AccordionItem {
    id: string;
    question: string;
    answer: string;
}

export const faqItems: AccordionItem[] = [
    {
        id: '1',
        question: 'WHAT TYPES OF VIDEO DO WE PRODUCE ?',
        answer: 'We produce a wide range of videos including corporate videos, commercials, music videos, documentaries, event coverage, and social media content. Our team can handle any video production need you have.'
    },
    {
        id: '2',
        question: 'WHAT IS THE TURNAROUND TIME FOR VIDEO PRODUCTION ?',
        answer: 'Turnaround time varies depending on the project scope and complexity. Typically, a simple video can be completed in 2-3 weeks, while more complex productions may take 4-8 weeks. We will provide you with a detailed timeline during the initial consultation.'
    },
    {
        id: '3',
        question: 'CAN YOU HELP WITH VIDEO MARKETING AND PROMOTION ?',
        answer: 'Yes! We offer comprehensive video marketing services including social media strategy, YouTube optimization, video SEO, and distribution across multiple platforms. We can help you maximize the reach and impact of your video content.'
    },
    {
        id: '4',
        question: 'HOW CAN I REQUEST A CUSTOM VIDEO ?',
        answer: 'Simply contact us through our contact form or give us a call. We will schedule a consultation to discuss your vision, goals, budget, and timeline. From there, we will provide you with a detailed proposal and production plan.'
    }
];

export interface ShowreelItem {
    id: string;
    number: string;
    title: string;
    date: string;
    client: string;
    type: string;
    image: string;
}

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

export interface CategoryFilter {
    id: string;
    label: string;
    count: number;
}

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
