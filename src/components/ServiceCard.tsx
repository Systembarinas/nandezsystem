import { Service } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight, Play, Images } from 'lucide-react';

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
      className="group cursor-pointer overflow-hidden border-border bg-card shadow-card card-hover rounded-xl"
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-52 overflow-hidden">
        {mainImage ? (
          <img 
            src={mainImage} 
            alt={service.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-hero">
            <span className="text-6xl">💻</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {hasVideo && (
            <span className="flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-semibold text-accent-foreground backdrop-blur-sm">
              <Play className="h-3 w-3" /> Video
            </span>
          )}
          {hasMultipleImages && (
            <span className="flex items-center gap-1 rounded-full bg-secondary/90 px-2.5 py-1 text-xs font-semibold text-secondary-foreground backdrop-blur-sm">
              <Images className="h-3 w-3" /> {service.images.length}
            </span>
          )}
        </div>
        
        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-xl font-bold text-primary-foreground drop-shadow-lg font-display">
            {service.title}
          </h3>
        </div>
      </div>
      <CardContent className="p-5">
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground leading-relaxed">
          {service.short_description}
        </p>
        <div className="flex items-center text-sm font-bold text-primary">
          Ver detalles
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </CardContent>
    </Card>
  );
}
