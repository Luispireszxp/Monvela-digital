/**
 * Arquitetura de medição — nada ativo.
 *
 * Nenhum script de rastreamento é carregado por este arquivo. Google Analytics 4
 * e Meta Pixel só devem ser ligados depois de:
 *   1. IDs reais em `NEXT_PUBLIC_GA4_ID` / `NEXT_PUBLIC_META_PIXEL_ID`;
 *   2. revisão da política de privacidade;
 *   3. consentimento do visitante quando necessário, impedindo o carregamento
 *      antes da escolha.
 *
 * Enquanto os IDs não existirem, `track()` é no-op e `analyticsEnabled` fica
 * tudo `false`. Não inventar IDs.
 */

export type WhatsAppSource =
  | "header"
  | "hero"
  | "floating"
  | "final-cta"
  | "contact"
  | "footer"
  | "process";

type TrackedEvent =
  | { readonly name: "whatsapp_click"; readonly source: WhatsAppSource }
  | { readonly name: "concept_open"; readonly concept: string };

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID?.trim() ?? "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() ?? "";

export const analyticsEnabled = {
  ga4: GA4_ID !== "",
  metaPixel: META_PIXEL_ID !== "",
} as const;

const CAMPAIGN_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

/**
 * Lê os parâmetros UTM e os identificadores de clique (gclid/fbclid) da URL
 * atual — a "campanha que originou o contato". Client-side; `{}` no servidor.
 */
export function readCampaign(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const campaign: Record<string, string> = {};
  for (const key of CAMPAIGN_KEYS) {
    const value = params.get(key);
    if (value) campaign[key] = value.slice(0, 200);
  }
  return campaign;
}

/**
 * Ponto único de envio de eventos. No-op enquanto não houver GA4/Meta Pixel
 * ativos e consentidos. Quando forem ativados, é aqui que os `window.gtag` /
 * `window.fbq` devem ser chamados, já com `readCampaign()` anexado.
 */
export function track(event: TrackedEvent): void {
  if (!analyticsEnabled.ga4 && !analyticsEnabled.metaPixel) return;
  // TODO(analytics): encaminhar para GA4 / Meta Pixel após consentimento.
  //   window.gtag?.("event", event.name, { ...event, ...readCampaign() });
  //   window.fbq?.("trackCustom", event.name, { ...event });
  void event;
}

export function trackWhatsAppClick(source: WhatsAppSource): void {
  track({ name: "whatsapp_click", source });
}

export function trackConceptOpen(concept: string): void {
  track({ name: "concept_open", concept });
}
