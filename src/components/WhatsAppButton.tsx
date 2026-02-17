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
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] pl-5 pr-6 py-3.5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6 fill-current text-white" />
      <span className="text-white font-bold text-sm hidden sm:inline">¿Dudas? Escríbenos</span>
    </a>
  );
}
