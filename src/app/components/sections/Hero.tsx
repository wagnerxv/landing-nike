import React, { useEffect } from 'react';
import ParticleCanvas from '../three/ParticleCanvas'; // O componente de partículas

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-[-2]">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20"></div>
      </div>
      
      {/* Partículas */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        <ParticleCanvas />
      </div>

      {/* Conteúdo */}
      <div className="container text-center text-secondary z-10 max-w-4xl px-5 mx-auto">
        <h1 className="hero-title font-black text-5xl sm:text-7xl lg:text-8xl xl:text-[8rem] leading-[0.9] mb-8 tracking-tighter">
          {/* A animação de "reveal" com GSAP precisa destas divs */}
          <div className="overflow-hidden"><span className="line block opacity-0 -translate-y-full">REVOLUÇÃO</span></div>
          <div className="overflow-hidden"><span className="line block opacity-0 -translate-y-full">EM MOVIMENTO</span></div>
        </h1>
        <p className="hero-subtitle text-lg md:text-xl font-light mb-12 opacity-0 max-w-2xl mx-auto">
          Descubra a nova era do desempenho atlético com tecnologia que redefine limites
        </p>
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className="opacity-0 btn-shine relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-accent text-secondary text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-red-700 hover:-translate-y-0.5 hover:shadow-lg">
            <span>Explorar Coleção</span>
            <i className="fas fa-arrow-right"></i>
          </button>
          <button className="opacity-0 btn-shine relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-transparent text-secondary border-2 border-secondary text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-secondary hover:text-primary hover:-translate-y-0.5 hover:shadow-lg">
            <span>Assistir Vídeo</span>
            <i className="fas fa-play"></i>
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="hero-scroll opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 text-secondary">
        <div className="flex flex-col items-center gap-2.5 text-xs font-medium tracking-[2px] uppercase">
          <span>Scroll</span>
          <div className="w-px h-10 bg-secondary/60 animate-scroll-line"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;