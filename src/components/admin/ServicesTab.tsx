 import { useState } from 'react';
 import { Service } from '@/lib/supabase';
 import { Button } from '@/components/ui/button';
 import { Card, CardContent } from '@/components/ui/card';
 import { ServiceForm } from './ServiceForm';
 import { Plus, Pencil, Trash2 } from 'lucide-react';
 import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
 } from '@/components/ui/alert-dialog';
 import { toast } from 'sonner';
 
 interface ServicesTabProps {
   services: Service[];
   onCreate: (service: Partial<Service>) => Promise<boolean>;
   onUpdate: (id: string, updates: Partial<Service>) => Promise<boolean>;
   onDelete: (id: string) => Promise<boolean>;
 }
 
 export function ServicesTab({ services, onCreate, onUpdate, onDelete }: ServicesTabProps) {
   const [editingService, setEditingService] = useState<Service | null>(null);
   const [isCreating, setIsCreating] = useState(false);
   const [deleteId, setDeleteId] = useState<string | null>(null);
 
   const handleCreate = async (data: Partial<Service>) => {
     const success = await onCreate(data);
     if (success) {
       toast.success('Servicio creado exitosamente');
       setIsCreating(false);
     } else {
       toast.error('Error al crear el servicio');
     }
   };
 
   const handleUpdate = async (data: Partial<Service>) => {
     if (!editingService) return;
     const success = await onUpdate(editingService.id, data);
     if (success) {
       toast.success('Servicio actualizado exitosamente');
       setEditingService(null);
     } else {
       toast.error('Error al actualizar el servicio');
     }
   };
 
   const handleDelete = async () => {
     if (!deleteId) return;
     const success = await onDelete(deleteId);
     if (success) {
       toast.success('Servicio eliminado exitosamente');
     } else {
       toast.error('Error al eliminar el servicio');
     }
     setDeleteId(null);
   };
 
   if (isCreating) {
     return (
       <ServiceForm
         onSubmit={handleCreate}
         onCancel={() => setIsCreating(false)}
       />
     );
   }
 
   if (editingService) {
     return (
       <ServiceForm
         service={editingService}
         onSubmit={handleUpdate}
         onCancel={() => setEditingService(null)}
       />
     );
   }
 
   return (
     <div className="space-y-6">
       <div className="flex items-center justify-between">
         <h2 className="text-xl font-semibold">Servicios ({services.length})</h2>
         <Button onClick={() => setIsCreating(true)} className="bg-gradient-primary">
           <Plus className="mr-2 h-4 w-4" />
           Agregar Servicio
         </Button>
       </div>
 
       <div className="grid gap-4">
         {services.map((service) => (
           <Card key={service.id} className="border-border/50 bg-card/50">
             <CardContent className="flex items-center gap-4 p-4">
               {service.image_url ? (
                 <img
                   src={service.image_url}
                   alt={service.title}
                   className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                 />
               ) : (
                 <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-primary">
                   <span className="text-2xl">💻</span>
                 </div>
               )}
               
               <div className="flex-1 min-w-0">
                 <h3 className="font-semibold truncate">{service.title}</h3>
                 <p className="text-sm text-muted-foreground truncate">
                   {service.short_description}
                 </p>
                 <span className={`text-xs ${service.is_active ? 'text-green-500' : 'text-red-500'}`}>
                   {service.is_active ? 'Activo' : 'Inactivo'}
                 </span>
               </div>
               
               <div className="flex items-center gap-2">
                 <Button
                   variant="ghost"
                   size="icon"
                   onClick={() => setEditingService(service)}
                 >
                   <Pencil className="h-4 w-4" />
                 </Button>
                 <Button
                   variant="ghost"
                   size="icon"
                   onClick={() => setDeleteId(service.id)}
                   className="text-destructive hover:text-destructive"
                 >
                   <Trash2 className="h-4 w-4" />
                 </Button>
               </div>
             </CardContent>
           </Card>
         ))}
 
         {services.length === 0 && (
           <p className="text-center text-muted-foreground py-8">
             No hay servicios. Agrega uno para comenzar.
           </p>
         )}
       </div>
 
       <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
         <AlertDialogContent className="border-border/50 bg-card">
           <AlertDialogHeader>
             <AlertDialogTitle>¿Eliminar servicio?</AlertDialogTitle>
             <AlertDialogDescription>
               Esta acción no se puede deshacer. El servicio será eliminado permanentemente.
             </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogCancel>Cancelar</AlertDialogCancel>
             <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
               Eliminar
             </AlertDialogAction>
           </AlertDialogFooter>
         </AlertDialogContent>
       </AlertDialog>
     </div>
   );
 }