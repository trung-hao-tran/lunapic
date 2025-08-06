'use client';

import { useEffect, useRef, useState } from 'react';

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion';

const IntroAnimation = ({ children }: { children: React.ReactNode }) => {
    const [showIntro, setShowIntro] = useState(false);
    const [isSliding, setIsSliding] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Motion values for smooth animation
    const slideProgress = useMotionValue(0);
    const backgroundOpacity = useTransform(slideProgress, [0, 0.5, 1], [1, 0.7, 0]);
    const videoOpacity = useTransform(slideProgress, [0, 0.5, 1], [1, 0.7, 0]);

    useEffect(() => {
        // Check if intro has been played this session
        const hasPlayedIntro = sessionStorage.getItem('lunaIntroPlayed');

        if (!hasPlayedIntro) {
            setShowIntro(true);
        }
    }, []);

    const handleVideoEnd = () => {
        sessionStorage.setItem('lunaIntroPlayed', 'true');

        // Start slide-down animation
        setIsSliding(true);

        // Animate the slide progress from 0 to 1 over 1.2 seconds
        animate(slideProgress, 1, {
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
        });

        // Remove intro after animation completes
        setTimeout(() => {
            setShowIntro(false);
        }, 1200); // Match animation duration
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
                        {/* Black background that stays in place and fades out */}
                        <motion.div
                            className='fixed inset-0 z-[9998] bg-black'
                            style={{ opacity: backgroundOpacity }}
                        />

                        {/* Video overlay that slides down */}
                        <motion.div
                            className='fixed inset-0 z-[9999]'
                            initial={{ y: 0 }}
                            animate={{ y: isSliding ? '100%' : 0 }}
                            // style={{ opacity: videoOpacity }}
                            transition={{
                                duration: 2.2,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}>
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
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main content */}
            <div className={showIntro ? 'invisible' : 'visible'}>{children}</div>
        </>
    );
};

export default IntroAnimation;
