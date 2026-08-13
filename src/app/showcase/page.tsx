"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";

const showcaseImages = [
  "photo_10_2024-12-08_22-28-31.jpg",
  "photo_10_2024-12-08_22-28-40.jpg",
  "photo_10_2024-12-08_22-28-47.jpg",
  "photo_10_2024-12-08_22-28-54.jpg",
  "photo_10_2024-12-08_22-44-01.jpg",
  "photo_11_2024-12-08_22-28-31.jpg",
  "photo_11_2024-12-08_22-28-40.jpg",
  "photo_11_2024-12-08_22-28-47.jpg",
  "photo_11_2024-12-08_22-28-54.jpg",
  "photo_12_2024-12-08_22-28-31.jpg",
  "photo_12_2024-12-08_22-28-40.jpg",
  "photo_12_2024-12-08_22-28-47.jpg",
  "photo_12_2024-12-08_22-44-01.jpg",
  "photo_13_2024-12-08_22-28-31.jpg",
  "photo_13_2024-12-08_22-28-40.jpg",
  "photo_13_2024-12-08_22-28-47.jpg",
  "photo_13_2024-12-08_22-28-54.jpg",
  "photo_14_2024-12-08_22-28-31.jpg",
  "photo_14_2024-12-08_22-28-40.jpg",
  "photo_14_2024-12-08_22-28-47.jpg",
  "photo_14_2024-12-08_22-44-01.jpg",
  "photo_15_2024-12-08_22-28-31.jpg",
  "photo_15_2024-12-08_22-28-40.jpg",
  "photo_15_2024-12-08_22-28-47.jpg",
  "photo_15_2024-12-08_22-28-54.jpg",
  "photo_16_2024-12-08_22-28-31.jpg",
  "photo_16_2024-12-08_22-28-40.jpg",
  "photo_16_2024-12-08_22-28-47.jpg",
  "photo_16_2024-12-08_22-28-54.jpg",
  "photo_16_2024-12-08_22-44-01.jpg",
  "photo_17_2024-12-08_22-28-31.jpg",
  "photo_17_2024-12-08_22-28-40.jpg",
  "photo_17_2024-12-08_22-28-47.jpg",
  "photo_17_2024-12-08_22-44-01.jpg",
  "photo_18_2024-12-08_22-28-31.jpg",
  "photo_18_2024-12-08_22-28-40.jpg",
  "photo_18_2024-12-08_22-28-47.jpg",
  "photo_18_2024-12-08_22-44-01.jpg",
  "photo_19_2024-12-08_22-28-31.jpg",
  "photo_19_2024-12-08_22-28-40.jpg",
  "photo_19_2024-12-08_22-28-47.jpg",
  "photo_19_2024-12-08_22-44-01.jpg",
  "photo_20_2024-12-08_22-28-31.jpg",
  "photo_20_2024-12-08_22-28-40.jpg",
  "photo_20_2024-12-08_22-28-47.jpg",
  "photo_20_2024-12-08_22-44-01.jpg",
  "photo_21_2024-12-08_22-28-31.jpg",
  "photo_21_2024-12-08_22-28-40.jpg",
  "photo_21_2024-12-08_22-28-47.jpg",
  "photo_21_2024-12-08_22-44-01.jpg",
  "photo_22_2024-12-08_22-28-31.jpg",
  "photo_22_2024-12-08_22-28-40.jpg",
  "photo_22_2024-12-08_22-28-47.jpg",
  "photo_22_2024-12-08_22-44-01.jpg",
  "photo_23_2024-12-08_22-28-31.jpg",
  "photo_23_2024-12-08_22-28-40.jpg",
  "photo_23_2024-12-08_22-28-47.jpg",
  "photo_23_2024-12-08_22-44-01.jpg",
  "photo_24_2024-12-08_22-28-31.jpg",
  "photo_24_2024-12-08_22-28-40.jpg",
  "photo_24_2024-12-08_22-28-47.jpg",
  "photo_24_2024-12-08_22-44-01.jpg",
  "photo_25_2024-12-08_22-28-31.jpg",
  "photo_25_2024-12-08_22-28-40.jpg",
  "photo_25_2024-12-08_22-28-47.jpg",
  "photo_25_2024-12-08_22-44-01.jpg",
  "photo_26_2024-12-08_22-28-31.jpg",
  "photo_26_2024-12-08_22-28-40.jpg",
  "photo_26_2024-12-08_22-28-47.jpg",
  "photo_26_2024-12-08_22-44-01.jpg",
  "photo_27_2024-12-08_22-28-31.jpg",
  "photo_27_2024-12-08_22-28-47.jpg",
  "photo_27_2024-12-08_22-44-01.jpg",
  "photo_28_2024-12-08_22-28-31.jpg",
  "photo_28_2024-12-08_22-28-47.jpg",
  "photo_28_2024-12-08_22-44-01.jpg",
  "photo_29_2024-12-08_22-28-31.jpg",
  "photo_29_2024-12-08_22-28-47.jpg",
  "photo_29_2024-12-08_22-44-01.jpg",
  "photo_2_2024-12-08_22-28-47.jpg",
  "photo_2_2024-12-08_22-28-54.jpg",
  "photo_30_2024-12-08_22-28-31.jpg",
  "photo_30_2024-12-08_22-44-01.jpg",
  "photo_31_2024-12-08_22-28-31.jpg",
  "photo_31_2024-12-08_22-44-02.jpg",
  "photo_32_2024-12-08_22-28-31.jpg",
  "photo_33_2024-12-08_22-28-31.jpg",
  "photo_34_2024-12-08_22-28-31.jpg",
  "photo_35_2024-12-08_22-28-31.jpg",
  "photo_36_2024-12-08_22-28-31.jpg",
  "photo_5_2024-12-08_22-28-40.jpg",
  "photo_5_2024-12-08_22-28-47.jpg",
  "photo_5_2024-12-08_22-28-54.jpg",
  "photo_6_2024-12-08_22-28-31.jpg",
  "photo_6_2024-12-08_22-28-40.jpg",
  "photo_6_2024-12-08_22-28-47.jpg",
  "photo_6_2024-12-08_22-28-54.jpg",
  "photo_6_2024-12-08_22-44-01.jpg",
  "photo_7_2024-12-08_22-28-31.jpg",
  "photo_7_2024-12-08_22-28-40.jpg",
  "photo_7_2024-12-08_22-28-47.jpg",
  "photo_7_2024-12-08_22-44-01.jpg",
  "photo_8_2024-12-08_22-28-31.jpg",
  "photo_8_2024-12-08_22-28-40.jpg",
  "photo_8_2024-12-08_22-28-47.jpg",
  "photo_8_2024-12-08_22-28-54.jpg",
  "photo_9_2024-12-08_22-28-31.jpg",
  "photo_9_2024-12-08_22-28-40.jpg",
  "photo_9_2024-12-08_22-28-47.jpg",
  "photo_9_2024-12-08_22-44-01.jpg"
];

