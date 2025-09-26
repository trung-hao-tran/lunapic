'use client';

import React, { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import MarqueeButton from './MarqueeButton';
import { animate, motion, useInView, useMotionValue, useTransform } from 'framer-motion';

const LETTER_DELAY = 0.025;
const BOX_FADE_DURATION = 0.125;
const FADE_DELAY = 3;
const MAIN_FADE_DURATION = 0.25;
const SWAP_DELAY_IN_MS = 4000;

const serviceQuestions = [
    'Need a commercial video for your brand?',
    'Want stunning VFX for your film?',
    'Looking for professional animation services?',
    'Need event videography coverage?',
    'Want to create a corporate documentary?',
    'Looking for product demonstration videos?',
    'Need social media content creation?',
    'Want cinematic wedding videography?'
];

const RollingNumber = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (value) => {
        if (value >= 1000) {
            return Math.floor(value).toLocaleString();
        }

        return Math.floor(value).toString();
    });

    useEffect(() => {
        if (isInView) {
            const animation = animate(count, 500, {
                duration: 3,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.5
            });

            return animation.stop;
        }
    }, [isInView]);

    return (
        <span ref={ref} className='font-bold'>
            <motion.span>{rounded}</motion.span>+
        </span>
    );
};

const TypewriterQuestions = ({ questions }: { questions: string[] }) => {
    const [questionIndex, setQuestionIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setQuestionIndex((prev) => (prev + 1) % questions.length);
        }, SWAP_DELAY_IN_MS);

        return () => clearInterval(intervalId);
    }, [questions]);

    return (
        <p className='text-base font-light text-[#333136] uppercase'>
            <span className='inline-block size-2 bg-[#020202]' />
            <span className='ml-3'>
                <span className='font-bold text-[#101B39]'>HAVE AN IDEA? TELL US NOW:</span>{' '}
                {questions[questionIndex].split('').map((letter, i) => (
                    <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0 }}
                        transition={{
                            delay: FADE_DELAY,
                            duration: MAIN_FADE_DURATION,
                            ease: 'easeInOut'
                        }}
                        key={`${questionIndex}-${i}`}
                        className='relative'>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: i * LETTER_DELAY,
                                duration: 0
                            }}>
                            {letter}
                        </motion.span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                delay: i * LETTER_DELAY,
                                times: [0, 0.1, 1],
                                duration: BOX_FADE_DURATION,
                                ease: 'easeInOut'
                            }}
                            className='absolute top-[3px] right-0 bottom-[3px] left-[1px] bg-[#020202]'
                        />
                    </motion.span>
                ))}
            </span>
        </p>
    );
};

const AnimatedBanner = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <section ref={ref} className='w-full bg-[#F9F9F9] py-24'>
            {/* Content aligned with section 2 */}
            <div className='mx-auto w-[65vw] space-y-8 pt-8'>
                {/* Main content */}
                <div>
                    <h2 className='text-3xl leading-relaxed font-bold text-[#020202] sm:text-4xl lg:text-6xl'>
                        Luna Pictures has helped create{' '}
                        <span className='text-[#101B39]'>
                            <RollingNumber />
                        </span>{' '}
                        Amazing Projects
                    </h2>
                </div>

                {/* Typewriter section */}
                <div className='space-y-6'>
                    <div className='pt-4'>
                        <TypewriterQuestions questions={serviceQuestions} />
                    </div>

                    {/* CTA Button */}
                    <div className='flex justify-center pt-6'>
                        <MarqueeButton href='/contact'>Start your journey with us</MarqueeButton>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnimatedBanner;
