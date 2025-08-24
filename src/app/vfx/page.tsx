import HeaderSection from '@/components/HeaderSection';
import Footer from '@/components/Footer';
import CustomVideoPlayer from '@/components/CustomVideoPlayer';
import AnimatedBanner from '@/components/AnimatedBanner';
import StackedCardTestimonials from '@/components/StackedCardTestimonials';
import TeamMember, { TeamMemberProps } from '@/components/TeamMember';

// VFX Team member data
const vfxTeamMembers: TeamMemberProps[] = [
    {
        name: 'Marcus Thompson',
        role: 'VFX Supervisor',
        bio: 'Lead VFX supervisor with 15+ years experience in feature films and commercials. Specializes in complex compositing, CG integration, and team leadership on high-budget productions.',
        image: '/images/vfx/marcus.jpg'
    },
    {
        name: 'Elena Rodriguez',
        role: 'Senior Compositor',
        bio: 'Expert in Nuke and After Effects with extensive experience in photorealistic compositing, color grading, and digital matte painting for blockbuster films.',
        image: '/images/vfx/elena.jpg'
    },
    {
        name: 'James Park',
        role: '3D Artist',
        bio: 'Specialized in Maya, Houdini, and Blender for creating stunning 3D environments, character modeling, and procedural effects for film and television.',
        image: '/images/vfx/james.jpg'
    },
    {
        name: 'Sofia Chen',
        role: 'Motion Graphics Designer',
        bio: 'Creative motion graphics specialist focusing on title sequences, UI animations, and dynamic visual storytelling using Cinema 4D and After Effects.',
        image: '/images/vfx/sofia.jpg'
    },
    {
        name: 'David Kumar',
        role: 'Technical Director',
        bio: 'Pipeline technical director responsible for workflow optimization, tool development, and ensuring seamless integration between departments.',
        image: '/images/vfx/david.jpg'
    }
];

const VFXPage = () => {
    return (
        <div>
            {/* Header Section */}
            <HeaderSection title='VFX Team' />

            {/* Showreel Section - Black */}
            <section className='bg-[#020202] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>
                    <div className='mb-12 text-center'>
                        <h2 className='text-3xl font-bold text-[#F9F9F9] sm:text-4xl lg:text-5xl'>
                            VFX Showreel
                        </h2>
                        <p className='mt-4 text-lg text-[#F9F9F9]'>
                            See our latest visual effects work in action
                        </p>
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
                        <h2 className='text-3xl font-bold text-[#020202] sm:text-4xl lg:text-5xl'>
                            Our VFX Team
                        </h2>
                        <p className='mt-4 text-lg text-[#333136]'>
                            Meet the talented artists behind the magic
                        </p>
                    </div>
                    <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                        {vfxTeamMembers.map((member, index) => (
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