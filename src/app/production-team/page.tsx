import React from 'react';

import AnimatedBanner from '@/components/AnimatedBanner';
import CardCarousel from '@/components/CardCarousel';
import type { CardItem } from '@/components/CardCarousel';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import TeamMember from '@/components/TeamMember';

const productionTeamMembers = [
    {
        name: 'Alex Johnson',
        role: 'Lead Producer',
        image: '/images/team/alex-johnson.jpg',
        bio: 'Award-winning producer with 10+ years in film production'
    },
    {
        name: 'Sarah Chen',
        role: 'Director of Photography',
        image: '/images/team/sarah-chen.jpg',
        bio: 'Cinematographer specialized in commercial and narrative work'
    }
];

const filmographyItems: CardItem[] = [
    {
        id: 1,
        url: '/images/projects/project-1.jpg',
        category: 'Commercial',
        title: 'Brand Campaign 2024',
        description: 'A comprehensive brand campaign showcasing our commercial video expertise.'
    },
    {
        id: 2,
        url: '/images/projects/project-2.jpg',
        category: 'Documentary',
        title: 'Corporate Story',
        description: 'Behind-the-scenes documentary production for a major corporation.'
    },
    {
        id: 3,
        url: '/images/projects/project-3.jpg',
        category: 'Animation',
        title: '3D Product Visualization',
        description: 'High-end 3D animation and VFX for product demonstration.'
    },
    {
        id: 4,
        url: '/images/projects/project-4.jpg',
        category: 'Event',
        title: 'Conference Coverage',
        description: 'Multi-camera event videography and live streaming setup.'
    },
    {
        id: 5,
        url: '/images/projects/project-5.jpg',
        category: 'Music Video',
        title: 'Artist Collaboration',
        description: 'Creative music video production with advanced VFX work.'
    }
];

const ProductionTeamPage = () => {
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

                    <div className='grid grid-cols-1 gap-6 md:grid-cols-5'>
                        {productionTeamMembers.map((member, index) => (
                            <TeamMember
                                key={index}
                                name={member.name}
                                role={member.role}
                                image={member.image}
                                bio={member.bio}
                                className='bg-[#333136]'
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
