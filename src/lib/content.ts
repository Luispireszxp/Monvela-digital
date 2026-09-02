import { siteConfig } from "@/content/site";
import { env } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type ServiceItem = { title: string; description: string };
export type FaqItem = { question: string; answer: string };
export type ConceptItem = { number: string; segment: string; idea: string };

/**
 * Conteúdo das seções Serviços, Dúvidas e Projetos-conceito.
 *
 * Lê do Supabase (tabelas `site_*`, só linhas publicadas, ordenadas por
 * `position`). Se o Supabase não estiver configurado, a query falhar ou vier
 * vazia, cai no conteúdo estático de `src/content/site.ts` — o site nunca fica
 * sem essas seções.
 */

const fallbackServices: ServiceItem[] = siteConfig.services.map((s) => ({
  title: s.title,
  description: s.description,
}));

const fallbackFaqs: FaqItem[] = siteConfig.faqs.map((f) => ({
  question: f.question,
  answer: f.answer,
}));

const fallbackConcepts: ConceptItem[] = siteConfig.concepts.map((c) => ({
  number: c.number,
  segment: c.segment,
  idea: c.idea,
}));

export async function getServices(): Promise<ServiceItem[]> {
  if (!env.hasSupabase) return fallbackServices;
  try {
    const { data, error } = await getSupabaseServerClient()
      .from("site_services")
      .select("title, description")
      .eq("is_published", true)
      .order("position", { ascending: true });
    if (error || !data?.length) return fallbackServices;
    return data.map((r) => ({ title: r.title, description: r.description }));
  } catch {
    return fallbackServices;
  }
}

export async function getFaqs(): Promise<FaqItem[]> {
  if (!env.hasSupabase) return fallbackFaqs;
  try {
    const { data, error } = await getSupabaseServerClient()
      .from("site_faqs")
      .select("question, answer")
      .eq("is_published", true)
      .order("position", { ascending: true });
    if (error || !data?.length) return fallbackFaqs;
    return data.map((r) => ({ question: r.question, answer: r.answer }));
  } catch {
    return fallbackFaqs;
  }
}

export async function getConcepts(): Promise<ConceptItem[]> {
  if (!env.hasSupabase) return fallbackConcepts;
  try {
    const { data, error } = await getSupabaseServerClient()
      .from("site_concepts")
      .select("number, segment, idea")
      .eq("is_published", true)
      .order("position", { ascending: true });
    if (error || !data?.length) return fallbackConcepts;
    return data.map((r) => ({
      number: r.number,
      segment: r.segment,
      idea: r.idea,
    }));
  } catch {
    return fallbackConcepts;
  }
}
