import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function ProductIndex({ products }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null,
    });

    const { delete: destroy } = useForm();

    const submitImport = (e) => {
        e.preventDefault();
        if (!data.file) {
            alert('Pilih file Excel terlebih dahulu!');
            return;
        }
        post(route('admin.products.import'), {
            onSuccess: () => reset('file'),
        });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini? Semua data stok di cabang juga akan ikut terhapus.')) {
            destroy(route('admin.products.destroy', id));
        }
    };

    return (
        <AdminLayout header="Katalog Produk">
            <Head title="Katalog Produk" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-lg font-RalewayBold text-gray-800">Daftar Produk</h2>
                        <p className="text-sm text-gray-500">Kelola master data produk Anda.</p>
                        <div className="mt-2 text-xs">
                            <a href={route('admin.products.template')} className="text-[var(--color-primary)] hover:underline">
                                &darr; Download Template Excel
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <form onSubmit={submitImport} className="flex items-center space-x-2">
                            <input 
                                type="file" 
                                accept=".xlsx,.xls,.csv" 
                                onChange={e => setData('file', e.target.files[0])}
                                className="text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 w-48" 
                            />
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50"
                            >
                                {processing ? 'Proses...' : 'Import'}
                            </button>
                        </form>
                        {errors.file && <div className="text-red-500 text-xs absolute mt-12">{errors.file}</div>}

                        <div className="h-6 w-px bg-gray-300"></div>

                        <Link 
                            href={route('admin.products.create')} 
                            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-primaryHover)] transition-colors inline-flex items-center shadow-sm hover-lift"
                        >
                            <PlusIcon className="h-5 w-5 mr-1" />
                            Tambah Produk
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Info Produk</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Harga</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status Viral</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                                {product.image ? (
                                                    <img className="h-10 w-10 object-cover" src={product.image} alt={product.name} />
                                                ) : (
                                                    <span className="text-gray-400 text-xs font-Palisade">NA</span>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                <div className="text-xs text-gray-500 truncate max-w-xs">{product.description || '-'}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">{product.category?.name || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-RalewayBold text-gray-800">
                                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(product.price)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {product.is_trending ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                Viral 🔥
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                Biasa
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <Link 
                                                href={route('admin.products.edit', product.id)} 
                                                className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-lg"
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                        Belum ada data produk. Silakan tambah produk baru.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
