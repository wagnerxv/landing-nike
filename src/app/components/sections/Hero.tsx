'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import ParticleCanvas from '../three/ParticleCanvas';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Inicializar animações do hero após o loading
    const initHeroAnimations = () => {
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.to('.hero-title .line', {
        duration: 1.2,
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: 'power3.out'
      })
      .to('.hero-subtitle', {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power2.out'
      }, '-=0.8')
      .to('.hero-cta button', {
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.5')
      .to('.hero-scroll', {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: 'power2.out'
      }, '-=0.3');
    };

    // Aguardar um pouco para garantir que o DOM está pronto
    const timer = setTimeout(initHeroAnimations, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-[-2]">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback para imagem se o vídeo falhar
            const target = e.target as HTMLVideoElement;
            target.style.display = 'none';
            const fallbackImg = document.createElement('img');
            fallbackImg.src = 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080';
            fallbackImg.className = 'w-full h-full object-cover';
            target.parentNode?.appendChild(fallbackImg);
          }}
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          {/* Fallback image */}
          <img 
            src="https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
            alt="Nike Hero Background" 
            className="w-full h-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20"></div>
      </div>
      
      {/* Partículas */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <ParticleCanvas />
      </div>

      {/* Conteúdo */}
      <div className="container text-center text-white z-10 max-w-4xl px-5 mx-auto">
        <h1 className="hero-title font-black text-5xl sm:text-7xl lg:text-8xl xl:text-[8rem] leading-[0.9] mb-8 tracking-tighter">
          <div className="overflow-hidden">
            <span className="line block opacity-0 translate-y-full">REVOLUÇÃO</span>
          </div>
          <div className="overflow-hidden">
            <span className="line block opacity-0 translate-y-full">EM MOVIMENTO</span>
          </div>
        </h1>
        <p className="hero-subtitle text-lg md:text-xl font-light mb-12 opacity-0 max-w-2xl mx-auto translate-y-8">
          Descubra a nova era do desempenho atlético com tecnologia que redefine limites
        </p>
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className="opacity-0 translate-y-8 btn-shine relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-red-600 text-white text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-lg rounded-lg">
            <span>Explorar Coleção</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <button className="opacity-0 translate-y-8 btn-shine relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-transparent text-white border-2 border-white text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-white hover:text-gray-900 hover:-translate-y-0.5 hover:shadow-lg rounded-lg">
            <span>Assistir Vídeo</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="hero-scroll opacity-0 translate-y-8 absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white">
        <div className="flex flex-col items-center gap-2.5 text-xs font-medium tracking-[2px] uppercase">
          <span>Scroll</span>
          <div className="w-px h-10 bg-white/60 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;