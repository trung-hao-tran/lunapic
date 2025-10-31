/**
 * Markdown content style definitions
 * Used by parseMarkdownContent helper to render markdown with consistent styling
 */

import React from 'react';

export interface MarkdownStyle {
    header: React.CSSProperties;
    paragraph: React.CSSProperties;
    listContainer: React.CSSProperties;
    listItem: React.CSSProperties;
}

/**
 * Default markdown style - used for VFX/Production pages, Portfolio detail
 * Large, bold text for impactful content
 */
export const defaultMarkdownStyle: MarkdownStyle = {
    header: {
        color: '#FFF',
        fontFamily: 'Inter, sans-serif',
        fontSize: '2.25rem',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        letterSpacing: '-0.01125rem'
    },
    paragraph: {
        color: '#FFF',
        fontFamily: '"Geist Mono", monospace',
        fontSize: '1.25rem',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: 'normal',
        letterSpacing: '-0.00625rem'
    },
    listContainer: {
        color: '#FFF',
        fontFamily: '"Geist Mono", monospace',
        fontSize: '1.25rem',
        fontStyle: 'normal',
        fontWeight: 300,
        lineHeight: 'normal',
        letterSpacing: '-0.00625rem'
    },
    listItem: {
        color: '#FFF',
        fontFamily: '"Geist Mono", monospace',
        fontSize: '1.25rem',
        fontStyle: 'normal',
        fontWeight: 300,
        lineHeight: 'normal',
        letterSpacing: '-0.00625rem'
    }
};

/**
 * Team bio markdown style - used for team member biography
 * Smaller, lighter text for readable longer-form content
 */
export const teamBioMarkdownStyle: MarkdownStyle = {
    header: {
        color: '#FFF',
        fontFamily: 'Inter, monospace',
        fontSize: '1.5rem',
        fontStyle: 'normal',
        fontWeight: 600,
        lineHeight: 'normal',
        letterSpacing: '-0.0075rem'
    },
    paragraph: {
        color: '#FFF',
        fontFamily: 'Inter, monospace',
        fontSize: '0.875rem',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        letterSpacing: '-0.00438rem'
    },
    listContainer: {
        color: '#FFF',
        fontFamily: 'Inter, monospace',
        fontSize: '0.875rem',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        letterSpacing: '-0.00438rem'
    },
    listItem: {
        color: '#FFF',
        fontFamily: 'Inter, monospace',
        fontSize: '0.875rem',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        letterSpacing: '-0.00438rem'
    }
};
