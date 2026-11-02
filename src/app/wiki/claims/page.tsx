import React from "react";
import Head from "next/head";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function ProtectionStonesWiki() {
  return (
    <div className="viewport">
      <Head>
        <title>Protection Stones (Land Claim) | POKEDROCK SMP POKEFUN</title>
      </Head>
      <SiteHeader />
      <main id="site-main" className="site-main outer" style={{ background: '#f8fafc', margin: 0, padding: 0 }}>
        <div className="inner posts" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
          <div className="container-wrapper" style={{ padding: '40px 20px', minHeight: '80vh', maxWidth: '1000px', margin: '0 auto' }}>
            
            <div style={{ textAlign: 'center', marginBottom: '35px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                color: 'white',
                fontSize: '28px',
                marginBottom: '15px',
                boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)'
              }}>
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#1e293b', marginBottom: '10px' }}>
                Protection Stones (Land Claim)
              </h1>
              <p style={{ color: '#64748b', fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
                Keep your builds and items safe! Claim your land and protect your base from griefing or theft.
              </p>
            </div>

            {/* Main Showcase Card */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '30px',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <div style={{ flex: '1 1 320px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0ea5e9', marginBottom: '15px' }}>
                  What are Protection Stones?
                </h2>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '15px' }}>
                  Keep your builds and items safe! Use <strong>Protection Stones</strong> to claim land and protect your base from griefing or theft. You can manage who has access to your protected areas, so you can build safely with your friends.
                </p>
                <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
                  You can buy them from our <a href="https://store.pokefun.in" target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', fontWeight: 'bold', textDecoration: 'underline' }}>Paid Store</a> or with in-game currency for different radius protection stones on your demand. You also get them in your <strong>Starter Kit</strong> and <strong>Paid Rank Kits</strong>!
                </p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span style={{ background: '#e0f2fe', color: '#0284c7', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
                    <i className="fa-solid fa-cube"></i> Custom Radius
                  </span>
                  <span style={{ background: '#dcfce7', color: '#16a34a', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
                    <i className="fa-solid fa-lock"></i> Anti-Griefing
                  </span>
                  <span style={{ background: '#fef3c7', color: '#d97706', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
                    <i className="fa-solid fa-users"></i> Add Friends
                  </span>
                </div>
              </div>

              <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
                <img 
                  src="/images/features/landprotectionstones_landclaim.png" 
                  alt="Protection Stones" 
                  style={{ width: '100%', maxWidth: '380px', borderRadius: '12px', boxShadow: '0 8px 25px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}
                />
              </div>
            </div>

            {/* How to Use Section */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              marginBottom: '30px'
            }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-wand-magic-sparkles" style={{ color: '#0ea5e9' }}></i> How to Claim Land
              </h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#0ea5e9', marginBottom: '8px' }}>1. Place the Stone</div>
                  <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                    Place your Protection Stone anywhere in the wilderness. It instantly claims a protected cuboid radius around itself!
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#0ea5e9', marginBottom: '8px' }}>2. Manage Access</div>
                  <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                    Add trusted friends so they can build, open chests, and live together safely in your claimed zone.
                  </p>
                </div>

                <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#0ea5e9', marginBottom: '8px' }}>3. Remove Anytime</div>
                  <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
                    Simply break the protection stone block to unclaim the area and retrieve your stone back into your inventory.
                  </p>
                </div>
              </div>
            </div>

            {/* Useful Commands Table */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '30px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              marginBottom: '30px'
            }}>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1e293b', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-terminal" style={{ color: '#0ea5e9' }}></i> Protection Stone Commands
              </h2>
              <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '15px' }}>
                Stand inside your protection stone claim and use the following commands to manage permissions:
              </p>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#333' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9' }}>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#1e293b', fontWeight: 700 }}>Command</th>
                      <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#1e293b', fontWeight: 700 }}>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}><code>/ps add &lt;player&gt;</code></td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Allow a friend to build, break, and interact inside your claim.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}><code>/ps remove &lt;player&gt;</code></td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Remove a player&apos;s permissions from your claim.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}><code>/ps info</code></td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>View claim details: radius, owners, members, and flags.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}><code>/ps view</code></td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Toggle visible particle borders to inspect your claim boundary lines.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}><code>/ps hide</code> / <code>/ps unhide</code></td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>Make your placed protection stone block invisible or visible.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Back Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Link href="/wiki" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#e2e8f0',
                color: '#334155',
                padding: '10px 20px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}>
                <i className="fa-solid fa-arrow-left"></i> Back to Wiki
              </Link>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
