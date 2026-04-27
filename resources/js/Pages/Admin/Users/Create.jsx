import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function UserCreate({ branches }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'kasir',
        branch_id: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.users.store'));
    };

    return (
        <AdminLayout header="Tambah Staf Baru">
            <Head title="Tambah Staf" />

            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h2 className="text-lg font-RalewayBold text-gray-800">Formulir Pendaftaran Staf</h2>
                    <p className="text-sm text-gray-500">Buat akun untuk kasir atau pengawas cabang.</p>
                </div>

                <div className="p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                            <input 
                                type="text" 
                                value={data.name} 
                                onChange={e => setData('name', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Login</label>
                            <input 
                                type="email" 
                                value={data.email} 
                                onChange={e => setData('email', e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input 
                                    type="password" 
                                    value={data.password} 
                                    onChange={e => setData('password', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                                />
                                {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
                                <input 
                                    type="password" 
                                    value={data.password_confirmation} 
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role Pekerjaan</label>
                                <select 
                                    value={data.role} 
                                    onChange={e => {
                                        setData('role', e.target.value);
                                        if (e.target.value === 'pengawas') setData('branch_id', '');
                                    }}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                                >
                                    <option value="kasir">Kasir</option>
                                    <option value="pengawas">Pengawas (Semua Cabang)</option>
                                </select>
                                {errors.role && <span className="text-red-500 text-xs mt-1">{errors.role}</span>}
                            </div>

                            {data.role === 'kasir' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Penempatan Cabang</label>
                                    <select 
                                        value={data.branch_id} 
                                        onChange={e => setData('branch_id', e.target.value)}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] sm:text-sm"
                                    >
                                        <option value="">-- Pilih Cabang --</option>
                                        {branches.map(b => (
                                            <option key={b.id} value={b.id}>{b.name}</option>
                                        ))}
                                    </select>
                                    {errors.branch_id && <span className="text-red-500 text-xs mt-1">{errors.branch_id}</span>}
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex justify-end space-x-3">
                            <Link 
                                href={route('admin.users.index')}
                                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </Link>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[var(--color-primaryHover)] transition-colors disabled:opacity-50 shadow-sm hover-lift"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Akun'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
