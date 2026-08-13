"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";

const showcaseVideos = [
  { id: "9I7zFIpuUCM", title: "Main Showcase", description: "Discover the breathtaking world of Pokefun Bedrock." },
  { id: "OjylkKg7JAg", title: "Main Showcase 2", description: "More epic adventures and server features." },
  { id: "IfKqJ3UYoV0", title: "Grass Gym Showcase", description: "Take on the challenging Grass Gym leader!" },
  { id: "T1xsUX1MrFg", title: "City Warp Showcase", description: "Explore the bustling central hub city." },
];

const showcaseImages = [
  "photo_10_2024-12-08_22-28-31.jpg", "photo_10_2024-12-08_22-28-40.jpg", "photo_10_2024-12-08_22-28-47.jpg",
  "photo_10_2024-12-08_22-28-54.jpg", "photo_10_2024-12-08_22-44-01.jpg", "photo_11_2024-12-08_22-28-31.jpg",
  "photo_11_2024-12-08_22-28-40.jpg", "photo_11_2024-12-08_22-28-47.jpg", "photo_11_2024-12-08_22-28-54.jpg",
  "photo_11_2024-12-08_22-44-01.jpg", "photo_12_2024-12-08_22-28-31.jpg", "photo_12_2024-12-08_22-28-40.jpg"
];

const featureItems = [
    {
        image: "/images/mainimage/mainbannerlobby.jpg",
        title: "Breathtaking Worlds & Lobby",
        desc: "Explore massive custom-built cities, beautiful landscapes, and discover hidden secrets in our custom Bedrock lobby."
    },
    {
        image: "/images/mainimage/Screenshot 2026-08-12 180256.png",
        title: "Epic Bedrock Gameplay",
        desc: "Immerse yourself in a fully custom Minecraft Bedrock experience. Catch, train, trade, and battle with players from all over the world!"
    },
    {
        image: "/images/mainimage/serverssidebar.png",
        title: "Economy & Player Shops",
        desc: "Trade, buy, and sell with our advanced server economy! Use the custom server sidebar to easily access menus, player shops, your balance, and more directly on Bedrock."
    }
];

const javaFeatureItems = [
    {
        title: "Raid Dens & Team Battles",
        desc: "Join forces with other trainers to take down massive Raid Bosses. Earn Crate Keys, rare candies, and exclusive drops.",
        image: "/images/features/image27_Team_Raids_Battle.png",
    },
    {
        title: "Alphazone",
        desc: "A dangerous, high-level zone where Alpha Pokemon roam. High risk, but extremely high reward.",
        image: "/images/features/cool spawn-2.png",
    },
    {
        title: "Dungeons",
        desc: "Explore procedurally generated dungeons filled with traps, puzzles, and powerful Boss Pokemon guarding epic loot.",
        image: "/images/features/minigamstasks-.png",
    },
    {
        title: "Ranked Matches",
        desc: "Climb the competitive ladder in our Ranked Matchmaking system. Prove you are the very best and earn seasonal rewards.",
        image: "/images/features/teambattles.png",
    },
    {
        title: "Mega Evolution & Primal Forms",
        desc: "Unleash the full potential of your Pokemon. We fully support Mega Evolutions, G-Max, and exclusive Primal Forms.",
        image: "/images/features/megapokemons-1.png",
    },
    {
        title: "Cosmetic Skins",
        desc: "Stand out with hundreds of custom cosmetic skins for your Pokemon. Obtainable completely free via gameplay and Crate Keys.",
        image: "/images/features/cosmetic skins1.png",
    }
];


