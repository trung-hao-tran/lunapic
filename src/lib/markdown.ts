import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

/**
 * Process markdown content by converting it to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
    const result = await remark().use(remarkHtml).process(markdown);

    return result.toString();
}

/**
 * Read and parse a markdown file
 */
export async function parseMarkdownFile(filePath: string) {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Convert markdown content to HTML
    const htmlContent = await markdownToHtml(content);

    return {
        frontmatter: data,
        content: htmlContent,
        rawContent: content
    };
}

/**
 * Get all markdown files from a directory
 */
export function getMarkdownFiles(directory: string): string[] {
    const fullPath = path.join(process.cwd(), directory);

    if (!fs.existsSync(fullPath)) {
        return [];
    }

    const files = fs.readdirSync(fullPath);

    return files.filter((file) => file.endsWith('.md'));
}

/**
 * Create slug from filename
 */
export function createSlug(filename: string): string {
    return filename.replace(/\.md$/, '');
}

/**
 * Get the full path to a content file
 */
export function getContentPath(type: 'team' | 'projects', slug: string): string {
    return path.join(process.cwd(), 'content', type, `${slug}.md`);
}

/**
 * Check if a content file exists
 */
export function contentExists(type: 'team' | 'projects', slug: string): boolean {
    const filePath = getContentPath(type, slug);

    return fs.existsSync(filePath);
}
