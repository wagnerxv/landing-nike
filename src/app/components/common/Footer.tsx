import React from 'react';

const NikeLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.525-.616-3.668-1.848C-.618 13.737-.618 12.505.618 11.58l1.456-1.232c1.456-1.232 3.668-1.848 6.347-1.848h15.579V7.8z"/>
  </svg>
);

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: 'Instagram', href: '#', label: 'Follow us on Instagram' },
    { icon: 'Twitter', href: '#', label: 'Follow us on Twitter' },
    { icon: 'Facebook', href: '#', label: 'Follow us on Facebook' },
    { icon: 'YouTube', href: '#', label: 'Subscribe to our YouTube' },
  ];

  const footerColumns = [
    { 
      title: 'Products', 
      links: [
        { label: 'Shoes', href: '#' },
        { label: 'Clothing', href: '#' },
        { label: 'Accessories', href: '#' },
        { label: 'Equipment', href: '#' }
      ]
    },
    { 
      title: 'Support', 
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Returns & Exchanges', href: '#' },
        { label: 'Size Guide', href: '#' },
        { label: 'Contact Us', href: '#' }
      ]
    },
    { 
      title: 'Company', 
      links: [
        { label: 'About Nike', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Sustainability', href: '#' },
        { label: 'Investors', href: '#' }
      ]
    },
  ];

  const SocialIcon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    const icons = {
      Instagram: (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      Twitter: (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      Facebook: (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      YouTube: (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    };
    
    return icons[name as keyof typeof icons] || null;
  };

  return (
    <footer id="contact" className="bg-surface border-t border-border pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#home" className="inline-block mb-6">
              <NikeLogo className="w-16 h-8 text-primary" />
            </a>
            <p className="text-h3 font-bold mb-6 text-primary">Just Do It.</p>
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.href} 
                  className="w-10 h-10 bg-surface-hover rounded-lg flex items-center justify-center text-secondary hover:text-accent hover:bg-accent/10 transition-all duration-150"
                  aria-label={link.label}
                >
                  <SocialIcon name={link.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerColumns.map((col, index) => (
            <div key={index}>
              <h4 className="text-base font-semibold mb-6 text-primary">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-secondary hover:text-primary transition-colors duration-150 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-tertiary text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Nike, Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-tertiary hover:text-secondary text-sm transition-colors duration-150">
              Privacy Policy
            </a>
            <a href="#" className="text-tertiary hover:text-secondary text-sm transition-colors duration-150">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;