'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { FiArrowRight } from 'react-icons/fi';
import { SiInstagram, SiLinkedin, SiX, SiYoutube } from 'react-icons/si';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const navigationItems = [
    { name: 'About us', href: '/about' },
    { name: 'Product team', href: '/product-team' },
    { name: 'VFX team', href: '/vfx-team' },
    { name: 'Projects', href: '/projects' },
    { name: 'Join us', href: '/join' }
];

const SOCIAL_LINKS = [
    { Component: SiX, href: 'https://x.com' },
    { Component: SiInstagram, href: 'https://instagram.com' },
    { Component: SiLinkedin, href: 'https://linkedin.com' },
    { Component: SiYoutube, href: 'https://youtube.com' }
];

const UNDERLAY_VARIANTS = {
    open: {
        width: '70vw',
        height: 'calc(100vh - 32px)',
        transition: { type: 'spring', mass: 3, stiffness: 400, damping: 50 }
    },
    closed: {
        width: '80px',
        height: '80px',
        transition: {
            delay: 0.75,
            type: 'spring',
            mass: 3,
            stiffness: 400,
            damping: 50
        }
    }
};

const HAMBURGER_VARIANTS = {
    top: {
        open: {
            rotate: ['0deg', '0deg', '45deg'],
            top: ['35%', '50%', '50%']
        },
        closed: {
            rotate: ['45deg', '0deg', '0deg'],
            top: ['50%', '50%', '35%']
        }
    },
    middle: {
        open: {
            rotate: ['0deg', '0deg', '-45deg']
        },
        closed: {
            rotate: ['-45deg', '0deg', '0deg']
        }
    },
    bottom: {
        open: {
            rotate: ['0deg', '0deg', '45deg'],
            bottom: ['35%', '50%', '50%'],
            left: '50%'
        },
        closed: {
            rotate: ['45deg', '0deg', '0deg'],
            bottom: ['50%', '50%', '35%'],
            left: 'calc(50% + 10px)'
        }
    }
};

// Simple Hamburger Button (same as original Navigation)
const HamburgerButton = ({ active, setActive }: { active: boolean; setActive: (active: boolean) => void }) => {
    return (
        <button
            onClick={() => setActive(!active)}
            className='fixed top-4 left-4 z-[70] flex h-10 w-10 items-center justify-center rounded-md bg-transparent transition-colors hover:bg-white/20'>
            {active ? <X className='h-6 w-6 text-white' /> : <Menu className='h-6 w-6 text-white' />}
        </button>
    );
};

// Mobile Menu Overlay
const LinksOverlay = ({ onClose }: { onClose: () => void }) => {
    return (
        <nav className='fixed top-0 left-0 z-60 flex h-screen w-screen flex-col overflow-hidden bg-[#333136]'>
            {/* Header with logo - same line as X button */}
            <div className='flex items-center justify-center p-4'>
                <img src='/logo.svg' alt='Logo' className='h-8 w-auto' />
            </div>
            <div className='flex flex-1'>
                {/* Column 1: Social Media */}
                <div className='flex w-1/4 flex-col'>
                    <div className='p-4'></div>
                    <SocialColumn />
                </div>

                {/* Column 2: Navigation items and Contact */}
                <div className='flex w-3/4 flex-col'>
                    <LinksContainer onClose={onClose} />
                    <ContactButton />
                </div>
            </div>
        </nav>
    );
};

// Logo Component
const Logo = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.5, duration: 0.5, ease: 'easeInOut' }
            }}
            exit={{ opacity: 0, y: -12 }}
            className='grid h-20 w-20 place-content-center rounded-tl-xl rounded-br-xl bg-white transition-colors hover:bg-[#F9F9F9]'>
            <Link href='/'>
                <Image src='/logo.svg' alt='Logo' width={50} height={39} className='h-8 w-auto' />
            </Link>
        </motion.div>
    );
};

// Social Column
const SocialColumn = () => {
    return (
        <div className='flex flex-1 flex-col justify-end p-4'>
            <div className='flex flex-col-reverse gap-4'>
                {SOCIAL_LINKS.map((link, idx) => (
                    <motion.a
                        key={idx}
                        href={link.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        initial={{ opacity: 0, y: -8 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                delay: 1 + idx * 0.125,
                                duration: 0.5,
                                ease: 'easeInOut'
                            }
                        }}
                        exit={{ opacity: 0, y: -8 }}>
                        <link.Component className='text-xl text-white transition-colors hover:text-[#BDBDBD]' />
                    </motion.a>
                ))}
            </div>
        </div>
    );
};

// Links Container
const LinksContainer = ({ onClose }: { onClose: () => void }) => {
    return (
        <motion.div className='flex-1 space-y-4 p-12 pl-4'>
            {navigationItems.map((link, idx) => (
                <NavLink key={link.name} href={link.href} idx={idx} onClose={onClose}>
                    {link.name}
                </NavLink>
            ))}
        </motion.div>
    );
};

// Individual Nav Link
const NavLink = ({
    children,
    href,
    idx,
    onClose
}: {
    children: string;
    href: string;
    idx: number;
    onClose: () => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    delay: 0.75 + idx * 0.125,
                    duration: 0.5,
                    ease: 'easeInOut'
                }
            }}
            exit={{ opacity: 0, y: -8 }}>
            <Link
                href={href}
                onClick={onClose}
                className='block text-2xl font-semibold text-[#F9F9F9] transition-colors hover:text-[#BDBDBD] md:text-3xl'>
                {children}
            </Link>
        </motion.div>
    );
};

// Contact Button
const ContactButton = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: {
                    delay: 1.125,
                    duration: 0.5,
                    ease: 'easeInOut'
                }
            }}
            exit={{ opacity: 0, y: 8 }}
            className='p-4'>
            <Link
                href='/contact'
                className='flex items-center gap-2 rounded-full bg-[#F9F9F9] px-6 py-3 text-lg text-[#020202] uppercase transition-colors hover:bg-[#BDBDBD]'>
                <span>contact us</span> <FiArrowRight />
            </Link>
        </motion.div>
    );
};

// Main Mobile Menu Component
const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        setActive(isOpen);
    }, [isOpen]);

    const handleClose = React.useCallback(() => {
        setActive(false);
        onClose();
    }, [onClose]);

    const handleSetActive = React.useCallback(
        (newActive: boolean) => {
            if (newActive) {
                setActive(true);
            } else {
                handleClose();
            }
        },
        [handleClose]
    );

    return (
        <>
            <HamburgerButton active={active} setActive={handleSetActive} />
            <AnimatePresence mode='wait'>
                {active && <LinksOverlay key='mobile-menu' onClose={handleClose} />}
            </AnimatePresence>
        </>
    );
};

export default MobileMenu;
