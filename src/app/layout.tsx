import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

import '@/app/globals.css';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});

const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    weight: ['300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
    title: 'Luna Pictures',
    description: 'A minimal Next.js starter with Tailwind CSS',
    icons: {
        icon: '/logo.svg'
    }
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <html lang='en'>
            <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
};

export default Layout;
