'use client';

import React, { useState } from 'react';

import { AccordionItem } from '@/data/dummyData';

interface AccordionProps {
    items: AccordionItem[];
}

export function Accordion({ items }: AccordionProps) {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className='space-y-4'>
            {items.map((item) => {
                const isOpen = openId === item.id;

                return (
                    <div key={item.id} className='flex items-start gap-4'>
                        {/* Left Plus Icon */}
                        <span
                            className={`mt-6 text-2xl text-white transition-transform duration-300 ${isOpen ? 'rotate-135' : ''}`}>
                            +
                        </span>

                        {/* Accordion Item */}
                        <div className='group relative flex-1 cursor-pointer' onClick={() => toggleAccordion(item.id)}>
                            {/* Top Border Section */}
                            <div className='relative h-4'>
                                {/* Top horizontal border */}
                                <div className='absolute top-0 right-0 left-0 h-px bg-white/40 transition-colors group-hover:bg-white' />
                                {/* Top left vertical border */}
                                <div className='absolute top-0 left-0 h-full w-px bg-white/40 transition-colors group-hover:bg-white' />
                                {/* Top right vertical border */}
                                <div className='absolute top-0 right-0 h-full w-px bg-white/40 transition-colors group-hover:bg-white' />
                            </div>

                            {/* Content Area (no side borders - this creates the gap) */}
                            <div>
                                {/* Accordion Header */}
                                <button
                                    className='flex w-full items-center justify-between px-6 text-left'
                                    style={{
                                        color: '#FFF',
                                        fontFamily: '"Geist Mono", monospace',
                                        fontSize: '1rem',
                                        fontStyle: 'normal',
                                        fontWeight: 500,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.005rem'
                                    }}>
                                    {/* Question Text */}
                                    <span className='flex-1 uppercase'>{item.question}</span>

                                    {/* Right Chevron */}
                                    <svg
                                        className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                        fill='none'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeWidth={2}
                                            d='M19 9l-7 7-7-7'
                                        />
                                    </svg>
                                </button>

                                {/* Accordion Content */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                    }`}>
                                    <div
                                        className='px-6 py-6'
                                        style={{
                                            color: '#FFF',
                                            fontFamily: '"Geist Mono", monospace',
                                            fontSize: '1rem',
                                            fontStyle: 'normal',
                                            fontWeight: 300,
                                            lineHeight: 'normal',
                                            letterSpacing: '-0.005rem'
                                        }}>
                                        {item.answer}
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Border Section */}
                            <div className='relative h-4'>
                                {/* Bottom left vertical border */}
                                <div className='absolute bottom-0 left-0 h-full w-px bg-white/40 transition-colors group-hover:bg-white' />
                                {/* Bottom right vertical border */}
                                <div className='absolute right-0 bottom-0 h-full w-px bg-white/40 transition-colors group-hover:bg-white' />
                                {/* Bottom horizontal border */}
                                <div className='absolute right-0 bottom-0 left-0 h-px bg-white/40 transition-colors group-hover:bg-white' />
                            </div>
                        </div>

                        {/* Right Plus Icon */}
                        <span
                            className={`mt-6 text-2xl text-white transition-transform duration-300 ${isOpen ? 'rotate-135' : ''}`}>
                            +
                        </span>
                    </div>
                );
            })}
        </div>
    );
}
