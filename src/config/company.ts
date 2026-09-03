import { env } from "@/lib/env";

/**
 * Fonte única de contato e presença externa da Monvela.
 *
 * Nenhum número, e-mail ou link fica espalhado pelos componentes — tudo sai
 * daqui, e os valores reais entram por variável de ambiente (NEXT_PUBLIC_*).
 * Enquanto uma variável não existir, o recurso correspondente não aparece no
 * site (Facebook, e-mail, Instagram) ou mantém o comportamento neutro
 * (WhatsApp sem destinatário).
 */

export const WHATSAPP_MESSAGE =
  "Olá! Conheci a Monvela pelo site e gostaria de receber uma ideia para o meu negócio.";

/**
 * - Com número configurado: https://wa.me/55DDDNUMERO?text=MENSAGEM
 * - Sem número: mantém o comportamento atual — abre o WhatsApp com a mensagem
 *   pronta para compartilhar, sem destinatário definido.
 */
function buildWhatsappUrl(): string {
  const text = encodeURIComponent(WHATSAPP_MESSAGE);
  return env.hasWhatsapp
    ? `https://wa.me/${env.whatsappNumber}?text=${text}`
    : `https://wa.me/?text=${text}`;
}

function formatBrazilianPhone(number: string): string {
  const match = number.match(/^55(\d{2})(\d{5})(\d{4})$/);
  return match ? `+55 (${match[1]}) ${match[2]}-${match[3]}` : number;
}

export type Partner = {
  /** Nome do parceiro — usado também no texto alternativo do logo. */
  readonly name: string;
  /** Caminho do logo em /public (ex.: "/brand/partners/exemplo.svg"). */
  readonly logo: string;
  /** Site ou perfil oficial. Abre em nova aba. */
  readonly url: string;
  /** Uma linha sobre a parceria. */
  readonly description: string;
};

/**
 * Parceiros / clientes exibidos na home.
 *
 * Vazio por padrão: a seção inteira não é renderizada enquanto a lista estiver
 * vazia (nada de logos fictícios ou caixa vazia). Para adicionar um parceiro:
 *  1. salve o logo em `public/brand/partners/` (SVG ou PNG com fundo
 *     transparente, legível em fundo claro e escuro);
 *  2. inclua um item aqui com `name`, `logo`, `url` e `description`.
 */
const partners: readonly Partner[] = [];

export const company = {
  name: "Monvela Digital",
  shortName: "Monvela",

  siteUrl: env.siteUrl,

  whatsappNumber: env.whatsappNumber,
  whatsappDisplay: formatBrazilianPhone(env.whatsappNumber),
  hasWhatsapp: env.hasWhatsapp,
  whatsappMessage: WHATSAPP_MESSAGE,
  whatsappUrl: buildWhatsappUrl(),
  phoneUrl: env.hasWhatsapp ? `tel:+${env.whatsappNumber}` : "",

  contactEmail: env.contactEmail,
  hasEmail: env.hasEmail,

  facebookUrl: env.facebookUrl,
  hasFacebook: env.hasFacebook,
  facebookLabel: "Acompanhe a Monvela no Facebook",

  /** Config pronta para o futuro — não exibir enquanto `hasInstagram` for falso. */
  instagramUrl: env.instagramUrl,
  hasInstagram: env.hasInstagram,

  partners,
  hasPartners: partners.length > 0,
} as const;
