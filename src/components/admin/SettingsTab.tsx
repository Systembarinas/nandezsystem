import { useState } from 'react';
import { SiteSettings } from '@/lib/supabase';
import { DEFAULT_TEXTS } from '@/lib/coloredText';
import { uploadToImgBB } from '@/lib/imgbb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, Save, Info } from 'lucide-react';
import { toast } from 'sonner';

interface SettingsTabProps {
  settings: SiteSettings | null;
  onUpdate: (updates: Partial<SiteSettings>) => Promise<boolean>;
}

const TEXT_FIELDS: { key: string; label: string; multiline?: boolean; group: string }[] = [
  // Hero
  { key: 'hero_badge', label: 'Badge del Hero', group: 'Hero' },
  { key: 'hero_title', label: 'Título Principal (usa \\n para salto de línea)', multiline: true, group: 'Hero' },
  { key: 'hero_subtitle', label: 'Subtítulo del Hero', multiline: true, group: 'Hero' },
  { key: 'hero_cta_primary', label: 'Botón Principal', group: 'Hero' },
  { key: 'hero_cta_secondary', label: 'Botón Secundario', group: 'Hero' },
  // Trust
  { key: 'trust_1_title', label: 'Indicador 1 - Título', group: 'Indicadores de Confianza' },
  { key: 'trust_1_subtitle', label: 'Indicador 1 - Subtítulo', group: 'Indicadores de Confianza' },
  { key: 'trust_2_title', label: 'Indicador 2 - Título', group: 'Indicadores de Confianza' },
  { key: 'trust_2_subtitle', label: 'Indicador 2 - Subtítulo', group: 'Indicadores de Confianza' },
  { key: 'trust_3_title', label: 'Indicador 3 - Título', group: 'Indicadores de Confianza' },
  { key: 'trust_3_subtitle', label: 'Indicador 3 - Subtítulo', group: 'Indicadores de Confianza' },
  // Services
  { key: 'services_badge', label: 'Badge de Servicios', group: 'Sección Servicios' },
  { key: 'services_title', label: 'Título de Servicios', multiline: true, group: 'Sección Servicios' },
  { key: 'services_subtitle', label: 'Subtítulo de Servicios', multiline: true, group: 'Sección Servicios' },
  { key: 'services_empty', label: 'Mensaje sin servicios', group: 'Sección Servicios' },
  // CTA
  { key: 'cta_title', label: 'Título CTA', group: 'Sección CTA' },
  { key: 'cta_subtitle', label: 'Subtítulo CTA', multiline: true, group: 'Sección CTA' },
  { key: 'cta_button', label: 'Botón CTA', group: 'Sección CTA' },
  { key: 'cta_benefit_1', label: 'Beneficio 1', group: 'Sección CTA' },
  { key: 'cta_benefit_2', label: 'Beneficio 2', group: 'Sección CTA' },
  { key: 'cta_benefit_3', label: 'Beneficio 3', group: 'Sección CTA' },
];

