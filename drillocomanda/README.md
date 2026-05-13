# 🍕 Drillo - Landing Page

Landing page oficial do aplicativo Drillo - Sistema completo de gestão de pedidos, comanda digital e controle de caixa para bares, restaurantes e lanchonetes.

## 🌐 Demo

Acesse: [https://seuusuario.github.io/drillo](https://seuusuario.github.io/drillo)

## ✨ Características

- 🎨 **Design Moderno** - Interface limpa e profissional com gradientes atraentes
- 📱 **Totalmente Responsivo** - Funciona perfeitamente em desktop, tablet e mobile
- ⚡ **Performance Otimizada** - Carregamento rápido e animações suaves
- 🎯 **SEO Otimizado** - Meta tags e estrutura otimizada para mecanismos de busca
- 🔄 **Animações Suaves** - Scroll animations e transições elegantes
- 🎭 **Interatividade** - Hover effects, menu mobile e scroll suave

## 📂 Estrutura do Projeto

```
LandPage/
├── index.html          # Estrutura HTML da página
├── style.css           # Estilos CSS (design completo)
├── script.js           # Interatividade JavaScript
├── robots.txt          # Regras de rastreamento
├── sitemap.xml         # Mapa do site para buscadores
└── README.md          # Este arquivo
```

## 🚀 Como Usar Localmente

### Opção 1: Abrir Diretamente
1. Baixe os arquivos
2. Abra o arquivo `index.html` no seu navegador

### Opção 2: Servidor Local (Recomendado)

**Usando Python:**
```bash
# Python 3
cd LandPage
python -m http.server 8000

# Acesse: http://localhost:8000
```

**Usando Node.js (http-server):**
```bash
npm install -g http-server
cd LandPage
http-server

# Acesse: http://localhost:8080
```

**Usando PHP:**
```bash
cd LandPage
php -S localhost:8000

# Acesse: http://localhost:8000
```

## 🌍 Deploy no GitHub Pages

### Passo a Passo Completo:

#### 1. Criar Repositório no GitHub

```bash
# No terminal, dentro da pasta LandPage:
git init
git add .
git commit -m "Initial commit: Drillo landing page"
```

#### 2. Criar Repositório no GitHub.com
1. Acesse [github.com](https://github.com)
2. Clique em "New Repository"
3. Nome do repositório: `drillo` (ou `drillo-landingpage`)
4. Deixe como **Público**
5. NÃO adicione README, .gitignore ou license (já temos os arquivos)
6. Clique em "Create repository"

#### 3. Conectar e Fazer Push

```bash
# Substitua 'seuusuario' pelo seu username do GitHub
git remote add origin https://github.com/seuusuario/drillo.git
git branch -M main
git push -u origin main
```

#### 4. Ativar GitHub Pages

1. No GitHub, vá até o repositório
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Pages**
4. Em **Source**, selecione:
   - Branch: `main`
   - Folder: `/ (root)`
5. Clique em **Save**
6. Aguarde 2-3 minutos
7. Sua página estará disponível em: `https://seuusuario.github.io/drillo`

#### 5. (Opcional) Configurar Domínio Customizado

Se você tiver um domínio próprio:

1. No GitHub Pages settings, adicione seu domínio em "Custom domain"
2. No seu provedor de domínio, adicione um registro CNAME apontando para:
   ```
   seuusuario.github.io
   ```

## 🔧 Personalização

### Alterar Cores

Edite as variáveis CSS no início do arquivo `style.css`:

```css
:root {
    --primary: #B94C2D;         /* Cor principal do Drillo */
    --primary-dark: #8B3820;    /* Tom mais escuro */
    --primary-light: #D16847;   /* Tom mais claro */
    --secondary: #2D4B94;       /* Cor secundária */
    --accent: #FFA726;          /* Cor de destaque */
}
```

### Alterar Links do Google Play

Procure por `https://play.google.com/store` no `index.html` e substitua pela URL real do app:

```html
<!-- Exemplo -->
<a href="https://play.google.com/store/apps/details?id=com.drillo.app" 
   class="btn btn-primary" target="_blank">
```

### Adicionar Google Analytics

Adicione antes do `</head>` no `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Adicionar Facebook Pixel

Adicione antes do `</head>` no `index.html`:

```html
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

## 📊 SEO e Conversão

### Seções Incluídas:
- ✅ Hero Section com CTA principal
- ✅ Bloco de diferenciais verificáveis
- ✅ 6 Features Cards principais
- ✅ "Como Funciona" (4 passos)
- ✅ Comparação de Planos (Free vs PRO)
- ✅ Casos de uso por tipo de estabelecimento
- ✅ FAQ com dados estruturados
- ✅ CTA Secondary
- ✅ Footer completo

### Elementos de Conversão:
- 🎯 5+ CTAs estratégicos
- 🔎 Title, meta description, canonical e Open Graph
- 🧭 `robots.txt` e `sitemap.xml`
- 📚 Structured data para Organization, WebSite e FAQ
- 💎 Diferenciação Free vs PRO clara

## 🎨 Fontes e Ícones

- **Fonte:** [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)
- **Ícones:** [Font Awesome 6](https://fontawesome.com) (Free)

## 📱 Responsividade

### Breakpoints:
- **Desktop:** 1024px+
- **Tablet:** 768px - 1023px
- **Mobile:** < 768px

Todos os breakpoints foram testados e otimizados.

## ⚡ Performance

### Otimizações Incluídas:
- ✅ CSS minificado e otimizado
- ✅ Lazy loading para imagens
- ✅ Animações com CSS transforms (GPU accelerated)
- ✅ Debounce em eventos de scroll
- ✅ Intersection Observer para animações
- ✅ Fontes carregadas de forma otimizada

### Lighthouse Score Esperado:
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

## 🔄 Atualizações Futuras

### Melhorias Planejadas:
- [ ] Adicionar screenshots reais do app
- [ ] Implementar blog/artigos
- [ ] Adicionar formulário de contato
- [ ] Sistema de FAQ interativo
- [ ] Vídeo demo do aplicativo
- [ ] Integração com CRM
- [ ] A/B testing para otimização de conversão
- [ ] Chatbot de atendimento

## 🐛 Problemas Conhecidos

Nenhum no momento. Reporte issues em: [GitHub Issues](https://github.com/seuusuario/drillo/issues)

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade da equipe Drillo. Todos os direitos reservados.

## 📞 Contato

- **Email:** contato@drillo.app
- **Website:** [drillo.app](https://drillo.app)
- **Google Play:** [Baixar App](https://play.google.com/store)

## 🙏 Créditos

Desenvolvido com ❤️ pela equipe Drillo

---

**Última atualização:** Novembro 2025

