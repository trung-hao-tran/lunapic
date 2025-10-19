'use client';

import React from 'react';

interface ScrollIndicatorProps {
    targetId: string;
    duration?: number; // in milliseconds, defaults to 1500ms
}

export function ScrollIndicator({ targetId, duration = 1500 }: ScrollIndicatorProps) {
    const handleScroll = () => {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let start: number | null = null;

            const animation = (currentTime: number) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);

                // Easing function for smooth animation
                const easeInOutCubic =
                    progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                window.scrollTo(0, startPosition + distance * easeInOutCubic);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        }
    };

    return (
        <button
            onClick={handleScroll}
            className='cursor-pointer transition-opacity hover:opacity-70'
            aria-label={`Scroll to ${targetId} section`}>
            <div className='animate-bounce'>
                <svg className='h-8 w-8' fill='none' stroke='white' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
            </div>
        </button>
    );
}
