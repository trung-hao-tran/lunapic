import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
    background?: 'default' | 'muted' | 'accent' | 'black' | 'dark-gray' | 'transparent';
    height?: 'screen' | '80vh' | 'auto';
    padding?: boolean;
}

const Section = ({ 
    id, 
    children, 
    className, 
    background = 'default', 
    height = 'screen',
    padding = true 
}: SectionProps) => {
    const backgroundClasses = {
        default: 'bg-background',
        muted: 'bg-muted',
        accent: 'bg-accent/10',
        black: 'bg-black',
        'dark-gray': 'bg-gray-900',
        transparent: 'bg-transparent'
    };

    const heightClasses = {
        screen: 'min-h-screen',
        '80vh': 'h-[80vh]',
        auto: 'min-h-auto'
    };

    return (
        <section
            id={id}
            className={cn(
                'w-full flex flex-col justify-center items-center scroll-mt-16',
                heightClasses[height],
                backgroundClasses[background],
                padding && 'px-4 sm:px-6 lg:px-8',
                className
            )}
        >
            <div className={cn("w-full", padding && "max-w-7xl mx-auto")}>
                {children}
            </div>
        </section>
    );
};

export default Section;