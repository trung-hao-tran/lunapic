'use client';

import { useEffect, useRef, useState } from 'react';

export function AnimatedDiagonalLine() {
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Trigger animation when section reaches 50% of viewport (middle of screen)
                    if (entry.isIntersecting) {
                        setIsAnimating(true);
                    }
                });
            },
            {
                threshold: 0,
                rootMargin: '-50% 0px -50% 0px' // Trigger when element crosses the middle of viewport
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={sectionRef}>
            {/* Diagonal Line SVG - Absolute positioned at rightmost edge of section (hidden on mobile) */}
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='532'
                height='650'
                viewBox='0 0 532 866'
                fill='none'
                style={{
                    width: '33.15625rem',
                    height: '40rem',
                    flexShrink: 0,
                    transform: 'scaleX(-1)'
                }}
                className='absolute -top-15 -right-6 hidden md:-right-12 md:block lg:-right-16'>
                <path
                    d='M0.42627 0.263062L530.926 864.763M57.4263 0.263062L211.426 249.263'
                    stroke='white'
                    strokeWidth='1.5'
                    style={{
                        strokeDasharray: 2000,
                        strokeDashoffset: isAnimating ? 0 : 2000,
                        transition: 'stroke-dashoffset 2.5s ease-out'
                    }}
                />
            </svg>
        </div>
    );
}
