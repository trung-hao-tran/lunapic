'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { motion, useScroll, useTransform } from 'framer-motion';
import MobileMenu from './MobileMenu';

const navigationItems = [
    { name: 'About us', href: '/about' },
    { name: 'Product team', href: '/product-team' },
    { name: 'VFX team', href: '/vfx-team' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact us', href: '/contact' },
    { name: 'Join us', href: '/join' }
];

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);
    const { scrollY } = useScroll();

    useEffect(() => {
        // Set window height and trigger animation after component mounts
        setWindowHeight(window.innerHeight);
        setIsVisible(true);
    }, []);

    const backgroundOpacity = useTransform(
        scrollY,
        [0, windowHeight * 0.3], // 0 to 30vh
        [0, 0.95] // transparent to 95% opacity
    );

    return (
        <>
            <motion.nav
                className='fixed top-0 right-0 left-0 z-50'
                style={{
                    backgroundColor: useTransform(
                        backgroundOpacity,
                        (opacity) => `rgba(51, 49, 54, ${opacity})` // #333136 with dynamic opacity
                    )
                }}>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                    <div className='flex h-16 items-center'>
                    {/* Mobile hamburger placeholder */}
                    <div className='w-10 md:hidden'></div>

                    {/* Desktop left navigation */}
                    <div className='hidden md:flex md:flex-1 md:justify-end md:space-x-6 md:pr-8'>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                            transition={{ delay: 0.6, duration: 0.5 }}>
                            <Link
                                href='/about'
                                className='focus:bg-accent focus:text-accent-foreground active:bg-accent active:text-accent-foreground flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors'>
                                About us
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                            transition={{ delay: 0.4, duration: 0.5 }}>
                            <Link
                                href='/product-team'
                                className='focus:bg-accent focus:text-accent-foreground active:bg-accent active:text-accent-foreground flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors'>
                                Product team
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                            transition={{ delay: 0.2, duration: 0.5 }}>
                            <Link
                                href='/vfx-team'
                                className='focus:bg-accent focus:text-accent-foreground active:bg-accent active:text-accent-foreground flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors'>
                                VFX team
                            </Link>
                        </motion.div>
                    </div>

                    {/* Logo - centered */}
                    <motion.div
                        className='flex flex-1 justify-center md:absolute md:left-1/2 md:-translate-x-1/2 md:transform'
                        initial={{ opacity: 0, y: -30 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                        transition={{ delay: 0, duration: 0.6, ease: 'easeOut' }}>
                        <Link
                            href='/'
                            className='focus:ring-primary rounded-md px-2 py-1 focus:ring-2 focus:outline-none'>
                            <Image src='/logo.svg' alt='Logo' width={120} height={40} className='h-8 w-auto' />
                        </Link>
                    </motion.div>

                    {/* Desktop right navigation */}
                    <div className='hidden md:flex md:flex-1 md:justify-start md:space-x-6 md:pl-8'>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                            transition={{ delay: 0.2, duration: 0.5 }}>
                            <Link
                                href='/projects'
                                className='focus:bg-accent focus:text-accent-foreground active:bg-accent active:text-accent-foreground flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors'>
                                Projects
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                            transition={{ delay: 0.4, duration: 0.5 }}>
                            <Link
                                href='/contact'
                                className='focus:bg-accent focus:text-accent-foreground active:bg-accent active:text-accent-foreground flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors'>
                                Contact us
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                            transition={{ delay: 0.6, duration: 0.5 }}>
                            <Link
                                href='/join'
                                className='focus:bg-accent focus:text-accent-foreground active:bg-accent active:text-accent-foreground flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors'>
                                Join us
                            </Link>
                        </motion.div>
                    </div>

                    {/* Empty div for mobile layout balance */}
                    <div className='w-10 md:hidden'></div>
                </div>
            </div>
        </motion.nav>

        {/* Mobile Menu */}
        <div className='md:hidden'>
            <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    </>
    );
};

export default Navigation;
