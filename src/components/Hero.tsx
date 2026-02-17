import { SiteSettings } from '@/lib/supabase';
import { ArrowDown, Shield, Zap, HeadphonesIcon } from 'lucide-react';

interface HeroProps {
  settings: SiteSettings | null;
}

export function Hero({ settings }: HeroProps) {
  const whatsappUrl = settings?.whatsapp_number
    ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=Hola, quiero información sobre sus sistemas`
    : '#servicios';

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] animate-float" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-[120px] animate-float" style={{ animationDelay: '-3s' }} />
        <div className="absolute left-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px] animate-float" style={{ animationDelay: '-5s' }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(250, 75%, 55%) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {settings?.logo_url && (
            <img 
              src={settings.logo_url} 
              alt={settings.site_name}
              className="mx-auto mb-8 h-16 w-auto animate-fade-in"
            />
          )}
          
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2 mb-8 animate-fade-in">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Software que impulsa resultados</span>
          </div>

          <h1 className="mb-6 text-4xl font-black leading-[1.1] animate-fade-in md:text-6xl lg:text-7xl font-display tracking-tight">
            <span className="text-foreground">Automatiza tu negocio.</span>
            <br />
            <span className="gradient-text">Multiplica tus ganancias.</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground animate-fade-in md:text-xl leading-relaxed" style={{ animationDelay: '0.15s' }}>
            Sistemas profesionales diseñados para que vendas más, pierdas menos tiempo y tengas el control total de tu empresa desde cualquier dispositivo.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <a 
              href={whatsappUrl}
              target={settings?.whatsapp_number ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-primary px-8 py-4 font-bold text-primary-foreground shadow-glow transition-all hover:shadow-glow-lg hover:scale-[1.03] active:scale-[0.98] text-lg"
            >
              Solicitar demo gratis
            </a>
            <a 
              href="#servicios" 
              className="group inline-flex items-center gap-2 rounded-2xl border-2 border-border bg-card px-8 py-4 font-bold text-foreground transition-all hover:border-primary/30 hover:shadow-card"
            >
              Ver soluciones
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.45s' }}>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                <Shield className="h-5 w-5 text-secondary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">100% Seguro</p>
                <p className="text-xs text-muted-foreground">Datos protegidos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                <Zap className="h-5 w-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">Rápido</p>
                <p className="text-xs text-muted-foreground">Listo en minutos</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <HeadphonesIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">Soporte 24/7</p>
                <p className="text-xs text-muted-foreground">Siempre contigo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
