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
import { Loader2 } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-background">
      <Header settings={settings} />
      
      <main>
        <Hero settings={settings} />
        
        {/* Services Section */}
        <section id="servicios" className="py-24">
          <div className="container px-4">
            <div className="mb-16 text-center">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary mb-4">
                Nuestros Sistemas
              </span>
              <h2 className="mb-4 text-3xl font-extrabold md:text-5xl font-display">
                Soluciones que <span className="gradient-text">transforman</span> tu negocio
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
                Software profesional diseñado para optimizar y automatizar cada aspecto de tu empresa
              </p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              <p className="text-center text-muted-foreground">
                No hay servicios disponibles en este momento.
              </p>
            )}
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
