import { supabase, SITE_ID } from "./supabase";

export interface ContactConfig {
  phones: string[];
  email?: string;
  address?: string;
  openingHours?: string;
}

export interface VacationPhoneConfig {
  phone: string;
  enabled: boolean;
}

export async function getVacationPhonesForSite(): Promise<VacationPhoneConfig[]> {
  const { data: pages, error: pageError } = await supabase
    .from("pages")
    .select("id")
    .eq("site_id", SITE_ID)
    .eq("slug", "dovolenka")
    .eq("is_public", true);

  if (pageError || !pages?.length) return [];

  const { data: blocks, error: blockError } = await supabase
    .from("blocks")
    .select("data")
    .eq("page_id", pages[0].id)
    .eq("type", "vacationPhone")
    .order("created_at", { ascending: true });

  if (blockError || !blocks?.length) return [];

  return (blocks as any[])
    .map((block) => block.data || {})
    .filter((data) => !data.enabled && data.phone)
    .map((data) => ({
      phone: String(data.phone),
      enabled: false,
    }));
}

export async function getContactForSite(): Promise<ContactConfig | null> {
  const { data: pages, error: pageError } = await supabase
    .from("pages")
    .select("id")
    .eq("site_id", SITE_ID)
    .eq("slug", "kontakt")
    .eq("is_public", true);

  if (pageError || !pages?.length) return null;

  const { data: blocks, error: blockError } = await supabase
    .from("blocks")
    .select("data")
    .eq("page_id", pages[0].id)
    .eq("type", "contactInfo");

  if (blockError || !blocks?.length) return null;

  const data = (blocks[0] as any).data || {};

  return {
    phones: data.phones ?? [],
    email: data.email ?? "",
    address: data.address ?? "",
    openingHours: data.openingHours ?? "",
  };
}

export async function getActivePhonesForSite(): Promise<string[]> {
  const vacationPhones = await getVacationPhonesForSite();
  if (vacationPhones.length > 0) {
    return vacationPhones.map((phone) => phone.phone);
  }

  const contactConfig = await getContactForSite();
  return contactConfig?.phones?.length ? contactConfig.phones : [];
}
