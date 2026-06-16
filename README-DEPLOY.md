# DOKMOS ENGENHARIA - Guia de Deploy

## Checklist Pré-Deploy

### 1. Configurar Google Analytics 4 (GA4)

1. Acesse [Google Analytics](https://analytics.google.com/)
2. Crie uma nova propriedade (Property) para `dokmosegenharia.com.br`
3. Obtenha o **Measurement ID** (formato: `G-XXXXXXXXXX`)
4. Substitua `G-XXXXXXXXXX` em `cookie-banner.js` na função `loadGoogleAnalytics()`

### 2. Configurar Meta Pixel (Facebook)

1. Acesse [Meta Events Manager](https://business.facebook.com/events_manager/)
2. Crie um novo Pixel para `dokmosegenharia.com.br`
3. Obtenha o **Pixel ID** (formato numérico)
4. Substitua `YOUR_META_PIXEL_ID` em `cookie-banner.js` na função `loadMetaPixel()`

### 3. Hospedagem (Cloudflare Pages Recomendado)

1. Crie uma conta em [Cloudflare](https://dash.cloudflare.com/)
2. Vá em "Pages" > "Create a project"
3. Faça upload da pasta `DIEGO TESTE`
4. Configure o domínio customizado: `dokmosegenharia.com.br`
5. SSL/TLS será automático (Let's Encrypt via Cloudflare)

### 4. Configurar DNS (Onde você comprou o domínio)

Aponte os registros DNS para a Cloudflare:
- CNAME `www` → `dokmosegenharia.pages.dev`
- A Record `@` → IPs da Cloudflare (consulte na dashboard)

### 5. Google Search Console

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione a propriedade `dokmosegenharia.com.br`
3. Submeta o `sitemap.xml`
4. Verifique a propriedade (via DNS ou arquivo HTML)

### 6. Verificação Pós-Deploy

**Teste o Cookie Banner:**
- Abra o site (limpe cookies primeiro)
- Verifique se o banner aparece
- Teste os 3 botões: Aceitar, Rejeitar, Personalizar
- Verifique no console (F12) se os scripts são carregados condicionalmente

**Teste de Segurança:**
- Verifique se o site acessa via HTTPS
- Teste os headers de segurança
- Verifique o CSP no console do navegador

**Teste de SEO:**
- Use a ferramenta [Rich Results Test](https://search.google.com/test/rich-results)
- Verifique as tags Open Graph via [Open Graph Check](https://opengraphcheck.com/)
- Valide o Schema.org

### 7. Próximos Passos (Longo Prazo)

- Criar conteúdo de blog (artigos técnicos)
- Construir backlinks (parcerias, diretórios)
- Configurar Google Tag Manager (GTM)
- Implementar FAQ Schema
- Criar página de casos de sucesso
- Otimizar imagens para WebP
- Implementar Lazy Loading para vídeos
- Criar certificado SSL próprio (se necessário)

## Arquivos Criados/Atualizados

| Arquivo | Descrição |
|---------|-----------|
| `index.html` | Atualizado com SEO, Schema.org, Open Graph, Security Headers |
| `robots.txt` | Permite indexação, aponta para sitemap.xml |
| `sitemap.xml` | Mapa do site para Google |
| `politica-privacidade.html` | Página de Política de Privacidade (LGPD) |
| `politica-cookies.html` | Página de Política de Cookies (Meta Pixel) |
| `termos-de-servico.html` | Termos de Serviço |
| `cookie-banner.js` | Banner de Consentimento LGPD + GA4 + Pixel Gate |
| `_redirects` | Regra para SPA routing (Netlify/Vercel) |
| `README-DEPLOY.md` | Este arquivo |

## Notas Importantes

- **Não tem código-fonte:** O projeto é um build compilado (Vite+React). Para otimizações profundas (code splitting, lazy loading, redução de bundle), será necessário o código-fonte original (`src/`).
- **Cookie Banner funcional:** O banner está 100% funcional, mas o GA4 e Meta Pixel precisam dos IDs reais.
- **SEO Técnico completo:** Meta tags, Schema.org, Open Graph, Twitter Cards, Sitemap e Robots.txt estão todos configurados.
- **Segurança:** Headers de segurança (CSP, HSTS, etc.) implementados via meta tags.