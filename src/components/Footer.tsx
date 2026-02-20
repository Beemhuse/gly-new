import { MapPin, Phone, Mail, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

const services = [
  'Engineering & Design',
  'Procurement',
  'Fabrication',
  'Construction',
  'Maintenance',
  'Energy Solutions',
];

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (path: string) => onNavigate?.(path);

  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="section-padding relative z-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/gly-logo-new.png" alt="GLY" className="w-16 h-16 object-contain brightness-0 invert" />
              <span className="font-bold text-xl">GLY Engineering</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Engineering, Procurement, Fabrication, Construction, and Maintenance 
              for complex projects across the USA. Excellence since 2000.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-500 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sky-500 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button onClick={() => handleNavClick(link.path)} className="text-slate-400 hover:text-sky-400 transition-colors text-sm flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button onClick={() => handleNavClick('/services')} className="text-slate-400 hover:text-sky-400 transition-colors text-sm flex items-center gap-1 group">
                    {service}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-sky-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">7121 West Bostian Road<br />Woodinville, WA 98072</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-sky-400 flex-shrink-0" />
                <a href="tel:+16072334438" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">+1 607-233-4438</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-sky-400 flex-shrink-0" />
                <a href="mailto:info@glyengineering.com" className="text-slate-400 hover:text-sky-400 transition-colors text-sm">info@glyengineering.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} GLY Engineering. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => handleNavClick('/')} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy Policy</button>
            <button onClick={() => handleNavClick('/')} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
