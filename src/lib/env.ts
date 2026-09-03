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
const OFFICIAL_WHATSAPP_NUMBER = "5511994369111";

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const rawWhatsapp =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || OFFICIAL_WHATSAPP_NUMBER;
const rawEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
const rawFacebook = process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim();
const rawInstagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
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

/** Aceita apenas http(s) e devolve a URL sem barra final. "" quando ausente/ inválida. */
function resolveHttpUrl(raw: string | undefined, varName: string): string {
  if (!raw) return "";
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error("protocolo não suportado");
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    warn(`${varName} inválida ("${raw}") — ignorada.`);
    return "";
  }
}

const whatsappNumber = (rawWhatsapp ?? "").replace(/\D/g, "");

if (process.env.NODE_ENV === "production" && whatsappNumber === "") {
  warn(
    "NEXT_PUBLIC_WHATSAPP_NUMBER não definida — os botões de WhatsApp abrirão sem destinatário.",
  );
}

const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(rawEmail ?? "");
if (process.env.NODE_ENV === "production" && rawEmail && !isEmail) {
  warn(`NEXT_PUBLIC_CONTACT_EMAIL inválido ("${rawEmail}") — ignorado.`);
}
const contactEmail = isEmail ? (rawEmail as string) : "";

const facebookUrl = resolveHttpUrl(rawFacebook, "NEXT_PUBLIC_FACEBOOK_URL");
const instagramUrl = resolveHttpUrl(rawInstagram, "NEXT_PUBLIC_INSTAGRAM_URL");

export const env = {
  siteUrl: resolveSiteUrl(),
  contactEmail,
  hasEmail: contactEmail !== "",
  whatsappNumber,
  /** DDI + DDD + número: entre 12 e 15 dígitos. */
  hasWhatsapp: whatsappNumber.length >= 12 && whatsappNumber.length <= 15,
  facebookUrl,
  hasFacebook: facebookUrl !== "",
  /** Preparado para o futuro — só exibir quando houver URL. */
  instagramUrl,
  hasInstagram: instagramUrl !== "",
  supabaseUrl: rawSupabaseUrl ?? "",
  supabasePublishableKey: rawSupabaseKey ?? "",
  hasSupabase: Boolean(rawSupabaseUrl && rawSupabaseKey),
} as const;
