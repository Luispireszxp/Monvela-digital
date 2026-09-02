import { About } from "@/components/about";
import { ConceptProjects } from "@/components/concept-projects";
import { Contact } from "@/components/contact";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Problem } from "@/components/problem";
import { Process } from "@/components/process";
import { Services } from "@/components/services";

// Conteúdo das seções Serviços/Dúvidas/Projetos vem do Supabase (ISR):
// edições no banco aparecem no site em até 60s, sem novo deploy.
export const revalidate = 60;

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <HowItWorks />
      <Services />
      <ConceptProjects />
      <Process />
      <About />
      <FAQ />
      <Contact />
      <FinalCTA />
    </main>
  );
}
