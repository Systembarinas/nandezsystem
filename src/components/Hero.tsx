 import { SiteSettings } from '@/lib/supabase';
import heroBg from '@/assets/hero-bg.jpg';
 
 interface HeroProps {
   settings: SiteSettings | null;
 }
 
 export function Hero({ settings }: HeroProps) {
  const backgroundImage = settings?.hero_image_url || heroBg;
  
   return (
     <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
       {/* Background */}
       <div className="absolute inset-0">
        <img 
          src={backgroundImage} 
          alt="Hero background"
          className="h-full w-full object-cover opacity-40"
        />
         <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
       </div>
       
       {/* Animated background elements */}
       <div className="absolute inset-0 overflow-hidden">
         <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-float" />
         <div className="absolute -right-1/4 top-1/2 h-80 w-80 rounded-full bg-secondary/10 blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
       </div>
       
       {/* Content */}
       <div className="container relative z-10 px-4 text-center">
         {settings?.logo_url && (
           <img 
             src={settings.logo_url} 
             alt={settings.site_name}
             className="mx-auto mb-8 h-20 w-auto animate-fade-in"
           />
         )}
         <h1 className="mb-6 text-4xl font-bold leading-tight animate-fade-in md:text-6xl lg:text-7xl">
           <span className="gradient-text">{settings?.site_name || 'Nandez Systems'}</span>
         </h1>
         <p className="mx-auto max-w-2xl text-lg text-muted-foreground animate-fade-in md:text-xl" style={{ animationDelay: '0.2s' }}>
           {settings?.site_description || 'Soluciones tecnológicas para tu negocio'}
         </p>
         
         <div className="mt-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
           <a 
             href="#servicios" 
             className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-8 py-4 font-semibold text-primary-foreground transition-all hover:shadow-glow hover:scale-105"
           >
             Ver Sistemas
             <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
             </svg>
           </a>
         </div>
       </div>
     </section>
   );
 }