export function SettingsTab({ settings, onUpdate }: SettingsTabProps) {
  const [formData, setFormData] = useState({
    site_name: settings?.site_name || '',
    site_description: settings?.site_description || '',
    whatsapp_number: settings?.whatsapp_number || '',
    footer_text: settings?.footer_text || '',
    logo_url: settings?.logo_url || '',
    hero_image_url: settings?.hero_image_url || '',
  });

  const existingTexts = settings?.custom_texts || {};
  const [customTexts, setCustomTexts] = useState<Record<string, string>>(
    Object.fromEntries(TEXT_FIELDS.map(f => [f.key, existingTexts[f.key] || DEFAULT_TEXTS[f.key] || '']))
  );

  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    const success = await onUpdate({ ...formData, custom_texts: customTexts });
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

  const updateText = (key: string, value: string) => {
    setCustomTexts(prev => ({ ...prev, [key]: value }));
  };

  // Group fields
  const groups = TEXT_FIELDS.reduce((acc, field) => {
    if (!acc[field.group]) acc[field.group] = [];
    acc[field.group].push(field);
    return acc;
  }, {} as Record<string, typeof TEXT_FIELDS>);

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Información General</CardTitle>
            <CardDescription>Configura el nombre y descripción del sitio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_name">Nombre del Sitio</Label>
              <Input id="site_name" value={formData.site_name} onChange={(e) => setFormData(prev => ({ ...prev, site_name: e.target.value }))} className="bg-input/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_description">Descripción</Label>
              <Textarea id="site_description" value={formData.site_description} onChange={(e) => setFormData(prev => ({ ...prev, site_description: e.target.value }))} className="bg-input/50" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp_number">Número de WhatsApp</Label>
              <Input id="whatsapp_number" value={formData.whatsapp_number} onChange={(e) => setFormData(prev => ({ ...prev, whatsapp_number: e.target.value }))} placeholder="+1234567890" className="bg-input/50" />
              <p className="text-xs text-muted-foreground">Incluye el código de país (ej: +58 para Venezuela)</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="footer_text">Texto del Footer</Label>
              <Input id="footer_text" value={formData.footer_text} onChange={(e) => setFormData(prev => ({ ...prev, footer_text: e.target.value }))} className="bg-input/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle>Imágenes</CardTitle>
            <CardDescription>Sube el logo y la imagen de portada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Logo</Label>
              <div className="flex items-center gap-4">
                {formData.logo_url && (
                  <img src={formData.logo_url} alt="Logo" className="h-16 w-16 rounded-lg object-contain bg-muted/50" />
                )}
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-border/50 px-4 py-2 transition-colors hover:bg-muted/50">
                  {uploadingLogo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  <span className="text-sm">Subir Logo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, 'logo_url'); }} disabled={uploadingLogo} />
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Imagen de Portada</Label>
              {formData.hero_image_url && (
                <img src={formData.hero_image_url} alt="Portada" className="mb-2 h-32 w-full rounded-lg object-cover" />
              )}
              <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border/50 px-4 py-6 transition-colors hover:bg-muted/50">
                {uploadingHero ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                <span className="text-sm">Subir Imagen de Portada</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file, 'hero_image_url'); }} disabled={uploadingHero} />
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color syntax guide */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="py-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div className="text-sm space-y-1">
              <p className="font-semibold text-foreground">Sintaxis de colores para textos</p>
              <p className="text-muted-foreground">
                Usa etiquetas para aplicar colores: <code className="bg-muted px-1.5 py-0.5 rounded text-xs">{'{degradado}texto{/degradado}'}</code> • 
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs ml-1">{'{azul}texto{/azul}'}</code> • 
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs ml-1">{'{morado}texto{/morado}'}</code> • 
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs ml-1">{'{verde}texto{/verde}'}</code> • 
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs ml-1">{'{rosa}texto{/rosa}'}</code> • 
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs ml-1">{'{naranja}texto{/naranja}'}</code>
              </p>
              <p className="text-muted-foreground">Usa <code className="bg-muted px-1.5 py-0.5 rounded text-xs">\n</code> en campos multilínea para saltos de línea.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Text fields by group */}
      {Object.entries(groups).map(([groupName, fields]) => (
        <Card key={groupName} className="border-border/50 bg-card/50">
          <CardHeader>
            <CardTitle className="text-lg">{groupName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map(field => (
                <div key={field.key} className={`space-y-2 ${field.multiline ? 'sm:col-span-2' : ''}`}>
                  <Label htmlFor={field.key}>{field.label}</Label>
                  {field.multiline ? (
                    <Textarea
                      id={field.key}
                      value={customTexts[field.key]}
                      onChange={(e) => updateText(field.key, e.target.value)}
                      className="bg-input/50"
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={field.key}
                      value={customTexts[field.key]}
                      onChange={(e) => updateText(field.key, e.target.value)}
                      className="bg-input/50"
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <div>
        <Button onClick={handleSave} disabled={saving} className="bg-gradient-primary">
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Guardar Configuración
        </Button>
      </div>
    </div>
  );
}
