/**
 * Leitura centralizada das variáveis públicas (NEXT_PUBLIC_*).
 *
 * Next.js substitui `process.env.NEXT_PUBLIC_*` em tempo de build, então cada
 * referência precisa ser uma string estática — não desestruture `process.env`.
 *
 * Nenhuma variável derruba o build: valores ausentes ou inválidos caem em um
 * fallback e registram um aviso no log (visível no build da Vercel), em vez de
 * falharem em silêncio.
 */

const FALLBACK_SITE_URL = "http://localhost:3000";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const rawWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
const rawEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const rawSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const rawSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

function warn(message: string) {
  if (process.env.NODE_ENV !== "test") {
    console.warn(`[env] ${message}`);
  }
}

function resolveSiteUrl(): string {
  if (!rawSiteUrl) {
    if (process.env.NODE_ENV === "production") {
      warn(
        "NEXT_PUBLIC_SITE_URL não definida — usando localhost. sitemap.xml, robots.txt, canonical e Open Graph ficarão incorretos em produção.",
      );
    }
    return FALLBACK_SITE_URL;
  }

  try {
    return new URL(rawSiteUrl).origin;
  } catch {
    warn(`NEXT_PUBLIC_SITE_URL inválida ("${rawSiteUrl}") — usando localhost.`);
    return FALLBACK_SITE_URL;
  }
}

const whatsappNumber = (rawWhatsapp ?? "").replace(/\D/g, "");

if (process.env.NODE_ENV === "production" && whatsappNumber === "") {
  warn(
    "NEXT_PUBLIC_WHATSAPP_NUMBER não definida — os botões de WhatsApp abrirão sem destinatário.",
  );
}

export const env = {
  siteUrl: resolveSiteUrl(),
  contactEmail: rawEmail ?? "",
  whatsappNumber,
  /** DDI + DDD + número: entre 12 e 15 dígitos. */
  hasWhatsapp: whatsappNumber.length >= 12 && whatsappNumber.length <= 15,
  supabaseUrl: rawSupabaseUrl ?? "",
  supabasePublishableKey: rawSupabaseKey ?? "",
  hasSupabase: Boolean(rawSupabaseUrl && rawSupabaseKey),
} as const;
