import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Settings, ShoppingCart, Factory, HardHat, Wrench, Zap, Shield, Target, Users, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const serviceLinks = [
  { icon: Settings, title: 'Engineering & Design', description: 'Process technology, HSE design, mechanical, piping, control systems' },
  { icon: ShoppingCart, title: 'Procurement', description: 'International supply chain, strategic sourcing, logistics' },
  { icon: Factory, title: 'Fabrication', description: 'Modularization, shop-built modules, integrated approach' },
  { icon: HardHat, title: 'Construction', description: 'Execution across USA, mobilization, workforce management' },
  { icon: Wrench, title: 'Maintenance', description: 'Reliability consulting, turnarounds, sustaining capital' },
  { icon: Zap, title: 'Energy Solutions', description: 'EPC for energy markets, traditional and clean energy' },
];

const values = [
  { icon: Shield, title: 'Safety First', description: 'Safety is a precondition for every task, built into planning and daily leadership.' },
  { icon: Target, title: 'Quality Excellence', description: 'Our quality system ensures design intent from first drawing to commissioning.' },
  { icon: Users, title: 'Collaboration', description: 'We work as an integrated team, aligned on schedule, cost, and safety.' },
  { icon: CheckCircle, title: 'Accountability', description: 'We take ownership of outcomes with transparency and integrity.' },
];

interface AboutProps {
  onNavigate?: (path: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
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

  const handleNavigate = (path: string) => onNavigate?.(path);

  return (
    <div ref={contentRef} className="min-h-screen pt-20">
      <section className="py-20 geo-pattern">
        <div className="section-padding">
          <div className="max-w-4xl">
            <p className="label-premium mb-4 reveal-up">About Us</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 reveal-up">
              Engineering Excellence,<br /><span className="gradient-text">Delivered with Purpose</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl reveal-up">
              For nearly eight decades, GLY Engineering has been a trusted partner for complex industrial projects across the United States.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-premium mb-4 reveal-up">Who We Are</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 reveal-up">A Legacy of Industrial Innovation</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed reveal-up">
                <p>GLY Engineering is a leading EPCM company serving the energy, oil and gas, petrochemical, and infrastructure sectors across the United States.</p>
                <p>With nearly eight decades of experience, we have built a reputation for delivering complex projects on time, on budget, and with an unwavering commitment to safety and quality.</p>
                <p>Our USA-focused delivery model ensures local expertise and market knowledge on every project.</p>
              </div>
            </div>
            <div className="relative reveal-up">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img src="/images/about/about-us.png" alt="GLY Engineering Team" className="w-full h-[400px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-sky-200 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-sky-100 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 geo-pattern">
        <div className="section-padding">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="label-premium mb-4 reveal-up">What We Do</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 reveal-up">Integrated Services, Seamless Delivery</h2>
            <p className="text-slate-600 reveal-up">We plan, design, procure, fabricate, and build, integrating every phase to control cost, schedule, and quality.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceLinks.map((service, index) => (
              <div key={index} className="card-premium p-6 reveal-up">
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="font-semibold text-lg text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-500">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal-up">
            <button onClick={() => handleNavigate('/services')} className="btn-primary">View Full Service Details <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1 reveal-up">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img src="/images/about/how.jpg" alt="GLY Engineering Services" className="w-full h-[400px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-sky-200 rounded-2xl -z-10" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="label-premium mb-4 reveal-up">Our Approach</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 reveal-up">How We Work</h2>
              <div className="space-y-6 reveal-up">
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">EPCM Collaboration</h3>
                  <p className="text-slate-600">Our integrated approach brings engineering, procurement, and construction teams together from day one.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">Modular by Design</h3>
                  <p className="text-slate-600">We engineer for fabrication and transport, designing modules that minimize site labor.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-slate-900 mb-2">Commissioning Excellence</h3>
                  <p className="text-slate-600">We ensure smooth startup and handover with rigorous testing and quality assurance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        </div>
        <div className="section-padding relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="label-premium mb-4 reveal-up">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 reveal-up">Safety & Quality Positioning</h2>
            <p className="text-slate-400 reveal-up">Our commitment to HSE and quality excellence is embedded in everything we do.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-sky-500/50 transition-colors reveal-up">
                <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-sky-400" />
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 geo-pattern">
        <div className="section-padding">
          <div className="grid md:grid-cols-3 gap-6">
            <button onClick={() => handleNavigate('/services')} className="card-premium p-8 text-left group reveal-up">
              <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors">
                <Settings className="w-7 h-7 text-sky-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-2">Solutions & Services</h3>
              <p className="text-slate-500 mb-4">Explore our comprehensive range of engineering services.</p>
              <span className="text-sky-500 font-medium flex items-center gap-1">Learn More <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
            </button>

            <button onClick={() => handleNavigate('/projects')} className="card-premium p-8 text-left group reveal-up">
              <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors">
                <Factory className="w-7 h-7 text-sky-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-2">Our Projects</h3>
              <p className="text-slate-500 mb-4">See proof of execution through our portfolio.</p>
              <span className="text-sky-500 font-medium flex items-center gap-1">View Projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
            </button>

            <button onClick={() => handleNavigate('/contact')} className="card-premium p-8 text-left group reveal-up">
              <div className="w-14 h-14 bg-sky-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors">
                <Users className="w-7 h-7 text-sky-500 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-xl text-slate-900 mb-2">Start a Conversation</h3>
              <p className="text-slate-500 mb-4">Ready to discuss your project? Get in touch today.</p>
              <span className="text-sky-500 font-medium flex items-center gap-1">Contact Us <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
