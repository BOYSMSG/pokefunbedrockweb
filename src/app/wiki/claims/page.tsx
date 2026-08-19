import React from "react";
import Head from "next/head";
import SiteHeader from "@/components/SiteHeader";

export default function ClaimsWiki() {
  return (
    <div className="viewport">
      <Head>
        <title>Claims & Grief Prevention | POKEDROCK SMP POKEFUN</title>
      </Head>
      <SiteHeader />
      <main id="site-main" className="site-main outer" style={{ background: '#f8fafc', margin: 0, padding: 0 }}>
        <div className="inner posts" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
          <div className="container-wrapper" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#ff6b6b' }}>
          <i className="fa-solid fa-shield-halved"></i> Claims & Grief Prevention Guide
        </h1>
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <p style={{ color: '#475569', fontSize: '1.1rem' }}>Protect your builds and manage who has access to your land using these commands.</p>
          <div style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', textAlign: 'left', color: '#333' }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>Command</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>Alias</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/AbandonClaim</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>-</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Deletes the claim you’re standing in.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/ClaimExplosions</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>-</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Toggles if explosions are allowed in the claim.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/Trust &lt;player&gt;</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/t</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Gives another player permission to edit in your claim.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/UnTrust &lt;player&gt;</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/ut</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Revokes any permissions granted to a player in your claim.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/AccessTrust &lt;player&gt;</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/at</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Gives a player permission to use your buttons, levers, and beds.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/ContainerTrust &lt;player&gt;</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/ct</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Gives a player permission to use your buttons, levers, beds, crafting gear, containers, and animals.</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}><code>/TrustList</code></td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>-</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #e2e8f0' }}>Lists the permissions for the claim you’re standing in.</td>
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
