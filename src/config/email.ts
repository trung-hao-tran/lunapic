// Email configuration
// Values are loaded from environment variables for security

export const EMAIL_CONFIG = {
    // EmailJS configuration (from environment variables)
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    workWithUsTemplateId: process.env.NEXT_PUBLIC_EMAILJS_WORK_TEMPLATE_ID || '',
    joinTeamTemplateId: process.env.NEXT_PUBLIC_EMAILJS_JOIN_TEMPLATE_ID || '',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',

    // Destination emails
    destinations: {
        workWithUs: 'minhnguyen@lunapictures.com.au',
        joinTeam: 'minhnguyen@lunapictures.com.au'
    },

    // Contact information
    contactInfo: {
        address: '11 TOTTENHAM ROAD, LONDON, ENGLAND',
        phone: '+1 212 425 8617',
        email: 'INFO@EXAMPLE.COM'
    }
};
