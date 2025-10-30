import React, { Suspense } from 'react';

import { ContactPageClient } from '@/components/ContactPageClient';
import { Footer } from '@/components/Footer';
import { loadPageConfig } from '@/lib/dataLoader';

export default async function ContactPage() {
    // Load contact page configuration
    const config = await loadPageConfig('contact');

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <ContactPageClient config={config} />
            </Suspense>
            <Footer />
        </>
    );
}
