'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';

import IntroAnimation from '@/components/IntroAnimation';
import Navigation from '@/components/Navigation';

const Page = () => {
    const [showHeroVideo, setShowHeroVideo] = useState(false);
    const heroVideoRef = useRef<HTMLVideoElement>(null);

    const handleIntroComplete = () => {
        // Start hero video fade-in animation
        setTimeout(() => {
            setShowHeroVideo(true);
        }, 800); // Small delay for smooth transition
    };

    return (
        <IntroAnimation onIntroComplete={handleIntroComplete}>
            <Navigation />

            {/* Hero Section with Video Overlay - 80% viewport */}
            <section
                id='hero'
                className='relative overflow-hidden bg-[#333136] h-[80vh] flex w-full flex-col items-center justify-center'>
                {/* Video Background */}
                <div
                    className={`absolute inset-0 h-full w-full transition-opacity duration-2000 ease-out ${
                        showHeroVideo ? 'opacity-90' : 'opacity-0'
                    }`}>
                    <video ref={heroVideoRef} className='h-full w-full object-cover' autoPlay muted loop playsInline>
                        <source src='/videos/hero.mp4' type='video/mp4' />
                        {/* Fallback for browsers that don't support video */}
                        <div className='h-full w-full bg-[#333136]'></div>
                    </video>
                    {/* Video overlay for better text readability */}
                    <div className='absolute inset-0 bg-black/30'></div>
                </div>

                {/* Content overlay */}
                <div className='relative z-10 space-y-8 px-4 text-center text-white'>
                    <h1 className='text-4xl font-bold tracking-tight sm:text-6xl lg:text-8xl'>LUNA PICTURES</h1>
                    <p className='mx-auto max-w-3xl text-lg opacity-90 sm:text-xl lg:text-2xl'>
                        Crafting cinematic experiences that captivate and inspire
                    </p>
                </div>

                {/* Gradient transition overlay - covers bottom 15vh */}
                <div className='absolute right-0 bottom-0 left-0 z-20 h-[15vh] bg-gradient-to-b from-transparent to-[#333136]'></div>
            </section>

            {/* About Us Transition Section - seamless transition with gradient */}
            <section 
                id='about-transition' 
                className='relative bg-[#333136] flex w-full flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
                <div className='space-y-12 pt-32 text-center'>
                    <div className='space-y-8'>
                        <h2 className='text-3xl font-bold text-white sm:text-5xl lg:text-6xl'>Who We Are</h2>
                        <p className='mx-auto max-w-4xl text-lg leading-relaxed text-gray-300 sm:text-xl'>
                            Luna Pictures is a creative powerhouse specializing in visual effects, post-production, and
                            cinematic storytelling. We transform imagination into reality, creating unforgettable visual
                            experiences for films, commercials, and digital content.
                        </p>
                        <p className='mx-auto max-w-4xl text-lg leading-relaxed text-gray-300 sm:text-xl'>
                            Our team of visionary artists and technical experts push the boundaries of what's possible,
                            delivering stunning visuals that elevate every project to new heights.
                        </p>
                    </div>

                    <div className='pt-8'>
                        <Link
                            href='/about'
                            className='inline-block min-h-[44px] min-w-[160px] rounded-md bg-white px-8 py-4 text-lg font-semibold text-black transition-all hover:bg-gray-100 focus:ring-2 focus:ring-white focus:outline-none'>
                            Learn More About Us
                        </Link>
                    </div>
                </div>
            </section>

            {/* Show Reel Section */}
            <section
                id='showreel'
                className='relative bg-[#333136] flex w-full flex-col items-center justify-center min-h-screen'>
                <div className='flex h-full w-full flex-col items-center justify-center'>
                    <div className='mb-8 px-4 text-center'>
                        <h2 className='mb-4 text-3xl font-bold text-white sm:text-5xl lg:text-6xl'>Our Work</h2>
                        <p className='mx-auto max-w-2xl text-lg text-gray-300 sm:text-xl'>
                            Experience the magic of our latest projects
                        </p>
                    </div>

                    {/* Showreel Video */}
                    <div className='mx-auto w-full max-w-6xl px-4'>
                        <div className='relative aspect-video overflow-hidden rounded-lg'>
                            <video className='h-full w-full object-cover' controls poster='/showreel-poster.jpg'>
                                <source src='/showreel.mp4' type='video/mp4' />
                                <div className='flex h-full w-full items-center justify-center bg-gray-800 text-white'>
                                    <span>Showreel Video Placeholder</span>
                                </div>
                            </video>
                        </div>
                    </div>
                </div>
            </section>

            {/* Action Banner Section */}
            <section 
                id='achievements' 
                className='bg-[#333136] flex w-full flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
                <div className='space-y-12 text-center'>
                    <h2 className='text-3xl leading-tight font-bold text-white sm:text-5xl lg:text-7xl'>
                        Luna Pictures has helped create
                        <span className='mt-4 block text-4xl text-blue-400 sm:text-6xl lg:text-8xl'>
                            500+ Amazing Projects
                        </span>
                    </h2>

                    <div className='mx-auto grid max-w-4xl grid-cols-1 gap-8 pt-12 md:grid-cols-3'>
                        <div className='space-y-2 text-center'>
                            <div className='text-3xl font-bold text-white sm:text-4xl lg:text-5xl'>150+</div>
                            <div className='text-lg text-gray-300'>Films & Commercials</div>
                        </div>
                        <div className='space-y-2 text-center'>
                            <div className='text-3xl font-bold text-white sm:text-4xl lg:text-5xl'>200+</div>
                            <div className='text-lg text-gray-300'>VFX Shots</div>
                        </div>
                        <div className='space-y-2 text-center'>
                            <div className='text-3xl font-bold text-white sm:text-4xl lg:text-5xl'>50+</div>
                            <div className='text-lg text-gray-300'>Happy Clients</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section 
                id='testimonials' 
                className='bg-[#333136] flex w-full flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8'>
                <div className='space-y-12 text-center'>
                    <h2 className='mb-16 text-3xl font-bold text-white sm:text-5xl lg:text-6xl'>
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
