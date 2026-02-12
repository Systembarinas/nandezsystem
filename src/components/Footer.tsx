import { SiteSettings } from '@/lib/supabase';

interface FooterProps {
  settings: SiteSettings | null;
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/30 py-10">
      <div className="container px-4 text-center">
        <p className="text-sm font-medium text-muted-foreground">
          {settings?.footer_text || '© 2024 Nandez Systems. Todos los derechos reservados.'}
        </p>
      </div>
    </footer>
  );
}
