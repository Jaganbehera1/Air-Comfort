type MediaType = 'image' | 'video';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudinaryApiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
const cloudinaryApiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
}

export async function uploadFileToCloudinary(file: File, type: MediaType): Promise<CloudinaryUploadResult> {
  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary is not configured. Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET.');
  }

  const resourceType = type === 'video' ? 'video' : 'image';
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'greenleaf-gallery');
  formData.append('resource_type', resourceType);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: 'POST',
    body: formData,
  });

  const payload = await response.json();

  if (!response.ok || payload.error) {
    throw new Error(payload.error?.message || 'Cloudinary upload failed.');
  }

  return {
    url: payload.secure_url as string,
    publicId: payload.public_id as string,
  };
}

export async function deleteFileFromCloudinary(publicId: string, type: MediaType): Promise<boolean> {
  if (!cloudName || !cloudinaryApiKey || !cloudinaryApiSecret || !publicId) {
    return false;
  }

  const resourceType = type === 'video' ? 'video' : 'image';
  const params = new URLSearchParams({
    public_id: publicId,
    api_key: cloudinaryApiKey,
    api_secret: cloudinaryApiSecret,
    resource_type: resourceType,
  });

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/destroy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const payload = await response.json();
  return response.ok && payload.result === 'ok';
}
