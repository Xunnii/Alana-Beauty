import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { 
    HomeIcon, 
    ArchiveBoxIcon, 
    ArrowsRightLeftIcon, 
    UserGroupIcon, 
    Bars3Icon, 
    XMarkIcon,
    ArrowLeftOnRectangleIcon,
    ChartBarIcon,
    ShoppingBagIcon
} from '@heroicons/react/24/outline';

export default function AdminLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const getNavItems = () => {
        const items = [
            { name: 'Dashboard', href: route('dashboard'), icon: ChartBarIcon, active: route().current('dashboard') },
        ];

        // Access control logic
        if (user.role === 'owner' || user.role === 'pengawas') {
            items.push(
                { name: 'Katalog Produk', href: route('admin.products.index'), icon: ShoppingBagIcon, active: route().current('admin.products.*') },
                { name: 'Inventaris', href: route('admin.inventory.index'), icon: ArchiveBoxIcon, active: route().current('admin.inventory.index') },
                { name: 'Mutasi Stok', href: route('admin.inventory.mutations'), icon: ArrowsRightLeftIcon, active: route().current('admin.inventory.mutations') },
            );
        }

        if (user.role === 'owner') {
            items.push(
                { name: 'Manajemen SDM', href: route('admin.users.index'), icon: UserGroupIcon, active: route().current('admin.users.*') },
            );
        }
        
        // Kasir
        if (user.role === 'kasir') {
            items.push(
                { name: 'Kasir', href: '#', icon: ArchiveBoxIcon, active: false }
            );
        }

        return items;
    };

    const navItems = getNavItems();

    return (
        <div className="flex h-screen bg-[var(--color-background)] font-Raleway overflow-hidden">
            {/* Sidebar Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-center h-20 border-b border-gray-100">
                    <Link href="/" className="font-Palisade text-2xl text-[var(--color-primary)] tracking-wider">
                        Alana Admin
                    </Link>
                </div>

                <div className="overflow-y-auto overflow-x-hidden flex-grow">
                    <ul className="flex flex-col py-4 space-y-1 px-4">
                        <li className="px-5">
                            <div className="flex flex-row items-center h-8">
                                <div className="text-sm font-light tracking-wide text-gray-400">Menu Utama</div>
                            </div>
                        </li>
                        
                        {navItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-[var(--color-primaryLight)] text-gray-600 hover:text-[var(--color-primary)] border-l-4 border-transparent hover:border-[var(--color-primary)] rounded-r-lg pr-6 transition-colors ${item.active ? 'bg-[var(--color-primaryLight)] border-[var(--color-primary)] text-[var(--color-primary)] font-bold' : ''}`}
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <item.icon className="h-5 w-5" />
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User info at bottom of sidebar */}
                <div className="border-t border-gray-100 p-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div className="ml-3 truncate">
                            <p className="text-sm font-RalewayBold text-gray-800">{user.name}</p>
                            <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 z-10">
                    <div className="flex items-center">
                        <button 
                            className="text-gray-500 hover:text-[var(--color-primary)] focus:outline-none md:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        
                        {header && (
                            <div className="ml-4 md:ml-0 font-RalewayBold text-xl text-gray-800">
                                {header}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center">
                        <div className="relative">
                            <Link 
                                href={route('logout')} 
                                method="post" 
                                as="button"
                                className="flex items-center text-sm text-gray-600 hover:text-red-500 transition-colors"
                            >
                                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-1" />
                                <span className="hidden sm:inline">Logout</span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Main section */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {usePage().props.flash?.success && (
                        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl relative animate-in fade-in slide-in-from-top-4 duration-300">
                            <span className="block sm:inline">{usePage().props.flash.success}</span>
                        </div>
                    )}
                    {usePage().props.flash?.error && (
                        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl relative animate-in fade-in slide-in-from-top-4 duration-300">
                            <span className="block sm:inline">{usePage().props.flash.error}</span>
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
