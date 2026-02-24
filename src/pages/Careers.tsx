import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Search,
  MapPin,
  Briefcase,
  Clock,
  AlertCircle,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const jobOpenings = [
  {
    id: 1,
    title: "Senior Process Engineer",
    department: "Engineering",
    location: "Woodinville, WA",
    type: "Full-time",
    description: "Lead process design for petrochemical projects.",
  },
  {
    id: 2,
    title: "Project Manager",
    department: "Construction",
    location: "Houston, TX",
    type: "Full-time",
    description: "Manage large-scale industrial construction projects.",
  },
  {
    id: 3,
    title: "Procurement Specialist",
    department: "Procurement",
    location: "Remote",
    type: "Full-time",
    description: "Manage strategic sourcing and vendor relationships.",
  },
  {
    id: 4,
    title: "Safety Coordinator",
    department: "HSE",
    location: "Various Sites",
    type: "Full-time",
    description: "Ensure safety compliance across project sites.",
  },
  {
    id: 5,
    title: "Fabrication Supervisor",
    department: "Fabrication",
    location: "Louisiana",
    type: "Full-time",
    description: "Oversee module fabrication and quality control.",
  },
  {
    id: 6,
    title: "Electrical Engineer",
    department: "Engineering",
    location: "Woodinville, WA",
    type: "Full-time",
    description: "Design electrical systems for industrial facilities.",
  },
];

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<
    (typeof jobOpenings)[0] | null
  >(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    roleOfInterest: "",
    message: "",
  });
  const contentRef = useRef<HTMLDivElement>(null);

  const filteredJobs = jobOpenings.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, contentRef);
    return () => ctx.revert();
  }, []);

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted!", {
      description: "We will respond within 48 working hours.",
    });
    setShowApplicationForm(false);
    setApplicationData({
      fullName: "",
      email: "",
      phone: "",
      roleOfInterest: "",
      message: "",
    });
  };

  return (
    <div ref={contentRef} className="min-h-screen pt-20">
      <section className="py-20 geo-pattern">
        <div className="section-padding">
          <div className="max-w-4xl">
            <p className="label-premium mb-4 reveal-up">Careers</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6 reveal-up">
              Reinvent Tomorrow,
              <br />
              <span className="gradient-text">Deliver Outcomes</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl reveal-up">
              Join a team that solves hard problems and delivers real outcomes
              for complex challenges.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="label-premium mb-4 reveal-up">Our Purpose</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 reveal-up">
                Building a More Connected, Sustainable World
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed reveal-up">
                <p>
                  At GLY Engineering, we're challenging today to reinvent
                  tomorrow – delivering outcomes and solutions for the world’s
                  most complex challenges.
                </p>
                <p>
                  We’re more focused than ever on work that’s aligned with our
                  purpose — to create a more connected, sustainable world. We’re
                  building on our nearly eight decades of remarkable progress
                  through a newly streamlined portfolio with distinct strategies
                  in our end markets. From critical infrastructure to advanced
                  manufacturing, we help governments, cities, communities and
                  private sector clients rethink how they advance sustainability
                  and resiliency, cut carbon and environmental impacts, and
                  deliver a better life for future generations.
                </p>
                <p>
                  We’re always looking for dynamic and engaged people to join
                  our team. Bring your passion, your ingenuity and your vision.
                  Let's see the impact we can create, together.
                </p>
              </div>
            </div>
            <div className="relative reveal-up">
              <div className="rounded-3xl overflow-hidden shadow-xl">
                <img
                  src="/images/careers/team.jpg"
                  alt="GLY Engineering Careers"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-sky-200 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="label-premium mb-4 reveal-up">Open Positions</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 reveal-up">
                Search for Careers
              </h2>
            </div>

            <div className="relative mb-8 reveal-up">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by title, department, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
              />
            </div>

            <div className="space-y-4 reveal-up">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="bg-slate-50 rounded-xl p-6 cursor-pointer hover:bg-white hover:shadow-lg transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900 group-hover:text-sky-500 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-slate-500 mt-1">{job.description}</p>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Briefcase size={14} /> {job.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {job.type}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">
                  No positions match your search.
                </p>
              </div>
            )}

            <div className="mt-8 text-center reveal-up">
              <p className="text-slate-500 mb-4">
                Don't see a position that matches?
              </p>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="btn-primary"
              >
                Submit General Application <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto reveal-up">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-amber-800 mb-2">
                  Notice to Candidates on Recruitment
                </h3>
                <p className="text-amber-700 text-sm leading-relaxed">
                  We are committed to upholding ethical hiring practices through
                  our designated recruitment team overseeing the employment
                  scheme. For further clarification regarding your job
                  application, please <Button onClick> contact our Recruitment Team</Button>{" "}
                  Unit.
                 
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center reveal-up">
            <div className="w-12 h-12 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="font-semibold text-xl text-white mb-3">
              Equal Opportunity Employer
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
              GLY Engineering is an Equal Opportunity Employer. We celebrate
              diversity and are committed to creating an inclusive environment.
            </p>
          </div>
        </div>
      </section>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-2xl">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-slate-900">
                  {selectedJob.title}
                </DialogTitle>
                <DialogDescription className="text-slate-500">
                  {selectedJob.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Briefcase size={16} /> {selectedJob.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} /> {selectedJob.type}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setApplicationData((prev) => ({
                      ...prev,
                      roleOfInterest: selectedJob.title,
                    }));
                    setShowApplicationForm(true);
                  }}
                  className="btn-primary w-full"
                >
                  Apply for This Position{" "}
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-900">
              Submit Your Application
            </DialogTitle>
            <DialogDescription className="text-slate-500">
              Our recruitment team will respond within 48 working hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleApplicationSubmit} className="mt-4 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  required
                  value={applicationData.fullName}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={applicationData.email}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={applicationData.phone}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role of Interest *</Label>
                <Input
                  id="role"
                  required
                  value={applicationData.roleOfInterest}
                  onChange={(e) =>
                    setApplicationData((prev) => ({
                      ...prev,
                      roleOfInterest: e.target.value,
                    }))
                  }
                  placeholder="e.g., Senior Process Engineer"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={4}
                value={applicationData.message}
                onChange={(e) =>
                  setApplicationData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
                placeholder="Tell us about your experience..."
              />
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-4">
                By submitting, you agree to our privacy policy.
              </p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary flex-1">
                  Submit Application <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
