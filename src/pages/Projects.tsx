import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Calendar, Filter, X, CheckCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

const industries = ['All', 'Oil & Gas', 'Petrochemical', 'Energy', 'Infrastructure', 'Manufacturing', 'Chemical'];
const services = ['All', 'Engineering', 'Procurement', 'Fabrication', 'Construction', 'Design', 'Maintenance'];



interface ProjectsProps {
  onNavigate?: (path: string) => void;
}

export default function Projects({ onNavigate }: ProjectsProps) {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedService, setSelectedService] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredProjects = projects.filter(p => {
    return (selectedIndustry === 'All' || p.industry === selectedIndustry) &&
           (selectedService === 'All' || p.service === selectedService);
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card');
    if (cards) {
      gsap.fromTo(cards, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.08, ease: 'power2.out' });
    }
  }, [filteredProjects]);

  const clearFilters = () => { setSelectedIndustry('All'); setSelectedService('All'); };
  const hasActiveFilters = selectedIndustry !== 'All' || selectedService !== 'All';
  const handleNavigate = (path: string) => onNavigate?.(path);

  return (
    <div ref={contentRef} className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-slate-900 py-16">
        <div className="section-padding">
          <div className="max-w-4xl reveal-up">
            <h1 className="text-3xl md:text-4xl font-medium text-white leading-relaxed">
              Explore our portfolio of completed projects across energy, infrastructure, and advanced manufacturing sectors.
            </h1>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="section-padding">
          <div className="reveal-up">
            {/* Industry Filter */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Filter size={18} />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              <span className="text-sm text-gray-500">Industry:</span>
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedIndustry === industry 
                      ? 'bg-sky-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>

            {/* Service Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-gray-500 ml-[88px]">Service:</span>
              {services.map((service) => (
                <button
                  key={service}
                  onClick={() => setSelectedService(service)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedService === service 
                      ? 'bg-sky-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {service}
                </button>
              ))}
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters} 
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-sky-500 ml-auto"
                >
                  <X size={14} /> Clear filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10">
        <div className="section-padding">
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)} 
                className="project-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <span className="px-3 py-1.5 bg-sky-500 text-white text-xs font-semibold rounded-full">
                      {project.industry}
                    </span>
                    <span className="flex items-center gap-1 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium rounded-full">
                      <Calendar size={12} />
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-sky-500 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <MapPin size={14} />
                    {project.location}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No projects match your selected filters.</p>
              <button onClick={clearFilters} className="btn-primary">Clear All Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-slate-900">
        <div className="section-padding">
          <div className="max-w-3xl mx-auto text-center reveal-up">
            <h2 className="text-3xl font-bold text-white mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-400 mb-8">
              Let's discuss how GLY Engineering can help deliver your next project with excellence.
            </p>
            <button onClick={() => handleNavigate('/contact')} className="btn-primary">
              Get In Touch <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <>
              {/* Header Image */}
              <div className="relative h-56">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="px-3 py-1 bg-sky-500 text-white text-xs font-semibold rounded-full mb-2 inline-block">
                    {selectedProject.industry}
                  </span>
                  <DialogTitle className="text-xl text-white font-bold">
                    {selectedProject.title}
                  </DialogTitle>
                </div>
              </div>

              <div className="p-6">
                <DialogDescription className="text-gray-600 text-sm mb-6">
                  {selectedProject.description}
                </DialogDescription>

                {/* Key Stats */}
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'Client', value: selectedProject.client },
                    { label: 'Location', value: selectedProject.location },
                    { label: 'Year', value: selectedProject.year },
                    { label: 'Duration', value: selectedProject.duration },
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-400 uppercase mb-1">{item.label}</p>
                      <p className="font-medium text-gray-900 text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Project Value */}
                <div className="bg-sky-50 rounded-lg p-4 mb-6 flex items-center justify-between">
                  <span className="text-gray-600 text-sm">Project Value</span>
                  <span className="text-xl font-bold text-sky-600">{selectedProject.value}</span>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Services Provided</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.services.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 text-sm">Key Outcomes</h4>
                  <ul className="space-y-2">
                    {selectedProject.outcomes.map((o, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-sky-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 text-sm">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <button 
                  onClick={() => { setSelectedProject(null); handleNavigate('/contact'); }} 
                  className="w-full btn-primary"
                >
                  Discuss a Similar Project <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
