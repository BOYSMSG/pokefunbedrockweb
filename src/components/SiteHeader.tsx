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

  return (
    <>
      <GlobalSaleBanner />
      <div id="gh-header">
        <div id="nav">
          <div className="container">
              <a href="/" className={pathname === '/' ? "active-pill" : ""}>Home</a>
              <a href="/features" className={isActive('/features') ? "active-pill" : ""}>Features</a>
              <a href="https://store.pokefun.in" className={isActive('/store') ? "active-pill" : ""}>Shop</a>
              <a href="/showcase" className={isActive('/showcase') ? "active-pill" : ""}>Showcase</a>
              <a href="/wiki" className={isActive('/wiki') ? "active-pill" : ""}>Wiki & FAQ</a>
              <a href="/team" className={isActive('/team') ? "active-pill" : ""}>Team</a>
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
                      <li className={`nav-home ${pathname === '/' ? 'nav-current' : ''}`}><a href="/">Home</a></li>
                      <li className={`nav-features ${isActive('/features') ? 'nav-current' : ''}`}><a href="/features">Features</a></li>
                      <li className={`nav-shop ${isActive('/store') ? 'nav-current' : ''}`}><a href="https://store.pokefun.in">Shop</a></li>
                      <li className={`nav-showcase ${isActive('/showcase') ? 'nav-current' : ''}`}><a href="/showcase">Showcase</a></li>
                      <li className={`nav-wiki ${isActive('/wiki') ? 'nav-current' : ''}`}><a href="/wiki">Wiki & FAQ</a></li>
                      <li className={`nav-team ${isActive('/team') ? 'nav-current' : ''}`}><a href="/team">Team</a></li>
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
        .custom-info-card {
            position: relative;
            z-index: 10;
            color: white;
            flex: 1;
            display: flex;
            align-items: center;
            gap: 15px;
            text-decoration: none;
        }
        .custom-info-card:hover {
            color: white;
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
          <a href="#" onClick={(e) => { e.preventDefault(); copyIp(); }} id="players" className="custom-info-card">
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
          <a id="discord" target="_blank" href="https://discord.gg/9AU3kHZZDT" className="custom-info-card" rel="noreferrer">
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
