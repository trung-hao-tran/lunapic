'use client';

import React, { useEffect, useRef, useState } from 'react';

import { PortfolioGallery } from '@/components/PortfolioGallery';
import { Section } from '@/components/Section';
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle } from '@/components/ui/drawer';
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
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const unstickyMarkerRef = useRef<HTMLDivElement>(null);
    const [unstickyMarkerTop, setUnstickyMarkerTop] = useState(0);

    // Get original position of filter section and unsticky marker on mount
    useEffect(() => {
        if (filterSectionRef.current) {
            const rect = filterSectionRef.current.getBoundingClientRect();
            setFilterOriginalTop(rect.top + window.scrollY);
        }
        if (unstickyMarkerRef.current) {
            const rect = unstickyMarkerRef.current.getBoundingClientRect();
            setUnstickyMarkerTop(rect.top + window.scrollY);
        }
    }, []);

    // Track scroll position for sticky behavior and nav visibility
    useEffect(() => {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    // Track nav visibility (same logic as Navigation component)
                    if (currentScrollY > lastScrollY && currentScrollY > 100) {
                        // Scrolling down & past threshold - nav hidden
                        setIsNavVisible(false);
                    } else if (currentScrollY < lastScrollY) {
                        // Scrolling up - nav visible
                        setIsNavVisible(true);
                    }

                    // Check if filter should be sticky (both mobile and desktop)
                    if (filterOriginalTop > 0 && unstickyMarkerTop > 0) {
                        const shouldBeSticky = currentScrollY > filterOriginalTop && currentScrollY < unstickyMarkerTop;
                        setIsFilterSticky(shouldBeSticky);
                    } else if (filterOriginalTop > 0) {
                        const shouldBeSticky = currentScrollY > filterOriginalTop;
                        setIsFilterSticky(shouldBeSticky);
                    } else {
                        setIsFilterSticky(false);
                    }

                    lastScrollY = currentScrollY;
                    ticking = false;
                });

                ticking = true;
            }
        };

        const handleResize = () => {
            // Recalculate sticky state on resize
            const currentScrollY = window.scrollY;
            if (filterOriginalTop > 0) {
                const shouldBeSticky = currentScrollY > filterOriginalTop;
                setIsFilterSticky(shouldBeSticky);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
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

            {/* Filter Section - Reduced padding on mobile */}
            <section
                ref={filterSectionRef}
                className={`pt-4 pb-6 md:pt-16 md:pb-10 transition-transform duration-300 ${
                    isFilterSticky ? 'fixed right-0 left-0 z-40' : ''
                }`}
                style={{
                    backgroundColor: '#040404',
                    top: isFilterSticky ? (isNavVisible ? '80px' : '0px') : 'auto'
                }}>
                <div className='container mx-auto px-6 md:px-12 lg:px-16'>
                    {/* Service Toggle - Hidden when sticky and on mobile */}
                    {!isFilterSticky && (
                        <div className='mb-16 hidden grid-cols-2 md:grid'>
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
                    <div className='flex flex-col gap-4 md:grid md:grid-cols-[15%_1fr] md:items-center md:gap-8'>
                        {/* Mobile: Drawer Trigger Button - Always visible */}
                        <div className='md:hidden'>
                            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                                <DrawerTrigger asChild>
                                    <button
                                        className='w-full rounded-full border border-white bg-white px-6 py-3 text-black transition-all duration-300 hover:bg-transparent hover:text-white'
                                        style={{
                                            fontFamily: '"Geist Mono", monospace',
                                            fontSize: '1rem',
                                            fontWeight: 500
                                        }}>
                                        Filter Categories {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                                    </button>
                                </DrawerTrigger>
                                <DrawerContent className='bg-[#040404] border-white'>
                                    <div className='mx-auto flex h-[75vh] w-full max-w-sm flex-col p-4'>
                                        <DrawerTitle className='mb-3 flex-shrink-0 text-center text-xl font-semibold text-white'>
                                            Filter by Categories
                                        </DrawerTitle>
                                        <div className='flex-1 overflow-y-auto pr-2'>
                                            <div className='flex flex-col gap-3 pb-4'>
                                                {categoryFilters.map((category) => (
                                                    <button
                                                        key={category.id}
                                                        onClick={() => toggleCategory(category.id)}
                                                        className={`w-full flex-shrink-0 rounded-full border px-6 py-3 text-left transition-all duration-300 ${
                                                            selectedCategories.includes(category.id)
                                                                ? 'border-white bg-white'
                                                                : 'border-white bg-transparent hover:bg-white/10'
                                                        }`}
                                                        style={{
                                                            color: selectedCategories.includes(category.id) ? '#000' : '#FFF',
                                                            fontFamily: '"Geist Mono", monospace',
                                                            fontSize: '1rem',
                                                            fontWeight: 400
                                                        }}>
                                                        {category.label} {category.count > 0 && `(${category.count})`}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsDrawerOpen(false)}
                                            className='mt-4 w-full flex-shrink-0 rounded-full border border-white bg-white px-6 py-3 text-black transition-all hover:bg-transparent hover:text-white'
                                            style={{
                                                fontFamily: '"Geist Mono", monospace',
                                                fontSize: '1rem',
                                                fontWeight: 500
                                            }}>
                                            Apply Filters
                                        </button>
                                    </div>
                                </DrawerContent>
                            </Drawer>
                        </div>

                        {/* Desktop: Grid Layout */}
                        <h3
                            className='hidden items-center justify-self-start underline md:flex'
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

                        <div className='hidden md:grid md:grid-cols-4 md:gap-x-4 md:gap-y-6'>
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

            {/* Unsticky marker - filter becomes unsticky when scrolled past this point */}
            <div ref={unstickyMarkerRef} className='h-1' style={{ backgroundColor: '#040404' }} />
        </>
    );
};

export default WorkPageClient;
