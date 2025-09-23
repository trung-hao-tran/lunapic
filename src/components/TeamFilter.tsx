'use client';

import { useState } from 'react';

import TeamMember from '@/components/TeamMember';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TEAM_CATEGORIES, TeamCategory, TeamMember as TeamMemberType } from '@/types/content';

interface TeamFilterProps {
    teamMembers: TeamMemberType[];
}

export function TeamFilter({ teamMembers }: TeamFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState<TeamCategory | 'all'>('all');

    const filteredMembers =
        selectedCategory === 'all'
            ? teamMembers
            : teamMembers.filter((member) => member.teams.includes(selectedCategory));

    return (
        <div>
            {/* Filter Controls */}
            <div className='mb-12'>
                <h2 className='mb-6 text-2xl font-bold text-[#F9F9F9]'>Filter by Team</h2>
                <div className='flex flex-wrap gap-3'>
                    <Button
                        variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                        onClick={() => setSelectedCategory('all')}
                        className={` ${
                            selectedCategory === 'all'
                                ? 'bg-[#F9F9F9] text-[#020202] hover:bg-[#BDBDBD]'
                                : 'text-[#F9F9F9] hover:bg-[#333136] hover:text-[#BDBDBD]'
                        } `}>
                        All Teams ({teamMembers.length})
                    </Button>
                    {TEAM_CATEGORIES.map((category) => {
                        const membersInCategory = teamMembers.filter((member) => member.teams.includes(category));

                        if (membersInCategory.length === 0) return null;

                        return (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'default' : 'ghost'}
                                onClick={() => setSelectedCategory(category)}
                                className={`capitalize ${
                                    selectedCategory === category
                                        ? 'bg-[#F9F9F9] text-[#020202] hover:bg-[#BDBDBD]'
                                        : 'text-[#F9F9F9] hover:bg-[#333136] hover:text-[#BDBDBD]'
                                } `}>
                                {category.replace('-', ' ')} ({membersInCategory.length})
                            </Button>
                        );
                    })}
                </div>
            </div>

            {/* Selected Category Info */}
            {selectedCategory !== 'all' && (
                <div className='mb-8'>
                    <div className='flex items-center gap-2'>
                        <Badge
                            variant='secondary'
                            className='bg-[#333136] px-4 py-2 text-base text-[#F9F9F9] capitalize'>
                            {selectedCategory.replace('-', ' ')} Team
                        </Badge>
                        <span className='text-[#BDBDBD]'>
                            {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
                        </span>
                    </div>
                </div>
            )}

            {/* Team Members Grid */}
            <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {filteredMembers.map((member) => (
                    <TeamMember
                        key={member.slug}
                        name={member.name}
                        role={member.role}
                        bio={member.bio}
                        image="/images/placeholder.png"
                        href={`/team/${member.slug}`}
                    />
                ))}
            </div>

            {/* No Results */}
            {filteredMembers.length === 0 && (
                <div className='py-12 text-center'>
                    <p className='text-lg text-[#BDBDBD]'>
                        No team members found in the {selectedCategory.replace('-', ' ')} category.
                    </p>
                </div>
            )}
        </div>
    );
}
