import path from 'path'
import {
  TeamMember,
  Project,
  TeamMemberFrontmatterSchema,
  ProjectFrontmatterSchema,
  TeamCategory,
  ProjectCategory
} from '@/types/content'
import {
  parseMarkdownFile,
  getMarkdownFiles,
  createSlug,
  getContentPath,
  contentExists
} from '@/lib/markdown'

/**
 * Get all team members
 */
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const files = getMarkdownFiles('content/team')
  const teamMembers: TeamMember[] = []

  for (const file of files) {
    const slug = createSlug(file)
    const filePath = path.join(process.cwd(), 'content/team', file)

    try {
      const { frontmatter, content } = await parseMarkdownFile(filePath)

      // Validate frontmatter
      const validatedFrontmatter = TeamMemberFrontmatterSchema.parse(frontmatter)

      teamMembers.push({
        slug,
        content,
        ...validatedFrontmatter
      })
    } catch (error) {
      console.error(`Error processing team member file ${file}:`, error)
    }
  }

  // Sort by order, then by name
  return teamMembers.sort((a, b) => {
    if (a.order !== b.order) {
      return a.order - b.order
    }
    return a.name.localeCompare(b.name)
  })
}

/**
 * Get a single team member by slug
 */
export async function getTeamMember(slug: string): Promise<TeamMember | null> {
  if (!contentExists('team', slug)) {
    return null
  }

  const filePath = getContentPath('team', slug)

  try {
    const { frontmatter, content } = await parseMarkdownFile(filePath)
    const validatedFrontmatter = TeamMemberFrontmatterSchema.parse(frontmatter)

    return {
      slug,
      content,
      ...validatedFrontmatter
    }
  } catch (error) {
    console.error(`Error processing team member ${slug}:`, error)
    return null
  }
}

/**
 * Get team members by category/team
 */
export async function getTeamMembersByCategory(category: TeamCategory): Promise<TeamMember[]> {
  const allMembers = await getAllTeamMembers()
  return allMembers.filter(member => member.teams.includes(category))
}

/**
 * Get featured team members
 */
export async function getFeaturedTeamMembers(): Promise<TeamMember[]> {
  const allMembers = await getAllTeamMembers()
  return allMembers.filter(member => member.featured)
}

/**
 * Get all projects
 */
export async function getAllProjects(): Promise<Project[]> {
  const files = getMarkdownFiles('content/projects')
  const projects: Project[] = []

  for (const file of files) {
    const slug = createSlug(file)
    const filePath = path.join(process.cwd(), 'content/projects', file)

    try {
      const { frontmatter, content } = await parseMarkdownFile(filePath)

      // Validate frontmatter
      const validatedFrontmatter = ProjectFrontmatterSchema.parse(frontmatter)

      projects.push({
        slug,
        content,
        ...validatedFrontmatter
      })
    } catch (error) {
      console.error(`Error processing project file ${file}:`, error)
    }
  }

  // Sort by date (newest first)
  return projects.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

/**
 * Get a single project by slug
 */
export async function getProject(slug: string): Promise<Project | null> {
  if (!contentExists('projects', slug)) {
    return null
  }

  const filePath = getContentPath('projects', slug)

  try {
    const { frontmatter, content } = await parseMarkdownFile(filePath)
    const validatedFrontmatter = ProjectFrontmatterSchema.parse(frontmatter)

    return {
      slug,
      content,
      ...validatedFrontmatter
    }
  } catch (error) {
    console.error(`Error processing project ${slug}:`, error)
    return null
  }
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: ProjectCategory): Promise<Project[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(project => project.category === category)
}

/**
 * Get featured projects
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(project => project.featured)
}

/**
 * Get projects by tag
 */
export async function getProjectsByTag(tag: string): Promise<Project[]> {
  const allProjects = await getAllProjects()
  return allProjects.filter(project =>
    project.tags.some(projectTag =>
      projectTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

/**
 * Get all unique tags from all projects
 */
export async function getAllProjectTags(): Promise<string[]> {
  const allProjects = await getAllProjects()
  const tags = new Set<string>()

  allProjects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag))
  })

  return Array.from(tags).sort()
}

/**
 * Get all team member slugs for static generation
 */
export function getAllTeamMemberSlugs(): string[] {
  const files = getMarkdownFiles('content/team')
  return files.map(file => createSlug(file))
}

/**
 * Get all project slugs for static generation
 */
export function getAllProjectSlugs(): string[] {
  const files = getMarkdownFiles('content/projects')
  return files.map(file => createSlug(file))
}