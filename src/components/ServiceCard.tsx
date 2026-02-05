 import { Service } from '@/lib/supabase';
 import { Card, CardContent } from '@/components/ui/card';
 import { ChevronRight } from 'lucide-react';
 
 interface ServiceCardProps {
   service: Service;
   onClick: () => void;
   index: number;
 }
 
 export function ServiceCard({ service, onClick, index }: ServiceCardProps) {
   return (
     <Card 
       className="group cursor-pointer overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm card-hover"
       onClick={onClick}
       style={{ animationDelay: `${index * 0.1}s` }}
     >
       <div className="relative h-48 overflow-hidden">
         {service.image_url ? (
           <img 
             src={service.image_url} 
             alt={service.title}
             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
           />
         ) : (
           <div className="flex h-full w-full items-center justify-center bg-gradient-primary opacity-80">
             <span className="text-6xl">💻</span>
           </div>
         )}
         <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
       </div>
       <CardContent className="relative p-6">
         <h3 className="mb-2 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
           {service.title}
         </h3>
         <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
           {service.short_description}
         </p>
         <div className="flex items-center text-sm font-medium text-primary">
           Ver detalles
           <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
         </div>
       </CardContent>
     </Card>
   );
 }