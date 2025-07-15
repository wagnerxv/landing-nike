// src/components/common/LoadingScreen.tsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// ... (código do componente NikeLogo se o tiver aqui)

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const screenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add('loading');
    
    const tl = gsap.timeline({ onComplete });

    tl.to('.loading-text span', {
      duration: 0.8, y: 0, opacity: 1, stagger: 0.2, ease: 'power2.out',
    })
      .to('.nike-logo-loader', { duration: 1, scale: 1.2, ease: 'power2.inOut' }, '-=0.5')
      .to(screenRef.current, {
        duration: 0.8, opacity: 0, ease: 'power2.inOut',
        onComplete: () => {
          if (screenRef.current) {
            screenRef.current.style.display = 'none';
          }
          onComplete();
        }
      }, '+=0.5');

  }, [onComplete]);

  return (
    <div className="loading-screen" ref={screenRef}>
      {/* ... o seu JSX para o ecrã de loading ... */}
    </div>
  );
};

// GARANTA QUE ESTA LINHA EXISTE E ESTÁ CORRETA
export default LoadingScreen;