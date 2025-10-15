'use client';

import React from 'react';

type Corner = 'tl' | 'tr' | 'bl' | 'br';

interface StarFrameProps {
    children: React.ReactNode;
    className?: string;
    color?: string;
    borderColor?: string;
    direction?: Corner[];
    padding?: number;
    starSize?: number;
    thickness?: number;
    haveBorder?: boolean;
}

/**
 * StarFrame component
 * Creates a border around children with star/cross shapes at corners
 * Stars are formed by extending the borders outward at each corner
 * The color prop controls the color of stars (defaults to white)
 * The borderColor prop controls the color of borders (defaults to grey #787878)
 * The thickness prop controls the width of both borders and stars
 */
export function StarFrame({
    children,
    className = '',
    color = 'white',
    borderColor = '#787878',
    direction = ['tl', 'tr', 'bl', 'br'],
    padding = 10,
    starSize = 20,
    thickness = 1,
    haveBorder = true
}: StarFrameProps) {
    const halfStar = starSize / 2;
    const showStar = (corner: Corner) => direction.includes(corner);

    return (
        <div className={`relative inline-block ${className}`}>
            <div style={{ padding: `${padding}px`, position: 'relative' }}>
                {/* Border segments */}
                {haveBorder && (
                    <>
                        {/* Top border segments */}
                        {showStar('tl') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: halfStar,
                                    right: showStar('tr') ? halfStar : 0,
                                    height: thickness,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}
                        {!showStar('tl') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: showStar('tr') ? halfStar : 0,
                                    height: thickness,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}

                        {/* Right border segments */}
                        {showStar('tr') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: halfStar,
                                    right: 0,
                                    bottom: showStar('br') ? halfStar : 0,
                                    width: thickness,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}
                        {!showStar('tr') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bottom: showStar('br') ? halfStar : 0,
                                    width: thickness,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}

                        {/* Bottom border segments */}
                        {showStar('br') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: halfStar,
                                    left: showStar('bl') ? halfStar : 0,
                                    height: thickness,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}
                        {!showStar('br') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    left: showStar('bl') ? halfStar : 0,
                                    height: thickness,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}

                        {/* Left border segments */}
                        {showStar('bl') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: halfStar,
                                    left: 0,
                                    top: showStar('tl') ? halfStar : 0,
                                    width: thickness,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}
                        {!showStar('bl') && (
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    top: showStar('tl') ? halfStar : 0,
                                    width: thickness,
                                    backgroundColor: borderColor
                                }}
                            />
                        )}
                    </>
                )}

                {/* Star extensions at corners */}
                <>
                    {showStar('tl') && (
                        <>
                            {/* Top-left horizontal extension (outward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: -halfStar,
                                    width: halfStar,
                                    height: thickness,
                                    backgroundColor: color
                                }}
                            />
                            {/* Top-left horizontal connector (inward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: halfStar,
                                    height: thickness,
                                    backgroundColor: color
                                }}
                            />
                            {/* Top-left vertical extension (outward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -halfStar,
                                    left: 0,
                                    width: thickness,
                                    height: halfStar,
                                    backgroundColor: color
                                }}
                            />
                            {/* Top-left vertical connector (inward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: thickness,
                                    height: halfStar,
                                    backgroundColor: color
                                }}
                            />
                        </>
                    )}

                    {showStar('tr') && (
                        <>
                            {/* Top-right horizontal extension (outward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: -halfStar,
                                    width: halfStar,
                                    height: thickness,
                                    backgroundColor: color
                                }}
                            />
                            {/* Top-right horizontal connector (inward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: halfStar,
                                    height: thickness,
                                    backgroundColor: color
                                }}
                            />
                            {/* Top-right vertical extension (outward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: -halfStar,
                                    right: 0,
                                    width: thickness,
                                    height: halfStar,
                                    backgroundColor: color
                                }}
                            />
                            {/* Top-right vertical connector (inward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    width: thickness,
                                    height: halfStar,
                                    backgroundColor: color
                                }}
                            />
                        </>
                    )}

                    {showStar('bl') && (
                        <>
                            {/* Bottom-left horizontal extension (outward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: -halfStar,
                                    width: halfStar,
                                    height: thickness,
                                    backgroundColor: color
                                }}
                            />
                            {/* Bottom-left horizontal connector (inward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: halfStar,
                                    height: thickness,
                                    backgroundColor: color
                                }}
                            />
                            {/* Bottom-left vertical extension (outward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: -halfStar,
                                    left: 0,
                                    width: thickness,
                                    height: halfStar,
                                    backgroundColor: color
                                }}
                            />
                            {/* Bottom-left vertical connector (inward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: thickness,
                                    height: halfStar,
                                    backgroundColor: color
                                }}
                            />
                        </>
                    )}

                    {showStar('br') && (
                        <>
                            {/* Bottom-right horizontal extension (outward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: -halfStar,
                                    width: halfStar,
                                    height: thickness,
                                    backgroundColor: color
                                }}
                            />
                            {/* Bottom-right horizontal connector (inward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    width: halfStar,
                                    height: thickness,
                                    backgroundColor: color
                                }}
                            />
                            {/* Bottom-right vertical extension (outward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: -halfStar,
                                    right: 0,
                                    width: thickness,
                                    height: halfStar,
                                    backgroundColor: color
                                }}
                            />
                            {/* Bottom-right vertical connector (inward) */}
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    width: thickness,
                                    height: halfStar,
                                    backgroundColor: color
                                }}
                            />
                        </>
                    )}
                </>

                {children}
            </div>
        </div>
    );
}
