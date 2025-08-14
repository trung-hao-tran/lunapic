import HeaderSection from '@/components/HeaderSection';
import Footer from '@/components/Footer';

const AboutPage = () => {
    return (
        <div>
            {/* Header Section */}
            <HeaderSection title='About Us' />

            {/* About Content */}
            <section className='bg-[#020202] py-16'>
                <div className='mx-auto w-[65vw] text-left'>
                    <div className='space-y-6'>
                        <p className='text-[1.75rem] leading-[1.5] text-[#F9F9F9]'>
                            We are a passionate team of filmmakers, animators, and creative professionals dedicated to
                            crafting compelling visual stories.
                        </p>
                        <p className='text-[1.75rem] leading-[1.5] text-[#F9F9F9]'>
                            With years of experience in video production and animation, we specialize in bringing unique
                            visions to life through innovative techniques and cutting-edge technology.
                        </p>
                        <p className='text-[1.75rem] leading-[1.5] text-[#F9F9F9]'>
                            From concept to final delivery, we work closely with our clients to ensure every project
                            exceeds expectations and resonates with audiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AboutPage;
