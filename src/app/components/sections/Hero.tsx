'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });
    
    tl.fromTo('.hero-title .line', 
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    )
    .fromTo('.hero-subtitle', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, 
      '-=0.3'
    )
    .fromTo('.hero-cta button', 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, 
      '-=0.2'
    );
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
          alt="Nike Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="container text-center text-white z-10 max-w-4xl px-6 mx-auto">
        <h1 className="hero-title font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] mb-6 tracking-tight">
          <div className="overflow-hidden">
            <span className="line block opacity-0">JUST</span>
          </div>
          <div className="overflow-hidden">
            <span className="line block opacity-0">DO</span>
          </div>
          <div className="overflow-hidden">
            <span className="line block opacity-0 text-accent">IT</span>
          </div>
        </h1>
        
        <p className="hero-subtitle text-lg md:text-xl font-normal mb-10 opacity-0 max-w-2xl mx-auto text-gray-200">
          Unleash your potential with cutting-edge athletic innovation designed for champions
        </p>
        
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="opacity-0 btn btn-primary px-8 py-4 text-base font-semibold">
            <span>Explore Collection</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          
          <button className="opacity-0 btn btn-secondary px-8 py-4 text-base font-semibold border-white text-white hover:bg-white hover:text-black">
            <span>Watch Story</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70">
        <div className="flex flex-col items-center gap-2 text-xs font-medium tracking-wider uppercase">
          <span>Scroll</span>
          <div className="w-px h-8 bg-white/40"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;