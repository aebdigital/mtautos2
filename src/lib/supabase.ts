import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;

export const SITE_ID = process.env.NEXT_PUBLIC_SITE_ID || process.env.REACT_APP_SITE_ID || "";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
});

const useImageTransforms =
  (process.env.NEXT_PUBLIC_SUPABASE_IMAGE_TRANSFORMS ?? "").toLowerCase() === "true";

export function getImageUrl(imagePath?: string | null): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  // When Supabase image transforms are enabled (Pro plan), we ask Supabase to
  // pre-resize the original to a sane upper bound. Next/Image (via Netlify's
  // image CDN) will then further downsize per-breakpoint without ever pulling
  // the multi-MB camera original.
  if (useImageTransforms) {
    return `${supabaseUrl}/storage/v1/render/image/public/site-uploads/${imagePath}?width=1600&quality=80&resize=contain`;
  }
  return `${supabaseUrl}/storage/v1/object/public/site-uploads/${imagePath}`;
}
