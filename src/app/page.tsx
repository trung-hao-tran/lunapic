import Image from 'next/image';
import Link from 'next/link';

import { BoxButton } from '@/components/BoxButton';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { portfolioItems, testimonials } from '@/data/dummyData';

const Page = () => {
    return (
        <main>
            <HeroSection backgroundMedia='/videos/hero.mp4'>
                {/* Main Heading - Logo with StarFrame */}
                <StarFrame haveBorder={false} starSize={40} direction={['tl', 'br']} color='white'>
                    <Image
                        src='/Logo full.svg'
                        alt='Luna Pictures'
                        width={470}
                        height={60}
                        className='h-auto w-full max-w-[240px] sm:max-w-md md:max-w-lg lg:max-w-2xl'
                        priority
                    />
                </StarFrame>

                {/* Subtitle */}
                <p
                    className='max-w-2xl text-xs text-white/80 sm:text-base md:text-lg lg:text-xl'
                    style={{
                        fontFamily: '"Geist Mono", monospace',
                        letterSpacing: '-0.07px'
                    }}>
                    Premier video production studio in the heart of Australia
                </p>

                {/* CTA Button */}
                <div className='pt-4'>
                    <BoxButton text="LET'S TALK" />
                </div>
            </HeroSection>

            {/* About Us Section */}
            <Section title='ABOUT US' number='2' bgColor='#040404' headerColor='#fdfdfd'>
                <div className='grid grid-cols-1 gap-12 md:grid-cols-2'>
                    {/* Left Column - Text Content */}
                    <div className='order-2 space-y-6 md:order-1'>
                        <h3
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '2.25rem',
                                fontWeight: 400,
                                lineHeight: 'normal',
                                letterSpacing: '-0.1125rem'
                            }}>
                            <span style={{ color: 'rgba(255, 255, 255, 0.70)' }}>
                                We transform ideas into visual stories that{' '}
                            </span>
                            <span style={{ color: '#FFF' }}>inspire and connect</span>
                        </h3>

                        <p
                            className='text-sm leading-relaxed text-white/80 md:text-base'
                            style={{
                                fontFamily: '"Geist Mono", monospace',
                                letterSpacing: '-0.07px'
                            }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore. Et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris. Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
                        </p>

                        <div className='pt-4'>
                            <BoxButton text='OUR STORY' />
                        </div>
                    </div>

                    {/* Right Column - Image */}
                    <div className='order-1 md:order-2'>
                        <StarFrame
                            haveBorder={true}
                            direction={['tr', 'bl']}
                            starSize={30}
                            color='white'
                            padding={7}
                            className='w-full'>
                            <div className='relative aspect-[3/2] w-full overflow-hidden'>
                                <Image src='/images/home_about_us.jpg' alt='About Us' fill className='object-cover' />
                            </div>
                        </StarFrame>
                    </div>
                </div>
            </Section>

            {/* Our Work Section */}
            <Section title='OUR WORK' number='3' bgColor='#040404' headerColor='#fdfdfd'>
                <div className='relative h-[35vh] min-h-[300px] md:h-[55vh] md:min-h-[500px]'>
                    {/* SHOW text - top left, behind media */}
                    <h3
                        className='absolute top-0 left-0 z-0 text-[4rem] md:text-[8rem] lg:text-[12.5rem]'
                        style={{
                            fontFamily: 'SVN-Gilroy, sans-serif',
                            opacity: 0.48,
                            fontWeight: 700,
                            lineHeight: 'normal',
                            letterSpacing: '-0.0625rem',
                            color: '#FFF'
                        }}>
                        SHOW
                    </h3>

                    {/* REEL text - bottom right, behind media */}
                    <h3
                        className='absolute right-0 bottom-0 z-0 text-[4rem] md:text-[8rem] lg:text-[12.5rem]'
                        style={{
                            fontFamily: 'SVN-Gilroy, sans-serif',
                            opacity: 0.48,
                            fontWeight: 700,
                            lineHeight: 'normal',
                            letterSpacing: '-0.0625rem',
                            WebkitTextStroke: '2px #FFF',
                            WebkitTextFillColor: 'transparent',
                            color: 'transparent'
                        }}>
                        REEL
                    </h3>

                    {/* Centered Video with StarFrame */}
                    <div className='absolute top-1/2 left-1/2 z-10 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2'>
                        <StarFrame
                            haveBorder={true}
                            direction={['tr', 'bl']}
                            starSize={40}
                            color='white'
                            className='w-full'
                            padding={2}>
                            <div className='relative aspect-video w-full overflow-hidden'>
                                <iframe
                                    src='https://www.youtube.com/embed/RL-mQorhj-4'
                                    title='Showreel'
                                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                                    allowFullScreen
                                    className='absolute inset-0 h-full w-full'
                                />
                            </div>
                        </StarFrame>
                    </div>
                </div>

                {/* Portfolio Gallery */}
                <div className='mt-16 space-y-8 md:mt-24'>
                    {/* Portfolio Heading */}
                    <h2
                        className='mb-16 inline-block border-b border-white pb-2'
                        style={{
                            color: '#FFF',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '2rem',
                            fontWeight: 600,
                            lineHeight: 'normal',
                            letterSpacing: '-0.1rem'
                        }}>
                        OUR PORTFOLIO
                    </h2>

                    {/* Dynamic Portfolio Rows */}
                    {(() => {
                        // Group items by row
                        const rowGroups = portfolioItems.reduce(
                            (acc, item) => {
                                const rowNum = item.row || 1;
                                if (!acc[rowNum]) acc[rowNum] = [];
                                acc[rowNum].push(item);

                                return acc;
                            },
                            {} as Record<number, typeof portfolioItems>
                        );

                        return Object.entries(rowGroups)
                            .sort(([a], [b]) => Number(a) - Number(b))
                            .map(([rowNum, rowItems]) => {
                                // Calculate grid template columns based on weights
                                const gridCols = rowItems.map((item) => `${item.weight || 1}fr`).join(' ');

                                return (
                                    <div
                                        key={rowNum}
                                        className='grid grid-cols-1 gap-8 md:[grid-template-columns:var(--grid-template)]'
                                        style={
                                            {
                                                '--grid-template': gridCols
                                            } as React.CSSProperties
                                        }>
                                        {rowItems.map((item, idx) => {
                                            const isFirst = idx === 0;
                                            const isLast = idx === rowItems.length - 1;
                                            const starDirection = isFirst ? ['tl', 'bl'] : isLast ? ['tr', 'br'] : [];

                                            return (
                                                <Link
                                                    key={item.id}
                                                    href={item.href || '#'}
                                                    className='group relative block transition-transform duration-300 hover:scale-[1.02]'>
                                                    <StarFrame
                                                        haveBorder={true}
                                                        direction={starDirection as Array<'tl' | 'tr' | 'bl' | 'br'>}
                                                        starSize={30}
                                                        color='white'
                                                        borderColor='white'
                                                        padding={7}
                                                        className='w-full'>
                                                        <div
                                                            className={`relative w-full overflow-hidden ${
                                                                item.height
                                                                    ? 'aspect-[4/3] md:aspect-auto md:h-[var(--item-height)]'
                                                                    : 'aspect-[4/3]'
                                                            }`}
                                                            style={
                                                                item.height
                                                                    ? ({
                                                                          '--item-height': item.height
                                                                      } as React.CSSProperties)
                                                                    : undefined
                                                            }>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.title}
                                                                fill
                                                                className='object-cover transition-transform duration-300 group-hover:scale-105'
                                                            />
                                                        </div>
                                                    </StarFrame>

                                                    {/* Item Info */}
                                                    <div className='mt-6 mb-8 flex items-start justify-between'>
                                                        <div className='space-y-2'>
                                                            <p
                                                                style={{
                                                                    color: '#FFF',
                                                                    fontFamily: '"Geist Mono", monospace',
                                                                    fontSize: '1rem',
                                                                    fontWeight: 700,
                                                                    lineHeight: 'normal',
                                                                    letterSpacing: '-0.005rem'
                                                                }}>
                                                                [{item.title}]
                                                            </p>
                                                            <p
                                                                style={{
                                                                    color: '#FFF',
                                                                    fontFamily: '"Geist Mono", monospace',
                                                                    fontSize: '1rem',
                                                                    fontWeight: 400,
                                                                    lineHeight: 'normal',
                                                                    letterSpacing: '-0.005rem'
                                                                }}>
                                                                {item.date}
                                                            </p>
                                                        </div>
                                                        <div className='flex flex-col items-end justify-between'>
                                                            <span
                                                                className='flex items-center justify-center rounded-full border border-white/40'
                                                                style={{
                                                                    color: '#FFF',
                                                                    fontFamily: '"Geist Mono", monospace',
                                                                    fontSize: '1rem',
                                                                    fontWeight: 400,
                                                                    lineHeight: 'normal',
                                                                    letterSpacing: '-0.005rem',
                                                                    width: '10.1875rem',
                                                                    height: '2.1875rem',
                                                                    flexShrink: 0
                                                                }}>
                                                                {item.category}
                                                            </span>
                                                            <svg
                                                                className='mt-4 transition-transform duration-300 group-hover:translate-x-1'
                                                                xmlns='http://www.w3.org/2000/svg'
                                                                width='22'
                                                                height='22'
                                                                viewBox='0 0 22 22'
                                                                fill='none'>
                                                                <path
                                                                    d='M1 11H20.5M20.5 11L11.5 1M20.5 11L11.5 20.5'
                                                                    stroke='white'
                                                                    strokeWidth='2'
                                                                    strokeLinecap='round'
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                );
                            });
                    })()}

                    {/* View Portfolio Button */}
                    <div className='flex justify-center pt-8'>
                        <BoxButton text='VIEW PORTFOLIO' />
                    </div>
                </div>
            </Section>

            {/* Testimonials Section */}
            <Section title='TESTIMONIALS' number='4' bgColor='#FDFDFD' headerColor='#000000'>
                <TestimonialsSection testimonials={testimonials} />
            </Section>

            {/* Contact Section */}
            <Section title='CONTACT US' number='5' bgColor='#FDFDFD' headerColor='#000000'>
                <ContactSection />
            </Section>

            <Footer />
        </main>
    );
};

export default Page;
