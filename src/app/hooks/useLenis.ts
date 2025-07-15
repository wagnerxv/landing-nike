// src/hooks/useLenis.ts

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Estendendo a interface Window para adicionar a propriedade lenis
declare global {
  interface Window {
    lenis: Lenis | null;
  }
}

// AQUI ESTÁ A CORREÇÃO -> Adicionamos 'export' antes de 'const'
export const useLenis = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const ticker = gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    requestAnimationFrame(raf);

    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(ticker); // Limpa o ticker do GSAP também
    };
  }, []);
};

export default useLenis;