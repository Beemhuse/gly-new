import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Settings, ShoppingCart, Factory, HardHat, Wrench, Zap, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'engineering',
    icon: Settings,
    title: 'Engineering & Design',
    description: 'Our engineering team delivers innovative solutions across all disciplines.',
    items: ['Process Technology', 'HSE Design', 'Mechanical Engineering', 'Piping Design', 'Control Systems', 'Electrical Engineering', 'Pipeline Engineering', 'Civil/Structural', '3D/4D Modeling', 'Process Simulation'],
    image: '/images/service-engineering.jpg'
  },
  {
    id: 'procurement',
    icon: ShoppingCart,
    title: 'Procurement',
    description: 'Strategic supply chain management with global reach.',
    items: ['Strategic Sourcing', 'Vendor Management', 'Material Tracking', 'Contract Management', 'Logistics Coordination', 'Quality Assurance'],
    image: '/images/service-procurement.jpg'
  },
  {
    id: 'fabrication',
    icon: Factory,
    title: 'Fabrication',
    description: 'Shop-built modules optimized for transport and installation.',
    items: ['Process Modules', 'Pipe Rack Modules', 'Equipment Skids', 'Structural Steel', 'Pressure Vessels', 'Piping Spools'],
    image: '/images/service-fabrication.jpg'
  },
  {
    id: 'construction',
    icon: HardHat,
    title: 'Construction',
    description: 'Safe, predictable execution at scale across the USA.',
    items: ['Site Preparation', 'Foundation Work', 'Structural Erection', 'Equipment Installation', 'Piping Installation', 'E&I Work'],
    image: '/images/service-construction.jpg'
  },
  {
    id: 'maintenance',
    icon: Wrench,
    title: 'Maintenance',
    description: 'Comprehensive maintenance and reliability solutions.',
    items: ['Turnaround Planning', 'Reliability Programs', 'Asset Management', 'Sustaining Capital', 'Performance Reporting', 'Continuous Improvement'],
    image: '/images/service-maintenance.jpg'
  },
  {
    id: 'energy',
    icon: Zap,
    title: 'Energy Solutions',
    description: 'EPC for traditional and cleaner energy markets.',
    items: ['Oil & Gas', 'Petrochemicals', 'Power Generation', 'Renewable Energy', 'Carbon Capture', 'Energy Efficiency'],
    image: '/images/service-energy.jpg'
  }
];

interface ServicesProps {
  onNavigate?: (path: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [activeService, setActiveService] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.fromTo(el, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  const scrollToService = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveService(id);
    }
  };

  const handleNavigate = (path: string) => onNavigate?.(path);

  return (
    <div ref={contentRef} className="min-h-screen pt-20">
      <section className="py-20 geo-pattern">
        <div className="section-padding">
          <div className="max-w-4xl">
            <p className="label-premium mb-4 reveal-up">Solutions & Services</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 reveal-up">
              Integrated Solutions for<br /><span className="gradient-text">Complex Projects</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl reveal-up">
              From engineering through construction and commissioning, we deliver comprehensive EPCM services.
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-xl border-y border-slate-100 py-4 hidden lg:block">
        <div className="section-padding">
          <div className="flex items-center gap-2 overflow-x-auto">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => scrollToService(service.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeService === service.id ? 'bg-sky-500 text-white' : 'bg-slate-50 text-slate-600 hover:bg-sky-50 hover:text-sky-500'
                }`}
              >
                <service.icon size={16} />
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {services.map((service, index) => (
        <section key={service.id} id={service.id} className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'geo-pattern'}`}>
          <div className="section-padding">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-3 mb-4 reveal-up">
                  <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-sky-500" />
                  </div>
                  <span className="label-premium">Service {String(index + 1).padStart(2, '0')}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 reveal-up">{service.title}</h2>
                <p className="text-lg text-slate-600 mb-8 reveal-up">{service.description}</p>

                <div className="mb-8 reveal-up">
                  <h3 className="font-semibold text-slate-900 mb-4">Key Capabilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {service.items.map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-sm rounded-full flex items-center gap-1">
                        <CheckCircle size={14} className="text-sky-500" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <button onClick={() => handleNavigate('/contact')} className="btn-primary reveal-up">
                  Discuss This Service <ArrowRight size={18} />
                </button>
              </div>

              <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="rounded-3xl overflow-hidden shadow-xl sticky top-32 reveal-up">
                  <img src={service.image} alt={service.title} className="w-full h-[400px] lg:h-[500px] object-cover" />
                </div>
                <div className={`absolute -bottom-6 ${index % 2 === 1 ? '-right-6' : '-left-6'} w-32 h-32 border-2 border-sky-200 rounded-2xl -z-10`} />
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        </div>
        <div className="section-padding relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="label-premium mb-4 reveal-up">Get Started</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 reveal-up">Need a Custom Solution?</h2>
            <p className="text-slate-400 mb-8 reveal-up">Our team is ready to discuss your project requirements.</p>
            <div className="flex flex-wrap justify-center gap-4 reveal-up">
              <button onClick={() => handleNavigate('/contact')} className="btn-primary">Request a Consultation <ArrowRight size={18} /></button>
              <button onClick={() => handleNavigate('/projects')} className="px-6 py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors">View Our Projects</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
