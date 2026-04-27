import MainLayout from '@/Layouts/MainLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Katalog({ products, categories, filters }) {
    const { data, setData, get, processing } = useForm({
        search: filters.search || '',
        category: filters.category || 'all',
    });

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('front.katalog'), { preserveState: true });
    };

    const handleCategoryChange = (categoryId) => {
        setData('category', categoryId);
        get(route('front.katalog', { category: categoryId, search: data.search }), { preserveState: true });
    };

    // Calculate total stock for a product across all branches
    const getTotalStock = (inventories) => {
        if (!inventories) return 0;
        return inventories.reduce((sum, inv) => sum + inv.stock_quantity, 0);
    };

    return (
        <MainLayout title="Katalog Produk - Alana Beauty">
            <div className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-Palisade text-[var(--color-text-main)] mb-4">Katalog Produk</h1>
                        <p className="text-gray-500 max-w-2xl mx-auto font-Raleway">
                            Eksplorasi koleksi lengkap kecantikan kami. Temukan produk skincare dan makeup yang cocok untuk Anda, dan cek ketersediaannya di cabang terdekat!
                        </p>
                    </div>

                    {/* Search & Filter Bar */}
                    <div className="mb-10">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            
                            {/* Categories (Desktop) */}
                            <div className="hidden md:flex space-x-2 overflow-x-auto pb-2">
                                <button
                                    onClick={() => handleCategoryChange('all')}
                                    className={`px-5 py-2 rounded-full text-sm font-RalewayBold transition-colors whitespace-nowrap ${data.category === 'all' ? 'bg-[var(--color-primary)] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    Semua Produk
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryChange(cat.id)}
                                        className={`px-5 py-2 rounded-full text-sm font-RalewayBold transition-colors whitespace-nowrap ${data.category == cat.id ? 'bg-[var(--color-primary)] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            {/* Mobile Filter Toggle */}
                            <div className="w-full flex md:hidden justify-between items-center mb-4">
                                <button 
                                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                                    className="flex items-center space-x-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-lg"
                                >
                                    <FunnelIcon className="h-5 w-5" />
                                    <span>Filter Kategori</span>
                                </button>
                            </div>

                            {/* Mobile Categories Dropdown */}
                            {isFilterOpen && (
                                <div className="w-full md:hidden flex flex-wrap gap-2 mb-4">
                                    <button
                                        onClick={() => handleCategoryChange('all')}
                                        className={`px-4 py-1.5 rounded-full text-sm font-RalewayBold transition-colors ${data.category === 'all' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        Semua
                                    </button>
                                    {categories.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => handleCategoryChange(cat.id)}
                                            className={`px-4 py-1.5 rounded-full text-sm font-RalewayBold transition-colors ${data.category == cat.id ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-600'}`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Search Form */}
                            <div className="w-full md:w-auto relative">
                                <form onSubmit={handleSearch}>
                                    <input 
                                        type="text" 
                                        placeholder="Cari produk..." 
                                        value={data.search}
                                        onChange={e => setData('search', e.target.value)}
                                        className="w-full md:w-64 pl-10 pr-4 py-2 border-gray-300 rounded-full focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] shadow-sm"
                                    />
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                                    <button type="submit" className="hidden">Search</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map(product => {
                                const totalStock = getTotalStock(product.inventories);
                                const isReady = totalStock > 0;
                                
                                return (
                                    <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover-lift flex flex-col h-full group">
                                        <div className="relative aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                                            {/* Dummy Image Placeholder if no real image */}
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="text-gray-300">
                                                    <span className="font-Palisade text-4xl opacity-30">ALANA</span>
                                                </div>
                                            )}

                                            {/* Badges */}
                                            <div className="absolute top-3 left-3 flex flex-col space-y-2">
                                                {product.is_trending ? (
                                                    <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">VIRAL 🔥</span>
                                                ) : null}
                                                {isReady ? (
                                                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">READY</span>
                                                ) : (
                                                    <span className="bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">HABIS</span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="p-5 flex-grow flex flex-col">
                                            <div className="text-xs text-[var(--color-primary)] font-RalewayBold uppercase tracking-wider mb-1">
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
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <MagnifyingGlassIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-RalewayBold text-gray-800 mb-2">Produk tidak ditemukan</h3>
                            <p className="text-gray-500">Maaf, tidak ada produk yang cocok dengan pencarian atau filter Anda.</p>
                            <button 
                                onClick={() => handleCategoryChange('all')}
                                className="mt-6 px-6 py-2 bg-[var(--color-primary)] text-white font-medium rounded-full hover:bg-[var(--color-primaryHover)] transition-colors"
                            >
                                Lihat Semua Produk
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
