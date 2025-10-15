'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Corner = 'tl' | 'tr' | 'bl' | 'br';

interface StarFrameProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
    direction?: Corner[];
    padding?: number;
    starSize?: number;
    haveBorder?: boolean;
    hasAnimation?: boolean;
}

/**
 * StarFrame component
 * Creates a border around children with star icons at each corner
 * The border lines pass through the center of each star
 * If haveBorder is true: color applies to border, stars are white
 * If haveBorder is false: color applies to stars
 */
export function StarFrame({
    children,
    className = '',
    color = '#787878',
    direction = ['tl', 'tr', 'bl', 'br'],
    padding = 10,
    starSize = 20,
    haveBorder = true,
    hasAnimation = false
}: StarFrameProps) {
    const halfStar = starSize / 2; // Offset to center star on corner
    const borderWidth = 1; // Match star thickness

    const showStar = (corner: Corner) => direction.includes(corner);

    // Animation only works if all 4 stars are present
    const hasAllStars = direction.length === 4;
    const shouldAnimate = hasAnimation && hasAllStars;

    // If haveBorder is true, stars are white and border uses color
    // If haveBorder is false, stars use color
    const starColor = haveBorder ? 'white' : color;
    const borderColor = color;

    return (
        <motion.div className={`relative inline-block ${className}`}>
            {/* Top-left star - stays in corner, fades in */}
            {showStar('tl') && (
                <motion.div
                    className='absolute z-10'
                    initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
                    animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
                    transition={shouldAnimate ? {
                        duration: 0.3,
                        delay: 0.1,
                        ease: 'easeOut'
                    } : undefined}
                    style={{
                        top: -halfStar,
                        left: -halfStar,
                        width: starSize,
                        height: starSize
                    }}>
                    <svg viewBox='0 0 300 300' className='h-full w-full'>
                        <rect x='98.39' y='139.27' width='103.22' height='21.46' fill={starColor} />
                        <rect x='139.27' y='98.39' width='21.46' height='103.22' fill={starColor} />
                    </svg>
                </motion.div>
            )}

            {/* Top-right star - stays in corner, fades in */}
            {showStar('tr') && (
                <motion.div
                    className='absolute z-10'
                    initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
                    animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
                    transition={shouldAnimate ? {
                        duration: 0.3,
                        delay: 0.1,
                        ease: 'easeOut'
                    } : undefined}
                    style={{
                        top: -halfStar,
                        right: -halfStar,
                        width: starSize,
                        height: starSize
                    }}>
                    <svg viewBox='0 0 300 300' className='h-full w-full'>
                        <rect x='98.39' y='139.27' width='103.22' height='21.46' fill={starColor} />
                        <rect x='139.27' y='98.39' width='21.46' height='103.22' fill={starColor} />
                    </svg>
                </motion.div>
            )}

            {/* Bottom-left star - stays in corner, fades in */}
            {showStar('bl') && (
                <motion.div
                    className='absolute z-10'
                    initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
                    animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
                    transition={shouldAnimate ? {
                        duration: 0.3,
                        delay: 0.1,
                        ease: 'easeOut'
                    } : undefined}
                    style={{
                        bottom: -halfStar,
                        left: -halfStar,
                        width: starSize,
                        height: starSize
                    }}>
                    <svg viewBox='0 0 300 300' className='h-full w-full'>
                        <rect x='98.39' y='139.27' width='103.22' height='21.46' fill={starColor} />
                        <rect x='139.27' y='98.39' width='21.46' height='103.22' fill={starColor} />
                    </svg>
                </motion.div>
            )}

            {/* Bottom-right star - stays in corner, fades in */}
            {showStar('br') && (
                <motion.div
                    className='absolute z-10'
                    initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : false}
                    animate={shouldAnimate ? { opacity: 1, scale: 1 } : false}
                    transition={shouldAnimate ? {
                        duration: 0.3,
                        delay: 0.1,
                        ease: 'easeOut'
                    } : undefined}
                    style={{
                        bottom: -halfStar,
                        right: -halfStar,
                        width: starSize,
                        height: starSize
                    }}>
                    <svg viewBox='0 0 300 300' className='h-full w-full'>
                        <rect x='98.39' y='139.27' width='103.22' height='21.46' fill={starColor} />
                        <rect x='139.27' y='98.39' width='21.46' height='103.22' fill={starColor} />
                    </svg>
                </motion.div>
            )}

            {/* Content with animated border - border grows from corners */}
            <motion.div
                initial={shouldAnimate ? {
                    ...(haveBorder && {
                        clipPath: 'inset(0 0 0 0)'
                    })
                } : false}
                animate={shouldAnimate ? {
                    ...(haveBorder && {
                        clipPath: 'inset(0 0 0 0)'
                    })
                } : false}
                style={{
                    ...(haveBorder && {
                        borderColor: borderColor,
                        borderStyle: 'solid'
                    }),
                    padding: `${padding}px`,
                    position: 'relative'
                }}>
                {/* Animated borders - each grows from both stars and meets in middle */}
                {haveBorder && shouldAnimate && (
                    <>
                        {/* Top border - left half grows from left star */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '50%',
                                height: borderWidth,
                                backgroundColor: borderColor,
                                transformOrigin: 'left'
                            }}
                        />
                        {/* Top border - right half grows from right star */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '50%',
                                height: borderWidth,
                                backgroundColor: borderColor,
                                transformOrigin: 'right'
                            }}
                        />
                        {/* Right border - top half grows from top star */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: borderWidth,
                                height: '50%',
                                backgroundColor: borderColor,
                                transformOrigin: 'top'
                            }}
                        />
                        {/* Right border - bottom half grows from bottom star */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.4, delay: 0.5, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: borderWidth,
                                height: '50%',
                                backgroundColor: borderColor,
                                transformOrigin: 'bottom'
                            }}
                        />
                        {/* Bottom border - right half grows from right star */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '50%',
                                height: borderWidth,
                                backgroundColor: borderColor,
                                transformOrigin: 'right'
                            }}
                        />
                        {/* Bottom border - left half grows from left star */}
                        <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.4, delay: 0.6, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '50%',
                                height: borderWidth,
                                backgroundColor: borderColor,
                                transformOrigin: 'left'
                            }}
                        />
                        {/* Left border - bottom half grows from bottom star */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: borderWidth,
                                height: '50%',
                                backgroundColor: borderColor,
                                transformOrigin: 'bottom'
                            }}
                        />
                        {/* Left border - top half grows from top star */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ duration: 0.4, delay: 0.7, ease: 'easeOut' }}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: borderWidth,
                                height: '50%',
                                backgroundColor: borderColor,
                                transformOrigin: 'top'
                            }}
                        />
                    </>
                )}
                {/* Static border for non-animated case - with gaps at stars */}
                {haveBorder && !shouldAnimate && (
                    <>
                        {/* Top border segments */}
                        {showStar('tl') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: halfStar + starSize * 0.05,
                                    right: showStar('tr') ? halfStar + starSize * 0.05 : 0,
                                    height: borderWidth,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}
                        {!showStar('tl') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: showStar('tr') ? halfStar + starSize * 0.05 : 0,
                                    height: borderWidth,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}

                        {/* Right border segments */}
                        {showStar('tr') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: halfStar + starSize * 0.05,
                                    right: 0,
                                    bottom: showStar('br') ? halfStar + starSize * 0.05 : 0,
                                    width: borderWidth,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}
                        {!showStar('tr') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bottom: showStar('br') ? halfStar + starSize * 0.05 : 0,
                                    width: borderWidth,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}

                        {/* Bottom border segments */}
                        {showStar('br') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: halfStar + starSize * 0.05,
                                    left: showStar('bl') ? halfStar + starSize * 0.05 : 0,
                                    height: borderWidth,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}
                        {!showStar('br') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    left: showStar('bl') ? halfStar + starSize * 0.05 : 0,
                                    height: borderWidth,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}

                        {/* Left border segments */}
                        {showStar('bl') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: halfStar + starSize * 0.05,
                                    left: 0,
                                    top: showStar('tl') ? halfStar + starSize * 0.05 : 0,
                                    width: borderWidth,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}
                        {!showStar('bl') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    top: showStar('tl') ? halfStar + starSize * 0.05 : 0,
                                    width: borderWidth,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}
                    </>
                )}
                {/* Content fades in after border animation */}
                <motion.div
                    initial={shouldAnimate ? { opacity: 0 } : false}
                    animate={shouldAnimate ? { opacity: 1 } : false}
                    transition={shouldAnimate ? {
                        duration: 0.4,
                        delay: 1.1,
                        ease: 'easeOut'
                    } : undefined}>
                    {children}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
