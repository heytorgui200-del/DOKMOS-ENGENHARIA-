# DOKMOS ENGENHARIA - Organização do Projeto

> **Versão:** Build de Produção (Vite + React)  
> **Data da organização:** 15/06/2026  
> **Anotação:** Este é o build de produção (compilado). O código-fonte original (src/) não está disponível nesta pasta.

---

## 🚨 IMPORTANTE - LEIA ANTES DE MEXER

### Para Dev. Júnior:
1. **NÃO MOVA os arquivos de mídia** da raiz (index.html precisa deles)
2. **NÃO DELETE** nenhum arquivo .png, .jpg, .mp4 ou .js nesta pasta
3. Se precisar mudar algo visual, você precisará do **código-fonte original** (pasta `src/`)

---

## 📁 Estrutura de Pastas

```
DIEGO TESTE/                          ← Raiz (deploy aqui)
├── index.html                         ← Página principal + fix do mobile aplicado
├── assets/                            ← Build JS/CSS (Não tocar!)
│   ├── index-apQld7ti.js              ← JavaScript compilado (React Router)
│   ├── index-CKxRnr72.css             ← CSS compilado
│   └── ...                            ← Outros chunks de JS
├── LEIAME.md                          ← Este arquivo
├── home-videoencer           ← (column fix aplicado em 15/06)

### Páginas do Site (SPA - Single Page Application)
| Rota | Página | Vídeo/Mídia |
|------|--------|-------------|
| `/` | **Home** | `home-hero.mp4` |
| `/sobre` | **Sobre** | `about-hero.mp4`
## 🎬 Vídeos (mantenha na raiz)
| Arquivo | Tamanho | Uso | Status |
|---------|---------|-----|--------|
| `about-hero`.mp4 | 2.0M | Página Sobre (hero section) | **Usado** |
| `home-hero.mp4` | 1.5M | Página Home (hero section) | **Usado** |
| `home-video-slow.mp4` | 481K | Home (versão lenta) | **Backup** |
| `home-poster.jpg` | 112K | Poster carregamento Home | **Usado** |

---

## 🖼️ Imagens e Logos (mantenha na raiz)
| Arquivo | Tamanho | Uso | Status |
|---------|---------|-----|--------|
| `about_1.jpg` | 106K | Poster fallback da seção Sobre | **Usado** |
| `logo-dokmos.png` | 6.4K | Logo colorido (header/footer) | **Usado** |
| `logo-kmos-white.png` | 6.3K | Logo branco (sobre fundo escuro) | **Usado** |

---

## 🏭 Logos de Parceiros (mantenha na raiz)
**Arquivos:**
- `1.png` (48K) | `2.png` (24K) | `3.png` (50K) | `4.png` (21K)
- `5.png` (30K) | `6.png` (72K) | `7.png` (44K) | `8.png` (34K)
- `10.png` (26K) | `11.png` (80K) | `18.png` (153K)

**Total:** 11 logos | **Tamanho:** ~490K

**Local de uso:** Carrossel/scroll de parceiros na Home

---

## 📦 Arquivos Deletados (Não utilizados pelo build)

Nomes removidos para liberar espaço:
- `bs-config.json` (config temporária)
- `casa-poster.jpg` (poster não referenciado)
- `home-video.mp4` / `home-video-poster.jpg` (vídeo não referenciado)
- `logo-dokmos.jpeg`, `logo.jpeg`, `logo-dokmos-small.png` (logos duplicados)
- `nature-bg.jpg` (imagem não referenciada)
- `projects_1.jpg` a `projects_6.jpg` (fotos não exibidas no build)
- `12.png` a `17.png` (logos de parceiros não usados no carrossel)

---

## 🌐 Como Subir o Site (Deploy)

```bash
# 1. Instale o serve (se não tiver)
npm install -g serve

# 2. Na pasta DIEGO TESTE, rode:
cd "/home/scooby/Área de trabalho/DIEGO TESTE"
npx serve -s . -l 5500

# 3. Acesse no navegador:
# http://localhost:5500
```

---

## 🛠️ Estrutura Ideal (para rebuild futuro)

Se um dia você tiver acesso ao **código-fonte** e quiser recompilar o projeto, organize as mídias assim:

```
src/
├── assets/
│   ├── videos/
│   │   ├── about-hero.mp4
│   │   └── home-hero.mp4
│   ├── images/
│   │   └── about_1.jpg
│   ├── logos/
│   │   ├── logo-dokmos.png
│   │   └── logo-dokmoswhite.png
│   └── partners/
│       ├── 1.png ... 8.png
│       ├── 10.png, 11.png, 18.png
public/              
```

---

## ⚠️ Disclaimer

Este projeto é um **build de produção** gerado pelo Vite.  
**Não é possível editar o código React** diretamente - o que você vê aqui são arquivos compilados e minificados.

Para modificar o site visualmente ou funcionalmente, você precisará:
1. Localizar a pasta `src/` original (não está neste diretório)
2. Editar os componentes React (ScrollExpandMedia, SobrePage, etc.)
3. Rodar `npm run build` para gerar um novo build

---

**Organizado por:** Agente AI  
**Data:** 15/06/2026