export default function ShowcasePage() {
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
                    <a href="/store">Shop</a>
                    <a href="/showcase" className="active-pill">Showcase</a>
                    <a href="/team">Team</a>
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
                            <li className="nav-shop"><a href="/store">Shop</a></li>
                            <li className="nav-showcase nav-current"><a href="/showcase">Showcase</a></li>
                            <li className="nav-team"><a href="/team">Team</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            
            <div className="p-body-inner" style={{ minHeight: '200px' }}>
                <div id="logo" style={{ display: 'flex', justifyContent: 'center', width: '100%', overflow: 'visible' }}>
                    <a href="/" style={{ display: 'inline-block' }}>
                        <img className="animate__infinite animate__slower animate__animated animate__pulse" src="/images/mainimage/title.png" style={{ width: "1125px", maxWidth: "none", height: "auto", borderRadius: "12px", display: "block" }} alt="Pokefun Logo" />
                    </a>
                </div>
            </div>
        </div>

        <main>
            <main id="site-main" className="site-main outer">
                <div className="inner posts">
                    <div className="inner" style={{ marginTop: '40px', marginBottom: '80px' }}>
                        <div className="section-title"
                            style={{ textAlign: 'center', marginBottom: '40px', fontSize: '36px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#FF1A75' }}>
                            Showcase Gallery
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', margin: '0 auto', maxWidth: '1200px', padding: '0 20px' }}>
                           {showcaseImages.map((img, i) => (
                               <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.2)', transition: 'transform 0.3s' }} className="hover:scale-105">
                                   <img src={`/images/showcaseimage/${img}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '16/9' }} alt="Showcase" />
                               </div>
                           ))}
                        </div>
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
