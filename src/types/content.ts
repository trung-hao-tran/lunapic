import { z } from 'zod'

// Team Member Schemas
export const TeamMemberFrontmatterSchema = z.object({
  name: z.string(),
  role: z.string(),
  teams: z.array(z.string()),
  bio: z.string(),
  image: z.string(),
  featured: z.boolean().default(false),
  order: z.number().default(999),
  social: z.object({
    linkedin: z.string().optional(),
    portfolio: z.string().optional(),
    behance: z.string().optional(),
    instagram: z.string().optional(),
    vimeo: z.string().optional(),
  }).optional(),
  skills: z.array(z.string()).optional(),
})

export const TeamMemberSchema = TeamMemberFrontmatterSchema.extend({
  slug: z.string(),
  content: z.string(),
})

// Project Schemas
export const ProjectFrontmatterSchema = z.object({
  title: z.string(),
  category: z.string(),
  client: z.string().optional(),
  date: z.string(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()),
  image: z.string(),
  gallery: z.array(z.string()).optional(),
  duration: z.string().optional(),
  services: z.array(z.string()).optional(),
})

export const ProjectSchema = ProjectFrontmatterSchema.extend({
  slug: z.string(),
  content: z.string(),
})

// TypeScript Types
export type TeamMemberFrontmatter = z.infer<typeof TeamMemberFrontmatterSchema>
export type TeamMember = z.infer<typeof TeamMemberSchema>
export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>
export type Project = z.infer<typeof ProjectSchema>

// Team Categories
export const TEAM_CATEGORIES = [
  'production',
  'creative',
  'camera',
  'post-production',
  'vfx',
  'animation',
  'management'
] as const

export type TeamCategory = typeof TEAM_CATEGORIES[number]

// Project Categories
export const PROJECT_CATEGORIES = [
  'Commercial',
  'Brand Film',
  'Animation',
  'VFX',
  'Documentary',
  'Music Video'
] as const

export type ProjectCategory = typeof PROJECT_CATEGORIES[number]