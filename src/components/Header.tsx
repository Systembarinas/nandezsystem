import { useState, useEffect } from 'react';
import { SiteSettings } from '@/lib/supabase';
import { Menu, X, MessageCircle } from 'lucide-react';

interface HeaderProps {
  settings: SiteSettings | null;
}

export function Header({ settings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'border-b border-border bg-background/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
      <div className="container flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center gap-3">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt={settings.site_name} className="h-8 w-auto" />
          ) : (
            <span className="text-xl font-black gradient-text font-display">
              {settings?.site_name || 'Nandez Systems'}
            </span>
          )}
        </a>
        
        <nav className="hidden items-center gap-1 md:flex">
          <a href="#servicios" className="rounded-xl px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground hover:bg-muted">
            Soluciones
          </a>
          <a 
            href={`https://wa.me/${settings?.whatsapp_number || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 flex items-center gap-2 rounded-2xl bg-gradient-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-glow hover:scale-[1.03]"
          >
            <MessageCircle className="h-4 w-4" />
            Contactar
          </a>
        </nav>
        
        <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {isMenuOpen && (
        <nav className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="container flex flex-col gap-2 px-4 py-4">
            <a href="#servicios" className="rounded-xl px-4 py-3 font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-all" onClick={() => setIsMenuOpen(false)}>
              Soluciones
            </a>
            <a 
              href={`https://wa.me/${settings?.whatsapp_number || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-primary px-5 py-3 font-bold text-primary-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle className="h-4 w-4" />
              Contactar ahora
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
