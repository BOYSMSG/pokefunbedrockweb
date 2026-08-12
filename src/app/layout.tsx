import type { Metadata } from 'next';
import './tailwind.css';
import './globals.css';
import Script from 'next/script';
import { Providers } from '@/components/Providers';

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
        <style>{`:root { --ghost-accent-color: #FF1A75; }`}</style>
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
        
        {/* Scripts from the theme */}
        <Script src="/js/jquery-3.5.1.min.js" strategy="beforeInteractive" />
        <Script src="/js/jquery-ui.js" strategy="lazyOnload" />
        <Script src="/js/casper.js" strategy="lazyOnload" />
        <Script src="/js/tsparticles.preset.stars.bundle.min.js" strategy="lazyOnload" />
        <Script src="/js/sodo-search.min.js" strategy="lazyOnload" />
        <Script src="/js/cards.min.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
