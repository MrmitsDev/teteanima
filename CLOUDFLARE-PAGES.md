# Publicar a TeteAnima no Cloudflare Pages

## Estado desta preparação

O projeto está preparado e a saída local foi validada. **Não foi publicado no Cloudflare Pages**: Cloudflare e GitHub não tinham sessão autenticada no ambiente desta tarefa. O nome `teteanima` e o domínio `teteanima.pages.dev` ainda não foram reservados nem verificados. Não há repositório remoto GitHub configurado.

Verificações realizadas nesta preparação: 14 ficheiros servidos com HTTP 200; home e atualização de endereço com âncora funcionais; menu móvel, galeria e erros de formulário testados no navegador; sem erros ou avisos na consola observada e sem imagens quebradas; sem transbordo horizontal a 390 píxeis. A comparação binária confirmou 11 assets idênticos e o corpo HTML inalterado. O build também foi testado com um nome alternativo e rejeita um domínio inválido antes de alterar a saída existente. HTTPS e comportamento no domínio Cloudflare ainda não puderam ser testados.

## Configuração exata

| Campo | Valor |
|---|---|
| Project name | `teteanima` |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `node scripts/build-pages.mjs` |
| Build output directory | `build` |
| Root directory | deixar vazio (raiz do repositório) |
| Node.js | `22`, definido em `.node-version` |
| Variável de build | `PAGES_PRODUCTION_URL=https://teteanima.pages.dev` |
| Package manager / instalação | nenhum; não executar npm install |
| Secrets / variáveis de runtime | nenhum |

O site original já é estático e está em `dist/`. Não existe React, Next.js, Vite, SSR, Pages Functions ou backend. O novo comando apenas copia os ficheiros para `build/`, valida referências e substitui o domínio antigo nos metadados SEO, robots e sitemap. `dist/` mantém-se intacta. CSS, JavaScript, fotografias, fontes e conteúdo visível são preservados.

A variável `PAGES_PRODUCTION_URL` é pública e só é usada durante o build. Defina-a também para os builds de Preview com o domínio de produção, para que a canonical não aponte para endereços temporários. Na ausência da variável, o script assume `https://teteanima.pages.dev`. Não são necessários tokens de Cloudflare no projeto.

## 1. Criar o repositório GitHub

1. Entre no GitHub e abra https://github.com/new.
2. Escolha a sua conta em **Owner** e escreva `teteanima` em **Repository name**.
3. Escolha **Private**. O Cloudflare pode publicar um site público a partir de um repositório privado.
4. Não selecione a criação de README, `.gitignore` ou licença: o projeto local já tem histórico e ficheiros.
5. Clique em **Create repository**.
6. No terminal, execute os comandos abaixo. Substitua `SEU_UTILIZADOR` pelo nome da sua conta GitHub. Se tiver usado outro nome de repositório, ajuste também `teteanima.git`.

```powershell
Set-Location -LiteralPath 'C:\Users\Pc\Documents\Sites\Tete anima site'
git remote add origin https://github.com/SEU_UTILIZADOR/teteanima.git
git push -u origin main
```

O repositório local e a branch `main` já existem. Autentique-se na janela do Git Credential Manager se for solicitada. Não coloque tokens na URL do remoto nem em ficheiros. Se `origin` já existir quando executar estes passos, consulte `git remote -v` e confirme o destino antes de o alterar.

## 2. Ligar o GitHub ao Cloudflare Pages

1. Entre em https://dash.cloudflare.com/ e selecione a conta pretendida.
2. Abra **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**. Se aparecer uma opção de Workers por omissão, escolha o separador/link de **Pages**.
3. Selecione **GitHub**. Na autorização, escolha apenas o repositório `teteanima` em **Only select repositories** e conclua **Install & Authorize**.
4. Selecione o repositório e clique em **Begin setup**.
5. Preencha todos os campos com a tabela acima. Não é necessário um comando de deploy separado.
6. Em **Environment variables**, adicione `PAGES_PRODUCTION_URL` com o endereço de produção. A versão Node já está no repositório; se o painel exigir uma variável, use `NODE_VERSION=22`.
7. Clique em **Save and Deploy**.
8. Aguarde o estado **Success** e abra o endereço de produção que o painel devolver. A disponibilidade do nome só será confirmada nesta etapa.

Se `teteanima` não estiver disponível, use `teteanima-site` ou `teteanima-festas`. Atualize `PAGES_PRODUCTION_URL` para o endereço efetivamente atribuído, por exemplo `https://teteanima-site.pages.dev`, e faça **Retry deployment** para gerar canonical e sitemap corretos. Não configure domínio personalizado.

## 3. Publicações automáticas

Depois da ligação ao Git, mantenha a produção na branch `main` e a opção de deployments automáticos ativa em **Settings → Builds & deployments** (ou **Builds**, consoante a interface). Novos pushes para `main` passam a publicar automaticamente. Um commit apenas local não publica: é necessário executar `git push`.

```powershell
git add dist scripts .node-version .gitignore README.md CLOUDFLARE-PAGES.md
git commit -m "Atualizar site TeteAnima"
git push
```

Edite os ficheiros de `dist/`; não edite `build/`, que é regenerada. Não publique a raiz inteira do repositório. A configuração `.openai/hosting.json` pertence ao alojamento anterior e não é incluída no output Pages. Nenhuma configuração do alojamento anterior foi alterada.

## 4. Verificar a publicação

Estas verificações em produção ficam pendentes até existir o domínio final:

1. Abra `https://NOME-DO-PROJETO.pages.dev/` numa janela sem sessão Cloudflare: deve abrir publicamente por HTTPS, sem aviso de certificado.
2. Confirme as imagens da página inicial e galeria, fontes, navegação, botões e ampliação/fecho das fotografias.
3. Abra `/#servicos`, `/#galeria` e `/#orcamento` e atualize cada endereço. São âncoras da mesma página, não rotas SPA; não é necessário um `_redirects` global.
4. Em 320, 390, 768 e 1440 píxeis, confirme ausência de scroll horizontal; teste abrir/fechar o menu móvel e selecionar uma secção.
5. Submeta o formulário vazio para verificar os erros. Depois preencha com dados fictícios e confirme a mensagem preparada para `+351 917 314 350`. Não envie a mensagem de teste à empresa. O formulário continua a abrir o WhatsApp; não envia e-mails nem guarda pedidos.
6. Nas ferramentas de desenvolvimento do navegador, confirme **Console** sem erros e **Network** sem assets com 404. Verifique também `styles.css`, `app.js`, `assets/hug.webp`, `assets/dm-sans.woff2` e `assets/outfit.woff2`.
7. Abra `/robots.txt` e `/sitemap.xml` e confirme o novo domínio. No código-fonte, confirme `canonical`, `og:url` e schema com esse mesmo endereço.

Se a home mostrar 404, confirme **Build output directory = build** e que o log termina com a preparação dos ficheiros estáticos. Se a branch não aparecer, faça primeiro o push para o GitHub. Se o formulário parecer enviar para e-mail, reveja a expectativa: a implementação existente envia o visitante para o WhatsApp.

## Referências oficiais

- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/configuration/build-image/
- https://developers.cloudflare.com/pages/configuration/serving-pages/
