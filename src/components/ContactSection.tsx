'use client';

import React, { useState } from 'react';

import { motion } from 'framer-motion';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ContactSectionProps {
    bgColor?: 'white' | 'black';
}

export function ContactSection({ bgColor = 'white' }: ContactSectionProps) {
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

    // Determine colors based on background
    const textColor = bgColor === 'black' ? '#FFF' : '#000';
    const borderColor = bgColor === 'black' ? 'rgba(255, 255, 255, 0.44)' : 'rgba(0, 0, 0, 0.44)';
    const solidBorderColor = bgColor === 'black' ? '#FFF' : '#000';
    const errorColor = '#dc2626';
    const hoverBg = bgColor === 'black' ? '#FFF' : '#000';
    const hoverText = bgColor === 'black' ? '#000' : '#FFF';
    const dropdownHoverBg = bgColor === 'black' ? '#151515' : '#f5f5f5';

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
                                onBlur={(e) =>
                                    (e.target.style.borderBottomColor = errors.name ? errorColor : borderColor)
                                }
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
                                onBlur={(e) =>
                                    (e.target.style.borderBottomColor = errors.email ? errorColor : borderColor)
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
                                    color: errors.company ? errorColor : textColor,
                                    fontFamily: '"Geist Mono", monospace',
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
                                color: textColor,
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '1rem',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.005rem',
                                borderBottomWidth: '1px',
                                borderBottomColor: errors.company ? errorColor : borderColor
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderBottomColor = errors.company ? errorColor : solidBorderColor)
                            }
                            onBlur={(e) =>
                                (e.target.style.borderBottomColor = errors.company ? errorColor : borderColor)
                            }
                        />
                    </div>

                    {/* Services Dropdown */}
                    <div>
                        <div className='mb-2 flex items-center gap-2'>
                            <label
                                htmlFor='service'
                                style={{
                                    color: errors.service ? errorColor : textColor,
                                    fontFamily: '"Geist Mono", monospace',
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
                        <Select
                            value={formData.service}
                            onValueChange={(value) => {
                                setFormData({ ...formData, service: value });
                                if (errors.service) {
                                    setErrors({ ...errors, service: '' });
                                }
                            }}>
                            <SelectTrigger
                                className='w-full rounded-none border-0 border-b bg-transparent px-0 pb-1 shadow-none focus:ring-0'
                                style={{
                                    color: textColor,
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 400,
                                    letterSpacing: '-0.005rem',
                                    borderBottomWidth: '1px',
                                    borderBottomColor: errors.service ? errorColor : borderColor
                                }}>
                                <SelectValue placeholder='' />
                            </SelectTrigger>
                            <SelectContent
                                style={{
                                    backgroundColor: bgColor === 'black' ? '#000' : '#fff',
                                    borderColor: solidBorderColor
                                }}>
                                <SelectItem
                                    value='web-development'
                                    className={
                                        bgColor === 'black'
                                            ? 'hover:bg-[#151515] focus:bg-[#151515]'
                                            : 'hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]'
                                    }
                                    style={{
                                        color: textColor,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                    Web Development
                                </SelectItem>
                                <SelectItem
                                    value='mobile-app'
                                    className={
                                        bgColor === 'black'
                                            ? 'hover:bg-[#151515] focus:bg-[#151515]'
                                            : 'hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]'
                                    }
                                    style={{
                                        color: textColor,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                    Mobile App Development
                                </SelectItem>
                                <SelectItem
                                    value='ui-ux-design'
                                    className={
                                        bgColor === 'black'
                                            ? 'hover:bg-[#151515] focus:bg-[#151515]'
                                            : 'hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]'
                                    }
                                    style={{
                                        color: textColor,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                    UI/UX Design
                                </SelectItem>
                                <SelectItem
                                    value='branding'
                                    className={
                                        bgColor === 'black'
                                            ? 'hover:bg-[#151515] focus:bg-[#151515]'
                                            : 'hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]'
                                    }
                                    style={{
                                        color: textColor,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                    Branding
                                </SelectItem>
                                <SelectItem
                                    value='consulting'
                                    className={
                                        bgColor === 'black'
                                            ? 'hover:bg-[#151515] focus:bg-[#151515]'
                                            : 'hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]'
                                    }
                                    style={{
                                        color: textColor,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                    Consulting
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Budget Dropdown */}
                    <div>
                        <div className='mb-2 flex items-center gap-2'>
                            <label
                                htmlFor='budget'
                                style={{
                                    color: errors.budget ? errorColor : textColor,
                                    fontFamily: '"Geist Mono", monospace',
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
                        <Select
                            value={formData.budget}
                            onValueChange={(value) => {
                                setFormData({ ...formData, budget: value });
                                if (errors.budget) {
                                    setErrors({ ...errors, budget: '' });
                                }
                            }}>
                            <SelectTrigger
                                className='w-full rounded-none border-0 border-b bg-transparent px-0 pb-1 shadow-none focus:ring-0'
                                style={{
                                    color: textColor,
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '1rem',
                                    fontWeight: 400,
                                    letterSpacing: '-0.005rem',
                                    borderBottomWidth: '1px',
                                    borderBottomColor: errors.budget ? errorColor : borderColor
                                }}>
                                <SelectValue placeholder='' />
                            </SelectTrigger>
                            <SelectContent
                                style={{
                                    backgroundColor: bgColor === 'black' ? '#000' : '#fff',
                                    borderColor: solidBorderColor
                                }}>
                                <SelectItem
                                    value='under-10k'
                                    className={
                                        bgColor === 'black'
                                            ? 'hover:bg-[#151515] focus:bg-[#151515]'
                                            : 'hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]'
                                    }
                                    style={{
                                        color: textColor,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                    Under $10,000
                                </SelectItem>
                                <SelectItem
                                    value='10k-25k'
                                    className={
                                        bgColor === 'black'
                                            ? 'hover:bg-[#151515] focus:bg-[#151515]'
                                            : 'hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]'
                                    }
                                    style={{
                                        color: textColor,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                    $10,000 - $25,000
                                </SelectItem>
                                <SelectItem
                                    value='25k-50k'
                                    className={
                                        bgColor === 'black'
                                            ? 'hover:bg-[#151515] focus:bg-[#151515]'
                                            : 'hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]'
                                    }
                                    style={{
                                        color: textColor,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                    $25,000 - $50,000
                                </SelectItem>
                                <SelectItem
                                    value='50k-100k'
                                    className={
                                        bgColor === 'black'
                                            ? 'hover:bg-[#151515] focus:bg-[#151515]'
                                            : 'hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]'
                                    }
                                    style={{
                                        color: textColor,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                    $50,000 - $100,000
                                </SelectItem>
                                <SelectItem
                                    value='over-100k'
                                    className={
                                        bgColor === 'black'
                                            ? 'hover:bg-[#151515] focus:bg-[#151515]'
                                            : 'hover:bg-[#f5f5f5] focus:bg-[#f5f5f5]'
                                    }
                                    style={{
                                        color: textColor,
                                        fontFamily: 'Inter, sans-serif'
                                    }}>
                                    Over $100,000
                                </SelectItem>
                            </SelectContent>
                        </Select>
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
                            placeholder='Tell us more about your project here ....'
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
                            onFocus={(e) =>
                                (e.target.style.borderBottomColor = errors.message ? errorColor : solidBorderColor)
                            }
                            onBlur={(e) =>
                                (e.target.style.borderBottomColor = errors.message ? errorColor : borderColor)
                            }
                        />
                    </div>

            {/* Submit Button */}
            <div className='flex justify-center pt-4'>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type='submit'
                    className='border-2 bg-transparent px-12 py-3 transition-colors'
                    style={{
                        fontFamily: '"Geist Mono", monospace',
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        letterSpacing: '0.02em',
                        borderColor: solidBorderColor,
                        color: textColor
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = hoverBg;
                        e.currentTarget.style.color = hoverText;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = textColor;
                    }}>
                    SEND MESSAGE
                </motion.button>
            </div>
        </form>
    );
}
