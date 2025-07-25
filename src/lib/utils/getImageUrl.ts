import { supabase } from '@/api/supabase';

export const getProfileImg = (path: string) => {
  const { data } = supabase.storage.from('image').getPublicUrl(path);
  return data.publicUrl;
};
