# Landing Drillo no GitHub Pages

Esta e a landing publica do dominio `drillo.com.br`. O GitHub Pages usa esta pasta como fonte, e o arquivo `CNAME` aponta para o dominio personalizado.

## Estrutura

- `index.html`: pagina principal da Drillo, com os cards Barber e Comanda.
- `drillocomanda/`: landing detalhada do Drillo Comanda.
- `drillobarber/`: landing detalhada do Drillo Barber.
- `CNAME`: dominio `drillo.com.br`.
- `sitemap.xml` e `robots.txt`: SEO do site principal.

## Testar antes de publicar

```powershell
cd LandPage
python -m http.server 8080
```

Abra `http://localhost:8080`. Valide tambem:

- `http://localhost:8080/`;
- `http://localhost:8080/drillocomanda/`;
- `http://localhost:8080/drillobarber/`.

## Download do Desktop

A pagina principal e a landing do Comanda possuem CTA para Windows. O JavaScript consulta:

`https://drillo-comanda-mobile-2472a.web.app/desktop/manifest.json`

Se a consulta falhar, os links usam o instalador versionado como fallback. O manifesto tem `downloadUrl`, `version`, `sha256`, `notes` e `mandatory`.

O release do instalador e feito na raiz do projeto:

```powershell
.\installer\publish_desktop_release.ps1 `
  -ReleaseNotes 'Resumo da atualizacao.' `
  -Deploy
```

Depois de publicar, confirme o manifesto e o instalador antes de divulgar a landing.

## Publicar no GitHub Pages

O fluxo normal e:

1. testar localmente;
2. conferir links Android, Desktop, privacidade e termos;
3. verificar que `CNAME` continua com `drillo.com.br`;
4. fazer commit das alteracoes;
5. enviar para a branch configurada no GitHub Pages.

Exemplo:

```powershell
git add LandPage README.md firebase.json
git commit -m "Atualiza landing com download do Desktop"
git push origin master
```

Se o Pages estiver configurado para outra branch, use a branch definida em `Settings > Pages`.

## Checklist visual

- [ ] A home mostra Android + Windows.
- [ ] O card Drillo Comanda exibe o botao de baixar PC.
- [ ] O link abre o instalador correto.
- [ ] O manifesto atualiza versao e URL sem cache.
- [ ] A pagina continua responsiva no celular.
- [ ] O dominio e HTTPS e o CNAME nao foi removido.

## Observacao sobre o repositorio local

O clone atual nao possui `origin` configurado. Antes de executar `git push`, confira:

```powershell
git remote -v
git remote add origin <url-do-repositorio>
```

Use a URL real do repositorio GitHub da landing. Nao adicione credenciais, tokens ou chaves ao projeto.
