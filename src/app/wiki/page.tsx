"use client";

import React from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function WikiPage() {
  const wikiPages = [
    {
      title: "Beginner Guide",
      description: "Complete and comprehensive guide for all server mechanics.",
      path: "/wiki/begginer_guide",
      icon: "fa-book-open",
      color: "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)",
    },
    {
      title: "Gyms & Level Cap",
      description: "Learn how the Pokémon level cap works and how to increase it.",
      path: "/wiki/levelcap",
      icon: "fa-arrow-up-right-dots",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
    {
      title: "Protection Stones (Land Claim)",
      description: "Keep your builds safe from griefing or theft using Protection Stones.",
      path: "/wiki/claims",
      icon: "fa-shield-halved",
      color: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
    },
    {
      title: "FAQs & Issues",
      description: "Find answers to all frequently asked questions and common issues here.",
      path: "/wiki/faq",
      icon: "fa-circle-question",
      color: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
    }
  ];

  return (
    <div className="viewport">
      <SiteHeader />
      <main id="site-main" className="site-main outer" style={{ background: '#f8fafc', margin: 0, padding: 0 }}>
        <div className="inner posts" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
          <div className="main-content" style={{ flex: 1, overflowY: 'auto' }}>
            {/* Search Header */}
            <div style={{ padding: '20px 20px 0 20px', textAlign: 'center' }}>
              <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
                <i className="fa-solid fa-magnifying-glass" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}></i>
                <input 
                  type="text" 
                  placeholder="Search guides, wikis, pokedex..." 
                  style={{ width: '100%', padding: '15px 15px 15px 50px', borderRadius: '30px', border: '1px solid #e2e8f0', background: 'white', color: '#333', fontSize: '1rem', outline: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
                />
              </div>
            </div>

        {/* Wiki Grid */}
        <div style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {wikiPages.map((page, index) => (
              <Link href={page.path} key={index} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '40px 30px',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                }}
                >
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: page.color,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 25px auto',
                    color: 'white',
                    fontSize: '1.8rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}>
                    <i className={`fa-solid ${page.icon}`}></i>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '15px' }}>
                    {page.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {page.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
          </div>
        </div>
      </main>
    </div>
  );
}
