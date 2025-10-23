'use client';

import React, { useState } from 'react';

import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';
import { categoryFilters, portfolioItems } from '@/data/dummyData';

const WorkPage = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const toggleCategory = (categoryId: string) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
        );
    };

    const handleScrollToSection = (sectionId: string) => {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
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

    // For now, using all portfolio items for both sections
    // TODO: Add a 'type' field to PortfolioItem to distinguish VFX vs Production
    const vfxItems = portfolioItems;
    const productionItems = portfolioItems;

    return (
        <>
            <main>
                <HeroSection>
                    {/* Our Project Heading with StarFrame */}
                    <StarFrame haveBorder={false} starSize={40} direction={['tl', 'br']} color='white'>
                        <div style={{ display: 'inline-block', lineHeight: 0 }}>
                            <h1
                                style={{
                                    color: '#FFF',
                                    fontFamily: 'SVN-GilroyBold, sans-serif',
                                    fontSize: '3rem',
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    letterSpacing: '-0.015rem',
                                    margin: 0
                                }}>
                                Our Project
                            </h1>
                        </div>
                    </StarFrame>
                </HeroSection>

                {/* Filter Section - Same spacing as Section component */}
                <section className='pt-16 pb-24' style={{ backgroundColor: '#040404' }}>
                    <div className='container mx-auto px-6 md:px-12 lg:px-16'>
                        {/* Service Toggle */}
                        <div className='mb-16 grid grid-cols-2'>
                            {/* VFX Productions Button */}
                            <button
                                onClick={() => handleScrollToSection('vfx-section')}
                                className='group relative justify-self-center text-white transition-colors duration-300'
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
                                    <span className='absolute top-0 left-0 h-[calc(50%-1rem)] w-[1px] bg-white'></span>
                                    {/* Left border - bottom segment */}
                                    <span className='absolute bottom-0 left-0 h-[calc(50%-1rem)] w-[1px] bg-white'></span>
                                    {/* Right border - top segment */}
                                    <span className='absolute top-0 right-0 h-[calc(50%-1rem)] w-[1px] bg-white'></span>
                                    {/* Right border - bottom segment */}
                                    <span className='absolute right-0 bottom-0 h-[calc(50%-1rem)] w-[1px] bg-white'></span>
                                    VFX PRODUCTIONS
                                </div>

                                {/* Right Plus */}
                                <span className='absolute top-1/2 -right-4 -translate-y-1/2'>+</span>
                            </button>

                            {/* Video Production Button */}
                            <button
                                onClick={() => handleScrollToSection('production-section')}
                                className='group relative justify-self-center text-white transition-colors duration-300'
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
                                    <span className='absolute top-0 left-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Left border - bottom segment */}
                                    <span className='absolute bottom-0 left-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Right border - top segment */}
                                    <span className='absolute top-0 right-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    {/* Right border - bottom segment */}
                                    <span className='absolute right-0 bottom-0 h-[calc(50%-0.2rem)] w-[1px] bg-white'></span>
                                    VIDEO PRODUCTION
                                </div>

                                {/* Right Plus */}
                                <span className='absolute top-1/2 -right-4 -translate-y-1/2'>+</span>
                            </button>
                        </div>

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

                {/* VFX Productions Section */}
                <Section id='vfx-section' title='VFX' number='1' bgColor='#040404' headerColor='#fdfdfd'>
                    <PortfolioGallery items={vfxItems} hasViewMoreButton={true} />
                </Section>

                {/* Video Production Section */}
                <Section
                    id='production-section'
                    title='VIDEO PRODUCTION'
                    number='2'
                    bgColor='#040404'
                    headerColor='#fdfdfd'>
                    <PortfolioGallery items={productionItems} />
                </Section>

                {/* Contact Us Section */}
                <Section title='CONTACT US' number='3' bgColor='#040404' headerColor='#fdfdfd'>
                    <ContactSection bgColor='black' />
                </Section>
            </main>

            <Footer />
        </>
    );
};

export default WorkPage;
