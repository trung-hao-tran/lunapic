import Navigation from '@/components/Navigation';
import Section from '@/components/Section';
import IntroAnimation from '@/components/IntroAnimation';
import Link from 'next/link';

const Page = () => {
    return (
        <IntroAnimation>
            <Navigation />
            
            {/* Hero Section with Video Overlay - 80% viewport */}
            <Section id="hero" background="black" height="80vh" padding={false} className="relative overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 w-full h-full">
                    <video 
                        className="w-full h-full object-cover"
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                    >
                        <source src="/hero-video.mp4" type="video/mp4" />
                        {/* Fallback for browsers that don't support video */}
                        <div className="w-full h-full bg-black"></div>
                    </video>
                    {/* Video overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                
                {/* Content overlay */}
                <div className="relative z-10 text-center space-y-8 text-white px-4">
                    <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tight">
                        LUNA PICTURES
                    </h1>
                    <p className="text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto opacity-90">
                        Crafting cinematic experiences that captivate and inspire
                    </p>
                </div>
            </Section>

            {/* About Us Transition Section - starts at 20% of hero, extends down */}
            <Section id="about-transition" background="dark-gray" height="screen" className="relative -mt-20">
                <div className="pt-32 text-center space-y-12">
                    <div className="space-y-8">
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white">
                            Who We Are
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Luna Pictures is a creative powerhouse specializing in visual effects, 
                            post-production, and cinematic storytelling. We transform imagination into 
                            reality, creating unforgettable visual experiences for films, commercials, 
                            and digital content.
                        </p>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Our team of visionary artists and technical experts push the boundaries 
                            of what's possible, delivering stunning visuals that elevate every project 
                            to new heights.
                        </p>
                    </div>
                    
                    <div className="pt-8">
                        <Link 
                            href="/about"
                            className="inline-block bg-white text-black px-8 py-4 rounded-md text-lg font-semibold min-h-[44px] min-w-[160px] transition-all hover:bg-gray-100 focus:ring-2 focus:ring-white focus:outline-none"
                        >
                            Learn More About Us
                        </Link>
                    </div>
                </div>
            </Section>

            {/* Show Reel Section */}
            <Section id="showreel" background="black" height="screen" padding={false} className="relative">
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="text-center mb-8 px-4">
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                            Our Work
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                            Experience the magic of our latest projects
                        </p>
                    </div>
                    
                    {/* Showreel Video */}
                    <div className="w-full max-w-6xl mx-auto px-4">
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                            <video 
                                className="w-full h-full object-cover"
                                controls
                                poster="/showreel-poster.jpg"
                            >
                                <source src="/showreel.mp4" type="video/mp4" />
                                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                                    <span>Showreel Video Placeholder</span>
                                </div>
                            </video>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Action Banner Section */}
            <Section id="achievements" background="dark-gray" height="screen">
                <div className="text-center space-y-12">
                    <h2 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                        Luna Pictures has helped create
                        <span className="block text-4xl sm:text-6xl lg:text-8xl text-blue-400 mt-4">
                            500+ Amazing Projects
                        </span>
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 max-w-4xl mx-auto">
                        <div className="text-center space-y-2">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">150+</div>
                            <div className="text-lg text-gray-300">Films & Commercials</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">200+</div>
                            <div className="text-lg text-gray-300">VFX Shots</div>
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">50+</div>
                            <div className="text-lg text-gray-300">Happy Clients</div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Testimonial Section */}
            <Section id="testimonials" background="black" height="screen">
                <div className="text-center space-y-12">
                    <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-16">
                        What Our Clients Say
                    </h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Testimonial 1 */}
                        <div className="bg-gray-900/50 p-8 rounded-lg space-y-6">
                            <p className="text-lg sm:text-xl text-gray-300 italic leading-relaxed">
                                "Luna Pictures transformed our vision into something extraordinary. 
                                Their attention to detail and creative expertise exceeded all our expectations. 
                                The final result was simply breathtaking."
                            </p>
                            <div className="space-y-2">
                                <div className="text-white font-semibold">Sarah Johnson</div>
                                <div className="text-gray-400">Director, Creative Studios</div>
                            </div>
                        </div>
                        
                        {/* Testimonial 2 */}
                        <div className="bg-gray-900/50 p-8 rounded-lg space-y-6">
                            <p className="text-lg sm:text-xl text-gray-300 italic leading-relaxed">
                                "Working with Luna Pictures was an absolute pleasure. Their team's 
                                professionalism and technical skills are unmatched. They delivered 
                                exactly what we envisioned, on time and within budget."
                            </p>
                            <div className="space-y-2">
                                <div className="text-white font-semibold">Michael Chen</div>
                                <div className="text-gray-400">Producer, Epic Films</div>
                            </div>
                        </div>
                        
                        {/* Testimonial 3 */}
                        <div className="bg-gray-900/50 p-8 rounded-lg space-y-6 lg:col-span-2 max-w-3xl mx-auto">
                            <p className="text-lg sm:text-xl text-gray-300 italic leading-relaxed">
                                "Luna Pictures doesn't just create visual effects – they create magic. 
                                Their innovative approach and cutting-edge techniques brought our 
                                impossible scenes to life. Highly recommended!"
                            </p>
                            <div className="space-y-2">
                                <div className="text-white font-semibold">Emma Rodriguez</div>
                                <div className="text-gray-400">Executive Producer, Visionary Media</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </IntroAnimation>
    );
};

export default Page;
