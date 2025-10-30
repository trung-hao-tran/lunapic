/**
 * Content helper functions for parsing and rendering content
 */

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
