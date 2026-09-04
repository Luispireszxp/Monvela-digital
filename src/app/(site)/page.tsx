import { About } from "@/components/about";
import { ConceptProjects } from "@/components/concept-projects";
import { Contact } from "@/components/contact";
import { CustomerJourney } from "@/components/customer-journey";
import { Cycle } from "@/components/cycle";
import { DigitalContext } from "@/components/digital-context";
import { FAQ } from "@/components/faq";
import { FeaturedProject } from "@/components/featured-project";
import { FinalCTA } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { InternetMountain } from "@/components/internet-mountain";
import { Partners } from "@/components/partners";
import { Problem } from "@/components/problem";
import { Process } from "@/components/process";
import { Solution } from "@/components/solution";
import { VelaFarewell } from "@/components/vela-farewell";

// Conteúdo das seções Solução (pilares) e Dúvidas (FAQ) vem do Supabase (ISR):
// edições no banco aparecem no site em até 60s, sem novo deploy.
export const revalidate = 60;

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Solution />
      <CustomerJourney />
      <DigitalContext />
      <InternetMountain />
      <Cycle />
      <FeaturedProject />
      <ConceptProjects />
      <Partners />
      <Process />
      <About />
      <FAQ />
      <Contact />
      <FinalCTA />
      <VelaFarewell />
    </main>
  );
}
