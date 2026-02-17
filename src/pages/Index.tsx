import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ServiceCard } from '@/components/ServiceCard';
import { ServiceModal } from '@/components/ServiceModal';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { Footer } from '@/components/Footer';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { useServices } from '@/hooks/useServices';
import { Service } from '@/lib/supabase';
import { Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';

const Index = () => {
  const { settings, loading: settingsLoading } = useSiteSettings();
  const { services, loading: servicesLoading } = useServices();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const loading = settingsLoading || servicesLoading;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const whatsappUrl = settings?.whatsapp_number
    ? `https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}?text=Hola, quiero información sobre sus sistemas`
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header settings={settings} />
      
      <main>
        <Hero settings={settings} />
        
        {/* Services Section */}
        <section id="servicios" className="py-20 md:py-28">
          <div className="container px-4">
            <div className="mb-14 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary mb-5">
                🚀 Nuestras Soluciones
              </div>
              <h2 className="mb-5 text-3xl font-black md:text-5xl font-display tracking-tight text-foreground">
                Elige el sistema perfecto <br className="hidden md:block" />
                <span className="gradient-text">para tu negocio</span>
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-lg leading-relaxed">
                Cada solución está diseñada para resolver problemas reales. Haz clic en cualquier producto para ver demos, capturas y detalles completos.
              </p>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onClick={() => setSelectedService(service)}
                  index={index}
                />
              ))}
            </div>
            
            {services.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No hay servicios disponibles en este momento.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-trust">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-black font-display text-foreground mb-5 tracking-tight">
                ¿Listo para llevar tu negocio al siguiente nivel?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Únete a los negocios que ya automatizaron sus procesos y aumentaron sus ventas con nuestros sistemas.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>Sin contratos</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>Soporte incluido</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  <span>Demo gratis</span>
                </div>
              </div>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-2xl bg-gradient-primary px-10 py-4 font-bold text-primary-foreground text-lg shadow-glow transition-all hover:shadow-glow-lg hover:scale-[1.03] active:scale-[0.98]"
                >
                  Hablar con un asesor
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer settings={settings} />
      
      {settings?.whatsapp_number && (
        <WhatsAppButton phoneNumber={settings.whatsapp_number} />
      )}
      
      <ServiceModal
        service={selectedService}
        open={!!selectedService}
        onClose={() => setSelectedService(null)}
        whatsappNumber={settings?.whatsapp_number || ''}
      />
    </div>
  );
};

export default Index;
