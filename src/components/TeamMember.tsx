'use client';

import React, { useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';

export interface TeamMemberProps {
    name: string;
    role: string;
    image: string;
    bio: string;
    className?: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({
    name,
    role,
    image,
    bio,
    className = ''
}) => {
    const [isActive, setIsActive] = useState(false);

    const handleMobileClick = () => {
        setIsActive(!isActive);
    };

    return (
        <div 
            className={`group relative flex h-56 flex-col justify-end overflow-hidden p-6 transition-colors hover:bg-[#333136] md:h-80 md:p-9 ${className}`}
            onClick={handleMobileClick}
        >
            {/* Role indicator - top left (hidden by default) */}
            <div className={`absolute left-3 top-5 z-10 text-xs uppercase text-[#BDBDBD] transition-all duration-500 ${
                isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
            }`}>
                <span>{role}</span>
            </div>

            {/* Name - bottom (hidden by default, allows wrapping) */}
            <h2 
                className={`relative z-10 text-lg font-bold leading-tight text-[#F9F9F9] transition-all duration-500 md:text-xl lg:text-2xl ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                }`}
            >
                {name}
            </h2>

            {/* Background image with subtle effect */}
            <div
                className={`absolute bottom-0 left-0 right-0 top-0 opacity-0 blur-sm grayscale transition-all duration-500 ${
                    isActive ? 'opacity-30 blur-0 grayscale-0' : 'group-hover:opacity-20 group-hover:blur-0 group-hover:grayscale-0'
                }`}
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            {/* Corner accents */}
            <Corners />

            {/* Read Bio link - appears on hover/active */}
            <a 
                href="#"
                className={`relative z-10 mt-4 flex w-fit items-center gap-1 text-sm font-medium text-blue-400 transition-all duration-500 hover:text-blue-300 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
                }`}
            >
                Read Bio
                <FiArrowUpRight className="text-base" />
            </a>
        </div>
    );
};

const Corners = () => (
    <>
        <span className="absolute left-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute left-[1px] top-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] right-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] right-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] left-[1px] z-10 h-3 w-[1px] origin-bottom scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute bottom-[1px] left-[1px] z-10 h-[1px] w-3 origin-left scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute right-[1px] top-[1px] z-10 h-3 w-[1px] origin-top scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100" />
        <span className="absolute right-[1px] top-[1px] z-10 h-[1px] w-3 origin-right scale-0 bg-blue-400 transition-all duration-500 group-hover:scale-100" />
    </>
);

export default TeamMember;