import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="legal-page">
      <article className="shell legal-content">
        <p className="eyebrow">Erro 404</p>
        <h1>Esta página não existe.</h1>
        <p className="legal-lead">
          O endereço que você abriu pode ter mudado de lugar ou nunca ter
          existido. Volte para o início e siga a partir de lá.
        </p>
        <Link className="back-link" href="/">
          ← Voltar para o início
        </Link>
      </article>
    </main>
  );
}
