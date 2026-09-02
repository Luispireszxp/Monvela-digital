"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="legal-page">
      <article className="shell legal-content">
        <p className="eyebrow">Algo deu errado</p>
        <h1>Não foi possível carregar esta página.</h1>
        <p className="legal-lead">
          Tente novamente em instantes. Se o problema continuar, fale com a
          Monvela pelo WhatsApp.
        </p>
        <button className="button" type="button" onClick={() => reset()}>
          Tentar de novo
        </button>
      </article>
    </main>
  );
}
