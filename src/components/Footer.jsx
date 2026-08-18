import { Globe, MessageCircle } from 'lucide-react';

const links = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#final-cta' },
    { label: 'Privacy', href: '#top' },
    { label: 'Terms', href: '#top' },
];

export default function Footer() {
    return (
        <footer className="border-t border-gray-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2.5 font-bold text-lg text-navy">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                            <span className="text-white text-xs font-bold">A</span>
                        </div>
                        ApplyAI
                    </div>

                    {/* Links */}
                    <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer navigation">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-gray-500 hover:text-navy transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    {/* Social + Copyright */}
                    <div className="flex items-center gap-4">
                        <a href="#top" className="text-gray-400 hover:text-navy transition-colors" aria-label="Twitter">
                            <MessageCircle size={18} />
                        </a>
                        <a href="#top" className="text-gray-400 hover:text-navy transition-colors" aria-label="Website">
                            <Globe size={18} />
                        </a>
                        <span className="text-xs text-gray-400 ml-2">
                            &copy; {new Date().getFullYear()} ApplyAI
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
