'use client';

import React, { useState } from 'react';

import { EMAIL_CONFIG } from '@/config/email';
import { send } from '@emailjs/browser';

import { motion } from 'framer-motion';

interface JoinTeamFormProps {
    bgColor?: 'white' | 'black';
}

export function JoinTeamForm({ bgColor = 'white' }: JoinTeamFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        resume: null as File | null,
        message: '',
        linkedin: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        resume: '',
        message: '',
        linkedin: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    // Determine colors based on background
    const textColor = bgColor === 'black' ? '#FFF' : '#000';
    const borderColor = bgColor === 'black' ? 'rgba(255, 255, 255, 0.44)' : 'rgba(0, 0, 0, 0.44)';
    const solidBorderColor = bgColor === 'black' ? '#FFF' : '#000';
    const errorColor = '#dc2626';
    const hoverBg = bgColor === 'black' ? '#FFF' : '#000';
    const hoverText = bgColor === 'black' ? '#000' : '#FFF';

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            resume: '',
            message: '',
            linkedin: ''
        };

        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!formData.resume) {
            newErrors.resume = 'Resume is required';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!formData.resume) {
            alert('Please upload your CV/Resume');

            return;
        }

        setIsSubmitting(true);
        setUploadProgress('Uploading CV...');

        try {
            // Step 1: Upload CV to Vercel Blob
            const uploadFormData = new FormData();
            uploadFormData.append('cv', formData.resume);

            const uploadResponse = await fetch('/api/upload-cv', {
                method: 'POST',
                body: uploadFormData
            });

            if (!uploadResponse.ok) {
                throw new Error('Failed to upload CV');
            }

            const { url: cvUrl } = await uploadResponse.json();
            setUploadProgress('Sending application...');

            // Step 2: Send email with CV link
            await send(
                EMAIL_CONFIG.serviceId,
                EMAIL_CONFIG.joinTeamTemplateId,
                {
                    name: formData.name,
                    email: formData.email,
                    portfolio_url: formData.linkedin,
                    message: formData.message,
                    cv_url: cvUrl, // CV download link
                    cv_filename: formData.resume.name,
                    to_email: EMAIL_CONFIG.destinations.joinTeam
                },
                EMAIL_CONFIG.publicKey
            );

            // Success!
            alert("Application submitted successfully! We'll review your CV and get back to you soon.");

            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                resume: null,
                message: '',
                linkedin: ''
            });
            setErrors({
                name: '',
                email: '',
                resume: '',
                message: '',
                linkedin: ''
            });
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Failed to submit application. Please try again.');
        } finally {
            setIsSubmitting(false);
            setUploadProgress('');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData({
            ...formData,
            resume: file
        });
        if (errors.resume) {
            setErrors({
                ...errors,
                resume: ''
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-12'>
            {/* Name and Email Row */}
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                <div>
                    <div className='mb-2 flex items-center gap-2'>
                        <label
                            htmlFor='name'
                            style={{
                                color: errors.name ? errorColor : textColor,
                                fontFamily: '"Geist Mono", monospace',
                                fontSize: '1rem',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                                letterSpacing: '-0.005rem'
                            }}>
                            YOUR NAME
                        </label>
                        {errors.name && <span className='text-xs text-red-600'>({errors.name})</span>}
                    </div>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        className='w-full border-0 border-b bg-transparent pb-1 focus:ring-0 focus:outline-none'
                        style={{
                            color: textColor,
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '1rem',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.005rem',
                            borderBottomWidth: '1px',
                            borderBottomColor: errors.name ? errorColor : borderColor
                        }}
                        onFocus={(e) =>
                            (e.target.style.borderBottomColor = errors.name ? errorColor : solidBorderColor)
                        }
                        onBlur={(e) => (e.target.style.borderBottomColor = errors.name ? errorColor : borderColor)}
                    />
                </div>
                <div>
                    <div className='mb-2 flex items-center gap-2'>
                        <label
                            htmlFor='email'
                            style={{
                                color: errors.email ? errorColor : textColor,
                                fontFamily: '"Geist Mono", monospace',
                                fontSize: '1rem',
                                fontStyle: 'normal',
                                fontWeight: 500,
                                lineHeight: 'normal',
                                letterSpacing: '-0.005rem'
                            }}>
                            YOUR EMAIL
                        </label>
                        {errors.email && <span className='text-xs text-red-600'>({errors.email})</span>}
                    </div>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='w-full border-0 border-b bg-transparent pb-1 focus:ring-0 focus:outline-none'
                        style={{
                            color: textColor,
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '1rem',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.005rem',
                            borderBottomWidth: '1px',
                            borderBottomColor: errors.email ? errorColor : borderColor
                        }}
                        onFocus={(e) =>
                            (e.target.style.borderBottomColor = errors.email ? errorColor : solidBorderColor)
                        }
                        onBlur={(e) => (e.target.style.borderBottomColor = errors.email ? errorColor : borderColor)}
                    />
                </div>
            </div>

            {/* Resume Upload */}
            <div>
                <div className='mb-2 flex items-center gap-2'>
                    <label
                        htmlFor='resume'
                        style={{
                            color: errors.resume ? errorColor : textColor,
                            fontFamily: '"Geist Mono", monospace',
                            fontSize: '1rem',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: 'normal',
                            letterSpacing: '-0.005rem'
                        }}>
                        RESUME / CV
                    </label>
                    {errors.resume && <span className='text-xs text-red-600'>({errors.resume})</span>}
                </div>
                <div className='relative'>
                    <input
                        type='file'
                        id='resume'
                        name='resume'
                        accept='.pdf,.doc,.docx'
                        onChange={handleFileChange}
                        className='hidden'
                    />
                    <label
                        htmlFor='resume'
                        className='flex w-full cursor-pointer items-center border-0 border-b bg-transparent pb-1 transition-colors'
                        style={{
                            borderBottomWidth: '1px',
                            borderBottomColor: errors.resume ? errorColor : borderColor
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderBottomColor = errors.resume ? errorColor : solidBorderColor;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderBottomColor = errors.resume ? errorColor : borderColor;
                        }}>
                        <span
                            style={{
                                color: textColor,
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '1rem',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.005rem',
                                opacity: formData.resume ? 1 : 0.5
                            }}>
                            {formData.resume ? formData.resume.name : 'Choose file...'}
                        </span>
                    </label>
                </div>
            </div>

            {/* LinkedIn/Portfolio */}
            <div>
                <div className='mb-2 flex items-center gap-2'>
                    <label
                        htmlFor='linkedin'
                        style={{
                            color: textColor,
                            fontFamily: '"Geist Mono", monospace',
                            fontSize: '1rem',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: 'normal',
                            letterSpacing: '-0.005rem'
                        }}>
                        LINKEDIN / PORTFOLIO (Optional)
                    </label>
                </div>
                <input
                    type='url'
                    id='linkedin'
                    name='linkedin'
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder='https://'
                    className='w-full border-0 border-b bg-transparent pb-1 placeholder:text-gray-400 focus:ring-0 focus:outline-none'
                    style={{
                        color: textColor,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1rem',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        letterSpacing: '-0.005rem',
                        borderBottomWidth: '1px',
                        borderBottomColor: borderColor
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = solidBorderColor)}
                    onBlur={(e) => (e.target.style.borderBottomColor = borderColor)}
                />
            </div>

            {/* Message Textarea */}
            <div>
                <div className='mb-2 flex items-center gap-2'>
                    <label
                        htmlFor='message'
                        style={{
                            color: errors.message ? errorColor : textColor,
                            fontFamily: '"Geist Mono", monospace',
                            fontSize: '1rem',
                            fontStyle: 'normal',
                            fontWeight: 500,
                            lineHeight: 'normal',
                            letterSpacing: '-0.005rem'
                        }}>
                        MESSAGE
                    </label>
                    {errors.message && <span className='text-xs text-red-600'>({errors.message})</span>}
                </div>
                <textarea
                    id='message'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder='Tell us about yourself and why you want to join our team ...'
                    className='w-full resize-none border-0 border-b bg-transparent pb-1 placeholder:text-gray-400 focus:ring-0 focus:outline-none'
                    style={{
                        color: textColor,
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '1rem',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: 'normal',
                        letterSpacing: '-0.005rem',
                        borderBottomWidth: '1px',
                        borderBottomColor: errors.message ? errorColor : borderColor
                    }}
                    onFocus={(e) => (e.target.style.borderBottomColor = errors.message ? errorColor : solidBorderColor)}
                    onBlur={(e) => (e.target.style.borderBottomColor = errors.message ? errorColor : borderColor)}
                />
            </div>

            {/* Submit Button */}
            <div className='flex justify-center pt-4'>
                <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    type='submit'
                    disabled={isSubmitting}
                    className='border-2 bg-transparent px-12 py-3 transition-colors disabled:opacity-50'
                    style={{
                        fontFamily: '"Geist Mono", monospace',
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        letterSpacing: '0.02em',
                        borderColor: solidBorderColor,
                        color: textColor
                    }}
                    onMouseEnter={(e) => {
                        if (!isSubmitting) {
                            e.currentTarget.style.backgroundColor = hoverBg;
                            e.currentTarget.style.color = hoverText;
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = textColor;
                    }}>
                    {isSubmitting ? uploadProgress || 'SENDING...' : 'SEND APPLICATION'}
                </motion.button>
            </div>
        </form>
    );
}
