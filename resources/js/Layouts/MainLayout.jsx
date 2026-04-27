import Header from '@/Components/Front/Header';
import Footer from '@/Components/Front/Footer';
import { Head } from '@inertiajs/react';

export default function MainLayout({ title, children }) {
    return (
        <div className="min-h-screen bg-[var(--color-background)] flex flex-col font-Raleway text-[var(--color-text-main)] selection:bg-[var(--color-primaryLight)] selection:text-[var(--color-primary)]">
            {title && <Head title={title} />}
            
            <Header />
            
            <main className="flex-grow">
                {children}
            </main>
            
            <Footer />
        </div>
    );
}
