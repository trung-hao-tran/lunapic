'use client';

import React from 'react';

import Image from 'next/image';

import { Navigation } from './Navigation';

interface HeroSectionProps {
    children: React.ReactNode;
    backgroundMedia?: string;
    mediaType?: 'image' | 'video';
}

export function HeroSection({ children, backgroundMedia, mediaType = 'video' }: HeroSectionProps) {

    return (
        <section className='relative min-h-screen overflow-hidden bg-[#040404] text-white'>
            {/* Background Media */}
            {backgroundMedia && (
                <>
                    {mediaType === 'video' ? (
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className='absolute inset-0 h-full w-full object-cover'
                            style={{ zIndex: 0, transform: 'scale(1.43)', transformOrigin: 'center' }}>
                            <source src={backgroundMedia} type='video/mp4' />
                        </video>
                    ) : (
                        <Image
                            src={backgroundMedia}
                            alt='Hero background'
                            fill
                            className='object-cover'
                            style={{ zIndex: 0, transform: 'scale(1.43)', transformOrigin: 'center' }}
                            priority
                        />
                    )}
                    {/* Overlay to tone down background */}
                    <div className='absolute inset-0 bg-[#040404]/60' style={{ zIndex: 1 }} />
                </>
            )}

            {/* Navigation */}
            <Navigation />

            {/* Hero Content */}
            <div className='relative z-10 container mx-auto flex min-h-screen flex-col justify-end px-6 pt-32 pb-[20vh] md:px-12 lg:px-16'>
                <div className='max-w-2xl space-y-4'>{children}</div>
            </div>

            {/* Scroll Indicator - Positioned at bottom center */}
            <div className='absolute bottom-8 left-1/2 z-10 -translate-x-1/2'>
                <div className='animate-bounce'>
                    <svg className='h-8 w-8' fill='none' stroke='white' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                    </svg>
                </div>
            </div>
        </section>
    );
}
