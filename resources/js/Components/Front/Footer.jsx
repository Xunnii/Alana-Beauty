import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="font-Palisade text-3xl text-[var(--color-primary)] tracking-wider block mb-4">
                            Alana Beauty
                        </Link>
                        <p className="text-sm text-gray-500 font-Raleway leading-relaxed">
                            Destinasi kecantikan premium Anda. Menyediakan produk skincare dan makeup terbaik untuk memancarkan kecantikan alami Anda.
                        </p>
                    </div>
                    
                    <div>
                        <h3 className="font-RalewayBold text-lg mb-4 text-gray-800 tracking-wide uppercase text-sm">Cabang Kami</h3>
                        <ul className="space-y-3 text-sm text-gray-500 font-Raleway">
                            <li>
                                <span className="block font-bold text-gray-700">Rumbai</span>
                                Jl. Yos Sudarso No. 123, Rumbai, Pekanbaru
                            </li>
                            <li>
                                <span className="block font-bold text-gray-700">Air Dingin</span>
                                Jl. Air Dingin Raya No. 45, Bukit Raya, Pekanbaru
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-RalewayBold text-lg mb-4 text-gray-800 tracking-wide uppercase text-sm">Layanan</h3>
                        <ul className="space-y-2 text-sm text-gray-500 font-Raleway">
                            <li><Link href="/katalog" className="hover:text-[var(--color-primary)] transition">Katalog Produk</Link></li>
                            <li><Link href="/trending" className="hover:text-[var(--color-primary)] transition">Trending Now</Link></li>
                            <li><Link href="/beauty-advisor" className="hover:text-[var(--color-primary)] transition">Beauty Advisor Virtual</Link></li>
                            <li><Link href="/faq" className="hover:text-[var(--color-primary)] transition">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-RalewayBold text-lg mb-4 text-gray-800 tracking-wide uppercase text-sm">Hubungi Kami</h3>
                        <ul className="space-y-2 text-sm text-gray-500 font-Raleway">
                            <li>WhatsApp: +62 812-3456-7890</li>
                            <li>Email: hello@alanabeauty.com</li>
                            <li>Instagram: @alanabeauty.pku</li>
                            <li>TikTok: @alanabeauty_official</li>
                        </ul>
                    </div>
                </div>
                
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400 font-Raleway">
                        &copy; {new Date().getFullYear()} Alana Beauty. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
