"use client";

import React, { useState, useEffect, useRef } from "react";
import { HALLOWEEN_THEME_ACTIVE } from "@/config/halloween";

// Advanced Horror Audio Synthesizer using Web Audio API
class HorrorSoundFX {
  private ctx: AudioContext | null = null;
  private ambientOsc1: OscillatorNode | null = null;
  private ambientOsc2: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  public isAmbientPlaying: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // 1. Thunder Strike & Deep Rolling Rumble
  public playThunder() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Create white noise buffer for thunder crash
    const bufferSize = this.ctx.sampleRate * 2.8;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    // Filter to shape into thunder crash & rumble
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(70, now + 2.5);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    // Deep sub-bass rumble oscillator
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = "sine";
    subOsc.frequency.setValueAtTime(65, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 2.5);

    subGain.gain.setValueAtTime(0.35, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.6);

    subOsc.connect(subGain);
    subGain.connect(this.ctx.destination);

    whiteNoise.start(now);
    subOsc.start(now);
    subOsc.stop(now + 2.7);
  }

  // 2. Creepy Deep Evil Laugh (Muahaha)
  public playEvilLaugh() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Series of descending guttural laughs
    const laughterPitches = [160, 140, 120, 105, 90, 80, 70];
    laughterPitches.forEach((freq, idx) => {
      if (!this.ctx) return;
      const startTime = now + idx * 0.18;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.75, startTime + 0.15);

      gain.gain.setValueAtTime(0.01, startTime);
      gain.gain.linearRampToValueAtTime(0.28, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.17);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.18);
    });
  }

  // 3. Ghostly Wail / Banshee Scream
  public playGhostWail() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.9);
    osc.frequency.exponentialRampToValueAtTime(220, now + 2.2);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 2.4);
  }

  // 4. Haunted Pipe Organ Minor Chord
  public playHauntedOrgan() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // D minor chord frequencies (D3, F3, A3, D4)
    const freqs = [146.83, 174.61, 220.00, 293.66];
    freqs.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 3.0);
    });
  }

  // 5. Creepy Music Box Chime
  public playMusicBox() {
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const melody = [523.25, 659.25, 493.88, 587.33, 440.00];
    melody.forEach((freq, idx) => {
      if (!this.ctx) return;
      const startTime = now + idx * 0.28;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.65);
    });
  }

  // 6. Eerie Background Drone + Graveyard Wind
  public toggleAmbient(enable: boolean) {
    this.initCtx();
    if (!this.ctx) return;

    if (!enable) {
      if (this.ambientGain) {
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
      }
      setTimeout(() => {
        try {
          this.ambientOsc1?.stop();
          this.ambientOsc2?.stop();
          this.noiseNode?.stop();
        } catch (_) {}
        this.ambientOsc1 = null;
        this.ambientOsc2 = null;
        this.noiseNode = null;
        this.ambientGain = null;
        this.isAmbientPlaying = false;
      }, 650);
      return;
    }

    if (this.isAmbientPlaying) return;

    const now = this.ctx.currentTime;
    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.001, now);
    this.ambientGain.gain.linearRampToValueAtTime(0.08, now + 2.5);

    this.ambientOsc1 = this.ctx.createOscillator();
    this.ambientOsc2 = this.ctx.createOscillator();

    this.ambientOsc1.type = "sine";
    this.ambientOsc1.frequency.setValueAtTime(82.41, now); // E2 dark drone

    this.ambientOsc2.type = "triangle";
    this.ambientOsc2.frequency.setValueAtTime(123.47, now); // B2 hollow drone

    this.ambientOsc1.connect(this.ambientGain);
    this.ambientOsc2.connect(this.ambientGain);
    this.ambientGain.connect(this.ctx.destination);

    this.ambientOsc1.start(now);
    this.ambientOsc2.start(now);
    this.isAmbientPlaying = true;
  }
}

