'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../ecommerce/ProductCard';

const productsData = [
  { 
    id: 1, 
    name: 'Nike Air Max 270', 
    category: 'running', 
    price: '699,99', 
    oldPrice: '899,99', 
    badge: 'Novo', 
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    rating: 5,
    reviews: 128,
    colors: ['#000000', '#ffffff', '#ff0000', '#0000ff'],
    sizes: ['38', '39', '40', '41', '42', '43']
  },
  { 
    id: 2, 
    name: 'Air Jordan 1 Retro', 
    category: 'basketball', 
    price: '1.299,99', 
    badge: 'Hot', 
    badgeColor: 'bg-orange-500', 
    image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    rating: 5,
    reviews: 89,
    colors: ['#000000', '#ffffff', '#ff0000'],
    sizes: ['38', '39', '40', '41', '42', '43', '44']
  },
  { 
    id: 3, 
    name: 'Nike Dunk Low', 
    category: 'lifestyle', 
    price: '549,99', 
    image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    rating: 4,
    reviews: 67,
    colors: ['#000000', '#ffffff', '#008000'],
    sizes: ['37', '38', '39', '40', '41', '42']
  },
  { 
    id: 4, 
    name: 'Nike React Infinity', 
    category: 'running', 
    price: '799,99', 
    badge: 'Lançamento', 
    image: 'https://images.pexels.com/photos/1598509/pexels-photo-1598509.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    rating: 5,
    reviews: 45,
    colors: ['#000000', '#ffffff', '#ff0000', '#0000ff', '#008000'],
    sizes: ['38', '39', '40', '41', '42', '43']
  },
  { 
    id: 5, 
    name: 'Nike Air Force 1', 
    category: 'lifestyle', 
    price: '459,99', 
    oldPrice: '599,99',
    badge: 'Promoção',
    badgeColor: 'bg-green-500',
    image: 'https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    rating: 5,
    reviews: 234,
    colors: ['#ffffff', '#000000'],
    sizes: ['37', '38', '39', '40', '41', '42', '43']
  },
  { 
    id: 6, 
    name: 'Nike Zoom Pegasus', 
    category: 'running', 
    price: '649,99', 
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    rating: 4,
    reviews: 156,
    colors: ['#000000', '#0000ff', '#ff0000'],
    sizes: ['38', '39', '40', '41', '42', '43', '44']
  },
  { 
    id: 7, 
    name: 'Nike SB Dunk', 
    category: 'lifestyle', 
    price: '699,99', 
    badge: 'Edição Limitada',
    badgeColor: 'bg-purple-500',
    image: 'https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    rating: 5,
    reviews: 78,
    colors: ['#000000', '#ffffff', '#800080'],
    sizes: ['38', '39', '40', '41', '42']
  },
  { 
    id: 8, 
    name: 'Nike Blazer Mid', 
    category: 'lifestyle', 
    price: '589,99', 
    image: 'https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    rating: 4,
    reviews: 92,
    colors: ['#ffffff', '#000000', '#ff0000'],
    sizes: ['37', '38', '39', '40', '41', '42', '43']
  }
];

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  badgeColor?: string;
  image: string;
  rating: number;
  reviews: number;
  colors: string[];
  sizes: string[];
}

interface FeaturedProductsProps {
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onAddToCart, onQuickView }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProducts = filter === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === filter);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return parseFloat(a.price.replace(',', '.')) - parseFloat(b.price.replace(',', '.'));
      case 'price-high':
        return parseFloat(b.price.replace(',', '.')) - parseFloat(a.price.replace(',', '.'));
      case 'name':
        return a.name.localeCompare(b.name);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Animação do título
      gsap.from(".section-title .title-line", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ".section-title",
          start: "top 80%",
          toggleActions: 'play none none reverse'
        }
      });

      // Animação dos filtros
      gsap.from(".filter-buttons", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ".filter-buttons",
          start: "top 85%",
          toggleActions: 'play none none reverse'
        }
      });

      // Animação dos produtos
      gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.fromTo(card as HTMLElement, 
          { y: 60, opacity: 0, scale: 0.9 }, 
          {
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.8, 
            delay: (i % 4) * 0.1, 
            ease: 'back.out(1.7)',
            scrollTrigger: { 
              trigger: card as HTMLElement, 
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filter, sortBy]);

  const handleFilterChange = async (newFilter: string) => {
    if (newFilter === filter) return;
    
    setIsLoading(true);
    
    // Animação de saída dos produtos atuais
    await gsap.to('.product-card', {
      y: -30,
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    });
    
    setFilter(newFilter);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const FilterButton: React.FC<{ label: string; filterKey: string; count?: number }> = ({ 
    label, 
    filterKey, 
    count 
  }) => (
    <button 
      onClick={() => handleFilterChange(filterKey)}
      disabled={isLoading}
      className={`relative px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
        filter === filterKey 
          ? 'bg-red-600 text-white shadow-lg transform scale-105' 
          : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 border border-gray-300'
      }`}
    >
      <span>{label}</span>
      {count && (
        <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
          filter === filterKey 
            ? 'bg-white/20 text-white' 
            : 'bg-gray-200 text-gray-600'
        }`}>
          {count}
        </span>
      )}
      
      {/* Indicador ativo */}
      {filter === filterKey && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
      )}
    </button>
  );

  return (
    <section id="products" ref={sectionRef} className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-5">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight text-gray-900">
            <span className="title-line block overflow-hidden">Produtos</span>
            <span className="title-line block overflow-hidden">
              em <span className="text-red-600">Destaque</span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Descubra nossa seleção exclusiva de produtos com tecnologia de ponta e design inovador
          </p>
        </div>
        
        {/* Filtros e Ordenação */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12 md:mb-16">
          
          {/* Filtros por categoria */}
          <div className="filter-buttons flex flex-wrap justify-center gap-3">
            <FilterButton 
              label="Todos" 
              filterKey="all" 
              count={productsData.length}
            />
            <FilterButton 
              label="Running" 
              filterKey="running" 
              count={productsData.filter(p => p.category === 'running').length}
            />
            <FilterButton 
              label="Basketball" 
              filterKey="basketball" 
              count={productsData.filter(p => p.category === 'basketball').length}
            />
            <FilterButton 
              label="Lifestyle" 
              filterKey="lifestyle" 
              count={productsData.filter(p => p.category === 'lifestyle').length}
            />
          </div>

          {/* Ordenação */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-900 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
            >
              <option value="featured">Destaque</option>
              <option value="price-low">Menor Preço</option>
              <option value="price-high">Maior Preço</option>
              <option value="name">Nome A-Z</option>
              <option value="rating">Melhor Avaliado</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 animate-spin text-red-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600 font-medium">Carregando produtos...</span>
            </div>
          </div>
        )}
        
        {/* Grid de Produtos */}
        {!isLoading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
              {sortedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={onAddToCart}
                  onQuickView={onQuickView}
                />
              ))}
            </div>

            {/* Resultados */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Mostrando {sortedProducts.length} de {productsData.length} produtos
              </p>
              
              {/* Botão Ver Mais */}
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-transparent text-gray-700 border-2 border-gray-300 text-base font-semibold rounded-full hover:bg-gray-100 hover:border-gray-400 hover:shadow-md transition-all duration-300">
                Ver Mais Produtos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-24 h-24 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-600 mb-6">Tente ajustar os filtros ou explorar outras categorias</p>
            <button 
              onClick={() => handleFilterChange('all')}
              className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              Ver Todos os Produtos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;