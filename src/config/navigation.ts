// Navigation and Footer Configuration
// Update social media links and navigation items here

export const NAVIGATION_CONFIG = {
    // Main navigation links (used in header and footer)
    mainLinks: [
        { label: 'HOME', href: '/' },
        { label: 'ABOUT US', href: '/about' },
        { label: 'PRODUCTION', href: '/production' },
        { label: 'VFX', href: '/vfx' },
        { label: 'PROJECT', href: '/work' },
        { label: 'CONTACT US', href: '/contact' }
    ],

    // Social media links (used in footer and mobile nav)
    socialLinks: [
        {
            label: 'INSTAGRAM',
            href: 'https://www.instagram.com/lunapictures', // Update with your Instagram URL
            icon: '/instagram-icon.svg'
        },
        {
            label: 'YOUTUBE',
            href: 'https://www.youtube.com/@lunapictures', // Update with your YouTube URL
            icon: '/youtube-icon.svg'
        },
        {
            label: 'FACEBOOK',
            href: 'https://www.facebook.com/lunapictures', // Update with your Facebook URL
            icon: '/facebook-icon.svg'
        }
    ],

    // Footer tagline
    tagline: {
        line1: 'YOUR STORY',
        line2: 'OUR VISION'
    },

    // Copyright text
    copyright: 'Luna Pictures 2025. All rights reserved.'
};
