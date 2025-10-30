/**
 * Content helper functions for parsing and rendering content
 */

import React from 'react';

/**
 * Parse text with [highlighted] syntax and return JSX
 * Words wrapped in [brackets] will be rendered with full opacity (white)
 * while other text will be rendered with 70% opacity (gray)
 *
 * @param text - Text with optional [highlighted] syntax
 * @returns Array of JSX span elements
 *
 * @example
 * parseHighlightedText("We create [amazing] videos")
 * // Returns: <span style={{color: 'rgba(255, 255, 255, 0.70)'}}>We create </span>
 * //          <span style={{color: '#FFF'}}>amazing</span>
 * //          <span style={{color: 'rgba(255, 255, 255, 0.70)'}}> videos</span>
 */
export function parseHighlightedText(text: string) {
    const parts = text.split(/(\[.*?\])/g);

    return parts.map((part, index) => {
        if (part.startsWith('[') && part.endsWith(']')) {
            const highlightedText = part.slice(1, -1);

            return (
                <span key={index} style={{ color: '#FFF' }}>
                    {highlightedText}
                </span>
            );
        }

        return (
            <span key={index} style={{ color: 'rgba(255, 255, 255, 0.70)' }}>
                {part}
            </span>
        );
    });
}

/**
 * Parse markdown content with headers and bullet points
 * Supports:
 * - Headers: # Header Text
 * - Bullet points: • Item text
 * - Regular paragraphs
 *
 * @param content - Markdown content string
 * @returns Array of JSX elements (headers, bullet lists, paragraphs)
 *
 * @example
 * parseMarkdownContent("# Title\n• Point 1\n• Point 2\nParagraph text")
 * // Returns: [<h2>Title</h2>, <ul><li>Point 1</li><li>Point 2</li></ul>, <p>Paragraph text</p>]
 */
export function parseMarkdownContent(content: string) {
    const lines = content.split('\n').filter((line) => line.trim() !== '');
    const elements: React.JSX.Element[] = [];

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // Header (starts with #)
        if (trimmedLine.startsWith('#')) {
            const headerText = trimmedLine.replace(/^#+\s*/, '');

            elements.push(
                <h2
                    key={index}
                    className='mb-12 uppercase'
                    style={{
                        color: '#FFF',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '2.25rem',
                        fontStyle: 'normal',
                        fontWeight: 600,
                        lineHeight: 'normal',
                        letterSpacing: '-0.01125rem'
                    }}>
                    {headerText}
                </h2>
            );
        }
        // Bullet point (starts with • or -)
        else if (trimmedLine.startsWith('•') || trimmedLine.startsWith('-')) {
            const bulletText = trimmedLine.substring(1).trim();

            elements.push(
                <li key={index} className='flex items-start gap-3'>
                    <div className='relative mt-1 h-6 w-6 flex-shrink-0'>
                        <img
                            src='/star.svg'
                            alt='Star'
                            width={24}
                            height={24}
                            className='h-6 w-6 transition-transform duration-300 hover:rotate-90'
                        />
                    </div>
                    <span>{bulletText}</span>
                </li>
            );
        }
        // Regular paragraph
        else {
            elements.push(
                <p
                    key={index}
                    style={{
                        color: '#FFF',
                        fontFamily: '"Geist Mono", monospace',
                        fontSize: '1.25rem',
                        fontStyle: 'normal',
                        fontWeight: 700,
                        lineHeight: 'normal',
                        letterSpacing: '-0.00625rem'
                    }}>
                    {trimmedLine}
                </p>
            );
        }
    });

    // Wrap bullet points in <ul> if they exist
    const finalElements: React.JSX.Element[] = [];
    let bulletGroup: React.JSX.Element[] = [];

    elements.forEach((element, index) => {
        if (element.type === 'li') {
            bulletGroup.push(element);
        } else {
            if (bulletGroup.length > 0) {
                finalElements.push(
                    <ul
                        key={`ul-${index}`}
                        className='mb-16 space-y-6'
                        style={{
                            color: '#FFF',
                            fontFamily: '"Geist Mono", monospace',
                            fontSize: '1.25rem',
                            fontStyle: 'normal',
                            fontWeight: 300,
                            lineHeight: 'normal',
                            letterSpacing: '-0.00625rem'
                        }}>
                        {bulletGroup}
                    </ul>
                );
                bulletGroup = [];
            }
            finalElements.push(element);
        }
    });

    // Handle remaining bullet points
    if (bulletGroup.length > 0) {
        finalElements.push(
            <ul
                key='ul-final'
                className='mb-16 space-y-6'
                style={{
                    color: '#FFF',
                    fontFamily: '"Geist Mono", monospace',
                    fontSize: '1.25rem',
                    fontStyle: 'normal',
                    fontWeight: 300,
                    lineHeight: 'normal',
                    letterSpacing: '-0.00625rem'
                }}>
                {bulletGroup}
            </ul>
        );
    }

    return finalElements;
}
