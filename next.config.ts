import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true'
});

// https://nextjs.org/docs/pages/api-reference/next-config-js
const nextConfig: NextConfig = {
    output: 'standalone',
    experimental: {
        optimizePackageImports: ['@emailjs/browser', 'framer-motion']
    },
    // Enable YouTube and Vimeo thumbnails with Next.js Image component
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
                pathname: '/vi/**'
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'i.vimeocdn.com',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname: 'vumbnail.com',
                pathname: '/**'
            }
        ]
    },
    // Allow iframe embeds from YouTube and Vimeo
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: "frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://vimeo.com;"
                    }
                ]
            }
        ];
    }
};

export default withBundleAnalyzer(nextConfig);
