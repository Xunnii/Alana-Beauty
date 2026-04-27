import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    HomeIcon, 
    ShoppingBagIcon, 
    SparklesIcon, 
    UserCircleIcon,
    Bars3Icon,
    XMarkIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';

export default function Header() {
    const { auth } = usePage().props;
    const user = auth.user;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/', icon: HomeIcon },
        { name: 'Katalog Produk', href: '/katalog', icon: ShoppingBagIcon },
        { name: 'Trending Now', href: '/trending', icon: SparklesIcon },
        { name: 'Beauty Advisor', href: '/beauty-advisor', icon: ChatBubbleBottomCenterTextIcon },
    ];

    return (
        <header className="sticky top-0 z-50 w-full glass transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden">
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-700 hover:text-[var(--color-primary)] transition"
                        >
                            {mobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <Link href="/" className="font-Palisade text-2xl md:text-3xl text-[var(--color-primary)] tracking-wider">
                            Alana Beauty
                        </Link>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={link.href}
                                className="flex items-center text-[var(--color-text-main)] hover:text-[var(--color-primary)] font-RalewayBold text-sm uppercase tracking-widest transition-colors duration-200 border-b-2 border-transparent hover:border-[var(--color-primary)] py-2"
                            >
                                <link.icon className="h-4 w-4 mr-1.5" />
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        <Link href="/cart" className="text-gray-700 hover:text-[var(--color-primary)] transition hover-lift">
                            <ShoppingBagIcon className="h-6 w-6" />
                        </Link>
                        
                        <div className="relative">
                            {user ? (
                                <div>
                                    <button 
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center space-x-2 focus:outline-none hover-lift"
                                    >
                                        <div className="h-8 w-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-RalewayBold shadow-md">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                    </button>
                                    
                                    {/* Dropdown */}
                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 glass">
                                            <div className="px-4 py-2 border-b border-gray-100">
                                                <p className="text-sm text-gray-700 font-RalewayBold">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>
                                            {user.role !== 'kasir' && (
                                                <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)]">
                                                    Dashboard Admin
                                                </Link>
                                            )}
                                            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[var(--color-primary)]">
                                                Profil Saya
                                            </Link>
                                            <Link href={route('logout')} method="post" as="button" className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                                Keluar
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link href="/login" className="flex items-center text-gray-700 hover:text-[var(--color-primary)] transition font-RalewayBold hover-lift">
                                    <UserCircleIcon className="h-6 w-6 mr-1" />
                                    <span className="hidden md:inline">Masuk</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-RalewayBold text-gray-700 hover:text-[var(--color-primary)] hover:bg-gray-50"
                            >
                                <div className="flex items-center">
                                    <link.icon className="h-5 w-5 mr-3" />
                                    {link.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
