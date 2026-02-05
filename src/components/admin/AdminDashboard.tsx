 import { useState } from 'react';
 import { Link } from 'react-router-dom';
 import { useAuth } from '@/hooks/useAuth';
 import { SiteSettings, Service } from '@/lib/supabase';
 import { Button } from '@/components/ui/button';
 import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
 import { SettingsTab } from './SettingsTab';
 import { ServicesTab } from './ServicesTab';
 import { LogOut, Home, RefreshCw } from 'lucide-react';
 
 interface AdminDashboardProps {
   settings: SiteSettings | null;
   services: Service[];
   onUpdateSettings: (updates: Partial<SiteSettings>) => Promise<boolean>;
   onCreateService: (service: Partial<Service>) => Promise<boolean>;
   onUpdateService: (id: string, updates: Partial<Service>) => Promise<boolean>;
   onDeleteService: (id: string) => Promise<boolean>;
   onRefresh: () => void;
 }
 
 export function AdminDashboard({
   settings,
   services,
   onUpdateSettings,
   onCreateService,
   onUpdateService,
   onDeleteService,
   onRefresh,
 }: AdminDashboardProps) {
   const { signOut } = useAuth();
 
   const handleSignOut = async () => {
     await signOut();
   };
 
   return (
     <div className="min-h-screen bg-background">
       {/* Header */}
       <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl">
         <div className="container flex h-16 items-center justify-between px-4">
           <h1 className="text-xl font-bold gradient-text">Panel de Administración</h1>
           <div className="flex items-center gap-2">
             <Button variant="ghost" size="sm" onClick={onRefresh}>
               <RefreshCw className="h-4 w-4" />
             </Button>
             <Link to="/">
               <Button variant="ghost" size="sm">
                 <Home className="mr-2 h-4 w-4" />
                 Ver Sitio
               </Button>
             </Link>
             <Button variant="outline" size="sm" onClick={handleSignOut}>
               <LogOut className="mr-2 h-4 w-4" />
               Salir
             </Button>
           </div>
         </div>
       </header>
 
       {/* Main Content */}
       <main className="container px-4 py-8">
         <Tabs defaultValue="settings" className="space-y-6">
           <TabsList className="grid w-full max-w-md grid-cols-2">
             <TabsTrigger value="settings">Configuración</TabsTrigger>
             <TabsTrigger value="services">Servicios</TabsTrigger>
           </TabsList>
 
           <TabsContent value="settings">
             <SettingsTab settings={settings} onUpdate={onUpdateSettings} />
           </TabsContent>
 
           <TabsContent value="services">
             <ServicesTab
               services={services}
               onCreate={onCreateService}
               onUpdate={onUpdateService}
               onDelete={onDeleteService}
             />
           </TabsContent>
         </Tabs>
       </main>
     </div>
   );
 }