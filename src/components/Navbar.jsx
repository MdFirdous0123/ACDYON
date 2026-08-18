import { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#final-cta' },
];

export default function Navbar({ onSignIn, onSignUp, dark, toggleDark }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#top" className="flex items-center gap-2.5 font-bold text-xl text-navy group">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                            <span className="text-white text-sm font-bold">A</span>
                        </div>
                        ApplyAI
                    </a>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-gray-600 hover:text-navy transition-colors font-medium relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop actions */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            type="button"
                            onClick={toggleDark}
                            className="p-2.5 rounded-xl text-gray-500 hover:text-navy hover:bg-gray-100 transition-all cursor-pointer"
                            aria-label="Toggle dark mode"
                        >
                            {dark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button
                            type="button"
                            className="text-sm text-gray-600 hover:text-navy transition-colors font-medium cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-100"
                            onClick={onSignIn}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={onSignUp}
                            className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-indigo-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-lg hover:shadow-primary/25 cursor-pointer"
                        >
                            Start for Free
                        </button>
                    </div>

                    {/* Mobile buttons */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleDark}
                            className="p-2 text-gray-500 hover:text-navy rounded-lg cursor-pointer"
                            aria-label="Toggle dark mode"
                        >
                            {dark ? <Sun size={18} /> : <Moon size={18} />}
                        </button>
                        <button
                            className="p-2 text-gray-600 hover:text-navy rounded-lg focus:outline-2 focus:outline-primary cursor-pointer"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-200/60 glass animate-fade-in">
                    <div className="px-4 py-4 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="block text-sm text-gray-600 hover:text-navy hover:bg-gray-50 font-medium py-2.5 px-3 rounded-lg transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        <hr className="border-gray-200 my-2" />
                        <button
                            type="button"
                            className="block w-full text-left text-sm text-gray-600 hover:text-navy hover:bg-gray-50 font-medium py-2.5 px-3 rounded-lg cursor-pointer transition-colors"
                            onClick={() => { setMenuOpen(false); onSignIn(); }}
                        >
                            Sign In
                        </button>
                        <button
                            type="button"
                            onClick={() => { setMenuOpen(false); onSignUp(); }}
                            className="block w-full text-center bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all cursor-pointer mt-1"
                        >
                            Start for Free
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
