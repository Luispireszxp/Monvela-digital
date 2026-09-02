import { About } from "@/components/about";
import { ConceptProjects } from "@/components/concept-projects";
import { FAQ } from "@/components/faq";
import { FinalCTA } from "@/components/final-cta";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Problem } from "@/components/problem";
import { Process } from "@/components/process";
import { Services } from "@/components/services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Services />
        <ConceptProjects />
        <Process />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
