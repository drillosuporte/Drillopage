# Landing Drillo Comanda

Landing estatica do Drillo Comanda para Android e Windows.

## Arquivos

- `index.html`: conteudo, SEO, CTAs, FAQ e dados estruturados.
- `style.css`: identidade visual e responsividade.
- `script.js`: menu mobile, animacoes, tracking e atualizacao do download Desktop.
- `images/`: logo e imagens da pagina.

## Testar localmente

```powershell
cd LandPage/drillocomanda
python -m http.server 8080
```

Abra `http://localhost:8080` no navegador. Usar um servidor local permite testar a consulta do manifesto sem as limitacoes de abrir o HTML diretamente como `file://`.

## Download do Desktop

O CTA do Windows usa este manifesto:

`https://drillo-comanda-mobile-2472a.web.app/desktop/manifest.json`

O `script.js` consulta o manifesto sem cache e atualiza os links `[data-desktop-link]`. Se a consulta falhar, o fallback versionado continua apontando para o instalador conhecido. Ao publicar uma nova versao, confirme que o `downloadUrl` do manifesto esta publico antes de divulgar a landing.

## Publicacao

A landing nao possui deploy automatico neste repositorio. O fluxo e:

1. publicar o instalador pelo comando documentado no README da raiz;
2. revisar Android, Windows, FAQ, links e responsividade localmente;
3. enviar `LandPage/drillocomanda/` para o provedor que hospeda `drillo.com.br/drillocomanda/`;
4. validar os CTAs em uma janela anonima e em um celular.

Consulte `README.md` na raiz para o processo completo de release Android, Desktop e Firebase Hosting.
