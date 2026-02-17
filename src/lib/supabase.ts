 import { createClient } from '@supabase/supabase-js';
 
 const supabaseUrl = 'https://yjxwnijatehvrztfxuzn.supabase.co';
 const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqeHduaWphdGVodnJ6dGZ4dXpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNjQxMDEsImV4cCI6MjA4NTg0MDEwMX0.uI-mhwkc8e-0-W69o9tPKnjWhtdKBPCuMFqNcWrxXOU';
 
 export const supabase = createClient(supabaseUrl, supabaseAnonKey);
 
 // Types
export interface SiteSettings {
  id: string;
  site_name: string;
  site_description: string;
  logo_url: string | null;
  hero_image_url: string | null;
  whatsapp_number: string;
  footer_text: string;
  custom_texts: Record<string, string> | null;
  created_at: string;
  updated_at: string;
}
 
export interface Service {
  id: string;
  title: string;
  short_description: string;
  full_description: string | null;
  image_url: string | null;
  images: string[];
  video_url: string | null;
  features: string[];
  price: string | null;
  order_index: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}