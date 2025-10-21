'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

interface MenuItem {
    label: string;
    href?: string;
    dropdown?: { label: string; href: string }[];
}

const desktopMenuItems: MenuItem[] = [
    { label: 'ABOUT US', href: '/about' },
    {
        label: 'SERVICES',
        dropdown: [
            { label: 'VFX', href: '#vfx' },
            { label: 'PRODUCTION', href: '#production' }
        ]
    },
    { label: 'WORK', href: '#work' },
    { label: 'CONTACT US', href: '#contact' }
];

const mobileMenuItems = [
    { label: 'ABOUT US', href: '/about' },
    { label: 'VFX', href: '#vfx' },
    { label: 'PRODUCTION', href: '#production' },
    { label: 'WORK', href: '#work' },
    { label: 'CONTACT US', href: '#contact' }
];

export function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if at top
            setIsAtTop(currentScrollY < 50);

            // Determine scroll direction and visibility
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down & past threshold - hide nav
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show nav
                setIsVisible(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
                mobileMenuOpen || !isAtTop ? 'bg-[#040404]' : ''
            } ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
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
                    <div className='hidden items-center gap-4 md:flex'>
                        {desktopMenuItems.map((item) =>
                            item.dropdown ? (
                                <div
                                    key={item.label}
                                    className='relative'
                                    onMouseEnter={() => setServicesDropdownOpen(true)}
                                    onMouseLeave={() => setServicesDropdownOpen(false)}>
                                    {/* Button - first item with top bracket */}
                                    <button
                                        className='group relative flex items-center gap-1 px-3 py-1'
                                        style={{
                                            fontFamily: '"Geist Mono", monospace',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            letterSpacing: '-0.07px'
                                        }}>
                                        {/* Top bracket corners when expanded */}
                                        {servicesDropdownOpen && (
                                            <>
                                                <span className='absolute top-1/2 left-0 h-4 w-2 -translate-y-1/2 border-t border-l border-white' />
                                                <span className='absolute top-1/2 right-0 h-4 w-2 -translate-y-1/2 border-t border-r border-white' />
                                                {/* Vertical borders extending down */}
                                                <span className='absolute top-[calc(50%+0.5rem)] bottom-0 left-0 border-l border-white' />
                                                <span className='absolute top-[calc(50%+0.5rem)] right-0 bottom-0 border-r border-white' />
                                            </>
                                        )}

                                        {/* Small bracket corners when not expanded */}
                                        {!servicesDropdownOpen && (
                                            <>
                                                <span className='absolute top-1/2 left-0 h-4 w-2 -translate-y-1/2 border-t border-b border-l border-white/40 transition-colors group-hover:border-white' />
                                                <span className='absolute top-1/2 right-0 h-4 w-2 -translate-y-1/2 border-t border-r border-b border-white/40 transition-colors group-hover:border-white' />
                                            </>
                                        )}

                                        {/* Menu text */}
                                        <span className='transition-colors group-hover:text-white/80'>{item.label}</span>

                                        {/* Dropdown icon */}
                                        <svg
                                            className={`ml-2 h-3 w-3 transition-transform ${
                                                servicesDropdownOpen ? 'rotate-180' : ''
                                            }`}
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'>
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M19 9l-7 7-7-7'
                                            />
                                        </svg>
                                    </button>

                                    {/* Dropdown items - appear on hover */}
                                    {servicesDropdownOpen && (
                                        <div className='absolute top-full right-0 left-0 -mt-1'>
                                            {item.dropdown?.map((subItem, idx) => {
                                                const isLast = item.dropdown && idx === item.dropdown.length - 1;

                                                return (
                                                    <Link
                                                        key={subItem.label}
                                                        href={subItem.href}
                                                        className='group relative block px-4 py-1 text-sm transition-colors'
                                                        style={{
                                                            fontFamily: '"Geist Mono", monospace',
                                                            letterSpacing: '-0.07px'
                                                        }}>
                                                        {/* Left and right borders for all items */}
                                                        <span
                                                            className={`absolute top-0 left-0 border-l border-white ${isLast ? 'bottom-1/2' : 'bottom-0'}`}
                                                        />
                                                        <span
                                                            className={`absolute top-0 right-0 border-r border-white ${isLast ? 'bottom-1/2' : 'bottom-0'}`}
                                                        />

                                                        {/* Bottom corners for last item */}
                                                        {isLast && (
                                                            <>
                                                                <span className='absolute bottom-1/2 left-0 h-4 w-2 translate-y-1/2 border-b border-l border-white' />
                                                                <span className='absolute right-0 bottom-1/2 h-4 w-2 translate-y-1/2 border-r border-b border-white' />
                                                            </>
                                                        )}

                                                        <span className='transition-colors group-hover:text-white/80'>
                                                            {subItem.label}
                                                        </span>
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.href!}
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
                            )
                        )}

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
                className={`fixed inset-0 top-[72px] bg-[#040404] transition-all duration-300 md:hidden ${
                    mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
                }`}>
                <div className='container mx-auto flex flex-col gap-4 px-6 pt-6'>
                    {mobileMenuItems.map((item) => (
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
                </div>
            </div>
        </nav>
    );
}
