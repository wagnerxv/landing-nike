'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const statsData = [
  { value: 50, label: 'Anos de Inovação', suffix: '+', icon: '🚀' },
  { value: 190, label: 'Países Atendidos', suffix: '+', icon: '🌍' },
  { value: 1000, label: 'Atletas Patrocinados', suffix: '+', icon: '🏆' },
  { value: 75, label: 'Milhões de Clientes', suffix: 'M+', icon: '❤️' },
];

const featuresData = [
  { 
    icon: 'M13 10V3L4 14h7v7l9-11h-7z', 
    title: 'Tecnologia Air', 
    description: 'Sistema de amortecimento revolucionário que oferece conforto incomparável e performance superior em cada passo.',
    color: 'text-blue-600'
  },
  { 
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z', 
    title: 'Sustentabilidade', 
    description: 'Compromisso com o futuro do planeta através de materiais reciclados e processos de produção sustentáveis.',
    color: 'text-green-600'
  },
  { 
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z', 
    title: 'Performance Elite', 
    description: 'Desenvolvido em parceria com os melhores atletas do mundo para superar todos os limites de performance.',
    color: 'text-red-600'
  },
  { 
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z', 
    title: 'Inovação Contínua', 
    description: 'Pesquisa e desenvolvimento constante para criar as próximas gerações de produtos esportivos.',
    color: 'text-purple-600'
  },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animação dos números das estatísticas - CORRIGIDA
      gsap.utils.toArray('.stat-number').forEach((statEl) => {
        const el = statEl as HTMLElement;
        const endValue = parseInt(el.dataset.value || '0');
        const suffix = el.dataset.suffix || '';

        // Criar objeto para animar o valor
        const obj = { value: 0 };

        gsap.to(obj, {
          value: endValue,
          duration: 2,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.ceil(obj.value) + suffix;
          },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });

        // Animação de entrada do card
        gsap.from(el.closest('.stat-item'), {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Animação dos cards de features
      gsap.utils.toArray('.feature-item').forEach((item, i) => {
        gsap.from(item as HTMLElement, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item as HTMLElement,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Animação do título principal
      gsap.from('.about-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animação do texto descritivo
      gsap.from('.about-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-description',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });

      // Efeito parallax sutil no background
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-5 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Seção de texto e estatísticas */}
          <div className="about-content">
            <h2 className="about-title text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tight text-gray-900 leading-tight">
              Inovação em 
              <span className="text-red-600 block">Movimento</span>
            </h2>
            
            <p className="about-description text-lg md:text-xl text-gray-600 mb-12 leading-relaxed">
              Há mais de 50 anos, a Nike tem sido pioneira em inovação esportiva, 
              criando produtos que não apenas atendem às necessidades dos atletas, 
              mas as superam, inspirando gerações a alcançar seu potencial máximo.
            </p>
            
            {/* Estatísticas */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 md:gap-8">
              {statsData.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="stat-item text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-3xl mb-3">{stat.icon}</div>
                  <span 
                    className="stat-number block text-3xl md:text-4xl font-black text-red-600 mb-2"
                    data-value={stat.value}
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix}
                  </span>
                  <span className="stat-label text-sm md:text-base text-gray-600 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de features */}
          <div className="about-features space-y-8">
            {featuresData.map((feature, index) => (
              <div 
                key={feature.title} 
                className="feature-item group flex gap-6 items-start p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`feature-icon flex-shrink-0 w-16 h-16 ${feature.color} bg-gradient-to-br from-current to-current opacity-10 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-110 transition-transform duration-300`}>
                  <svg 
                    className={`w-8 h-8 ${feature.color} relative z-10`} 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d={feature.icon} />
                  </svg>
                  <div className={`absolute inset-0 ${feature.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white text-base font-semibold rounded-full hover:bg-red-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            Conheça Nossa História
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;