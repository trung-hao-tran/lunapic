'use client';

import React, { useState } from 'react';

export function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        company: '',
        service: '',
        budget: '',
        message: ''
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailRegex.test(email);
    };

    const validateForm = () => {
        const newErrors = {
            name: '',
            email: '',
            company: '',
            service: '',
            budget: '',
            message: ''
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

        if (!formData.company.trim()) {
            newErrors.company = 'Company name is required';
            isValid = false;
        }

        if (!formData.service) {
            newErrors.service = 'Please select a service';
            isValid = false;
        }

        if (!formData.budget) {
            newErrors.budget = 'Please select a budget';
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Form submitted:', formData);
            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                company: '',
                service: '',
                budget: '',
                message: ''
            });
            setErrors({
                name: '',
                email: '',
                company: '',
                service: '',
                budget: '',
                message: ''
            });
            alert('Form submitted successfully!');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

    return (
        <div className='mx-auto px-6'>
            {/* Two Column Layout */}
            <div className='grid grid-cols-1 gap-24 lg:grid-cols-[3fr_7fr]'>
                {/* Left Column - Heading & Description */}
                <div>
                    <h2 className='mb-6'>
                        <span
                            style={{
                                color: 'rgba(0, 0, 0, 0.50)',
                                fontFamily: 'Inter',
                                fontSize: '2.25rem',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.1125rem'
                            }}>
                            Let&apos;s make your vision
                        </span>{' '}
                        <span
                            style={{
                                display: 'block',
                                color: '#000',
                                fontFamily: 'Inter',
                                fontSize: '2.25rem',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.1125rem'
                            }}>
                            come true
                        </span>
                    </h2>
                    <p
                        style={{
                            color: '#000',
                            fontFamily: 'Inter',
                            fontSize: '1rem',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                            letterSpacing: '-0.005rem',
                            maxWidth: '400px'
                        }}>
                        Lorem ipsum dolor sit amet consectetur ultrices tempus scelerisque et nulla vestibulum lacus
                        ultrices proin nunc semper urna urna.
                    </p>
                </div>

                {/* Right Column - Contact Form */}
                <form onSubmit={handleSubmit} className='space-y-12'>
                    {/* Name and Email Row */}
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                        <div>
                            <div className='mb-2 flex items-center gap-2'>
                                <label
                                    htmlFor='name'
                                    style={{
                                        color: errors.name ? '#dc2626' : '#000',
                                        fontFamily: 'var(--font-geist-mono), monospace',
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
                                    color: '#000',
                                    fontFamily: 'var(--font-inter), sans-serif',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.005rem',
                                    borderBottomWidth: '1px',
                                    borderBottomColor: errors.name ? '#dc2626' : 'rgba(0, 0, 0, 0.44)'
                                }}
                                onFocus={(e) => (e.target.style.borderBottomColor = errors.name ? '#dc2626' : '#000')}
                                onBlur={(e) =>
                                    (e.target.style.borderBottomColor = errors.name ? '#dc2626' : 'rgba(0, 0, 0, 0.44)')
                                }
                            />
                        </div>
                        <div>
                            <div className='mb-2 flex items-center gap-2'>
                                <label
                                    htmlFor='email'
                                    style={{
                                        color: errors.email ? '#dc2626' : '#000',
                                        fontFamily: 'var(--font-geist-mono), monospace',
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
                                    color: '#000',
                                    fontFamily: 'var(--font-inter), sans-serif',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.005rem',
                                    borderBottomWidth: '1px',
                                    borderBottomColor: errors.email ? '#dc2626' : 'rgba(0, 0, 0, 0.44)'
                                }}
                                onFocus={(e) => (e.target.style.borderBottomColor = errors.email ? '#dc2626' : '#000')}
                                onBlur={(e) =>
                                    (e.target.style.borderBottomColor = errors.email
                                        ? '#dc2626'
                                        : 'rgba(0, 0, 0, 0.44)')
                                }
                            />
                        </div>
                    </div>

                    {/* Company Name */}
                    <div>
                        <div className='mb-2 flex items-center gap-2'>
                            <label
                                htmlFor='company'
                                style={{
                                    color: errors.company ? '#dc2626' : '#000',
                                    fontFamily: 'var(--font-geist-mono), monospace',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.005rem'
                                }}>
                                YOUR COMPANY NAME
                            </label>
                            {errors.company && <span className='text-xs text-red-600'>({errors.company})</span>}
                        </div>
                        <input
                            type='text'
                            id='company'
                            name='company'
                            value={formData.company}
                            onChange={handleChange}
                            className='w-full border-0 border-b bg-transparent pb-1 focus:ring-0 focus:outline-none'
                            style={{
                                color: '#000',
                                fontFamily: 'var(--font-inter), sans-serif',
                                fontSize: '1rem',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.005rem',
                                borderBottomWidth: '1px',
                                borderBottomColor: errors.company ? '#dc2626' : 'rgba(0, 0, 0, 0.44)'
                            }}
                            onFocus={(e) => (e.target.style.borderBottomColor = errors.company ? '#dc2626' : '#000')}
                            onBlur={(e) =>
                                (e.target.style.borderBottomColor = errors.company ? '#dc2626' : 'rgba(0, 0, 0, 0.44)')
                            }
                        />
                    </div>

                    {/* Services Dropdown */}
                    <div className='relative'>
                        <div className='mb-2 flex items-center gap-2'>
                            <label
                                htmlFor='service'
                                style={{
                                    color: errors.service ? '#dc2626' : '#000',
                                    fontFamily: 'var(--font-geist-mono), monospace',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.005rem'
                                }}>
                                SERVICES
                            </label>
                            {errors.service && <span className='text-xs text-red-600'>({errors.service})</span>}
                        </div>
                        <select
                            id='service'
                            name='service'
                            value={formData.service}
                            onChange={handleChange}
                            className='w-full appearance-none border-0 border-b bg-transparent pb-1 focus:ring-0 focus:outline-none'
                            style={{
                                color: '#000',
                                fontFamily: 'var(--font-inter), sans-serif',
                                fontSize: '1rem',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.005rem',
                                borderBottomWidth: '1px',
                                borderBottomColor: errors.service ? '#dc2626' : 'rgba(0, 0, 0, 0.44)'
                            }}
                            onFocus={(e) => (e.target.style.borderBottomColor = errors.service ? '#dc2626' : '#000')}
                            onBlur={(e) =>
                                (e.target.style.borderBottomColor = errors.service ? '#dc2626' : 'rgba(0, 0, 0, 0.44)')
                            }>
                            <option value=''></option>
                            <option value='web-development'>Web Development</option>
                            <option value='mobile-app'>Mobile App Development</option>
                            <option value='ui-ux-design'>UI/UX Design</option>
                            <option value='branding'>Branding</option>
                            <option value='consulting'>Consulting</option>
                        </select>
                        <svg
                            className='pointer-events-none absolute right-0 bottom-3'
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path d='M4 6L8 10L12 6' stroke='black' strokeWidth='1.5' strokeLinecap='round' />
                        </svg>
                    </div>

                    {/* Budget Dropdown */}
                    <div className='relative'>
                        <div className='mb-2 flex items-center gap-2'>
                            <label
                                htmlFor='budget'
                                style={{
                                    color: errors.budget ? '#dc2626' : '#000',
                                    fontFamily: 'var(--font-geist-mono), monospace',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 500,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.005rem'
                                }}>
                                BUDGET
                            </label>
                            {errors.budget && <span className='text-xs text-red-600'>({errors.budget})</span>}
                        </div>
                        <select
                            id='budget'
                            name='budget'
                            value={formData.budget}
                            onChange={handleChange}
                            className='w-full appearance-none border-0 border-b bg-transparent pb-1 focus:ring-0 focus:outline-none'
                            style={{
                                color: '#000',
                                fontFamily: 'var(--font-inter), sans-serif',
                                fontSize: '1rem',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.005rem',
                                borderBottomWidth: '1px',
                                borderBottomColor: errors.budget ? '#dc2626' : 'rgba(0, 0, 0, 0.44)'
                            }}
                            onFocus={(e) => (e.target.style.borderBottomColor = errors.budget ? '#dc2626' : '#000')}
                            onBlur={(e) =>
                                (e.target.style.borderBottomColor = errors.budget ? '#dc2626' : 'rgba(0, 0, 0, 0.44)')
                            }>
                            <option value=''></option>
                            <option value='under-10k'>Under $10,000</option>
                            <option value='10k-25k'>$10,000 - $25,000</option>
                            <option value='25k-50k'>$25,000 - $50,000</option>
                            <option value='50k-100k'>$50,000 - $100,000</option>
                            <option value='over-100k'>Over $100,000</option>
                        </select>
                        <svg
                            className='pointer-events-none absolute right-0 bottom-3'
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path d='M4 6L8 10L12 6' stroke='black' strokeWidth='1.5' strokeLinecap='round' />
                        </svg>
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <div className='mb-2 flex items-center gap-2'>
                            <label
                                htmlFor='message'
                                style={{
                                    color: errors.message ? '#dc2626' : '#000',
                                    fontFamily: 'var(--font-geist-mono), monospace',
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
                            placeholder='Tell us more about your project here ....'
                            className='w-full resize-none border-0 border-b bg-transparent pb-1 placeholder:text-gray-400 focus:ring-0 focus:outline-none'
                            style={{
                                color: '#000',
                                fontFamily: 'var(--font-inter), sans-serif',
                                fontSize: '1rem',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.005rem',
                                borderBottomWidth: '1px',
                                borderBottomColor: errors.message ? '#dc2626' : 'rgba(0, 0, 0, 0.44)'
                            }}
                            onFocus={(e) => (e.target.style.borderBottomColor = errors.message ? '#dc2626' : '#000')}
                            onBlur={(e) =>
                                (e.target.style.borderBottomColor = errors.message ? '#dc2626' : 'rgba(0, 0, 0, 0.44)')
                            }
                        />
                    </div>

                    {/* Submit Button */}
                    <div className='flex justify-center pt-4'>
                        <button
                            type='submit'
                            className='border-2 border-black bg-transparent px-12 py-3 transition-colors hover:bg-black hover:text-white'
                            style={{
                                fontFamily: 'var(--font-geist-mono), monospace',
                                fontSize: '0.875rem',
                                fontWeight: 400,
                                letterSpacing: '0.02em'
                            }}>
                            SEND MESSAGE
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
