import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  { icon: MapPin, title: 'Address', content: '7121 West Bostian Road', subContent: 'Woodinville, WA 98072' },
  { icon: Phone, title: 'Phone', content: '+1 607-233-4438', subContent: 'Mon-Fri, 8am-5pm PST' },
  { icon: Mail, title: 'Email', content: 'info@glyengineering.com', subContent: 'We reply within 24 hours' },
];

const departments = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'projects', label: 'Projects & Proposals' },
  { value: 'procurement', label: 'Procurement & Suppliers' },
  { value: 'careers', label: 'Careers & Recruitment' },
  { value: 'media', label: 'Media & Press' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', department: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Message sent!', { description: 'We will respond as soon as possible.' });
    setFormData({ name: '', email: '', phone: '', company: '', department: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div ref={contentRef} className="min-h-screen pt-20">
      <section className="py-20 geo-pattern">
        <div className="section-padding">
          <div className="max-w-4xl">
            <p className="label-premium mb-4 reveal-up">Contact Us</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 reveal-up">
              Let's Build<br /><span className="gradient-text">What's Next</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl reveal-up">
              Tell us what you're planning. We'll respond within two business days to discuss how GLY Engineering can help.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="section-padding">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow reveal-up">
                <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-sky-500" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{info.title}</h3>
                <p className="text-slate-700 font-medium">{info.content}</p>
                <p className="text-sm text-slate-400">{info.subContent}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 geo-pattern">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 reveal-up">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send Us a Message</h2>
              <p className="text-slate-500 mb-8">Fill out the form and we'll get back to you.</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="name">Full Name *</Label><Input id="name" required value={formData.name} onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))} placeholder="John Doe" className="h-12" /></div>
                  <div className="space-y-2"><Label htmlFor="email">Email *</Label><Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} placeholder="john@example.com" className="h-12" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} placeholder="+1 (555) 000-0000" className="h-12" /></div>
                  <div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" value={formData.company} onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))} placeholder="Your Company" className="h-12" /></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="department">Department</Label><Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}><SelectTrigger className="h-12"><SelectValue placeholder="Select department" /></SelectTrigger><SelectContent>{departments.map((d) => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}</SelectContent></Select></div>
                  <div className="space-y-2"><Label htmlFor="subject">Subject *</Label><Input id="subject" required value={formData.subject} onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))} placeholder="How can we help?" className="h-12" /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="message">Message *</Label><Textarea id="message" required rows={5} value={formData.message} onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))} placeholder="Tell us about your project..." className="resize-none" /></div>
                <button type="submit" disabled={isSubmitting} className="w-full btn-primary justify-center">
                  {isSubmitting ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</> : <>Send Message <Send size={18} /></>}
                </button>
              </form>
            </div>

            <div className="space-y-8 reveal-up">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="aspect-video bg-slate-100">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2683.558943238104!2d-122.0857!3d47.7589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDQ1JzMyLjAiTiAxMjLCsDA1JzA4LjUiVw!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="GLY Location" />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">GLY Engineering Headquarters</h3>
                  <p className="text-slate-500 text-sm">7121 West Bostian Road<br />Woodinville, WA 98072<br />United States</p>
                </div>
              </div>

              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="font-semibold text-lg mb-4">Other Ways to Reach Us</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"><Phone className="w-5 h-5 text-sky-400" /></div>
                    <div><p className="font-medium">Call Us</p><p className="text-white/60 text-sm">+1 607-233-4438<br />Mon-Fri, 8am-5pm PST</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center"><Mail className="w-5 h-5 text-sky-400" /></div>
                    <div><p className="font-medium">Email Us</p><p className="text-white/60 text-sm">info@glyengineering.com<br />We reply within 24 hours</p></div>
                  </div>
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
          <div className="max-w-3xl mx-auto text-center reveal-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
            <p className="text-slate-400 mb-8">Our team of experts is ready to discuss your requirements.</p>
            <a href="tel:+16072334438" className="px-6 py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-colors inline-flex items-center gap-2"><Phone size={18} /> Call Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}
