# TeteAnima

Site estático em Português de Portugal, sem dependências de execução. Os ficheiros publicados encontram-se em `dist/`. A pré-visualização local pode ser iniciada com `node serve.mjs`.

## Cloudflare Pages

Preparação: `node scripts/build-pages.mjs`. Output para publicação: `build/`. Não há package manager nem instalação de dependências. O build preserva a aplicação original em `dist/` e adapta apenas as referências de domínio no SEO da cópia publicada. Node 22 está definido em `.node-version`.

O passo a passo, configuração de GitHub, campos do painel e verificações de produção estão em [CLOUDFLARE-PAGES.md](CLOUDFLARE-PAGES.md). O projeto ainda precisa de ser conectado às contas GitHub e Cloudflare; esta preparação não significa que o deploy Pages foi realizado.

## Orçamentos

O formulário valida os campos e prepara uma mensagem para o WhatsApp +351 917 314 350. O visitante revê e envia a mensagem no WhatsApp. Não há envio automático, armazenamento de contactos, backend de correio, preços nem disponibilidade presumida. O botão fica desativado se JavaScript não estiver disponível; os contactos diretos continuam acessíveis.

## Conteúdo e imagens

Informação fornecida no briefing e fotografias reais do perfil público TeteAnima no Casamentos.pt. A consulta direta de 12 de setembro de 2026 mostrou a classificação apresentada de 5,0 e 4 opiniões. Os três excertos identificam autores e datas originais; não foram inventados depoimentos. Não foram confirmadas redes sociais independentes, email, morada exata ou horários, pelo que não são publicados.

As fotografias mantêm as marcas de água da fonte. Ver `SOURCES.md`. Para substituir imagens por originais da empresa, manter os nomes dos recursos em `dist/assets/` e atualizar os textos alternativos se o conteúdo mudar.

## Verificações

Revisão visual no navegador; larguras de 320, 390, 768 e 1440 píxeis sem transbordo horizontal. Menu móvel, seleção automática do tipo de evento e serviços, erros do formulário, preparação de mensagem com dados fictícios (sem envio), galeria com navegação e fecho, carregamento das imagens e sintaxe JavaScript verificados. Ferramenta WebMCP de configuração de interesses testada com entradas válidas e inválidas. Não foi atribuída uma pontuação Lighthouse sem medição.

SEO: título, descrição, idioma, Open Graph textual, canonical, sitemap, robots, favicon e schema EntertainmentBusiness. Fontes e fotografias são servidas localmente. Animações respeitam a preferência por movimento reduzido. A configuração de acesso da publicação determina se os motores de pesquisa conseguem visitar o site.
