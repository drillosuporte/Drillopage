# Drillo Landing Tracking

Esta landing ja prepara os cliques para campanha.

## O que ja esta ativo

- Todo link da Google Play tem `data-play-link`.
- Cada CTA tem `data-cta-location`, como `hero_primary`, `plan_free`, `plan_pro` e `final_cta`.
- O `script.js` adiciona o parametro `referrer` da Google Play com UTMs.
- Se existir `gtag`, o clique dispara o evento `play_store_click`.
- Se `googleAdsSendTo` estiver configurado, o clique tambem dispara evento de conversao do Google Ads.
- Se existir `dataLayer`, o clique tambem envia `play_store_click` para Google Tag Manager.

## Como testar UTM

Abra a landing com parametros:

```text
index.html?utm_source=google&utm_medium=cpc&utm_campaign=drillo_search&utm_term=comanda%20digital
```

Depois clique em um botao da Google Play. O link final deve receber um parametro parecido com:

```text
referrer=utm_source%3Dgoogle%26utm_medium%3Dcpc%26utm_campaign%3Ddrillo_search
```

## Como ativar Google Analytics

Adicione o Google tag antes de `</head>` em `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag("js", new Date());
    gtag("config", "G-XXXXXXXXXX");
</script>
```

## Como ativar conversao do Google Ads

Preencha `googleAdsSendTo` em `index.html`:

```html
window.drilloTrackingConfig = {
    defaultUtmSource: "landing",
    defaultUtmMedium: "organic",
    defaultUtmCampaign: "drillo_landing",
    googleAdsSendTo: "AW-XXXXXXXXXX/YYYYYYYYYYYY"
};
```

Esse valor vem na acao de conversao criada dentro do Google Ads.
