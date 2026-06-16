# DOKMOS ENGENHARIA - Agent Context

> **Tipo de projeto:** Site estático (build Vite + React, output compilado)
> **Domínio:** `dokmosegenharia.com.br`

## ⚠️ CRÍTICO: Este repo contém apenas o BUILD compilado
- **Não há código-fonte (`src/`).** O repositório possui apenas o resultado do build de produção do Vite (`assets/index-*.js/css`).
- **NÃO edite arquivos dentro de `assets/`** — são bundles minificados. Qualquer mudança em React/JSX exige o `src/` original (indisponível aqui).
- **Edições seguras:** `index.html`, páginas estáticas (políticas, termos), meta tags de SEO, mídias e o `cookie-banner.js`.

---

## 🔀 Orquestração Dinâmica (Coordinator Mode & Subagentes)
- Diante de tarefas complexas de **design, segurança ou deploy**, **NÃO aja sozinho**. Ative o **Coordinator Mode** e decomponha a demanda em subtarefas específicas.
- Despache subtarefas para os **subagentes especialistas** mapeados em `.agents/agent/` (ex: `frontend-specialist`, `security-auditor`, `seo-specialist`) para garantir eficiência, velocidade e paralelismo seguro.
- **Regra de Ouro:** Nunca delegue entendimento abstrado. Como coordinator, detalhe as **linhas, arquivos e escopo exato** para os subagentes trabalharem.

---

## 🧠 Linha de Raciocínio, Aprendizado Contínuo e Segurança
- **Nunca quebre o código arbitrariamente.** Siga a linha de raciocínio incremental: `pesquisa -> plano -> execução -> verificação`.
- Utilize o **sistema de memória persistente** em `.agents/memory/` para aprender com as interações e feedbacks. Registre o contexto evolutivo do site da DOKMOS Engenharia para que as próximas sessões iniciem contextualizadas.

---

## 💡 Proatividade: APIs, MCP e Open-Source
- Seja proativo! Ao planejar ou implementar uma funcionalidade, investigue e sugira o uso de:
  1. **Servidores MCP (Model Context Protocol)** úteis que melhorem as ferramentas integradas.
  2. **APIs públicas estáveis** ou bibliotecas/soluções **Open-Source** consolidadas no mercado.
- Incentive a pesquisa antes de reinventar a roda, indicando soluções prontas que poupem processamento e acelerem o desenvolvimento do site.

---

## 🌐 Idioma Obrigatório
- Todas as respostas, relatórios de subagentes e interações com o usuário devem ser **estritamente em português do Brasil (pt-BR)**.

---

## Propriedade de Diretórios e Arquivos-Chave

| Caminho | O que é |
|---|---|
| `index.html` | Entrada da SPA. Contém SEO, Schema.org, CSP, preload de fontes e scripts de fix mobile |
| `assets/` | JS/CSS compilados pelo Vite. **NÃO TOCAR.** |
| `cookie-banner.js` | Consent manager vanilla-JS (gate para GA4 + Meta Pixel) |
| `politica-privacidade.html` | Política de Privacidade (LGPD) |
| `politica-cookies.html` | Política de Cookies |
| `termos-de-servico.html` | Termos de Serviço |
| `favicon_io/` | Pacote de favicons (PNG, ICO, webmanifest) |
| `media/` | Imagens, logos e vídeos organizados |
| Arquivos de mídia na raiz (`*.png`, `*.jpg`, `*.mp4`) | Hero images/videos referenciados diretamente. **NÃO mover ou renomear.** |

## Caminhos de Mídia Fixos na Raiz
Os seguintes arquivos **devem permanecer na raiz** — `index.html` e JS compilado os referenciam com caminhos relativos:
- `home-hero.mp4`, `home-video-slow.mp4`, `home-poster.jpg`
- `about-hero.mp4`, `about_1.jpg`
- `logo-dokmos.png`, `logo-dokmos-white.png`
- `1.png` … `8.png`, `10.png`, `11.png`, `18.png` (logos de parceiros)

## Configuração do Cookie Banner (antes do deploy)
1. Abrir `cookie-banner.js`.
2. Substituir os placeholders:
   - `G-XXXXXXXXXX` → **Measurement ID real do GA4**
   - `YOUR_META_PIXEL_ID` → **ID real do Meta Pixel**
3. Verificar no DevTools > Network se os scripts carregam condicionalmente após o consentimento.

## Fix Mobile já aplicado
- `index.html` contém um `<style>` + `<script>` inline que força o título "DOKMOS ENGENHARIA" na página `/sobre` a ficar centralizado em mobile (`≤768px`).
- Se modificar o layout da página Sobre, verificar se o fix ainda se aplica ou atualizar os seletores em `index.html`.

## Deploy
- **Hospedagem:** Cloudflare Pages recomendado (ou qualquer host estático).
- **Roteamento SPA:** `_redirects` redireciona rotas do React Router para `index.html` (formato Netlify/Vercel).
- **Domínio:** `dokmosegenharia.com.br`

## Preview Local
```bash
cd "/home/scooby/Área de trabalho/DIEGO TESTE"
npx serve -s . -l 5500
# http://localhost:5500
```

## Artefatos de SEO / Segurança (estáticos — seguros para editar)
| Arquivo | Propósito |
|---|---|
| `sitemap.xml` | Sitemap para Google |
| `robots.txt` | Regras de rastreamento |
| `_redirects` | Fallback para SPA |
| `cookie-banner.html` | Markup standalone do banner (se necessário separadamente) |

## O que NÃO fazer
- **Não rodar `npm run build`** — não existe `package.json` neste diretório.
- **Não deletar ou mover** arquivos `.mp4`/`.png`/`.jpg` da raiz.
- **Não adicionar chunks compilados** em `assets/` sem um rebuild Vite adequado (necessita `src/`).
