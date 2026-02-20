import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
  isLoading: boolean;
  onComplete?: () => void;
}

export default function LoadingScreen({ isLoading, onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Initial animation - fade in logo and text
      const tl = gsap.timeline();
      
      tl.fromTo(logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
      )
      .fromTo(textRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(progressRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        '-=0.2'
      );

      // Progress animation
      gsap.to({}, {
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: function() {
          setProgress(Math.round(this.progress() * 100));
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isLoading && containerRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ onComplete: () => onComplete?.() });

        tl.to([progressRef.current, textRef.current],
          { opacity: 0, duration: 0.3, ease: 'power2.in' }
        )
        .to(logoRef.current,
          { scale: 0.9, opacity: 0, duration: 0.4, ease: 'power2.in' },
          '-=0.2'
        )
        .to(containerRef.current,
          { opacity: 0, duration: 0.3, ease: 'power2.inOut' }
        );
      }, containerRef);

      return () => ctx.revert();
    }
  }, [isLoading, onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-6">
          <img 
            src="/images/gly-logo-new.png" 
            alt="GLY Engineering" 
            className="w-24 h-24 object-contain"
          />
        </div>

        {/* Company Name */}
        <div ref={textRef} className="text-center mb-10">
          <h2 className="text-sm font-semibold text-gray-900 tracking-[0.3em] uppercase">
            GLY ENGINEERING
          </h2>
        </div>

        {/* Progress Bar */}
        <div ref={progressRef} className="flex flex-col items-center">
          <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-sky-500 rounded-full transition-all duration-100 ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
          <p className="text-gray-400 text-xs tracking-[0.2em] uppercase">
            LOADING
          </p>
        </div>
      </div>
    </div>
  );
}
