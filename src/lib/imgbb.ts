 const IMGBB_API_KEY = '1a542fc5d76f2385e9f150b763d2e0b4';
 
 export async function uploadToImgBB(file: File): Promise<string | null> {
   try {
     const formData = new FormData();
     formData.append('image', file);
     formData.append('key', IMGBB_API_KEY);
 
     const response = await fetch('https://api.imgbb.com/1/upload', {
       method: 'POST',
       body: formData,
     });
 
     const data = await response.json();
 
     if (data.success) {
       return data.data.url;
     }
 
     console.error('ImgBB upload failed:', data);
     return null;
   } catch (error) {
     console.error('ImgBB upload error:', error);
     return null;
   }
 }