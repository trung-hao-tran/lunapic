'use client';

import React, { useState } from 'react';

import Link from 'next/link';

import { FiArrowUpRight } from 'react-icons/fi';

export interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
    bio: string;
    className?: string;
    href?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, bio, className = '', href }) => {
    const [isActive, setIsActive] = useState(false);

    const handleMobileClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div
            className={`group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-[#333136] md:h-80 md:p-9 ${className}`}
            onClick={handleMobileClick}>
            {/* Role indicator - top left (hidden by default) */}
            <div
                className={`absolute top-5 left-3 z-10 text-xs text-[#BDBDBD] uppercase transition-all duration-500 ${
                    isActive
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                }`}>
                <span>{role}</span>
            </div>

            {/* Name - bottom (hidden by default, allows wrapping) */}
            <h2
                className={`relative z-10 text-lg leading-tight font-bold text-[#F9F9F9] transition-all duration-500 md:text-xl lg:text-2xl ${
                    isActive
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                }`}>
                {name}
            </h2>

            {/* Background image with subtle effect */}
            <div
                className={`absolute top-0 right-0 bottom-0 left-0 opacity-0 blur-sm grayscale transition-all duration-500 ${
                    isActive
                        ? 'blur-0 opacity-30 grayscale-0'
                        : 'group-hover:blur-0 group-hover:opacity-20 group-hover:grayscale-0'
                }`}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />

            {/* Corner accents */}
            <Corners />

            {/* Read Bio link - appears on hover/active */}
            <a
                href={href}
                className={`relative z-10 mt-4 flex w-fit items-center gap-1 text-sm font-medium text-blue-400 transition-all duration-500 hover:text-blue-300 ${
                    isActive
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                }`}>
                Read Bio
                <FiArrowUpRight className='text-base' />
            </a>
        </div>
    );
};

const Corners = () => (
    <>
        <span className='absolute top-[1px] left-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100' />
        <span className='absolute top-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100' />
        <span className='absolute right-[1px] bottom-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100' />
        <span className='absolute right-[1px] bottom-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100' />
        <span className='absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100' />
        <span className='absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100' />
        <span className='absolute top-[1px] right-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100' />
        <span className='absolute top-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100' />
    </>
);

export default TeamMember;
