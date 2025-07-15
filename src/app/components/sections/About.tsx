import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const statsData = [
  { value: 50, label: 'Anos de Inovação', suffix: '+' },
  { value: 190, label: 'Países', suffix: '+' },
  { value: 1000, label: 'Atletas Patrocinados', suffix: '+' },
];

const featuresData = [
  { icon: 'fas fa-rocket', title: 'Tecnologia Air', description: 'Amortecimento revolucionário que redefine o conforto' },
  { icon: 'fas fa-leaf', title: 'Sustentabilidade', description: 'Compromisso com o futuro do planeta' },
  { icon: 'fas fa-trophy', title: 'Performance Elite', description: 'Desenvolvido com os melhores atletas do mundo' },
];

const About: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            gsap.utils.toArray('.stat-number').forEach(statEl => {
                const el = statEl as HTMLElement;
                const endValue = parseInt(el.dataset.value || '0');
                const suffix = el.dataset.suffix || '';

                gsap.from(el, {
                    textContent: 0,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                    },
                    onUpdate: function() {
                        el.textContent = Math.ceil(Number(this.targets()[0].textContent)) + suffix;
                    }
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-20 md:py-32 bg-bg-primary">
            <div className="container mx-auto px-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Text and Stats */}
                    <div className="about-text">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tighter">Inovação em Movimento</h2>
                        <p className="text-lg text-text-secondary mb-12 leading-relaxed">Há mais de 50 anos, a Nike tem sido pioneira em inovação esportiva, criando produtos que não apenas atendem às necessidades dos atletas, mas as superam.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                            {statsData.map(stat => (
                                <div key={stat.label} className="stat-item text-center">
                                    <span 
                                        className="stat-number block text-5xl font-black text-accent mb-2"
                                        data-value={stat.value}
                                        data-suffix={stat.suffix}
                                    >0{stat.suffix}</span>
                                    <span className="stat-label text-sm text-text-secondary uppercase tracking-widest">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Features */}
                    <div className="about-features flex flex-col gap-10">
                        {featuresData.map(feature => (
                            <div key={feature.title} className="feature-item flex gap-5 items-start">
                                <div className="feature-icon flex-shrink-0 w-16 h-16 bg-bg-secondary rounded-full flex items-center justify-center text-3xl text-accent">
                                    <i className={feature.icon}></i>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-text-secondary leading-relaxed">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;