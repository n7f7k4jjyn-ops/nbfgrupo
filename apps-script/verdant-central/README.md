# Central de Listas Verdant — Apps Script

Este diretório guarda a central conectada à planilha e aos Google Forms. O GitHub mantém o código e, após a configuração inicial, publica mudanças no Apps Script quando elas chegam à branch `main`.

## Configuração inicial (uma vez)

1. Ative a Google Apps Script API nas configurações da conta Google usada pelo projeto.
2. No projeto Apps Script, crie uma implantação Web App inicial e copie o ID da implantação existente. A URL do Web App permanece a mesma quando o workflow atualiza essa implantação.
3. No GitHub, abra **Settings → Secrets and variables → Actions** e cadastre:
   - Secret `CLASPRC_JSON`: conteúdo do arquivo de autenticação criado pelo comando `clasp login` (`~/.clasprc.json`). É um token de acesso; nunca coloque esse conteúdo no repositório.
   - Secret `CLASP_JSON`: JSON com o identificador do projeto, por exemplo `{"scriptId":"ID_DO_PROJETO_APPS_SCRIPT"}`.
   - Variable `WEB_APP_DEPLOYMENT_ID`: ID da implantação Web App já criada no passo 2.
4. Faça merge desta configuração na `main`. O workflow envia `Code.gs`, `Index.html` e `appsscript.json`, cria uma versão e atualiza a implantação existente.

## Atualizações seguintes

Altere os arquivos deste diretório e faça push/merge na `main`. O GitHub Actions executa `clasp push`, cria uma versão do Apps Script e atualiza a implantação Web App. Não faça edição concorrente no editor Apps Script: o repositório será a fonte do código.

O repositório deve permanecer privado. Não adicione arquivos `.clasprc.json`, tokens, IDs de planilhas/formulários ou outros dados pessoais ao Git.
