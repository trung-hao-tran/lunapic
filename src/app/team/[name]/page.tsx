import React from 'react';

import Image from 'next/image';

import { BoxButton } from '@/components/BoxButton';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';
import { parseMarkdownContent } from '@/lib/contentHelpers';
import { teamBioMarkdownStyle } from '@/lib/markdownStyles';
import { loadTeamMember, getAllTeamMemberIds, loadPagePortfolio } from '@/lib/dataLoader';

// Generate static params for all team members
export async function generateStaticParams() {
    const memberIds = await getAllTeamMemberIds();

    return memberIds.map((id) => ({
        name: id
    }));
}

const TeamMemberPage = async ({ params }: { params: Promise<{ name: string }> }) => {
    const { name } = await params;

    // Load team member data from content folder
    const member = await loadTeamMember(name);

    // Load portfolio items for the "Work by" section
    const portfolioItems = await loadPagePortfolio('homepage');

    if (!member) {
        return (
            <main className='flex min-h-screen items-center justify-center bg-black'>
                <div className='text-center'>
                    <h1 className='mb-4 text-4xl font-bold text-white'>Team Member Not Found</h1>
                    <a href='/about' className='mt-4 inline-block text-white underline'>
                        Back to Team
                    </a>
                </div>
            </main>
        );
    }

    // Use fullBio from loaded data, or fallback to description
    const fullBioContent = member.fullBio || member.description;

    return (
        <>
            <Navigation />
            <main className='pt-24'>
                <Section title='' number='' bgColor='#040404' headerColor='#fdfdfd' hasHeader={false}>
                    <div className='flex flex-col gap-8 lg:flex-row'>
                        {/* Left Column - 60% - Image with StarFrame + Contact Info */}
                        <div className='flex flex-col items-center gap-8 lg:w-[60%]'>
                            {/* Profile Image with StarFrame */}
                            <StarFrame
                                haveBorder={true}
                                starSize={20}
                                direction={['tl', 'tr', 'bl', 'br']}
                                color='white'
                                className='w-full max-w-md p-5'>
                                <div className='relative aspect-[3/4] w-full overflow-hidden'>
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className='object-cover object-left'
                                    />
                                </div>
                            </StarFrame>

                            {/* Contact Information */}
                            <div className='space-y-2 text-white'>
                                {member.email && (
                                    <p className='font-mono text-sm uppercase'>
                                        EMAIL ADDRESS:{' '}
                                        <a href={`mailto:${member.email}`} className='underline'>
                                            {member.email}
                                        </a>
                                    </p>
                                )}
                                {member.phone && <p className='font-mono text-sm uppercase'>PHONE: {member.phone}</p>}
                            </div>
                        </div>

                        {/* Right Column - 40% - Name, Role, Bio, Button */}
                        <div className='flex flex-col gap-6 lg:w-[40%]'>
                            {/* Name */}
                            <h1
                                className='uppercase'
                                style={{
                                    color: '#FFF',
                                    fontFamily: 'Inter, monospace',
                                    fontSize: '2.25rem',
                                    fontStyle: 'normal',
                                    fontWeight: 600,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.01125rem',
                                    textTransform: 'uppercase'
                                }}>
                                {member.name}
                            </h1>

                            {/* Role */}
                            <p
                                style={{
                                    color: '#FFF',
                                    fontFamily: 'Inter, monospace',
                                    fontSize: '1rem',
                                    fontStyle: 'normal',
                                    fontWeight: 300,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.005rem'
                                }}>
                                {member.role}
                            </p>

                            {/* Full Bio */}
                            <div className='space-y-4'>
                                {parseMarkdownContent(fullBioContent, teamBioMarkdownStyle)}
                            </div>

                            {/* Get In Touch Button */}
                            <div className='mt-4'>
                                <BoxButton text='GET IN TOUCH' href={member.contactLink || '/contact'} />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Section 2: Work by Team Member */}
                <Section title={`WORK BY ${member.name}`} number='02' bgColor='#040404' headerColor='#fdfdfd'>
                    {/* For now, show all portfolio items - will filter by team member in the future */}
                    <PortfolioGallery items={portfolioItems} />
                </Section>
            </main>

            <Footer />
        </>
    );
};

export default TeamMemberPage;
