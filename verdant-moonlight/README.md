# Verdant — site semanal

Site oficial da Verdant Curitiba, preparado como aplicação Node.js para a Hostinger.

## Estrutura

- `public/index.html`: página principal, agenda semanal, tema da atração principal e pop-ups dos eventos.
- `public/listas/index.html`: página de listas.
- `public/politica-de-privacidade.html`, `public/termos-de-uso.html`, `public/exclusao-de-dados.html`: páginas legais.
- `public/assets/`: logos e artes da semana.
- `server.js` e `package.json`: servidor e configuração Node.js.

## Executar

Requer Node.js 18 ou superior:

```sh
npm start
```

O servidor usa a variável `PORT` definida pela hospedagem, com fallback local para a porta 3000.

## Atualização semanal

Manter a estrutura e o fluxo aprovados. Adaptar paleta, tipografia e tema à arte da atração principal de sábado; preencher os demais dias apenas quando houver material e manter “Em breve” quando não houver.
