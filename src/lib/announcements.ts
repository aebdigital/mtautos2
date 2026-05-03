import { supabase, SITE_ID } from "./supabase";

export interface AnnouncementPopupConfig {
  title: string;
  description: string;
  enabled: boolean;
}

export async function getAnnouncementPopupForSite(): Promise<AnnouncementPopupConfig | null> {
  const { data: page, error: pageError } = await supabase
    .from("pages")
    .select("id")
    .eq("site_id", SITE_ID)
    .eq("slug", "oznamy")
    .eq("is_public", true)
    .single();

  if (pageError || !page) return null;

  const { data: block, error: blockError } = await supabase
    .from("blocks")
    .select("data")
    .eq("page_id", page.id)
    .eq("type", "announcementPopup")
    .single();

  if (blockError || !block) return null;

  const data = (block as any).data || {};
  if (!data.enabled) return null;

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    enabled: Boolean(data.enabled),
  };
}
