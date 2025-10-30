'use client';

import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

import { Testimonial } from '@/data/dummyData';

import { AnimatePresence, animate, motion, useInView } from 'framer-motion';

interface TestimonialsSectionProps {
    testimonials: Testimonial[];
    bannerNumber?: number; // Number to animate to (default: 5034)
}

export function TestimonialsSection({ testimonials, bannerNumber = 5034 }: TestimonialsSectionProps) {
    const [selected, setSelected] = useState(0);
    const currentTestimonial = testimonials[selected];

    // Animation refs and state for rolling number
    const numberRef = useRef<HTMLSpanElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);
    const [showPlus, setShowPlus] = useState(false);
    const isInView = useInView(bannerRef, {
        once: true,
        margin: "-30% 0px 0px 0px"
    });

    // Animate the number when banner comes into view
    useEffect(() => {
        if (!isInView || !numberRef.current) return;

        animate(0, bannerNumber, {
            duration: 2,
            onUpdate(value) {
                if (!numberRef.current) return;
                numberRef.current.textContent = Math.floor(value).toString();
            },
            onComplete() {
                setTimeout(() => {
                    setShowPlus(true);
                }, 500);
            }
        });
    }, [isInView, bannerNumber]);

    // Parse quote text and highlight words wrapped in []
    const renderQuote = (quote: string) => {
        const parts = quote.split(/(\[.*?\])/g);

        return parts.map((part, index) => {
            if (part.startsWith('[') && part.endsWith(']')) {
                const highlightedText = part.slice(1, -1);

                return (
                    <span
                        key={index}
                        style={{
                            fontWeight: 400
                        }}>
                        {highlightedText}
                    </span>
                );
            }

            return <span key={index}>{part}</span>;
        });
    };

    return (
        <div className='space-y-12'>
            {/* Banner */}
            <div className='mb-16'>
                <div
                    ref={bannerRef}
                    className='relative flex w-full flex-col items-center justify-center border-2 border-black bg-white px-8 py-6 md:h-[4.9375rem] md:flex-row md:py-4'
                    style={{
                        flexShrink: 0
                    }}>
                    {/* Top line - left to right 65% */}
                    <div
                        className='absolute left-0 h-[2px] bg-black'
                        style={{ width: '65%', top: '-1rem' }}
                    />

                    {/* Bottom line - right to left 65% */}
                    <div
                        className='absolute right-0 h-[2px] bg-black'
                        style={{ width: '65%', bottom: '-1rem' }}
                    />

                    <p
                        className='text-center md:text-left'
                        style={{
                            color: '#000',
                            fontFamily: '"Geist Mono", monospace',
                            fontSize: '2.25rem',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: 'normal',
                            letterSpacing: '-0.01125rem'
                        }}>
                        <span className='block md:inline'>LUNA HAS HELPED</span>{' '}
                        <span
                            className='block md:inline'
                            style={{
                                color: '#000',
                                fontFamily: '"Geist Mono", monospace',
                                fontSize: '2.25rem',
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 'normal',
                                letterSpacing: '-0.01125rem'
                            }}>
                            <span ref={numberRef}>0</span>
                            {showPlus && (
                                <motion.span
                                    initial={{ scale: 0, opacity: 0, rotate: -180 }}
                                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 800,
                                        damping: 10,
                                        mass: 0.5
                                    }}
                                    style={{ display: 'inline-block' }}>
                                    +
                                </motion.span>
                            )}
                        </span>{' '}
                        <span className='block md:inline'>PROJECTS</span>
                    </p>
                </div>
            </div>

            {/* Main Content - Two Columns */}
            <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
                {/* Left Column - Testimonial Card */}
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentTestimonial.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className='flex w-full flex-col border-[3px] border-black bg-black'
                        style={{
                            aspectRatio: '73/83',
                            flexShrink: 0,
                            paddingTop: '3.75rem',
                            paddingLeft: '1.5rem',
                            paddingRight: '1.5rem',
                            paddingBottom: '1.5rem'
                        }}>
                        {/* Portrait Image */}
                        <div className='relative mb-6 w-full flex-1 overflow-hidden bg-gray-200'>
                            <Image
                                src={currentTestimonial.image}
                                alt={currentTestimonial.name}
                                fill
                                className='object-cover grayscale'
                                style={{ objectFit: 'cover' }}
                            />
                        </div>

                        {/* Name, Title, and Company Signature */}
                        <div className='flex items-end justify-between text-white'>
                            <div>
                                <p
                                    style={{
                                        color: '#FFF',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '1.5rem',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.075rem'
                                    }}>
                                    {currentTestimonial.name}
                                </p>
                                <p
                                    style={{
                                        color: '#FFF',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.9375rem',
                                        fontStyle: 'normal',
                                        fontWeight: 300,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.04688rem'
                                    }}>
                                    {currentTestimonial.title}
                                </p>
                            </div>

                            {/* Company Signature */}
                            {currentTestimonial.signatureImage && (
                                <div className='relative h-12 w-24 flex-shrink-0'>
                                    <Image
                                        src={currentTestimonial.signatureImage}
                                        alt={`${currentTestimonial.company} signature`}
                                        fill
                                        className='object-contain'
                                    />
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Right Column - Heading + Quote */}
                <div className='flex flex-col pt-[40%]'>
                    <h2
                        className='mb-8'
                        style={{
                            color: '#000',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '2.25rem',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.1125rem'
                        }}>
                        What our clients say?
                    </h2>

                    {/* Quote - Fades when changing */}
                    <div className='relative min-h-[200px]'>
                        <AnimatePresence mode='wait'>
                            <motion.p
                                key={currentTestimonial.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className='absolute top-0 left-0 italic'
                                style={{
                                    color: '#000',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '1.5rem',
                                    fontStyle: 'italic',
                                    fontWeight: 250,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.075rem'
                                }}>
                                &quot;{renderQuote(currentTestimonial.quote)}&quot;
                            </motion.p>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Progress Bars */}
            <div className='flex items-center justify-center' style={{ gap: '0.25rem' }}>
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setSelected(index)}
                        className='group min-w-0 cursor-pointer overflow-hidden p-0'
                        style={{ flexShrink: 0 }}>
                        <motion.div
                            className='relative bg-[#D9D9D9]'
                            style={{
                                height: '0.4375rem',
                                width: selected === index ? '8.875rem' : '2.0625rem',
                                flexShrink: 0
                            }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}>
                            {selected === index ? (
                                <motion.span
                                    className='absolute inset-y-0 left-0 bg-black'
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 5, ease: 'linear' }}
                                    onAnimationComplete={() => {
                                        setSelected(selected === testimonials.length - 1 ? 0 : selected + 1);
                                    }}
                                />
                            ) : (
                                <span className='absolute inset-0 bg-transparent transition-colors duration-200 group-hover:bg-[#B0B0B0]' />
                            )}
                        </motion.div>
                    </button>
                ))}
            </div>
        </div>
    );
}
