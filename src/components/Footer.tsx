import Image from 'next/image';
import Link from 'next/link';

import { StarFrame } from './StarFrame';

const footerLinks = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT US', href: '#about' },
    { label: 'PRODUCTION', href: '#production' },
    { label: 'VFX', href: '#vfx' },
    { label: 'PROJECT', href: '#work' },
    { label: 'CONTACT US', href: '#contact' }
];

const socialLinks = [
    { label: 'INSTAGRAM', href: '#', icon: '/instagram-icon.svg' },
    { label: 'YOUTUBE', href: '#', icon: '/youtube-icon.svg' },
    { label: 'FACEBOOK', href: '#', icon: '/facebook-icon.svg' }
];

export function Footer() {
    return (
        <footer className='bg-[#040404] py-4 text-white'>
            <div className='container mx-auto px-6 md:px-12 lg:px-16'>
                {/* Outer StarFrame */}
                <StarFrame
                    haveBorder={false}
                    direction={['tl', 'br']}
                    starSize={20}
                    color='white'
                    padding={5}
                    className='w-full'>
                    {/* Inner StarFrame with all content */}
                    <StarFrame
                        haveBorder={false}
                        direction={['tl', 'br']}
                        starSize={20}
                        color='white'
                        padding={5}
                        className='w-full'>
                        <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
                            {/* Left Section */}
                            <div className='space-y-8'>
                                {/* Logo */}
                                <div className='py-4'>
                                    <Image
                                        src='/Logo full.svg'
                                        alt='Luna Pictures'
                                        width={500}
                                        height={80}
                                        className='h-auto w-full max-w-lg'
                                    />
                                </div>

                                {/* Navigation Links */}
                                <nav className='flex flex-col gap-3'>
                                    {footerLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className='text-sm transition-colors hover:text-white/80'
                                            style={{
                                                fontFamily: '"Geist Mono", monospace',
                                                letterSpacing: '-0.07px'
                                            }}>
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            {/* Right Section */}
                            <div className='flex flex-col items-start justify-between md:items-end'>
                                {/* Tagline with decorative elements */}
                                <div className='flex items-center gap-6'>
                                    <span className='text-8xl text-white/40'>(</span>
                                    <div className='text-center'>
                                        <p
                                            className='text-2xl md:text-3xl'
                                            style={{
                                                fontFamily: '"Geist Mono", monospace',
                                                letterSpacing: '-0.07px'
                                            }}>
                                            YOUR STORY
                                        </p>
                                        <p
                                            className='text-2xl md:text-3xl'
                                            style={{
                                                fontFamily: '"Geist Mono", monospace',
                                                letterSpacing: '-0.07px'
                                            }}>
                                            OUR VISION
                                        </p>
                                    </div>
                                    <span className='text-8xl text-white/40'>)</span>
                                </div>

                                {/* Social Links */}
                                <nav className='mt-8 flex flex-col items-start gap-3 md:items-end'>
                                    {socialLinks.map((link) => (
                                        <Link
                                            key={link.label}
                                            href={link.href}
                                            className='text-sm transition-colors hover:text-white/80'
                                            style={{
                                                fontFamily: '"Geist Mono", monospace',
                                                letterSpacing: '-0.07px'
                                            }}>
                                            {link.label}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>

                        {/* Copyright */}
                        <div className='mt-12 text-center'>
                            <p
                                className='text-xs text-white/60'
                                style={{
                                    fontFamily: '"Geist Mono", monospace',
                                    letterSpacing: '-0.07px'
                                }}>
                                Luna Pictures 2025. All rights reserved.
                            </p>
                        </div>
                    </StarFrame>
                </StarFrame>
            </div>
        </footer>
    );
}
