import React from "react";
import Head from "next/head";
import SiteHeader from "@/components/SiteHeader";

export default function LevelCapWiki() {
  return (
    <div className="viewport">
      <Head>
        <title>Gyms & Level Cap | POKEDROCK SMP POKEFUN</title>
      </Head>
      <SiteHeader />
      <main id="site-main" className="site-main outer" style={{ background: '#f8fafc', margin: 0, padding: 0 }}>
        <div className="inner posts" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
          <div className="container-wrapper" style={{ padding: '40px 20px', minHeight: '80vh' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#00f2fe' }}>
          <i className="fa-solid fa-arrow-up-right-dots"></i> Gyms & Level Cap
        </h1>

        <div style={{ background: 'var(--panel)', padding: '25px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '25px' }}>
          <h2 style={{ color: 'var(--accent)', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '15px' }}>Why is my Pokémon not listening?</h2>
          <p>
            If your Pokémon does not listen to you, it means <strong>your level cap is not high enough for them</strong>, or they lack bond with you.
          </p>
          <p>
            Your level cap also depends on your <strong>Pokémon matches, battles, and friendship</strong> so your Pokémon do not disobey your orders. You can increase your level cap by finding Gyms and Gym Leaders in villages. Find the Gym building, battle the Gym NPC, and win! If you win, your level cap increases.
          </p>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '25px', color: '#475569' }}>
          <h2 style={{ color: '#333', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>🎮 Server Progression</h2>
          <p style={{ marginBottom: '15px' }}>If your Pokémon is not listening to you, it means your Level Cap is not high enough for them! You need to increase your level cap by finding Gyms in villages and defeating Gym Leaders.</p>
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #00f2fe', marginBottom: '20px' }}>
            <strong style={{ color: '#333' }}>Level Cap Formula:</strong> <code>floor(15 + (85 ÷ 18 × Badges))</code>
          </div>
          <p>By default, the server has <strong>18 progression steps</strong> and a maximum cap of <strong>Lv. 100</strong>.</p>
          
          <div style={{ overflowX: 'auto', marginTop: '20px' }}>
            <table className="table" style={{ minWidth: '300px', margin: '0 auto', borderCollapse: 'collapse', textAlign: 'center', color: '#333' }}>
              <thead>
                <tr style={{ background: '#f1f5f9' }}>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>Badges</th>
                  <th style={{ padding: '12px', borderBottom: '1px solid #e2e8f0', color: '#1e293b' }}>Pokémon Level Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>0</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>15</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>1</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>19</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>2</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>24</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>3</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>29</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>4</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>33</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>5</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>38</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>6</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>43</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>7</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>48</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>8</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>52</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>9</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>57</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>10</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>62</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>11</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>66</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>12</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>71</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>13</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>76</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>14</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>81</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>15</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>85</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>16</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>90</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>17</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>95</strong></td></tr>
                <tr><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}>18</td><td style={{ padding: '8px', borderBottom: '1px solid #e2e8f0' }}><strong>100</strong></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '25px', color: '#475569' }}>
          <h2 style={{ color: '#333', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>🧠 Actual Gameplay Example</h2>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Start (0 badges):</strong> Player should ideally use a Lv. 15 Pokémon. If they have a Lv. 30 Pokémon, the script will handle it according to the cap. Use <code>/qlevelcap</code> to check your current cap.</li>
            <li><strong>1 badge:</strong> Cap increases to <strong>19</strong>.</li>
            <li><strong>4 badges:</strong> Cap increases to <strong>33</strong>.</li>
            <li><strong>8 badges:</strong> Cap increases to <strong>52</strong>.</li>
            <li><strong>12 badges:</strong> Cap increases to <strong>71</strong>.</li>
            <li><strong>16 badges:</strong> Cap increases to <strong>90</strong>.</li>
            <li><strong>18 badges:</strong> Cap increases to <strong>100</strong>.</li>
          </ul>
        </div>

        <div style={{ background: '#fef2f2', borderLeft: '4px solid #ef4444', padding: '20px', borderRadius: '0 8px 8px 0', marginBottom: '25px', color: '#475569' }}>
          <h3 style={{ color: '#ef4444', marginTop: '0' }}>⚠️ Important Note</h3>
          <p>
            This is <strong>not just a simple XP block</strong>. The script checks the stored level in the Pokémon's battle/team tags.
            If the level is above the current cap, it will dynamically adjust to the cap during battle. Higher-level team conditions might also trigger storage/handling replacements.
          </p>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', border: '1px solid #e2e8f0', color: '#475569' }}>
          <h2 style={{ color: '#333', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px', marginBottom: '15px' }}>🔥 Intended Gameplay Loop</h2>
          <p style={{ fontSize: '1.2rem', textAlign: 'center', padding: '10px', background: '#f8fafc', borderRadius: '8px', color: '#333' }}>
            <strong>Gym → Badge → Higher Level Allowed → Next Gym → Badge → Higher Cap</strong>
          </p>
          <p style={{ textAlign: 'center', marginTop: '15px', color: '#94a3b8' }}>
            This ensures that players can't just use a Lv.100 Pokémon from the start to destroy the entire server!
          </p>
        </div>
          </div>
        </div>
      </main>
    </div>
  );
}
