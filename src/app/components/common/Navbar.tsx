import React, { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

const NikeLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.525-.616-3.668-1.848C-.618 13.737-.618 12.505.618 11.58l1.456-1.232c1.456-1.232 3.668-1.848 6.347-1.848h15.579V7.8z"/>
    </svg>
);

interface NavbarProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const showAnim = gsap.from('#navbar', { 
      yPercent: -100,
      paused: true,
      duration: 0.2
    }).progress(1);
    
    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
      }
    });

    const st = ScrollTrigger.create({
      start: 'top -80px',
      end: 99999,
      toggleClass: { className: 'scrolled', targets: '#navbar' }
    });
    
    const style = document.createElement('style');
    style.innerHTML = `
      #navbar.scrolled {
        background-color: rgba(255, 255, 255, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      }
    `;
    document.head.appendChild(style);

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      document.head.removeChild(style);
    };
  }, []);

  const spanBaseClasses = "block w-6 h-0.5 bg-text-primary transition-all duration-300";

  return (
    <header id="navbar" className="fixed top-0 left-0 w-full h-header z-50 transition-all duration-300 backdrop-blur-xl bg-white/95 border-b border-black/5">
      <div className="container h-full flex items-center justify-between mx-auto px-5">
        <a href="#home"><NikeLogo className="w-[60px] h-[30px] text-primary" /></a>
        
        <ul className="hidden lg:flex list-none gap-12">
          <li><a href="#home" data-text="Home" className="nav-link-hover text-text-primary font-medium text-[15px] tracking-wide">Home</a></li>
          <li><a href="#products" data-text="Produtos" className="nav-link-hover text-text-primary font-medium text-[15px] tracking-wide">Produtos</a></li>
          <li><a href="#collections" data-text="Coleções" className="nav-link-hover text-text-primary font-medium text-[15px] tracking-wide">Coleções</a></li>
          <li><a href="#about" data-text="Sobre" className="nav-link-hover text-text-primary font-medium text-[15px] tracking-wide">Sobre</a></li>
          <li><a href="#contact" data-text="Contato" className="nav-link-hover text-text-primary font-medium text-[15px] tracking-wide">Contato</a></li>
        </ul>
        
        <div className="flex items-center gap-6">
          <button className="text-lg text-text-primary hover:text-accent transition-colors"><i className="fas fa-search"></i></button>
          <button className="relative text-lg text-text-primary hover:text-accent transition-colors">
            <i className="fas fa-shopping-bag"></i>
            <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-semibold w-[18px] h-[18px] rounded-full flex items-center justify-center">0</span>
          </button>
          
          <button className={`lg:hidden flex flex-col gap-1 cursor-pointer z-[1001]`} onClick={onMenuToggle}>
             <span className={`${spanBaseClasses} origin-top-left ${isMobileMenuOpen ? 'rotate-45 translate-x-[2px] -translate-y-[2px]' : ''}`}></span>
             <span className={`${spanBaseClasses} ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
             <span className={`${spanBaseClasses} origin-bottom-left ${isMobileMenuOpen ? '-rotate-45 translate-x-[2px] translate-y-[2px]' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;