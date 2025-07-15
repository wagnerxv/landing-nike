import React, { useState } from 'react';
import { gsap } from 'gsap';

const Newsletter: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || isSubmitting) return;

        setIsSubmitting(true);
        const button = e.currentTarget.querySelector('button');
        const originalText = 'Inscrever-se';

        gsap.to(button, { duration: 0.3, scale: 0.95, ease: 'power2.out' });

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            
            gsap.to(button, { duration: 0.3, scale: 1, ease: 'back.out(1.7)' });

            setTimeout(() => {
                setIsSubmitted(false);
                setEmail('');
            }, 2000);
        }, 1500);
    };

    return (
        <section className="py-20 md:py-24 bg-bg-dark text-secondary">
            <div className="container mx-auto px-5 text-center">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-5">Fique por Dentro</h2>
                    <p className="text-lg opacity-80 mb-12">Receba as últimas novidades, lançamentos exclusivos e ofertas especiais.</p>
                    
                    <form onSubmit={handleSubmit} className="newsletter-form">
                        <div className="flex flex-col sm:flex-row max-w-lg mx-auto">
                            <input 
                                type="email" 
                                placeholder="Seu melhor e-mail" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-grow px-6 py-4 text-base bg-secondary text-primary outline-none placeholder-text-light"
                            />
                            <button 
                                type="submit" 
                                disabled={isSubmitting || isSubmitted}
                                className={`relative overflow-hidden flex items-center justify-center gap-2.5 px-8 py-4 bg-accent text-secondary text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${isSubmitting || isSubmitted ? 'cursor-not-allowed' : 'hover:bg-red-700 hover:-translate-y-0.5'}`}
                                style={{ backgroundColor: isSubmitted ? '#10b981' : '' }}
                            >
                                <span>
                                    {isSubmitting ? 'Inscrevendo...' : isSubmitted ? 'Inscrito!' : 'Inscrever-se'}
                                </span>
                                {!isSubmitted && <i className="fas fa-arrow-right"></i>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;