"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";

export default function StoreComingSoon() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("gh-head-open");
    } else {
      document.body.classList.remove("gh-head-open");
    }
  }, [menuOpen]);

  return (
    <div className="viewport">
        <div id="gh-header">
            <div id="nav">
                <div className="container">
                    <a href="/">Home</a>
                    <a href="/features">Features</a>
                    <a href="/store" className="active-pill">Shop</a>
                    <a href="/showcase">Showcase</a>
                    <a href="https://discord.gg/9AU3kHZZDT" target="_blank" rel="noopener noreferrer">Discord</a>
                </div>
            </div>
            <div className="header-bg" style={{ height: '350px' }}></div>
            <header id="gh-head" className="gh-head has-cover">
                <nav className="gh-head-inner inner gh-container">
                    <div className="gh-head-brand hidden-desktop">
                        <a className="gh-burger" role="button" onClick={() => setMenuOpen(!menuOpen)}>
                            <div className="gh-burger-box">
                                <div className="gh-burger-inner"></div>
                            </div>
                        </a>
                    </div>
                    <div className="gh-head-menu">
                        <ul className="nav">
                            <li className="nav-home"><a href="/">Home</a></li>
                            <li className="nav-features"><a href="/features">Features</a></li>
                            <li className="nav-shop nav-current"><a href="/store">Shop</a></li>
                            <li className="nav-showcase"><a href="/showcase">Showcase</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            
            <div className="p-body-inner" style={{ minHeight: '200px' }}>
                <div id="logo">
                    <a href="/">
                        <img src="/images/mainimage/title.png" style={{ maxWidth: "875px", borderRadius: "12px" }} alt="Pokefun Logo" />
                    </a>
                </div>
            </div>
        </div>

        <main>
            <main id="site-main" className="site-main outer">
                <div className="inner posts">
                    <div className="inner" style={{ marginTop: '80px', marginBottom: '120px', textAlign: 'center' }}>
                        <i className="fa-solid fa-store" style={{ fontSize: '80px', color: '#0ea5e9', marginBottom: '30px' }}></i>
                        <h1 style={{ fontSize: '48px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: '#333', marginBottom: '20px' }}>
                            Store Coming Soon!
                        </h1>
                        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0ea5e9', marginBottom: '20px' }}>
                            Support Pokedrock SMP Pokefun - Donation Shop Coming Soon
                        </h2>
                        <p style={{ fontSize: '20px', color: '#666', maxWidth: '800px', margin: '0 auto', lineHeight: '1.8' }}>
                            Ranks, Pokémon, Server Real Cash, GachaMon v1.3.6 perks, Daycare system support, and many more coming soon...
                        </p>
                        <a href="/" style={{ display: 'inline-block', marginTop: '40px', padding: '15px 40px', backgroundColor: '#0ea5e9', color: '#fff', fontSize: '18px', fontWeight: 'bold', borderRadius: '50px', textDecoration: 'none', boxShadow: '0 5px 15px rgba(14,165,233,0.3)' }}>
                            Return to Home
                        </a>
                    </div>
                </div>
            </main>
        </main>
        
        <section id="footer">
            <div className="inner" style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
                <div className="footer-col" style={{ width: "100%" }}>
                    <div className="left">
                        <h1 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>2026 &copy; <strong>Pokedrock SMP</strong></h1>
                        <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
                            We are not affiliated with or endorsed by Mojang AB or Pokemon.<br />
                            Server IP: mcpe.pokefun.in | Port: 19132
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
