import { Metadata } from 'next';

import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import { TeamFilter } from '@/components/TeamFilter';
import TeamMember from '@/components/TeamMember';
import { getAllTeamMembers, getFeaturedTeamMembers } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Our Team',
    description: 'Meet the talented professionals behind our creative vision and technical excellence.'
};

export default async function TeamPage() {
    const teamMembers = await getAllTeamMembers();
    const featuredMembers = await getFeaturedTeamMembers();

    return (
        <>
            <HeaderSection title='Our Team' />

            <section className='bg-[#020202] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>
                    <div className='mb-12 text-center'>
                        <p className='mx-auto max-w-3xl text-lg leading-relaxed text-[#BDBDBD]'>
                            Meet the talented professionals behind our creative vision and technical excellence. Our
                            diverse team brings together years of experience in animation, video production, and visual
                            storytelling.
                        </p>
                    </div>

                    {/* Featured Team Members */}
                    {featuredMembers.length > 0 && (
                        <div className='mb-16'>
                            <h2 className='mb-8 text-2xl font-bold text-[#F9F9F9]'>Featured Members</h2>
                            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                                {featuredMembers.map((member) => (
                                    <TeamMember
                                        key={member.slug}
                                        name={member.name}
                                        role={member.role}
                                        bio={member.bio}
                                        image='/images/placeholder.png'
                                        href={`/team/${member.slug}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Team Filter Component */}
                    <TeamFilter teamMembers={teamMembers} />
                </div>
            </section>

            <Footer />
        </>
    );
}
