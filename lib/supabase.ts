import { createClient } from "@supabase/supabase-js";

// Default Supabase project credentials for Forever You app
const DEFAULT_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xyzcompanyfg.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

export const getSupabaseClient = (customUrl?: string, customKey?: string) => {
  const url = customUrl || DEFAULT_SUPABASE_URL;
  const key = customKey || DEFAULT_SUPABASE_ANON_KEY;
  if (!url || !key || url.includes("xyzcompanyfg")) return null;
  try {
    return createClient(url, key);
  } catch (err) {
    console.error("Supabase client init error:", err);
    return null;
  }
};

/**
 * Fetch latest CMS configuration from Supabase table 'site_config'
 */
export async function fetchSiteConfigFromSupabase(supabaseUrl?: string, supabaseKey?: string) {
  const client = getSupabaseClient(supabaseUrl, supabaseKey);
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("site_config")
      .select("config_data")
      .eq("id", "main_config")
      .single();

    if (error) {
      console.warn("Supabase fetch warning:", error.message);
      return null;
    }

    if (data && data.config_data) {
      return data.config_data;
    }
  } catch (err) {
    console.error("Failed to fetch from Supabase:", err);
  }
  return null;
}

/**
 * Save CMS configuration to Supabase table 'site_config'
 */
export async function saveSiteConfigToSupabase(config: any, supabaseUrl?: string, supabaseKey?: string) {
  const client = getSupabaseClient(supabaseUrl, supabaseKey);
  if (!client) return false;

  try {
    const { error } = await client
      .from("site_config")
      .upsert(
        {
          id: "main_config",
          config_data: config,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Supabase save error:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Failed to save to Supabase:", err);
    return false;
  }
}

/**
 * Upload image file to Supabase Storage Bucket 'memories'
 */
export async function uploadImageToSupabase(file: File, supabaseUrl?: string, supabaseKey?: string): Promise<string | null> {
  const client = getSupabaseClient(supabaseUrl, supabaseKey);
  if (!client) return null;

  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `memory_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await client.storage
      .from("memories")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error("Supabase image upload error:", uploadError.message);
      return null;
    }

    const { data } = client.storage.from("memories").getPublicUrl(filePath);
    return data.publicUrl || null;
  } catch (err) {
    console.error("Failed to upload image to Supabase:", err);
    return null;
  }
}
