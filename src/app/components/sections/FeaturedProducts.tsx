import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const productsData = [
  { id: 1, name: 'Nike Air Max 270', category: 'running', price: '699,99', oldPrice: '899,99', badge: 'Novo', image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 2, name: 'Air Jordan 1 Retro', category: 'basketball', price: '1.299,99', badge: 'Hot', badgeColor: 'bg-orange-500', image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 3, name: 'Nike Dunk Low', category: 'lifestyle', price: '549,99', image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
  { id: 4, name: 'Nike React Infinity', category: 'running', price: '799,99', badge: 'Lançamento', image: 'https://images.pexels.com/photos/1598509/pexels-photo-1598509.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop' },
];

type Product = typeof productsData[0];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="product-card group bg-bg-primary transition-transform duration-300 hover:-translate-y-2.5 opacity-0">
    <div className="relative aspect-square overflow-hidden mb-5">
      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      {product.badge && <div className={`absolute top-4 left-4 ${product.badgeColor || 'bg-accent'} text-secondary text-xs font-semibold px-3 py-1 uppercase tracking-wider`}>{product.badge}</div>}
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center gap-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <button className="bg-secondary text-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-accent hover:text-secondary transition-all duration-200 hover:-translate-y-0.5">Vista Rápida</button>
        <button className="bg-secondary text-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-accent hover:text-secondary transition-all duration-200 hover:-translate-y-0.5">Adicionar</button>
      </div>
    </div>
    <div className="product-info">
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-sm text-text-secondary mb-2.5 uppercase tracking-wider">{product.category}</p>
      <div className="flex items-center gap-2.5">
        <span className="text-base font-bold text-accent">R$ {product.price}</span>
        {product.oldPrice && <span className="text-sm text-text-light line-through">R$ {product.oldPrice}</span>}
      </div>
    </div>
  </div>
);

const FeaturedProducts: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef<HTMLElement>(null);

  const filteredProducts = filter === 'all' ? productsData : productsData.filter(p => p.category === filter);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
        gsap.utils.toArray('.product-card').forEach((card, i) => {
            gsap.fromTo(card as HTMLElement, { y: 60, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.8, delay: (i % 4) * 0.1, ease: 'power2.out',
                scrollTrigger: { trigger: card as HTMLElement, start: 'top 85%' }
            });
        });

        gsap.from(".section-title .title-line", {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: ".section-title",
                start: "top 80%",
            }
        });

    }, sectionRef);
    return () => ctx.revert();
  }, [filter]);

  const FilterButton: React.FC<{ label: string; filterKey: string; }> = ({ label, filterKey }) => (
    <button onClick={() => setFilter(filterKey)} className={`relative bg-none border-none text-base font-medium text-text-secondary cursor-pointer px-2 py-2.5 transition-colors duration-200 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:text-text-primary hover:after:w-full ${filter === filterKey ? 'text-text-primary after:w-full' : ''}`}>
      {label}
    </button>
  );

  return (
    <section id="products" ref={sectionRef} className="py-20 md:py-32 bg-bg-primary">
      <div className="container mx-auto px-5">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5 tracking-tighter">
            <span className="title-line block overflow-hidden">Produtos</span>
            <span className="title-line block overflow-hidden">em Destaque</span>
          </h2>
          <p className="text-lg text-text-secondary font-light">Inovação que move o mundo</p>
        </div>
        
        <div className="flex justify-center gap-4 sm:gap-8 mb-12 md:mb-16 flex-wrap">
          <FilterButton label="Todos" filterKey="all" />
          <FilterButton label="Running" filterKey="running" />
          <FilterButton label="Basketball" filterKey="basketball" />
          <FilterButton label="Lifestyle" filterKey="lifestyle" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;