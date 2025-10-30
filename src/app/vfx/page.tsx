import React from 'react';

import { Accordion } from '@/components/Accordion';
import { AnimatedDiagonalLine } from '@/components/AnimatedDiagonalLine';
import { ContactSection } from '@/components/ContactSection';
import { FeaturePortfolioGallery } from '@/components/FeaturePortfolioGallery';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';
import { TeamCardGallery } from '@/components/TeamCardGallery';
import { parseMarkdownContent } from '@/lib/contentHelpers';
import { loadFAQ, loadPageConfig, loadPagePortfolio, loadPageTeam } from '@/lib/dataLoader';

const VFXPage = async () => {
    // Load data from content files
    const config = await loadPageConfig('vfx');
    const portfolioItems = await loadPagePortfolio('vfx');
    const teamMembers = await loadPageTeam('vfx');
    const faqItems = await loadFAQ('vfx');

    // Parse markdown content
    const whyChooseUsContent = parseMarkdownContent(config.whyChooseUs.contentText || '');

    return (
        <>
            <main>
                <HeroSection backgroundMedia={config.hero.backgroundMedia} mediaType={config.hero.mediaType}>
                    {/* VFX Heading with StarFrame */}
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
                            VFX PRODUCTION
                        </h1>
                    </StarFrame>
                </HeroSection>

                {/* Why Choosing Us Section */}
                <Section title='' bgColor='#040404' headerColor='#fdfdfd' hasHeader={false}>
                    <div className='relative md:p-20'>
                        {/* Animated Diagonal Line */}
                        <AnimatedDiagonalLine />

                        <div className='grid grid-cols-1 gap-8 md:grid-cols-[60%_40%]'>
                            {/* Left Column - 60% */}
                            <div>
                                {/* Render parsed markdown content */}
                                <div>{whyChooseUsContent}</div>
                            </div>

                            {/* Right Column - 40% */}
                            <div>{/* Reserved for future content */}</div>
                        </div>
                        <div className='pt-40 pb-15'>
                            <Accordion items={faqItems} />
                        </div>
                    </div>
                </Section>

                {/* Show Reel Section */}
                <Section title='SHOW REEL' number='2' bgColor='#040404' headerColor='#fdfdfd'>
                    <FeaturePortfolioGallery items={portfolioItems} />
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

            <Footer />
        </>
    );
};

export default VFXPage;
