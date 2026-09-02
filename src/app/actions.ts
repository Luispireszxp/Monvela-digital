"use server";

import { headers } from "next/headers";
import { siteConfig } from "@/content/site";
import { env } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type LeadFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const trimmed = (value: FormDataEntryValue | null, max: number) =>
  (typeof value === "string" ? value : "").trim().slice(0, max);

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // Honeypot: campo invisível que só robôs preenchem.
  if (trimmed(formData.get("company_url"), 200) !== "") {
    return { status: "success", message: siteConfig.contactSection.success };
  }

  const name = trimmed(formData.get("name"), 120);
  const contact = trimmed(formData.get("contact"), 160);
  const business = trimmed(formData.get("business"), 160);
  const segment = trimmed(formData.get("segment"), 80);
  const message = trimmed(formData.get("message"), 2000);

  if (name.length < 1) {
    return { status: "error", message: "Informe o seu nome." };
  }
  if (contact.length < 3) {
    return {
      status: "error",
      message: "Informe um telefone, e-mail ou WhatsApp para contato.",
    };
  }

  if (!env.hasSupabase) {
    return { status: "error", message: siteConfig.contactSection.error };
  }

  try {
    const requestHeaders = await headers();
    const { error } = await getSupabaseServerClient()
      .from("leads")
      .insert({
        name,
        contact,
        business: business || null,
        segment: segment || null,
        message: message || null,
        page: "/",
        user_agent: requestHeaders.get("user-agent")?.slice(0, 500) ?? null,
      });

    if (error) {
      console.error("[submitLead] insert error:", error.message);
      return { status: "error", message: siteConfig.contactSection.error };
    }

    return { status: "success", message: siteConfig.contactSection.success };
  } catch (error) {
    console.error("[submitLead] exception:", error);
    return { status: "error", message: siteConfig.contactSection.error };
  }
}
