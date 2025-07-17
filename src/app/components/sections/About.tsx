'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const statsData = [
  { value: 50, label: 'Years of Innovation', suffix: '+', icon: '🚀' },
  { value: 190, label: 'Countries Served', suffix: '+', icon: '🌍' },
  { value: 1000, label: 'Sponsored Athletes', suffix: '+', icon: '🏆' },
  { value: 75, label: 'Million Customers', suffix: 'M+', icon: '❤️' },
];

const featuresData = [
  { 
    title: 'Air Technology', 
    description: 'Revolutionary cushioning system that delivers unmatched comfort and superior performance with every step.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  { 
    title: 'Sustainability', 
    description: 'Commitment to the planet\'s future through recycled materials and sustainable production processes.',
    icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  },
  { 
    title: 'Elite Performance', 
    description: 'Developed in partnership with world-class athletes to push beyond all performance boundaries.',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
  },
  { 
    title: 'Continuous Innovation', 
    description: 'Constant research and development to create the next generation of athletic products.',
    icon: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z'
  },
];

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate stat numbers
      gsap.utils.toArray('.stat-number').forEach((statEl) => {
        const el = statEl as HTMLElement;
        const endValue = parseInt(el.dataset.value || '0');
        const suffix = el.dataset.suffix || '';

        const obj = { value: 0 };

        gsap.to(obj, {
          value: endValue,
          duration: 1.5,
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

        // Animate stat cards
        gsap.fromTo(el.closest('.stat-item'), 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Animate feature items
      gsap.utils.toArray('.feature-item').forEach((item, i) => {
        gsap.fromTo(item as HTMLElement, 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item as HTMLElement,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      // Animate title
      gsap.fromTo('.about-title', 
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate description
      gsap.fromTo('.about-description', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-description',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-20 md:py-32 bg-surface relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Text and Stats Section */}
          <div className="about-content">
            <h2 className="about-title text-display mb-6 text-primary leading-tight">
              Innovation in 
              <span className="text-accent block">Motion</span>
            </h2>
            
            <p className="about-description text-body text-secondary mb-12 leading-relaxed">
              For over 50 years, Nike has pioneered athletic innovation, creating products that don't just meet athletes' needs but exceed them, inspiring generations to reach their maximum potential.
            </p>
            
            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6">
              {statsData.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="stat-item text-center p-6 card"
                >
                  <div className="text-2xl mb-3">{stat.icon}</div>
                  <span 
                    className="stat-number block text-2xl md:text-3xl font-black text-accent mb-2"
                    data-value={stat.value}
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix}
                  </span>
                  <span className="stat-label text-sm text-secondary font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="about-features space-y-6">
            {featuresData.map((feature, index) => (
              <div 
                key={feature.title} 
                className="feature-item group card p-6"
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200">
                    <svg 
                      className="w-6 h-6 text-accent" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d={feature.icon} />
                    </svg>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-h3 mb-3 text-primary group-hover:text-accent transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="btn btn-primary px-8 py-4">
            Learn Our Story
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;