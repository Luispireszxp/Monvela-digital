import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "./database.types";

/**
 * Cliente Supabase para uso no servidor (Server Components, Server Actions,
 * Route Handlers).
 *
 * Usa a URL + a chave `publishable` — a mesma exposta ao navegador. Toda a
 * proteção fica no RLS: leitura só de conteúdo publicado; em `leads`, apenas
 * INSERT com origem 'site'. Nunca use `service_role` aqui.
 *
 * Chame apenas quando `env.hasSupabase` for verdadeiro.
 */
export function getSupabaseServerClient() {
  return createClient<Database>(env.supabaseUrl, env.supabasePublishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
