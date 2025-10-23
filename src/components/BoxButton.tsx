'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface BoxButtonProps {
  text: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  href?: string;
}

// Default icon - Acclaim icon with white and blue versions, rotated to point right
const DefaultIcon = () => (
  <div className="relative w-5 h-5">
    {/* White icon - slides out on hover */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width="20"
      height="20"
      className="absolute inset-0 transition-all duration-300 ease-out group-hover:translate-x-6 group-hover:opacity-0 rotate-90"
    >
      <path
        d="M192 64C176.376 74.86 34.879 208.266 27.429 221.373v72.22c10.325.253 147.565-143.552 164.571-150.382c17.006 6.83 154.246 150.635 164.571 150.382v-72.22C349.121 208.266 207.624 74.859 192 64m0 154.406C176.376 229.266 34.879 362.672 27.429 375.78V448c10.325.254 147.565-143.551 164.571-150.383C209.006 304.448 346.246 448.253 356.571 448v-72.221C349.121 362.672 207.624 229.266 192 218.406"
        fill="white"
      />
    </svg>

    {/* Blue icon - slides in on hover */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      width="20"
      height="20"
      className="absolute inset-0 transition-all duration-300 ease-out -translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 rotate-90"
    >
      <path
        d="M192 64C176.376 74.86 34.879 208.266 27.429 221.373v72.22c10.325.253 147.565-143.552 164.571-150.382c17.006 6.83 154.246 150.635 164.571 150.382v-72.22C349.121 208.266 207.624 74.859 192 64m0 154.406C176.376 229.266 34.879 362.672 27.429 375.78V448c10.325.254 147.565-143.551 164.571-150.383C209.006 304.448 346.246 448.253 356.571 448v-72.221C349.121 362.672 207.624 229.266 192 218.406"
        fill="#3B82F6"
      />
    </svg>
  </div>
);

/**
 * BoxButton component with animated border effect
 * Two-section button (text | icon) where vertical borders grow from top/bottom on hover
 */
export function BoxButton({ text, icon, onClick, className = '', href }: BoxButtonProps) {
  const displayIcon = icon || <DefaultIcon />;

  const buttonContent = (
    <>
      {/* Text Section */}
      <span className="relative px-4 py-2 md:px-6 md:py-3 whitespace-nowrap transition-colors duration-300 ease-out group-hover:text-blue-500">
        {/* Top border - full width */}
        <span className="absolute top-0 left-0 right-0 h-[1px] bg-white" />

        {/* Bottom border - full width */}
        <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />

        {/* Left border - top segment (20%) */}
        <span className="absolute top-0 left-0 w-[1px] h-[20%] bg-white transition-all duration-300 group-hover:h-[50%]" />

        {/* Left border - bottom segment (20%) */}
        <span className="absolute bottom-0 left-0 w-[1px] h-[20%] bg-white transition-all duration-300 group-hover:h-[50%]" />

        {text}
      </span>

      {/* Icon Section */}
      <span className="relative px-3 py-2 md:px-4 md:py-3 flex items-center justify-center overflow-hidden">
        {/* Top border - full width */}
        <span className="absolute top-0 left-0 right-0 h-[1px] bg-white" />

        {/* Bottom border - full width */}
        <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white" />

        {/* Middle shared border - top segment (20%) */}
        <span className="absolute top-0 left-0 w-[1px] h-[20%] bg-white transition-all duration-300 group-hover:h-[50%]" />

        {/* Middle shared border - bottom segment (20%) */}
        <span className="absolute bottom-0 left-0 w-[1px] h-[20%] bg-white transition-all duration-300 group-hover:h-[50%]" />

        {/* Right border - top segment (20%) */}
        <span className="absolute top-0 right-0 w-[1px] h-[20%] bg-white transition-all duration-300 group-hover:h-[50%]" />

        {/* Right border - bottom segment (20%) */}
        <span className="absolute bottom-0 right-0 w-[1px] h-[20%] bg-white transition-all duration-300 group-hover:h-[50%]" />

        {displayIcon}
      </span>
    </>
  );

  const sharedClassName = `group relative inline-flex items-stretch text-sm md:text-base font-medium text-white transition-all duration-300 ${className}`;
  const sharedStyle = { fontFamily: '"Geist Mono", monospace' };

  if (href) {
    return (
      <Link href={href} className={sharedClassName} style={sharedStyle}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={sharedClassName} style={sharedStyle}>
      {buttonContent}
    </button>
  );
}
