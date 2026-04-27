import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { 
    PlusCircleIcon, 
    MinusCircleIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function InventoryIndex({ inventories }) {
    const { auth } = usePage().props;
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionType, setActionType] = useState('in'); // 'in' or 'out'

    const { data, setData, post, processing, reset, errors } = useForm({
        quantity: 1,
        type: 'in',
        notes: ''
    });

    const openModal = (item, type) => {
        setSelectedItem(item);
        setActionType(type);
        setData({
            quantity: 1,
            type: type,
            notes: ''
        });
    };

    const closeModal = () => {
        setSelectedItem(null);
        reset();
    };

    const submitStockUpdate = (e) => {
        e.preventDefault();
        post(route('admin.inventory.update-stock', selectedItem.id), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <AdminLayout header="Manajemen Inventaris">
            <Head title="Inventaris" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-lg font-RalewayBold text-gray-800">Daftar Stok Produk</h2>
                        <p className="text-sm text-gray-500">Kelola ketersediaan produk per cabang</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Produk</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cabang</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stok Saat Ini</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {inventories.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{item.product?.name || 'Produk Tidak Ditemukan'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">{item.branch?.name || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-xl font-RalewayBold text-gray-800">{item.stock_quantity}</div>
                                        <div className="text-[10px] text-gray-400">Min: {item.min_stock_level}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {item.stock_quantity <= item.min_stock_level ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                <ExclamationTriangleIcon className="w-3 h-3 mr-1" /> Kritis
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Aman
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                        <button 
                                            onClick={() => openModal(item, 'in')}
                                            className="text-green-600 hover:text-green-900 mx-2 hover-lift inline-block"
                                            title="Tambah Stok (Barang Masuk)"
                                        >
                                            <PlusCircleIcon className="w-6 h-6" />
                                        </button>
                                        <button 
                                            onClick={() => openModal(item, 'out')}
                                            className="text-red-500 hover:text-red-700 mx-2 hover-lift inline-block"
                                            title="Kurangi Stok (Barang Keluar/Rusak)"
                                        >
                                            <MinusCircleIcon className="w-6 h-6" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {inventories.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        Belum ada data inventaris.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Update Stok */}
            {selectedItem && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={closeModal}>
                            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="relative z-10 inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={submitStockUpdate}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${actionType === 'in' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                            {actionType === 'in' ? <PlusCircleIcon className="h-6 w-6" /> : <MinusCircleIcon className="h-6 w-6" />}
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                            <h3 className="text-lg leading-6 font-RalewayBold text-gray-900">
                                                {actionType === 'in' ? 'Tambah Stok Masuk' : 'Kurangi Stok (Keluar/Rusak)'}
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500 mb-4">
                                                    Produk: <strong className="text-gray-800">{selectedItem.product?.name}</strong><br/>
                                                    Cabang: <strong className="text-gray-800">{selectedItem.branch?.name}</strong><br/>
                                                    Stok Saat Ini: <strong className="text-gray-800">{selectedItem.stock_quantity}</strong>
                                                </p>
                                                
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Jumlah (Quantity)</label>
                                                        <input 
                                                            type="number" 
                                                            min="1"
                                                            value={data.quantity} 
                                                            onChange={e => setData('quantity', parseInt(e.target.value))}
                                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                                                        />
                                                        {errors.quantity && <span className="text-red-500 text-xs mt-1">{errors.quantity}</span>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Catatan / Keterangan</label>
                                                        <textarea 
                                                            value={data.notes} 
                                                            onChange={e => setData('notes', e.target.value)}
                                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                                                            placeholder={actionType === 'in' ? "Misal: Penerimaan dari Supplier A" : "Misal: Barang kadaluarsa / terjual offline"}
                                                            rows="3"
                                                        ></textarea>
                                                        {errors.notes && <span className="text-red-500 text-xs mt-1">{errors.notes}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:opacity-90 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm ${actionType === 'in' ? 'bg-green-600' : 'bg-red-600'}`}
                                    >
                                        Simpan Perubahan
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={closeModal}
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
