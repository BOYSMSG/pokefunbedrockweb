"use client";

import React, { useState, useEffect } from "react";
import Script from "next/script";

const features = [
    {
      title: "Natural Bosses",
      desc: "Powerful bosses spawn naturally in the world! Defeat them for epic loot.",
      image: "/images/features/image09_bosspokemons1.png",
    },
    {
      title: "Custom Raids",
      desc: "Team up with friends in the new Raid System to battle legendary foes.",
      image: "/images/features/image27_Team_Raids_Battle.png",
    },
    {
      title: "Battle Gimmicks",
      desc: "Mega Evolution, Dynamax, Gigantamax, and Z-Moves are all fully active!",
      image: "/images/features/image29_Z_Mega1s.png",
    },
    {
      title: "Pokémon Fusion",
      desc: "Create unique and powerful Pokémon through our advanced fusion system.",
      image: "/images/features/fusion pokemons1.png",
    },
    {
      title: "Gym System",
      desc: "Challenge our custom gyms and prove you are the best trainer.",
      image: "/images/features/battletower.png",
    },
    {
      title: "Cosmetic Skins",
      desc: "Unlock hundreds of unique skins and cosmetics for your favorite Pokémon.",
      image: "/images/features/cosmetic skins1.png",
    },
    {
      title: "Player Economy",
      desc: "Trade with players, set up shops, and participate in a living GTS economy.",
      image: "/images/features/hugecity2.png",
    },
    {
      title: "Legendary Monuments",
      desc: "Explore hidden structures containing rare treasures and secrets.",
      image: "/images/features/cool spawn-2.png",
    },
    {
      title: "Distortion World",
      desc: "Explore the twisted and inverted Distortion World!",
      image: "/images/features/DISTORTION WORLD1.png",
    },
    {
      title: "Flying Taxi",
      desc: "Travel quickly across the region using the Flying Taxi service.",
      image: "/images/features/Flying Taxi-Photoroom.png",
    },
    {
      title: "Gigantamax Forms",
      desc: "Discover and battle incredible Gigantamax Pokemon.",
      image: "/images/features/Gmax forms-1.png",
    },
    {
      title: "Battle Royals & Alpha Zone",
      desc: "Compete in chaotic Battle Royals in the dangerous Alpha Zone.",
      image: "/images/features/battleroyalsalphzone.png",
    },
    {
      title: "Battle Tower",
      desc: "Test your skills in the Battle Tower and earn rare rewards.",
      image: "/images/features/battletower.png",
    },
    {
      title: "Cool Fakemons",
      desc: "Hundreds of unique Fakemons to catch and train.",
      image: "/images/features/coolfakemons.png",
    },
    {
      title: "Custom Forms",
      desc: "Discover unique regional forms of your favorite Pokemon.",
      image: "/images/features/customeforms.png",
    },
    {
      title: "Dungeons",
      desc: "Explore challenging dungeons for legendary loot.",
      image: "/images/features/dungeon.png",
    },
    {
      title: "Huge Cities",
      desc: "Explore massive cities full of NPCs and quests.",
      image: "/images/features/hugecity.png",
    },
    {
      title: "Epic Armours",
      desc: "Equip your character with epic custom armor sets.",
      image: "/images/features/image15_epicarmours.png",
    },
    {
      title: "Poke Costumes",
      desc: "Dress up your Pokemon with special costumes.",
      image: "/images/features/image22_pokecostume.png",
    },
    {
      title: "Primal Forms",
      desc: "Unleash the ancient power of Primal Reversion.",
      image: "/images/features/image26_primal_forms.png",
    },
    {
      title: "Minigames & Tasks",
      desc: "Complete daily tasks and play fun minigames.",
      image: "/images/features/minigamstasks-.png",
    },
    {
      title: "Ranked Matches",
      desc: "Climb the ladder in competitive Ranked Matches.",
      image: "/images/features/rankedmacthcs.png",
    },
    {
      title: "Safari Zone",
      desc: "Catch rare Pokemon in the Safari Zone.",
      image: "/images/features/safarizone.png",
    },
    {
      title: "Team Battles",
      desc: "Form a team and battle other players.",
      image: "/images/features/teambattles.png",
    }
];

export default function FeaturesPage() {
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
                    <a href="/features" className="active-pill">Features</a>
                    <a href="/store">Shop</a>
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
                            <li className="nav-features nav-current"><a href="/features">Features</a></li>
                            <li className="nav-shop"><a href="/store">Shop</a></li>
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

        <main id="site-main" className="site-main outer">
            <div className="inner posts" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
                <div className="section-title" style={{ textAlign: 'center', marginBottom: '20px', fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', color: '#111' }}>
                    Server Features
                </div>
                <p style={{ textAlign: 'center', color: '#666', fontSize: '18px', marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
                    Discover the unique mechanics, minigames, and systems that make Pokefun the ultimate Bedrock destination.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
                    {features.map((feature, idx) => (
                        <div key={idx} className="feature-card" style={{ 
                            borderRadius: '16px', 
                            overflow: 'hidden', 
                            background: '#fff', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.1)', 
                            display: 'flex', 
                            flexDirection: 'column',
                            transition: 'all 0.3s ease'
                        }}>
                            <div style={{ height: '220px', overflow: 'hidden' }}>
                                <img 
                                    src={feature.image} 
                                    alt={feature.title} 
                                    className="feature-img"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                                />
                            </div>
                            <div style={{ padding: '30px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '15px', color: '#0ea5e9' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: '#555', lineHeight: '1.6', fontSize: '15px' }}>
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
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

        <style dangerouslySetInnerHTML={{__html: `
            .feature-card:hover {
                transform: translateY(-8px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important;
            }
            .feature-card:hover .feature-img {
                transform: scale(1.08) !important;
            }
        `}} />
    </div>
  );
}
