"use client";

import React, { useState, useEffect } from "react";

const newFeatures = [
    {
      title: "Real Gyms & Badges",
      desc: "Step up to the ultimate challenge! Test your skills against real Gym Leaders spread across the world. Build the perfect team, exploit type advantages, and claim victory to collect exclusive Gym Badges that prove your strength to everyone on the server.",
      image: "/images/features/realgysmandbages1.png"
    },
    {
      title: "Fun & Casino Games",
      desc: "Need a break from training? Head over to our vibrant Casino to try your luck with exciting mini-games! Bet your Pokécoins, interact with our interactive NPC dealers, and win massive payouts or rare prizes if you hit the jackpot.",
      image: "/images/features/funandcasiongames.png"
    },
    {
      title: "Server Crates",
      desc: "Unlock incredible rewards with our custom server crates! Participate in events, vote for the server, or conquer dungeons to earn Crate Keys. Spin to win legendary items, rare shiny Pokémon, and exclusive cosmetics that will make you stand out.",
      image: "/images/features/crates.png"
    },
    {
      title: "Leaderboards",
      desc: "Do you have what it takes to be the very best? Compete with other players across various categories and show off your skills. Climb to the top of the global leaderboards to earn special titles, respect from the community, and exclusive seasonal rewards!",
      image: "/images/features/leaderboards.png"
    },
    {
      title: "Server Menu & Essentials",
      desc: "Access the intuitive server menu for essential features! Manage your Warps, Claims, Bounties, Jobs, and Bank. Plus, easily check your Stats, redeem Codes, run Commands, visit the Pokéfun Shop, and manage your Homes.",
      images: [
        "/images/features/servermenuessntialsandotherfeturs1.png", 
        "/images/features/servermenuessntialsandotherfeturs2.png"
      ]
    },
    {
      title: "Special Machines",
      desc: "Take your gameplay to the next level by utilizing our variety of special custom machines. Craft powerful unique items, automate your resource gathering, and train your Pokémon's abilities faster than ever before with state-of-the-art tech!",
      image: "/images/features/specialmachines.png"
    },
    {
      title: "Trading & TM Machine",
      desc: "Engage in a robust player economy! Trade Pokémon safely with other trainers using our secure trade menus to complete your Pokédex. Additionally, use specialized TM Machines to teach your Pokémon powerful new moves to optimize them for competitive battles.",
      image: "/images/features/tradingandtmmachine.png"
    },
    {
      title: "Custom Bagpacks",
      desc: "Running out of inventory space? We've got you covered! Expand your carrying capacity instantly with our functional, custom backpacks. Equip them to your chestplate slot to carry all your adventure essentials while still gaining armor protection.",
      image: "/images/features/bagpacks.png"
    },
    {
      title: "The Pokémon Center & Village",
      desc: "The Pokémon center will be the most important structure of your adventure. It appear in the plains and the desert, there you will find everything you need to improve your gaming experience.",
      image: "/images/features/thepokecenterandvillage.png",
    },
    {
      title: "Battle System Improvements",
      desc: "The battle system has many improvements, it is the same as the original games. It has mega evolutions, Dynamax and its own mechanic called \"boost\" that consumes experience to raise all stats by 3 turns!",
      image: "/images/features/thebattlesystem.jpg",
    },
    {
      title: "Start a Battle Anywhere",
      desc: "You can start a battle throwing your Pokémon (crouching and opening your menu) to a wild Pokémon or approaching a trainer.",
      images: ["/images/features/youcanstartbattle1.gif", "/images/features/youcanstartbattle2.gif"],
    },
    {
      title: "Basic Interactions",
      desc: "You can use your Pokédex to test your Pokémon's mount and evolutions. Some Pokémon evolve by item interaction or trading. ALL evolution methods are in the Pokédex, so check it regularly.",
      image: "/images/features/basicintraction.png",
    },
    {
      title: "Grazing Functions",
      desc: "The PC now has a new button that lets you send your Pokémon out to roam around. With this function, your Pokémon will heal a little HP, increase their friendship, and attack nearby monsters! Look for the new \"pasture\" PC box and choose an action between returning it to the party or the PC.",
      image: "/images/features/pcfeture.gif",
    },
    {
      title: "Pokéradar & Biome Detector",
      desc: "The Pokéradar is a new feature that lets you search for Pokémon near you. In addition, the Pokédex now includes a biome detector to help you find specific Pokémon.",
      image: "/images/features/pokeradar.png",
    },
    {
      title: "Berries & Apricorns",
      desc: "Berry plants will appear in Pokévillages. You can plant new berries with their seeds, there are some recipes you can make with them! Apricorn plants will appear over the world. With its fruit you can create some Pokéballs!",
      image: "/images/features/berrys.png",
    },
    {
      title: "Mining Ores",
      desc: "When mining you will find some ores that will contain evo stones, mega stones, key stones or wishing stars. It will help you progress in your adventure and get improvements.",
      image: "/images/features/ores.jpeg",
    },
    {
      title: "Bike and Ride Pager",
      desc: "Now the Bike and the Ride pager can be obtained in the Game corner. It will serve as transport to reach more difficult or high places, also to explore more easily.",
      image: "/images/features/bikeandridepagger.jpeg",
    },
    {
      title: "Backpacks & Painting",
      desc: "Now you can use backpacks! They function as a Bundle, but you can wear them in the chestplate slot and it give you armor. You can also paint your Pokédex and Backpack!",
      image: "/images/features/paintcolor.jpg",
    },
    {
      title: "GachaMon Machine",
      desc: "GachaMon machine allowing players to obtain items, Mega Stones, and even random Pokémon through capsule-based rewards with different rarity tiers.",
      image: "/images/features/gachamon.png",
    },
    {
      title: "Advanced Breeding System",
      desc: "A new breeding system has been created. With the new Day Care machine, you can store up to 6 Pokémon to breed. You can also add up to 2 other people to bring their Pokémon and create the perfect Pokémon. (To open the menu, you must have the Pokedex in your hand and press the action button.)",
      image: "/images/features/daycarebreeding.jpg",
    },
    {
      title: "More Equipables",
      desc: "Eight new equippable items have been added to Pokémon, along with the Shiny Charm (which increases the chance of encountering Shiny Pokémon both in the Day Care and in the wild when held in your inventory). These items will help train Pokémon's EVs more efficiently (in the Day Care, they will pass on a specific IV from the parent holding the item, and the Everstone will pass on the Pokémon's Nature). The Everstone will prevent the Pokémon from evolving, which is for those who like their Pokémon just as it is.",
      image: "/images/features/moreecupmanets.png",
    },
    {
      title: "Kitchen & Food",
      desc: "🍳 Kitchen & Food\n🎨 Edible dyes in 16 colors\n(Colors and designs adapted for best viewing with SERP Reworked)",
      image: "/images/features/kichenandfood.png",
    },
    {
      title: "Epic Builds",
      desc: "Open showcase for more builds viewers",
      image: "/images/features/epicbuidls.png"
    },
    {
      title: "More Coming Soon!",
      desc: "Many other features coming soon and under development: Raids, Dungeons, NPCs, Level Cap, and many more coming soon!",
      image: ""
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
                    <a href="/team">Team</a>
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
                            <li className="nav-team"><a href="/team">Team</a></li>
                        </ul>
                    </div>
                </nav>
            </header>
            
            <div className="p-body-inner" style={{ minHeight: '200px' }}>
                <div id="logo" style={{ display: 'flex', justifyContent: 'center', width: '100%', overflow: 'visible' }}>
                    <a href="/" style={{ display: 'inline-block' }}>
                        <img className="animate__infinite animate__slower animate__animated animate__pulse" src="/images/mainimage/title.png" style={{ width: "1125px", maxWidth: "none", height: "auto", borderRadius: "12px", display: "block" }} alt="Pokefun Logo" />
                    </a>
                </div>
            </div>
        </div>

        <main>
            <main id="site-main" className="site-main outer">
                <div className="inner posts">
                    <div className="inner" style={{ marginTop: '40px', marginBottom: '60px' }}>
                        <div className="section-title"
                            style={{ textAlign: 'center', marginBottom: '60px', fontSize: '36px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', color: '#0ea5e9' }}>
                            Server Features
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', margin: '0 auto', maxWidth: '1000px', padding: '0 20px' }}>
                           {newFeatures.map((feature, i) => {
                               // Alternate layout: Even = Text Left, Image Right. Odd = Image Left, Text Right.
                               const isImageLeft = i % 2 !== 0;
                               
                               return (
                                   <div key={i} style={{ 
                                       display: 'flex', 
                                       flexDirection: isImageLeft ? 'row-reverse' : 'row', 
                                       flexWrap: 'wrap',
                                       alignItems: 'center',
                                       gap: '40px'
                                   }}>
                                       <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                                           <h3 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px', color: '#0ea5e9' }}>
                                               {feature.title}
                                           </h3>
                                           <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555', whiteSpace: 'pre-wrap' }}>
                                               {feature.desc}
                                           </p>
                                       </div>
                                       
                                       {(feature.image || feature.images) && (
                                           <div style={{ flex: '1 1 45%', minWidth: '300px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.15)', transition: 'transform 0.3s' }} className="hover:scale-105">
                                               {feature.images ? (
                                                   <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}>
                                                       {feature.images.map((img, idx) => (
                                                           <img key={idx} src={img} style={{ width: 'calc(50% - 5px)', height: 'auto', display: 'block', objectFit: 'contain', borderRadius: '8px' }} alt={`${feature.title} ${idx+1}`} />
                                                       ))}
                                                   </div>
                                               ) : (
                                                  <img src={feature.image} style={{ width: '100%', height: '300px', display: 'block', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))' }} alt={feature.title} />
                                               )}
                                           </div>
                                        )}
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
    </div>
  );
}
