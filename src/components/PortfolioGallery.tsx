'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { PortfolioItem } from '@/types/content.types';

import { BoxButton } from './BoxButton';
import { StarFrame } from './StarFrame';
import { AnimatePresence, motion } from 'framer-motion';

interface PortfolioGalleryProps {
    items: PortfolioItem[];
    hasViewMoreButton?: boolean;
    hasViewWorkButton?: boolean;
    selectedCategories?: string[];
}

// Constant empty array to prevent infinite loops
const EMPTY_CATEGORIES: string[] = [];

// Fuzzy overlay component for portfolio items
// Layers above the image and gradient (z-15) but below the text info (z-20)
const FuzzyOverlay = ({ show }: { show: boolean }) => {
    return (
        <AnimatePresence>
            {show && (
                <>
                    {/* Dark background layer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.95 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut'
                        }}
                        className='pointer-events-none absolute inset-0 z-[15] bg-black'
                    />
                    {/* Animated noise overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 1,
                            ease: 'easeInOut'
                        }}
                        className='pointer-events-none absolute inset-0 z-[15] opacity-[15%]'>
                        <motion.div
                            initial={{ transform: 'translateX(-20%) translateY(-20%)' }}
                            animate={{
                                transform: 'translateX(20%) translateY(20%)'
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 0.2,
                                ease: 'linear',
                                repeatType: 'mirror'
                            }}
                            style={{
                                backgroundImage: 'url("/black-noise.png")'
                            }}
                            className='absolute -inset-[100%]'
                        />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

// Downward arrow icon for View More button
const DownArrowIcon = () => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='transition-transform duration-300 group-hover:translate-y-1'>
        <path d='M12 5v14M19 12l-7 7-7-7' />
    </svg>
);

// Upward arrow icon for View Less button
const UpArrowIcon = () => (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='transition-transform duration-300 group-hover:-translate-y-1'>
        <path d='M12 19V5M5 12l7-7 7 7' />
    </svg>
);

export function PortfolioGallery({
    items,
    hasViewMoreButton = false,
    hasViewWorkButton = false,
    selectedCategories = EMPTY_CATEGORIES
}: PortfolioGalleryProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [tempUngrayscaledItems, setTempUngrayscaledItems] = useState<Set<string>>(new Set());
    const hoverTimerRef = useRef<Record<string, NodeJS.Timeout>>({});

    // Helper to check if item should be grayscale
    const shouldBeGrayscale = (item: PortfolioItem): boolean => {
        if (selectedCategories.length === 0) return false;

        const hasSelectedCategory = item.categories.some((cat) =>
            selectedCategories.includes(cat.toLowerCase().replace(/\s+/g, '-'))
        );

        return !hasSelectedCategory;
    };

    // Start 5-second timer on hover
    const handleMouseEnter = (itemId: string) => {
        if (hoverTimerRef.current[itemId]) {
            clearTimeout(hoverTimerRef.current[itemId]);
        }

        hoverTimerRef.current[itemId] = setTimeout(() => {
            setTempUngrayscaledItems((prev) => new Set(prev).add(itemId));
        }, 3000);
    };

    // Cancel timer and reset on mouse leave
    const handleMouseLeave = (itemId: string) => {
        if (hoverTimerRef.current[itemId]) {
            clearTimeout(hoverTimerRef.current[itemId]);
            delete hoverTimerRef.current[itemId];
        }

        setTempUngrayscaledItems((prev) => {
            const newSet = new Set(prev);
            newSet.delete(itemId);

            return newSet;
        });
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            Object.values(hoverTimerRef.current).forEach((timer) => clearTimeout(timer));
        };
    }, []);

    // Reset when categories change
    useEffect(() => {
        setTempUngrayscaledItems(new Set());
        Object.values(hoverTimerRef.current).forEach((timer) => clearTimeout(timer));
        hoverTimerRef.current = {};
    }, [selectedCategories]);

    // Helper to convert ratio string to numeric value
    const getRatioValue = (ratio?: string): number => {
        switch (ratio) {
            case '16:9':
                return 16 / 9;
            case '9:16':
                return 9 / 16;
            case '4:3':
                return 4 / 3;
            case '3:4':
                return 3 / 4;
            default:
                return 4 / 3; // Default to 4:3
        }
    };

    // Sort items by order
    const sortedItems = [...items].sort((a, b) => a.order - b.order);

    // Filtering behavior differs by viewport:
    // - Desktop: Keep ALL items, apply fuzzy overlay to non-matching items
    // - Mobile: Hide non-matching items completely via CSS (hidden md:block)
    // We keep all items in the data array and use CSS classes for responsive behavior
    const filteredItems = sortedItems; // No filtering - all items included

    // Build rows based on ratio (max 3 items per row)
    const rows: (typeof items)[] = [];
    const MAX_ITEMS_PER_ROW = 3;

    for (let i = 0; i < filteredItems.length; i += MAX_ITEMS_PER_ROW) {
        rows.push(filteredItems.slice(i, i + MAX_ITEMS_PER_ROW));
    }

    // For mobile: count rows that have at least one matching item
    const mobileVisibleRows = rows.filter((rowItems) =>
        rowItems.some((item) => !shouldBeGrayscale(item))
    );

    // Limit to 2 rows if hasViewMoreButton and not expanded
    const displayRows = hasViewMoreButton && !isExpanded ? rows.slice(0, 2) : rows;

    // Check if there are more rows to show
    // Desktop: all rows count, Mobile: only rows with visible items count
    const hasMoreRowsDesktop = rows.length > 2;
    const hasMoreRowsMobile = mobileVisibleRows.length > 2;

    return (
        <>
            {(() => {

                // Render rows
                return displayRows.map((rowItems, rowIdx) => {
                    // Responsive fixed height (mobile, tablet, desktop)
                    const FIXED_HEIGHT = 400; // px - adjust based on device in Tailwind
                    const GAP_PX = 20; // Gap between items in pixels

                    // Calculate base widths from ratios
                    const itemWidths = rowItems.map((item) => {
                        const ratio = getRatioValue(item.ratio);

                        return FIXED_HEIGHT * ratio;
                    });

                    // Calculate total width and scale factor
                    const totalItemWidth = itemWidths.reduce((sum, w) => sum + w, 0);
                    const totalGapWidth = (rowItems.length - 1) * GAP_PX;
                    const containerWidth = 100; // We'll use percentage

                    // For now, convert to percentages (we'll calculate actual widths dynamically)
                    const totalWidth = totalItemWidth + totalGapWidth;
                    const widthPercentages = itemWidths.map((w) => (w / totalWidth) * 100);

                    // Animation classes - rows beyond first 2 get staggered animation
                    const isNewRow = hasViewMoreButton && rowIdx >= 2;
                    const animationDelay = isNewRow ? `${(rowIdx - 2) * 150}ms` : '0ms';
                    const animationClass = isNewRow && isExpanded ? 'animate-[fadeInUp_0.6s_ease-out_forwards]' : '';

                    return (
                        <div
                            key={rowIdx}
                            className={`mb-16 flex flex-col gap-5 md:flex-row md:h-[400px] ${animationClass}`}
                            style={
                                {
                                    animationDelay: animationDelay,
                                    opacity: isNewRow && !isExpanded ? 0 : 1
                                } as React.CSSProperties
                            }>
                            {rowItems.map((item, idx) => {
                                const isFirst = idx === 0;
                                const isLast = idx === rowItems.length - 1;
                                const starDirection =
                                    isFirst && isLast
                                        ? ['tl', 'tr', 'bl', 'br']
                                        : isFirst
                                          ? ['tl', 'bl']
                                          : isLast
                                            ? ['tr', 'br']
                                            : [];

                                // Calculate flex-grow based on ratio (desktop only)
                                const ratio = getRatioValue(item.ratio);
                                const flexGrow = ratio;

                                // Check if item should have fuzzy overlay (desktop) or be hidden (mobile)
                                const isGrayscale = shouldBeGrayscale(item);
                                const isTemporarilyUngrayscaled = tempUngrayscaledItems.has(item.id);
                                const showFuzzy = isGrayscale && !isTemporarilyUngrayscaled;

                                // On mobile: hide non-matching items entirely
                                // On desktop: show fuzzy overlay
                                const mobileHiddenClass = isGrayscale ? 'hidden md:block' : '';

                                return (
                                    <Link
                                        key={item.id}
                                        href={`/portfolio/${item.id}`}
                                        className={`group relative block w-full transition-transform duration-300 hover:scale-[1.02] md:h-full ${mobileHiddenClass}`}
                                        style={{ flexGrow, flexShrink: 1, flexBasis: 0 }}
                                        onMouseEnter={() => handleMouseEnter(item.id)}
                                        onMouseLeave={() => handleMouseLeave(item.id)}>
                                        <StarFrame
                                            haveBorder={true}
                                            direction={starDirection as Array<'tl' | 'tr' | 'bl' | 'br'>}
                                            starSize={30}
                                            color='white'
                                            borderColor='white'
                                            padding={7}
                                            className='h-full w-full'>
                                            <div className='relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full'>
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    fill
                                                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                                                />

                                                {/* Fuzzy Overlay - Desktop only, when item doesn't match filter */}
                                                <FuzzyOverlay show={showFuzzy} />

                                                {/* Black Gradient Overlay - Bottom */}
                                                <div
                                                    className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1/2 transition-opacity duration-300 group-hover:opacity-0'
                                                    style={{
                                                        background:
                                                            'linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 100%)'
                                                    }}
                                                />

                                                {/* Item Info - Bottom Left Corner */}
                                                <div className='absolute bottom-4 left-4 z-20 space-y-1 transition-opacity duration-300 group-hover:opacity-0'>
                                                    <p
                                                        style={{
                                                            color: '#FFF',
                                                            fontFamily: '"Geist Mono", monospace',
                                                            fontSize: '1rem',
                                                            fontWeight: 700,
                                                            lineHeight: 'normal',
                                                            letterSpacing: '-0.005rem'
                                                        }}>
                                                        [{item.title}]
                                                    </p>
                                                    <p
                                                        style={{
                                                            color: '#FFF',
                                                            fontFamily: '"Geist Mono", monospace',
                                                            fontSize: '1rem',
                                                            fontWeight: 400,
                                                            lineHeight: 'normal',
                                                            letterSpacing: '-0.005rem'
                                                        }}>
                                                        {item.date}
                                                    </p>
                                                </div>
                                            </div>
                                        </StarFrame>
                                    </Link>
                                );
                            })}
                        </div>
                    );
                });
            })()}

            {/* View Portfolio Button */}
            {hasViewWorkButton && (
                <div className='flex justify-center pt-8'>
                    <BoxButton text='VIEW PORTFOLIO' href='/work' />
                </div>
            )}

            {/* View More/Less Buttons - Responsive visibility based on viewport */}
            {hasViewMoreButton && (
                <>
                    {/* Mobile button - only show if there are more mobile-visible rows */}
                    {hasMoreRowsMobile && (
                        <div className='flex justify-center pt-8 md:hidden'>
                            {!isExpanded ? (
                                <BoxButton text='VIEW MORE' icon={<DownArrowIcon />} onClick={() => setIsExpanded(true)} />
                            ) : (
                                <BoxButton text='VIEW LESS' icon={<UpArrowIcon />} onClick={() => setIsExpanded(false)} />
                            )}
                        </div>
                    )}
                    {/* Desktop button - only show if there are more total rows */}
                    {hasMoreRowsDesktop && (
                        <div className='hidden md:flex justify-center pt-8'>
                            {!isExpanded ? (
                                <BoxButton text='VIEW MORE' icon={<DownArrowIcon />} onClick={() => setIsExpanded(true)} />
                            ) : (
                                <BoxButton text='VIEW LESS' icon={<UpArrowIcon />} onClick={() => setIsExpanded(false)} />
                            )}
                        </div>
                    )}
                </>
            )}
        </>
    );
}
