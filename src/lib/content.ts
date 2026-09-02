import { siteConfig } from "@/content/site";
import { env } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export type Pillar = {
  title: string;
  description: string;
  note: string | null;
  points: string[];
};
export type FaqItem = { question: string; answer: string };

/**
 * Conteúdo editável das seções Solução (pilares) e Dúvidas (FAQ).
 *
 * Lê do Supabase (tabelas `site_services` / `site_faqs`, só linhas publicadas,
 * ordenadas por `position`). Se o Supabase não estiver configurado, a query
 * falhar ou vier vazia, cai no conteúdo estático de `src/content/site.ts` — o
 * site nunca fica sem essas seções. As linhas do banco são mantidas em sincronia
 * com o `site.ts` por migration.
 *
 * Os projetos-conceito passaram a ser estáticos (`siteConfig.concepts`), porque
 * ganharam campos — capa, previews — que a tabela `site_concepts` não comporta.
 */

const fallbackPillars: Pillar[] = siteConfig.solution.pillars.map((p) => ({
  title: p.title,
  description: p.description,
  note: "note" in p ? p.note : null,
  points: "points" in p ? [...p.points] : [],
}));

const fallbackFaqs: FaqItem[] = siteConfig.faqs.map((f) => ({
  question: f.question,
  answer: f.answer,
}));

export async function getPillars(): Promise<Pillar[]> {
  if (!env.hasSupabase) return fallbackPillars;
  try {
    const { data, error } = await getSupabaseServerClient()
      .from("site_services")
      .select("title, description, note, points")
      .eq("is_published", true)
      .order("position", { ascending: true });
    if (error || !data?.length) return fallbackPillars;
    return data.map((r) => ({
      title: r.title,
      description: r.description,
      note: r.note ?? null,
      points: Array.isArray(r.points) ? r.points : [],
    }));
  } catch {
    return fallbackPillars;
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
