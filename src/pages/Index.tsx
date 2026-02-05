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
        <section id="servicios" className="py-20">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Nuestros <span className="gradient-text">Sistemas</span>
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Soluciones diseñadas para optimizar y automatizar tu negocio
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
