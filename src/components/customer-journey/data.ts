/**
 * Dados fictícios da jornada. Nenhum hotel, marca ou avaliação real —
 * é uma encenação para explicar o comportamento do cliente.
 *
 * Ficam separados dos componentes para o texto não se repetir na marcação e
 * para a história ser ajustada em um lugar só.
 */

export const SEARCH_QUERY = "hotéis mais próximos";

export type SearchResult = {
  readonly id: string;
  readonly name: string;
  readonly rating: string;
  readonly place: string;
  /** Etiqueta à direita do cartão. */
  readonly tag: string;
  /** Só o escolhido tem site — é o ponto da história. */
  readonly hasSite: boolean;
  /** Gradiente da miniatura (ilustração, não foto de lugar real). */
  readonly thumb: string;
};

export const RESULTS: readonly SearchResult[] = [
  {
    id: "serra-azul",
    name: "Hotel Serra Azul",
    rating: "4,8",
    place: "0,4 km · Centro",
    tag: "Site disponível",
    hasSite: true,
    thumb: "linear-gradient(160deg, #24506e, #14324a 55%, #0b2033)",
  },
  {
    id: "bela-vista",
    name: "Pousada Bela Vista",
    rating: "4,6",
    place: "0,7 km · Centro",
    tag: "Sem site",
    hasSite: false,
    thumb: "linear-gradient(160deg, #3b4a3a, #23302a 55%, #16211d)",
  },
  {
    id: "vale-verde",
    name: "Hotel Vale Verde",
    rating: "4,5",
    place: "1,1 km · Centro",
    tag: "Contato incompleto",
    hasSite: false,
    thumb: "linear-gradient(160deg, #4a4034, #2f2924 55%, #1e1a17)",
  },
];

/** O escolhido: o único com site, e por isso o que ganha a decisão. */
export const CHOSEN = RESULTS[0];

export const HOTEL_SITE = {
  kicker: "Hotel",
  name: "Serra Azul",
  rating: "4,8",
  reviews: "524 avaliações",
  headline: "Refúgio entre montanhas e natureza.",
  description:
    "Suítes com vista panorâmica, gastronomia da serra e experiências guiadas.",
  primaryAction: "Ver quartos",
  whatsappAction: "Conversar no WhatsApp",
} as const;

export const REACTION = "Gostei desse aqui!!!";

export const CHAT = {
  contact: "Hotel Serra Azul",
  status: "online",
  day: "Hoje",
  message: "Olá! Gostaria de saber mais sobre as acomodações.",
  time: "11:42",
} as const;

/** Descrição da história para leitores de tela. */
export const STORY_DESCRIPTION =
  "Encenação da jornada de um cliente: ele pesquisa “hotéis mais próximos” no celular, " +
  "compara três opções, escolhe a única que tem site próprio, visita o site do Hotel Serra Azul " +
  "e conversa com o hotel pelo WhatsApp. Todos os nomes e avaliações são fictícios.";
