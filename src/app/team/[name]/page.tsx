'use client';

import React from 'react';

import Image from 'next/image';

import { BoxButton } from '@/components/BoxButton';
import { Footer } from '@/components/Footer';
import { Navigation } from '@/components/Navigation';
import { PortfolioGallery } from '@/components/PortfolioGallery';
import { Section } from '@/components/Section';
import { StarFrame } from '@/components/StarFrame';
import { portfolioItems, teamMembers } from '@/data/dummyData';

const TeamMemberPage = ({ params }: { params: { name: string } }) => {
    // Find team member by name (convert URL format to name format)
    // e.g., "minh-nguyen" -> "MINH NGUYEN"
    const formattedName = params.name
        .split('-')
        .map((word) => word.toUpperCase())
        .join(' ');

    const member = teamMembers.find((m) => m.name === formattedName);

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

    // Mock fullBio data - will be loaded from .md file in the future
    const fullBioContent = `Venenatis sollicitudin posuere elit consequat et enim neque tortor amet dictum tempor. Leo facilisis aliquet viverra scelerisque eleifend viverra est. At massa erat vel amet enim laoreet dictum pellentesque. Urna cursus quam pulvinar tellus duis fermentum nibh volutpat.

Venenatis sollicitudin posuere elit consequat et enim neque tortor amet dictum tempor. Leo facilisis aliquet viverra scelerisque eleifend viverra est. At massa erat vel amet enim laoreet dictum pellentesque. Urna cursus quam pulvinar tellus duis fermentum nibh volutpat sed.

• Morbi feugiat molestie magna sed dictum praesent pharetra turpis.
• Cras mi ligula, mollis vitae duis sit amet, tincidunt fringilla lorem.
• Non mattis urna ex nec sem sodales varius diam et suscipit venenatis.

Quis faucibus massa et egestas at fermentum est ac pulvinar est sagittis sed sit ut quis faucibus eleifend nibh vestibulum enim mi id sollicitudin ultrices et enim felis molestie sodales semper maecenas nunc auctor nunc molestie purus urna arcu dolor euismod porttitor et magna adipiscing dictum et adipiscing mollis.`;

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
                            <div
                                className='space-y-4'
                                style={{
                                    color: '#FFF',
                                    fontFamily: 'Inter, monospace',
                                    fontSize: '0.875rem',
                                    fontStyle: 'normal',
                                    fontWeight: 400,
                                    lineHeight: 'normal',
                                    letterSpacing: '-0.00438rem'
                                }}>
                                {fullBioContent.split('\n\n').map((paragraph, index) => {
                                    // Check if paragraph contains bullet points
                                    if (paragraph.includes('•')) {
                                        const bulletPoints = paragraph.split('\n').filter((line) => line.trim());

                                        return (
                                            <ul key={index} className='list-disc space-y-2 pl-5'>
                                                {bulletPoints.map((point, i) => (
                                                    <li key={i}>{point.replace('•', '').trim()}</li>
                                                ))}
                                            </ul>
                                        );
                                    }

                                    return <p key={index}>{paragraph}</p>;
                                })}
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
