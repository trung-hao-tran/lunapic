import React from 'react';

import Image from 'next/image';

import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { OurStorySection } from '@/components/OurStorySection';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';
import { TeamCardGallery } from '@/components/TeamCardGallery';
import { loadPageConfig, loadPageTeam } from '@/lib/dataLoader';

const AboutPage = async () => {
    const config = await loadPageConfig('about');
    const teamMembers = await loadPageTeam('about');

    return (
        <>
            <main className='overflow-x-hidden'>
            <HeroSection backgroundMedia={config.hero.backgroundMedia} mediaType={config.hero.mediaType}>
                {/* About Us Heading with StarFrame */}
                <StarFrame haveBorder={false} starSize={40} direction={['tl', 'br']} color='white'>
                    <h1
                        style={{
                            color: '#FFF',
                            fontFamily: 'SVN-GilroyBold, sans-serif',
                            fontSize: '3rem',
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                            letterSpacing: '-0.015rem'
                        }}>
                        ABOUT US
                    </h1>
                </StarFrame>
            </HeroSection>

            {/* Our Story Section */}
            <Section title='OUR STORY' number='1' bgColor='#040404' headerColor='#fdfdfd' headerSeparator={false}>
                <OurStorySection content={config.ourStory.contentText || ''} />
            </Section>

            {/* Our Mission Section */}
            <Section id='our-mission' title='OUR MISSION' number='2' bgColor='#040404' headerColor='#fdfdfd'>
                <div
                    className='relative overflow-hidden w-screen aspect-[4/3] md:aspect-[1440/603]'
                    style={{
                        marginLeft: 'calc(-50vw + 50%)',
                        flexShrink: 0
                    }}>
                    {/* Banner Image */}
                    <Image
                        src={config.ourMission.bannerImage}
                        alt='Our Mission'
                        fill
                        className='object-cover'
                        style={{ filter: 'grayscale(100%)' }}
                    />
                    {/* Black Overlay */}
                    <div className='absolute inset-0 bg-black opacity-40' />
                    {/* Text Overlay - Bottom center on mobile, center right on desktop */}
                    <div className='absolute bottom-8 left-0 right-0 px-6 md:inset-y-0 md:left-auto md:flex md:items-center md:pr-16 lg:pr-24'>
                        <p
                            className='w-full text-center md:w-[54.25rem] md:text-right'
                            style={{
                                color: '#FFF',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '1.5rem',
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: '1.4',
                                letterSpacing: '-0.075rem'
                            }}>
                            <span className='md:hidden'>
                                {config.ourMission.statement}
                            </span>
                            <span
                                className='hidden md:inline'
                                style={{
                                    fontSize: '2.25rem',
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.1125rem'
                                }}>
                                {config.ourMission.statement}
                            </span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* Team Section */}
            <Section title='TEAM' number='3' bgColor='#040404' headerColor='#fdfdfd'>
                <TeamCardGallery teamMembers={teamMembers} />
            </Section>

            {/* Contact Us Section */}
            <Section title='CONTACT US' number='4' bgColor='#040404' headerColor='#fdfdfd'>
                <ContactSection bgColor='black' />
            </Section>
            </main>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default AboutPage;
