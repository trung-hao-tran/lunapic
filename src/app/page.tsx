'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';

import AnimatedBanner from '@/components/AnimatedBanner';
import CustomVideoPlayer from '@/components/CustomVideoPlayer';
import Footer from '@/components/Footer';
import IntroAnimation from '@/components/IntroAnimation';
import Navigation from '@/components/Navigation';
import StackedCardTestimonials from '@/components/StackedCardTestimonials';

import { animate } from 'framer-motion';

const Page = () => {
    const [showHeroVideo, setShowHeroVideo] = useState(false);
    const heroVideoRef = useRef<HTMLVideoElement>(null);

    const handleIntroComplete = () => {
        // Start hero video fade-in animation
        setTimeout(() => {
            setShowHeroVideo(true);
        }, 800); // Small delay for smooth transition
    };

    const handleScrollToAbout = () => {
        const element = document.getElementById('about-transition');
        if (element) {
            const targetPosition = element.offsetTop - 50;
            animate(window.pageYOffset, targetPosition, {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                onUpdate: (value) => window.scrollTo(0, value)
            });
        }
    };

    return (
        <IntroAnimation onIntroComplete={handleIntroComplete}>
            <Navigation />

            {/* First Screen Container - Priority layout for content */}
            <div className='flex min-h-screen flex-col md:flex'>
                {/* Hero Section with Video Overlay - Adaptive height */}
                <section
                    id='hero'
                    className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#020202] md:min-h-0 md:flex-1'>
                    {/* Video Background */}
                    <div
                        className={`absolute inset-0 h-full w-full transition-opacity duration-2000 ease-out ${
                            showHeroVideo ? 'opacity-90' : 'opacity-0'
                        }`}>
                        <video
                            ref={heroVideoRef}
                            className='h-full w-full object-cover'
                            autoPlay
                            muted
                            loop
                            playsInline>
                            <source src='http://localhost:3000/videos/hero.mp4' type='video/mp4' />
                            {/* Fallback for browsers that don't support video */}
                            <div className='h-full w-full bg-[#020202]'></div>
                        </video>
                        {/* Video overlay for better text readability */}
                        <div className='absolute inset-0 bg-black/30'></div>
                    </div>

                    {/* Content overlay */}
                    <div className='relative z-10 flex flex-col items-center justify-center space-y-8 px-4 text-center'>
                        <img src='/Logo full.svg' alt='Luna Pictures Logo' className='h-24 w-auto sm:h-32 lg:h-40' />

                        {/* Scroll anchor */}
                        <button
                            onClick={handleScrollToAbout}
                            className='text-[#F9F9F9] transition-colors duration-200 hover:text-gray-300'
                            aria-label='Scroll to About section'>
                            <svg
                                className='h-8 w-8 animate-bounce'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'>
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M19 14l-7 7m0 0l-7-7m7 7V3'
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Gradient transition overlay - covers bottom 15vh */}
                    <div className='absolute right-0 bottom-0 left-0 z-20 h-[15vh] bg-gradient-to-b from-transparent to-[#020202]'></div>
                </section>

                {/* About Us Transition Section - Content priority, never overflows */}
                <section
                    id='about-transition'
                    className='relative flex w-full flex-shrink-0 flex-col justify-center bg-[#020202] py-8 md:py-8'>
                    <div className='mx-auto w-[65vw] text-left'>
                        <h2 className='text-2xl leading-[4rem] font-bold text-[#F9F9F9] sm:text-3xl'>About Us</h2>
                        <div className='space-y-2 text-left'>
                            <p className='text-[1.75rem] leading-[1.5] text-[#F9F9F9]'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore.
                            </p>
                            <p className='text-[1.75rem] leading-[1.5] text-[#F9F9F9]'>
                                Et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris.
                            </p>
                            <p className='text-[1.75rem] leading-[1.5] text-[#F9F9F9]'>
                                Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                voluptate.
                            </p>
                            <p className='text-[1.75rem] leading-[1.5] text-[#F9F9F9]'>
                                Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                                proident.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            {/* Read More Button Section - positioned below first screen */}
            <section className='flex w-full bg-[#020202] py-8'>
                <div className='mx-auto w-[65vw]'>
                    <Link
                        href='/about'
                        className='rounded-md bg-[#F9F9F9] px-6 py-3 text-lg font-semibold text-[#020202] transition-all hover:bg-gray-200 focus:ring-2 focus:ring-[#F9F9F9] focus:outline-none'>
                        Read More
                    </Link>
                </div>
            </section>

            {/* Show Reel Section */}
            <section
                id='showreel'
                className='relative flex min-h-screen w-full flex-col items-center justify-center bg-[#020202]'>
                <div className='flex h-full w-full flex-col items-center justify-center'>
                    <div className='mb-8 px-4 text-center'>
                        <h2 className='mb-4 text-3xl font-bold text-[#F9F9F9] sm:text-5xl lg:text-6xl'>Our Work</h2>
                        <p className='mx-auto max-w-2xl text-lg text-[#F9F9F9] sm:text-xl'>
                            Experience the magic of our latest projects
                        </p>
                    </div>

                    {/* Showreel Video */}
                    <div className='mx-auto w-full max-w-6xl px-4'>
                        <div className='relative aspect-video overflow-hidden rounded-lg'>
                            <CustomVideoPlayer
                                src={[
                                    {
                                        label: 'HD',
                                        src: '/videos/intro.mp4',
                                        resolution: '1080p'
                                    },
                                    {
                                        label: 'Standard',
                                        src: '/videos/intro-720p.mp4',
                                        resolution: '720p'
                                    },
                                    {
                                        label: 'Low',
                                        src: '/videos/intro-480p.mp4',
                                        resolution: '480p'
                                    }
                                ]}
                                className='h-full w-full'
                                autoPlay={false}
                                muted={true}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Animated Action Banner */}
            <AnimatedBanner />

            {/* Testimonial Section */}
            <StackedCardTestimonials />

            {/* Footer */}
            <Footer />
        </IntroAnimation>
    );
};

export default Page;
