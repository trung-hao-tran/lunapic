import Image from 'next/image';

import { BoxButton } from '@/components/BoxButton';
import { HeroSection } from '@/components/HeroSection';
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
                        className='h-auto max-w-2xl'
                        priority
                    />
                </StarFrame>

                {/* Subtitle */}
                <p
                    className='max-w-2xl text-base text-white/80 md:text-lg lg:text-xl'
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
        </main>
    );
};

export default Page;
