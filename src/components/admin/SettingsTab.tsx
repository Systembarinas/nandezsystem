 import { useState } from 'react';
 import { SiteSettings } from '@/lib/supabase';
 import { uploadToImgBB } from '@/lib/imgbb';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Label } from '@/components/ui/label';
 import { Textarea } from '@/components/ui/textarea';
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
 import { Loader2, Upload, Save } from 'lucide-react';
 import { toast } from 'sonner';
 
 interface SettingsTabProps {
   settings: SiteSettings | null;
   onUpdate: (updates: Partial<SiteSettings>) => Promise<boolean>;
 }
 
 export function SettingsTab({ settings, onUpdate }: SettingsTabProps) {
   const [formData, setFormData] = useState({
     site_name: settings?.site_name || '',
     site_description: settings?.site_description || '',
     whatsapp_number: settings?.whatsapp_number || '',
     footer_text: settings?.footer_text || '',
     logo_url: settings?.logo_url || '',
     hero_image_url: settings?.hero_image_url || '',
   });
   const [saving, setSaving] = useState(false);
   const [uploadingLogo, setUploadingLogo] = useState(false);
   const [uploadingHero, setUploadingHero] = useState(false);
 
   const handleSave = async () => {
     setSaving(true);
     const success = await onUpdate(formData);
     if (success) {
       toast.success('Configuración guardada exitosamente');
     } else {
       toast.error('Error al guardar la configuración');
     }
     setSaving(false);
   };
 
   const handleImageUpload = async (file: File, field: 'logo_url' | 'hero_image_url') => {
     const setUploading = field === 'logo_url' ? setUploadingLogo : setUploadingHero;
     setUploading(true);
     
     const url = await uploadToImgBB(file);
     
     if (url) {
       setFormData(prev => ({ ...prev, [field]: url }));
       toast.success('Imagen subida exitosamente');
     } else {
       toast.error('Error al subir la imagen');
     }
     
     setUploading(false);
   };
 
   return (
     <div className="grid gap-6 lg:grid-cols-2">
       <Card className="border-border/50 bg-card/50">
         <CardHeader>
           <CardTitle>Información General</CardTitle>
           <CardDescription>Configura el nombre y descripción del sitio</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           <div className="space-y-2">
             <Label htmlFor="site_name">Nombre del Sitio</Label>
             <Input
               id="site_name"
               value={formData.site_name}
               onChange={(e) => setFormData(prev => ({ ...prev, site_name: e.target.value }))}
               className="bg-input/50"
             />
           </div>
           
           <div className="space-y-2">
             <Label htmlFor="site_description">Descripción</Label>
             <Textarea
               id="site_description"
               value={formData.site_description}
               onChange={(e) => setFormData(prev => ({ ...prev, site_description: e.target.value }))}
               className="bg-input/50"
               rows={3}
             />
           </div>
           
           <div className="space-y-2">
             <Label htmlFor="whatsapp_number">Número de WhatsApp</Label>
             <Input
               id="whatsapp_number"
               value={formData.whatsapp_number}
               onChange={(e) => setFormData(prev => ({ ...prev, whatsapp_number: e.target.value }))}
               placeholder="+1234567890"
               className="bg-input/50"
             />
             <p className="text-xs text-muted-foreground">Incluye el código de país (ej: +58 para Venezuela)</p>
           </div>
           
           <div className="space-y-2">
             <Label htmlFor="footer_text">Texto del Footer</Label>
             <Input
               id="footer_text"
               value={formData.footer_text}
               onChange={(e) => setFormData(prev => ({ ...prev, footer_text: e.target.value }))}
               className="bg-input/50"
             />
           </div>
         </CardContent>
       </Card>
 
       <Card className="border-border/50 bg-card/50">
         <CardHeader>
           <CardTitle>Imágenes</CardTitle>
           <CardDescription>Sube el logo y la imagen de portada</CardDescription>
         </CardHeader>
         <CardContent className="space-y-6">
           {/* Logo */}
           <div className="space-y-2">
             <Label>Logo</Label>
             <div className="flex items-center gap-4">
               {formData.logo_url && (
                 <img 
                   src={formData.logo_url} 
                   alt="Logo" 
                   className="h-16 w-16 rounded-lg object-contain bg-muted/50"
                 />
               )}
               <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border/50 px-4 py-2 transition-colors hover:bg-muted/50">
                 {uploadingLogo ? (
                   <Loader2 className="h-4 w-4 animate-spin" />
                 ) : (
                   <Upload className="h-4 w-4" />
                 )}
                 <span className="text-sm">Subir Logo</span>
                 <input
                   type="file"
                   accept="image/*"
                   className="hidden"
                   onChange={(e) => {
                     const file = e.target.files?.[0];
                     if (file) handleImageUpload(file, 'logo_url');
                   }}
                   disabled={uploadingLogo}
                 />
               </label>
             </div>
           </div>
 
           {/* Hero Image */}
           <div className="space-y-2">
             <Label>Imagen de Portada</Label>
             {formData.hero_image_url && (
               <img 
                 src={formData.hero_image_url} 
                 alt="Portada" 
                 className="mb-2 h-32 w-full rounded-lg object-cover"
               />
             )}
             <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border/50 px-4 py-6 transition-colors hover:bg-muted/50">
               {uploadingHero ? (
                 <Loader2 className="h-4 w-4 animate-spin" />
               ) : (
                 <Upload className="h-4 w-4" />
               )}
               <span className="text-sm">Subir Imagen de Portada</span>
               <input
                 type="file"
                 accept="image/*"
                 className="hidden"
                 onChange={(e) => {
                   const file = e.target.files?.[0];
                   if (file) handleImageUpload(file, 'hero_image_url');
                 }}
                 disabled={uploadingHero}
               />
             </label>
           </div>
         </CardContent>
       </Card>
 
       <div className="lg:col-span-2">
         <Button onClick={handleSave} disabled={saving} className="bg-gradient-primary">
           {saving ? (
             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
           ) : (
             <Save className="mr-2 h-4 w-4" />
           )}
           Guardar Configuración
         </Button>
       </div>
     </div>
   );
 }