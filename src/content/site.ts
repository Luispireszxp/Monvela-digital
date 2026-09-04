import { company } from "@/config/company";

type NavItem = { readonly label: string; readonly href: string };
type SectionIntro = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
};
type Consequence = { readonly title: string; readonly text: string };
type Pillar = {
  readonly title: string;
  readonly description: string;
  readonly note?: string;
  readonly points?: readonly string[];
};
type CycleStep = { readonly label: string; readonly text: string };
type ConceptItem = {
  readonly name: string;
  readonly segment: string;
  readonly description: string;
  /** Caminhos em /public. Vazios por enquanto — degradam para um marcador. */
  readonly coverImage: string;
  readonly desktopPreview: string;
  readonly mobilePreview: string;
};
type ProcessStep = {
  readonly step: string;
  readonly title: string;
  readonly text: string;
};
type FaqItem = { readonly question: string; readonly answer: string };
type VelaFarewell = {
  readonly eyebrow: string;
  readonly title: string;
  /** Ponto final em destaque, na cor de acento. */
  readonly titleMark: string;
  readonly description: string;
};
type FeaturedProject = {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly hint: string;
  readonly projectName: string;
  readonly projectUrl: string;
  /** Alt da captura de tela real dentro do notebook. */
  readonly screenshotAlt: string;
};

export interface SiteConfig {
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
  readonly positioning: string;
  readonly siteUrl: string;
  readonly contactEmail: string;
  readonly whatsappNumber: string;
  readonly whatsappDisplay: string;
  readonly hasWhatsapp: boolean;
  readonly whatsappMessage: string;
  readonly whatsappUrl: string;
  readonly phoneUrl: string;
  readonly navigation: readonly NavItem[];
  readonly hero: {
    readonly titleStart: string;
    readonly titleEnd: string;
    /** Fecha a pergunta em destaque, na cor de acento. */
    readonly titleMark: string;
    readonly description: string;
    readonly primaryCta: string;
    readonly note: string;
    readonly scrollHint: string;
    readonly scrollHref: string;
    /** Texto alternativo da cena animada. */
    readonly animationLabel: string;
  };
  readonly problem: {
    readonly eyebrow: string;
    readonly title: string;
    readonly intro: string;
    readonly consequences: readonly Consequence[];
  };
  readonly journey: {
    readonly eyebrow: string;
    readonly title: string;
    readonly closing: string;
    readonly closingNote: string;
  };
  readonly digitalContext: {
    readonly eyebrow: string;
    readonly title: string;
    readonly journeyTitle: string;
    readonly closing: string;
    readonly sourceLabel: string;
    readonly sourceUrl: string;
  };
  readonly internetMountain: {
    readonly eyebrow: string;
    readonly title: string;
    /** Descrição da cena para leitores de tela e prefers-reduced-motion. */
    readonly a11y: string;
  };
  readonly solution: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly pillars: readonly Pillar[];
  };
  readonly cycle: {
    readonly eyebrow: string;
    readonly title: string;
    readonly accessibleLabel: string;
    readonly steps: readonly CycleStep[];
  };
  readonly featuredProject: FeaturedProject;
  readonly conceptsSection: SectionIntro & {
    readonly disclaimer: string;
    readonly ctaLabel: string;
  };
  readonly concepts: readonly ConceptItem[];
  readonly partnersSection: SectionIntro;
  readonly processSection: SectionIntro;
  readonly process: readonly ProcessStep[];
  readonly about: {
    readonly eyebrow: string;
    readonly title: string;
    readonly paragraphs: readonly string[];
    readonly values: readonly string[];
  };
  readonly faqSection: {
    readonly eyebrow: string;
    readonly title: string;
  };
  readonly faqs: readonly FaqItem[];
  readonly contactSection: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly whatsappLabel: string;
    readonly submitLabel: string;
    readonly fields: {
      readonly name: string;
      readonly contact: string;
      readonly business: string;
      readonly segment: string;
      readonly message: string;
      readonly optional: string;
    };
    readonly success: string;
    readonly error: string;
  };
  readonly finalCta: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly button: string;
  };
  readonly velaFarewell: VelaFarewell;
  readonly footer: {
    readonly positioning: string;
    readonly emailFallback: string;
    readonly legal: string;
    readonly signature: string;
  };
}

