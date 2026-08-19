import React from "react";
import Head from "next/head";
import SiteHeader from "@/components/SiteHeader";

export default function BiggerGuideWiki() {
  return (
    <div className="viewport">
      <Head>
        <title>Bigger Guide | POKEDROCK SMP POKEFUN</title>
      </Head>
      <SiteHeader />
      <main id="site-main" className="site-main outer" style={{ background: '#f8fafc', margin: 0, padding: 0 }}>
        <div className="inner posts" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
          <div className="container-wrapper" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#FF9A9E', fontSize: '3rem' }}>
          <i className="fa-solid fa-book-open"></i> Beginner's Guide
        </h1>
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ color: '#333', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '20px', fontSize: '2rem' }}>Getting Started Commands</h2>
          <ul style={{ fontSize: '18px', lineHeight: '2.2', color: '#475569', paddingLeft: '30px' }}>
            <li style={{ marginBottom: '10px' }}><strong>Use Ender Eye:</strong> Acts as your main menu for shop, warps, home, jobs, etc.</li>
            <li style={{ marginBottom: '10px' }}><strong>Use <code>/kit</code>:</strong> For claiming Free Ranks and paid kits.</li>
            <li style={{ marginBottom: '10px' }}><strong>Use <code>/gts</code>:</strong> To sell items to other players globally.</li>
            <li style={{ marginBottom: '10px' }}><strong>Use Protection Stones:</strong> (Obtainable from free and paid kits) to claim your land.</li>
          </ul>
        </div>
          </div>
        </div>
      </main>
    </div>
  );
}
