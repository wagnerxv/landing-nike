import React, { useEffect } from 'react';

declare global {
  interface Window {
    lenis?: {
      scrollTo: (target: string, options?: { offset?: number; duration?: number }) => void;
    };
  }
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
    
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    onClose();
    
    setTimeout(() => {
        if (window.lenis && targetId) {
            window.lenis.scrollTo(targetId, { offset: -80, duration: 1.5 });
        } else if (targetId) {
            const element = document.querySelector(targetId);
            if(element) element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 300); // Delay to allow menu to close visually
  };

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen);
  }, [isOpen]);

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-bg-dark z-[999] transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-center h-full">
        <ul className="flex flex-col items-center gap-8 text-center">
            <li><a href="#home" onClick={handleLinkClick} className="text-secondary text-3xl font-bold hover:text-accent transition-colors">Home</a></li>
            <li><a href="#products" onClick={handleLinkClick} className="text-secondary text-3xl font-bold hover:text-accent transition-colors">Produtos</a></li>
            <li><a href="#collections" onClick={handleLinkClick} className="text-secondary text-3xl font-bold hover:text-accent transition-colors">Coleções</a></li>
            <li><a href="#about" onClick={handleLinkClick} className="text-secondary text-3xl font-bold hover:text-accent transition-colors">Sobre</a></li>
            <li><a href="#contact" onClick={handleLinkClick} className="text-secondary text-3xl font-bold hover:text-accent transition-colors">Contato</a></li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;