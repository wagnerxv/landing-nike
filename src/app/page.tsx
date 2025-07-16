'use client';

import { useState, useEffect } from 'react';
import { useLenis } from './hooks/useLenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Componentes
import LoadingScreen from './components/common/LoadingScreen';
import Navbar from './components/common/Navbar';
import Hero from './components/sections/Hero';
import FeaturedProducts from './components/sections/FeaturedProducts';
import Collections from './components/sections/Collections';
import VideoSection from './components/sections/VideoSection';
import About from './components/sections/About';
import Newsletter from './components/sections/Newsletter';
import Footer from './components/common/Footer';
import MobileMenu from './components/common/MobileMenu';
import ShoppingCart from './components/ecommerce/ShoppingCart';
import LoginModal from './components/auth/LoginModal';
import ProductDetail from './components/ecommerce/ProductDetail';
import Checkout from './components/ecommerce/Checkout';
import OrderHistory from './components/ecommerce/OrderHistory';

// Tipos
interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

interface Order {
  id: number;
  date: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: CartItem[];
  tracking?: string;
}

// Mock product data para ProductDetail
const mockProductDetail = {
  id: 1,
  name: 'Nike Air Max 270',
  category: 'Running',
  price: '699,99',
  oldPrice: '899,99',
  description: 'O Nike Air Max 270 oferece conforto durante todo o dia com a maior unidade Air Heel da Nike até hoje. Inspirado nos Air Max 180 e 93, o design apresenta cores e proporções que celebram o passado icônico da Nike.',
  features: [
    'Unidade Air Max no calcanhar para amortecimento',
    'Cabedal em mesh respirável',
    'Solado de borracha durável',
    'Design inspirado no lifestyle'
  ],
  specifications: {
    'Material': 'Mesh e sintético',
    'Solado': 'Borracha',
    'Tecnologia': 'Air Max',
    'Indicado para': 'Uso casual e corrida leve',
    'Peso': '310g (tam. 42)'
  },
  images: [
    'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop'
  ],
  colors: [
    { name: 'Preto', value: '#000000' },
    { name: 'Branco', value: '#ffffff' },
    { name: 'Vermelho', value: '#ff0000' },
    { name: 'Azul', value: '#0000ff' }
  ],
  sizes: ['38', '39', '40', '41', '42', '43', '44'],
  rating: 5,
  reviews: 128,
  inStock: true,
  stockQuantity: 15
};

