// Contact Form Configuration
// Update dropdown options here

export const CONTACT_FORM_CONFIG = {
    // Service options dropdown
    services: [
        { value: 'vfx', label: 'VFX' },
        { value: 'video-production', label: 'Video Production' },
        { value: 'color-grading', label: 'Color Grading' },
        { value: 'post-production', label: 'Post Production' },
        { value: 'animation', label: 'Animation' },
        { value: 'consulting', label: 'Consulting' }
    ],

    // Budget options dropdown
    budgets: [
        { value: 'under-10k', label: 'Under $10,000' },
        { value: '10k-50k', label: '$10,000 - $50,000' },
        { value: '50k-100k', label: '$50,000 - $100,000' },
        { value: '100k-250k', label: '$100,000 - $250,000' },
        { value: 'over-250k', label: 'Over $250,000' }
    ],

    // Form field labels
    labels: {
        name: 'YOUR NAME',
        email: 'YOUR EMAIL',
        company: 'YOUR COMPANY',
        service: 'WHAT SERVICE DO YOU NEED',
        budget: 'BUDGET',
        message: 'MESSAGE'
    },

    // Placeholders
    placeholders: {
        name: '',
        email: '',
        company: '',
        message: 'Tell us more about your project here ....'
    },

    // Validation messages
    validationMessages: {
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Please enter a valid email',
        companyRequired: 'Company name is required',
        serviceRequired: 'Please select a service',
        budgetRequired: 'Please select a budget',
        messageRequired: 'Message is required'
    }
};
