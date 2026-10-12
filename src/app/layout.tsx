import type { Metadata } from 'next';
import './tailwind.css';
import './globals.css';
import Script from 'next/script';
import { Providers } from '@/components/Providers';
import { Analytics } from "@vercel/analytics/next";
import { HALLOWEEN_THEME_ACTIVE } from '@/config/halloween';
export const metadata: Metadata = {
  title: 'POKEDROCK SMP POKEFUN - Minecraft Bedrock Pokémon Server',
  description: 'Play the #1 Minecraft Bedrock Pokémon Server. Catch, train, and battle. Free to join!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="/css/screen.css" />
        <link rel="stylesheet" type="text/css" href="/css/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="/css/animate.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/all.min.css" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="icon" href="/images/logo64x64.png" type="image/png" />
        <link rel="stylesheet" type="text/css" href="/css/cards.min.css" />
        {HALLOWEEN_THEME_ACTIVE ? (
          <style>{`
            :root { 
              --ghost-accent-color: #ff7518;
              --halloween-orange: #ff7518;
            }
            #gh-header {
              background: linear-gradient(180deg, #12031c 0%, #0d0115 100%) !important;
              border-bottom: none !important;
              box-shadow: 0 10px 35px rgba(255, 117, 24, 0.2) !important;
            }
            .active-pill {
              background: linear-gradient(135deg, #ff6b08, #8e44ad) !important;
              color: #ffffff !important;
              box-shadow: 0 0 16px rgba(255, 107, 8, 0.7) !important;
              border: 1px solid rgba(255, 175, 64, 0.4) !important;
            }
            .gh-head-button, .btn-primary, .btn-halloween {
              background: linear-gradient(135deg, #ff6b08, #c0392b) !important;
              color: #ffffff !important;
              border: 1px solid #ff9f43 !important;
              box-shadow: 0 0 12px rgba(255, 107, 8, 0.5) !important;
            }
          `}</style>
        ) : (
          <style>{`:root { --ghost-accent-color: #FF1A75; }`}</style>
        )}
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
        
        {/* Scripts from the theme */}
        <Script src="/js/jquery-3.5.1.min.js" strategy="afterInteractive" />
        <Script src="/js/jquery-ui.js" strategy="lazyOnload" />
        <Script src="/js/casper.js" strategy="lazyOnload" />
        <Script src="/js/tsparticles.preset.stars.bundle.min.js" strategy="lazyOnload" />
        <Script src="/js/sodo-search.min.js" strategy="lazyOnload" />
        <Script src="/js/cards.min.js" strategy="lazyOnload" />
        <Analytics />
      </body>
    </html>
  );
}
