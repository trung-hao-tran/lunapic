import { Metadata } from 'next';

import CardCarousel from '@/components/CardCarousel';
import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import { Badge } from '@/components/ui/badge';
import { getAllProjectTags, getAllProjects } from '@/lib/content';
import { PROJECT_CATEGORIES } from '@/types/content';

export const metadata: Metadata = {
    title: 'Our Projects',
    description:
        'Explore our portfolio of creative projects spanning commercials, brand films, animations, and visual effects.'
};

export default async function ProjectsPage() {
    const projects = await getAllProjects();
    const allTags = await getAllProjectTags();

    // Convert projects to CardCarousel format
    const carouselItems = projects.map((project) => ({
        title: project.title,
        description: project.content
            ? project.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...'
            : `A ${project.category.toLowerCase()} project${project.client ? ` for ${project.client}` : ''}`,
        image: project.image,
        href: `/projects/${project.slug}`,
        category: project.category,
        tags: project.tags
    }));

    const featuredProjects = carouselItems.filter((_, index) => projects[index].featured);

    return (
        <>
            <HeaderSection title='Our Projects' />

            <section className='bg-[#020202] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>
                    <div className='mb-12 text-center'>
                        <p className='mx-auto max-w-3xl text-lg leading-relaxed text-[#BDBDBD]'>
                            Explore our portfolio of creative projects spanning commercials, brand films, animations,
                            and visual effects. Each project represents our commitment to storytelling excellence and
                            technical innovation.
                        </p>
                    </div>

                    {/* Project Categories */}
                    <div className='mb-12'>
                        <h2 className='mb-6 text-2xl font-bold text-[#F9F9F9]'>Categories</h2>
                        <div className='flex flex-wrap gap-3'>
                            {PROJECT_CATEGORIES.map((category) => {
                                const projectsInCategory = projects.filter((project) => project.category === category);

                                if (projectsInCategory.length === 0) return null;

                                return (
                                    <Badge
                                        key={category}
                                        variant='secondary'
                                        className='bg-[#333136] px-3 py-1 text-sm text-[#F9F9F9]'>
                                        {category} ({projectsInCategory.length})
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>

                    {/* Popular Tags */}
                    <div className='mb-12'>
                        <h2 className='mb-6 text-2xl font-bold text-[#F9F9F9]'>Popular Tags</h2>
                        <div className='flex flex-wrap gap-2'>
                            {allTags.slice(0, 10).map((tag) => (
                                <Badge
                                    key={tag}
                                    variant='outline'
                                    className='border-[#BDBDBD] text-[#BDBDBD] capitalize'>
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Featured Projects */}
                    {featuredProjects.length > 0 && (
                        <div className='mb-16'>
                            <h2 className='mb-8 text-2xl font-bold text-[#F9F9F9]'>Featured Projects</h2>
                            <CardCarousel items={featuredProjects} />
                        </div>
                    )}

                    {/* All Projects by Category */}
                    {PROJECT_CATEGORIES.map((category) => {
                        const projectsInCategory = projects.filter((project) => project.category === category);

                        if (projectsInCategory.length === 0) return null;

                        const categoryItems = projectsInCategory.map((project) => ({
                            title: project.title,
                            description: project.content
                                ? project.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...'
                                : `A ${project.category.toLowerCase()} project${project.client ? ` for ${project.client}` : ''}`,
                            image: project.image,
                            href: `/projects/${project.slug}`,
                            category: project.category,
                            tags: project.tags
                        }));

                        return (
                            <div key={category} className='mb-16'>
                                <h2 className='mb-8 text-2xl font-bold text-[#F9F9F9]'>{category} Projects</h2>
                                <CardCarousel items={categoryItems} />
                            </div>
                        );
                    })}

                    {/* All Projects */}
                    <div className='mb-16'>
                        <h2 className='mb-8 text-2xl font-bold text-[#F9F9F9]'>All Projects</h2>
                        <CardCarousel items={carouselItems} />
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
