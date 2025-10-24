import { EMAIL_CONFIG } from '@/config/email';
import { init, send } from '@emailjs/browser';

/**
 * Initialize EmailJS with public key
 * Call this once when the app starts
 */
export const initEmailJS = () => {
    init(EMAIL_CONFIG.publicKey);
};

/**
 * Send "Work With Us" form email
 */
export const sendWorkWithUsEmail = async (formData: {
    name: string;
    email: string;
    company: string;
    service: string;
    budget: string;
    message: string;
}) => {
    try {
        const templateParams = {
            to_email: EMAIL_CONFIG.destinations.workWithUs,
            from_name: formData.name,
            from_email: formData.email,
            company_name: formData.company,
            service: formData.service,
            budget: formData.budget,
            message: formData.message
        };

        const response = await send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.workWithUsTemplateId, templateParams);

        return response;
    } catch (error) {
        console.error('EmailJS Error:', error);
        throw new Error('Failed to send email');
    }
};

/**
 * Send "Join Our Team" form email with attachment
 * Note: EmailJS has limited support for attachments.
 * For file attachments, you may need to:
 * 1. Convert file to base64 and send in template params
 * 2. Upload file to cloud storage and send the link
 * 3. Use a backend API route instead
 */
export const sendJoinTeamEmail = async (formData: {
    name: string;
    email: string;
    resume: File | null;
    message: string;
    linkedin: string;
}) => {
    try {
        // Convert resume file to base64 if exists
        let resumeData = '';
        if (formData.resume) {
            const reader = new FileReader();
            resumeData = await new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(formData.resume as File);
            });
        }

        const templateParams = {
            to_email: EMAIL_CONFIG.destinations.joinTeam,
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            linkedin: formData.linkedin || 'Not provided',
            resume_name: formData.resume?.name || 'No resume attached',
            // Note: EmailJS has a 50KB limit for total template params
            // For larger files, consider uploading to cloud storage first
            resume_data: resumeData.slice(0, 50000) // Truncate if too large
        };

        const response = await send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.joinTeamTemplateId, templateParams);

        return response;
    } catch (error) {
        console.error('EmailJS Error:', error);
        throw new Error('Failed to send application');
    }
};
