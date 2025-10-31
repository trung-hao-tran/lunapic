import React from 'react';

import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';
import { loadPageConfig, loadWorkCategories, loadWorkPortfolio } from '@/lib/dataLoader';

import WorkPageClient from './WorkPageClient';

const WorkPage = async () => {
    // Load data server-side
    const config = await loadPageConfig('work');
    const categoryFilters = await loadWorkCategories();
    const { vfxItems, productionItems } = await loadWorkPortfolio();

    return (
        <>
            <main>
                <HeroSection>
                    {/* Our Project Heading with StarFrame */}
                    <StarFrame haveBorder={false} starSize={40} direction={['tl', 'br']} color='white'>
                        <div style={{ display: 'inline-block', lineHeight: 0 }}>
                            <h1
                                style={{
                                    color: '#FFF',
                                    fontFamily: 'SVN-GilroyBold, sans-serif',
                                    fontSize: '3rem',
                                    fontStyle: 'normal',
                                    fontWeight: 700,
                                    lineHeight: 1,
                                    letterSpacing: '-0.015rem',
                                    margin: 0
                                }}>
                                OUR PROJECTS
                            </h1>
                        </div>
                    </StarFrame>
                </HeroSection>

                {/* Client-side interactive filter section */}
                <WorkPageClient
                    categoryFilters={categoryFilters}
                    vfxItems={vfxItems}
                    productionItems={productionItems}
                    config={config}
                />

                {/* Contact Us Section */}
                <Section title='CONTACT US' number='3' bgColor='#040404' headerColor='#fdfdfd' data-section='contact'>
                    <ContactSection bgColor='black' />
                </Section>
            </main>

            <Footer />
        </>
    );
};

export default WorkPage;
