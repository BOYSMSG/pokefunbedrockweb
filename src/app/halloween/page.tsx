"use client";

import React, { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import { playNavClickSound, playNavHoverSound } from "@/components/HalloweenTheme";

interface SkinItem {
    name: string;
    pokemon: string;
    rarity: string;
    badgeColor: string;
    desc: string;
    img: string;
}

interface GalleryItem {
    title: string;
    category: "skins" | "costumes" | "horror" | "world";
    desc: string;
    img: string;
}

const HALLOWEEN_SKINS: SkinItem[] = [
    {
        name: "Shadow Flame Charizard",
        pokemon: "Charizard",
        rarity: "Mythic Halloween",
        badgeColor: "#ff5500",
        desc: "Cloaked in pitch-black volcanic scales with glowing jack-o'-lantern wing membranes and infernal orange fire.",
        img: "/images/halloween/skin-charizard.png",
    },
    {
        name: "Blood Skeletal Garchomp",
        pokemon: "Garchomp",
        rarity: "Mythic Halloween",
        badgeColor: "#ef4444",
        desc: "A terrifying bone-plated apex predator with crimson ribcage markings, bone claws, and glowing blood-red eyes.",
        img: "/images/halloween/skin-garchomp.png",
    },
    {
        name: "Infernal Eclipse Rayquaza",
        pokemon: "Rayquaza",
        rarity: "Legendary Halloween",
        badgeColor: "#f97316",
        desc: "Coiled in abyssal darkness with blazing pumpkin-orange runes coursing across its ancient serpentine body.",
        img: "/images/halloween/skin-rayquaza.png",
    },
    {
        name: "Spectral Void Mewtwo",
        pokemon: "Mewtwo",
        rarity: "Legendary Halloween",
        badgeColor: "#a855f7",
        desc: "A ghostly pale phantom infused with dark purple psychic corruption and cursed spirit energy.",
        img: "/images/halloween/skin-mewtwo.png",
    },
    {
        name: "Jack-o'-Lantern Lucario",
        pokemon: "Lucario",
        rarity: "Epic Halloween",
        badgeColor: "#ff7518",
        desc: "Features a carved glowing pumpkin chest sigil, burning ember aura, and midnight shadow armor.",
        img: "/images/halloween/skin-lucario.png",
    },
    {
        name: "Nightshade Shinobi Greninja",
        pokemon: "Greninja",
        rarity: "Epic Halloween",
        badgeColor: "#8b5cf6",
        desc: "Draped in dark phantom purple and midnight black, striking silently from the Haunted Forest fog.",
        img: "/images/halloween/skin-greninja.png",
    },
    {
        name: "Gothic Phantom Gardevoir",
        pokemon: "Gardevoir",
        rarity: "Epic Halloween",
        badgeColor: "#c084fc",
        desc: "An eerie gothic gown of midnight black and spectral violet, channeling otherworldly shrine magic.",
        img: "/images/halloween/skin-gardevoir.png",
    },
    {
        name: "Abyssal Wraith Gyarados",
        pokemon: "Gyarados",
        rarity: "Epic Halloween",
        badgeColor: "#06b6d4",
        desc: "Risen from cursed waters with deep midnight scales and bioluminescent soulfire markings.",
        img: "/images/halloween/skin-gyarados.png",
    },
    {
        name: "Hellfire Hound Arcanine",
        pokemon: "Arcanine",
        rarity: "Rare Halloween",
        badgeColor: "#fb923c",
        desc: "A fierce guardian of the pumpkin patches with charred dark fur and blazing orange stripes.",
        img: "/images/halloween/skin-arcanine.png",
    },
    {
        name: "Cursed Pumpkin Pikachu",
        pokemon: "Pikachu",
        rarity: "Event Special",
        badgeColor: "#facc15",
        desc: "Festival-ready Pikachu sporting spooky jack-o'-lantern patterns and crackling orange sparks!",
        img: "/images/halloween/skin-pikachu.png",
    },
];

const GALLERY_ITEMS: GalleryItem[] = [
    {
        title: "Player Witch Costume & Ghost Pet",
        category: "costumes",
        desc: "Wear the custom Witch Hat, carry a glowing Pumpkin Lantern, and summon your floating Purple Ghost Pet!",
        img: "/images/halloween/costume-player-witch.png",
    },
    {
        title: "Halloween Costume & Plushie Store",
        category: "costumes",
        desc: "Browse custom outfits including Team Rocket, Dragonite Suit, Witch Hats, Cat Ears, and spooky plushies.",
        img: "/images/halloween/costume-store-showcase.png",
    },
    {
        title: "Costume Showcase Plaza",
        category: "costumes",
        desc: "Walk the red-and-white PokéBall carpet guarded by Witch-Hat Soulfire Pumpkins and display mannequins.",
        img: "/images/halloween/costume-arena-overview.png",
    },
    {
        title: "Vampire & Gothic Suits",
        category: "costumes",
        desc: "Dress up in formal Vampire & Gothic attire inside the cursed checkerboard showroom.",
        img: "/images/halloween/costume-vampire-suits.png",
    },
    {
        title: "Soulfire Pumpkin & Candy Basket",
        category: "costumes",
        desc: "Collect overflowing Trick-or-Treat Candy Baskets and glowing cyan Soulfire Jack-o'-Lanterns.",
        img: "/images/halloween/decor-candy-basket.png",
    },
    {
        title: "Infernal Nightmare Entity",
        category: "horror",
        desc: "Beware the glowing orange nightmare creature lurking near the haunted spawn gates at midnight!",
        img: "/images/halloween/entity-fiery-demon.png",
    },
    {
        title: "The Pale Stalker (Jumpscare)",
        category: "horror",
        desc: "Don't look behind you! Terrifying custom horror entities roam the dark corners of the event.",
        img: "/images/halloween/entity-jumpscare-horror.png",
    },
    {
        title: "Shadow Stalker in the Plaza",
        category: "horror",
        desc: "A towering shadowy figure watching over the blood-flame steps of the town square.",
        img: "/images/halloween/entity-shadow-stalker.png",
    },
    {
        title: "Grand Halloween Skin Arena",
        category: "world",
        desc: "Monumental Pokedrock arena featuring Arceus & Giratina statues, blood-fire paths, and all Halloween skins.",
        img: "/images/halloween/arena-grand-pokedrock.png",
    },
    {
        title: "Haunted PokéCenter & Skeleton Carriage",
        category: "world",
        desc: "The main PokéCenter transformed for Halloween with a royal pumpkin carriage pulled by a skeleton horse.",
        img: "/images/halloween/decor-skeleton-carriage.png",
    },
    {
        title: "Cursed Graveyard & Purple Candles",
        category: "world",
        desc: "Explore spiderweb-covered tombstones, skeletal remains, and flickering purple ritual candles.",
        img: "/images/halloween/decor-graveyard.png",
    },
    {
        title: "Haunted Art & Cursed Paintings",
        category: "world",
        desc: "Visit the underground gallery filled with custom headless horseman, blood moon, and wraith paintings.",
        img: "/images/halloween/decor-haunted-paintings.png",
    },
    {
        title: "Royal Pumpkin Carriage",
        category: "world",
        desc: "Climb inside the giant carved pumpkin carriage resting outside the haunted town hall.",
        img: "/images/halloween/decor-pumpkin-carriage.png",
    },
    {
        title: "Cursed PokéCenter by Night",
        category: "world",
        desc: "Skull mounds, gothic candelabras, and ghostly banners welcome trainers to the night shift.",
        img: "/images/halloween/decor-pokecenter-night.png",
    },
    {
        title: "Floating Ghost Lantern Gateways",
        category: "world",
        desc: "Glowing white ghost lanterns hang from the grand pillars beside RIP tombstones and treasure chests.",
        img: "/images/halloween/arena-ghost-lanterns.png",
    },
    {
        title: "Nightfall Over Haunted Spawn",
        category: "world",
        desc: "Candelabras and zombie coffins line the teal prismarine bridge under a full Halloween night sky.",
        img: "/images/halloween/arena-blood-flames.png",
    },
];

const CHAPTER_QUESTS = [
    {
        chapter: "Chapter I — The Haunted Harvest",
        color: "#ff7518",
        quests: [
            { name: "Pumpkin Awakening", goal: "Harvest 10 Pumpkins in Haunted Forest", reward: "30 Candy + Ghost Pet 👻" },
            { name: "Into the Lantern Woods", goal: "Explore the Haunted Forest & meet Lantern Keeper", reward: "25 Halloween Candy 🍬" },
            { name: "Pumpkin Collector", goal: "Harvest 100 Pumpkins", reward: "100 Halloween Candy 🍬" },
            { name: "Pumpkin Carver", goal: "Carve 20 Pumpkins using Shears before harvesting", reward: "75 Halloween Candy 🍬" },
        ],
    },
    {
        chapter: "Chapter II — Spirits & Shadows",
        color: "#a855f7",
        quests: [
            { name: "Spirits of the Five Shrines", goal: "Find & attune all 5 Forgotten Spirits at their Shrines", reward: "75 Halloween Candy 🍬" },
            { name: "Ghost Pokémon Trainer", goal: "Defeat 10 Haunted Minions + Attune 1 Spirit", reward: "50 Candy + Cursed Ball ⚫" },
            { name: "Pokémon Night Patrol", goal: "Defeat 20 Haunted Minions across the woods", reward: "80 Halloween Candy 🍬" },
        ],
    },
    {
        chapter: "Chapter III — The Phantom Trial",
        color: "#ef4444",
        quests: [
            { name: "Guardian of the Pumpkins", goal: "Defeat 3 Pumpkin Guardians + Harvest 30 Pumpkins", reward: "100 Halloween Candy 🍬" },
            { name: "Phantom Wings Trial", goal: "Defeat 10 Guardians + Attune 5 Spirits", reward: "140 Candy + Phantom Wings 🦇" },
            { name: "Seven Haunted Days", goal: "Complete 7 Daily Halloween Quests", reward: "140 Halloween Candy 🍬" },
        ],
    },
    {
        chapter: "Final Chapter — Festival of Spirits",
        color: "#facc15",
        quests: [
            { name: "Festival of Spirits (Grand Finale)", goal: "Complete all Halloween Event Goals", reward: "150 Candy + Pumpkin Parade Companion 🎃" },
        ],
    },
];

const POKEMON_HUNTS = [
    {
        title: "💎 Sableye Exorcist",
        target: "Defeat or Catch 100 Halloween Sableye",
        reward: "300 Halloween Candy 🍬",
        desc: "Hunt the gem-eating shadow Pokémon lurking around cursed shrines and dark caves.",
    },
    {
        title: "👻 Shuppet Collector",
        target: "Defeat or Catch 50 Halloween Shuppet",
        reward: "180 Halloween Candy 🍬",
        desc: "Track down vengeful puppet spirits floating near haunted lampposts at night.",
    },
    {
        title: "🔮 Misdreavus Wisp Hunter",
        target: "Defeat or Catch 50 Halloween Misdreavus",
        reward: "200 Halloween Candy 🍬",
        desc: "Silence the eerie wails of Misdreavus deep inside the Lantern Woods.",
    },
];

const COSMETIC_REWARDS = [
    { icon: "👻", name: "Ghost Pet", type: "Companion Pet", source: "Chapter I: Pumpkin Awakening + Candy Shop", desc: "A cute floating spectral companion that follows you around the server." },
    { icon: "⚫", name: "Cursed Ball", type: "Special Item / Cosmetic", source: "Chapter II: Ghost Pokémon Trainer + Shop", desc: "Dark ritual PokéBall infused with Haunted Forest shadow energy." },
    { icon: "🦇", name: "Phantom Wings", type: "Back Cosmetic", source: "Chapter III: Phantom Wings Trial + Shop", desc: "Spread demonic bat wings cloaked in midnight purple & ember particles." },
    { icon: "🔥", name: "Soulfire Trail", type: "Particle Aura", source: "Lantern Keeper Candy Shop", desc: "Leave footprints of cyan and orange ghostly flames wherever you walk." },
    { icon: "🩸", name: "Blood Moon Aura", type: "Particle Aura", source: "Lantern Keeper Candy Shop", desc: "Surround your trainer with swirling crimson mist and howling bats." },
    { icon: "🎃", name: "Pumpkin Parade Companion", type: "Grand Prize Companion", source: "Final Chapter: Festival of Spirits", desc: "The ultimate limited-edition Halloween parade companion for completing the event!" },
];

export default function HalloweenPage() {
    const [activeFilter, setActiveFilter] = useState<"all" | "skins" | "costumes" | "horror" | "world">("all");
    const [lightboxImg, setLightboxImg] = useState<{ img: string; title: string; desc: string } | null>(null);

    const filteredGallery =
        activeFilter === "all"
            ? [
                  ...GALLERY_ITEMS,
                  ...HALLOWEEN_SKINS.map((s) => ({
                      title: s.name,
                      category: "skins" as const,
                      desc: s.desc,
                      img: s.img,
                  })),
              ]
            : activeFilter === "skins"
            ? HALLOWEEN_SKINS.map((s) => ({
                  title: s.name,
                  category: "skins" as const,
                  desc: s.desc,
                  img: s.img,
              }))
            : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

    const openImage = (img: string, title: string, desc: string) => {
        playNavClickSound();
        setLightboxImg({ img, title, desc });
    };

    return (
        <div className="viewport">
            <SiteHeader />

            <main id="site-main" className="site-main outer" style={{ background: "#f8fafc", margin: 0, padding: 0 }}>
                <div className="inner posts" style={{ width: "100%", maxWidth: "none", padding: 0 }}>
                    <div className="inner" style={{ maxWidth: "1100px", width: "100%", margin: "40px auto 60px", padding: "0 20px" }}>
                {/* HERO BANNER */}
                <div
                    style={{
                        position: "relative",
                        borderRadius: "24px",
                        overflow: "hidden",
                        border: "2px solid rgba(255, 117, 24, 0.55)",
                        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.45), 0 0 40px rgba(255, 102, 0, 0.2)",
                        marginBottom: "50px",
                        background: "#090410",
                    }}
                >
                    <img
                        src="/images/halloween/hero-banner.png"
                        alt="Pokedrock Halloween Update Banner"
                        style={{
                            width: "100%",
                            maxHeight: "480px",
                            objectFit: "cover",
                            display: "block",
                            filter: "brightness(0.92) contrast(1.08)",
                        }}
                    />
                    <div
                        style={{
                            background: "linear-gradient(180deg, rgba(10, 4, 18, 0.4) 0%, rgba(10, 4, 18, 0.96) 100%)",
                            padding: "28px 32px",
                            borderTop: "1px solid rgba(255, 117, 24, 0.35)",
                        }}
                    >
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
                            <span style={{ background: "rgba(255, 102, 0, 0.2)", border: "1px solid #ff7518", color: "#ff9a3c", padding: "5px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase" }}>
                                🎃 Event Update v1.9.1 Live
                            </span>
                            <span style={{ background: "rgba(168, 85, 247, 0.2)", border: "1px solid #a855f7", color: "#d8b4fe", padding: "5px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase" }}>
                                👻 10+ Exclusive Halloween Pokémon Skins
                            </span>
                            <span style={{ background: "rgba(239, 68, 68, 0.2)", border: "1px solid #ef4444", color: "#fca5a5", padding: "5px 14px", borderRadius: "999px", fontSize: "12px", fontWeight: 900, letterSpacing: "1px", textTransform: "uppercase" }}>
                                🧙 Custom Costume Store & Horror Bosses
                            </span>
                        </div>

                        <h1
                            style={{
                                fontSize: "clamp(28px, 4vw, 44px)",
                                fontWeight: 900,
                                color: "#ff7518",
                                textShadow: "0 0 20px rgba(255, 102, 0, 0.5), 0 3px 8px #000",
                                margin: "0 0 12px 0",
                                letterSpacing: "0.5px",
                            }}
                        >
                            🎃 POKEDROCK HALLOWEEN FESTIVAL & SHOWCASE
                        </h1>
                        <p style={{ color: "#e2d9f3", fontSize: "16px", lineHeight: 1.7, maxWidth: "900px", margin: "0 0 22px 0" }}>
                            Step into the <strong>Haunted Forest</strong>, visit the <strong>Custom Costume & Plushie Store</strong>, collect limited-edition{" "}
                            <strong>Halloween Pokémon Skins</strong>, carve glowing pumpkins, attune the <strong>Five Forgotten Shrines</strong>, and unlock rare seasonal cosmetics!
                        </p>

                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                            <a
                                href="#skins-showcase"
                                onMouseEnter={playNavHoverSound}
                                onClick={playNavClickSound}
                                style={{
                                    background: "linear-gradient(135deg, #ff7518 0%, #c2410c 100%)",
                                    color: "#fff",
                                    padding: "12px 24px",
                                    borderRadius: "12px",
                                    fontWeight: 900,
                                    fontSize: "14px",
                                    textDecoration: "none",
                                    boxShadow: "0 0 20px rgba(255, 117, 24, 0.45)",
                                }}
                            >
                                🔥 View Halloween Pokémon Skins
                            </a>
                            <a
                                href="#costume-store"
                                onMouseEnter={playNavHoverSound}
                                onClick={playNavClickSound}
                                style={{
                                    background: "rgba(168, 85, 247, 0.25)",
                                    border: "1px solid #a855f7",
                                    color: "#f3e8ff",
                                    padding: "12px 24px",
                                    borderRadius: "12px",
                                    fontWeight: 800,
                                    fontSize: "14px",
                                    textDecoration: "none",
                                }}
                            >
                                🧙 Costume Store & Horror Entities
                            </a>
                            <a
                                href="#event-wiki"
                                onMouseEnter={playNavHoverSound}
                                onClick={playNavClickSound}
                                style={{
                                    background: "rgba(255, 255, 255, 0.08)",
                                    border: "1px solid rgba(255, 117, 24, 0.4)",
                                    color: "#fed7aa",
                                    padding: "12px 24px",
                                    borderRadius: "12px",
                                    fontWeight: 800,
                                    fontSize: "14px",
                                    textDecoration: "none",
                                }}
                            >
                                📜 Event Quests & Guide (v1.9.1)
                            </a>
                            <a
                                href="#full-gallery"
                                onMouseEnter={playNavHoverSound}
                                onClick={playNavClickSound}
                                style={{
                                    background: "rgba(255, 255, 255, 0.08)",
                                    border: "1px solid rgba(255, 117, 24, 0.4)",
                                    color: "#fed7aa",
                                    padding: "12px 24px",
                                    borderRadius: "12px",
                                    fontWeight: 800,
                                    fontSize: "14px",
                                    textDecoration: "none",
                                }}
                            >
                                📸 All 26 Screenshots
                            </a>
                        </div>
                    </div>
                </div>

                {/* SECTION 1: EXCLUSIVE HALLOWEEN POKEMON SKINS */}
                <section id="skins-showcase" style={{ marginBottom: "70px" }}>
                    <div style={{ textAlign: "center", marginBottom: "36px" }}>
                        <span style={{ color: "#ea580c", fontWeight: 900, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
                            ⚡ LIMITED TIME SEASONAL VARIANTS ⚡
                        </span>
                        <h2 style={{ fontSize: "34px", fontWeight: 900, color: "#ea580c", margin: "8px 0 12px" }}>
                            🦇 Exclusive Halloween Pokémon Skins
                        </h2>
                        <p style={{ color: "#475569", maxWidth: "700px", margin: "0 auto", fontSize: "16px", fontWeight: 500 }}>
                            Check out our custom-textured Halloween Pokémon skins showcased on golden pumpkin pedestals at Spawn! Click any screenshot to inspect in full HD.
                        </p>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                            gap: "24px",
                        }}
                    >
                        {HALLOWEEN_SKINS.map((skin, idx) => (
                            <div
                                key={idx}
                                onClick={() => openImage(skin.img, skin.name, skin.desc)}
                                onMouseEnter={playNavHoverSound}
                                style={{
                                    background: "linear-gradient(180deg, rgba(22, 11, 36, 0.94) 0%, rgba(12, 6, 20, 0.98) 100%)",
                                    border: "1px solid rgba(255, 117, 24, 0.35)",
                                    borderRadius: "18px",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.65)",
                                    transition: "transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease",
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "translateY(-6px)";
                                    e.currentTarget.style.borderColor = "#ff7518";
                                    e.currentTarget.style.boxShadow = "0 16px 36px rgba(0,0,0,0.85), 0 0 22px rgba(255, 117, 24, 0.4)";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "translateY(0)";
                                    e.currentTarget.style.borderColor = "rgba(255, 117, 24, 0.35)";
                                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.65)";
                                }}
                            >
                                <div style={{ position: "relative", height: "200px", overflow: "hidden", background: "#050208" }}>
                                    <img
                                        src={skin.img}
                                        alt={skin.name}
                                        loading="lazy"
                                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                    />
                                    <span
                                        style={{
                                            position: "absolute",
                                            top: "12px",
                                            right: "12px",
                                            background: "rgba(10, 4, 18, 0.88)",
                                            border: `1px solid ${skin.badgeColor}`,
                                            color: skin.badgeColor,
                                            padding: "4px 10px",
                                            borderRadius: "999px",
                                            fontSize: "11px",
                                            fontWeight: 900,
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {skin.rarity}
                                    </span>
                                </div>
                                <div style={{ padding: "18px 20px" }}>
                                    <div style={{ fontSize: "12px", color: "#a855f7", fontWeight: 800, textTransform: "uppercase", marginBottom: "4px" }}>
                                        {skin.pokemon} Skin
                                    </div>
                                    <h3 style={{ fontSize: "19px", fontWeight: 900, color: "#ff9a3c", margin: "0 0 8px 0" }}>
                                        {skin.name}
                                    </h3>
                                    <p style={{ fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.55, margin: 0 }}>
                                        {skin.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 2: COSTUME STORE, HORROR ENTITIES & HAUNTED WORLD HIGHLIGHTS */}
                <section id="costume-store" style={{ marginBottom: "70px" }}>
                    <div style={{ textAlign: "center", marginBottom: "36px" }}>
                        <span style={{ color: "#7e22ce", fontWeight: 900, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
                            🧙 COSTUMES, BOSSES & HAUNTED LOBBY 🧙
                        </span>
                        <h2 style={{ fontSize: "34px", fontWeight: 900, color: "#ea580c", margin: "8px 0 12px" }}>
                            👻 Custom Costume Store & Haunted World
                        </h2>
                        <p style={{ color: "#475569", maxWidth: "720px", margin: "0 auto", fontSize: "16px", fontWeight: 500 }}>
                            Explore the new Halloween Lobby transformation, dress up at the Costume Store, and survive encounters with creepy horror entities!
                        </p>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
                        {/* Feature Row 1: Costume Store */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "28px",
                                alignItems: "center",
                                background: "rgba(20, 10, 32, 0.92)",
                                border: "1px solid rgba(255, 117, 24, 0.35)",
                                borderRadius: "20px",
                                padding: "28px",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.7)",
                            }}
                        >
                            <div
                                onClick={() =>
                                    openImage(
                                        "/images/halloween/costume-store-showcase.png",
                                        "Halloween Costume & Plushie Store",
                                        "Dress up with custom hats, suits, plushies, and spooky accessories!"
                                    )
                                }
                                style={{ cursor: "pointer", borderRadius: "14px", overflow: "hidden", border: "2px solid rgba(255, 117, 24, 0.4)" }}
                            >
                                <img
                                    src="/images/halloween/costume-store-showcase.png"
                                    alt="Costume Store"
                                    loading="lazy"
                                    style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }}
                                />
                            </div>
                            <div>
                                <span style={{ background: "rgba(255, 117, 24, 0.2)", color: "#ff9a3c", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 900 }}>
                                    🧙 NEW IN HALLOWEEN UPDATE
                                </span>
                                <h3 style={{ fontSize: "26px", fontWeight: 900, color: "#ff7518", margin: "12px 0" }}>
                                    Custom Costume Store, Hats & Plushies
                                </h3>
                                <p style={{ color: "#d8b4fe", fontSize: "15px", lineHeight: 1.7, marginBottom: "16px" }}>
                                    Visit the grand Halloween Showroom at Spawn! Equip iconic outfits like the <strong>Witch Hat</strong>,{" "}
                                    <strong>Team Rocket Suit</strong>, <strong>Nurse Joy</strong>, <strong>Vampire Tuxedo</strong>,{" "}
                                    <strong>Dragonite Costume</strong>, glowing <strong>Pumpkin Lanterns</strong>, and collectible Pokémon plushies!
                                </p>
                                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                    <button
                                        onClick={() =>
                                            openImage(
                                                "/images/halloween/costume-player-witch.png",
                                                "Player Wearing Witch Hat & Ghost Pet",
                                                "In-game preview of the Witch Hat, handheld Lantern, and floating Ghost Pet!"
                                            )
                                        }
                                        style={{
                                            background: "rgba(255, 117, 24, 0.2)",
                                            border: "1px solid #ff7518",
                                            color: "#fff",
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            fontWeight: 800,
                                            cursor: "pointer",
                                        }}
                                    >
                                        👀 View Witch Costume Preview
                                    </button>
                                    <button
                                        onClick={() =>
                                            openImage(
                                                "/images/halloween/costume-vampire-suits.png",
                                                "Vampire & Gothic Suits",
                                                "Formal Halloween Vampire outfits inside the haunted showroom."
                                            )
                                        }
                                        style={{
                                            background: "rgba(168, 85, 247, 0.2)",
                                            border: "1px solid #a855f7",
                                            color: "#e9d5ff",
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            fontWeight: 800,
                                            cursor: "pointer",
                                        }}
                                    >
                                        🧛 View Vampire Suits
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Feature Row 2: Horror Entities */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "28px",
                                alignItems: "center",
                                background: "rgba(20, 10, 32, 0.92)",
                                border: "1px solid rgba(239, 68, 68, 0.4)",
                                borderRadius: "20px",
                                padding: "28px",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.7)",
                            }}
                        >
                            <div>
                                <span style={{ background: "rgba(239, 68, 68, 0.2)", color: "#fca5a5", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 900 }}>
                                    👹 SPOOKY HORROR ENTITIES
                                </span>
                                <h3 style={{ fontSize: "26px", fontWeight: 900, color: "#ef4444", margin: "12px 0" }}>
                                    Survive the Pale Stalker & Nightmare Demon
                                </h3>
                                <p style={{ color: "#e2d9f3", fontSize: "15px", lineHeight: 1.7, marginBottom: "16px" }}>
                                    Pokedrock gets truly terrifying after dark! Watch out for towering custom horror entities patrolling the plaza, blood-stained staircases, cursed paintings, and eerie jumpscares when you least expect them.
                                </p>
                                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                    <button
                                        onClick={() =>
                                            openImage(
                                                "/images/halloween/entity-jumpscare-horror.png",
                                                "The Pale Stalker Up Close!",
                                                "A spine-chilling close-up of the Pale Stalker horror entity."
                                            )
                                        }
                                        style={{
                                            background: "rgba(239, 68, 68, 0.25)",
                                            border: "1px solid #ef4444",
                                            color: "#fff",
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            fontWeight: 800,
                                            cursor: "pointer",
                                        }}
                                    >
                                        💀 Trigger Jumpscare Close-Up
                                    </button>
                                </div>
                            </div>
                            <div
                                onClick={() =>
                                    openImage(
                                        "/images/halloween/entity-fiery-demon.png",
                                        "Infernal Nightmare Demon Entity",
                                        "Glowing fiery horror entity guarding the Halloween plaza at night."
                                    )
                                }
                                style={{ cursor: "pointer", borderRadius: "14px", overflow: "hidden", border: "2px solid rgba(239, 68, 68, 0.5)" }}
                            >
                                <img
                                    src="/images/halloween/entity-fiery-demon.png"
                                    alt="Infernal Nightmare Demon"
                                    loading="lazy"
                                    style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }}
                                />
                            </div>
                        </div>

                        {/* Feature Row 3: Haunted PokéCenter, Carriages & Graveyard */}
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                                gap: "28px",
                                alignItems: "center",
                                background: "rgba(20, 10, 32, 0.92)",
                                border: "1px solid rgba(168, 85, 247, 0.4)",
                                borderRadius: "20px",
                                padding: "28px",
                                boxShadow: "0 12px 35px rgba(0,0,0,0.7)",
                            }}
                        >
                            <div
                                onClick={() =>
                                    openImage(
                                        "/images/halloween/decor-skeleton-carriage.png",
                                        "Haunted PokéCenter & Skeleton Horse Carriage",
                                        "Ride the royal pumpkin carriage outside the decorated Halloween PokéCenter!"
                                    )
                                }
                                style={{ cursor: "pointer", borderRadius: "14px", overflow: "hidden", border: "2px solid rgba(168, 85, 247, 0.45)" }}
                            >
                                <img
                                    src="/images/halloween/decor-skeleton-carriage.png"
                                    alt="Haunted PokéCenter & Carriage"
                                    loading="lazy"
                                    style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }}
                                />
                            </div>
                            <div>
                                <span style={{ background: "rgba(168, 85, 247, 0.2)", color: "#d8b4fe", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 900 }}>
                                    🪦 HAUNTED WORLD DECORATIONS
                                </span>
                                <h3 style={{ fontSize: "26px", fontWeight: 900, color: "#c084fc", margin: "12px 0" }}>
                                    Pumpkin Carriages, Graveyards & Cursed Art Gallery
                                </h3>
                                <p style={{ color: "#e2d9f3", fontSize: "15px", lineHeight: 1.7, marginBottom: "16px" }}>
                                    Every corner of Spawn is decked out with custom 3D Halloween blocks: giant <strong>Pumpkin Carriages</strong> pulled by skeleton horses, flickering <strong>Purple Candelabras</strong>, overflowing <strong>Candy Baskets</strong>, spiderweb graveyards, and a secret underground <strong>Haunted Art Gallery</strong>!
                                </p>
                                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                    <button
                                        onClick={() =>
                                            openImage(
                                                "/images/halloween/decor-graveyard.png",
                                                "Cursed Graveyard & Purple Candles",
                                                "Tombstones, skeletons, cobwebs, and ritual candles."
                                            )
                                        }
                                        style={{
                                            background: "rgba(168, 85, 247, 0.2)",
                                            border: "1px solid #a855f7",
                                            color: "#fff",
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            fontWeight: 800,
                                            cursor: "pointer",
                                        }}
                                    >
                                        🪦 View Graveyard
                                    </button>
                                    <button
                                        onClick={() =>
                                            openImage(
                                                "/images/halloween/decor-haunted-paintings.png",
                                                "Underground Haunted Art Gallery",
                                                "Custom spooky paintings and headless horseman portraits."
                                            )
                                        }
                                        style={{
                                            background: "rgba(255, 117, 24, 0.2)",
                                            border: "1px solid #ff7518",
                                            color: "#fed7aa",
                                            padding: "8px 16px",
                                            borderRadius: "10px",
                                            fontWeight: 800,
                                            cursor: "pointer",
                                        }}
                                    >
                                        🖼️ View Haunted Paintings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: OFFICIAL HALLOWEEN EVENT WIKI & QUEST GUIDE (v1.9.1) */}
                <section id="event-wiki" style={{ marginBottom: "70px" }}>
                    <div style={{ textAlign: "center", marginBottom: "36px" }}>
                        <span style={{ color: "#d97706", fontWeight: 900, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
                            📜 OFFICIAL EVENT PLAYER GUIDE (v1.9.1) 📜
                        </span>
                        <h2 style={{ fontSize: "34px", fontWeight: 900, color: "#ea580c", margin: "8px 0 12px" }}>
                            🏮 Haunted Forest Quests, Shrines & Candy Shop
                        </h2>
                        <p style={{ color: "#475569", maxWidth: "760px", margin: "0 auto", fontSize: "16px", fontWeight: 500 }}>
                            Everything you need to know to complete the Pokedrock Halloween Event, earn hundreds of Halloween Candy, and unlock every limited cosmetic!
                        </p>
                    </div>

                    {/* How It Works Cards (Lantern Keeper, Pumpkin Carving, 5 Shrines) */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                            gap: "22px",
                            marginBottom: "40px",
                        }}
                    >
                        <div style={{ background: "rgba(22, 11, 36, 0.94)", border: "1px solid rgba(255, 117, 24, 0.4)", borderRadius: "18px", padding: "24px" }}>
                            <div style={{ fontSize: "32px", marginBottom: "10px" }}>🏮</div>
                            <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#ff9a3c", margin: "0 0 10px" }}>
                                1. Meet the Lantern Keeper
                            </h3>
                            <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                                Travel to the <strong>Haunted Forest</strong> and speak with the <strong>Lantern Keeper NPC</strong>. He gives you your{" "}
                                <strong>Halloween Quest Journal</strong> where you can track Daily Quests, Story Chapters, Extra Hunts, and spend your{" "}
                                <strong>Halloween Candy 🍬</strong>!
                            </p>
                        </div>

                        <div style={{ background: "rgba(22, 11, 36, 0.94)", border: "1px solid rgba(255, 117, 24, 0.4)", borderRadius: "18px", padding: "24px" }}>
                            <div style={{ fontSize: "32px", marginBottom: "10px" }}>🎃</div>
                            <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#ff9a3c", margin: "0 0 10px" }}>
                                2. Grow, Carve & Harvest Pumpkins
                            </h3>
                            <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                                Plant and grow pumpkins inside the Haunted Forest patches. <strong>Pro Tip:</strong> Use <strong>Shears</strong> on uncarved pumpkins{" "}
                                <em>before</em> breaking them so they count toward both your <strong>Pumpkin Carver</strong> and <strong>Harvest</strong> quests!
                            </p>
                        </div>

                        <div style={{ background: "rgba(22, 11, 36, 0.94)", border: "1px solid rgba(168, 85, 247, 0.45)", borderRadius: "18px", padding: "24px" }}>
                            <div style={{ fontSize: "32px", marginBottom: "10px" }}>⛩️</div>
                            <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#d8b4fe", margin: "0 0 10px" }}>
                                3. Attune the 5 Forgotten Shrines
                            </h3>
                            <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: 1.65, margin: 0 }}>
                                Five <strong>Forgotten Spirits</strong> are hidden at ancient shrines across the Haunted Forest. Locate each shrine and interact with the spirit to attune it — required for <strong>Chapter II</strong> and unlocking the <strong>Phantom Wings</strong>!
                            </p>
                        </div>
                    </div>

                    {/* Story Chapters & Quests Table */}
                    <div
                        style={{
                            background: "rgba(16, 8, 28, 0.95)",
                            border: "1px solid rgba(255, 117, 24, 0.4)",
                            borderRadius: "20px",
                            padding: "28px",
                            marginBottom: "40px",
                        }}
                    >
                        <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#ff7518", margin: "0 0 20px" }}>
                            📖 Story Chapters & Quest Rewards
                        </h3>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: "20px" }}>
                            {CHAPTER_QUESTS.map((chap, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        background: "rgba(28, 14, 46, 0.75)",
                                        border: `1px solid ${chap.color}66`,
                                        borderRadius: "14px",
                                        padding: "20px",
                                    }}
                                >
                                    <h4 style={{ fontSize: "17px", fontWeight: 900, color: chap.color, margin: "0 0 14px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                                        {chap.chapter}
                                    </h4>
                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                        {chap.quests.map((q, qIdx) => (
                                            <div
                                                key={qIdx}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    gap: "12px",
                                                    padding: "10px 12px",
                                                    background: "rgba(10, 4, 18, 0.65)",
                                                    borderRadius: "10px",
                                                    border: "1px solid rgba(255,255,255,0.06)",
                                                }}
                                            >
                                                <div>
                                                    <div style={{ fontWeight: 800, color: "#fff", fontSize: "14px" }}>{q.name}</div>
                                                    <div style={{ color: "#94a3b8", fontSize: "12.5px" }}>{q.goal}</div>
                                                </div>
                                                <div
                                                    style={{
                                                        background: "rgba(255, 117, 24, 0.16)",
                                                        border: "1px solid rgba(255, 117, 24, 0.45)",
                                                        color: "#fed7aa",
                                                        padding: "5px 10px",
                                                        borderRadius: "8px",
                                                        fontSize: "12px",
                                                        fontWeight: 800,
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    {q.reward}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Special Halloween Pokémon Hunts */}
                    <div style={{ marginBottom: "40px" }}>
                        <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#7e22ce", margin: "0 0 18px" }}>
                            ⚔️ Extra Halloween Pokémon Hunts
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
                            {POKEMON_HUNTS.map((hunt, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        background: "linear-gradient(145deg, rgba(28, 12, 48, 0.92), rgba(14, 6, 24, 0.96))",
                                        border: "1px solid rgba(168, 85, 247, 0.45)",
                                        borderRadius: "16px",
                                        padding: "22px",
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                                        <h4 style={{ fontSize: "18px", fontWeight: 900, color: "#e9d5ff", margin: 0 }}>{hunt.title}</h4>
                                        <span style={{ background: "rgba(250, 204, 21, 0.18)", border: "1px solid #facc15", color: "#fef08a", padding: "3px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 900 }}>
                                            {hunt.reward}
                                        </span>
                                    </div>
                                    <div style={{ color: "#ff9a3c", fontWeight: 800, fontSize: "13px", marginBottom: "8px" }}>
                                        Objective: {hunt.target}
                                    </div>
                                    <p style={{ color: "#cbd5e1", fontSize: "13.5px", lineHeight: 1.55, margin: 0 }}>{hunt.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Halloween Candy & Cosmetics Shop */}
                    <div>
                        <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#ea580c", margin: "0 0 18px" }}>
                            🍬 Halloween Candy & Exclusive Cosmetics Shop
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "18px" }}>
                            {COSMETIC_REWARDS.map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        background: "rgba(20, 10, 32, 0.94)",
                                        border: "1px solid rgba(255, 117, 24, 0.35)",
                                        borderRadius: "16px",
                                        padding: "20px",
                                        display: "flex",
                                        gap: "16px",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "30px",
                                            background: "rgba(255, 117, 24, 0.15)",
                                            border: "1px solid rgba(255, 117, 24, 0.4)",
                                            borderRadius: "12px",
                                            width: "54px",
                                            height: "54px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexShrink: 0,
                                        }}
                                    >
                                        {item.icon}
                                    </div>
                                    <div>
                                        <span style={{ fontSize: "11px", fontWeight: 900, color: "#a855f7", textTransform: "uppercase" }}>
                                            {item.type}
                                        </span>
                                        <h4 style={{ fontSize: "17px", fontWeight: 900, color: "#ff9a3c", margin: "2px 0 6px" }}>{item.name}</h4>
                                        <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.5, margin: "0 0 6px" }}>{item.desc}</p>
                                        <div style={{ fontSize: "11.5px", color: "#fde047", fontWeight: 700 }}>🔓 {item.source}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECTION 4: FULL INTERACTIVE SCREENSHOT GALLERY */}
                <section id="full-gallery">
                    <div style={{ textAlign: "center", marginBottom: "28px" }}>
                        <span style={{ color: "#ea580c", fontWeight: 900, fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase" }}>
                            📸 IN-GAME SCREENSHOT ARCHIVE 📸
                        </span>
                        <h2 style={{ fontSize: "34px", fontWeight: 900, color: "#ea580c", margin: "8px 0 16px" }}>
                            🎃 Complete Halloween Update Gallery
                        </h2>

                        {/* Filter Tabs */}
                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
                            {[
                                { id: "all", label: "🎃 All Screenshots (26)" },
                                { id: "skins", label: "🐉 Pokémon Skins (10)" },
                                { id: "costumes", label: "🧙 Costume Store (5)" },
                                { id: "horror", label: "👹 Horror Entities (3)" },
                                { id: "world", label: "🪦 Haunted World (8)" },
                            ].map((tab) => {
                                const active = activeFilter === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onMouseEnter={playNavHoverSound}
                                        onClick={() => {
                                            playNavClickSound();
                                            setActiveFilter(tab.id as typeof activeFilter);
                                        }}
                                        style={{
                                            background: active ? "linear-gradient(135deg, #ff7518 0%, #c2410c 100%)" : "rgba(22, 11, 36, 0.9)",
                                            border: active ? "1px solid #ff9a3c" : "1px solid rgba(255, 117, 24, 0.35)",
                                            color: active ? "#fff" : "#fed7aa",
                                            padding: "9px 18px",
                                            borderRadius: "999px",
                                            fontWeight: 800,
                                            fontSize: "13px",
                                            cursor: "pointer",
                                            boxShadow: active ? "0 0 18px rgba(255, 117, 24, 0.45)" : "none",
                                        }}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
                            gap: "20px",
                        }}
                    >
                        {filteredGallery.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => openImage(item.img, item.title, item.desc)}
                                onMouseEnter={playNavHoverSound}
                                style={{
                                    background: "rgba(18, 9, 30, 0.94)",
                                    border: "1px solid rgba(255, 117, 24, 0.3)",
                                    borderRadius: "14px",
                                    overflow: "hidden",
                                    cursor: "pointer",
                                    transition: "transform 0.2s ease, border-color 0.2s ease",
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = "scale(1.02)";
                                    e.currentTarget.style.borderColor = "#ff7518";
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = "scale(1)";
                                    e.currentTarget.style.borderColor = "rgba(255, 117, 24, 0.3)";
                                }}
                            >
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{ width: "100%", height: "185px", objectFit: "cover", display: "block" }}
                                />
                                <div style={{ padding: "14px 16px" }}>
                                    <h4 style={{ fontSize: "15.5px", fontWeight: 900, color: "#ff9a3c", margin: "0 0 6px" }}>{item.title}</h4>
                                    <p style={{ fontSize: "12.5px", color: "#cbd5e1", margin: 0, lineHeight: 1.45 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
                    </div>
                </div>
            </main>

            {/* LIGHTBOX MODAL */}
            {lightboxImg && (
                <div
                    onClick={() => setLightboxImg(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(5, 2, 10, 0.92)",
                        zIndex: 99999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            maxWidth: "1050px",
                            width: "100%",
                            background: "#120820",
                            border: "2px solid #ff7518",
                            borderRadius: "20px",
                            overflow: "hidden",
                            boxShadow: "0 0 50px rgba(255, 102, 0, 0.45)",
                        }}
                    >
                        <div style={{ position: "relative" }}>
                            <img
                                src={lightboxImg.img}
                                alt={lightboxImg.title}
                                style={{ width: "100%", maxHeight: "75vh", objectFit: "contain", background: "#050208", display: "block" }}
                            />
                            <button
                                onClick={() => setLightboxImg(null)}
                                style={{
                                    position: "absolute",
                                    top: "14px",
                                    right: "14px",
                                    background: "rgba(10, 4, 18, 0.88)",
                                    border: "1px solid #ff7518",
                                    color: "#fff",
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    fontSize: "18px",
                                    fontWeight: 900,
                                    cursor: "pointer",
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                            <div>
                                <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#ff7518", margin: "0 0 4px" }}>{lightboxImg.title}</h3>
                                <p style={{ fontSize: "14px", color: "#cbd5e1", margin: 0 }}>{lightboxImg.desc}</p>
                            </div>
                            <button
                                onClick={() => setLightboxImg(null)}
                                style={{
                                    background: "#ff7518",
                                    border: "none",
                                    color: "#fff",
                                    padding: "8px 18px",
                                    borderRadius: "10px",
                                    fontWeight: 800,
                                    cursor: "pointer",
                                }}
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}

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
        </div>
    );
}
