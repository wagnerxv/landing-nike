import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const collectionsData = [
  { number: '01', title: 'Air Max Legacy', description: 'Revolucionando o conforto desde 1987' },
  { number: '02', title: 'Jordan Heritage', description: 'O legado que transcende gerações' },
  { number: '03', title: 'React Innovation', description: 'Tecnologia que impulsiona o futuro' },
];

const Collections: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Parallax effect for background
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Animate collection items
      gsap.utils.toArray('.collection-item').forEach((item, i) => {
        gsap.from(item as HTMLElement, {
          scale: 0.8,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.2,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: 'top 85%'
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="collections" ref={sectionRef} className="relative py-20 md:py-32 text-secondary overflow-hidden">
      <div className="absolute inset-0 z-[-1]">
        <img ref={bgRef} src="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" alt="Nike Collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {collectionsData.map((col) => (
            <div key={col.number} className="collection-item text-center p-10 bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 hover:-translate-y-2.5 hover:bg-white/10">
              <div className="text-5xl font-black text-accent mb-5 leading-none">{col.number}</div>
              <h3 className="text-2xl font-bold mb-4">{col.title}</h3>
              <p className="opacity-80 mb-8">{col.description}</p>
              <button className="collection-btn relative overflow-hidden bg-transparent text-secondary border-2 border-secondary px-8 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-secondary hover:text-primary hover:-translate-y-0.5">
                Explorar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;