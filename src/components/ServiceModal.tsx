 import { Service } from '@/lib/supabase';
 import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from '@/components/ui/dialog';
 import { Badge } from '@/components/ui/badge';
 import { Check, X } from 'lucide-react';
 
 interface ServiceModalProps {
   service: Service | null;
   open: boolean;
   onClose: () => void;
   whatsappNumber: string;
 }
 
 export function ServiceModal({ service, open, onClose, whatsappNumber }: ServiceModalProps) {
   if (!service) return null;
 
   const whatsappUrl = whatsappNumber 
     ? `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=Hola, me interesa el sistema: ${encodeURIComponent(service.title)}`
     : null;
 
   return (
     <Dialog open={open} onOpenChange={onClose}>
       <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border/50 bg-card/95 backdrop-blur-xl">
         <DialogHeader>
           <DialogTitle className="text-2xl font-bold gradient-text">
             {service.title}
           </DialogTitle>
         </DialogHeader>
         
         {service.image_url && (
           <div className="overflow-hidden rounded-lg">
             <img 
               src={service.image_url} 
               alt={service.title}
               className="h-64 w-full object-cover"
             />
           </div>
         )}
         
         <div className="space-y-4">
           <p className="text-muted-foreground">
             {service.full_description || service.short_description}
           </p>
           
           {service.features && service.features.length > 0 && (
             <div>
               <h4 className="mb-3 font-semibold text-foreground">Características:</h4>
               <ul className="grid gap-2 sm:grid-cols-2">
                 {service.features.map((feature, index) => (
                   <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                     <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                     {feature}
                   </li>
                 ))}
               </ul>
             </div>
           )}
           
           {service.price && (
             <div className="flex items-center gap-2">
               <Badge variant="secondary" className="bg-primary/20 text-primary">
                 {service.price}
               </Badge>
             </div>
           )}
           
           {whatsappUrl && (
             <a
               href={whatsappUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-medium text-white transition-all hover:bg-[#128C7E] hover:shadow-lg"
             >
               Solicitar información
             </a>
           )}
         </div>
       </DialogContent>
     </Dialog>
   );
 }