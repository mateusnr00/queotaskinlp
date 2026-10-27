# QUÉOTA SKIN, landing do grupo do WhatsApp (`queotaskin.vip`)

Página de anúncio com um objetivo só: levar a pessoa para o grupo do WhatsApp
da comunidade do FNX. A copy não fala de sorteio (um teste barra).
É um projeto à parte, desligado do app principal (`mateusnr00/queotaskin`):
sem banco, sem login e sem nenhum link para o queotaskin.com. Um teste garante
isso.

## Rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

Scripts: `dev`, `build`, `start`, `lint`, `typecheck`, `test`.

## Rotas

- `/`: a landing. Todos os botões dizem "Entrar no grupo" e abrem o mesmo convite.
- `/entrar`: redireciona direto para o grupo, sem passar pela página. Para bio
  do Instagram, QR code, story.

## Variáveis (todas públicas e opcionais)

| Variável | Para quê |
| --- | --- |
| `NEXT_PUBLIC_WHATSAPP_GROUP_URL` | Convite do grupo. Vazio usa o grupo padrão de `src/lib/links.ts`. |
| `NEXT_PUBLIC_SITE_URL` | URL desta landing, para canonical e Open Graph. Vazio usa `https://www.queotaskin.vip`. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Pixel da Meta. Vazio usa o `2850933681947315` (`src/lib/meta.ts`). |
| `META_CAPI_TOKEN` | **Secreto**, só no servidor (variável `sensitive` da Vercel, Production). Token da API de Conversões. Sem ele, só o Pixel do navegador funciona. |
| `META_TEST_EVENT_CODE` | Opcional. Código de "Testar eventos" do Gerenciador de Eventos, para ver os eventos do servidor chegando. Tire depois. |
| `NEXT_PUBLIC_GA_ID` | Google Analytics. O clique vira `whatsapp_click`. |

## Rastreio da Meta

Dois eventos: `PageView` (visita) e `Lead` (clique em Entrar no grupo). Cada
um sai pelo Pixel no navegador e pela API de Conversões (`POST /api/evento`,
que repassa à Meta com o token), com o mesmo `event_id` para a Meta
deduplicar. O servidor manda IP, user agent, `fbp`, `fbc` (cookie ou montado
do `fbclid`) e `external_id` (id anônimo do cookie `qs_eid`, em SHA-256).

Cada clique leva a origem (`hero`, `topo`, `final`, `fixo`) para dar para ver
qual botão converte.

## Deploy

Projeto novo na Vercel apontando para este repo, framework Next.js, sem
configuração extra. Projeto `queotaskinlp` na Vercel. Domínios: `www.queotaskin.vip` serve a
página e `queotaskin.vip` redireciona (308) para ele. Branch de produção: `main`. Para trocar de grupo quando lotar, mude
`NEXT_PUBLIC_WHATSAPP_GROUP_URL` e faça redeploy.
