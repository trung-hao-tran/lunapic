import React from 'react';

interface SectionProps {
    title: string;
    number?: string;
    bgColor?: string;
    headerColor?: string;
    children: React.ReactNode;
    id?: string;
    headerSeparator?: boolean;
    hasHeader?: boolean;
}

export function Section({
    title,
    number,
    bgColor = '#F9F9F9',
    headerColor = '#000000',
    children,
    id,
    headerSeparator = true,
    hasHeader = true,
    ...rest
}: SectionProps & React.HTMLAttributes<HTMLElement>) {
    return (
        <section className='pb-24 pt-16' style={{ backgroundColor: bgColor }} {...rest}>
            <div className='container mx-auto px-6 md:px-12 lg:px-16'>
                {/* Section Header */}
                {hasHeader && (
                    <div id={id} className='mb-32 flex items-center gap-4' style={{ color: headerColor }}>
                        <h2
                            className='whitespace-nowrap text-base font-medium uppercase tracking-wide md:text-lg'
                            style={{
                                fontFamily: '"Geist Mono", monospace',
                                letterSpacing: '-0.07px'
                            }}>
                            {number && `${number}/ `}
                            {title}
                        </h2>
                        {headerSeparator && <div className='h-px flex-1 bg-current opacity-20' />}
                    </div>
                )}

                {/* Section Content */}
                <div>{children}</div>
            </div>
        </section>
    );
}
