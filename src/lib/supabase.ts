import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const GALLERY_BUCKET = 'Gallery_GreenLeaf';

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  description: string;
  order_index: number;
  created_at: string;
  admin_id: string | null;
}

export interface ContactInfo {
  id: string;
  phone_number: string;
  email: string;
  whatsapp_number: string;
  updated_at: string;
}
