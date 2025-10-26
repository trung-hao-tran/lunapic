'use client';

import { useEffect, useState, useRef } from 'react';

import { motion, useTransform, useScroll } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';
import { portfolioItems } from '@/data/dummyData';

const PortfolioDetailPage = () => {
    const params = useParams();
    const id = params.id as string;
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        setIsAnimating(true);
    }, []);

    // Find the portfolio item by ID
    const item = portfolioItems.find((p) => p.id === id);

    // If item not found, show error
    if (!item) {
        return (
            <main className='flex min-h-screen items-center justify-center bg-black'>
                <div className='text-center'>
                    <h1 className='mb-4 text-4xl font-bold text-white'>Portfolio Item Not Found</h1>
                    <a href='/work' className='mt-4 inline-block text-white underline'>
                        Back to Work
                    </a>
                </div>
            </main>
        );
    }

    return (
        <>
            <Navigation />
            <main className='pt-24'>
                {/* Section 1: Header Media (No Title) */}
                <Section title='' number='' bgColor='#040404' headerColor='#fdfdfd' hasHeader={false}>
                    <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                        {/* Left Column - Title + Video */}
                        <div className='flex flex-col gap-32'>
                            {/* Project Title */}
                            <div className='relative inline-block'>
                                <StarFrame
                                    haveBorder={false}
                                    starSize={30}
                                    direction={['tl', 'br']}
                                    color='white'
                                    className='inline-block'>
                                    <h1
                                        className='uppercase'
                                        style={{
                                            color: '#FFF',
                                            fontFamily: 'Inter, monospace',
                                            fontSize: '2.25rem',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                            letterSpacing: '-0.1125rem',
                                            textTransform: 'uppercase'
                                        }}>
                                        {item.title}
                                    </h1>
                                </StarFrame>
                            </div>

                            {/* Left Media (Video or Image) */}
                            {item.headerLeft && (
                                <div
                                    className='relative aspect-video w-full overflow-hidden bg-gray-900'
                                    style={{ border: '1px solid #fdfdfd', padding: '1px' }}>
                                    {item.headerLeft.includes('youtube.com') ||
                                    item.headerLeft.includes('vimeo.com') ? (
                                        <iframe
                                            src={item.headerLeft}
                                            title={`${item.title} - Video`}
                                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                            allowFullScreen
                                            className='absolute inset-0 h-full w-full'
                                        />
                                    ) : (
                                        <Image src={item.headerLeft} alt={item.title} fill className='object-cover' />
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Large Image + Project Details */}
                        <div className='relative flex flex-col gap-32'>
                            {/* Background SVG decoration - Hidden on mobile */}
                            <div className='absolute top-0 right-0 opacity-50 hidden md:block' style={{ zIndex: 1 }}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 910 735'
                                    fill='white'
                                    style={{
                                        width: '70rem',
                                        height: '70rem',
                                        flexShrink: 0
                                    }}>
                                    <path
                                        d='M131.3 557.406L909.3 0.40625M0.299561 734.406L909.3 53.9062M638.3 448.906L885.3 243.406'
                                        stroke='white'
                                        strokeOpacity='0.54'
                                        strokeWidth='1'
                                        style={{
                                            strokeDasharray: 2000,
                                            strokeDashoffset: isAnimating ? 0 : -2000,
                                            transition: 'stroke-dashoffset 1s ease-out'
                                        }}
                                    />
                                </svg>
                            </div>

                            {/* Right Media (Large Image) */}
                            {item.headerRight && (
                                <div
                                    className='relative aspect-video w-full overflow-hidden'
                                    style={{ border: '1px solid #fdfdfd', padding: '1px', zIndex: 10 }}>
                                    {item.headerRight.includes('youtube.com') ||
                                    item.headerRight.includes('vimeo.com') ? (
                                        <iframe
                                            src={item.headerRight}
                                            title={`${item.title} - Video 2`}
                                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                            allowFullScreen
                                            className='absolute inset-0 h-full w-full'
                                        />
                                    ) : (
                                        <Image src={item.headerRight} alt={item.title} fill className='object-cover' />
                                    )}
                                </div>
                            )}

                            {/* Project Description */}
                            <div className='relative space-y-6 px-0 md:px-20' style={{ zIndex: 10 }}>
                                <p
                                    className='text-white'
                                    style={{
                                        color: '#FFF',
                                        fontFamily: '"Geist Mono", monospace',
                                        fontSize: '1rem',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.005rem'
                                    }}>
                                    {item.description || item.projectOverview || 'Project description coming soon...'}
                                </p>

                                {/* Project Details */}
                                <div>
                                    {item.categories && item.categories.length > 0 && (
                                        <div>
                                            <p
                                                className='text-white'
                                                style={{
                                                    color: '#FFF',
                                                    fontFamily: 'Inter, monospace',
                                                    fontSize: '1rem',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    letterSpacing: '-0.005rem'
                                                }}>
                                                Client: Quantro
                                            </p>
                                            <div
                                                className='mt-2 mb-6 border-b'
                                                style={{ borderColor: '#fdfdfd', opacity: 0.2 }}
                                            />
                                        </div>
                                    )}

                                    <div>
                                        <p
                                            className='text-white'
                                            style={{
                                                color: '#FFF',
                                                fontFamily: 'Inter, monospace',
                                                fontSize: '1rem',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                letterSpacing: '-0.005rem'
                                            }}>
                                            Date: {item.date}
                                        </p>
                                        <div
                                            className='mt-2 mb-6 border-b'
                                            style={{ borderColor: '#fdfdfd', opacity: 0.2 }}
                                        />
                                    </div>

                                    <div>
                                        <p
                                            className='text-white'
                                            style={{
                                                color: '#FFF',
                                                fontFamily: 'Inter, monospace',
                                                fontSize: '1rem',
                                                fontStyle: 'normal',
                                                fontWeight: 700,
                                                lineHeight: 'normal',
                                                letterSpacing: '-0.005rem'
                                            }}>
                                            Type: {item.categories.join(', ')}
                                        </p>
                                        <div
                                            className='mt-2 mb-6 border-b'
                                            style={{ borderColor: '#fdfdfd', opacity: 0.2 }}
                                        />
                                    </div>

                                    {item.crew && item.crew.length > 0 && (
                                        <div>
                                            <p
                                                className='text-white'
                                                style={{
                                                    color: '#FFF',
                                                    fontFamily: 'Inter, monospace',
                                                    fontSize: '1rem',
                                                    fontStyle: 'normal',
                                                    fontWeight: 700,
                                                    lineHeight: 'normal',
                                                    letterSpacing: '-0.005rem'
                                                }}>
                                                Crew Included: {item.crew.join(', ')}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section 2: Project Overview */}
                <Section title='PROJECT OVERVIEW' number='2' bgColor='#040404' headerColor='#fdfdfd'>
                    <div className='flex justify-center'>
                        <div className='w-full md:w-[40%] space-y-8 text-left'>
                            {/* Project Overview Title */}
                            <h3
                                className='text-white'
                                style={{
                                    color: '#FFF',
                                    fontFamily: 'Inter',
                                    fontSize: '2.25rem',
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.1125rem',
                                    textTransform: 'uppercase'
                                }}>
                                Project Overview
                            </h3>

                            {/* Project Overview Content */}
                            <p
                                className='text-white'
                                style={{
                                    color: '#FFF',
                                    fontFamily: '"Geist Mono", monospace',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.005rem'
                                }}>
                                {item.projectOverview || 'Project overview coming soon...'}
                            </p>
                        </div>
                    </div>
                </Section>

                {/* Horizontal Gallery */}
                {item.gallery && item.gallery.length > 0 && <HorizontalScrollGallery images={item.gallery} />}

                {/* Section 3: Contact Us */}
                <Section title='CONTACT US' number='3' bgColor='#040404' headerColor='#fdfdfd'>
                    <ContactSection bgColor='black' />
                </Section>
            </main>

            <Footer />
        </>
    );
};

const GalleryImage = ({ url, index }: { url: string; index: number }) => {
    const [aspectRatio, setAspectRatio] = useState<'portrait' | 'landscape'>('landscape');

    useEffect(() => {
        const img = new window.Image();
        img.src = url;
        img.onload = () => {
            const ratio = img.width / img.height;
            // If width is less than height, it's portrait (9:16), otherwise landscape (16:9)
            setAspectRatio(ratio < 1 ? 'portrait' : 'landscape');
        };
    }, [url]);

    const isPortrait = aspectRatio === 'portrait';
    const aspectClass = isPortrait ? 'aspect-[9/16]' : 'aspect-[16/9]';
    // Responsive widths: smaller on mobile, larger on desktop
    const widthClass = isPortrait ? 'w-[250px] md:w-[400px]' : 'w-[350px] md:w-[600px]';

    return (
        <div
            key={index}
            className={`group relative ${aspectClass} ${widthClass} flex-shrink-0 overflow-hidden rounded-lg`}
            style={{ border: '1px solid #fdfdfd' }}>
            <Image
                src={url}
                alt={`Gallery image ${index + 1}`}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-110'
            />
        </div>
    );
};

const HorizontalScrollGallery = ({ images }: { images: string[] }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef
    });

    const x = useTransform(scrollYProgress, [0, 1], ['1%', '-95%']);

    return (
        <section ref={targetRef} className='relative h-[300vh]' style={{ backgroundColor: '#040404' }}>
            <div className='sticky top-0 flex h-screen items-center overflow-hidden py-0'>
                <motion.div style={{ x }} className='flex gap-4'>
                    {images.map((url, index) => (
                        <GalleryImage key={index} url={url} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PortfolioDetailPage;