export const siteConfig = {
  name: company.name,
  shortName: company.shortName,
  description:
    "A Monvela cria e estrutura a presença digital de negócios locais — do site e domínio à divulgação, análise de resultados e ferramentas de gestão.",
  positioning: "Presença digital que cresce com o seu negócio.",
  siteUrl: company.siteUrl,
  contactEmail: company.contactEmail,
  whatsappNumber: company.whatsappNumber,
  whatsappDisplay: company.whatsappDisplay,
  hasWhatsapp: company.hasWhatsapp,
  whatsappMessage: company.whatsappMessage,
  whatsappUrl: company.whatsappUrl,
  phoneUrl: company.phoneUrl,
  navigation: [
    { label: "Soluções", href: "/#solucoes" },
    { label: "Projetos", href: "/#projetos" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Dúvidas", href: "/#duvidas" },
    { label: "Contato", href: "/#contato" },
  ],
  hero: {
    titleStart: "Seu negócio existe.",
    titleEnd: "Mas ele também existe no digital",
    titleMark: "?",
    description:
      "Seus clientes procuram soluções na internet. A Monvela conecta o seu negócio às pessoas certas.",
    primaryCta: "Levar meu negócio para o digital",
    note: "Atendimento direto pelo WhatsApp, sem formulários e sem compromisso.",
    scrollHint: "Role para conhecer as soluções",
    scrollHref: "#solucoes",
    animationLabel:
      "Ilustração animada: um comércio local tenta se conectar a um celular e à internet, mas o caminho se rompe no meio, mostrando a ausência de presença digital.",
  },
  problem: {
    eyebrow: "O que está em jogo",
    title: "Seu negócio está aberto. Mas será que está sendo encontrado?",
    intro:
      "Antes de visitar uma empresa, muitas pessoas pesquisam, comparam opções e procuram informações no celular. Sem uma presença digital organizada, um bom negócio pode perder visibilidade, credibilidade e oportunidades de contato.",
    consequences: [
      {
        title: "Menos chances de ser encontrado",
        text: "Quem procura pelo celular pode simplesmente não chegar até a sua empresa.",
      },
      {
        title: "Dificuldade para transmitir confiança",
        text: "Sem um espaço próprio e organizado, fica mais difícil mostrar o valor do seu trabalho.",
      },
      {
        title: "Espaço para o concorrente aparecer primeiro",
        text: "Quando a informação não está do seu lado, costuma estar do lado de quem se organizou.",
      },
    ],
  },
  journey: {
    eyebrow: "Comportamento de quem procura",
    title: "Pesquisa, compara e decide — tudo antes de sair de casa.",
    closing: "Quem encontra, compara. Quem confia, entra em contato.",
    closingNote:
      "Um site profissional ajuda sua empresa a participar da decisão do cliente.",
  },
  digitalContext: {
    eyebrow: "Contexto digital",
    title: "Onde seus clientes procuram?",
    journeyTitle: "Sua presença precisa acompanhar toda a jornada",
    closing:
      "A Monvela conecta seu negócio aos canais onde seus clientes pesquisam, descobrem e conversam.",
    sourceLabel: "Fonte: StatCounter Global Stats — agosto de 2026.",
    sourceUrl: "https://gs.statcounter.com/search-engine-market-share/all/brazil",
  },
  internetMountain: {
    eyebrow: "Presença digital",
    title: "Ganhar presença na internet é uma escalada. A Monvela sobe com você.",
    a11y:
      "Entre nuvens, o mascote da Monvela escala a montanha da internet, finca no topo uma bandeira branca com a inscrição Sua Empresa e, atrapalhado, capota encosta abaixo — terminando sentado ao lado da montanha. A bandeira permanece no alto: a presença digital ficou de pé.",
  },
  solution: {
    eyebrow: "O ecossistema Monvela",
    title: "Uma estrutura digital que cresce junto com o seu negócio.",
    description:
      "A Monvela começa construindo o site e integra outras soluções conforme a necessidade de cada cliente. Cada serviço é contratado à parte, após proposta e definição de escopo.",
    pillars: [
      {
        title: "Sites profissionais",
        description:
          "Sites rápidos, responsivos e desenvolvidos para apresentar o negócio e facilitar o contato.",
      },
      {
        title: "Domínio e publicação",
        description:
          "Auxílio na compra, configuração, renovação e administração do domínio e da hospedagem.",
        note: "O domínio fica, preferencialmente, registrado em nome ou na conta do cliente, com os acessos documentados.",
      },
      {
        title: "Divulgação com Meta",
        description:
          "Estruturação de campanhas pelo Meta Ads e organização dos ativos no Meta Business Suite, quando esse serviço fizer parte do projeto.",
        note: "O trabalho é de estrutura e acompanhamento. Não há promessa de resultado.",
      },
      {
        title: "Google Analytics",
        description:
          "Configuração de medição para entender o que acontece depois que o visitante chega ao site:",
        points: [
          "Quantidade de visitas",
          "Origem dos visitantes",
          "Páginas acessadas",
          "Cliques no WhatsApp",
          "Ações importantes realizadas no site",
        ],
        note: "O Analytics mede resultados e ajuda a tomar decisões — não altera sozinho o desempenho do negócio.",
      },
      {
        title: "Gestão integrada",
        description:
          "Painéis e ferramentas internas conectadas ao site, desenvolvidos sob medida após a análise da necessidade:",
        points: [
          "Solicitações",
          "Agendamentos",
          "Cadastros",
          "Pedidos",
          "Acompanhamento de clientes",
          "Relatórios",
          "Organização de processos",
        ],
        note: "Não existe um sistema genérico pronto para todos os clientes: cada painel é construído para o fluxo do negócio.",
      },
    ],
  },
  cycle: {
    eyebrow: "Como as peças se conectam",
    title: "Presença, divulgação, medição e gestão no mesmo lugar.",
    accessibleLabel:
      "Ciclo Monvela: atraímos, apresentamos, convertemos, medimos e organizamos.",
    steps: [
      { label: "Atraímos", text: "A divulgação aproxima o público do seu negócio." },
      { label: "Apresentamos", text: "O site apresenta a empresa com clareza." },
      { label: "Convertemos", text: "O WhatsApp recebe o contato, sem formulário no meio." },
      { label: "Medimos", text: "O Analytics ajuda a medir o que funciona." },
      { label: "Organizamos", text: "As ferramentas de gestão organizam o atendimento." },
    ],
  },
  featuredProject: {
    eyebrow: "Último lançamento",
    title: "Veja um projeto funcionando de verdade.",
    description: "Este site foi desenvolvido para a Oficina Irmãos Pires.",
    hint: "clique no notebook",
    projectName: "Oficina Irmãos Pires",
    projectUrl: "https://oficina-pires.vercel.app/",
    screenshotAlt:
      'Página inicial do site da Oficina Irmãos Pires, com o título "Seu carro merece voltar melhor do que chegou" e os botões Solicitar orçamento e Falar no WhatsApp.',
  },
  conceptsSection: {
    eyebrow: "Projetos-conceito",
    title: "Direções visuais para negócios que movimentam a cidade.",
    description:
      "Demonstrações de direção criativa para diferentes segmentos. Enquanto não representarem clientes reais, são identificadas como projetos-conceito.",
    disclaimer:
      "Projeto-conceito — não representa um cliente real, contrato, avaliação ou resultado.",
    ctaLabel: "Conhecer o projeto",
  },
  concepts: [
    {
      name: "Mesa & Brasa",
      segment: "Restaurante",
      description:
        "Cardápio, ambiente e reservas reunidos em uma página que dá vontade de visitar.",
      coverImage: "/images/concepts/mesa-e-brasa.webp",
      desktopPreview: "",
      mobilePreview: "",
    },
    {
      name: "Pousada Vista Clara",
      segment: "Hotel e pousada",
      description:
        "Acomodações, estrutura e localização apresentadas com calma e confiança.",
      coverImage: "/images/concepts/pousada-vista-clara.webp",
      desktopPreview: "",
      mobilePreview: "",
    },
    {
      name: "Oficina Norte",
      segment: "Oficina e comércio local",
      description:
        "Serviços, horários e contato rápido para orçamento, sem rodeios.",
      coverImage: "/images/concepts/oficina-norte.webp",
      desktopPreview: "",
      mobilePreview: "",
    },
  ],
  partnersSection: {
    eyebrow: "Parceiros e clientes",
    title: "Negócios que caminham com a Monvela",
    description:
      "Empresas que confiaram na Monvela para construir ou fortalecer sua presença digital.",
  },
  processSection: {
    eyebrow: "Como trabalhamos",
    title: "Entendemos. Criamos. Publicamos. Evoluímos.",
    description:
      "Um caminho direto, com decisões claras e conversa próxima em cada etapa. Cada serviço adicional depende de proposta, escopo e contratação.",
  },
  process: [
    {
      step: "01",
      title: "Conversa no WhatsApp",
      text: "O primeiro contato é direto com a Monvela, sem formulário nem cadastro.",
    },
    {
      step: "02",
      title: "Entendimento do negócio",
      text: "Ouvimos a realidade da empresa, seus clientes e seus objetivos.",
    },
    {
      step: "03",
      title: "Ideia inicial",
      text: "Preparamos uma direção inicial para a conversa — não um site pronto nem um teste.",
    },
    {
      step: "04",
      title: "Definição de escopo",
      text: "Combinamos site, domínio e integrações que fazem sentido para o momento do negócio.",
    },
    {
      step: "05",
      title: "Desenvolvimento e revisão",
      text: "Transformamos o conteúdo em um site profissional e ajustamos os detalhes finais.",
    },
    {
      step: "06",
      title: "Publicação",
      text: "Colocamos o projeto no ar com o domínio e os acessos organizados.",
    },
    {
      step: "07",
      title: "Acompanhamento e evolução",
      text: "Seguimos evoluindo o projeto conforme o serviço contratado.",
    },
  ],
  about: {
    eyebrow: "Sobre a Monvela",
    title: "Tecnologia com conversa simples e presença de verdade.",
    paragraphs: [
      "A Monvela ajuda empresas e comércios locais a construir uma presença digital profissional, simples e acessível — começando pelo site e crescendo conforme a necessidade.",
      "Cada projeto começa com atenção ao negócio real: sua história, seus serviços, seus clientes e a forma como a empresa prefere se comunicar.",
    ],
    values: ["Atendimento próximo", "Projeto sob medida", "Comunicação direta"],
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
    {
      question: "A Monvela também trabalha com anúncios?",
      answer:
        "Sim, quando faz parte do projeto. A Monvela estrutura campanhas pelo Meta Ads e organiza os ativos no Meta Business Suite. O investimento em mídia é pago diretamente às plataformas e não há promessa de resultado.",
    },
    {
      question: "Para que serve o Google Analytics?",
      answer:
        "Para medir o que acontece no site: quantidade de visitas, origem dos visitantes, páginas acessadas, cliques no WhatsApp e outras ações importantes. Serve para entender o comportamento e apoiar decisões — não para melhorar o desempenho sozinho.",
    },
    {
      question: "A Monvela pode administrar meu domínio?",
      answer:
        "Sim. A Monvela ajuda na compra, configuração, renovação e administração do domínio e da hospedagem, sempre com os acessos documentados.",
    },
    {
      question: "O domínio ficará no nome de quem?",
      answer:
        "Preferencialmente no seu nome ou na sua conta. A Monvela organiza e documenta os acessos para que o controle seja sempre do cliente.",
    },
    {
      question: "É possível integrar um sistema de gestão ao site?",
      answer:
        "Sim. Painéis e ferramentas internas — solicitações, agendamentos, cadastros, pedidos, relatórios — podem ser desenvolvidos sob medida, após a análise da necessidade. Não é um sistema genérico pronto.",
    },
    {
      question: "Preciso contratar todos os serviços?",
      answer:
        "Não. A Monvela começa pelo site, e cada solução — domínio, divulgação, Analytics, gestão — é contratada à parte, conforme a necessidade do negócio.",
    },
    {
      question: "Como é feito o contato pelo WhatsApp?",
      answer:
        "Os botões do site abrem uma conversa no WhatsApp com uma mensagem inicial já preparada. Não há formulário, cadastro ou etapa intermediária.",
    },
  ],
  contactSection: {
    eyebrow: "Fale com a Monvela",
    title: "Conte sobre o seu negócio.",
    description:
      "Prefere começar pelo WhatsApp? É o caminho mais rápido. Se preferir, deixe seu contato aqui e um resumo do que você precisa — a Monvela responde com uma ideia inicial, sem compromisso.",
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
    eyebrow: "Próximo passo",
    title: "A conversa começa com uma mensagem.",
    description:
      "Conte sobre o seu negócio e receba uma ideia inicial para o seu projeto. Atendimento direto pelo WhatsApp, sem compromisso.",
    button: "Falar agora no WhatsApp",
  },
  velaFarewell: {
    eyebrow: "Nosso companheiro",
    title: "Conheça o Vela",
    titleMark: ".",
    description: "Ele está por todos os cantos do site — e veio se despedir de você.",
  },
  footer: {
    positioning:
      "Presença digital para negócios locais — do site à divulgação, medição e gestão.",
    emailFallback: "E-mail em breve",
    legal: "Todos os direitos reservados.",
    signature: "Presença local. Alcance digital.",
  },
} as const satisfies SiteConfig;
