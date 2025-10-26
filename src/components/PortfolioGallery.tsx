'use client';

import React, { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { PortfolioItem } from '@/data/dummyData';

import { BoxButton } from './BoxButton';
import { StarFrame } from './StarFrame';

interface PortfolioGalleryProps {
    items: PortfolioItem[];
    hasViewMoreButton?: boolean;
    hasViewWorkButton?: boolean;
}

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
    hasViewWorkButton = false
}: PortfolioGalleryProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            {(() => {
                // Sort items by order
                const sortedItems = [...items].sort((a, b) => a.order - b.order);

                // Build rows based on weight
                const rows: (typeof items)[] = [];
                let currentRow: typeof items = [];
                let currentRowWidth = 0;
                const GAP = 0.05;
                const MAX_ROW_WIDTH = 3.1;

                sortedItems.forEach((item) => {
                    // Clamp weight between 1 and 3.1
                    const weight = Math.max(1, Math.min(3.1, item.weight || 1));

                    // Calculate total width including gap (except for first item in row)
                    const widthWithGap = currentRow.length > 0 ? weight + GAP : weight;

                    // Check if item fits in current row
                    if (currentRowWidth + widthWithGap <= MAX_ROW_WIDTH) {
                        currentRow.push({ ...item, weight }); // Use clamped weight
                        currentRowWidth += widthWithGap;
                    } else {
                        // Start new row
                        if (currentRow.length > 0) {
                            rows.push(currentRow);
                        }
                        currentRow = [{ ...item, weight }];
                        currentRowWidth = weight;
                    }
                });

                // Add last row
                if (currentRow.length > 0) {
                    rows.push(currentRow);
                }

                // Limit to 2 rows if hasViewMoreButton and not expanded
                const displayRows = hasViewMoreButton && !isExpanded ? rows.slice(0, 2) : rows;

                // Render rows
                return displayRows.map((rowItems, rowIdx) => {
                    // Calculate grid template columns as percentages based on 3.1 max width
                    // Gap weight is 0.05, which is (0.05/3.1) = 1.61% of container
                    const gapPercentage = (GAP / MAX_ROW_WIDTH) * 100;

                    const gridCols = rowItems
                        .map((item) => {
                            const weight = item.weight || 1;
                            const percentage = (weight / MAX_ROW_WIDTH) * 100;

                            return `${percentage.toFixed(4)}%`;
                        })
                        .join(' ');

                    // Calculate gap size as percentage
                    const gapSize = `${gapPercentage.toFixed(4)}%`;

                    // Animation classes - rows beyond first 2 get staggered animation
                    const isNewRow = hasViewMoreButton && rowIdx >= 2;
                    const animationDelay = isNewRow ? `${(rowIdx - 2) * 150}ms` : '0ms';
                    const animationClass = isNewRow && isExpanded ? 'animate-[fadeInUp_0.6s_ease-out_forwards]' : '';

                    return (
                        <div
                            key={rowIdx}
                            className={`grid grid-cols-1 md:[grid-template-columns:var(--grid-template)] md:[gap:var(--gap-size)] ${animationClass}`}
                            style={
                                {
                                    '--grid-template': gridCols,
                                    '--gap-size': gapSize,
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

                                return (
                                    <Link
                                        key={item.id}
                                        href={`/portfolio/${item.id}`}
                                        className='group relative block transition-transform duration-300 hover:scale-[1.02]'>
                                        <StarFrame
                                            haveBorder={true}
                                            direction={starDirection as Array<'tl' | 'tr' | 'bl' | 'br'>}
                                            starSize={30}
                                            color='white'
                                            borderColor='white'
                                            padding={7}
                                            className='w-full'>
                                            <div className='relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-[25rem]'>
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    fill
                                                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                                                />
                                            </div>
                                        </StarFrame>

                                        {/* Item Info */}
                                        <div className='mt-6 mb-8 flex items-start justify-between'>
                                            <div className='space-y-2'>
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
                                            <div className='flex flex-col items-end justify-between gap-2'>
                                                {/* Display all categories */}
                                                <div className='flex flex-wrap justify-end gap-2'>
                                                    {item.categories.map((category, catIdx) => (
                                                        <span
                                                            key={catIdx}
                                                            className='flex items-center justify-center rounded-full border border-white/40 px-4'
                                                            style={{
                                                                color: '#FFF',
                                                                fontFamily: '"Geist Mono", monospace',
                                                                fontSize: '1rem',
                                                                fontWeight: 400,
                                                                lineHeight: 'normal',
                                                                letterSpacing: '-0.005rem',
                                                                height: '2.1875rem',
                                                                flexShrink: 0
                                                            }}>
                                                            {category}
                                                        </span>
                                                    ))}
                                                </div>
                                                <svg
                                                    className='mt-2 transition-transform duration-300 group-hover:translate-x-1'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width='22'
                                                    height='22'
                                                    viewBox='0 0 22 22'
                                                    fill='none'>
                                                    <path
                                                        d='M1 11H20.5M20.5 11L11.5 1M20.5 11L11.5 20.5'
                                                        stroke='white'
                                                        strokeWidth='2'
                                                        strokeLinecap='round'
                                                    />
                                                </svg>
                                            </div>
                                        </div>
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

            {/* View More/Less Buttons */}
            {hasViewMoreButton && (
                <div className='flex justify-center pt-8'>
                    {!isExpanded ? (
                        <BoxButton text='VIEW MORE' icon={<DownArrowIcon />} onClick={() => setIsExpanded(true)} />
                    ) : (
                        <BoxButton text='VIEW LESS' icon={<UpArrowIcon />} onClick={() => setIsExpanded(false)} />
                    )}
                </div>
            )}
        </>
    );
}
