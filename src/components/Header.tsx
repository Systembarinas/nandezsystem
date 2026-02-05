 import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import { SiteSettings } from '@/lib/supabase';
import { Menu, X, MessageCircle } from 'lucide-react';
 
 interface HeaderProps {
   settings: SiteSettings | null;
 }
 
 export function Header({ settings }: HeaderProps) {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
 
   return (
     <header className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
       <div className="container flex h-16 items-center justify-between px-4">
         <Link to="/" className="flex items-center gap-3">
           {settings?.logo_url ? (
             <img 
               src={settings.logo_url} 
               alt={settings.site_name}
               className="h-8 w-auto"
             />
           ) : (
             <span className="text-xl font-bold gradient-text">
               {settings?.site_name || 'Nandez Systems'}
             </span>
           )}
         </Link>
         
         {/* Desktop nav */}
         <nav className="hidden items-center gap-6 md:flex">
           <a href="#servicios" className="text-sm text-muted-foreground transition-colors hover:text-primary">
             Servicios
           </a>
            <a 
              href={`https://wa.me/${settings?.whatsapp_number || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <MessageCircle className="h-4 w-4" />
              Contacto
            </a>
           <Link to="/admin" className="text-sm text-muted-foreground transition-colors hover:text-primary">
             Admin
           </Link>
         </nav>
         
         {/* Mobile menu button */}
         <button 
           className="md:hidden"
           onClick={() => setIsMenuOpen(!isMenuOpen)}
         >
           {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
         </button>
       </div>
       
       {/* Mobile menu */}
       {isMenuOpen && (
         <nav className="border-t border-border/50 bg-background/95 backdrop-blur-xl md:hidden">
           <div className="container flex flex-col gap-4 px-4 py-4">
             <a 
               href="#servicios" 
               className="text-muted-foreground transition-colors hover:text-primary"
               onClick={() => setIsMenuOpen(false)}
             >
               Servicios
             </a>
              <a 
                href={`https://wa.me/${settings?.whatsapp_number || ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                Contacto
              </a>
             <Link 
               to="/admin" 
               className="text-muted-foreground transition-colors hover:text-primary"
               onClick={() => setIsMenuOpen(false)}
             >
               Admin
             </Link>
           </div>
         </nav>
       )}
     </header>
   );
 }