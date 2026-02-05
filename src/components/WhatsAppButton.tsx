 import { MessageCircle } from 'lucide-react';
 
 interface WhatsAppButtonProps {
   phoneNumber: string;
 }
 
 export function WhatsAppButton({ phoneNumber }: WhatsAppButtonProps) {
   if (!phoneNumber) return null;
   
   const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\D/g, '')}`;
 
   return (
     <a
       href={whatsappUrl}
       target="_blank"
       rel="noopener noreferrer"
       className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl md:h-16 md:w-16"
       aria-label="Contactar por WhatsApp"
     >
       <MessageCircle className="h-7 w-7 fill-current text-white md:h-8 md:w-8" />
     </a>
   );
 }