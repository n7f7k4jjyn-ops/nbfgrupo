# Verdant Moonlight — link na bio

Projeto aprovado da página navegável da Verdant, organizado como aplicação Node.js para hospedagem na Hostinger.

## Estrutura

- `public/index.html`: página principal mobile-first, agenda semanal, menu textual, listas, cardápio e créditos.
- `public/assets/`: logos, artes e vídeo da abertura Moonlight.
- `server.js`: servidor Node.js simples para a Hostinger.
- `package.json`: comando de inicialização.

A atração principal da semana define a experiência visual e a paleta da página inteira. A grade semanal e o restante dos conteúdos permanecem estáveis. A intro do vídeo toca sem botão de pular e depois segue em loop ambiente; áudio automático pode depender da política de reprodução do navegador.

## Executar localmente

```bash
npm start
``

A aplicação escuta em `PORT` ou, localmente, na porta 3000.

## Publicação

Manter o repositório como fonte oficial e publicar pela Hostinger como aplicação Node.js. Configure o domínio/subdomínio na Hostinger e faça o deploy do projeto; não há publicação automática neste commit.
