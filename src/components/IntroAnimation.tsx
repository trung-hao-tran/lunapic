'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ children, onIntroComplete }: { children: React.ReactNode; onIntroComplete?: () => void }) => {
    const [showIntro, setShowIntro] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        // Check if intro has been played this session
        const hasPlayedIntro = sessionStorage.getItem('lunaIntroPlayed');

        if (!hasPlayedIntro) {
            setShowIntro(true);

            // Auto-complete intro after WebP animation duration (adjust based on your animation length)
            const introTimer = setTimeout(() => {
                handleIntroEnd();
            }, 5000); // Adjust this to match your WebP duration

            return () => clearTimeout(introTimer);
        } else {
            // If intro was already played, trigger callback immediately
            onIntroComplete?.();
        }
    }, [onIntroComplete]);

    const handleIntroEnd = () => {
        sessionStorage.setItem('lunaIntroPlayed', 'true');

        // Immediately hide intro without animation
        setShowIntro(false);
        onIntroComplete?.(); // Trigger callback when intro completes
    };

    // If intro shouldn't show, just render children
    if (!showIntro) {
        return <>{children}</>;
    }

    return (
        <>
            <AnimatePresence>
                {showIntro && (
                    <>
                        {/* WebP Animation overlay - no exit animation */}
                        <div className='fixed inset-0 z-[9999] flex items-center justify-center bg-black'>
                            <img
                                ref={imageRef}
                                src='videos/intro.webp'
                                alt='Luna Pictures Intro'
                                className='max-h-full max-w-full object-contain'
                                onLoad={() => console.log('WebP animation loaded')}
                                onError={() => {
                                    console.log('WebP failed to load, skipping intro');
                                    handleIntroEnd();
                                }}
                            />
                            {/* Fallback for browsers that don't support WebP */}
                            <noscript>
                                <div className='flex h-full w-full items-center justify-center bg-black'>
                                    <div className='animate-pulse text-2xl font-bold text-white'>LUNA PICTURES</div>
                                </div>
                            </noscript>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className={showIntro ? 'invisible' : 'visible'}>{children}</div>
        </>
    );
};

export default IntroAnimation;
