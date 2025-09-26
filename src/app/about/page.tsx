import AnimatedBanner from '@/components/AnimatedBanner';
import CustomVideoPlayer from '@/components/CustomVideoPlayer';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import TeamMember from '@/components/TeamMember';
import { getFeaturedTeamMembers } from '@/lib/content';

const AboutPage = async () => {
    const featuredTeamMembers = await getFeaturedTeamMembers();

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
                        <h2 className='text-3xl font-bold text-[#F9F9F9] sm:text-4xl lg:text-5xl'>Meet Our Team</h2>
                        <p className='mt-4 text-lg text-[#F9F9F9]'>
                            The creative minds behind every exceptional project
                        </p>
                    </div>
                    <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {featuredTeamMembers.map((member) => (
                            <TeamMember
                                key={member.slug}
                                name={member.name}
                                role={member.role}
                                image='/images/placeholder.png'
                                bio={member.bio}
                                href={`/about/${member.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className='bg-[#F9F9F9] py-16'>
                <div className='mx-auto w-[90vw] text-left md:w-[65vw]'>
                    <h2 className='mb-8 text-3xl font-bold text-[#020202] sm:text-4xl lg:text-5xl'>Our Mission</h2>
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
                <div className='mx-auto w-[90vw] text-left md:w-[65vw]'>
                    <h2 className='mb-8 text-3xl font-bold text-[#020202] sm:text-4xl lg:text-5xl'>
                        How Is It Possible
                    </h2>
                    <div className='space-y-6'>
                        <p className='text-[1.75rem] leading-[1.5] text-[#333136]'>
                            Through years of experience and continuous innovation, we&#39;ve developed a streamlined
                            process that combines creative vision with cutting-edge technology and industry best
                            practices.
                        </p>
                        <p className='text-[1.75rem] leading-[1.5] text-[#333136]'>
                            Our team leverages state-of-the-art equipment, advanced post-production techniques, and
                            collaborative workflows to deliver exceptional results within timeline and budget
                            constraints.
                        </p>
                        <p className='text-[1.75rem] leading-[1.5] text-[#333136]'>
                            By maintaining strong partnerships with industry leaders and staying ahead of emerging
                            trends, we ensure our clients receive innovative solutions that set them apart in their
                            markets.
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
