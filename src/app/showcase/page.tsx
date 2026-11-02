"use client";

import React, { useState, useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";

const showcaseImages = [
  "photo_10_2024-12-08_22-28-31.webp",
  "photo_10_2024-12-08_22-28-40.webp",
  "photo_10_2024-12-08_22-28-47.webp",
  "photo_10_2024-12-08_22-28-54.webp",
  "photo_10_2024-12-08_22-44-01.webp",
  "photo_11_2024-12-08_22-28-31.webp",
  "photo_11_2024-12-08_22-28-40.webp",
  "photo_11_2024-12-08_22-28-47.webp",
  "photo_11_2024-12-08_22-28-54.webp",
  "photo_12_2024-12-08_22-28-31.webp",
  "photo_12_2024-12-08_22-28-40.webp",
  "photo_12_2024-12-08_22-28-47.webp",
  "photo_12_2024-12-08_22-44-01.webp",
  "photo_13_2024-12-08_22-28-31.webp",
  "photo_13_2024-12-08_22-28-40.webp",
  "photo_13_2024-12-08_22-28-47.webp",
  "photo_13_2024-12-08_22-28-54.webp",
  "photo_14_2024-12-08_22-28-31.webp",
  "photo_14_2024-12-08_22-28-40.webp",
  "photo_14_2024-12-08_22-28-47.webp",
  "photo_14_2024-12-08_22-44-01.webp",
  "photo_15_2024-12-08_22-28-31.webp",
  "photo_15_2024-12-08_22-28-40.webp",
  "photo_15_2024-12-08_22-28-47.webp",
  "photo_15_2024-12-08_22-28-54.webp",
  "photo_16_2024-12-08_22-28-31.webp",
  "photo_16_2024-12-08_22-28-40.webp",
  "photo_16_2024-12-08_22-28-47.webp",
  "photo_16_2024-12-08_22-28-54.webp",
  "photo_16_2024-12-08_22-44-01.webp",
  "photo_17_2024-12-08_22-28-31.webp",
  "photo_17_2024-12-08_22-28-40.webp",
  "photo_17_2024-12-08_22-28-47.webp",
  "photo_17_2024-12-08_22-44-01.webp",
  "photo_18_2024-12-08_22-28-31.webp",
  "photo_18_2024-12-08_22-28-40.webp",
  "photo_18_2024-12-08_22-28-47.webp",
  "photo_18_2024-12-08_22-44-01.webp",
  "photo_19_2024-12-08_22-28-31.webp",
  "photo_19_2024-12-08_22-28-40.webp",
  "photo_19_2024-12-08_22-28-47.webp",
  "photo_19_2024-12-08_22-44-01.webp",
  "photo_20_2024-12-08_22-28-31.webp",
  "photo_20_2024-12-08_22-28-40.webp",
  "photo_20_2024-12-08_22-28-47.webp",
  "photo_20_2024-12-08_22-44-01.webp",
  "photo_21_2024-12-08_22-28-31.webp",
  "photo_21_2024-12-08_22-28-40.webp",
  "photo_21_2024-12-08_22-28-47.webp",
  "photo_21_2024-12-08_22-44-01.webp",
  "photo_22_2024-12-08_22-28-31.webp",
  "photo_22_2024-12-08_22-28-40.webp",
  "photo_22_2024-12-08_22-28-47.webp",
  "photo_22_2024-12-08_22-44-01.webp",
  "photo_23_2024-12-08_22-28-31.webp",
  "photo_23_2024-12-08_22-28-40.webp",
  "photo_23_2024-12-08_22-28-47.webp",
  "photo_23_2024-12-08_22-44-01.webp",
  "photo_24_2024-12-08_22-28-31.webp",
  "photo_24_2024-12-08_22-28-40.webp",
  "photo_24_2024-12-08_22-28-47.webp",
  "photo_24_2024-12-08_22-44-01.webp",
  "photo_25_2024-12-08_22-28-31.webp",
  "photo_25_2024-12-08_22-28-40.webp",
  "photo_25_2024-12-08_22-28-47.webp",
  "photo_25_2024-12-08_22-44-01.webp",
  "photo_26_2024-12-08_22-28-31.webp",
  "photo_26_2024-12-08_22-28-40.webp",
  "photo_26_2024-12-08_22-28-47.webp",
  "photo_26_2024-12-08_22-44-01.webp",
  "photo_27_2024-12-08_22-28-31.webp",
  "photo_27_2024-12-08_22-28-47.webp",
  "photo_27_2024-12-08_22-44-01.webp",
  "photo_28_2024-12-08_22-28-31.webp",
  "photo_28_2024-12-08_22-28-47.webp",
  "photo_28_2024-12-08_22-44-01.webp",
  "photo_29_2024-12-08_22-28-31.webp",
  "photo_29_2024-12-08_22-28-47.webp",
  "photo_29_2024-12-08_22-44-01.webp",
  "photo_2_2024-12-08_22-28-47.webp",
  "photo_2_2024-12-08_22-28-54.webp",
  "photo_30_2024-12-08_22-28-31.webp",
  "photo_30_2024-12-08_22-44-01.webp",
  "photo_31_2024-12-08_22-28-31.webp",
  "photo_31_2024-12-08_22-44-02.webp",
  "photo_32_2024-12-08_22-28-31.webp",
  "photo_33_2024-12-08_22-28-31.webp",
  "photo_34_2024-12-08_22-28-31.webp",
  "photo_35_2024-12-08_22-28-31.webp",
  "photo_36_2024-12-08_22-28-31.webp",
  "photo_5_2024-12-08_22-28-40.webp",
  "photo_5_2024-12-08_22-28-47.webp",
  "photo_5_2024-12-08_22-28-54.webp",
  "photo_6_2024-12-08_22-28-31.webp",
  "photo_6_2024-12-08_22-28-40.webp",
  "photo_6_2024-12-08_22-28-47.webp",
  "photo_6_2024-12-08_22-28-54.webp",
  "photo_6_2024-12-08_22-44-01.webp",
  "photo_7_2024-12-08_22-28-31.webp",
  "photo_7_2024-12-08_22-28-40.webp",
  "photo_7_2024-12-08_22-28-47.webp",
  "photo_7_2024-12-08_22-44-01.webp",
  "photo_8_2024-12-08_22-28-31.webp",
  "photo_8_2024-12-08_22-28-40.webp",
  "photo_8_2024-12-08_22-28-47.webp",
  "photo_8_2024-12-08_22-28-54.webp",
  "photo_9_2024-12-08_22-28-31.webp",
  "photo_9_2024-12-08_22-28-40.webp",
  "photo_9_2024-12-08_22-28-47.webp",
  "photo_9_2024-12-08_22-44-01.webp"
];

const ITEMS_PER_PAGE = 24;

export default function ShowcasePage() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const displayedImages = showcaseImages.slice(0, visibleCount);
  const hasMore = visibleCount < showcaseImages.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, showcaseImages.length));
  };

  return (
    <div className="viewport">
        <SiteHeader />

        <main id="site-main" className="site-main outer" style={{ background: '#f8fafc', margin: 0, padding: 0 }}>
            <div className="inner posts" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
                <div className="inner" style={{ marginTop: '40px', marginBottom: '80px', padding: '0 20px' }}>
                    <div className="section-title"
                        style={{ textAlign: 'center', marginBottom: '15px', fontSize: '36px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#0ea5e9' }}>
                        Showcase Gallery
                    </div>
                    <p style={{ textAlign: 'center', color: '#64748b', fontSize: '16px', marginBottom: '40px' }}>
                        Showing {displayedImages.length} of {showcaseImages.length} screenshots
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', margin: '0 auto', maxWidth: '1200px', padding: '0 20px' }}>
                       {displayedImages.map((img, i) => (
                           <div key={i} style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.12)', transition: 'transform 0.3s' }} className="hover:scale-105">
                               <img 
                                   src={`/images/showcase/${img}`} 
                                   style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', aspectRatio: '16/9' }} 
                                   alt="Showcase" 
                                   loading="lazy"
                                   decoding="async"
                               />
                           </div>
                       ))}
                    </div>

                    {hasMore && (
                        <div style={{ textAlign: 'center', marginTop: '50px' }}>
                            <button
                                onClick={loadMore}
                                style={{
                                    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '50px',
                                    padding: '14px 36px',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 8px 25px rgba(14, 165, 233, 0.4)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0px)')}
                            >
                                Load More Screenshots ({showcaseImages.length - visibleCount} remaining)
                            </button>
                        </div>
                    )}
                </div>
            </div>
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
