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

    // Simple fade-in animation for navbar
    gsap.fromTo('#navbar', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );

    // Scroll state handler
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          behavior: 'auto' // Native scrolling
        });
      }
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header 
      id="navbar" 
      className={`fixed top-0 left-0 w-full h-16 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-surface backdrop-blur border-b border-border shadow-md' 
          : 'bg-surface/80 backdrop-blur'
      }`}
      role="banner"
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link 
          href="/"
          className="flex items-center transition-transform duration-150 hover:scale-105 z-10"
          aria-label="Nike - Home"
        >
          <NikeLogo className="w-12 h-6 text-primary" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:block" role="navigation" aria-label="Main navigation">
          <ul className="flex items-center gap-8">
            {[
              { href: '#home', label: 'Home' },
              { href: '#products', label: 'Products' },
              { href: '#collections', label: 'Collections' },
              { href: '#about', label: 'About' },
              { href: '#contact', label: 'Contact' }
            ].map((item) => (
              <li key={item.href}>
                <a 
                  href={item.href}
                  onClick={handleLinkClick}
                  className="relative text-primary font-medium text-sm py-2 px-1 transition-colors duration-150 hover:text-accent group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-200 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search Desktop */}
          <div className="hidden md:block relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 text-sm bg-surface border border-border rounded-lg focus:outline-none focus:border-accent transition-colors duration-150"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 p-2 text-secondary hover:text-primary transition-colors duration-150"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-secondary hover:text-primary transition-colors duration-150 rounded-lg hover:bg-surface-hover"
                aria-label="Search products"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile Search */}
          <button 
            className="md:hidden p-2 text-secondary hover:text-primary transition-colors duration-150 rounded-lg hover:bg-surface-hover"
            aria-label="Search products"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* Cart */}
          <button 
            onClick={onCartOpen}
            className="relative p-2 text-secondary hover:text-primary transition-colors duration-150 rounded-lg hover:bg-surface-hover"
            aria-label={`Shopping cart - ${cartItemsCount} items`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount > 9 ? '9+' : cartItemsCount}
              </span>
            )}
          </button>
          
          {/* User Menu */}
          {user ? (
            <div className="relative group">
              <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors duration-150 rounded-lg hover:bg-surface-hover">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="max-w-20 truncate">{user.name}</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface rounded-lg shadow-xl border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                <div className="py-2">
                  <a href="#" className="block px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150">My Account</a>
                  <a href="#" className="block px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150">My Orders</a>
                  <a href="#" className="block px-4 py-2 text-sm text-secondary hover:text-primary hover:bg-surface-hover transition-colors duration-150">Favorites</a>
                  <hr className="my-2 border-border" />
                  <button 
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-accent hover:bg-surface-hover transition-colors duration-150"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={onLoginOpen}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors duration-150 rounded-lg hover:bg-surface-hover"
              aria-label="Sign in"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Sign In</span>
            </button>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden flex flex-col gap-1 p-2 cursor-pointer z-[1001] rounded-lg hover:bg-surface-hover transition-colors duration-150" 
            onClick={onMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-all duration-200 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;