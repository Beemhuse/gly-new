import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onNavigate?: (path: string) => void;
  currentPath?: string;
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export default function Header({ onNavigate, currentPath = '/' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    onNavigate?.(path);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/20' : 'bg-transparent'
      }`}>
        <div className="section-padding">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => handleNavClick('/')} className="flex items-center gap-3 group">
              <div className={`relative transition-all duration-300 ${isScrolled ? 'w-14 h-14' : 'w-16 h-16'}`}>
                <img src="/images/gly-logo-new.png" alt="GLY" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">GLY</span>
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive(item.path) ? 'text-sky-500' : 'text-slate-600 hover:text-sky-500'
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-sky-500 rounded-full" />}
                </button>
              ))}
            </nav>

            <div className="hidden lg:block">
              <button onClick={() => handleNavClick('/contact')} className="btn-primary text-sm">Get in Touch</button>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 rounded-xl text-slate-900">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl" onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-24 left-4 right-4 bg-white rounded-2xl shadow-2xl p-6 transition-all duration-500 ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
        }`}>
          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                  isActive(item.path) ? 'bg-sky-50 text-sky-500' : 'text-slate-700 hover:bg-slate-50'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms' }}
              >
                <span className="font-medium">{item.label}</span>
                <ChevronRight size={18} className="text-slate-400" />
              </button>
            ))}
          </nav>
          <div className="mt-6 pt-6 border-t border-slate-100">
            <button onClick={() => handleNavClick('/contact')} className="w-full btn-primary">Get in Touch</button>
          </div>
        </div>
      </div>
    </>
  );
}
