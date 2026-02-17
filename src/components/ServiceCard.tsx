import { Service } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Play, Images, Star } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
  index: number;
}

export function ServiceCard({ service, onClick, index }: ServiceCardProps) {
  const mainImage = service.images?.length > 0 ? service.images[0] : service.image_url;
  const hasMultipleImages = service.images?.length > 1;
  const hasVideo = !!service.video_url;

  return (
    <Card 
      className="group cursor-pointer overflow-hidden border border-border bg-card shadow-card card-hover rounded-2xl"
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {mainImage ? (
          <img 
            src={mainImage} 
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-hero">
            <span className="text-6xl">💻</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {hasVideo && (
            <span className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow-lg">
              <Play className="h-3 w-3" /> Video
            </span>
          )}
          {hasMultipleImages && (
            <span className="flex items-center gap-1 rounded-full bg-card/90 px-3 py-1 text-xs font-bold text-foreground backdrop-blur-sm shadow-lg">
              <Images className="h-3 w-3" /> {service.images.length} fotos
            </span>
          )}
        </div>
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-extrabold text-primary-foreground drop-shadow-lg font-display leading-tight">
            {service.title}
          </h3>
        </div>
      </div>
      <CardContent className="p-5 space-y-4">
        <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {service.short_description}
        </p>
        
        {service.price && (
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-foreground">{service.price}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-accent">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" />
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all">
            Ver más
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
