import HeaderSection from '@/components/HeaderSection';
import Footer from '@/components/Footer';
import CustomVideoPlayer from '@/components/CustomVideoPlayer';
import TeamMember, { TeamMemberProps } from '@/components/TeamMember';
import AnimatedBanner from '@/components/AnimatedBanner';

// Mock team data
const teamMembers: TeamMemberProps[] = [
    {
        name: 'Alex Chen',
        role: 'Creative Director',
        image: '/images/team/alex.jpg',
        bio: 'With over 10 years of experience in visual storytelling, Alex leads our creative vision and ensures every project delivers exceptional impact.'
    },
    {
        name: 'Maria Rodriguez',
        role: 'Lead Animator',
        image: '/images/team/maria.jpg',
        bio: 'Maria brings characters and concepts to life through her expertise in 2D and 3D animation, creating memorable visual experiences.'
    },
    {
        name: 'David Kim',
        role: 'Cinematographer',
        image: '/images/team/david.jpg',
        bio: 'David captures stunning visuals with his keen eye for composition and lighting, transforming every frame into cinematic art.'
    },
    {
        name: 'Sarah Johnson',
        role: 'Producer',
        image: '/images/team/sarah.jpg',
        bio: 'Sarah ensures smooth project execution from pre-production to delivery, coordinating teams and maintaining our high quality standards.'
    },
    {
        name: 'Marcus Thompson',
        role: 'VFX Supervisor',
        image: '/images/team/marcus.jpg',
        bio: 'Marcus specializes in cutting-edge visual effects and post-production, bringing impossible scenes to life with technical expertise and artistic vision.'
    }
];

const AboutPage = () => {
    return (
        <div>
            {/* Header Section */}
            <HeaderSection title='About Us' />

            {/* Hero Video Section */}
            <section className='bg-[#020202] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>
                    <div className='relative aspect-video overflow-hidden rounded-lg'>
                        <CustomVideoPlayer
                            src={[
                                {
                                    label: 'HD',
                                    src: '/videos/about-hero.mp4',
                                    resolution: '1080p'
                                },
                                {
                                    label: 'Standard',
                                    src: '/videos/about-hero-720p.mp4',
                                    resolution: '720p'
                                }
                            ]}
                            className='h-full w-full'
                            autoPlay={false}
                            muted={true}
                        />
                    </div>
                </div>
            </section>

            {/* Team Members Section */}
            <section className='bg-[#020202] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>
                    <div className='mb-12 text-center'>
                        <h2 className='text-3xl font-bold text-[#F9F9F9] sm:text-4xl lg:text-5xl'>
                            Meet Our Team
                        </h2>
                        <p className='mt-4 text-lg text-[#F9F9F9]'>
                            The creative minds behind every exceptional project
                        </p>
                    </div>
                    <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {teamMembers.map((member, index) => (
                            <TeamMember
                                key={index}
                                name={member.name}
                                role={member.role}
                                image={member.image}
                                bio={member.bio}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className='bg-[#F9F9F9] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw] text-left'>
                    <h2 className='mb-8 text-3xl font-bold text-[#020202] sm:text-4xl lg:text-5xl'>
                        Our Mission
                    </h2>
                    <div className='space-y-6'>
                        <p className='text-[1.75rem] leading-[1.5] text-[#333136]'>
                            We are a passionate team of filmmakers, animators, and creative professionals dedicated to
                            crafting compelling visual stories that resonate with audiences worldwide.
                        </p>
                        <p className='text-[1.75rem] leading-[1.5] text-[#333136]'>
                            Our mission is to transform ideas into powerful visual narratives that inspire, engage, and
                            leave lasting impressions. We believe every story deserves to be told with exceptional
                            creativity and technical excellence.
                        </p>
                        <p className='text-[1.75rem] leading-[1.5] text-[#333136]'>
                            From concept to final delivery, we work closely with our clients to ensure every project
                            exceeds expectations and achieves measurable impact in the digital landscape.
                        </p>
                    </div>
                </div>
            </section>

            {/* How Is It Possible Section */}
            <section className='bg-[#F9F9F9] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw] text-left'>
                    <h2 className='mb-8 text-3xl font-bold text-[#020202] sm:text-4xl lg:text-5xl'>
                        How Is It Possible
                    </h2>
                    <div className='space-y-6'>
                        <p className='text-[1.75rem] leading-[1.5] text-[#333136]'>
                            Through years of experience and continuous innovation, we've developed a streamlined process
                            that combines creative vision with cutting-edge technology and industry best practices.
                        </p>
                        <p className='text-[1.75rem] leading-[1.5] text-[#333136]'>
                            Our team leverages state-of-the-art equipment, advanced post-production techniques, and
                            collaborative workflows to deliver exceptional results within timeline and budget constraints.
                        </p>
                        <p className='text-[1.75rem] leading-[1.5] text-[#333136]'>
                            By maintaining strong partnerships with industry leaders and staying ahead of emerging trends,
                            we ensure our clients receive innovative solutions that set them apart in their markets.
                        </p>
                    </div>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <AnimatedBanner />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutPage;
