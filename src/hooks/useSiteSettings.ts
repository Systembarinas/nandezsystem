 import { useState, useEffect } from 'react';
 import { supabase, SiteSettings } from '@/lib/supabase';
 
 export function useSiteSettings() {
   const [settings, setSettings] = useState<SiteSettings | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   const fetchSettings = async () => {
     try {
       setLoading(true);
       const { data, error } = await supabase
         .from('site_settings')
         .select('*')
         .limit(1)
         .maybeSingle();
 
       if (error) throw error;
       setSettings(data);
     } catch (err: any) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };
 
   const updateSettings = async (updates: Partial<SiteSettings>) => {
     if (!settings) return;
     
     try {
       const { error } = await supabase
         .from('site_settings')
         .update({ ...updates, updated_at: new Date().toISOString() })
         .eq('id', settings.id);
 
       if (error) throw error;
       await fetchSettings();
       return true;
     } catch (err: any) {
       setError(err.message);
       return false;
     }
   };
 
   useEffect(() => {
     fetchSettings();
   }, []);
 
   return { settings, loading, error, updateSettings, refetch: fetchSettings };
 }