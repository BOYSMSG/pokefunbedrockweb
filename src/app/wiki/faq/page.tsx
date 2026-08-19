import React from 'react';
import SiteHeader from "@/components/SiteHeader";

export default function FAQPage() {
  return (
    <div className="viewport">
      <SiteHeader />
      <main id="site-main" className="site-main outer" style={{ background: '#f8fafc', margin: 0, padding: 0 }}>
        <div className="inner posts" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
          <div className="main-content" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', color: '#333' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '10px', color: '#1e293b' }}>
            FAQ & Common Issues
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '40px' }}>
            Find solutions to common problems and answers to frequently asked questions here.
          </p>

          {/* Issue 1 */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
              I can't join the server! (Connection Time Out)
            </h2>
            <div style={{ color: '#475569', lineHeight: 1.6 }}>
              <p>Make sure you are using the correct IP and Port for your device:</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li><strong>Bedrock IP:</strong> play.pokefun.in (Port: 19132)</li>
                <li><strong>Java IP:</strong> play.pokefun.in</li>
              </ul>
              <p style={{ marginTop: '10px' }}>If you still can't connect, try restarting your router or checking your internet connection.</p>
            </div>
          </div>

          {/* Issue 2 */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
              My texture pack is not loading correctly.
            </h2>
            <div style={{ color: '#475569', lineHeight: 1.6 }}>
              <p>If you see missing textures (purple/black blocks) or invisible items:</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li>Go to Server Settings and make sure <strong>Server Resource Packs</strong> is set to <em>Prompt</em> or <em>Enabled</em>.</li>
                <li>Remove any existing server resource packs from your local storage and rejoin to re-download them.</li>
              </ul>
            </div>
          </div>

          {/* Issue 3 */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '25px', marginBottom: '20px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '15px', color: '#333' }}>
              How do I claim land?
            </h2>
            <div style={{ color: '#475569', lineHeight: 1.6 }}>
              <p>You can claim land using a <strong>Protection Stone</strong>!</p>
              <p>Here is how you can get one:</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li>From <strong>Starter Kits</strong> or <strong>Paid Rank Kits</strong>.</li>
                <li>You can buy one in-game using the <code>/menu</code> command.</li>
                <li>You can purchase one from our web store at <a href="https://pokedrock.pokefun.in/store" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline' }}>https://pokedrock.pokefun.in/store</a>.</li>
              </ul>
            </div>
          </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
