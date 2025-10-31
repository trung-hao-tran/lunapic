import { NextResponse } from 'next/server';

import { put } from '@vercel/blob';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('cv') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only PDF and Word documents are allowed.' },
                { status: 400 }
            );
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: 'File size exceeds 5MB limit' }, { status: 400 });
        }

        // Upload to Vercel Blob with proper filename
        const timestamp = Date.now();
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `cv/${timestamp}-${sanitizedName}`;

        const blob = await put(filename, file, {
            access: 'public',
            addRandomSuffix: false
        });

        return NextResponse.json({
            success: true,
            url: blob.url,
            filename: file.name
        });
    } catch (error) {
        console.error('Upload error:', error);

        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
}

export const runtime = 'edge';
