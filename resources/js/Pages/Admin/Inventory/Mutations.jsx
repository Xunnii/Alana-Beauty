import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { ArrowDownRightIcon, ArrowUpRightIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

export default function MutationsIndex({ mutations }) {
    
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <AdminLayout header="Log Mutasi Stok">
            <Head title="Mutasi Stok" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-RalewayBold text-gray-800">Riwayat Pergerakan Barang</h2>
                    <p className="text-sm text-gray-500">Log aktivitas barang masuk, keluar, dan transfer antar cabang.</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tanggal</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Produk & Cabang</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Tipe</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Jumlah</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User / Keterangan</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mutations.map((log) => (
                                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(log.created_at)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{log.inventory?.product?.name || 'Produk Dihapus'}</div>
                                        <div className="text-xs text-gray-500">{log.inventory?.branch?.name || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {log.type === 'in' ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                <ArrowDownRightIcon className="w-3 h-3 mr-1" /> Masuk
                                            </span>
                                        ) : log.type === 'out' ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                <ArrowUpRightIcon className="w-3 h-3 mr-1" /> Keluar
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                <ArrowsRightLeftIcon className="w-3 h-3 mr-1" /> Transfer
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`text-sm font-bold ${log.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                                            {log.type === 'in' ? '+' : '-'}{log.quantity}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 font-medium">{log.user?.name || 'Sistem'}</div>
                                        <div className="text-xs text-gray-500">{log.notes || '-'}</div>
                                    </td>
                                </tr>
                            ))}
                            {mutations.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                        Belum ada data mutasi stok.
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
