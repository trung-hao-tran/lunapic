'use client';

import React from 'react';

import Image from 'next/image';

import { BoxButton } from '@/components/BoxButton';
import { StarFrame } from '@/components/StarFrame';
import { TeamMember } from '@/data/dummyData';

interface TeamCardGalleryProps {
    teamMembers: TeamMember[];
}

export function TeamCardGallery({ teamMembers }: TeamCardGalleryProps) {
    return (
        <>
            {/* Section Header with Description and CTA */}
            <div className='mb-24 flex flex-col items-start justify-between gap-8 md:flex-row md:items-start'>
                <div className='max-w-2xl'>
                    <h3
                        style={{
                            color: '#FFF',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '2.25rem',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.1125rem',
                            marginBottom: '1rem'
                        }}>
                        Meet the team behind us
                    </h3>
                    <p
                        style={{
                            color: 'rgba(255, 255, 255, 0.70)',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '1rem',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.05rem'
                        }}>
                        Lorem ipsum dolor sit amet consectetur, ultrices tempus scelerisque et nulla vestibulum metus
                        ultrices in semper turpis una nunc aliquam eleifend sagittis elementum.
                    </p>
                </div>
                <BoxButton text='JOIN OUR TEAM' />
            </div>

            {/* Team Grid */}
            <div className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16'>
                {teamMembers.map((member) => (
                    <div key={member.id} className='flex flex-col'>
                        {/* Photo with StarFrame corners */}
                        <div className='mb-8 flex justify-center'>
                            <StarFrame
                                className='block w-full md:w-auto'
                                direction={['tl', 'tr', 'bl', 'br']}
                                haveBorder={true}
                                padding={1}
                                color='white'
                                starSize={40}
                                thickness={1}>
                                <div
                                    className='group relative w-full overflow-hidden bg-gray-200 md:w-[24.375rem]'
                                    style={{
                                        aspectRatio: '195/292'
                                    }}>
                                    <div className='absolute inset-0 [filter:grayscale(70%)_brightness(100%)] transition-all duration-[750ms] group-hover:[filter:grayscale(0%)_brightness(110%)]'>
                                        <Image src={member.image} alt={member.name} fill className='object-cover' />
                                    </div>
                                    {/* Black footer overlay */}
                                    <div className='absolute right-0 bottom-0 left-0 bg-black px-6 py-4'>
                                        <div className='flex items-start justify-between'>
                                            <div>
                                                <h4
                                                    style={{
                                                        color: '#FFF',
                                                        fontFamily: '"Geist Mono", monospace',
                                                        fontSize: '1rem',
                                                        fontStyle: 'normal',
                                                        fontWeight: 700,
                                                        lineHeight: 'normal',
                                                        letterSpacing: '-0.005rem',
                                                        marginBottom: '0.25rem'
                                                    }}>
                                                    {member.name}
                                                </h4>
                                                <p
                                                    style={{
                                                        width: '9.8125rem',
                                                        height: '1.5rem',
                                                        flexShrink: 0,
                                                        fontFamily: 'var(--font-geist-mono)',
                                                        fontSize: '0.75rem',
                                                        color: '#999'
                                                    }}>
                                                    {member.role}
                                                </p>
                                            </div>
                                            <button
                                                className='cursor-pointer border border-white bg-transparent text-white transition-all duration-300 hover:bg-white hover:text-black'
                                                style={{
                                                    color: '#FFF',
                                                    fontFamily: '"Geist Mono", monospace',
                                                    fontSize: '0.875rem',
                                                    fontStyle: 'normal',
                                                    fontWeight: 500,
                                                    lineHeight: 'normal',
                                                    letterSpacing: '-0.00438rem',
                                                    width: '6.4375rem',
                                                    height: '2.1875rem',
                                                    flexShrink: 0,
                                                    borderRadius: '9999px'
                                                }}>
                                                READ BIO
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </StarFrame>
                        </div>

                        {/* Bio text below */}
                        <div className='flex justify-center'>
                            <p
                                className='w-full md:w-[24.375rem]'
                                style={{
                                    color: '#FFF',
                                    textAlign: 'center',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.875rem',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.00438rem'
                                }}>
                                {member.bio}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
