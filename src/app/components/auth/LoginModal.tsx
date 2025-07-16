'use client';

import React, { useState, useEffect } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  onRegister: (email: string, password: string, name: string) => Promise<void>;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister
}) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset form when closing
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setErrors({});
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (!isLoginMode) {
      if (!formData.name) {
        newErrors.name = 'Nome é obrigatório';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Senhas não coincidem';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      if (isLoginMode) {
        await onLogin(formData.email, formData.password);
      } else {
        await onRegister(formData.email, formData.password, formData.name);
      }
      onClose();
    } catch (error) {
      setErrors({ 
        general: error instanceof Error ? error.message : 'Erro ao processar solicitação' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-300 scale-100">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-nike-gray-200">
            <h2 className="text-2xl font-bold text-nike-black">
              {isLoginMode ? 'Entrar' : 'Criar Conta'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-nike-gray-100 rounded-full transition-colors duration-200"
              aria-label="Fechar modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Error geral */}
            {errors.general && (
              <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
                <p className="text-sm text-error-600">{errors.general}</p>
              </div>
            )}

            {/* Nome (apenas no registro) */}
            {!isLoginMode && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-nike-black mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200 ${
                    errors.name ? 'border-error-500' : 'border-nike-gray-300'
                  }`}
                  placeholder="Digite seu nome completo"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-error-600">{errors.name}</p>
                )}
              </div>
            )}

            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-nike-black mb-2">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200 ${
                  errors.email ? 'border-error-500' : 'border-nike-gray-300'
                }`}
                placeholder="Digite seu e-mail"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-error-600">{errors.email}</p>
              )}
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-nike-black mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200 ${
                  errors.password ? 'border-error-500' : 'border-nike-gray-300'
                }`}
                placeholder="Digite sua senha"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-error-600">{errors.password}</p>
              )}
            </div>

            {/* Confirmar senha (apenas no registro) */}
            {!isLoginMode && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-nike-black mb-2">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-200 ${
                    errors.confirmPassword ? 'border-error-500' : 'border-nike-gray-300'
                  }`}
                  placeholder="Confirme sua senha"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-error-600">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Botão de submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary py-4 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </div>
              ) : (
                isLoginMode ? 'Entrar' : 'Criar Conta'
              )}
            </button>

            {/* Link para alternar modo */}
            <div className="text-center pt-4">
              <p className="text-sm text-nike-gray-600">
                {isLoginMode ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setErrors({});
                    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                  }}
                  className="ml-2 text-accent-600 hover:text-accent-700 font-medium transition-colors duration-200"
                >
                  {isLoginMode ? 'Criar conta' : 'Fazer login'}
                </button>
              </p>
            </div>

            {/* Esqueci minha senha (apenas no login) */}
            {isLoginMode && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-nike-gray-600 hover:text-accent-600 transition-colors duration-200"
                >
                  Esqueci minha senha
                </button>
              </div>
            )}
          </form>

          {/* Social Login */}
          <div className="px-6 pb-6">
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-nike-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-nike-gray-500">ou continue com</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-nike-gray-300 rounded-lg hover:bg-nike-gray-50 transition-colors duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-nike-gray-300 rounded-lg hover:bg-nike-gray-50 transition-colors duration-200">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;