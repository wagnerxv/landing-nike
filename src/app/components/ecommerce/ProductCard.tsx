'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  badge?: string;
  badgeColor?: string;
  image: string;
  rating?: number;
  reviews?: number;
  colors?: string[];
  sizes?: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onQuickView 
}) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simular API call
      onAddToCart?.(product);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-nike-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="product-card group bg-white rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      {/* Imagem do produto */}
      <div className="relative aspect-square overflow-hidden bg-nike-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-4 left-4 ${product.badgeColor || 'bg-accent-600'} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}>
            {product.badge}
          </div>
        )}

        {/* Overlay com ações */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <button 
            onClick={() => onQuickView?.(product)}
            className="bg-white text-nike-black px-4 py-2 text-sm font-semibold rounded-lg hover:bg-nike-gray-100 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Vista Rápida
          </button>
          
          <button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className="bg-accent-600 text-white px-4 py-2 text-sm font-semibold rounded-lg hover:bg-accent-700 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            )}
            {isLoading ? 'Adicionando...' : 'Adicionar'}
          </button>
        </div>

        {/* Botão de favorito */}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-nike-gray-600 hover:text-accent-600 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Informações do produto */}
      <div className="p-6">
        {/* Categoria */}
        <p className="text-sm text-nike-gray-500 uppercase tracking-wider font-medium mb-2">
          {product.category}
        </p>

        {/* Nome do produto */}
        <h3 className="text-lg font-bold text-nike-black mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Avaliação */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-nike-gray-600">
              ({product.reviews || 0})
            </span>
          </div>
        )}

        {/* Cores disponíveis */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-nike-gray-600">Cores:</span>
            <div className="flex gap-1">
              {product.colors.slice(0, 4).map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
                    selectedColor === index ? 'border-nike-black scale-110' : 'border-nike-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Cor ${index + 1}`}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-nike-gray-500 ml-1">
                  +{product.colors.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Preço */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-accent-600">
            R$ {product.price}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-nike-gray-500 line-through">
              R$ {product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;