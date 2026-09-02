import { env } from "@/lib/env";

const whatsappMessage =
  "Olá! Conheci a Monvela e gostaria de receber uma ideia inicial para o site do meu negócio.";

export const siteConfig = {
  name: "Monvela Digital",
  shortName: "Monvela",
  description:
    "Criamos sites profissionais para ajudar negócios locais a apresentar seu valor e facilitar o contato com novos clientes.",
  positioning: "Seu negócio, além da fachada.",
  siteUrl: env.siteUrl,
  contactEmail: env.contactEmail,
  whatsappNumber: env.whatsappNumber,
  hasWhatsapp: env.hasWhatsapp,
  whatsappMessage,
  whatsappUrl: `https://wa.me/${env.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  navigation: [
    { label: "Trabalho", href: "#trabalho" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Sobre", href: "#sobre" },
    { label: "Dúvidas", href: "#duvidas" },
    { label: "Contato", href: "#contato" },
  ],
  hero: {
    eyebrow: "Presença digital para negócios locais",
    titleStart: "Seu negócio,",
    titleEnd: "além da fachada.",
    primaryCta: "Receba uma ideia gratuita",
    secondaryCta: "Veja como funciona",
    note: "Uma ideia inicial para o seu projeto, sem compromisso.",
    imageAlt:
      "Arquitetura abstrata iluminada representando a passagem de um negócio físico para o ambiente digital",
    imageNote:
      "Visual conceitual provisório · substituir por imagem definitiva em public/images",
  },
  problem: {
    eyebrow: "O ponto de partida",
    title: "Seu negócio já existe. Agora ele precisa ser encontrado.",
    paragraphs: [
      "Muitos bons negócios já têm qualidade, clientes e uma reputação construída no dia a dia.",
      "Mas, quando alguém procura por eles no celular, ainda encontra poucas informações — ou nenhuma presença que represente o seu verdadeiro valor.",
    ],
  },
  howItWorks: {
    eyebrow: "Como a Monvela trabalha",
    title: "Do espaço físico para uma presença que continua falando pelo seu negócio.",
    description:
      "A Monvela organiza as informações da empresa, desenvolve sua presença digital e cria caminhos simples para o público entrar em contato.",
    accessibleLabel:
      "Seu negócio passa pela Monvela, chega à internet e se apresenta ao público",
  },
  journey: ["Seu negócio", "Monvela", "Internet", "Público"],
  servicesSection: {
    eyebrow: "Soluções essenciais",
    title: "O necessário para o seu negócio começar bem na internet.",
    description:
      "Sem pacotes inflados: uma base objetiva, profissional e fácil de usar.",
  },
  services: [
    {
      title: "Sites profissionais",
      description:
        "Uma apresentação clara e confiável, feita para valorizar o que torna o seu negócio único.",
    },
    {
      title: "Design responsivo",
      description:
        "Páginas que se adaptam ao celular, tablet e computador sem perder qualidade ou legibilidade.",
    },
    {
      title: "Integração com WhatsApp",
      description:
        "Caminhos diretos para transformar interesse em conversa, com uma mensagem inicial já preparada.",
    },
    {
      title: "Localização e mapa",
      description:
        "Endereço, horários e localização organizados para facilitar a visita e o contato do cliente.",
    },
    {
      title: "Domínio e hospedagem",
      description:
        "Orientação para escolher o endereço, a hospedagem e os recursos necessários para colocar o site no ar.",
    },
    {
      title: "Suporte para publicação",
      description:
        "Acompanhamento até a publicação, com manutenção posterior combinada conforme a necessidade.",
    },
  ],
  conceptsSection: {
    eyebrow: "Projetos-conceito",
    title: "Possibilidades para negócios que movimentam cidades.",
    description:
      "Demonstrações de direção criativa para diferentes segmentos. Não representam clientes, contratos ou resultados reais.",
  },
  concepts: [
    {
      number: "01",
      segment: "Gastronomia",
      idea: "Cardápio, ambiente, localização e contato para reservas em uma apresentação convidativa.",
    },
    {
      number: "02",
      segment: "Hotelaria",
      idea: "Acomodações, estrutura, localização e formas de contato apresentadas com clareza.",
    },
    {
      number: "03",
      segment: "Comércio",
      idea: "Produtos, diferenciais e endereço reunidos em uma vitrine digital própria.",
    },
    {
      number: "04",
      segment: "Serviços profissionais",
      idea: "Especialidades, credibilidade e formas de atendimento organizadas sem complicação.",
    },
    {
      number: "05",
      segment: "Setor automotivo",
      idea: "Serviços, estrutura da oficina e contato rápido para orçamentos e agendamentos.",
    },
  ],
  processSection: {
    eyebrow: "Processo",
    title: "Ouvimos. Criamos. Publicamos.",
    description:
      "Um caminho direto, com decisões claras e conversa próxima em cada etapa.",
  },
  process: [
    {
      step: "01",
      title: "Você conta sobre o negócio",
      text: "Entendemos sua realidade, seus clientes e o que precisa ser apresentado.",
    },
    {
      step: "02",
      title: "Preparamos uma ideia inicial",
      text: "Apresentamos uma direção inicial para a conversa — não um site completo ou período de teste.",
    },
    {
      step: "03",
      title: "Você analisa a proposta",
      text: "Alinhamos o escopo, esclarecemos dúvidas e combinamos os próximos passos.",
    },
    {
      step: "04",
      title: "Criamos o site",
      text: "Transformamos o conteúdo em uma experiência profissional e responsiva.",
    },
    {
      step: "05",
      title: "Revisamos e publicamos",
      text: "Ajustamos os detalhes finais e acompanhamos a entrada do projeto no ar.",
    },
  ],
  about: {
    eyebrow: "Sobre a Monvela",
    title: "Tecnologia com conversa simples e presença de verdade.",
    paragraphs: [
      "A Monvela nasceu para ajudar empresas e comércios locais a construir uma presença digital profissional, simples e acessível.",
      "Cada projeto começa com atenção ao negócio real: sua história, seus serviços, seus clientes e a forma como a empresa prefere se comunicar.",
    ],
    values: ["Atendimento próximo", "Projeto personalizado", "Comunicação direta"],
  },
  faqSection: {
    eyebrow: "Dúvidas frequentes",
    title: "Antes de começar, vale deixar tudo claro.",
  },
  faqs: [
    {
      question: "O que está incluído na criação do site?",
      answer:
        "O escopo é definido para cada negócio e pode incluir apresentação da empresa, serviços ou produtos, diferenciais, localização, formas de contato, integração com WhatsApp e preparação para publicação.",
    },
    {
      question: "Preciso já ter um domínio?",
      answer:
        "Não. Se você ainda não tiver um endereço para o site, a Monvela pode orientar a escolha e o registro de um domínio adequado.",
    },
    {
      question: "A Monvela pode ajudar com domínio e hospedagem?",
      answer:
        "Sim. Ajudamos a entender as opções, escolher a estrutura necessária e preparar a publicação. Custos de serviços contratados de terceiros são informados antes de qualquer decisão.",
    },
    {
      question: "O site funciona no celular?",
      answer:
        "Sim. Os projetos são desenvolvidos para funcionar em celulares, tablets e computadores, respeitando as características de cada tela.",
    },
    {
      question: "Posso solicitar alterações?",
      answer:
        "Sim. A etapa de revisão faz parte do processo. A quantidade e o tipo de ajustes são combinados no escopo de cada projeto para que tudo fique claro desde o início.",
    },
    {
      question: "Quanto tempo demora?",
      answer:
        "O prazo depende do tamanho do site, da disponibilidade dos conteúdos e das revisões. Uma estimativa é apresentada antes do início do projeto.",
    },
    {
      question: "Como funciona a ideia inicial gratuita?",
      answer:
        "Você conta brevemente sobre o seu negócio e a Monvela prepara uma direção inicial para a conversa. É uma ideia para o projeto — não um site completo gratuito nem um período de teste.",
    },
    {
      question: "O site aparecerá automaticamente no Google?",
      answer:
        "O projeto será preparado tecnicamente para mecanismos de busca. Porém, indexação e posicionamento dependem de fatores como tempo, conteúdo, concorrência e critérios dos próprios buscadores; por isso, não podem ser garantidos.",
    },
  ],
  contactSection: {
    eyebrow: "Fale com a Monvela",
    title: "Conte sobre o seu negócio.",
    description:
      "Deixe seu contato e um resumo do que você precisa. A Monvela responde com uma ideia inicial para o projeto, sem compromisso.",
    whatsappLabel: "Prefiro falar pelo WhatsApp",
    submitLabel: "Enviar",
    fields: {
      name: "Nome",
      contact: "Telefone, e-mail ou WhatsApp",
      business: "Nome do negócio",
      segment: "Segmento",
      message: "Como podemos ajudar?",
      optional: "opcional",
    },
    success: "Recebido! A Monvela vai responder em breve.",
    error: "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.",
  },
  finalCta: {
    eyebrow: "Seu próximo passo",
    title: "A próxima presença marcante pode ser a sua.",
    description:
      "Conte sobre o seu negócio e receba uma ideia inicial para o seu projeto.",
    button: "Falar com a Monvela no WhatsApp",
  },
  footer: {
    positioning:
      "Sites profissionais para levar negócios locais além da fachada.",
    emailFallback: "E-mail em configuração",
    legal: "Todos os direitos reservados.",
    signature: "Presença local. Alcance digital.",
  },
} as const;
