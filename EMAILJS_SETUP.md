# EmailJS Setup Instructions

This document explains how to set up EmailJS for the contact forms on your website.

## Overview

The contact page has two forms:
1. **WORK WITH US** - For project inquiries
2. **JOIN OUR TEAM** - For job applications (with resume upload)

Both forms use EmailJS to send emails to your inbox.

## Setup Steps

### 1. Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

### 2. Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email
5. Note down your **Service ID**

### 3. Create Email Templates

You need to create 2 templates:

#### Template 1: Work With Us

1. Go to **Email Templates** → **Create New Template**
2. Name it: "Work With Us Inquiry"
3. Set up the template with these variables:
   ```
   Subject: New Project Inquiry from {{from_name}}

   From: {{from_name}}
   Email: {{from_email}}
   Company: {{company_name}}
   Service: {{service}}
   Budget: {{budget}}

   Message:
   {{message}}
   ```
4. Note down the **Template ID**

#### Template 2: Join Our Team

1. Create another template: "Job Application"
2. Set up with these variables:
   ```
   Subject: New Job Application from {{from_name}}

   From: {{from_name}}
   Email: {{from_email}}
   LinkedIn/Portfolio: {{linkedin}}

   Resume: {{resume_name}}

   Message:
   {{message}}

   Note: Resume attachment data: {{resume_data}}
   ```
3. Note down the **Template ID**

### 4. Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (also called User ID)
3. Copy it

### 5. Update Configuration

Edit `src/config/email.ts` with your actual values:

```typescript
export const EMAIL_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',  // From step 2
    workWithUsTemplateId: 'YOUR_WORK_TEMPLATE_ID',  // From step 3, Template 1
    joinTeamTemplateId: 'YOUR_JOIN_TEAM_TEMPLATE_ID',  // From step 3, Template 2
    publicKey: 'YOUR_PUBLIC_KEY',  // From step 4

    destinations: {
        workWithUs: 'trunghao2000@gmail.com',  // Change to your email
        joinTeam: 'trunghao2000@gmail.com'  // Change to your email
    },

    contactInfo: {
        address: '11 TOTTENHAM ROAD, LONDON, ENGLAND',  // Update with real address
        phone: '+1 212 425 8617',  // Update with real phone
        email: 'INFO@EXAMPLE.COM'  // Update with real email
    }
};
```

## Important Notes

### Resume File Attachments

EmailJS has limitations for file attachments:
- Maximum 50KB total for all template parameters
- Files are converted to base64, which increases size by ~33%
- For larger resumes (>35KB), consider:
  1. Uploading to cloud storage (Cloudinary, AWS S3, etc.) and sending the link
  2. Creating a backend API route to handle file uploads
  3. Using a form service like Formspree or Typeform

### Alternative: Backend API Route

For better file handling, you can create a Next.js API route:

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    // Handle file upload and email sending here
    // This avoids EmailJS file size limitations
}
```

### Work With Us Form

Currently, the "Work With Us" form uses the existing `ContactSection` component which handles submission internally. To integrate EmailJS for this form, you would need to:

1. Modify `ContactSection.tsx` to accept an `onSubmit` prop
2. Or create a new form component similar to `JoinTeamForm`

## Testing

1. Fill out the contact form on `/contact`
2. Check your email inbox for the message
3. Check EmailJS dashboard for delivery status
4. Check browser console for any errors

## Troubleshooting

- **403 Error**: Check your EmailJS public key
- **No emails received**: Check template IDs and email service connection
- **File too large**: Resume exceeds 50KB limit, see notes above
- **CORS errors**: Make sure you're using the correct public key

## Learn More

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Guide](https://www.emailjs.com/docs/examples/reactjs/)
