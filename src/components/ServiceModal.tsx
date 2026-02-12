import { useState } from 'react';
import { Service } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

interface ServiceModalProps {
  service: Service | null;
  open: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

export function ServiceModal({ service, open, onClose, whatsappNumber }: ServiceModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!service) return null;

  const allImages = service.images?.length > 0 
    ? service.images 
    : service.image_url 
      ? [service.image_url] 
      : [];

  const whatsappUrl = whatsappNumber 
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Hola, me interesa el sistema: ${encodeURIComponent(service.title)}`
    : null;

  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + allImages.length) % allImages.length);

  return (
    <Dialog open={open} onOpenChange={() => { onClose(); setCurrentImageIndex(0); }}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto border-border bg-card p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-extrabold gradient-text font-display">
            {service.title}
          </DialogTitle>
        </DialogHeader>
        
        {/* Image carousel */}
        {allImages.length > 0 && (
          <div className="relative overflow-hidden rounded-xl">
            <img 
              src={allImages[currentImageIndex]} 
              alt={`${service.title} - ${currentImageIndex + 1}`}
              className="h-48 sm:h-64 w-full object-cover transition-all duration-500"
            />
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground shadow-md transition-all hover:bg-background"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm text-foreground shadow-md transition-all hover:bg-background"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {allImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`h-2 w-2 rounded-full transition-all ${i === currentImageIndex ? 'bg-primary-foreground w-6' : 'bg-primary-foreground/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Video */}
        {service.video_url && (
          <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={service.video_url.replace('watch?v=', 'embed/')}
              title={`Video de ${service.title}`}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
        
        <div className="space-y-5">
          <p className="text-muted-foreground leading-relaxed">
            {service.full_description || service.short_description}
          </p>
          
          {service.features && service.features.length > 0 && (
            <div>
              <h4 className="mb-3 font-bold text-foreground font-display">Características:</h4>
              <ul className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {service.price && (
            <div className="flex items-center gap-2">
              <Badge className="bg-primary/10 text-primary border-primary/20 font-bold text-base px-4 py-1">
                {service.price}
              </Badge>
            </div>
          )}
          
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 font-bold text-primary-foreground transition-all hover:bg-[#128C7E] hover:shadow-lg"
            >
              Solicitar información
            </a>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
