import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Settings, ShoppingCart, Factory, HardHat, Wrench, Zap, TrendingUp, Users, Globe, Award, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const brands = ['ExxonMobil', 'Chevron', 'Shell', 'BP', 'TotalEnergies', 'Dow Chemical', 'DuPont', 'BASF', 'Linde', 'Air Products', 'Phillips 66', 'Marathon', 'Valero', 'ConocoPhillips'];

const capabilities = [
  { icon: Settings, title: 'Engineering & Design', description: 'Process, mechanical, piping, electrical, controls', link: '/services' },
  { icon: ShoppingCart, title: 'Procurement', description: 'Strategic sourcing, materials, logistics', link: '/services' },
  { icon: Factory, title: 'Fabrication', description: 'Shop-built modules and assemblies', link: '/services' },
  { icon: HardHat, title: 'Construction', description: 'Field execution and commissioning', link: '/services' },
  { icon: Wrench, title: 'Maintenance', description: 'Turnarounds and reliability', link: '/services' },
  { icon: Zap, title: 'Energy Solutions', description: 'Traditional and clean energy', link: '/services' },
];

const stats = [
  { value: '75+', label: 'Years of Excellence', icon: Award },
  { value: '1,000+', label: 'Employees', icon: Users },
  { value: '6,000+', label: 'Suppliers', icon: Globe },
  { value: '$60B', label: 'Global Spend', icon: TrendingUp },
];

const projects = [
  { id: 1, title: 'Gulf Coast Chemical Expansion', category: 'Petrochemical', location: 'Texas, USA', image: '/images/project-chemical.jpg' },
  { id: 2, title: 'Midwest Refinery Upgrade', category: 'Oil & Gas', location: 'Illinois, USA', image: '/images/project-refinery.jpg' },
  { id: 3, title: 'Pipeline Infrastructure', category: 'Infrastructure', location: 'Multiple States', image: '/images/project-pipeline.jpg' },
];

interface HomeProps {
  onNavigate?: (path: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.5 });
      heroTl.fromTo('.hero-badge', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
        .fromTo('.hero-title', { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-image', { x: 100, opacity: 0, scale: 0.95 }, { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out' }, '-=0.8');

      gsap.fromTo('.stat-card', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      });

      gsap.fromTo('.service-card', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: servicesRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      });

      gsap.fromTo('.project-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: projectsRef.current, start: 'top 75%', toggleActions: 'play none none none' }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleNavigate = (path: string) => onNavigate?.(path);

  return (
    <div className="min-h-screen">
      <section ref={heroRef} className="relative min-h-screen flex items-center geo-pattern overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-100 to-blue-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-32 right-1/4 w-4 h-4 bg-sky-400 rounded-full animate-pulse" />
          <div className="absolute bottom-32 left-1/4 w-3 h-3 border-2 border-sky-300 rounded-full" />
        </div>

        <div className="section-padding relative z-10 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-sky-50 border border-sky-100 rounded-full mb-6">
                <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-sky-600">EPCM Excellence Since 2000</span>
              </div>
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] mb-6">
                Engineering,<br /><span className="gradient-text">Built to Deliver</span>
              </h1>
              <p className="hero-subtitle text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-xl">
                EPCM, modular fabrication, and field services—executed with precision for complex projects across the USA.
              </p>
              <div className="hero-cta flex flex-wrap gap-4">
                <button onClick={() => handleNavigate('/services')} className="btn-primary">Explore Solutions <ArrowRight size={18} /></button>
                <button onClick={() => handleNavigate('/projects')} className="btn-outline">View Projects</button>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="hero-image relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-300/50">
                  <img src="/images/hero-home.jpg" alt="GLY Engineering" className="w-full h-[400px] lg:h-[550px] object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center">
                      <Award className="w-7 h-7 text-sky-500" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-slate-900">25+</p>
                      <p className="text-sm text-slate-500">Years of Excellence</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-sky-200 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-sky-500 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-slate-100">
        <div className="section-padding mb-6">
          <p className="label-premium text-center">Trusted by Industry Leaders</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee" style={{ animation: 'marquee 40s linear infinite' }}>
            {[...brands, ...brands].map((brand, index) => (
              <div key={index} className="flex-shrink-0 px-8 py-3 mx-3 bg-slate-50 rounded-full hover:bg-sky-50 transition-colors cursor-pointer group">
                <span className="font-semibold text-slate-400 group-hover:text-sky-500 transition-colors whitespace-nowrap">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={statsRef} className="py-20 geo-pattern">
        <div className="section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-sky-500" />
                </div>
                <p className="text-3xl md:text-4xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={servicesRef} className="py-20 bg-white">
        <div className="section-padding">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="label-premium mb-4">Our Services</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Full-Service Capability</h2>
            <p className="text-slate-600">From concept to commissioning: engineering, procurement, fabrication, construction, and maintenance.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, index) => (
              <button key={index} onClick={() => handleNavigate(cap.link)} className="service-card card-premium p-6 text-left group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                    <cap.icon className="w-6 h-6 text-sky-500 group-hover:text-white transition-colors" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-500">{cap.description}</p>
              </button>
            ))}
          </div>

          <div className="text-center mt-12">
            <button onClick={() => handleNavigate('/services')} className="btn-primary">Explore All Services <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      <section ref={projectsRef} className="py-20 geo-pattern">
        <div className="section-padding">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="label-premium mb-4">Our Work</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">Featured Projects</h2>
            </div>
            <button onClick={() => handleNavigate('/projects')} className="btn-outline">View All Projects <ArrowRight size={18} /></button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <button key={project.id} onClick={() => handleNavigate('/projects')} className="project-card group text-left">
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[4/3]">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-sky-50 text-sky-600 text-xs font-semibold uppercase tracking-wider rounded-full">{project.category}</span>
                  <span className="text-slate-400 text-sm">{project.location}</span>
                </div>
                <h3 className="font-semibold text-lg text-slate-900 group-hover:text-sky-500 transition-colors">{project.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl" />
        </div>
        <div className="section-padding relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Ready to Build What's Next?</h2>
            <p className="text-slate-400 text-lg mb-8">Let's discuss how GLY Engineering can help deliver your project with excellence.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => handleNavigate('/contact')} className="btn-primary">Request a Consultation <ArrowRight size={18} /></button>
              <button onClick={() => handleNavigate('/careers')} className="px-6 py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors">Join Our Team</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
