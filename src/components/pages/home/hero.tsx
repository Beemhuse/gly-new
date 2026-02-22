import TypingHero from "@/components/TypingHero";
import { ArrowRight, Award } from "lucide-react";

interface HeroProps {
  onNavigate?: (path: string) => void;
}

export default function HomePageHero({ onNavigate }: HeroProps) {
  const handleNavigate = (path: string) => onNavigate?.(path);

  return (
    <section>
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video/gly-website.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img
            src="/images/hero-home.jpg"
            alt="GLY Engineering Background"
            className="w-full h-full object-cover"
          />
        </video>

        {/* Dark overlay with gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/85 to-slate-900/70" />

        {/* Subtle animated overlay pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]" />

        {/* Additional film grain effect */}
        <div className="absolute inset-0 opacity-20 mix-blend-overlay">
          <div className="absolute inset-0 bg-[url('/images/noise.svg')] bg-repeat opacity-30" />
        </div>
      </div>

      {/* Background decorative elements (adjusted for video background) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute top-32 right-1/4 w-4 h-4 bg-sky-400/50 rounded-full animate-ping" />
        <div className="absolute bottom-32 left-1/4 w-3 h-3 border-2 border-sky-300/30 rounded-full animate-pulse" />

        {/* Moving light effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-y-12 animate-[shine_8s_infinite]" />
      </div>

      <div className="section-padding relative z-10 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="order-2 lg:order-1">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-white">
                EPCM Excellence Since 2000
              </span>
            </div>

            <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
              Engineering,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-300">
                <TypingHero />
              </span>
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              EPCM, modular fabrication, and field services—executed with
              precision for complex projects across the USA.
            </p>
            <div className="hero-cta flex flex-wrap gap-4">
              <button
                onClick={() => handleNavigate("/services")}
                className="bg-gradient-to-r from-sky-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-sky-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 flex items-center gap-2"
              >
                Explore Solutions <ArrowRight size={18} />
              </button>
              <button
                onClick={() => handleNavigate("/projects")}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                View Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs font-medium text-white/50 uppercase tracking-widest">
          Scroll
        </span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-gradient-to-b from-sky-400 to-blue-400 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Add custom animation keyframes */}
      <style>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          50% {
            transform: translateX(100%) skewX(-12deg);
          }
          100% {
            transform: translateX(100%) skewX(-12deg);
          }
        }
      `}</style>
    </section>
  );
}
