import { SiteSettings } from '@/lib/supabase';
import { MessageCircle } from 'lucide-react';

interface FooterProps {
  settings: SiteSettings | null;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-lg font-black gradient-text font-display">
              {settings?.site_name || 'Nandez Systems'}
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              {settings?.footer_text || '© 2024 Nandez Systems. Todos los derechos reservados.'}
            </p>
          </div>
          {settings?.whatsapp_number && (
            <a
              href={`https://wa.me/${settings.whatsapp_number.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:text-foreground hover:border-primary/30 hover:shadow-sm"
            >
              <MessageCircle className="h-4 w-4" />
              Escríbenos por WhatsApp
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
