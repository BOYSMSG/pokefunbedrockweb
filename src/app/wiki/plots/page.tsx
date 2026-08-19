import React from "react";
import Head from "next/head";
import SiteHeader from "@/components/SiteHeader";

export default function PlotsWiki() {
  return (
    <div className="viewport">
      <Head>
        <title>Plots & Property Guide | POKEDROCK SMP POKEFUN</title>
      </Head>
      <SiteHeader />
      <main id="site-main" className="site-main outer" style={{ background: '#f8fafc', margin: 0, padding: 0 }}>
        <div className="inner posts" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
          <div className="container-wrapper" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#ffc93c' }}>
          <i className="fa-solid fa-house-chimney"></i> Plots & Property Guide
        </h1>
        
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '25px', color: '#475569' }}>
          <h2 style={{ color: '#333', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>1. Overview</h2>
          <p style={{ marginBottom: '15px' }}>Our server is divided into two main gameplay areas to give you the best experience:</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #ffc93c', padding: '15px', borderRadius: '0 8px 8px 0' }}>
              <strong style={{ color: '#333' }}>⛏️ Survival World</strong><br />
              Mining, ores, grinding, exploration, Nether, and End. The Survival world is the <em>resource</em> world.
            </div>
            <div style={{ background: '#f8fafc', borderLeft: '4px solid #a18cd1', padding: '15px', borderRadius: '0 8px 8px 0' }}>
              <strong style={{ color: '#333' }}>🏙️ City World</strong><br />
              Permanent homes, storage, shops, businesses, and real-estate. The City is where players <em>live</em>.
            </div>
          </div>
          <p>You can use the universal <code>/worldtp survival</code> or <code>/worldtp pokefun_city</code> commands to travel between worlds. The server remembers exactly where you were!</p>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '25px', color: '#475569' }}>
          <h2 style={{ color: '#333', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>2. Starter Plots & Expansion</h2>
          <p>On your first join, you can claim a <strong>Starter Plot</strong> in the city. A tutorial will guide you and <code>/base</code> brings you home. (Make sure you have enough GriefPrevention claim blocks!)</p>
          <p>Need more space? Use <code>/plot expand</code> to upgrade your plot to the next tier (Small → Medium → Large → Estate → Mega) by paying the price difference.</p>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '25px', color: '#475569' }}>
          <h2 style={{ color: '#333', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>3. Buying, Selling & Auctions</h2>
          <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><strong>Sell:</strong> <code>/plot sell &lt;price&gt;</code> puts a for-sale listing on your plot. Anyone can walk on and <code>/plot buy</code> it.</li>
            <li><strong>Direct Offers:</strong> Walk onto any owned plot and type <code>/plot offer &lt;amount&gt;</code> to make an offer. The owner can accept or reject it in <code>/plot offers</code>.</li>
            <li><strong>Auctions:</strong> Run <code>/plot auction</code> to open your plot to bidding. Highest bidder wins when the timer expires! View auctions with <code>/plot auctioninfo</code>.</li>
          </ul>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '25px', color: '#475569' }}>
          <h2 style={{ color: '#333', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>4. Command Reference</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#333' }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>Command</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/plot gui</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Open your plot management GUI.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/plot browse</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Browse every plot on the server with sorting options.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/plot tp &lt;id&gt;</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Teleport to a plot.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/base</code> or <code>/myhome</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Teleport to your plot's home point.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/plot sethome</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Set the plot's home teleport point.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/plot trust &lt;player&gt;</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Grant build access to a player.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/plot untrust &lt;player&gt;</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Revoke build access from a player.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/plot ban &lt;player&gt;</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Forbid a player from entering your plot.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/plot abandon</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Give up the plot (contents preserved for next owner).</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/plot delete</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Permanently delete a plot and make the land available again.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
          </div>
        </div>
      </main>
    </div>
  );
}
