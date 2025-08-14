'use client';

import React from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { SiInstagram, SiLinkedin, SiX, SiYoutube } from 'react-icons/si';

const DURATION = 0.25;
const STAGGER = 0.025;

const SOCIAL_LINKS = [
    { Component: SiYoutube, href: 'https://youtube.com', name: 'YouTube' },
    { Component: SiInstagram, href: 'https://instagram.com', name: 'Instagram' },
    { Component: SiX, href: 'https://x.com', name: 'X' },
    { Component: SiLinkedin, href: 'https://linkedin.com', name: 'LinkedIn' }
];

const FlipLink = ({ children, href }: { children: string; href: string }) => {
    return (
        <motion.a
            initial='initial'
            whileHover='hovered'
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='relative block overflow-hidden text-lg font-black whitespace-nowrap text-[#F9F9F9] uppercase sm:text-xl'
            style={{
                lineHeight: 0.75
            }}
            variants={{
                initial: { rotate: 0 },
                hovered: { rotate: 0 }
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}>
            <div>
                {children.split('').map((l, i) => (
                    <motion.span
                        variants={{
                            initial: {
                                y: 0
                            },
                            hovered: {
                                y: '-100%'
                            }
                        }}
                        transition={{
                            duration: DURATION,
                            ease: 'easeInOut',
                            delay: STAGGER * i
                        }}
                        className='inline-block'
                        key={i}>
                        {l}
                    </motion.span>
                ))}
            </div>
            <div className='absolute inset-0'>
                {children.split('').map((l, i) => (
                    <motion.span
                        variants={{
                            initial: {
                                y: '100%'
                            },
                            hovered: {
                                y: 0
                            }
                        }}
                        transition={{
                            duration: DURATION,
                            ease: 'easeInOut',
                            delay: STAGGER * i
                        }}
                        className='inline-block text-blue-400'
                        key={i}>
                        {l}
                    </motion.span>
                ))}
            </div>
        </motion.a>
    );
};

const SocialIcon = ({ Component, href, name }: { Component: any; href: string; name: string }) => {
    return (
        <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'
            aria-label={name}>
            <Component className='h-6 w-6' />
        </a>
    );
};

const Footer = () => {
    return (
        <footer className='bg-[#333136] py-12'>
            <div className='mx-auto max-w-6xl px-4'>
                {/* Desktop Layout */}
                <div className='hidden md:flex md:items-center md:justify-between'>
                    {/* Logo Section */}
                    <div className='flex-shrink-0'>
                        <img src='/Logo full.svg' alt='Luna Pictures Logo' className='h-8 w-auto' />
                    </div>
                    <p className='text-[#BDBDBD]'>Luna Pictures 2025. All rights reserved.</p>
                    {/* Social Links Section - Horizontal Stack */}
                    <div className='flex gap-4'>
                        <FlipLink href='https://youtube.com'>YouTube</FlipLink>
                        <FlipLink href='https://instagram.com'>Instagram</FlipLink>
                        <FlipLink href='https://x.com'>X</FlipLink>
                        <FlipLink href='https://linkedin.com'>LinkedIn</FlipLink>
                    </div>
                    {/* Contact and Privacy Links */}
                    <div className='flex gap-3 text-right'>
                        <Link href='/contact' className='text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'>
                            Contact Us
                        </Link>
                        <Link href='/privacy' className='text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'>
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                {/* Mobile Layout - Stacked Vertically */}
                <div className='flex flex-col items-center space-y-6 md:hidden'>
                    {/* Logo Section */}
                    <div className='flex-shrink-0'>
                        <img src='/Logo full.svg' alt='Luna Pictures Logo' className='h-8 w-auto' />
                    </div>

                    {/* Social Links Section - Icons for Mobile */}
                    <div className='flex gap-4'>
                        {SOCIAL_LINKS.map((link) => (
                            <SocialIcon key={link.name} Component={link.Component} href={link.href} name={link.name} />
                        ))}
                    </div>

                    {/* Contact and Privacy Links */}
                    <div className='flex flex-col items-center gap-3'>
                        <Link href='/contact' className='text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'>
                            Contact Us
                        </Link>
                        <Link href='/privacy' className='text-[#F9F9F9] transition-colors hover:text-[#BDBDBD]'>
                            Privacy Policy
                        </Link>
                    </div>

                    {/* Copyright */}
                    <p className='text-center text-[#BDBDBD]'>Luna Pictures 2025. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
