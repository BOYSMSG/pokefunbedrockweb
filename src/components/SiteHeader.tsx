"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import GlobalSaleBanner from "./GlobalSaleBanner";

export default function SiteHeader() {
  const [playerCount, setPlayerCount] = useState<number | string>("Loading...");
  const [displayCount, setDisplayCount] = useState<number | string>("Loading...");
  const [menuOpen, setMenuOpen] = useState(false);
  const [ipCopied, setIpCopied] = useState(false);
  const pathname = usePathname() || '';

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("gh-head-open");
    } else {
      document.body.classList.remove("gh-head-open");
    }
  }, [menuOpen]);

  useEffect(() => {
    fetch("https://api.mcstatus.io/v2/status/bedrock/mcpe.pokefun.in:19132")
      .then((res) => res.json())
      .then((data) => {
        if (data.online) {
          setPlayerCount((data.players?.online || 0) + 20);
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

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  const playNavHoverSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5 soft ghostly chime
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (_) {}
  };

  const playNavClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      // Spooky wooden bone knock / witch cauldron bubble snap
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.14);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (_) {}
  };

  return (
    <>
      <GlobalSaleBanner />
      <div id="gh-header">
        <div id="nav">
          <div className="container">
              <a href="/" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound} className={pathname === '/' ? "active-pill" : ""}>Home</a>
              <a href="/features" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound} className={isActive('/features') ? "active-pill" : ""}>Features</a>
              <a href="/halloween" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound} className={isActive('/halloween') ? "active-pill" : ""} style={{ color: "#ff7518", textShadow: "0 0 10px rgba(255, 117, 24, 0.55)" }}>🎃 Halloween</a>
              <a href="https://store.pokefun.in" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound} className={isActive('/store') ? "active-pill" : ""}>Shop</a>
              <a href="/showcase" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound} className={isActive('/showcase') ? "active-pill" : ""}>Showcase</a>
              <a href="/wiki" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound} className={isActive('/wiki') ? "active-pill" : ""}>Wiki & FAQ</a>
              <a href="/team" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound} className={isActive('/team') ? "active-pill" : ""}>Team</a>
              <a href="https://discord.gg/9AU3kHZZDT" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound} target="_blank" rel="noopener noreferrer">Discord</a>
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
                      <li className={`nav-home ${pathname === '/' ? 'nav-current' : ''}`}><a href="/" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound}>Home</a></li>
                      <li className={`nav-features ${isActive('/features') ? 'nav-current' : ''}`}><a href="/features" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound}>Features</a></li>
                      <li className={`nav-halloween ${isActive('/halloween') ? 'nav-current' : ''}`}><a href="/halloween" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound} style={{ color: "#ff7518" }}>🎃 Halloween</a></li>
                      <li className={`nav-shop ${isActive('/store') ? 'nav-current' : ''}`}><a href="https://store.pokefun.in" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound}>Shop</a></li>
                      <li className={`nav-showcase ${isActive('/showcase') ? 'nav-current' : ''}`}><a href="/showcase" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound}>Showcase</a></li>
                      <li className={`nav-wiki ${isActive('/wiki') ? 'nav-current' : ''}`}><a href="/wiki" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound}>Wiki & FAQ</a></li>
                      <li className={`nav-team ${isActive('/team') ? 'nav-current' : ''}`}><a href="/team" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound}>Team</a></li>
                  </ul>
              </div>
          </nav>
      </header>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-header-inner {
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 1200px;
            width: 100%;
            margin: 0 auto;
            color: white;
            gap: 60px;
            position: relative;
            z-index: 5;
            padding: 0 20px;
            box-sizing: border-box;
        }
        #nav .container>a {
            transition: all 0.22s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
            display: inline-block;
            border-radius: 40px;
            cursor: pointer;
            white-space: nowrap;
        }
        #nav .container>a:hover {
            transform: translateY(-4px) scale(1.08) !important;
            color: #ff9f43 !important;
            text-shadow: 0 0 10px #ff7518, 0 0 20px #ff3838, 0 0 30px #ffa502 !important;
            background: rgba(255, 117, 24, 0.22) !important;
            box-shadow: 0 4px 18px rgba(255, 117, 24, 0.45) !important;
        }
        #nav .container>a.active-pill:hover {
            transform: translateY(-4px) scale(1.06) !important;
            box-shadow: 0 0 25px rgba(255, 117, 24, 0.95), 0 0 40px rgba(142, 68, 173, 0.8) !important;
        }
        .gh-head-menu .nav a {
            transition: all 0.22s ease !important;
        }
        .gh-head-menu .nav a:hover {
            color: #ff9f43 !important;
            text-shadow: 0 0 10px #ff7518 !important;
            transform: translateY(-2px) !important;
        }
        .custom-info-card {
            position: relative;
            z-index: 10;
            color: white;
            flex: 1;
            display: flex;
            align-items: center;
            gap: 15px;
            text-decoration: none;
            transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        }
        .custom-info-card:hover {
            color: white;
            transform: translateY(-4px) scale(1.04) !important;
            box-shadow: 0 10px 25px rgba(255, 117, 24, 0.35) !important;
        }
        .custom-logo {
            flex: 1.5;
            display: flex;
            justify-content: center;
        }
        .custom-logo a {
            display: inline-block;
            width: 100%;
            max-width: 427px;
            text-align: center;
        }
        .custom-logo img {
            width: 100%;
            height: auto;
            border-radius: 12px;
        }
        @media (max-width: 900px) {
            .custom-header-inner {
                flex-wrap: wrap;
                gap: 20px;
                padding-bottom: 30px;
            }
            .custom-info-card {
                min-width: 150px;
                flex-direction: column;
                justify-content: center;
                gap: 5px;
            }
            .custom-info-card i {
                order: -1;
            }
            .custom-logo {
                flex: 1 1 100%;
                order: -2;
                margin-bottom: 20px;
            }
        }
      `}} />
      <div className="custom-header-inner">
          <a href="#" onMouseEnter={playNavHoverSound} onMouseDown={(e) => { playNavClickSound(); }} onClick={(e) => { e.preventDefault(); copyIp(); }} id="players" className="custom-info-card">
              <i className="fa-solid fa-users" style={{ fontSize: '32px' }}></i>
              <div className="info-text" style={{ textAlign: 'center' }}>
                  <div className="if-large">Players <span className="count">{displayCount}</span></div>
                  <div className="if-small">{ipCopied ? "Copied IP!" : "mcpe.pokefun.in | Port: 19132"}</div>
              </div>
          </a>
          <div id="logo" className="custom-logo">
              <a href="/">
                  <img className="animate__infinite animate__slower animate__animated animate__pulse"
                      src="/images/mainimage/title.png" alt="Pokefun Logo" />
              </a>
              <div className="circle">
                  <div className="circle"></div>
              </div>
          </div>
          <a id="discord" target="_blank" href="https://discord.gg/9AU3kHZZDT" onMouseEnter={playNavHoverSound} onMouseDown={playNavClickSound} className="custom-info-card" rel="noreferrer">
              <i className="fa-brands fa-discord" style={{ fontSize: '32px' }}></i>
              <div className="info-text" style={{ textAlign: 'center' }}>
                  <div className="if-large">DISCORD <span className="count">JOIN</span></div>
                  <div className="if-small">Join the Community</div>
              </div>
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
    </>
  );
}
