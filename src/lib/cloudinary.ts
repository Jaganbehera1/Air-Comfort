const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_FOLDER = import.meta.env.VITE_CLOUDINARY_FOLDER || 'aircomfort/gallery';

export async function uploadMediaToCloudinary(
  file: File,
  type: 'image' | 'video' = 'image',
  folder: string = CLOUDINARY_FOLDER
): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error('Cloudinary environment variables are not configured.');
  }

  const resourceType = type === 'video' ? 'video' : 'image';
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || 'Cloudinary upload failed.');
  }

  return result.secure_url as string;
}
