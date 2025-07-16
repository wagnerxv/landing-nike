'use client';

import React, { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import Link from 'next/link';

const NikeLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-label="Nike Logo">
    <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.525-.616-3.668-1.848C-.618 13.737-.618 12.505.618 11.58l1.456-1.232c1.456-1.232 3.668-1.848 6.347-1.848h15.579V7.8z"/>
  </svg>
);

interface NavbarProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  cartItemsCount?: number;
  onCartOpen?: () => void;
  onLoginOpen?: () => void;
  user?: { name: string; email: string } | null;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onMenuToggle, 
  isMobileMenuOpen, 
  cartItemsCount = 0,
  onCartOpen,
  onLoginOpen,
  user,
  onLogout
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animação de entrada da navbar
    gsap.fromTo('#navbar', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    // Efeito de scroll para mostrar/esconder navbar
    const showAnim = gsap.from('#navbar', { 
      yPercent: -100,
      paused: true,
      duration: 0.3,
      ease: 'power2.out'
    }).progress(1);
    
    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse()
      }
    });

    // Mudança de estilo no scroll
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    
    if (targetId && targetId.startsWith('#')) {
      const element = document.querySelector(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Implementar lógica de busca
    }
  };

  const spanBaseClasses = "block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out";

  return (
    <header 
      id="navbar" 
      className={`fixed top-0 left-0 w-full h-20 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white/90 backdrop-blur-sm'
      }`}
      role="banner"
    >
      <div className="container h-full flex items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link 
          href="/"
          className="flex items-center transition-transform duration-200 hover:scale-105 z-10"
          aria-label="Nike - Página inicial"
        >
          <NikeLogo className="w-16 h-8 text-gray-900" />
        </Link>
        
        {/* Menu Desktop */}
        <nav className="hidden lg:block" role="navigation" aria-label="Menu principal">
          <ul className="flex items-center gap-8">
            {[
              { href: '#home', label: 'Home' },
              { href: '#products', label: 'Produtos' },
              { href: '#collections', label: 'Coleções' },
              { href: '#about', label: 'Sobre' },
              { href: '#contact', label: 'Contato' }
            ].map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href}
                  onClick={handleLinkClick}
                  className="relative text-gray-900 font-medium text-sm tracking-wide py-2 px-1 transition-colors duration-200 hover:text-red-600 group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Ações do usuário */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Busca Desktop */}
          <div className="hidden md:block relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar produtos..."
                  className="w-64 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
                aria-label="Buscar produtos"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Busca Mobile */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
            aria-label="Buscar produtos"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Carrinho */}
          <button 
            onClick={onCartOpen}
            className="relative p-2 text-gray-700 hover:text-red-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
            aria-label={`Carrinho de compras - ${cartItemsCount} itens`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                {cartItemsCount > 99 ? '99+' : cartItemsCount}
              </span>
            )}
          </button>
          
          {/* User Menu */}
          {user ? (
            <div className="relative group">
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200 rounded-lg hover:bg-gray-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="max-w-20 truncate">{user.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Minha Conta</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meus Pedidos</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Favoritos</a>
                  <hr className="my-2" />
                  <button 
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={onLoginOpen}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
              aria-label="Fazer login"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Login</span>
            </button>
          )}
          
          {/* Menu Mobile Toggle */}
          <button 
            className="lg:hidden flex flex-col gap-1 p-2 cursor-pointer z-[1001] rounded-md hover:bg-gray-100 transition-colors duration-200" 
            onClick={onMenuToggle}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`${spanBaseClasses} origin-top-left ${
              isMobileMenuOpen ? 'rotate-45 translate-x-[2px] -translate-y-[2px]' : ''
            }`}></span>
            <span className={`${spanBaseClasses} ${
              isMobileMenuOpen ? 'opacity-0 scale-0' : ''
            }`}></span>
            <span className={`${spanBaseClasses} origin-bottom-left ${
              isMobileMenuOpen ? '-rotate-45 translate-x-[2px] translate-y-[2px]' : ''
            }`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;