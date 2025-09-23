import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllProjectSlugs, getProject } from '@/lib/content';

import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllProjectSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        return {
            title: 'Project Not Found'
        };
    }

    return {
        title: `${project.title} - ${project.category}`,
        description: project.content
            ? project.content.replace(/<[^>]*>/g, '').slice(0, 160)
            : `A ${project.category.toLowerCase()} project${project.client ? ` for ${project.client}` : ''}`,
        openGraph: {
            title: `${project.title} - ${project.category}`,
            description: project.content
                ? project.content.replace(/<[^>]*>/g, '').slice(0, 160)
                : `A ${project.category.toLowerCase()} project${project.client ? ` for ${project.client}` : ''}`,
            images: project.image ? [{ url: project.image }] : undefined
        }
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    const formattedDate = new Date(project.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <HeaderSection title={project.title} imgSrc={project.image} />

            <section className='bg-[#020202] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>
                    <div className='mb-8'>
                        <Link href='/projects'>
                            <Button variant='ghost' className='p-0 text-[#F9F9F9] hover:text-[#BDBDBD]'>
                                <ArrowLeft className='mr-2 h-4 w-4' />
                                Back to Projects
                            </Button>
                        </Link>
                    </div>

                    {/* Project Meta Information */}
                    <div className='mb-12 grid gap-8 md:grid-cols-2'>
                        <div className='space-y-4'>
                            <div className='flex items-center space-x-2 text-[#BDBDBD]'>
                                <Calendar className='h-4 w-4' />
                                <span>{formattedDate}</span>
                            </div>

                            {project.duration && (
                                <div className='flex items-center space-x-2 text-[#BDBDBD]'>
                                    <Clock className='h-4 w-4' />
                                    <span>{project.duration}</span>
                                </div>
                            )}

                            {project.client && (
                                <div className='flex items-center space-x-2 text-[#BDBDBD]'>
                                    <User className='h-4 w-4' />
                                    <span>{project.client}</span>
                                </div>
                            )}

                            <div>
                                <Badge variant='secondary' className='bg-[#333136] text-[#F9F9F9]'>
                                    {project.category}
                                </Badge>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            {/* Tags */}
                            <div>
                                <h3 className='mb-2 font-semibold text-[#F9F9F9]'>Tags</h3>
                                <div className='flex flex-wrap gap-2'>
                                    {project.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant='outline'
                                            className='border-[#BDBDBD] text-[#BDBDBD] capitalize'>
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Services */}
                            {project.services && project.services.length > 0 && (
                                <div>
                                    <h3 className='mb-2 font-semibold text-[#F9F9F9]'>Services</h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {project.services.map((service) => (
                                            <Badge
                                                key={service}
                                                variant='secondary'
                                                className='bg-[#101B39] text-[#F9F9F9]'>
                                                {service}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Project Content */}
                    {project.content && (
                        <div className='mb-12'>
                            <div
                                className='prose prose-invert prose-lg max-w-none'
                                dangerouslySetInnerHTML={{ __html: project.content }}
                                style={
                                    {
                                        '--tw-prose-body': '#BDBDBD',
                                        '--tw-prose-headings': '#F9F9F9',
                                        '--tw-prose-links': '#F9F9F9',
                                        '--tw-prose-bold': '#F9F9F9',
                                        '--tw-prose-counters': '#BDBDBD',
                                        '--tw-prose-bullets': '#BDBDBD',
                                        '--tw-prose-hr': '#333136',
                                        '--tw-prose-quotes': '#BDBDBD',
                                        '--tw-prose-quote-borders': '#333136',
                                        '--tw-prose-captions': '#BDBDBD',
                                        '--tw-prose-code': '#F9F9F9',
                                        '--tw-prose-pre-code': '#F9F9F9',
                                        '--tw-prose-pre-bg': '#333136',
                                        '--tw-prose-th-borders': '#333136',
                                        '--tw-prose-td-borders': '#333136'
                                    } as React.CSSProperties
                                }
                            />
                        </div>
                    )}

                    {/* Project Gallery */}
                    {project.gallery && project.gallery.length > 0 && (
                        <div>
                            <h2 className='mb-8 text-2xl font-bold text-[#F9F9F9]'>Project Gallery</h2>
                            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                                {project.gallery.map((imagePath, index) => (
                                    <div key={index} className='relative aspect-video overflow-hidden rounded-lg'>
                                        <Image
                                            src={imagePath}
                                            alt={`${project.title} - Image ${index + 1}`}
                                            fill
                                            className='object-cover transition-transform duration-300 hover:scale-105'
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
