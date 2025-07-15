import React from 'react';

const NikeLogo: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.525-.616-3.668-1.848C-.618 13.737-.618 12.505.618 11.58l1.456-1.232c1.456-1.232 3.668-1.848 6.347-1.848h15.579V7.8z"/>
    </svg>
);

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: 'fab fa-instagram', href: '#' },
    { icon: 'fab fa-twitter', href: '#' },
    { icon: 'fab fa-facebook', href: '#' },
    { icon: 'fab fa-youtube', href: '#' },
  ];

  const footerColumns = [
    { title: 'Produtos', links: ['Tênis', 'Roupas', 'Acessórios', 'Equipamentos'] },
    { title: 'Suporte', links: ['Central de Ajuda', 'Trocas e Devoluções', 'Guia de Tamanhos', 'Contato'] },
    { title: 'Empresa', links: ['Sobre a Nike', 'Carreiras', 'Sustentabilidade', 'Investidores'] },
  ];

  return (
    <footer id="contact" className="bg-bg-dark text-secondary pt-20 pb-8">
      <div className="container mx-auto px-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20 mb-12">
          {/* Brand Column */}
          <div className="footer-brand">
            <a href="#home"><NikeLogo className="w-20 h-10 mb-5 text-secondary" /></a>
            <p className="text-lg font-semibold mb-8 opacity-80">Just Do It.</p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className="w-11 h-11 bg-white/10 rounded-full flex items-center justify-center text-secondary text-lg transition-all duration-300 hover:bg-accent hover:-translate-y-1">
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {footerColumns.map((col, index) => (
              <div key={index} className="footer-column">
                <h4 className="text-lg font-semibold mb-6">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, linkIndex) => (
                    <li key={linkIndex}><a href="#" className="text-white/70 hover:text-white transition-colors text-base">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-white/60 text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Nike, Inc. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Política de Privacidade</a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;