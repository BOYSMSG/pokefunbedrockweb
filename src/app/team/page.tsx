"use client";

import React, { useState, useEffect } from "react";

import SiteHeader from "@/components/SiteHeader";

export default function TeamPage() {
  return (
    <div className="viewport">
        <SiteHeader />

        <main id="site-main" className="site-main outer" style={{ background: '#f8fafc', margin: 0, padding: 0 }}>
            <div className="inner posts" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
                <div className="inner" style={{ marginTop: '40px', marginBottom: '80px', padding: '0 20px' }}>
                    
                    <div className="section-title"
                        style={{ textAlign: 'center', marginBottom: '50px', fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: '#0ea5e9' }}>
                        Team & Special Thanks
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', margin: '0 auto', maxWidth: '1200px', padding: '0 20px' }}>
                        {/* Owner Card */}
                        <div style={{ background: 'linear-gradient(135deg, #ffffff, #f0f8ff)', borderRadius: '16px', padding: '40px 30px', textAlign: 'center', boxShadow: '0 15px 35px rgba(14,165,233,0.15)', flex: '1 1 250px', maxWidth: '300px', border: '1px solid rgba(14,165,233,0.2)' }} className="hover:scale-105 transition-all">
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', margin: '0 auto 20px', overflow: 'hidden', boxShadow: '0 8px 20px rgba(14,165,233,0.4)', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '40px' }}>
                                <img src="/images/mainimage/boysmsg.png" alt="BOYSMSG" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <h3 style={{ fontSize: '26px', fontWeight: '900', color: '#333', marginBottom: '5px' }}>BOYSMSG</h3>
                            <p style={{ fontSize: '14px', color: '#0ea5e9', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Owner & Founder</p>
                        </div>
                        
                        {/* Zacek Card */}
                        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '40px 20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', flex: '1 1 250px', maxWidth: '300px' }} className="hover:scale-105 transition-all">
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                                <img src="/images/mainimage/Zacek.png" alt="Zacek" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Zacek</h3>
                            <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>For providing the main Addon Serp Pokedrock mod which was the main special thanks.</p>
                        </div>

                        {/* SVNewer Card */}
                        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '40px 20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', flex: '1 1 250px', maxWidth: '300px' }} className="hover:scale-105 transition-all">
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                                <img src="/images/mainimage/SVNewer.png" alt="SVNewer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>SVNewer</h3>
                            <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>For Providing Special Addons of Server and Serp pokedrock additions and helping in server.</p>
                        </div>

                        {/* Teebz Card */}
                        <div style={{ background: '#ffffff', borderRadius: '16px', padding: '40px 20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', flex: '1 1 250px', maxWidth: '300px' }} className="hover:scale-105 transition-all">
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                                <img src="/images/mainimage/Teebz.png" alt="Teebz" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Teebz</h3>
                            <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5' }}>For addons and helping in server.</p>
                        </div>
                    </div>

                    {/* Special Thanks General */}
                    <div style={{ marginTop: '60px', textAlign: 'center', padding: '30px', background: 'linear-gradient(90deg, #f8fafc, #f1f5f9, #f8fafc)', borderRadius: '16px', border: '1px solid #e2e8f0', maxWidth: '1000px', margin: '60px auto 0' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0, paddingBottom: '10px' }}>And a massive Special Thanks to...</h3>
                        <p style={{ fontSize: '16px', color: '#475569', margin: 0 }}>
                            All other addon creators, helpers, and everyone who contributed to making Pokedrock SMP possible!
                        </p>
                    </div>

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
