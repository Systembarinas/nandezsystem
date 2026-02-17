import { useState } from 'react';
import { Service } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check, ChevronLeft, ChevronRight, Play, X, ZoomIn, Star, ShieldCheck, MessageCircle } from 'lucide-react';

interface ServiceModalProps {
  service: Service | null;
  open: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

export function ServiceModal({ service, open, onClose, whatsappNumber }: ServiceModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'gallery' | 'video'>('gallery');

  if (!service) return null;

  const allImages = service.images?.length > 0 
    ? service.images 
    : service.image_url 
      ? [service.image_url] 
      : [];

  const hasVideo = !!service.video_url;

  const whatsappUrl = whatsappNumber 
    ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Hola, me interesa: *${encodeURIComponent(service.title)}*. ¿Me pueden dar más información?`
    : null;

  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % allImages.length);
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + allImages.length) % allImages.length);

  return (
    <>
      <Dialog open={open} onOpenChange={() => { onClose(); setCurrentImageIndex(0); setActiveTab('gallery'); }}>
        <DialogContent className="max-h-[92vh] w-[95vw] max-w-3xl overflow-y-auto border-border bg-card p-0 rounded-2xl gap-0">
          {/* Media section */}
          <div className="relative">
            {/* Tabs for gallery/video */}
            {hasVideo && allImages.length > 0 && (
              <div className="absolute top-3 left-3 z-20 flex rounded-xl bg-card/90 backdrop-blur-sm shadow-lg overflow-hidden border border-border">
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-4 py-2 text-xs font-bold transition-all ${activeTab === 'gallery' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  Fotos
                </button>
                <button
                  onClick={() => setActiveTab('video')}
                  className={`flex items-center gap-1 px-4 py-2 text-xs font-bold transition-all ${activeTab === 'video' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  <Play className="h-3 w-3" /> Video
                </button>
              </div>
            )}

            {activeTab === 'gallery' && allImages.length > 0 && (
              <div className="relative">
                <div 
                  className="relative aspect-video cursor-zoom-in overflow-hidden bg-muted" 
                  onClick={() => setLightboxOpen(true)}
                >
                  <img 
                    src={allImages[currentImageIndex]} 
                    alt={`${service.title} - ${currentImageIndex + 1}`}
                    className="h-full w-full object-cover transition-all duration-500"
                  />
                  <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm text-foreground shadow-md">
                    <ZoomIn className="h-4 w-4" />
                  </div>
                </div>
                {allImages.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm text-foreground shadow-lg transition-all hover:bg-card hover:scale-110"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm text-foreground shadow-lg transition-all hover:bg-card hover:scale-110"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
                {/* Thumbnail strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 p-3 overflow-x-auto bg-muted/50">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImageIndex(i)}
                        className={`flex-shrink-0 h-14 w-20 rounded-lg overflow-hidden border-2 transition-all ${i === currentImageIndex ? 'border-primary shadow-glow ring-1 ring-primary/30' : 'border-transparent opacity-60 hover:opacity-100'}`}
                      >
                        <img src={img} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'video' && hasVideo && (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={service.video_url!.replace('watch?v=', 'embed/')}
                  title={`Video de ${service.title}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {!allImages.length && hasVideo && (
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  src={service.video_url!.replace('watch?v=', 'embed/')}
                  title={`Video de ${service.title}`}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5 sm:p-7 space-y-6">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-2 text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
                <span className="text-xs font-medium text-muted-foreground ml-1">Calificación de clientes</span>
              </div>
              <DialogTitle className="text-2xl sm:text-3xl font-black text-foreground font-display leading-tight">
                {service.title}
              </DialogTitle>
            </DialogHeader>

            {service.price && (
              <div className="flex items-baseline gap-2 pb-2 border-b border-border">
                <span className="text-3xl font-black gradient-text">{service.price}</span>
                <span className="text-sm text-muted-foreground">/ licencia</span>
              </div>
            )}

            <p className="text-muted-foreground leading-relaxed text-base">
              {service.full_description || service.short_description}
            </p>
            
            {service.features && service.features.length > 0 && (
              <div className="rounded-2xl bg-muted/50 p-5">
                <h4 className="mb-4 font-bold text-foreground font-display text-lg">✨ Lo que incluye:</h4>
                <ul className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <div className="flex h-5 w-5 mt-0.5 flex-shrink-0 items-center justify-center rounded-full bg-secondary/15">
                        <Check className="h-3 w-3 text-secondary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust signal */}
            <div className="flex items-center gap-3 rounded-xl bg-secondary/5 border border-secondary/15 p-4">
              <ShieldCheck className="h-5 w-5 text-secondary flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                <span className="font-bold text-foreground">Garantía de satisfacción.</span> Soporte técnico incluido y actualizaciones gratis por tiempo limitado.
              </p>
            </div>
            
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-6 py-4 font-bold text-white text-lg transition-all hover:bg-[#1fb855] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                ¡Lo quiero! Solicitar ahora
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Lightbox */}
      {lightboxOpen && allImages.length > 0 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/90 backdrop-blur-sm" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/20 text-primary-foreground hover:bg-card/40 transition-all">
            <X className="h-6 w-6" />
          </button>
          <img 
            src={allImages[currentImageIndex]} 
            alt={service.title}
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          {allImages.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-card/20 text-primary-foreground hover:bg-card/40 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-card/20 text-primary-foreground hover:bg-card/40 transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(i); }}
                className={`h-2.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-primary-foreground w-8' : 'bg-primary-foreground/40 w-2.5'}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
