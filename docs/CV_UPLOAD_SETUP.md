# CV Upload Setup Guide

## Overview

The "Join Team" form supports CV/Resume uploads using **Vercel Blob Storage** + **EmailJS** integration.

### How It Works:

1. User uploads CV file (PDF/Word, max 5MB)
2. File is uploaded to Vercel Blob Storage (secure cloud)
3. Email is sent with a download link to the CV
4. You receive email with clickable CV link

---

## ✅ Option 1: Vercel Blob Storage (RECOMMENDED - Already Implemented)

### Advantages:
- ✅ No file size limits (well, up to reasonable sizes)
- ✅ Secure cloud storage
- ✅ Files accessible anytime via URL
- ✅ Professional solution
- ✅ Free tier: 500 GB bandwidth/month

### Setup Steps:

#### 1. Create Vercel Blob Store

If you haven't deployed to Vercel yet:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link
```

#### 2. Create Blob Storage

Go to [Vercel Dashboard](https://vercel.com/dashboard):
1. Select your project
2. Go to **Storage** tab
3. Click **Create Database** → **Blob**
4. Name it (e.g., "luna-pictures-files")
5. Copy the `BLOB_READ_WRITE_TOKEN`

#### 3. Add Token to Environment

Update `.env.local`:
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxxxx
```

#### 4. Create "Join Team" EmailJS Template

In EmailJS dashboard, create a new template with ID: `template_qpa04qv` (or update `.env.local`)

**Template Content:**
```
Subject: New Job Application - {{name}}

New job application received from {{name}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FROM:
Name: {{name}}
Email: {{email}}

PORTFOLIO/LINKEDIN:
{{portfolio_url}}

CV/RESUME:
File: {{cv_filename}}
Download: {{cv_url}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COVER LETTER:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please reply to {{email}} to schedule an interview.

Sent via Luna Pictures Careers Form
```

**Template Settings (Right Panel):**
```
To Email: {{to_email}}
From Name: {{name}}
Reply To: {{email}}
```

#### 5. Test It!

```bash
npm run dev
```

Go to your "Join Team" page and submit an application with a CV.

---

## 📧 Email You'll Receive:

```
Subject: New Job Application - Jane Smith

New job application received from Jane Smith

FROM:
Name: Jane Smith
Email: jane@example.com

PORTFOLIO/LINKEDIN:
https://linkedin.com/in/janesmith

CV/RESUME:
File: jane_smith_resume.pdf
Download: https://[blob-url]/cv/1234567890-jane_smith_resume.pdf   ← Click to download!

COVER LETTER:
I'm passionate about VFX and would love to join your team...
```

---

## 🔧 Alternative Options (If You Don't Want Vercel Blob)

### Option 2: Cloudinary (Free 10GB)

<details>
<summary>Click to expand Cloudinary setup</summary>

```bash
npm install cloudinary
```

Update `src/app/api/upload-cv/route.ts`:
```typescript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('cv') as File;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: 'cv', resource_type: 'raw' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });

  return NextResponse.json({ url: result.secure_url });
}
```

Add to `.env.local`:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

</details>

### Option 3: AWS S3 (For Production Scale)

<details>
<summary>Click to expand AWS S3 setup</summary>

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

Update `src/app/api/upload-cv/route.ts`:
```typescript
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('cv') as File;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const key = `cv/${Date.now()}-${file.name}`;

  await s3.send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: file.type
  }));

  const url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

  return NextResponse.json({ url });
}
```

</details>

---

## 🚀 What's Already Implemented:

✅ File upload API route (`/api/upload-cv`)
✅ File validation (PDF/Word only, 5MB max)
✅ JoinTeamForm component with CV upload
✅ Progress indicators ("Uploading CV...", "Sending application...")
✅ Error handling
✅ EmailJS integration with CV link

---

## 📝 Files Modified/Created:

- `src/app/api/upload-cv/route.ts` - Upload API endpoint
- `src/components/JoinTeamForm.tsx` - Form with CV upload
- `src/config/email.ts` - Email configuration
- `.env.local` - Environment variables

---

## 🎓 Learning Point: Why NOT Email Attachments?

**EmailJS Limitation:** EmailJS doesn't support file attachments (this is by design for security).

**Why Cloud Storage is Better:**
1. ✅ No file size limits
2. ✅ Emails load faster (just a link, not huge file)
3. ✅ Files stored permanently (not lost if email deleted)
4. ✅ Can access CV anytime from cloud dashboard
5. ✅ More professional workflow

---

## 🆘 Troubleshooting:

### "Failed to upload CV"
- Check `BLOB_READ_WRITE_TOKEN` is set in `.env.local`
- Verify token is correct in Vercel dashboard
- Check file size is under 5MB

### "Failed to send application"
- Check EmailJS credentials in `.env.local`
- Verify template ID matches (`template_qpa04qv`)
- Check EmailJS template has `{{cv_url}}` variable

### CV link doesn't work in email
- Verify Blob store access is set to "public"
- Check the URL in console logs

---

Need help? Check the main README or ask for support!
