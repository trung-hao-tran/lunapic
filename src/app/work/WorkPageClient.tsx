'use client';

import React, { useEffect, useRef, useState } from 'react';

import { PortfolioGallery } from '@/components/PortfolioGallery';
import { Section } from '@/components/Section';
import type { CategoryFilter, PortfolioItem, WorkConfig } from '@/types/content.types';

interface WorkPageClientProps {
    categoryFilters: CategoryFilter[];
    vfxItems: PortfolioItem[];
    productionItems: PortfolioItem[];
    config: WorkConfig;
}

const WorkPageClient: React.FC<WorkPageClientProps> = ({ categoryFilters, vfxItems, productionItems, config }) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [isFilterSticky, setIsFilterSticky] = useState(false);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const filterSectionRef = useRef<HTMLElement>(null);
    const [filterOriginalTop, setFilterOriginalTop] = useState(0);

    // Get original position of filter section on mount
    useEffect(() => {
        if (filterSectionRef.current) {
            const rect = filterSectionRef.current.getBoundingClientRect();
            setFilterOriginalTop(rect.top + window.scrollY);
        }
    }, []);

    // Track scroll position for sticky behavior and nav visibility
    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Track nav visibility (same logic as Navigation component)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down & past threshold - nav hidden
                setIsNavVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - nav visible
                setIsNavVisible(true);
            }

            // Check if filter should be sticky
            if (filterOriginalTop > 0) {
                const shouldBeSticky = currentScrollY > filterOriginalTop;
                setIsFilterSticky(shouldBeSticky);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [filterOriginalTop]);

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
        );
    };

    const handleScrollToSection = (sectionId: string) => {
        const targetSection = document.getElementById(sectionId);
        const offsetHeight = filterSectionRef.current?.offsetHeight || 0;
        if (targetSection) {
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offsetHeight;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1500;
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
        <>
            {/* Placeholder to maintain layout when filter becomes fixed */}
            {isFilterSticky && <div style={{ height: filterSectionRef.current?.offsetHeight || 0 }} />}

            {/* Filter Section - Same spacing as Section component */}
            <section
                ref={filterSectionRef}
                className={`pt-16 pb-10 transition-all duration-300 ${
                    isFilterSticky ? 'fixed right-0 left-0 z-40' : ''
                }`}
                style={{
                    backgroundColor: '#040404',
                    top: isFilterSticky ? (isNavVisible ? '80px' : '0px') : 'auto'
                }}>
                <div className='container mx-auto px-6 md:px-12 lg:px-16'>
                    {/* Service Toggle - Hidden when sticky */}
                    {!isFilterSticky && (
                        <div className='mb-16 grid grid-cols-2'>
                            {/* VFX Productions Button */}
                            <button
                                onClick={() => handleScrollToSection('vfx-section')}
                                className='group relative cursor-pointer justify-self-center text-white transition-colors duration-300'
                                style={{
                                    color: '#FFF',
                                    fontFamily: '"Geist Mono", monospace',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.005rem'
                                }}>
                                {/* Left Plus */}
                                <span className='absolute top-1/2 -left-4 -translate-y-1/2'>+</span>

                                {/* Border with gap in center of left/right borders */}
                                <div className='relative border-t border-b border-white px-6 py-3 transition-colors duration-300 group-hover:border-white/80'>
                                    {/* Left border - top segment */}
                                    <span className='pointer-events-none absolute top-0 left-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Left border - bottom segment */}
                                    <span className='pointer-events-none absolute bottom-0 left-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Right border - top segment */}
                                    <span className='pointer-events-none absolute top-0 right-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Right border - bottom segment */}
                                    <span className='pointer-events-none absolute right-0 bottom-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Invisible clickable areas covering the gaps */}
                                    <span className='absolute top-1/2 left-0 h-[0.4rem] w-[1px] -translate-y-1/2'></span>
                                    <span className='absolute top-1/2 right-0 h-[0.4rem] w-[1px] -translate-y-1/2'></span>
                                    VFX PRODUCTIONS
                                </div>

                                {/* Right Plus */}
                                <span className='absolute top-1/2 -right-4 -translate-y-1/2'>+</span>
                            </button>

                            {/* Video Production Button */}
                            <button
                                onClick={() => handleScrollToSection('production-section')}
                                className='group relative cursor-pointer justify-self-center text-white transition-colors duration-300'
                                style={{
                                    color: '#FFF',
                                    fontFamily: '"Geist Mono", monospace',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.005rem'
                                }}>
                                {/* Left Plus */}
                                <span className='absolute top-1/2 -left-4 -translate-y-1/2'>+</span>

                                {/* Border with gap in center of left/right borders */}
                                <div className='relative border-t border-b border-white px-6 py-3 transition-colors duration-300 group-hover:border-white/80'>
                                    {/* Left border - top segment */}
                                    <span className='pointer-events-none absolute top-0 left-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Left border - bottom segment */}
                                    <span className='pointer-events-none absolute bottom-0 left-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Right border - top segment */}
                                    <span className='pointer-events-none absolute top-0 right-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Right border - bottom segment */}
                                    <span className='pointer-events-none absolute right-0 bottom-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Invisible clickable areas covering the gaps */}
                                    <span className='absolute top-1/2 left-0 h-[0.4rem] w-[1px] -translate-y-1/2'></span>
                                    <span className='absolute top-1/2 right-0 h-[0.4rem] w-[1px] -translate-y-1/2'></span>
                                    VIDEO PRODUCTION
                                </div>

                                {/* Right Plus */}
                                <span className='absolute top-1/2 -right-4 -translate-y-1/2'>+</span>
                            </button>
                        </div>
                    )}

                    {/* Categories Filter */}
                    <div className='grid grid-cols-[15%_1fr] items-center gap-8'>
                        {/* Categories Label - Centered */}
                        <h3
                            className='flex items-center justify-self-start underline'
                            style={{
                                color: '#FFF',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '1.25rem',
                                fontStyle: 'normal',
                                fontWeight: 600,
                                lineHeight: 'normal',
                                letterSpacing: '-0.0625rem'
                            }}>
                            Categories
                        </h3>

                        {/* Category Pills - 4 per row */}
                        <div className='grid grid-cols-4 gap-x-4 gap-y-6'>
                            {categoryFilters.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => toggleCategory(category.id)}
                                    className={`w-full rounded-full border px-6 py-2 transition-all duration-300 ${
                                        selectedCategories.includes(category.id)
                                            ? 'border-white bg-white'
                                            : 'border-white bg-transparent hover:bg-white/10'
                                    }`}
                                    style={{
                                        color: selectedCategories.includes(category.id) ? '#000' : '#FFF',
                                        fontFamily: '"Geist Mono", monospace',
                                        fontSize: '1rem',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.005rem'
                                    }}>
                                    {category.label} {category.count > 0 && `(${category.count})`}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className='pt-14' />
            {/* VFX Productions Section */}
            <Section id='vfx-section' title='VFX' number='1' bgColor='#040404' headerColor='#fdfdfd'>
                <PortfolioGallery
                    items={vfxItems}
                    hasViewMoreButton={config.vfxSection.galleryConfig.hasViewMoreButton}
                    selectedCategories={selectedCategories}
                />
            </Section>

            {/* Video Production Section */}
            <Section
                id='production-section'
                title='VIDEO PRODUCTION'
                number='2'
                bgColor='#040404'
                headerColor='#fdfdfd'>
                <PortfolioGallery
                    items={productionItems}
                    hasViewMoreButton={config.productionSection.galleryConfig.hasViewMoreButton}
                    selectedCategories={selectedCategories}
                />
            </Section>
        </>
    );
};

export default WorkPageClient;
