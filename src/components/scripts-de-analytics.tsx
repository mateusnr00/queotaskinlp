// Meta Pixel e Google Analytics. `afterInteractive` para não disputar o
// carregamento com a primeira tela.
//
// O Pixel só faz o init aqui. O PageView sai do RastreioDaVisita, com event_id,
// para casar com o mesmo evento mandado pelo servidor. O init já leva o
// external_id (id anônimo do visitante, guardado num cookie primário de 1 ano).

import Script from "next/script";
import { GA_ID } from "@/lib/analytics";
import { COOKIE_EXTERNAL_ID, META_PIXEL_ID } from "@/lib/meta";
import { RastreioDaVisita } from "@/components/rastreio-da-visita";

export function ScriptsDeAnalytics() {
  return (
    <>
      {META_PIXEL_ID ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
(function(){var m=document.cookie.match(/(?:^|; )${COOKIE_EXTERNAL_ID}=([^;]+)/);var id=m?m[1]:((self.crypto&&crypto.randomUUID)?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2,12));
if(!m){document.cookie='${COOKIE_EXTERNAL_ID}='+id+'; Max-Age=31536000; Path=/; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');}
fbq('init','${META_PIXEL_ID}',{external_id:id});})();`}
          </Script>
          <RastreioDaVisita />
          {/* O <noscript> do código oficial do Pixel: conta a visita de quem
              está com JavaScript desligado. */}
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      ) : null}

      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
