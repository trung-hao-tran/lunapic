import { notFound } from 'next/navigation';

import { PortfolioDetailClient } from '@/components/PortfolioDetailClient';
import { getAllPortfolioIds, loadPortfolioItem } from '@/lib/dataLoader';

// Generate static params for all portfolio items
export async function generateStaticParams() {
    const ids = await getAllPortfolioIds();

    return ids.map((id) => ({ id }));
}

const PortfolioDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    // Await params (Next.js 15 requirement)
    const { id } = await params;

    // Load portfolio item from content files
    try {
        const item = await loadPortfolioItem(id);

        return <PortfolioDetailClient item={item} />;
    } catch (error) {
        // If item not found, show 404
        notFound();
    }
};

export default PortfolioDetailPage;
