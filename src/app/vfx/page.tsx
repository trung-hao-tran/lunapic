'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Accordion } from '@/components/Accordion';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';
import { faqItems } from '@/data/dummyData';

const VFXPage = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Trigger animation when section reaches 50% of viewport (middle of screen)
                    if (entry.isIntersecting) {
                        setIsAnimating(true);
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: '-50% 0px -50% 0px' // Trigger when element crosses the middle of viewport
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <main>
                <HeroSection>
                    {/* VFX Heading with StarFrame */}
                    <StarFrame haveBorder={false} starSize={40} direction={['tl', 'br']} color='white'>
                        <h1
                            style={{
                                color: '#FFF',
                                fontFamily: 'SVN-GilroyBold, sans-serif',
                                fontSize: '3rem',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 'normal',
                                letterSpacing: '-0.015rem'
                            }}>
                            VFX
                        </h1>
                    </StarFrame>

                    {/* Subtitle */}
                    <p
                        className='max-w-2xl text-xs text-white/80 sm:text-base md:text-lg lg:text-xl'
                        style={{
                            fontFamily: '"Geist Mono", monospace',
                            letterSpacing: '-0.07px'
                        }}>
                        Bringing imagination to life through visual effects
                    </p>
                </HeroSection>

                {/* Why Choosing Us Section */}
                <Section title='' bgColor='#040404' headerColor='#fdfdfd' hasHeader={false}>
                    <div ref={sectionRef} className='relative md:p-20'>
                        {/* Diagonal Line SVG - Absolute positioned at rightmost edge of section (hidden on mobile) */}
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='532'
                            height='650'
                            viewBox='0 0 532 866'
                            fill='none'
                            style={{
                                width: '33.15625rem',
                                height: '40rem',
                                flexShrink: 0,
                                transform: 'scaleX(-1)'
                            }}
                            className='absolute -top-15 -right-6 hidden md:-right-12 md:block lg:-right-16'>
                            <path
                                d='M0.42627 0.263062L530.926 864.763M57.4263 0.263062L211.426 249.263'
                                stroke='white'
                                strokeWidth='1.5'
                                style={{
                                    strokeDasharray: 2000,
                                    strokeDashoffset: isAnimating ? 0 : 2000,
                                    transition: 'stroke-dashoffset 2.5s ease-out'
                                }}
                            />
                        </svg>

                        <div className='grid grid-cols-1 gap-8 md:grid-cols-[60%_40%]'>
                            {/* Left Column - 60% */}
                            <div>
                                {/* Section Title */}
                                <h2
                                    className='mb-12 uppercase'
                                    style={{
                                        color: '#FFF',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '2.25rem',
                                        fontStyle: 'normal',
                                        fontWeight: 600,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.01125rem'
                                    }}>
                                    WHY CHOOSING US ?
                                </h2>

                                {/* Bullet Points */}
                                <div className='mb-16'>
                                    <ul
                                        className='space-y-6'
                                        style={{
                                            color: '#FFF',
                                            fontFamily: '"Geist Mono", monospace',
                                            fontSize: '1.25rem',
                                            fontStyle: 'normal',
                                            fontWeight: 300,
                                            lineHeight: 'normal',
                                            letterSpacing: '-0.00625rem'
                                        }}>
                                        <li className='flex items-start gap-3'>
                                            <div className='relative mt-1 h-6 w-6 flex-shrink-0'>
                                                <Image
                                                    src='/star.svg'
                                                    alt='Star'
                                                    width={24}
                                                    height={24}
                                                    className='h-6 w-6 transition-transform duration-300 hover:rotate-90'
                                                />
                                            </div>
                                            <span>
                                                Experienced Team: Our team of seasoned professionals brings expertise in
                                                every aspect of video production.
                                            </span>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <div className='relative mt-1 h-6 w-6 flex-shrink-0'>
                                                <Image
                                                    src='/star.svg'
                                                    alt='Star'
                                                    width={24}
                                                    height={24}
                                                    className='h-6 w-6 transition-transform duration-300 hover:rotate-90'
                                                />
                                            </div>
                                            <span>
                                                Cutting-Edge Technology: We use the latest equipment and software to
                                                ensure your video is of the highest quality.
                                            </span>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <div className='relative mt-1 h-6 w-6 flex-shrink-0'>
                                                <Image
                                                    src='/star.svg'
                                                    alt='Star'
                                                    width={24}
                                                    height={24}
                                                    className='h-6 w-6 transition-transform duration-300 hover:rotate-90'
                                                />
                                            </div>
                                            <span>
                                                Custom Solutions: Every project is unique, and we tailor our services to
                                                meet your specific needs and goals.
                                            </span>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <div className='relative mt-1 h-6 w-6 flex-shrink-0'>
                                                <Image
                                                    src='/star.svg'
                                                    alt='Star'
                                                    width={24}
                                                    height={24}
                                                    className='h-6 w-6 transition-transform duration-300 hover:rotate-90'
                                                />
                                            </div>
                                            <span>
                                                Client-Centric Approach: We prioritize your vision and work closely with
                                                you throughout the process to ensure your complete satisfaction.
                                            </span>
                                        </li>
                                        <li className='flex items-start gap-3'>
                                            <div className='relative mt-1 h-6 w-6 flex-shrink-0'>
                                                <Image
                                                    src='/star.svg'
                                                    alt='Star'
                                                    width={24}
                                                    height={24}
                                                    className='h-6 w-6 transition-transform duration-300 hover:rotate-90'
                                                />
                                            </div>
                                            <span>
                                                End-to-End Service: From concept to final delivery, we manage every
                                                aspect of production, so you can focus on your core business.
                                            </span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Description Paragraph */}
                                <p
                                    style={{
                                        color: '#FFF',
                                        fontFamily: '"Geist Mono", monospace',
                                        fontSize: '1.25rem',
                                        fontStyle: 'normal',
                                        fontWeight: 700,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.00625rem'
                                    }}>
                                    Transform your vision into reality with our comprehensive video production services.
                                    Whether you need a corporate video, a captivating commercial, or a stunning music
                                    video, we are here to bring your story to life. Contact us today to start your next
                                </p>
                            </div>

                            {/* Right Column - 40% */}
                            <div>{/* Reserved for future content */}</div>
                        </div>
                        <div className='pt-40 pb-15'>
                            <Accordion items={faqItems} />
                        </div>
                    </div>
                </Section>
            </main>

            <Footer />
        </>
    );
};

export default VFXPage;