export default function HalloweenTheme() {
  const [mounted, setMounted] = useState(false);
  const [themeActive, setThemeActive] = useState(true);
  const [lightningFlash, setLightningFlash] = useState(false);
  const [pumpkinMessage, setPumpkinMessage] = useState<string | null>(null);
  const soundFX = useRef<HorrorSoundFX | null>(null);

  const horrorQuotes = [
    "🎃 THE POKEDROCK HAUNTING HAS BEGUN...",
    "👻 Gengar & Chandelure have possessed the gyms!",
    "⚡ A thunderstorm approaches... Beware of ghost spawns!",
    "🍬 Give candy or prepare for trickery!",
    "💀 Welcome to the graveyard of fallen trainers!",
    "🔮 The blood moon rises over Pokedrock SMP..."
  ];

  useEffect(() => {
    setMounted(true);
    soundFX.current = new HorrorSoundFX();
    setThemeActive(HALLOWEEN_THEME_ACTIVE);

    // Subtle lightning flash timer every 35s (super lightweight)
    const lightningTimer = setInterval(() => {
      triggerLightning();
    }, 35000);

    return () => {
      clearInterval(lightningTimer);
    };
  }, []);

  const triggerLightning = () => {
    setLightningFlash(true);
    setTimeout(() => {
      setLightningFlash(false);
      setTimeout(() => {
        setLightningFlash(true);
        setTimeout(() => setLightningFlash(false), 70);
      }, 120);
    }, 100);
  };

  const onPumpkinClick = () => {
    if (soundFX.current) {
      // Pick random horror sound effect on each click
      const sounds = [
        () => soundFX.current?.playThunder(),
        () => soundFX.current?.playEvilLaugh(),
        () => soundFX.current?.playGhostWail(),
        () => soundFX.current?.playHauntedOrgan(),
        () => soundFX.current?.playMusicBox()
      ];
      const randomIdx = Math.floor(Math.random() * sounds.length);
      sounds[randomIdx]();

      if (randomIdx === 0 || randomIdx === 1) {
        triggerLightning();
      }
    }

    const randomQuote = horrorQuotes[Math.floor(Math.random() * horrorQuotes.length)];
    setPumpkinMessage(randomQuote);

    setTimeout(() => {
      setPumpkinMessage(null);
    }, 4000);
  };

  if (!HALLOWEEN_THEME_ACTIVE) return null;

  return (
    <>
      {/* Horror & Halloween Theme CSS */}
      {themeActive && (
        <style dangerouslySetInnerHTML={{ __html: `
          /* Clean Halloween Night Atmosphere without ugly horizontal lines */
          #gh-header {
            background: linear-gradient(180deg, #12031c 0%, #0d0115 100%) !important;
            /* NO border-bottom line! Perfectly seamless curved look */
            border-bottom: none !important;
            box-shadow: 0 10px 35px rgba(255, 117, 24, 0.2) !important;
          }

          /* Active nav items in creepy pumpkin flame glow */
          .active-pill {
            background: linear-gradient(135deg, #ff6b08, #8e44ad) !important;
            color: #ffffff !important;
            box-shadow: 0 0 16px rgba(255, 107, 8, 0.7) !important;
            border: 1px solid rgba(255, 175, 64, 0.4) !important;
          }

          /* Buttons glowing with pumpkin flame */
          .gh-head-button, .btn-primary, .btn-halloween {
            background: linear-gradient(135deg, #ff6b08, #c0392b) !important;
            color: #ffffff !important;
            border: 1px solid #ff9f43 !important;
            box-shadow: 0 0 12px rgba(255, 107, 8, 0.5) !important;
            transition: all 0.25s ease !important;
          }

          .gh-head-button:hover, .btn-primary:hover {
            box-shadow: 0 0 22px rgba(255, 107, 8, 0.85), 0 0 35px rgba(142, 68, 173, 0.5) !important;
            transform: translateY(-2px) scale(1.03) !important;
          }

          /* Fog / Mist rolling animation */
          @keyframes mistRoll {
            0% { transform: translateX(0); }
            50% { transform: translateX(-25%); }
            100% { transform: translateX(0); }
          }

          /* Spooky glowing eyes blinking */
          @keyframes eyesBlink {
            0%, 45%, 55%, 100% { opacity: 0; }
            48%, 52% { opacity: 0.9; }
          }

          /* GPU-accelerated Bats fluttering */
          @keyframes batSwarm {
            0% { transform: translate3d(-15vw, 10px, 0) scale(0.65); }
            35% { transform: translate3d(35vw, -50px, 0) scale(0.85); }
            70% { transform: translate3d(75vw, 20px, 0) scale(0.7); }
            100% { transform: translate3d(115vw, -30px, 0) scale(0.65); }
          }

          .horror-bat-swarm {
            position: fixed;
            z-index: 9990;
            pointer-events: none;
            will-change: transform;
            animation: batSwarm 18s linear infinite;
          }

          /* Lightning Screen Flash */
          .lightning-flash-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(220, 210, 255, 0.35);
            pointer-events: none;
            z-index: 999999;
            will-change: opacity;
            transition: opacity 0.08s ease;
          }

          /* Floating scary ghost */
          @keyframes ghostSway {
            0% { transform: translate3d(0, 0, 0) rotate(0deg); }
            25% { transform: translate3d(15px, -25px, 0) rotate(4deg); }
            50% { transform: translate3d(-10px, -45px, 0) rotate(-4deg); }
            75% { transform: translate3d(8px, -20px, 0) rotate(2deg); }
            100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          }
        `}} />
      )}

      {/* Lightning Flash Effect on Screen */}
      {themeActive && lightningFlash && (
        <div className="lightning-flash-overlay" />
      )}

      {/* Lightweight Spooky Ambient Fog at bottom (Static GPU-composited, 0% CPU) */}
      {themeActive && (
        <div style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "90px",
          background: "linear-gradient(to top, rgba(18, 3, 28, 0.45) 0%, rgba(255, 107, 8, 0.05) 50%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 9988
        }} />
      )}

      {/* Glowing Demon Eyes Peeking from Left Corner */}
      {themeActive && (
        <div style={{
          position: "fixed",
          bottom: "160px",
          left: "25px",
          zIndex: 9989,
          pointerEvents: "none",
          animation: "eyesBlink 7s infinite"
        }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ width: "9px", height: "4px", background: "#ff0033", borderRadius: "50%", boxShadow: "0 0 10px #ff0033, 0 0 20px #ff0033" }} />
            <div style={{ width: "9px", height: "4px", background: "#ff0033", borderRadius: "50%", boxShadow: "0 0 10px #ff0033, 0 0 20px #ff0033" }} />
          </div>
        </div>
      )}



      {/* Horror Spooky Atmosphere Assets (Only when themeActive is true) */}
      {themeActive && (
        <>
          {/* 1. Spider Web Top Left */}
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "150px",
            height: "150px",
            pointerEvents: "none",
            zIndex: 9998,
            opacity: 0.8
          }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", fill: "none", stroke: "rgba(255, 255, 255, 0.55)", strokeWidth: "1.2" }}>
              <path d="M0,0 L100,0 M0,0 L85,45 M0,0 L50,85 M0,0 L0,100" />
              <path d="M25,0 Q20,15 0,25" />
              <path d="M50,0 Q40,30 0,50" />
              <path d="M75,0 Q60,50 0,75" />
              <path d="M100,0 Q75,70 0,100" />
            </svg>
          </div>

          {/* 2. Spider Web Top Right */}
          <div style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "150px",
            height: "150px",
            pointerEvents: "none",
            zIndex: 9998,
            opacity: 0.8,
            transform: "scaleX(-1)"
          }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", fill: "none", stroke: "rgba(255, 255, 255, 0.55)", strokeWidth: "1.2" }}>
              <path d="M0,0 L100,0 M0,0 L85,45 M0,0 L50,85 M0,0 L0,100" />
              <path d="M25,0 Q20,15 0,25" />
              <path d="M50,0 Q40,30 0,50" />
              <path d="M75,0 Q60,50 0,75" />
              <path d="M100,0 Q75,70 0,100" />
            </svg>
          </div>

          {/* 3. Flying Bats Crossing the Top Screen */}
          <div className="horror-bat-swarm" style={{ top: "14%" }}>
            <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
              <span style={{ fontSize: "32px", display: "inline-block", transform: "scaleX(-1)", filter: "drop-shadow(0 0 6px rgba(0,0,0,0.8))" }}>🦇</span>
              <span style={{ fontSize: "22px", display: "inline-block", transform: "scaleX(-1) translateY(-14px)" }}>🦇</span>
              <span style={{ fontSize: "26px", display: "inline-block", transform: "scaleX(-1) translateY(12px)" }}>🦇</span>
              <span style={{ fontSize: "18px", display: "inline-block", transform: "scaleX(-1) translateY(-6px)" }}>🦇</span>
            </div>
          </div>

          {/* 4. Haunted Ghost Drifting on Right Edge */}
          <div style={{
            position: "fixed",
            top: "38%",
            right: "2%",
            zIndex: 9991,
            pointerEvents: "auto",
            cursor: "pointer",
            animation: "ghostSway 7s ease-in-out infinite"
          }}
          onClick={() => soundFX.current?.playGhostWail()}
          title="Click to spook the ghost!"
          >
            <div style={{
              fontSize: "44px",
              filter: "drop-shadow(0 0 18px rgba(155, 89, 182, 0.9))"
            }}>
              👻
            </div>
          </div>

          {/* 5. Giant Glowing Evil Jack-o'-Lantern (Bottom Right) */}
          <div style={{
            position: "fixed",
            bottom: "20px",
            right: "25px",
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}>
            {/* Spooky Pumpkin Message Bubble */}
            {pumpkinMessage && (
              <div style={{
                background: "rgba(18, 3, 28, 0.95)",
                color: "#ff9f43",
                border: "2px solid #ff6b08",
                padding: "12px 18px",
                borderRadius: "18px 18px 2px 18px",
                marginBottom: "12px",
                boxShadow: "0 0 25px rgba(255, 107, 8, 0.65)",
                fontSize: "14px",
                fontWeight: "bold",
                maxWidth: "280px",
                textAlign: "right"
              }}>
                {pumpkinMessage}
              </div>
            )}

            {/* Glowing Jack-o'-Lantern Button */}
            <div 
              onClick={onPumpkinClick}
              style={{
                width: "74px",
                height: "74px",
                borderRadius: "50%",
                background: "radial-gradient(circle at 35% 35%, #ff7518 0%, #d35400 65%, #6e2200 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 0 30px rgba(255, 107, 8, 0.95), inset 0 0 15px rgba(255, 230, 0, 0.5)",
                border: "2.5px solid #ffa502",
                transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.18) rotate(-8deg)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) rotate(0deg)"}
              title="Click the Evil Pumpkin to trigger horror lightning & laugh!"
            >
              {/* Detailed Carved Jack-o'-lantern Face SVG */}
              <svg viewBox="0 0 100 100" style={{ width: "52px", height: "52px" }}>
                {/* Stem */}
                <path d="M46,12 Q48,2 58,5 Q54,14 50,16 Z" fill="#27ae60" />
                {/* Demonic Eyes */}
                <polygon points="24,36 42,42 32,50" fill="#fff200" filter="drop-shadow(0 0 4px #ff4757)" />
                <polygon points="76,36 58,42 68,50" fill="#fff200" filter="drop-shadow(0 0 4px #ff4757)" />
                {/* Nose */}
                <polygon points="50,46 44,56 56,56" fill="#fff200" filter="drop-shadow(0 0 4px #ff4757)" />
                {/* Menacing Jagged Teeth */}
                <path d="M18,65 Q50,88 82,65 Q74,76 66,70 Q60,78 50,71 Q40,78 34,70 Q26,76 18,65 Z" fill="#fff200" filter="drop-shadow(0 0 6px #ff4757)" />
              </svg>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export function playNavHoverSound() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  } catch (_) {}
}

export function playNavClickSound() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
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
}

