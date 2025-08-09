'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';

import IntroAnimation from '@/components/IntroAnimation';
import Navigation from '@/components/Navigation';

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

            {/* Hero Section with Video Overlay - Full screen on mobile, 75vh on desktop */}
            <section
                id='hero'
                className='relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#020202] md:h-[75vh]'>
                {/* Video Background */}
                <div
                    className={`absolute inset-0 h-full w-full transition-opacity duration-2000 ease-out ${
                        showHeroVideo ? 'opacity-90' : 'opacity-0'
                    }`}>
                    <video ref={heroVideoRef} className='h-full w-full object-cover' autoPlay muted loop playsInline>
                        <source src='/videos/hero.mp4' type='video/mp4' />
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
                        <svg className='h-8 w-8 animate-bounce' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
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

            {/* About Us Transition Section - seamless transition with gradient */}
            <section
                id='about-transition'
                className='relative flex h-[25vh] w-full flex-col justify-center bg-[#020202]'>
                <div className='mx-auto w-[65vw] text-left'>
                    <h2 className='text-2xl leading-[4rem] font-bold text-[#F9F9F9] sm:text-3xl'>About Us</h2>
                    <div className='space-y-2 text-left'>
                        <p className='text-[1.75rem] leading-[1.5] text-[#F9F9F9]'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore.
                        </p>
                        <p className='text-[1.75rem] leading-[1.5] text-[#F9F9F9]'>
                            Et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
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
                            {/* <video className='h-full w-full object-cover' controls poster='/showreel-poster.jpg'>
                                <source src='/showreel.mp4' type='video/mp4' />
                                <div className='flex h-full w-full items-center justify-center bg-gray-800 text-white'>
                                    <span>Showreel Video Placeholder</span>
                                </div>
                            </video> */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Banner Section */}
            <section
                id='achievements'
                className='flex min-h-screen w-full flex-col items-center justify-center bg-[#020202] px-4 sm:px-6 lg:px-8'>
                <div className='space-y-12 text-center'>
                    <h2 className='text-3xl leading-tight font-bold text-[#F9F9F9] sm:text-5xl lg:text-7xl'>
                        Luna Pictures has helped create
                        <span className='mt-4 block text-4xl text-blue-400 sm:text-6xl lg:text-8xl'>
                            500+ Amazing Projects
                        </span>
                    </h2>

                    <div className='mx-auto grid max-w-4xl grid-cols-1 gap-8 pt-12 md:grid-cols-3'>
                        <div className='space-y-2 text-center'>
                            <div className='text-3xl font-bold text-[#F9F9F9] sm:text-4xl lg:text-5xl'>150+</div>
                            <div className='text-lg text-[#F9F9F9]'>Films & Commercials</div>
                        </div>
                        <div className='space-y-2 text-center'>
                            <div className='text-3xl font-bold text-[#F9F9F9] sm:text-4xl lg:text-5xl'>200+</div>
                            <div className='text-lg text-[#F9F9F9]'>VFX Shots</div>
                        </div>
                        <div className='space-y-2 text-center'>
                            <div className='text-3xl font-bold text-[#F9F9F9] sm:text-4xl lg:text-5xl'>50+</div>
                            <div className='text-lg text-[#F9F9F9]'>Happy Clients</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section
                id='testimonials'
                className='flex min-h-screen w-full flex-col items-center justify-center bg-[#020202] px-4 sm:px-6 lg:px-8'>
                <div className='space-y-12 text-center'>
                    <h2 className='mb-16 text-3xl font-bold text-[#F9F9F9] sm:text-5xl lg:text-6xl'>
                        What Our Clients Say
                    </h2>

                    <div className='mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2'>
                        {/* Testimonial 1 */}
                        <div className='space-y-6 rounded-lg bg-gray-900/50 p-8'>
                            <p className='text-lg leading-relaxed text-gray-300 italic sm:text-xl'>
                                "Luna Pictures transformed our vision into something extraordinary. Their attention to
                                detail and creative expertise exceeded all our expectations. The final result was simply
                                breathtaking."
                            </p>
                            <div className='space-y-2'>
                                <div className='font-semibold text-white'>Sarah Johnson</div>
                                <div className='text-gray-400'>Director, Creative Studios</div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className='space-y-6 rounded-lg bg-gray-900/50 p-8'>
                            <p className='text-lg leading-relaxed text-gray-300 italic sm:text-xl'>
                                "Working with Luna Pictures was an absolute pleasure. Their team's professionalism and
                                technical skills are unmatched. They delivered exactly what we envisioned, on time and
                                within budget."
                            </p>
                            <div className='space-y-2'>
                                <div className='font-semibold text-white'>Michael Chen</div>
                                <div className='text-gray-400'>Producer, Epic Films</div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className='mx-auto max-w-3xl space-y-6 rounded-lg bg-gray-900/50 p-8 lg:col-span-2'>
                            <p className='text-lg leading-relaxed text-gray-300 italic sm:text-xl'>
                                "Luna Pictures doesn't just create visual effects – they create magic. Their innovative
                                approach and cutting-edge techniques brought our impossible scenes to life. Highly
                                recommended!"
                            </p>
                            <div className='space-y-2'>
                                <div className='font-semibold text-white'>Emma Rodriguez</div>
                                <div className='text-gray-400'>Executive Producer, Visionary Media</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </IntroAnimation>
    );
};

export default Page;
