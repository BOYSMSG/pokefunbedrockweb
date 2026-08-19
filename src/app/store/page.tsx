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

export default async function ShopPage() {
  const categories = await getCategories();
  return (
    <ShopClient initialCategories={categories} />
  );
}
