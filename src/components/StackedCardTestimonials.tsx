'use client';

import { Dispatch, SetStateAction, useState } from 'react';

import { motion } from 'framer-motion';

interface Testimonial {
    Icon: React.ComponentType<{ className?: string }>;
    description: string;
    name: string;
    title: string;
}

interface SelectBtnsProps {
    numTracks: number;
    setSelected: Dispatch<SetStateAction<number>>;
    selected: number;
}

interface CardsProps {
    testimonials: Testimonial[];
    setSelected: Dispatch<SetStateAction<number>>;
    selected: number;
}

interface CardProps extends Testimonial {
    position: number;
    selected: number;
    setSelected: Dispatch<SetStateAction<number>>;
}

const StackedCardTestimonials = () => {
    const [selected, setSelected] = useState(0);

    return (
        <section className='grid grid-cols-1 items-center gap-8 overflow-hidden bg-[#F9F9F9] px-4 py-24 lg:grid-cols-2 lg:gap-4 lg:px-8'>
            <div className='p-4'>
                <h3 className='text-5xl font-semibold text-[#020202]'>What our clients say</h3>
                <p className='my-4 text-[#333136]'>
                    Discover how Luna Pictures has transformed visions into extraordinary visual experiences for brands,
                    filmmakers, and creative professionals worldwide.
                </p>
                <SelectBtns numTracks={testimonials.length} setSelected={setSelected} selected={selected} />
            </div>
            <Cards testimonials={testimonials} setSelected={setSelected} selected={selected} />
        </section>
    );
};

const SelectBtns = ({ numTracks, setSelected, selected }: SelectBtnsProps) => {
    return (
        <div className='mt-8 flex gap-1'>
            {Array.from(Array(numTracks).keys()).map((n) => {
                return (
                    <button
                        key={n}
                        onClick={() => setSelected(n)}
                        className='relative h-0.5 min-h-1.5 w-full bg-[#BDBDBD]'>
                        {selected === n ? (
                            <motion.span
                                className='absolute top-0 bottom-0 left-0 bg-[#020202]'
                                initial={{
                                    width: '0%'
                                }}
                                animate={{
                                    width: '100%'
                                }}
                                transition={{
                                    duration: 5
                                }}
                                onAnimationComplete={() => {
                                    setSelected(selected === numTracks - 1 ? 0 : selected + 1);
                                }}
                            />
                        ) : (
                            <span
                                className='absolute top-0 bottom-0 left-0 bg-[#020202]'
                                style={{
                                    width: selected > n ? '100%' : '0%'
                                }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};

const Cards = ({ testimonials, selected, setSelected }: CardsProps) => {
    return (
        <div className='relative h-[350px] p-4 shadow-xl lg:h-[400px]'>
            {testimonials.map((t, i) => {
                return <Card {...t} key={i} position={i} selected={selected} setSelected={setSelected} />;
            })}
        </div>
    );
};

const Card = ({ Icon, description, name, title, position, selected, setSelected }: CardProps) => {
    const scale = position <= selected ? 1 : 1 + 0.015 * (position - selected);
    const offset = position <= selected ? 0 : 95 + (position - selected) * 3;
    const background = position % 2 ? '#020202' : '#F9F9F9';
    const color = position % 2 ? '#F9F9F9' : '#020202';

    return (
        <motion.div
            initial={false}
            style={{
                zIndex: position,
                transformOrigin: 'left bottom',
                background,
                color
            }}
            animate={{
                x: `${offset}%`,
                scale
            }}
            whileHover={{
                translateX: position === selected ? 0 : -3
            }}
            transition={{
                duration: 0.25,
                ease: 'easeOut'
            }}
            onClick={() => setSelected(position)}
            className='absolute top-0 left-0 flex min-h-full w-full cursor-pointer flex-col justify-between border border-[#BDBDBD] p-8 lg:p-12'>
            <Icon className='mx-auto text-7xl' />
            <p className='my-8 text-lg font-light italic lg:text-xl'>&quot;{description}&quot;</p>
            <div>
                <span className='block text-lg font-semibold'>{name}</span>
                <span className='block text-sm opacity-75'>{title}</span>
            </div>
        </motion.div>
    );
};

// Simple logo/icon components for different client types
const CreativeStudioIcon = ({ className }: { className?: string }) => (
    <div className={`${className} flex items-center justify-center`}>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-current'>
            <span className='text-2xl font-bold' style={{ color: 'inherit' }}>
                CS
            </span>
        </div>
    </div>
);

const FilmProductionIcon = ({ className }: { className?: string }) => (
    <div className={`${className} flex items-center justify-center`}>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-current'>
            <span className='text-2xl font-bold' style={{ color: 'inherit' }}>
                FP
            </span>
        </div>
    </div>
);

const TechCompanyIcon = ({ className }: { className?: string }) => (
    <div className={`${className} flex items-center justify-center`}>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-current'>
            <span className='text-2xl font-bold' style={{ color: 'inherit' }}>
                TC
            </span>
        </div>
    </div>
);

const BrandAgencyIcon = ({ className }: { className?: string }) => (
    <div className={`${className} flex items-center justify-center`}>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-current'>
            <span className='text-2xl font-bold' style={{ color: 'inherit' }}>
                BA
            </span>
        </div>
    </div>
);

const MediaHouseIcon = ({ className }: { className?: string }) => (
    <div className={`${className} flex items-center justify-center`}>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-current'>
            <span className='text-2xl font-bold' style={{ color: 'inherit' }}>
                MH
            </span>
        </div>
    </div>
);

const EventCompanyIcon = ({ className }: { className?: string }) => (
    <div className={`${className} flex items-center justify-center`}>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-current'>
            <span className='text-2xl font-bold' style={{ color: 'inherit' }}>
                EC
            </span>
        </div>
    </div>
);

const testimonials: Testimonial[] = [
    {
        Icon: CreativeStudioIcon,
        description:
            'Luna Pictures transformed our vision into something extraordinary. Their attention to detail and creative expertise exceeded all our expectations. The final result was simply breathtaking.',
        name: 'Sarah Johnson',
        title: 'Director, Creative Studios'
    },
    {
        Icon: FilmProductionIcon,
        description:
            "Working with Luna Pictures was an absolute pleasure. Their team's professionalism and technical skills are unmatched. They delivered exactly what we envisioned, on time and within budget.",
        name: 'Michael Chen',
        title: 'Producer, Epic Films'
    },
    {
        Icon: TechCompanyIcon,
        description:
            'The animation work Luna Pictures created for our product launch was phenomenal. They brought our complex ideas to life with stunning visuals that our audience loved.',
        name: 'Alex Rivera',
        title: 'Marketing Lead, TechFlow'
    },
    {
        Icon: BrandAgencyIcon,
        description:
            "Luna Pictures doesn't just create visual effects – they create magic. Their innovative approach and cutting-edge techniques brought our impossible scenes to life perfectly.",
        name: 'Emma Rodriguez',
        title: 'Executive Producer, Visionary Media'
    },
    {
        Icon: MediaHouseIcon,
        description:
            'Outstanding video production quality and incredible attention to storytelling. Luna Pictures helped us create content that truly resonates with our audience.',
        name: 'David Thompson',
        title: 'Creative Director, MediaCorp'
    },
    {
        Icon: EventCompanyIcon,
        description:
            "From concept to final delivery, Luna Pictures exceeded every expectation. Their wedding videography captured emotions we didn't even know existed in those moments.",
        name: 'Jessica Martinez',
        title: 'Event Coordinator, Premier Events'
    }
];

export default StackedCardTestimonials;
