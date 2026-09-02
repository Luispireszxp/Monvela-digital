import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Política de privacidade provisória do site da Monvela Digital.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="legal-page">
        <article className="shell legal-content">
          <Link className="back-link" href="/">← Voltar para o início</Link>
          <p className="eyebrow">Documento institucional</p>
          <h1>Política de privacidade</h1>
          <p className="legal-lead">Esta é uma versão inicial, preparada para a estrutura atual do site. Ela deverá ser revisada antes da ativação de formulários, métricas ou novas integrações.</p>
          <section>
            <h2>Dados de navegação</h2>
            <p>Neste primeiro ciclo, não foram adicionados formulários, autenticação, banco de dados, Google Analytics ou Meta Pixel. A infraestrutura de hospedagem escolhida futuramente poderá manter registros técnicos básicos para segurança e funcionamento.</p>
          </section>
          <section>
            <h2>Contato pelo WhatsApp</h2>
            <p>Ao escolher falar com a Monvela pelo WhatsApp, você será direcionado para uma plataforma externa. O tratamento das informações enviadas nessa conversa também está sujeito às regras dessa plataforma.</p>
          </section>
          <section>
            <h2>Serviços futuros</h2>
            <p>Caso ferramentas de análise, formulários ou outros serviços sejam adicionados, esta política será atualizada antes da ativação e os mecanismos de consentimento necessários serão avaliados.</p>
          </section>
          <section>
            <h2>Contato</h2>
            <p>As informações oficiais de contato serão publicadas assim que forem definidas pela Monvela Digital.</p>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}
