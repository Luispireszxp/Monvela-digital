# Monvela Digital

Site institucional inicial da Monvela Digital, agência focada na criação de sites profissionais para empresas e comércios locais.

## Tecnologias

- Next.js 16 com App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Instalação

Requisitos: Node.js 20.9 ou superior e npm.

```bash
npm install
```

No Windows PowerShell, caso a política de execução bloqueie `npm.ps1`, utilize `npm.cmd`:

```powershell
npm.cmd install
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha somente os dados públicos:

```powershell
Copy-Item .env.example .env.local
```

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=5511994369111
NEXT_PUBLIC_CONTACT_EMAIL=contato@seudominio.com.br
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica
```

O WhatsApp deve conter DDI, DDD e número, usando apenas algarismos. Não adicione chaves secretas em variáveis `NEXT_PUBLIC_*`, pois elas ficam disponíveis no navegador.

A integração do Supabase utiliza somente a URL do projeto e a chave `publishable` no frontend. Nunca coloque `service_role`, `secret key`, senha do banco ou outra credencial administrativa em variáveis `NEXT_PUBLIC_*`.

## Executar localmente

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Comandos de validação:

```bash
npm run lint
npm run typecheck
npm run build
```

## Onde editar

- Textos, serviços, links, perguntas e contatos: `src/content/site.ts`
- Componentes das seções: `src/components/`
- Página inicial e ordem das seções: `src/app/page.tsx`
- Cores, espaçamento e responsividade: `src/app/globals.css`
- Metadados e Open Graph: `src/app/layout.tsx`
- Política de privacidade: `src/app/politica-de-privacidade/page.tsx`
- Cliente público do Supabase: `src/lib/supabase/client.ts`
- Configuração local do Supabase: `supabase/config.toml`

## Logo e imagens

A marca no cabeçalho está temporariamente representada pelo nome “Monvela Digital” e um ponto laranja. Quando a logo oficial estiver disponível:

1. salve o arquivo otimizado em `public/brand/`;
2. substitua o texto provisório no componente `src/components/header.tsx`;
3. atualize também o rodapé e o favicon provisório em `src/app/icon.svg`.

O visual principal provisório está em `public/images/hero-concept.png`. Substitua-o mantendo o mesmo nome ou atualize o caminho em `src/components/hero.tsx` e nos metadados de `src/app/layout.tsx`. Use uma imagem ampla, preferencialmente em WebP ou AVIF, com boa legibilidade sob texto.

## WhatsApp

A mensagem inicial está centralizada em `src/content/site.ts`. O número oficial tem fallback em `src/lib/env.ts` e pode ser substituído por `NEXT_PUBLIC_WHATSAPP_NUMBER`; não o repita nos componentes.

O número oficial configurado é `+55 (11) 99436-9111`. Os links abrem a conversa com a mensagem inicial preparada.

## Métricas futuras

O ponto reservado para Google Analytics e Meta Pixel está em `src/components/analytics-placeholder.tsx`. Nenhum rastreador está ativo. Antes de adicionar qualquer script, defina os IDs reais, revise a política de privacidade e implemente o consentimento necessário.

## Próximos passos recomendados

1. Adicionar o e-mail e a URL final.
2. Substituir a logo, o favicon e a imagem conceitual pelos materiais oficiais.
3. Revisar os textos com os dados definitivos da Monvela.
4. Testar os links e a política de privacidade com os dados reais.
5. Somente depois, conectar o repositório à Vercel e configurar as mesmas variáveis no ambiente de publicação.

Banco de dados, autenticação, pagamentos e painel administrativo não fazem parte deste ciclo.
