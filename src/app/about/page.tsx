'use client';

import React, { useEffect, useRef, useState } from 'react';

import { BoxButton } from '@/components/BoxButton';
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
                                        fontFamily: 'var(--font-geist-mono), monospace',
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
                                    fontFamily: 'var(--font-geist-mono), monospace',
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
        <main>
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

            {/* Team Section */}
            <Section title='TEAM' number='2' bgColor='#040404' headerColor='#fdfdfd'>
                <TeamCardGallery teamMembers={teamMembers} />
            </Section>
        </main>
    );
};

export default AboutPage;
