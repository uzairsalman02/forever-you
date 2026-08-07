import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Retrieve default env credentials or fallback to browser local storage
export function getSupabaseCredentials() {
  if (typeof window !== "undefined") {
    const customUrl = localStorage.getItem("forever_you_supabase_url");
    const customKey = localStorage.getItem("forever_you_supabase_key");
    if (customUrl && customKey) {
      return { url: customUrl.trim(), key: customKey.trim() };
    }
  }

  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (envUrl && envKey && !envUrl.includes("xyzcompanyfg")) {
    return { url: envUrl.trim(), key: envKey.trim() };
  }

  return null;
}

export function getSupabaseClient(customUrl?: string, customKey?: string): SupabaseClient | null {
  const creds = (customUrl && customKey)
    ? { url: customUrl.trim(), key: customKey.trim() }
    : getSupabaseCredentials();

  if (!creds || !creds.url || !creds.key) return null;

  try {
    return createClient(creds.url, creds.key, {
      auth: { persistSession: false },
    });
  } catch (err) {
    console.error("Supabase client init error:", err);
    return null;
  }
}

/**
 * Test Connection to Supabase database table 'site_config'
 */
export async function testSupabaseConnection(customUrl?: string, customKey?: string): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient(customUrl, customKey);
  if (!client) {
    return { success: false, message: "Supabase URL or Anon Key is missing." };
  }

  try {
    const { data, error } = await client
      .from("site_config")
      .select("id")
      .limit(1);

    if (error) {
      if (error.code === "42P01") {
        return { success: false, message: "Table 'site_config' does not exist yet. Please run the SQL script." };
      }
      return { success: false, message: `Database error: ${error.message}` };
    }

    return { success: true, message: "✅ Successfully connected to Supabase Database!" };
  } catch (err: any) {
    return { success: false, message: `Connection failed: ${err?.message || "Unknown error"}` };
  }
}

/**
 * Fetch latest CMS configuration from Supabase table 'site_config'
 */
export async function fetchSiteConfigFromSupabase(customUrl?: string, customKey?: string) {
  const client = getSupabaseClient(customUrl, customKey);
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
export async function saveSiteConfigToSupabase(config: any, customUrl?: string, customKey?: string): Promise<boolean> {
  const client = getSupabaseClient(customUrl, customKey);
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
export async function uploadImageToSupabase(file: File, customUrl?: string, customKey?: string): Promise<string | null> {
  const client = getSupabaseClient(customUrl, customKey);
  if (!client) return null;

  try {
    const fileExt = file.name.split(".").pop() || "jpg";
    const fileName = `memory_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await client.storage
      .from("memories")
      .upload(filePath, file, { upsert: true, cacheControl: "3600" });

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

/**
 * Real-time Supabase subscription for config changes
 */
export function subscribeToConfigChanges(onConfigUpdated: (newConfig: any) => void, customUrl?: string, customKey?: string) {
  const client = getSupabaseClient(customUrl, customKey);
  if (!client) return () => {};

  try {
    const channel = client
      .channel("site_config_realtime_changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "site_config",
          filter: "id=eq.main_config",
        },
        (payload) => {
          if (payload.new && payload.new.config_data) {
            onConfigUpdated(payload.new.config_data);
          }
        }
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "site_config",
          filter: "id=eq.main_config",
        },
        (payload) => {
          if (payload.new && payload.new.config_data) {
            onConfigUpdated(payload.new.config_data);
          }
        }
      )
      .subscribe();

    return () => {
      client.removeChannel(channel);
    };
  } catch (err) {
    console.error("Failed to subscribe to Supabase realtime channel:", err);
    return () => {};
  }
}
