import Image from 'next/image';
import Link from 'next/link';
import { TeamMember } from '@/types/content';

export interface TeamMemberProfileProps {
    member: TeamMember;
    className?: string;
}

const TeamMemberProfile: React.FC<TeamMemberProfileProps> = ({ member, className = '' }) => {
    return (
        <div className={`grid items-start gap-8 py-12 md:grid-cols-5 md:gap-12 ${className}`}>
            {/* Left Column - Photo (40% width on desktop) */}
            <div className="md:col-span-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                </div>
            </div>

            {/* Right Column - Content (60% width on desktop) */}
            <div className="space-y-6 md:col-span-3">
                {/* Name and Role */}
                <div className="border-b border-[#333136] pb-4">
                    <h2 className="mb-2 text-2xl font-bold text-[#F9F9F9] md:text-3xl lg:text-4xl">
                        {member.name}
                    </h2>
                    <p className="text-lg font-medium text-[#BDBDBD] md:text-xl">
                        {member.role}
                    </p>
                </div>

                {/* Bio Preview */}
                <div>
                    <p className="text-base leading-relaxed text-[#BDBDBD] md:text-lg">
                        {member.bio}
                    </p>
                </div>

                {/* Extended Content from Markdown */}
                {member.content && (
                    <div
                        className="space-y-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#333136] [&>blockquote]:pl-4 [&>blockquote]:text-[#BDBDBD] [&>blockquote]:italic [&>em]:italic [&>h1]:mb-4 [&>h1]:text-xl [&>h1]:font-bold [&>h1]:text-[#F9F9F9] md:[&>h1]:text-2xl [&>h2]:mb-3 [&>h2]:text-lg [&>h2]:font-semibold [&>h2]:text-[#F9F9F9] md:[&>h2]:text-xl [&>h3]:mb-2 [&>h3]:text-base [&>h3]:font-medium [&>h3]:text-[#F9F9F9] md:[&>h3]:text-lg [&>li]:leading-relaxed [&>ol]:ml-6 [&>ol]:list-decimal [&>ol]:space-y-1 [&>ol]:text-[#BDBDBD] [&>p]:mb-3 [&>p]:leading-relaxed [&>p]:text-[#BDBDBD] [&>strong]:font-semibold [&>strong]:text-[#F9F9F9] [&>ul]:ml-6 [&>ul]:list-disc [&>ul]:space-y-1 [&>ul]:text-[#BDBDBD]"
                        dangerouslySetInnerHTML={{ __html: member.content }}
                    />
                )}

                {/* Read Full Profile Link */}
                <div className="pt-4">
                    <Link
                        href={`/about/${member.slug}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#333136] px-4 py-2 text-sm font-medium text-[#F9F9F9] transition-colors hover:bg-[#101B39] md:text-base"
                    >
                        View Full Profile
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 17L17 7M17 7H7M17 7V17"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TeamMemberProfile;