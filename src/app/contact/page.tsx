import React, { Suspense } from 'react';

import { ContactPageClient } from '@/components/ContactPageClient';
import { Footer } from '@/components/Footer';
import { loadPageConfig, loadSocialLinks } from '@/lib/dataLoader';

export default async function ContactPage() {
    // Load contact page configuration and social links
    const config = await loadPageConfig('contact');
    const socialLinks = await loadSocialLinks();

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ContactPageClient config={config} />
            </Suspense>
            <Footer socialLinks={socialLinks} />
        </>
    );
}
