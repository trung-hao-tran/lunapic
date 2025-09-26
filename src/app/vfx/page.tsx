import AnimatedBanner from '@/components/AnimatedBanner';
import CustomVideoPlayer from '@/components/CustomVideoPlayer';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import StackedCardTestimonials from '@/components/StackedCardTestimonials';
import TeamMember from '@/components/TeamMember';
import { getTeamMembersByCategory } from '@/lib/content';

const VFXPage = async () => {
    const vfxTeamMembers = await getTeamMembersByCategory('vfx');
    console.log('VFX Team Members:', vfxTeamMembers);

    return (
        <div>
            {/* Header Section */}
            <HeaderSection title='VFX Team' />

            {/* Showreel Section - Black */}
            <section className='bg-[#020202] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>
                    <div className='mb-12 text-center'>
                        <h2 className='text-3xl font-bold text-[#F9F9F9] sm:text-4xl lg:text-5xl'>VFX Showreel</h2>
                        <p className='mt-4 text-lg text-[#F9F9F9]'>See our latest visual effects work in action</p>
                    </div>
                    <div className='relative aspect-video overflow-hidden rounded-lg'>
                        <CustomVideoPlayer
                            src={[
                                {
                                    label: 'HD',
                                    src: '/videos/vfx-showreel.mp4',
                                    resolution: '1080p'
                                },
                                {
                                    label: 'Standard',
                                    src: '/videos/vfx-showreel-720p.mp4',
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

            {/* Team Members Section - White */}
            <section className='bg-[#F9F9F9] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>
                    <div className='mb-12 text-center'>
                        <h2 className='text-3xl font-bold text-[#020202] sm:text-4xl lg:text-5xl'>Our VFX Team</h2>
                        <p className='mt-4 text-lg text-[#333136]'>Meet the talented artists behind the magic</p>
                    </div>
                    <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {vfxTeamMembers.map((member) => (
                            <TeamMember
                                key={member.slug}
                                name={member.name}
                                role={member.role}
                                image="/images/placeholder.png"
                                bio={member.bio}
                                href={`/about/${member.slug}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Black */}
            <AnimatedBanner />

            {/* Testimonial Section - White */}
            <StackedCardTestimonials />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default VFXPage;
