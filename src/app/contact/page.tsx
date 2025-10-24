'use client';

import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { JoinTeamForm } from '@/components/JoinTeamForm';
import { Navigation } from '@/components/Navigation';
import { StarFrame } from '@/components/StarFrame';
import { EMAIL_CONFIG } from '@/config/email';
import { initEmailJS, sendJoinTeamEmail } from '@/utils/emailService';

type FormType = 'work' | 'join';

const BASE_TRANSITION = { ease: "easeInOut", duration: 0.75 } as const;

export default function ContactPage() {
    const [activeForm, setActiveForm] = useState<FormType>('work');

    const textColor = '#FFF';

    // Initialize EmailJS on component mount
    useEffect(() => {
        initEmailJS();
    }, []);

    const handleJoinFormSubmit = async (formData: {
        name: string;
        email: string;
        resume: File | null;
        message: string;
        linkedin: string;
    }) => {
        try {
            await sendJoinTeamEmail(formData);
            alert('Thank you! Your application has been sent successfully.');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send application. Please try again or email us directly.');
            throw error;
        }
    };

    return (
        <>
            <div className='relative bg-black'>
                {/* Navigation */}
                <Navigation />

                {/* Main Content with proper padding for navbar */}
                <main className='container mx-auto px-6 pt-48 pb-24 md:px-12 lg:px-16'>
                    <StarFrame
                        haveBorder={true}
                        starSize={20}
                        direction={['tl', 'tr', 'bl', 'br']}
                        color='white'
                        padding={60}>
                        <div className='grid grid-cols-1 gap-24 lg:grid-cols-[4fr_6fr]'>
                            {/* Left Column - Image, Heading, Description & Contact Info */}
                            <div className='space-y-8'>
                                {/* Toggle Buttons */}
                                <div className='flex flex-col gap-4 sm:flex-row'>
                                    <button
                                        onClick={() => setActiveForm('join')}
                                        className={`relative overflow-hidden border-2 border-white px-6 py-2 text-sm font-medium transition-colors duration-700 ${
                                            activeForm === 'join' ? 'text-black' : 'text-white hover:bg-white/10'
                                        }`}
                                        style={{
                                            fontFamily: '"Geist Mono", monospace',
                                            letterSpacing: '0.02em'
                                        }}>
                                        <span className='relative z-10'>JOIN OUR TEAM</span>
                                        {activeForm === 'join' && (
                                            <motion.div
                                                layoutId='toggle-bg'
                                                transition={BASE_TRANSITION}
                                                className='absolute inset-0 bg-white'
                                            />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setActiveForm('work')}
                                        className={`relative overflow-hidden border-2 border-white px-6 py-2 text-sm font-medium transition-colors duration-700 ${
                                            activeForm === 'work' ? 'text-black' : 'text-white hover:bg-white/10'
                                        }`}
                                        style={{
                                            fontFamily: '"Geist Mono", monospace',
                                            letterSpacing: '0.02em'
                                        }}>
                                        <span className='relative z-10'>WORK WITH US</span>
                                        {activeForm === 'work' && (
                                            <motion.div
                                                layoutId='toggle-bg'
                                                transition={BASE_TRANSITION}
                                                className='absolute inset-0 bg-white'
                                            />
                                        )}
                                    </button>
                                </div>

                                {/* Heading */}
                                <h2 className='mb-6'>
                                    <span
                                        style={{
                                            color: 'rgba(255, 255, 255, 0.72)',
                                            fontFamily: 'Inter',
                                            fontSize: '2.25rem',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            letterSpacing: '-0.1125rem',
                                            textTransform: 'uppercase'
                                        }}>
                                        Let&apos;s make your vision
                                    </span>{' '}
                                    <span
                                        style={{
                                            display: 'block',
                                            color: '#FFF',
                                            fontFamily: 'Inter',
                                            fontSize: '2.25rem',
                                            fontStyle: 'normal',
                                            fontWeight: 400,
                                            lineHeight: 'normal',
                                            letterSpacing: '-0.1125rem',
                                            textTransform: 'uppercase'
                                        }}>
                                        come true
                                    </span>
                                </h2>

                                {/* Description */}
                                <p
                                    style={{
                                        color: '#FFF',
                                        fontFamily: '"Geist Mono", monospace',
                                        fontSize: '1rem',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.005rem',
                                        maxWidth: '400px',
                                        marginBottom: '2rem'
                                    }}>
                                    Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla
                                    vestibulum lacus ultrices proin nunc semper urna urna.
                                </p>

                                {/* Separator Line */}
                                <div className='h-px w-full bg-white/20'></div>

                                {/* Image */}
                                <div
                                    className='relative overflow-hidden bg-gray-800'
                                    style={{
                                        width: '27.3125rem',
                                        height: '14.8125rem',
                                        flexShrink: 0
                                    }}>
                                    <Image
                                        src='/images/contact_placeholder.png'
                                        alt='Film production'
                                        fill
                                        className='object-cover grayscale'
                                    />
                                </div>

                                {/* Contact Information */}
                                <div className='space-y-4'>
                                    {/* Address */}
                                    <div className='flex items-start gap-3'>
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            className='mt-1 flex-shrink-0'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'
                                                fill='white'
                                            />
                                        </svg>
                                        <span
                                            style={{
                                                color: '#FFF',
                                                fontFamily: '"Geist Mono". monospace',
                                                fontSize: '1rem',
                                                fontStyle: 'normal',
                                                fontWeight: 500,
                                                lineHeight: 'normal',
                                                letterSpacing: '-0.005rem',
                                                textDecoration: 'underline',
                                                textTransform: 'uppercase'
                                            }}>
                                            {EMAIL_CONFIG.contactInfo.address}
                                        </span>
                                    </div>

                                    {/* Phone */}
                                    <div className='flex items-start gap-3'>
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            className='mt-1 flex-shrink-0'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z'
                                                fill='white'
                                            />
                                        </svg>
                                        <span
                                            style={{
                                                color: '#FFF',
                                                fontFamily: '"Geist Mono", monospace',
                                                fontSize: '1rem',
                                                fontStyle: 'normal',
                                                fontWeight: 500,
                                                lineHeight: 'normal',
                                                letterSpacing: '-0.005rem',
                                                textDecoration: 'underline',
                                                textTransform: 'uppercase'
                                            }}>
                                            {EMAIL_CONFIG.contactInfo.phone}
                                        </span>
                                    </div>

                                    {/* Email */}
                                    <div className='flex items-start gap-3'>
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            className='mt-1 flex-shrink-0'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
                                                fill='white'
                                            />
                                        </svg>
                                        <span
                                            style={{
                                                color: '#FFF',
                                                fontFamily: '"Geist Mono", monospace',
                                                fontSize: '1rem',
                                                fontStyle: 'normal',
                                                fontWeight: 500,
                                                lineHeight: 'normal',
                                                letterSpacing: '-0.005rem',
                                                textDecoration: 'underline',
                                                textTransform: 'uppercase'
                                            }}>
                                            {EMAIL_CONFIG.contactInfo.email}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Contact Forms */}
                            <div className='relative'>
                                <AnimatePresence mode='wait'>
                                    {activeForm === 'work' ? (
                                        <motion.div
                                            key='work'
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={BASE_TRANSITION}>
                                            <ContactSection bgColor='black' showLeftColumn={false} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key='join'
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={BASE_TRANSITION}>
                                            <JoinTeamForm bgColor='black' onSubmit={handleJoinFormSubmit} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </StarFrame>
                </main>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}
