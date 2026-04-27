import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ProductCreate({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        category_id: '',
        price: '',
        description: '',
        is_trending: false,
        image: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.products.store'));
    };

    return (
        <AdminLayout header="Tambah Produk Baru">
            <Head title="Tambah Produk" />

            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-RalewayBold text-gray-800">Formulir Master Produk</h2>
                    <p className="text-sm text-gray-500">Masukkan detail produk baru. Stok awal di setiap cabang akan otomatis diatur menjadi 0.</p>
                </div>

                <div className="p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                            <input 
                                type="text" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                                placeholder="Misal: Skintific 5X Ceramide"
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kategori</label>
                                <select 
                                    value={data.category_id} 
                                    onChange={e => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                                >
                                    <option value="">-- Pilih Kategori --</option>
                                    {categories.map(c => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                                {errors.category_id && <span className="text-red-500 text-xs mt-1">{errors.category_id}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Harga (Rp)</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    value={data.price} 
                                    onChange={e => setData('price', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                                    placeholder="Misal: 150000"
                                />
                                {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price}</span>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gambar Produk</label>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={e => setData('image', e.target.files[0])}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-[var(--color-primary)] hover:file:bg-red-100"
                            />
                            {errors.image && <span className="text-red-500 text-xs mt-1">{errors.image}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deskripsi Singkat</label>
                            <textarea 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                                rows="3"
                                placeholder="Jelaskan manfaat produk ini..."
                            ></textarea>
                            {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description}</span>}
                        </div>

                        <div className="flex items-center">
                            <input 
                                id="is_trending"
                                type="checkbox" 
                                checked={data.is_trending} 
                                onChange={e => setData('is_trending', e.target.checked)}
                                className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300 rounded"
                            />
                            <label htmlFor="is_trending" className="ml-2 block text-sm text-gray-900 font-medium">
                                Tandai sebagai Produk Viral 🔥
                            </label>
                        </div>
                        {errors.is_trending && <span className="text-red-500 text-xs mt-1">{errors.is_trending}</span>}

                        <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                            <Link 
                                href={route('admin.products.index')}
                                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[var(--color-primaryHover)] transition-colors disabled:opacity-50 shadow-sm hover-lift"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Produk'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
