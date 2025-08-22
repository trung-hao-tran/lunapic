'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence } from 'framer-motion';

const IntroAnimation = ({ children, onIntroComplete }: { children: React.ReactNode; onIntroComplete?: () => void }) => {
    const [showIntro, setShowIntro] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Check if intro has been played this session
        const hasPlayedIntro = sessionStorage.getItem('lunaIntroPlayed');

        if (!hasPlayedIntro) {
            setShowIntro(true);
        } else {
            // If intro was already played, trigger callback immediately
            onIntroComplete?.();
        }
    }, [onIntroComplete]);

    const handleVideoEnd = () => {
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
                        {/* Video overlay - no animation */}
                        <div className='fixed inset-0 z-[9999] bg-black'>
                            <video
                                ref={videoRef}
                                className='h-full w-full object-cover'
                                autoPlay
                                muted
                                playsInline
                                onEnded={handleVideoEnd}
                                preload='auto'>
                                <source src='videos/intro.mp4' type='video/mp4' />
                                {/* Fallback for browsers that don't support video */}
                                <div className='flex h-full w-full items-center justify-center bg-black'>
                                    <div className='animate-pulse text-2xl font-bold text-white'>LUNA PICTURES</div>
                                </div>
                            </video>
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
