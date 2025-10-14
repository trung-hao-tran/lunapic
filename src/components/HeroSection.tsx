'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

const menuItems = [
    { label: 'ABOUT US', href: '#about' },
    { label: 'SERVICES', href: '#services' },
    { label: 'WORK', href: '#work' },
    { label: 'CONTACT US', href: '#contact' }
];

interface HeroSectionProps {
    children: React.ReactNode;
    backgroundMedia?: string;
    mediaType?: 'image' | 'video';
}

export function HeroSection({ children, backgroundMedia, mediaType = 'video' }: HeroSectionProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <section className='relative min-h-screen bg-[#1B1B1B] text-white overflow-hidden'>
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
                    <div className='absolute inset-0 bg-[#1B1B1B]/60' style={{ zIndex: 1 }} />
                </>
            )}

            {/* Navigation */}
            <nav className='fixed top-0 right-0 left-0 z-50'>
                <div className='container mx-auto px-6 md:px-12 lg:px-16'>
                    <div className='flex items-center justify-between py-6'>
                        {/* Logo */}
                        <Link href='/' className='relative h-8 w-auto'>
                            <Image
                                src='/Logo full.svg'
                                alt='Luna Pictures'
                                width={150}
                                height={32}
                                className='h-8 w-auto'
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className='hidden items-center gap-8 md:flex'>
                            {menuItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className='group relative px-3 py-1'
                                    style={{
                                        fontFamily: '"Geist Mono", monospace',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        letterSpacing: '-0.07px'
                                    }}>
                                    {/* Left bracket using borders */}
                                    <span className='absolute top-1/2 left-0 h-4 w-2 -translate-y-1/2 border-t border-b border-l border-white/40 transition-colors group-hover:border-white' />

                                    {/* Menu text */}
                                    <span className='transition-colors group-hover:text-white/80'>{item.label}</span>

                                    {/* Right bracket using borders */}
                                    <span className='absolute top-1/2 right-0 h-4 w-2 -translate-y-1/2 border-t border-r border-b border-white/40 transition-colors group-hover:border-white' />
                                </Link>
                            ))}

                            {/* Star Icon */}
                            <div className='relative h-6 w-6'>
                                <Image
                                    src='/star.svg'
                                    alt='Star'
                                    width={24}
                                    height={24}
                                    className='h-6 w-6 transition-transform duration-300 hover:rotate-90'
                                />
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className='flex flex-col gap-1.5 p-2 md:hidden'
                            aria-label='Toggle menu'>
                            <span
                                className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
                                    mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
                                }`}
                            />
                            <span
                                className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
                                    mobileMenuOpen ? 'opacity-0' : ''
                                }`}
                            />
                            <span
                                className={`block h-[2px] w-6 bg-white transition-all duration-300 ${
                                    mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
                                }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`overflow-hidden transition-all duration-300 md:hidden ${
                        mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <div className='container mx-auto flex flex-col gap-4 px-6 pb-6'>
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className='relative inline-block w-fit px-3 py-1 text-sm font-medium'
                                style={{
                                    fontFamily: '"Geist Mono", monospace',
                                    letterSpacing: '-0.07px'
                                }}>
                                {/* Left bracket using borders */}
                                <span className='absolute top-1/2 left-0 h-4 w-2 -translate-y-1/2 border-t border-b border-l border-white/40' />

                                {item.label}

                                {/* Right bracket using borders */}
                                <span className='absolute top-1/2 right-0 h-4 w-2 -translate-y-1/2 border-t border-r border-b border-white/40' />
                            </Link>
                        ))}
                        <div className='pt-2'>
                            <Image src='/star.svg' alt='Star' width={24} height={24} className='h-6 w-6' />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Content */}
            <div className='container relative z-10 mx-auto flex min-h-screen flex-col justify-end px-6 pt-32 pb-[20vh] md:px-12 lg:px-16'>
                <div className='max-w-2xl space-y-4'>{children}</div>
            </div>

            {/* Scroll Indicator - Positioned at bottom center */}
            <div className='absolute bottom-8 left-1/2 z-10 -translate-x-1/2'>
                <div className='animate-bounce'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 8 8'
                        width='32'
                        height='32'
                        className='rotate-90'>
                        <path d='M2.5 0L1 1.5L3.5 4L1 6.5L2.5 8l4-4z' fill='white' />
                    </svg>
                </div>
            </div>
        </section>
    );
}
