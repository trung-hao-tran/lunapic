import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Footer from '@/components/Footer';
import HeaderSection from '@/components/HeaderSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllTeamMemberSlugs, getTeamMember } from '@/lib/content';

import { ArrowLeft, Globe, Instagram, Linkedin } from 'lucide-react';

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
        <>
            <HeaderSection title={member.name} />

            <section className='bg-[#020202] py-16'>
                <div className='mx-auto w-[90vw] md:w-[65vw]'>
                    <div className='mb-8'>
                        <Link href='/team'>
                            <Button variant='ghost' className='p-0 text-[#F9F9F9] hover:text-[#BDBDBD]'>
                                <ArrowLeft className='mr-2 h-4 w-4' />
                                Back to Team
                            </Button>
                        </Link>
                    </div>

                    <div className='grid items-start gap-12 md:grid-cols-2'>
                        {/* Member Image */}
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

                        {/* Member Info */}
                        <div className='space-y-6'>
                            <div>
                                <h2 className='mb-2 text-3xl font-bold text-[#F9F9F9]'>{member.role}</h2>
                                <p className='text-lg leading-relaxed text-[#BDBDBD]'>{member.bio}</p>
                            </div>

                            {/* Teams */}
                            <div>
                                <h3 className='mb-3 font-semibold text-[#F9F9F9]'>Teams</h3>
                                <div className='flex flex-wrap gap-2'>
                                    {member.teams.map((team) => (
                                        <Badge
                                            key={team}
                                            variant='secondary'
                                            className='bg-[#333136] text-[#F9F9F9] capitalize'>
                                            {team.replace('-', ' ')}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {/* Skills */}
                            {member.skills && member.skills.length > 0 && (
                                <div>
                                    <h3 className='mb-3 font-semibold text-[#F9F9F9]'>Skills</h3>
                                    <div className='flex flex-wrap gap-2'>
                                        {member.skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant='outline'
                                                className='border-[#BDBDBD] text-[#BDBDBD]'>
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Extended Bio Content */}
                    {member.content && (
                        <div className='mt-12 max-w-none'>
                            <div
                                className='prose prose-invert prose-lg max-w-none'
                                dangerouslySetInnerHTML={{ __html: member.content }}
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
                </div>
            </section>

            <Footer />
        </>
    );
}
