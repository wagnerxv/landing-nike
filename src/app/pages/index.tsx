import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useLenis } from '../hooks/useLenis'; // O hook useLenis continua o mesmo
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Importe os componentes (que vamos criar abaixo)
import LoadingScreen from '../components/common/LoadingScreen';
import Navbar from '../components/common/Navbar';
import Hero from '../components/sections/Hero';
import FeaturedProducts from '../components/sections/FeaturedProducts';
import Collections from '../components/sections/Collections';
import VideoSection from '../components/sections/VideoSection';
import About from '../components/sections/About';
import Newsletter from '../components/sections/Newsletter';
import Footer from '../components/common/Footer';
import MobileMenu from '../components/common/MobileMenu';

export default function Home() {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  useLenis();

  const [loading, setLoading] = useState<boolean>(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // A lógica de loading, GSAP e ripple continua a mesma da versão TypeScript anterior.
  // ... (cole aqui a lógica dos useEffects da resposta anterior)
   const handleLoadingComplete = () => {
    setLoading(false);
    document.body.classList.remove('loading');
  };

  useEffect(() => {
    if (!loading) {
        const tl = gsap.timeline();
        tl.to('.hero-title .line', {
            duration: 1.2, y: 0, opacity: 1, stagger: 0.2, ease: 'power3.out', delay: 0.2
        })
        .to('.hero-subtitle', { duration: 1, y: 0, opacity: 1, ease: 'power2.out' }, '-=0.8')
        .to('.hero-cta button', { duration: 0.8, y: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' }, '-=0.5')
        .to('.hero-scroll', { duration: 0.8, y: 0, opacity: 1, ease: 'power2.out' }, '-=0.3');
    }
  }, [loading]);

  useEffect(() => {
    const addRippleEffect = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const button = target.closest('button');
        if (button) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.classList.add('ripple'); // A classe .ripple está no globals.css

            button.appendChild(ripple);
            setTimeout(() => { ripple.remove(); }, 600);
        }
    };

    document.addEventListener('click', addRippleEffect);
    return () => document.removeEventListener('click', addRippleEffect);
  }, []);

  return (
    <>
      <Head>
        <title>Nike - Just Do It com Tailwind</title>
        <meta name="description" content="Landing Page da Nike recriada com Next.js e Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar onMenuToggle={() => setMobileMenuOpen(!isMobileMenuOpen)} isMobileMenuOpen={isMobileMenuOpen} />
        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <main>
          <Hero />
          <FeaturedProducts />
          <Collections />
          <VideoSection />
          <About />
          <Newsletter />
        </main>
        <Footer />
      </div>
    </>
  );
}