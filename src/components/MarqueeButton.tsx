'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MarqueeButtonProps {
    children: string;
    href?: string;
    className?: string;
}

const MarqueeButton = ({ children, href = '/contact', className = '' }: MarqueeButtonProps) => {
    const buttonContent = (
        <motion.button
            whileHover={{
                scale: 1.05,
            }}
            whileTap={{
                scale: 0.95,
            }}
            className={`relative overflow-hidden rounded-full bg-[#020202] px-6 py-3 text-lg font-semibold uppercase text-[#F9F9F9] transition-all hover:bg-[#333136] focus:ring-2 focus:ring-[#020202] focus:outline-none ${className}`}
        >
            <motion.span
                className="block whitespace-nowrap"
                initial={{ x: "0%" }}
                animate={{
                    x: "calc(-100% - 6px)",
                }}
                transition={{
                    ease: "linear",
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                }}
            >
                {children} •{" "}
            </motion.span>

            <motion.span
                initial={{ x: "calc(-100% - 6px)" }}
                animate={{
                    x: "calc(-200% - 12px)",
                }}
                transition={{
                    ease: "linear",
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                }}
                className="absolute left-6 top-3 block whitespace-nowrap"
            >
                {children} •
            </motion.span>
            <motion.span
                initial={{ x: "calc(100% + 6px)" }}
                animate={{
                    x: "0%",
                }}
                transition={{
                    ease: "linear",
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                }}
                className="absolute left-6 top-3 block whitespace-nowrap"
            >
                {children} •
            </motion.span>
            <motion.span
                initial={{ x: "calc(200% + 12px)" }}
                animate={{
                    x: "calc(100% + 6px)",
                }}
                transition={{
                    ease: "linear",
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                }}
                className="absolute left-6 top-3 block whitespace-nowrap"
            >
                {children} •
            </motion.span>
        </motion.button>
    );

    if (href) {
        return (
            <Link href={href} className="inline-block">
                {buttonContent}
            </Link>
        );
    }

    return buttonContent;
};

export default MarqueeButton;