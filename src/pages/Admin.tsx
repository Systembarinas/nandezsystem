 import { useState, useEffect } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { useAuth } from '@/hooks/useAuth';
 import { useSiteSettings } from '@/hooks/useSiteSettings';
 import { useServices } from '@/hooks/useServices';
 import { AdminLogin } from '@/components/admin/AdminLogin';
 import { AdminDashboard } from '@/components/admin/AdminDashboard';
 import { Loader2 } from 'lucide-react';
 
 export default function Admin() {
   const { user, loading: authLoading } = useAuth();
   const { settings, loading: settingsLoading, updateSettings, refetch: refetchSettings } = useSiteSettings();
   const { services, loading: servicesLoading, createService, updateService, deleteService, refetch: refetchServices } = useServices();
 
   const loading = authLoading || settingsLoading || servicesLoading;
 
   if (loading) {
     return (
       <div className="flex min-h-screen items-center justify-center bg-background">
         <Loader2 className="h-10 w-10 animate-spin text-primary" />
       </div>
     );
   }
 
   if (!user) {
     return <AdminLogin />;
   }
 
   return (
     <AdminDashboard
       settings={settings}
       services={services}
       onUpdateSettings={updateSettings}
       onCreateService={createService}
       onUpdateService={updateService}
       onDeleteService={deleteService}
       onRefresh={() => {
         refetchSettings();
         refetchServices();
       }}
     />
   );
 }