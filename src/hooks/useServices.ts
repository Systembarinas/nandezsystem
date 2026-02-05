 import { useState, useEffect } from 'react';
 import { supabase, Service } from '@/lib/supabase';
 
 export function useServices() {
   const [services, setServices] = useState<Service[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   const fetchServices = async () => {
     try {
       setLoading(true);
       const { data, error } = await supabase
         .from('services')
         .select('*')
         .order('order_index', { ascending: true });
 
       if (error) throw error;
       setServices(data || []);
     } catch (err: any) {
       setError(err.message);
     } finally {
       setLoading(false);
     }
   };
 
   const createService = async (service: Partial<Service>) => {
     try {
       const { error } = await supabase
         .from('services')
         .insert([service]);
 
       if (error) throw error;
       await fetchServices();
       return true;
     } catch (err: any) {
       setError(err.message);
       return false;
     }
   };
 
   const updateService = async (id: string, updates: Partial<Service>) => {
     try {
       const { error } = await supabase
         .from('services')
         .update({ ...updates, updated_at: new Date().toISOString() })
         .eq('id', id);
 
       if (error) throw error;
       await fetchServices();
       return true;
     } catch (err: any) {
       setError(err.message);
       return false;
     }
   };
 
   const deleteService = async (id: string) => {
     try {
       const { error } = await supabase
         .from('services')
         .delete()
         .eq('id', id);
 
       if (error) throw error;
       await fetchServices();
       return true;
     } catch (err: any) {
       setError(err.message);
       return false;
     }
   };
 
   useEffect(() => {
     fetchServices();
   }, []);
 
   return { services, loading, error, createService, updateService, deleteService, refetch: fetchServices };
 }