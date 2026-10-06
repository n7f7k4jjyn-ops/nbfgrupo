# Verdant — site semanal

Aplicação Node.js do site da Verdant Curitiba, preparada para publicação pela integração GitHub da Hostinger.

## Publicar pela Hostinger

Conecte o repositório `n7f7k4jjyn-ops/nbfgrupo` usando a branch `agenda-semana-nova-2026-10-06`. O app está na raiz dessa branch.

Configuração da aplicação:

- Framework: **Other**
- Versão do Node.js: **22.x**
- Arquivo de entrada: `server.js`
- Comando de inicialização: `npm start`
- Comando de build: nenhum
- Diretório de saída: deixar em branco

O `package.json` já define o comando de inicialização e a versão do Node. A Hostinger fornece a variável `PORT`; o servidor usa essa porta automaticamente. Depois do primeiro deploy, pushes nessa branch podem disparar novos deploys pela integração GitHub.

## Rodar localmente

Requer Node.js 22:

```sh
npm start
```

Acesse `http://localhost:3000`.

## Estrutura

- `public/index.html`: página inicial e agenda semanal.
- `public/listas/index.html`: página de listas.
- `public/politica-de-privacidade.html`, `public/termos-de-uso.html` e `public/exclusao-de-dados.html`: páginas legais.
- `public/assets/`: logos e artes utilizadas pelo site.
- `server.js`: servidor HTTP sem dependências externas.

Nas atualizações semanais, preserve o fluxo do site e adapte o tema à arte principal da semana. Inclua artes e dados de outros dias somente quando forem fornecidos; caso contrário, mantenha “Em breve”.
