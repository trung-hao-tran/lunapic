import React from 'react';
import Navigation from './Navigation';

interface HeaderSectionProps {
    title: string;
    imgSrc?: string;
    imgAlt?: string;
    overlayOpacity?: number;
    className?: string;
    showNavigation?: boolean;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
    title,
    imgSrc,
    imgAlt = 'Header background',
    overlayOpacity = 0.3,
    className = '',
    showNavigation = true
}) => {
    return (
        <div>
            {showNavigation && <Navigation />}
            
            <section
                className={`relative flex h-[75vh] w-full flex-col items-center justify-center overflow-hidden bg-[#020202] ${className}`}>
                {/* Background Image (optional) */}
                {imgSrc && (
                    <div className='absolute inset-0 h-full w-full'>
                        <img src={imgSrc} alt={imgAlt} className='h-full w-full object-cover' />
                    </div>
                )}
                
                {/* Overlay for both image and solid background */}
                <div className='absolute inset-0 bg-black' style={{ opacity: overlayOpacity }} />

                {/* Content overlay - matches main page structure */}
                <div className='relative z-10 flex flex-col items-center justify-center px-4 text-center'>
                    <h1 className='text-4xl font-bold text-[#F9F9F9] sm:text-5xl lg:text-6xl'>{title}</h1>
                </div>

                {/* Gradient transition overlay - covers bottom 15vh - matches main page */}
                <div className='absolute right-0 bottom-0 left-0 z-20 h-[15vh] bg-gradient-to-b from-transparent to-[#020202]' />
            </section>
        </div>
    );
};

export default HeaderSection;