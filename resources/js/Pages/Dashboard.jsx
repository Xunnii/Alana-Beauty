import AdminLayout from '@/Layouts/AdminLayout';
import { Head, usePage } from '@inertiajs/react';
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar
} from 'recharts';
import { 
    CurrencyDollarIcon, 
    ShoppingBagIcon, 
    ExclamationTriangleIcon,
    ArchiveBoxIcon
} from '@heroicons/react/24/outline';

const salesData = [
    { name: 'Senin', Rumbai: 4000000, AirDingin: 2400000 },
    { name: 'Selasa', Rumbai: 3000000, AirDingin: 1398000 },
    { name: 'Rabu', Rumbai: 2000000, AirDingin: 9800000 },
    { name: 'Kamis', Rumbai: 2780000, AirDingin: 3908000 },
    { name: 'Jumat', Rumbai: 1890000, AirDingin: 4800000 },
    { name: 'Sabtu', Rumbai: 2390000, AirDingin: 3800000 },
    { name: 'Minggu', Rumbai: 3490000, AirDingin: 4300000 },
];

const criticalStock = [
    { id: 1, product: 'Glad2Glow Skincare Set', branch: 'Rumbai', stock: 2, min: 5 },
    { id: 2, product: 'Skintific Mugwort Clay Mask', branch: 'Air Dingin', stock: 1, min: 3 },
    { id: 3, product: 'Wardah UV Shield', branch: 'Rumbai', stock: 4, min: 10 },
];

export default function Dashboard({ stats, recentMutations }) {
    const { auth } = usePage().props;
    const isOwner = auth.user.role === 'owner';

    // Format date helper
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    return (
        <AdminLayout header="Dashboard Ringkasan">
            <Head title="Dashboard" />

            <div className="space-y-6">
                
                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Produk (Katalog)</p>
                                <h3 className="text-2xl font-bold text-gray-800">{stats?.totalProducts || 0}</h3>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                <ShoppingBagIcon className="h-6 w-6 text-green-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-green-500 font-medium cursor-pointer hover:underline">Kelola Katalog Produk &rarr;</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover-lift">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Total Cabang Aktif</p>
                                <h3 className="text-2xl font-bold text-gray-800">{stats?.totalBranches || 0}</h3>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-blue-500 font-medium">Terhubung ke sistem</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-100 hover-lift">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500 mb-1">Stok Kritis</p>
                                <h3 className="text-2xl font-bold text-red-600">{stats?.lowStockItems || 0} Item</h3>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center animate-pulse">
                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm">
                            <span className="text-red-500 font-medium cursor-pointer hover:underline">Cek Menu Inventaris &rarr;</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Charts Section (Dummy Data for Demo) */}
                    <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-RalewayBold text-gray-800 mb-4">Grafik Penjualan Real-Time (Demo)</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                                    <YAxis tickFormatter={(value) => `Rp${value/1000000}M`} axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                                    <Tooltip formatter={(value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)} />
                                    <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                                    <Line type="monotone" dataKey="Rumbai" stroke="var(--color-primary)" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                                    <Line type="monotone" dataKey="AirDingin" name="Air Dingin" stroke="#3b82f6" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Mutations List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-RalewayBold text-gray-800 mb-4 flex items-center">
                            <ArchiveBoxIcon className="h-5 w-5 text-[var(--color-primary)] mr-2" />
                            Aktivitas Stok Terakhir
                        </h3>
                        <div className="space-y-4">
                            {recentMutations && recentMutations.length > 0 ? (
                                recentMutations.map((mutation) => (
                                    <div key={mutation.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-800 text-sm truncate max-w-[150px]">
                                                    {mutation.inventory?.product?.name || 'Produk'}
                                                </h4>
                                                <p className="text-xs text-gray-500 mt-1">Oleh: <span className="font-medium">{mutation.user?.name}</span></p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`inline-block px-2 py-1 text-xs font-bold rounded-md ${mutation.type === 'in' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {mutation.type === 'in' ? '+' : '-'}{mutation.quantity}
                                                </span>
                                                <p className="text-[10px] text-gray-400 mt-1">{formatDate(mutation.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6 text-gray-500 text-sm">Belum ada aktivitas stok.</div>
                            )}
                        </div>
                        <button className="w-full mt-4 text-sm text-[var(--color-primary)] font-medium hover:underline">
                            Lihat Semua Mutasi
                        </button>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
