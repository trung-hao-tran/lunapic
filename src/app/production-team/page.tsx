import React from 'react';

import AnimatedBanner from '@/components/AnimatedBanner';
import CardCarousel from '@/components/CardCarousel';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import TeamMemberProfile from '@/components/TeamMemberProfile';
import { getTeamMembersByCategory, getFeaturedProjects } from '@/lib/content';

const ProductionTeamPage = async () => {
    const productionTeamMembers = await getTeamMembersByCategory('production');
    const featuredProjects = await getFeaturedProjects();

    // Convert projects to CardCarousel format
    const filmographyItems = featuredProjects.map(project => ({
        title: project.title,
        description: project.content
            ? project.content.replace(/<[^>]*>/g, '').slice(0, 100) + '...'
            : `A ${project.category.toLowerCase()} project${project.client ? ` for ${project.client}` : ''}`,
        image: project.image,
        href: `/projects/${project.slug}`,
        category: project.category,
        tags: project.tags
    }));

    return (
        <div className='min-h-screen bg-[#020202]'>
            <HeaderSection title='Production Team' imgSrc='/images/production-team-hero.jpg' />

            <section className='bg-[#020202] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>
                    <div className='mb-12 text-center'>
                        <h2 className='text-3xl font-bold text-[#F9F9F9] sm:text-4xl lg:text-5xl'>
                            Meet Our Production Team
                        </h2>
                        <p className='mt-4 text-lg text-[#BDBDBD]'>
                            The creative minds behind our exceptional video production
                        </p>
                    </div>

                    <div className='space-y-16'>
                        {productionTeamMembers.map((member, index) => (
                            <TeamMemberProfile
                                key={member.slug}
                                member={member}
                                className={index < productionTeamMembers.length - 1 ? 'border-b border-[#333136]' : ''}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <CardCarousel
                items={filmographyItems}
                title='Our Filmography'
                subtitle='Projects that showcase our production expertise'
            />

            <AnimatedBanner />

            <Footer />
        </div>
    );
};

export default ProductionTeamPage;
