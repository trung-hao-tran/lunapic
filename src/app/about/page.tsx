'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { BoxButton } from '@/components/BoxButton';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';
import { TeamCardGallery } from '@/components/TeamCardGallery';
import { ourStoryText, teamMembers } from '@/data/dummyData';

const AboutPage = () => {
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

    // Parse the story text to handle [highlighted] words and /newline
    const renderStoryText = (text: string) => {
        // First split by /newline to handle paragraph breaks
        const paragraphs = text.split('/newline');

        return paragraphs.map((paragraph, pIndex) => {
            // Split each paragraph by brackets to identify highlighted text
            const parts = paragraph.split(/(\[.*?\])/g);

            return (
                <p key={pIndex} className='mb-6 last:mb-0'>
                    {parts.map((part, index) => {
                        if (part.startsWith('[') && part.endsWith(']')) {
                            // Highlighted text (remove brackets)
                            const highlightedText = part.slice(1, -1);

                            return (
                                <span
                                    key={index}
                                    style={{
                                        color: '#FFF',
                                        fontFamily: '"Geist Mono", monospace',
                                        fontSize: '1.25rem',
                                        fontStyle: 'normal',
                                        fontWeight: 700,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.00625rem'
                                    }}>
                                    {highlightedText}
                                </span>
                            );
                        }

                        // Normal text
                        return (
                            <span
                                key={index}
                                style={{
                                    color: '#FFF',
                                    fontFamily: '"Geist Mono", monospace',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.005rem'
                                }}>
                                {part}
                            </span>
                        );
                    })}
                </p>
            );
        });
    };

    return (
        <>
            <main className='overflow-x-hidden'>
            <HeroSection>
                {/* About Us Heading with StarFrame */}
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
                        ABOUT US
                    </h1>
                </StarFrame>
            </HeroSection>

            {/* Our Story Section */}
            <Section title='OUR STORY' number='1' bgColor='#040404' headerColor='#fdfdfd' headerSeparator={false}>
                <div ref={sectionRef} className='relative'>
                    {/* Diagonal Line SVG - Absolute positioned at rightmost edge of section (hidden on mobile) */}
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='532'
                        height='866'
                        viewBox='0 0 532 866'
                        fill='none'
                        style={{
                            width: '33.15625rem',
                            height: '54.03125rem',
                            flexShrink: 0
                        }}
                        className='absolute -top-54 -right-6 hidden md:-right-12 md:block lg:-right-16'>
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

                    <div className='flex justify-center md:justify-start'>
                        {/* Text Content - Centered div with left-aligned text */}
                        <div className='w-full md:w-[60%]'>
                            {renderStoryText(ourStoryText)}
                            <div className='mt-8'>
                                <BoxButton text='LEARN MORE' />
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Our Mission Section */}
            <Section title='OUR MISSION' number='2' bgColor='#040404' headerColor='#fdfdfd'>
                <div
                    className='relative overflow-hidden w-screen aspect-[4/3] md:aspect-[1440/603]'
                    style={{
                        marginLeft: 'calc(-50vw + 50%)',
                        flexShrink: 0
                    }}>
                    {/* Banner Image */}
                    <Image
                        src='/images/our_mission_banner.png'
                        alt='Our Mission'
                        fill
                        className='object-cover'
                        style={{ filter: 'grayscale(100%)' }}
                    />
                    {/* Black Overlay */}
                    <div className='absolute inset-0 bg-black opacity-40' />
                    {/* Text Overlay - Bottom center on mobile, center right on desktop */}
                    <div className='absolute bottom-8 left-0 right-0 px-6 md:inset-y-0 md:left-auto md:flex md:items-center md:pr-16 lg:pr-24'>
                        <p
                            className='w-full text-center md:w-[54.25rem] md:text-right'
                            style={{
                                color: '#FFF',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '1.5rem',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '1.4',
                                letterSpacing: '-0.075rem'
                            }}>
                            <span className='md:hidden'>
                                We are dedicated to turning your vision into reality, delivering high-quality productions
                                that resonate with audiences and leave a lasting impression.
                            </span>
                            <span
                                className='hidden md:inline'
                                style={{
                                    fontSize: '2.25rem',
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.1125rem'
                                }}>
                                We are dedicated to turning your vision into reality, delivering high-quality productions
                                that resonate with audiences and leave a lasting impression.
                            </span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* Team Section */}
            <Section title='TEAM' number='3' bgColor='#040404' headerColor='#fdfdfd'>
                <TeamCardGallery teamMembers={teamMembers} />
            </Section>

            {/* Contact Us Section */}
            <Section title='CONTACT US' number='4' bgColor='#040404' headerColor='#fdfdfd'>
                <ContactSection bgColor='black' />
            </Section>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default AboutPage;
