import Image from 'next/image';
import Link from 'next/link';

import { PortfolioItem } from '@/types/content.types';

import { StarFrame } from './StarFrame';

interface FeaturePortfolioGalleryProps {
    items: PortfolioItem[];
}

export function FeaturePortfolioGallery({ items }: FeaturePortfolioGalleryProps) {
    return (
        <div className='flex w-full flex-col space-y-8'>
            {items.map((item, index) => {
                // Use featureThumbnail if available, fallback to thumbnail
                const imageUrl = item.featureThumbnail || item.thumbnail;

                return (
                    <Link
                        key={item.id}
                        href={`/portfolio/${item.id}`}
                        className='w-full'
                        style={{
                            height: '23.625rem',
                            flexShrink: 0
                        }}>
                        <StarFrame
                            haveBorder={true}
                            direction={['tl', 'br']}
                            color='white'
                            padding={1}
                            className='h-full w-full'>
                            <div className='group relative h-full w-full'>
                                {/* Title on the left */}
                                <div className='absolute bottom-4 left-4 z-10 transition-opacity duration-300 group-hover:opacity-0'>
                                    <h3
                                        style={{
                                            color: '#FFF',
                                            fontFamily: '"Syne", sans-serif',
                                            fontOpticalSizing: 'auto',
                                            fontSize: '1.5rem',
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                            letterSpacing: '-0.0075rem'
                                        }}>
                                        {String(index + 1).padStart(2, '0')}/ {item.title}
                                    </h3>
                                </div>

                                {/* Image */}
                                <div className='relative h-full w-full overflow-hidden'>
                                    <Image
                                        src={imageUrl}
                                        alt={item.title}
                                        fill
                                        sizes='75.625rem'
                                        className='h-full w-full object-cover grayscale'
                                    />
                                    {/* Grey gradient overlay */}
                                    <div
                                        className='absolute inset-0 transition-opacity duration-300 group-hover:opacity-0'
                                        style={{
                                            background:
                                                'linear-gradient(to bottom, transparent 0%, rgba(40, 40, 40, 0.8) 100%)'
                                        }}
                                    />
                                </div>

                                {/* Metadata on the bottom right */}
                                <div
                                    className='absolute right-4 bottom-4 z-10 flex gap-8 text-white transition-opacity duration-300 group-hover:opacity-0'
                                    style={{
                                        fontFamily: '"Geist Mono", monospace',
                                        fontSize: '0.875rem',
                                        fontStyle: 'normal',
                                        fontWeight: 400,
                                        lineHeight: 'normal',
                                        letterSpacing: '-0.004375rem'
                                    }}>
                                    <div>
                                        <div className='text-white/60'>DATE</div>
                                        <div>{item.date}</div>
                                    </div>
                                    {item.client && (
                                        <div>
                                            <div className='text-white/60'>CLIENT</div>
                                            <div>{item.client}</div>
                                        </div>
                                    )}
                                    {item.type && (
                                        <div>
                                            <div className='text-white/60'>TYPE</div>
                                            <div>{item.type}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </StarFrame>
                    </Link>
                );
            })}

            {/* Buttons */}
            <div className='flex items-center justify-center gap-4 pt-8'>
                <button
                    className='border border-white bg-white px-8 py-3 text-black transition-all duration-300 hover:bg-transparent hover:text-white'
                    style={{
                        fontFamily: '"Geist Mono", monospace',
                        fontSize: '0.875rem',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.00438rem',
                        borderRadius: '9999px'
                    }}>
                    BROWSE ALL PROJECT
                </button>
                <button
                    className='border border-white bg-transparent px-8 py-3 text-white transition-all duration-300 hover:bg-white hover:text-black'
                    style={{
                        fontFamily: '"Geist Mono", monospace',
                        fontSize: '0.875rem',
                        fontStyle: 'normal',
                        fontWeight: 500,
                        lineHeight: 'normal',
                        letterSpacing: '-0.00438rem',
                        borderRadius: '9999px'
                    }}>
                    CONTACT US
                </button>
            </div>
        </div>
    );
}
