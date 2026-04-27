import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { FireIcon } from '@heroicons/react/24/solid';

export default function Trending({ products }) {
    // Calculate total stock for a product across all branches
    const getTotalStock = (inventories) => {
        if (!inventories) return 0;
        return inventories.reduce((sum, inv) => sum + inv.stock_quantity, 0);
    };

    return (
        <MainLayout title="Trending Now - Alana Beauty">
            {/* Hero Section */}
            <div className="bg-[#fd8282] bg-opacity-10 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-6 animate-bounce">
                        <FireIcon className="h-8 w-8 text-red-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-Palisade text-gray-900 mb-4">Trending Now</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto font-Raleway text-lg">
                        Produk-produk kecantikan yang sedang viral dan paling banyak dicari saat ini. Dapatkan sebelum kehabisan!
                    </p>
                </div>
            </div>

            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Product Grid */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {products.map(product => {
                                const totalStock = getTotalStock(product.inventories);
                                const isReady = totalStock > 0;
                                
                                return (
                                    <div key={product.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover-lift flex flex-col h-full group relative">
                                        {/* Glowing border effect for trending items */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#fd8282] to-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ padding: '2px' }}>
                                            <div className="w-full h-full bg-white rounded-2xl"></div>
                                        </div>
                                        
                                        <div className="relative z-10 flex flex-col h-full">
                                            <div className="relative aspect-square bg-gray-50 flex items-center justify-center overflow-hidden rounded-t-2xl">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <div className="text-gray-300">
                                                        <span className="font-Palisade text-4xl opacity-30">ALANA</span>
                                                    </div>
                                                )}

                                                {/* Badges */}
                                                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                                                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
                                                        <FireIcon className="w-3 h-3 mr-1" /> VIRAL
                                                    </span>
                                                    {isReady ? (
                                                        <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">READY</span>
                                                    ) : (
                                                        <span className="bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">HABIS</span>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="p-5 flex-grow flex flex-col bg-white rounded-b-2xl">
                                                <div className="text-xs text-[#fd8282] font-RalewayBold uppercase tracking-wider mb-1">
                                                    {product.category?.name}
                                                </div>
                                                <h3 className="text-lg font-RalewayBold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                                                <div className="text-xl font-bold text-gray-900 mt-auto pt-4">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.price)}
                                                </div>

                                                {/* Stock Info per Branch */}
                                                <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                                                    <p className="font-semibold text-gray-700 mb-2">Ketersediaan Cabang:</p>
                                                    {product.inventories && product.inventories.map(inv => (
                                                        <div key={inv.id} className="flex justify-between items-center">
                                                            <span>{inv.branch?.name}</span>
                                                            <span className={`font-bold ${inv.stock_quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                                {inv.stock_quantity > 0 ? `${inv.stock_quantity} pcs` : 'Kosong'}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="mt-4 pt-2">
                                                    <Link 
                                                        href="/katalog" 
                                                        className="w-full block text-center py-2.5 border border-[#fd8282] text-[#fd8282] rounded-lg font-bold hover:bg-[#fd8282] hover:text-white transition-colors"
                                                    >
                                                        Cari di Katalog
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <FireIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-RalewayBold text-gray-800 mb-2">Belum ada produk viral saat ini</h3>
                            <p className="text-gray-500">Cek kembali nanti untuk melihat produk-produk kecantikan yang sedang tren.</p>
                            <Link 
                                href="/katalog"
                                className="mt-6 inline-block px-6 py-2 bg-[#fd8282] text-white font-medium rounded-full hover:bg-red-500 transition-colors shadow-md"
                            >
                                Eksplorasi Katalog
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
