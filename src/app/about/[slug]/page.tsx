import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { getAllTeamMemberSlugs, getTeamMember } from '@/lib/content';

import { Globe, Instagram, Linkedin } from 'lucide-react';

interface TeamMemberPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllTeamMemberSlugs();
    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
    const { slug } = await params;
    const member = await getTeamMember(slug);

    if (!member) {
        return {
            title: 'Team Member Not Found'
        };
    }

    return {
        title: `${member.name} - ${member.role}`,
        description: member.bio,
        openGraph: {
            title: `${member.name} - ${member.role}`,
            description: member.bio,
            images: member.image ? [{ url: member.image }] : undefined
        }
    };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
    const { slug } = await params;
    const member = await getTeamMember(slug);

    if (!member) {
        notFound();
    }

    return (
        <div className='min-h-screen flex flex-col'>
            <Navigation />
            <section className='bg-[#020202] py-16 pt-32 flex-1'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>

                    <div className='grid items-start gap-12 md:grid-cols-2'>
                        {/* Left Column - Member Image and Social Links */}
                        <div className='space-y-6'>
                            <div className='relative aspect-square overflow-hidden rounded-lg'>
                                <Image src={member.image} alt={member.name} fill className='object-cover' priority />
                            </div>

                            {/* Social Links */}
                            {member.social && (
                                <div className='flex space-x-4'>
                                    {member.social.linkedin && (
                                        <a
                                            href={member.social.linkedin}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='text-[#BDBDBD] transition-colors hover:text-[#F9F9F9]'>
                                            <Linkedin className='h-6 w-6' />
                                        </a>
                                    )}
                                    {member.social.portfolio && (
                                        <a
                                            href={member.social.portfolio}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='text-[#BDBDBD] transition-colors hover:text-[#F9F9F9]'>
                                            <Globe className='h-6 w-6' />
                                        </a>
                                    )}
                                    {member.social.instagram && (
                                        <a
                                            href={member.social.instagram}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='text-[#BDBDBD] transition-colors hover:text-[#F9F9F9]'>
                                            <Instagram className='h-6 w-6' />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Column - Member Info */}
                        <div>
                            <h1 className='mb-2 text-4xl font-bold text-[#F9F9F9]'>{member.name}</h1>
                            <h2 className='mb-4 text-2xl font-medium text-[#BDBDBD]'>{member.role}</h2>
                            <p className='mb-6 text-lg leading-relaxed text-[#BDBDBD]'>{member.bio}</p>

                            {/* Extended Content from Markdown */}
                            {member.content && (
                                <div
                                    className='mt-6 space-y-6 [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-[#F9F9F9] [&>h1]:mb-4 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-[#F9F9F9] [&>h2]:mb-3 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-[#F9F9F9] [&>h3]:mb-2 [&>p]:text-[#BDBDBD] [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:text-[#BDBDBD] [&>ul]:space-y-2 [&>ul]:ml-6 [&>ul]:list-disc [&>ol]:text-[#BDBDBD] [&>ol]:space-y-2 [&>ol]:ml-6 [&>ol]:list-decimal [&>li]:leading-relaxed [&>strong]:font-semibold [&>strong]:text-[#F9F9F9] [&>em]:italic [&>blockquote]:border-l-4 [&>blockquote]:border-[#333136] [&>blockquote]:pl-4 [&>blockquote]:text-[#BDBDBD] [&>blockquote]:italic'
                                    dangerouslySetInnerHTML={{ __html: member.content }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}