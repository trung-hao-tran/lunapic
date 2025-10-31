'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

interface MessageModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    type: 'success' | 'error';
    title?: string;
    message?: string | React.ReactNode;
}

export function MessageModal({ isOpen, setIsOpen, type, title, message }: MessageModalProps) {
    const isSuccess = type === 'success';

    const defaultTitle = isSuccess ? 'MESSAGE SENT!' : 'OOPS!';

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className='fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer bg-black/60 backdrop-blur-sm p-8'>
                    <motion.div
                        initial={{ scale: 0, rotate: '12.5deg' }}
                        animate={{ scale: 1, rotate: '0deg' }}
                        exit={{ scale: 0, rotate: '0deg' }}
                        onClick={(e) => e.stopPropagation()}
                        className='relative w-full max-w-lg cursor-default overflow-hidden rounded-lg border-2 border-white bg-black p-8 text-white shadow-2xl'>
                        {/* Background Logo */}
                        <div className='absolute -left-12 -top-12 z-0 opacity-5'>
                            <Image src='/logo.svg' alt='Luna Pictures' width={200} height={200} className='rotate-12' />
                        </div>

                        <div className='relative z-10'>
                            {/* Success/Error Icon */}
                            <div className={`mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border-2 ${
                                isSuccess ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500'
                            }`}>
                                {isSuccess ? (
                                    <FiCheckCircle className='text-white' size={48} />
                                ) : (
                                    <FiAlertCircle className='text-white' size={48} />
                                )}
                            </div>

                            {/* Title */}
                            <h3
                                className='mb-4 text-center font-bold'
                                style={{
                                    fontFamily: '"Geist Mono", monospace',
                                    fontSize: '2rem',
                                    lineHeight: '1.2',
                                    letterSpacing: '0.02em'
                                }}>
                                {title || defaultTitle}
                            </h3>

                            {/* Message */}
                            <p
                                className='mb-8 text-center'
                                style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '1rem',
                                    lineHeight: '1.6',
                                    opacity: 0.9
                                }}>
                                {message || (isSuccess ? (
                                    "Thank you for reaching out! We've received your message and will get back to you as soon as possible."
                                ) : (
                                    <>
                                        Something went wrong and we couldn&apos;t send your message. Please try again or
                                        contact us directly at{' '}
                                        <a
                                            href='mailto:minhnguyen@lunapictures.com.au'
                                            className='underline hover:opacity-80'
                                            onClick={(e) => e.stopPropagation()}>
                                            minhnguyen@lunapictures.com.au
                                        </a>
                                    </>
                                ))}
                            </p>

                            {/* Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className='w-full border-2 border-white bg-transparent py-3 font-semibold transition-colors hover:bg-white hover:text-black'
                                style={{
                                    fontFamily: '"Geist Mono", monospace',
                                    fontSize: '0.875rem',
                                    letterSpacing: '0.05em'
                                }}>
                                {isSuccess ? 'CLOSE' : 'TRY AGAIN'}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
