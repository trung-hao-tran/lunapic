import React, { useState } from 'react';

import { motion } from 'framer-motion';

interface AnimatedUnderlineProps {
    children: React.ReactNode;
    isActive?: boolean;
    strokeColor?: string;
    className?: string;
}

export const AnimatedUnderline: React.FC<AnimatedUnderlineProps> = ({
    children,
    isActive = false,
    strokeColor = '#F9F9F9',
    className = ''
}) => {
    return (
        <span className={`relative ${className}`}>
            {children}
            <svg viewBox='0 0 200 20' fill='none' className='absolute top-auto -right-1 -bottom-1 -left-1 h-3 w-full'>
                <motion.path
                    initial={{ pathLength: 0 }}
                    whileHover={{ pathLength: 1 }}
                    animate={{ pathLength: isActive ? 1 : 0 }}
                    transition={{
                        duration: 0.6,
                        ease: 'easeInOut'
                    }}
                    d='M10 15C50 8, 150 8, 190 15C150 12, 50 12, 10 15Z'
                    stroke={strokeColor}
                    strokeWidth='2'
                    fill='none'
                />
            </svg>
        </span>
    );
};

// Alternative circle version for special highlights
export const AnimatedCircle: React.FC<AnimatedUnderlineProps> = ({
    children,
    isActive = false,
    strokeColor = '#F9F9F9',
    className = ''
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {children}
            <svg
                viewBox='0 0 286 75'
                fill='none'
                className='pointer-events-none absolute -top-1 -right-2 -bottom-1 -left-2 h-full scale-y-120 rotate-5'>
                <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isActive || isHovered ? 1 : 0 }}
                    transition={{
                        duration: 0.5,
                        ease: 'easeInOut'
                    }}
                    d='M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1'
                    stroke={strokeColor}
                    strokeWidth='12'
                    fill='none'
                />
            </svg>
        </span>
    );
};
