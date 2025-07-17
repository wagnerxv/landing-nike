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
    price: '699.99', 
    oldPrice: '899.99', 
    badge: 'New', 
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
    price: '1299.99', 
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
    price: '549.99', 
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
    price: '799.99', 
    badge: 'Launch', 
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
    price: '459.99', 
    oldPrice: '599.99',
    badge: 'Sale',
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
    price: '649.99', 
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
    price: '699.99', 
    badge: 'Limited',
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
    price: '589.99', 
    image: 'https://images.pexels.com/photos/1598506/pexels-photo-1598506.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
    rating: 4,
    reviews: 92,
    colors: ['#ffffff', '#000000', '#ff0000'],
    sizes: ['37', '38', '39', '40', '41', '42', '43']
  }
];

interface FeaturedProductsProps {
  onAddToCart?: (product: any) => void;
  onQuickView?: (product: any) => void;
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
        return parseFloat(a.price) - parseFloat(b.price);
      case 'price-high':
        return parseFloat(b.price) - parseFloat(a.price);
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
      // Title animation
      gsap.fromTo(".section-title", 
        { y: 40, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ".section-title",
            start: "top 80%",
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Filter buttons animation
      gsap.fromTo(".filter-buttons", 
        { y: 30, opacity: 0 },
        {
          y: 0, 
          opacity: 1, 
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ".filter-buttons",
            start: "top 85%",
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Product cards animation
      gsap.utils.toArray('.product-card').forEach((card, i) => {
        gsap.fromTo(card as HTMLElement, 
          { y: 40, opacity: 0 }, 
          {
            y: 0, 
            opacity: 1,
            duration: 0.5, 
            delay: (i % 4) * 0.1, 
            ease: 'power2.out',
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
    
    // Quick fade out
    await gsap.to('.product-card', {
      opacity: 0,
      y: -20,
      duration: 0.2,
      stagger: 0.03,
      ease: 'power2.in'
    });
    
    setFilter(newFilter);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 200);
  };

  const FilterButton: React.FC<{ label: string; filterKey: string; count?: number }> = ({ 
    label, 
    filterKey, 
    count 
  }) => (
    <button 
      onClick={() => handleFilterChange(filterKey)}
      disabled={isLoading}
      className={`relative px-6 py-3 text-sm font-semibold rounded-lg transition-all duration-150 disabled:opacity-50 ${
        filter === filterKey 
          ? 'bg-accent text-white' 
          : 'bg-surface text-secondary hover:bg-surface-hover hover:text-primary border border-border'
      }`}
    >
      <span>{label}</span>
      {count && (
        <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
          filter === filterKey 
            ? 'bg-white/20 text-white' 
            : 'bg-surface-hover text-tertiary'
        }`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <section id="products" ref={sectionRef} className="py-20 md:py-32 bg-primary">
      <div className="container">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="section-title text-h1 mb-4 text-primary">
            Featured <span className="text-accent">Products</span>
          </h2>
          <p className="text-body text-secondary max-w-2xl mx-auto">
            Discover our curated selection of premium athletic gear designed for peak performance
          </p>
        </div>
        
        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-12">
          
          {/* Category Filters */}
          <div className="filter-buttons flex flex-wrap justify-center gap-3">
            <FilterButton 
              label="All" 
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

          {/* Sort */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-secondary font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input px-4 py-2 text-sm min-w-[140px]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 animate-spin text-accent" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-secondary font-medium">Loading products...</span>
            </div>
          </div>
        )}
        
        {/* Products Grid */}
        {!isLoading && (
          <>
            <div className="grid-auto-fit">
              {sortedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <ProductCard 
                    product={product}
                    onAddToCart={onAddToCart}
                    onQuickView={onQuickView}
                  />
                </div>
              ))}
            </div>

            {/* Results Info */}
            <div className="text-center mt-12">
              <p className="text-secondary mb-6">
                Showing {sortedProducts.length} of {productsData.length} products
              </p>
              
              <button className="btn btn-secondary px-8 py-3">
                Load More Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && sortedProducts.length === 0 && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 text-tertiary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-h3 text-primary mb-2">No products found</h3>
            <p className="text-secondary mb-6">Try adjusting your filters or explore other categories</p>
            <button 
              onClick={() => handleFilterChange('all')}
              className="btn btn-primary"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;