export default function Home() {
  // Registrar plugins GSAP
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
  useLenis();

  // Estados
  const [loading, setLoading] = useState<boolean>(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isCartOpen, setCartOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isProductDetailOpen, setProductDetailOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [isOrderHistoryOpen, setOrderHistoryOpen] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Handlers
  const handleLoadingComplete = () => {
    setLoading(false);
    document.body.classList.remove('loading');
  };

  const handleAddToCart = (product: any, selectedSize?: string, selectedColor?: string, quantity: number = 1) => {
    const newItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image || product.images?.[0],
      quantity: quantity,
      size: selectedSize || 'M',
      color: selectedColor || 'Preto'
    };

    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.id === newItem.id && 
        item.size === newItem.size && 
        item.color === newItem.color
      );

      if (existingItem) {
        return prev.map(item =>
          item.id === existingItem.id && 
          item.size === existingItem.size && 
          item.color === existingItem.color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, newItem];
    });

    // Mostrar feedback visual
    showToast('Produto adicionado ao carrinho!', 'success');
  };

  const handleUpdateCartQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleLogin = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 1,
      name: email.split('@')[0],
      email: email
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    showToast('Login realizado com sucesso!', 'success');
  };

  const handleRegister = async (email: string, password: string, name: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: 1,
      name: name,
      email: email
    };
    
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    showToast('Conta criada com sucesso!', 'success');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    showToast('Logout realizado com sucesso!', 'success');
  };

  const handleQuickView = (product: any) => {
    setSelectedProduct(product);
    setProductDetailOpen(true);
  };

  const handleOrderComplete = (orderData: any) => {
    const newOrder: Order = {
      ...orderData,
      items: cartItems
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    showToast('Pedido realizado com sucesso!', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed top-24 right-4 ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('translate-x-full');
    }, 100);

    setTimeout(() => {
      toast.classList.add('translate-x-full');
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 3000);
  };

  // Efeitos
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (!loading) {
      const tl = gsap.timeline();
      tl.to('.hero-title .line', {
        duration: 1.2,
        y: 0,
        opacity: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
      })
      .to('.hero-subtitle', {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: 'power2.out'
      }, '-=0.8')
      .to('.hero-cta button', {
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.5')
      .to('.hero-scroll', {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: 'power2.out'
      }, '-=0.3');
    }
  }, [loading]);

  useEffect(() => {
    const addRippleEffect = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');
      
      if (button && !button.disabled) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.classList.add('ripple');

        button.appendChild(ripple);
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.remove();
          }
        }, 600);
      }
    };

    document.addEventListener('click', addRippleEffect);
    return () => document.removeEventListener('click', addRippleEffect);
  }, []);

  // Scroll to top button logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollButton = document.querySelector('.scroll-to-top');
      if (scrollButton) {
        if (window.scrollY > 300) {
          scrollButton.classList.add('visible');
        } else {
          scrollButton.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Main Content */}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        {/* Navigation */}
        <Navbar 
          onMenuToggle={() => setMobileMenuOpen(!isMobileMenuOpen)} 
          isMobileMenuOpen={isMobileMenuOpen}
          cartItemsCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
          onCartOpen={() => setCartOpen(true)}
          onLoginOpen={() => setLoginModalOpen(true)}
          user={user}
          onLogout={handleLogout}
        />
        
        {/* Mobile Menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />

        {/* Shopping Cart */}
        <ShoppingCart
          isOpen={isCartOpen}
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
        />

        {/* Login Modal */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setLoginModalOpen(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />

        {/* Product Detail Modal */}
        {isProductDetailOpen && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onClose={() => {
              setProductDetailOpen(false);
              setSelectedProduct(null);
            }}
          />
        )}

        {/* Checkout Modal */}
        <Checkout
          isOpen={isCheckoutOpen}
          onClose={() => setCheckoutOpen(false)}
          items={cartItems}
          onOrderComplete={handleOrderComplete}
        />

        {/* Order History Modal */}
        <OrderHistory
          isOpen={isOrderHistoryOpen}
          onClose={() => setOrderHistoryOpen(false)}
          orders={orders}
        />

        {/* Main Sections */}
        <main>
          <Hero />
          <FeaturedProducts 
            onAddToCart={handleAddToCart}
            onQuickView={handleQuickView}
          />
          <Collections />
          <VideoSection />
          <About />
          <Newsletter />
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        {/* Cart Button */}
        <button
          onClick={() => setCartOpen(true)}
          className="w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 hover:scale-110 transition-all duration-300 flex items-center justify-center relative"
          aria-label="Abrir carrinho"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
              {cartItems.reduce((total, item) => total + item.quantity, 0)}
            </span>
          )}
        </button>

        {/* Orders Button (only if user is logged in) */}
        {user && (
          <button
            onClick={() => setOrderHistoryOpen(true)}
            className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 flex items-center justify-center"
            aria-label="Meus pedidos"
            title="Meus Pedidos"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
        )}

        {/* Login/User Button */}
        <button
          onClick={() => user ? handleLogout() : setLoginModalOpen(true)}
          className="w-14 h-14 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-900 hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label={user ? 'Logout' : 'Login'}
          title={user ? `Olá, ${user.name}` : 'Fazer login'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 hover:scale-110 transition-all duration-300 flex items-center justify-center opacity-0 scroll-to-top"
          aria-label="Voltar ao topo"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>

      {/* Scroll to Top Button Styles */}
      <style jsx>{`
        .scroll-to-top {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        
        .scroll-to-top.visible {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </>
  );
}