'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout?: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(',', '.'));
      return total + (price * item.quantity);
    }, 0);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 200 ? 0 : 29.90;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 transform transition-transform duration-300 ease-in-out ${
        isAnimating ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Carrinho ({items.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Fechar carrinho"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-600 mb-4">Seu carrinho está vazio</p>
              <button
                onClick={onClose}
                className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  {/* Imagem do produto */}
                  <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Informações do produto */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                      {item.name}
                    </h3>
                    
                    {/* Variações */}
                    <div className="text-xs text-gray-600 mb-2">
                      {item.size && <span>Tamanho: {item.size}</span>}
                      {item.size && item.color && <span className="mx-2">•</span>}
                      {item.color && <span>Cor: {item.color}</span>}
                    </div>

                    {/* Preço e controles */}
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-red-600">
                        R$ {item.price}
                      </span>

                      {/* Controles de quantidade */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                          disabled={item.quantity <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-100 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Botão remover */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                    aria-label="Remover item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer com resumo e checkout */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Resumo de preços */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">R$ {formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Frete</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'Grátis' : `R$ ${formatPrice(shipping)}`}
                </span>
              </div>
              
              {shipping === 0 && (
                <p className="text-xs text-green-600">
                  ✓ Frete grátis para compras acima de R$ 200,00
                </p>
              )}
              
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-red-600">R$ {formatPrice(total)}</span>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="space-y-3">
              <button 
                onClick={onCheckout}
                className="w-full bg-red-600 text-white py-4 text-base font-bold rounded-full hover:bg-red-700 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                Finalizar Compra
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button
                onClick={onClose}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Continuar Comprando
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShoppingCart;