import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Política de privacidade provisória do site da Monvela Digital.",
  alternates: { canonical: "/politica-de-privacidade" },
};

// Página legal muda pouco; revalida uma vez por dia (mantém o ano do rodapé em dia).
export const revalidate = 86400;

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <article className="shell legal-content">
        <Link className="back-link" href="/">← Voltar para o início</Link>
        <p className="eyebrow">Documento institucional</p>
        <h1>Política de privacidade</h1>
        <p className="legal-lead">
          Esta é uma versão inicial. Ela descreve o tratamento de dados na
          estrutura atual do site e deverá ser revisada — com a identificação
          formal do responsável e da base legal — antes da divulgação pública
          definitiva.
        </p>
        <section>
          <h2>Formulário de contato</h2>
          <p>
            Ao enviar o formulário de contato, os dados informados (nome, forma
            de contato e, opcionalmente, nome do negócio, segmento e mensagem)
            são armazenados em um banco de dados hospedado na Supabase, com a
            finalidade única de responder à sua solicitação. Esses dados não são
            usados para publicidade nem compartilhados com terceiros para fins
            comerciais.
          </p>
        </section>
        <section>
          <h2>Métricas de uso</h2>
          <p>
            O site utiliza o Vercel Web Analytics, que mede visitas e páginas
            acessadas de forma agregada, sem cookies e sem identificar
            visitantes individualmente. Não há Google Analytics nem Meta Pixel.
          </p>
        </section>
        <section>
          <h2>Contato pelo WhatsApp</h2>
          <p>
            Ao escolher falar com a Monvela pelo WhatsApp, você será direcionado
            para uma plataforma externa. O tratamento das informações enviadas
            nessa conversa também está sujeito às regras dessa plataforma.
          </p>
        </section>
        <section>
          <h2>Hospedagem e registros técnicos</h2>
          <p>
            A infraestrutura de hospedagem (Vercel) pode manter registros
            técnicos básicos, como endereço IP e informações do navegador, para
            segurança e funcionamento do site.
          </p>
        </section>
        <section>
          <h2>Seus direitos e contato</h2>
          <p>
            Você pode solicitar acesso, correção ou exclusão dos dados enviados
            pelo formulário. As informações oficiais de contato do responsável
            pelo tratamento serão publicadas assim que forem definidas pela
            Monvela Digital.
          </p>
        </section>
      </article>
    </main>
  );
}
