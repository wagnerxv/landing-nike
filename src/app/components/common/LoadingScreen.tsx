'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NikeLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.525-.616-3.668-1.848C-.618 13.737-.618 12.505.618 11.58l1.456-1.232c1.456-1.232 3.668-1.848 6.347-1.848h15.579V7.8z"/>
  </svg>
);

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('loading');
    
    const tl = gsap.timeline({ 
      onComplete: () => {
        document.body.classList.remove('loading');
        onComplete();
      }
    });

    // Animação do texto de loading
    tl.to('.loading-text span', {
      duration: 0.8, 
      y: 0, 
      opacity: 1, 
      stagger: 0.2, 
      ease: 'power2.out',
    })
    .to('.nike-logo-loader', { 
      duration: 1, 
      scale: 1.2, 
      ease: 'power2.inOut' 
    }, '-=0.5')
    .to(screenRef.current, {
      duration: 0.8, 
      opacity: 0, 
      ease: 'power2.inOut',
      onComplete: () => {
        if (screenRef.current) {
          screenRef.current.style.display = 'none';
        }
      }
    }, '+=0.5');

  }, [onComplete]);

  return (
    <div 
      className="loading-screen fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-[9999]" 
      ref={screenRef}
    >
      <div className="loading-text mb-8">
        {['J', 'u', 's', 't', ' ', 'D', 'o', ' ', 'I', 't'].map((char, index) => (
          <span 
            key={index} 
            className="inline-block text-white text-4xl font-bold opacity-0 transform translate-y-5"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      <NikeLogo className="nike-logo-loader w-20 h-10 text-white transform scale-75" />
    </div>
  );
};

export default LoadingScreen;