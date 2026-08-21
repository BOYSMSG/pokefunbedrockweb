import React from 'react';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Store - Pokefun',
  description: 'Support the Pokefun server by visiting our official store. Ranks, Pokemon, Server Real Cash and many more.',
  keywords: ["Cobblemon store", "buy Minecraft Pokemon ranks", "Pokefun store", "buy shiny Pokemon Minecraft", "Minecraft server store"],
};

async function getCategories() {
  const token = process.env.TEBEX_PUBLIC_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(`https://headless.tebex.io/api/accounts/${token}/categories?includePackages=1`, {
      headers: { 'X-Tebex-Currency': 'USD' },
      next: { revalidate: 60 }
    });
    const data = await res.json();
    return data.data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

/**
 * Process the single "Bedrock Pokedrock Store" Tebex category into virtual
 * subcategories based on package name keywords.
 * This runs SERVER-SIDE so the HTML sent to the client already has the
 * virtual categories — preventing the React hydration mismatch.
 */
function processBedrockCategories(cats: any[]) {
  const bedrockCats = cats.filter(c => c?.name?.toLowerCase().includes('bedrock'));
  if (!bedrockCats.length) return [];

  let allPackages: any[] = [];
  bedrockCats.forEach(c => {
    if (c.packages && Array.isArray(c.packages)) {
      allPackages = allPackages.concat(c.packages);
    }
  });

  if (allPackages.length === 0) return bedrockCats;

  const virtualCats: { id: string; name: string; packages: any[] }[] = [
    { id: 'v-ranks',    name: 'Ranks & Perks',     packages: [] },
    { id: 'v-pokecoins',name: 'Pokecoins',          packages: [] },
    { id: 'v-kits',     name: 'Kits & Bundles',     packages: [] },
    { id: 'v-keys',     name: 'Crate Keys',         packages: [] },
    { id: 'v-stones',   name: 'Protection Stones',  packages: [] },
    { id: 'v-others',   name: 'Other Items',        packages: [] },
  ];

  allPackages.forEach((pkg: any) => {
    const name = pkg.name.toLowerCase();
    // Pokecoin first: match "coin", "pokecoin", or names that START with digits
    // e.g. "50,000 Pokecoins ( 🟢 Starter )", "160,000(🔵 Small  )"
    if (name.includes('coin') || name.includes('pokecoin') || /^[\d,]+/.test(name.trim())) {
      virtualCats[1].packages.push(pkg);
    } else if (name.includes('rank') || name.includes('vip') || name.includes('mvp') || name.includes('elite') || name.includes('pro')) {
      virtualCats[0].packages.push(pkg);
    } else if (name.includes('kit') || name.includes('bundle')) {
      virtualCats[2].packages.push(pkg);
    } else if (name.includes('key') || name.includes('crate')) {
      virtualCats[3].packages.push(pkg);
    } else if (name.includes('stone') || name.includes('protection')) {
      virtualCats[4].packages.push(pkg);
    } else {
      virtualCats[5].packages.push(pkg);
    }
  });

  // Only return categories that actually have packages
  return virtualCats.filter(vc => vc.packages.length > 0);
}

export default async function ShopPage() {
  const rawCategories = await getCategories();
  const categories = processBedrockCategories(rawCategories);
  return (
    <ShopClient initialCategories={categories} />
  );
}
