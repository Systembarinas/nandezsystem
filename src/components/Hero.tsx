import { SiteSettings } from '@/lib/supabase';
import heroBg from '@/assets/hero-bg.jpg';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  settings: SiteSettings | null;
}

export function Hero({ settings }: HeroProps) {
  const backgroundImage = settings?.hero_image_url || heroBg;

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Colorful gradient background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Background image with light overlay */}
      <div className="absolute inset-0">
        <img 
          src={backgroundImage} 
          alt="Hero background"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>
      
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-32 top-20 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute -right-32 bottom-20 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px] animate-float" style={{ animationDelay: '-2s' }} />
        <div className="absolute left-1/2 top-10 h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[80px] animate-float" style={{ animationDelay: '-4s' }} />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 text-center">
        {settings?.logo_url && (
          <img 
            src={settings.logo_url} 
            alt={settings.site_name}
            className="mx-auto mb-8 h-20 w-auto animate-fade-in drop-shadow-lg"
          />
        )}
        <h1 className="mb-6 text-5xl font-extrabold leading-tight animate-fade-in md:text-7xl lg:text-8xl font-display">
          <span className="gradient-text">{settings?.site_name || 'Nandez Systems'}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground animate-fade-in md:text-xl font-medium" style={{ animationDelay: '0.2s' }}>
          {settings?.site_description || 'Soluciones tecnológicas para tu negocio'}
        </p>
        
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <a 
            href="#servicios" 
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-primary px-10 py-4 font-bold text-primary-foreground shadow-glow transition-all hover:shadow-glow-lg hover:scale-105"
          >
            Ver Sistemas
            <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
