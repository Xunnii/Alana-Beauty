import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function UserIndex({ users }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus staf ini?')) {
            destroy(route('admin.users.destroy', id));
        }
    };

    return (
        <AdminLayout header="Manajemen SDM">
            <Head title="Manajemen SDM" />

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-lg font-RalewayBold text-gray-800">Daftar Staf & Karyawan</h2>
                        <p className="text-sm text-gray-500">Kelola akun kasir dan pengawas cabang.</p>
                    </div>
                    <div>
                        <Link 
                            href={route('admin.users.create')} 
                            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-primaryHover)] transition-colors inline-flex items-center hover-lift"
                        >
                            <PlusIcon className="h-5 w-5 mr-1" />
                            Tambah Staf
                        </Link>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama Staf</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Penempatan</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((u) => (
                                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 flex-shrink-0 bg-[var(--color-primaryLight)] rounded-full flex items-center justify-center text-[var(--color-primary)] font-bold">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                                <div className="text-xs text-gray-500">{u.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                                            u.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                                            u.role === 'pengawas' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-600">{u.branch?.name || 'Semua Cabang'}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <Link 
                                                href={route('admin.users.edit', u.id)} 
                                                className="text-blue-600 hover:text-blue-900 bg-blue-50 p-2 rounded-lg"
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </Link>
                                            {u.role !== 'owner' && (
                                                <button 
                                                    onClick={() => handleDelete(u.id)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-lg"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                                        Belum ada staf lain yang terdaftar.
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
