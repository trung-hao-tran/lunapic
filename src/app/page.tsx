import Image from 'next/image';

import { BoxButton } from '@/components/BoxButton';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';

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
                            padding={5}
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
                <div className='relative h-[35vh] min-h-[300px] md:h-[80vh] md:min-h-[500px]'>
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
                            starSize={30}
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
            </Section>

            <Footer />
        </main>
    );
};

export default Page;