export default function HomeClient() {
  const [playerCount, setPlayerCount] = useState<number | string>("Loading...");
  const [displayCount, setDisplayCount] = useState<number | string>("Loading...");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [ipCopied, setIpCopied] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (isVideoVisible) {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      } else {
        iframeRef.current.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    }
  }, [isVideoVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVideoVisible(true);
        } else {
          setIsVideoVisible(false);
        }
      },
      { threshold: 0.2 }
    );
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Apply body classes if needed for menu
    if (menuOpen) {
      document.body.classList.add("gh-head-open");
    } else {
      document.body.classList.remove("gh-head-open");
    }
  }, [menuOpen]);

  useEffect(() => {
    // Fetch server status
    fetch("https://mcapi.us/server/status?ip=mcpe.pokefun.in&port=19132")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success" && data.online) {
          // Add 20 to the actual player count as requested
          setPlayerCount((data.players?.now || 0) + 20);
        } else {
          setPlayerCount("Maintenance");
          setDisplayCount("Maintenance");
        }
      })
      .catch(() => {
          setPlayerCount("Offline");
          setDisplayCount("Offline");
      });
  }, []);

  useEffect(() => {
    if (typeof playerCount === 'number') {
      let start = 0;
      const duration = 1500;
      const startTime = performance.now();
      
      const animateCount = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(start + (playerCount - start) * progress);
        setDisplayCount(current);
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setDisplayCount(playerCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [playerCount]);

  const copyIp = () => {
    navigator.clipboard.writeText("mcpe.pokefun.in");
    setIpCopied(true);
    setTimeout(() => setIpCopied(false), 2000);
  };

  return (
    <div className="viewport">
        <div id="gh-header">
            <div id="nav">
                <div className="container">
                    <a href="/" className="active-pill">Home</a>
                    <a href="/features">Features</a>
                    <a href="/store">Shop</a>
                    <a href="/showcase">Showcase</a>
                    <a href="https://discord.gg/9AU3kHZZDT" target="_blank" rel="noopener noreferrer">Discord</a>
                </div>
            </div>
            <div className="header-bg"></div>
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
                            <li className="nav-home nav-current"><a href="/">Home</a></li>
                            <li className="nav-features"><a href="/features">Features</a></li>
                            <li className="nav-shop"><a href="/store">Shop</a></li>
                            <li className="nav-showcase"><a href="/showcase">Showcase</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            
            <div className="p-body-inner">
                <a href="#" id="players" className="info-card">
                    <i className="fa-solid fa-users"></i>
                    <div className="info-text">
                        <div className="if-large">Players <span className="count">{displayCount}</span></div>
                        <div className="if-small">mcpe.pokefun.in | Port: 19132</div>
                    </div>
                </a>
                <div id="logo">
                    <a href="/">
                        <img className="animate__infinite animate__slower animate__animated animate__pulse"
                            src="/images/mainimage/title.png" style={{ maxWidth: "450px", borderRadius: "12px", transform: "translateX(-10%)" }} alt="Pokefun Logo" />
                    </a>
                    <div className="circle">
                        <div className="circle"></div>
                    </div>
                </div>
                <a id="discord" target="_blank" href="https://discord.gg/9AU3kHZZDT" className="info-card" rel="noreferrer">
                    <div className="info-text">
                        <div className="if-large">DISCORD <span className="count">JOIN</span></div>
                        <div className="if-small">Join the Community</div>
                    </div>
                    <i className="fa-brands fa-discord"></i>
                </a>
            </div>
            <div className="custom-shape-divider-bottom-1675067978 custom-shadow">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                    preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="shape-fill"></path>
                </svg>
            </div>
            <div className="custom-shape-divider-bottom-1675067978">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                    preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="shape-fill"></path>
                </svg>
            </div>
            <div id="tsparticles"></div>
        </div>

        <main>
            <main id="site-main" className="site-main outer">
                <div className="inner posts">

                    <div className="inner" style={{ marginTop: '20px', marginBottom: '60px' }}>
                        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '22px', fontWeight: 'bold', color: '#333' }}>
                            Experience the best <strong style={{ color: '#0ea5e9' }}>Minecraft Bedrock Pokemon Server</strong>! <br />
                            Join the <strong style={{ color: '#0ea5e9' }}>POKEDROCK SMP POKEFUN</strong> community today.
                        </p>
                        <div style={{ marginTop: '40px', padding: '30px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'left', maxWidth: '1000px', margin: '0 auto' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#0ea5e9' }}>POKEDROCK SMP POKEFUN | mcpe.pokefun.in:19132</h2>
                            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
                                In the first time ever, anyone can play Pokemon on Minecraft Bedrock. Our servers are running at highest speed so you can battle, train, catch, and have fun.
                                POKEDROCK SMP POKEFUN started as a community wanting to build the best Pokemon addon for MCPE. We have accomplished our desire, and have brought everyone a Free Minecraft Bedrock Pokemon Survival Server.
                            </p>
                            <p style={{ color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>
                                Our meticulous craftsmanship and unwavering commitment have amazed over 1000+ players and brought them enjoyment, adventures, and more.
                                In a world where our players are at the forefront of our goals, we make sure everyone is happy, and having fun. If you have a problem, need to report a player, or have a suggestion make sure to join our <a href="https://discord.gg/9AU3kHZZDT" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>discord</a>.
                            </p>
                        </div>
                    </div>

                    <div className="inner" style={{ marginTop: '40px', marginBottom: '60px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', margin: '0 auto', maxWidth: '1000px', padding: '0 20px', alignItems: 'center' }}>
                            <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                                <img src="/images/mainimage/server_add_name_ip.png" alt="How to join" style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }} />
                            </div>
                            <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                                <div className="section-title" style={{ marginBottom: '20px', fontSize: '28px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#333' }}>
                                    How to Play
                                </div>
                                <p style={{ color: '#555', lineHeight: '1.8', fontSize: '16px', marginBottom: '15px' }}>
                                    Playing <strong>POKEDROCK SMP POKEFUN</strong> is as simple as adding our port/ip or clicking the <strong>Play Now</strong> button if you're on Mobile/Windows!
                                </p>
                                <p style={{ color: '#555', lineHeight: '1.8', fontSize: '16px', marginBottom: '25px' }}>
                                    Additionally you can join by using a LAN server finder like <a href="https://bedrocktogether.net/" target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>Bedrock Together</a>.
                                </p>
                                
                                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
                                    <a href="minecraft://?addExternalServer=POKEDROCK%20SMP%20POKEFUN|mcpe.pokefun.in:19132" style={{ background: '#2ecc71', color: '#fff', padding: '15px 25px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 8px 15px rgba(46,204,113,0.3)', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'transform 0.2s' }} className="hover:scale-105">
                                        <i className="fa-solid fa-play"></i> Auto-Add Server (Play Now)
                                    </a>
                                    <button onClick={copyIp} style={{ background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', color: '#fff', padding: '15px 25px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 8px 15px rgba(14,165,233,0.3)', display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'transform 0.2s' }} className="hover:scale-105">
                                        <i className="fa-solid fa-copy"></i> {ipCopied ? "Copied IP!" : "Copy Server IP"}
                                    </button>
                                </div>

                                <div style={{ background: 'rgba(14, 165, 233, 0.05)', color: '#333', padding: '20px', borderRadius: '12px', display: 'inline-block', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
                                    <div style={{ marginBottom: '8px' }}><strong>Name:</strong> POKEDROCK SMP POKEFUN</div>
                                    <div style={{ marginBottom: '8px' }}><strong>IP:</strong> mcpe.pokefun.in</div>
                                    <div><strong>Port:</strong> 19132</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inner" style={{ marginTop: '40px', marginBottom: '60px' }}>
                        <div className="section-title"
                            style={{ textAlign: 'center', marginBottom: '30px', fontSize: '28px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Video Showcases
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', margin: '0 auto', maxWidth: '1000px', padding: '0 20px' }}>
                            <div style={{ flex: '1 1 60%', minWidth: '300px' }}>
                                <div ref={videoRef} style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
                                    <iframe 
                                        ref={iframeRef}
                                        src={`https://www.youtube.com/embed/${showcaseVideos[activeVideoIndex].id}?enablejsapi=1&rel=0`} 
                                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen>
                                    </iframe>
                                </div>
                                <h3 style={{ marginTop: '15px', fontSize: '22px', fontWeight: 'bold' }}>{showcaseVideos[activeVideoIndex].title}</h3>
                                <p style={{ color: '#555' }}>{showcaseVideos[activeVideoIndex].description}</p>
                            </div>
                            <div style={{ flex: '1 1 35%', display: 'flex', flexDirection: 'column', gap: '15px', minWidth: '250px' }}>
                                {showcaseVideos.map((video, idx) => (
                                    <div key={video.id} 
                                         onClick={() => setActiveVideoIndex(idx)}
                                         style={{ display: 'flex', gap: '10px', padding: '10px', borderRadius: '8px', cursor: 'pointer', backgroundColor: activeVideoIndex === idx ? '#f0f0f0' : 'transparent', border: activeVideoIndex === idx ? '1px solid #ddd' : '1px solid transparent', transition: 'all 0.2s' }}>
                                        <img src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} style={{ width: '120px', height: '67px', borderRadius: '6px', objectFit: 'cover' }} alt={video.title} />
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <div style={{ fontWeight: 'bold', fontSize: '14px', color: activeVideoIndex === idx ? '#0ea5e9' : '#333' }}>{video.title}</div>
                                            {activeVideoIndex === idx && <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', marginTop: '4px' }}>Now Playing</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="inner" style={{ marginTop: '40px', marginBottom: '60px' }}>
                        <div className="section-title"
                            style={{ textAlign: 'center', marginBottom: '40px', fontSize: '28px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            Features & Server Previews
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '0 auto', maxWidth: '1000px', padding: '0 20px' }}>
                           {featureItems.map((feature, i) => (
                               <div key={i} style={{ 
                                   display: 'flex', 
                                   flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', 
                                   flexWrap: 'wrap',
                                   alignItems: 'center',
                                   gap: '30px'
                               }}>
                                   <div style={{ flex: '1 1 45%', minWidth: '300px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', transition: 'transform 0.3s' }}>
                                       <img src={feature.image} style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} alt="Server Feature" />
                                   </div>
                                   <div style={{ flex: '1 1 45%', minWidth: '300px', padding: '20px' }}>
                                       <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px', color: '#0ea5e9' }}>
                                           {feature.title}
                                       </h3>
                                       <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
                                           {feature.desc}
                                       </p>
                                   </div>
                               </div>
                           ))}
                        </div>
                        </div>
                    </div>

                    <div className="inner" style={{ marginTop: '80px', marginBottom: '80px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <h2 style={{ 
                                fontSize: '48px', 
                                fontWeight: '900', 
                                color: '#0ea5e9',
                                textShadow: '2px 2px 0px #ff0000, -2px -2px 0px #ff0000, 2px -2px 0px #ff0000, -2px 2px 0px #ff0000, 0px 3px 0px #ff0000',
                                letterSpacing: '2px',
                                fontStyle: 'italic',
                                marginBottom: '10px'
                            }}>
                                #pokedrocksmp
                            </h2>
                            <p style={{ color: '#555', fontSize: '16px' }}>
                                Check out some amazing content posted for Pokedrocksmp. <a href="https://discord.gg/9AU3kHZZDT" target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>Contact for add yours</a>
                            </p>
                        </div>
                        
                        <div style={{ 
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '20px', 
                            maxWidth: '1200px', 
                            margin: '0 auto', 
                            padding: '0 20px',
                            justifyContent: 'center'
                        }}>
                            {[
                                "4zrcSG2ygw0", "h1FQs-IiVr0", "0ptMHOkhJ4Q", "__ziTdEXDl4", "Qq_V_vSGLDM", 
                                "G8QyBWAIeYk", "Tzi1FsPWC5s", "lseql_tGWDs", "0DkrJkyW9CA", "hPoQH9xsCJ0", "aAE52hLQOTQ"
                            ].map((vid, idx) => {
                                // First two videos are larger (calc(50% - 10px))
                                // Remaining videos are smaller (calc(33.333% - 14px))
                                // On mobile, they should just be 100% wide. Using minWidth to achieve some flex responsiveness.
                                const isLarge = idx < 2;
                                return (
                                    <div key={vid} style={{ 
                                        flex: isLarge ? '1 1 calc(50% - 20px)' : '1 1 calc(33.333% - 20px)',
                                        minWidth: isLarge ? '300px' : '250px',
                                        position: 'relative',
                                        borderRadius: '12px',
                                        overflow: 'hidden',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                        aspectRatio: '16 / 9'
                                    }}>
                                        <iframe 
                                            src={`https://www.youtube.com/embed/${vid}?rel=0`} 
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen>
                                        </iframe>
                                    </div>
                                );
                            })}
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
        
        <Script id="tsparticles-init" strategy="lazyOnload">
          {`
            setTimeout(() => {
              if (window.tsParticles) {
                window.tsParticles.load("tsparticles", { preset: "stars" });
              }
            }, 1500);
          `}
        </Script>
    </div>
  );
}
