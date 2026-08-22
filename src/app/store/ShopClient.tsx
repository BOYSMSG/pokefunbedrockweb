"use client";

import React, { useState, useEffect } from 'react';
import SiteHeader from "@/components/SiteHeader";
import SaleBanner from '@/components/SaleBanner';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function ShopClient({ initialCategories }: { initialCategories: any[] }) {
  // Categories are already processed server-side into virtual subcategories (Pokecoins, Ranks, etc.)
  // No client-side transformation needed — prevents hydration mismatch.
  const [categories, setCategories] = useState<any[]>(initialCategories);
  const [activeCategoryId, setActiveCategoryId] = useState<number | string>('home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("gh-head-open");
    } else {
      document.body.classList.remove("gh-head-open");
    }
  }, [menuOpen]);
  const [selectedPkg, setSelectedPkg] = useState<any | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [showServerSelectModal, setShowServerSelectModal] = useState<boolean>(false);

  useEffect(() => {
    const selected = localStorage.getItem('pokefun_server_selected');
    if (!selected) {
      setShowServerSelectModal(true);
    }
  }, []);
  const [loadingPkg, setLoadingPkg] = useState<number | null>(null);
  const [cart, setCart] = useState<{pkg: any, qty: number}[]>([]);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [cartAnim, setCartAnim] = useState<boolean>(false);
  
  // Currency State
  const [currency, setCurrency] = useState<string>('USD');
  const [isFetchingCurrency, setIsFetchingCurrency] = useState<boolean>(false);
  const [giftcardNumber, setGiftcardNumber] = useState('');
  const [recentPayments, setRecentPayments] = useState<any[]>([]);
  const [topCustomer, setTopCustomer] = useState<any>(null);
  
  // Minecraft Username State
  const [mcUsername, setMcUsername] = useState<string>('');
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [tempUsername, setTempUsername] = useState<string>('');
  
  const [storeConfig, setStoreConfig] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/store-config')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.config) {
          setStoreConfig(data.config);
        }
      })
      .catch(() => {});

    // Load saved username and currency
    const savedName = localStorage.getItem('mcUsername');
    if (savedName) setMcUsername(savedName);

    const savedCart = localStorage.getItem('pokefun_shop_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {}
    }

    const savedCurrency = localStorage.getItem('pokefun_shop_currency');
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
    
    // Fetch real recent payments
    fetch('/api/tebex/recent-payments')
      .then(res => res.json())
      .then(data => {
        if (data && data.recent) {
          setRecentPayments(data.recent);
          setTopCustomer(data.top);
        } else if (Array.isArray(data)) {
          setRecentPayments(data.slice(0, 5));
          if (data.length > 0) {
            setTopCustomer({ player: data[0].player });
          }
        }
      })
      .catch(err => console.error("Failed to load real payments:", err));

    const params = new URLSearchParams(window.location.search);
    if (params.get('success')) {
      alert("Payment initiated or completed! Thank you for your support.");
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get('cancel')) {
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (params.get('cancel')) {
      alert("Payment was cancelled.");
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Auto-open package if ID is in URL
    const pkgId = params.get('package');
    if (pkgId && initialCategories) {
      for (const cat of initialCategories) {
        if (cat.packages) {
          const pkg = cat.packages.find((p: any) => p.id.toString() === pkgId);
          if (pkg) {
            setActiveCategoryId(cat.id);
            setSelectedPkg(pkg);
            setSelectedImage(pkg.image || null);
            setCopied(false);
            break;
          }
        }
      }
    }
  }, []);

  const handleShare = (pkgId: string) => {
    const url = window.location.origin + '/store?package=' + pkgId;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (cart.length >= 0) {
      localStorage.setItem('pokefun_shop_cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Fetch new prices when currency changes
  useEffect(() => {
    const fetchCurrencyPrices = async () => {
      setIsFetchingCurrency(true);
      try {
        const res = await fetch(`/api/tebex/categories?currency=${currency}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.data) {
            // Apply same virtual category splitting as server-side processing
            const bedrockCats = data.data.filter((c: any) => c?.name?.toLowerCase().includes('bedrock'));
            let allPackages: any[] = [];
            bedrockCats.forEach((c: any) => {
              if (c.packages && Array.isArray(c.packages)) {
                allPackages = allPackages.concat(c.packages);
              }
            });

            if (allPackages.length === 0) {
              setCategories(bedrockCats);
            } else {
              const virtualCats = [
                { id: 'v-ranks',     name: 'Ranks & Perks',    packages: [] as any[] },
                { id: 'v-pokecoins', name: 'Pokecoins',        packages: [] as any[] },
                { id: 'v-kits',      name: 'Kits & Bundles',   packages: [] as any[] },
                { id: 'v-keys',      name: 'Crate Keys',       packages: [] as any[] },
                { id: 'v-stones',    name: 'Protection Stones',packages: [] as any[] },
                { id: 'v-others',    name: 'Other Items',      packages: [] as any[] },
              ];
              allPackages.forEach((pkg: any) => {
                const name = pkg.name.toLowerCase();
                if (name.includes('coin') || name.includes('pokecoin') || /^[\d,]+/.test(name.trim())) {
                  virtualCats[1].packages.push(pkg);
                } else if (name.includes('rank') || name.includes('vip') || name.includes('mvp') || name.includes('elite') || name.includes('pro')) {
                  virtualCats[0].packages.push(pkg);
                } else if (name.includes('kit') || name.includes('bundle')) {
                  virtualCats[2].packages.push(pkg);
                } else if (name.includes('key') || name.includes('crate')) {
                  virtualCats[3].packages.push(pkg);
                } else if (name.includes('stone') || name.includes('protection')) {
                  virtualCats[4].packages.push(pkg);
                } else {
                  virtualCats[5].packages.push(pkg);
                }
              });
              setCategories(virtualCats.filter(vc => vc.packages.length > 0));
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch currency prices", err);
      }
      setIsFetchingCurrency(false);
    };

    // If it's not the initial render load (which is USD) or we have a saved currency
    fetchCurrencyPrices();
  }, [currency]);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurr = e.target.value;
    setCurrency(newCurr);
    localStorage.setItem('shopCurrency', newCurr);
  };

  const handleSaveUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempUsername.trim().length > 2) {
      setMcUsername(tempUsername.trim());
      localStorage.setItem('mcUsername', tempUsername.trim());
      setShowLoginModal(false);
    }
  };

  const handleAddToCart = (pkg: any) => {
    setCart(prev => {
      const exists = prev.find(item => item.pkg.id === pkg.id);
      if (exists) {
        if (pkg.disable_quantity) {
          alert("You can only buy one of this item.");
          return prev;
        }
        return prev.map(item => item.pkg.id === pkg.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { pkg, qty: 1 }];
    });
    setCartAnim(true);
    setTimeout(() => setCartAnim(false), 300);
    setShowCartModal(true);
    setSelectedPkg(null);
  };

  const handleCheckout = async () => {
    if (!mcUsername) {
      setShowLoginModal(true);
      return;
    }
    if (cart.length === 0) return;
    
    setLoadingPkg(-1);
    try {
      const packages = cart.map(item => ({ id: item.pkg.id, quantity: item.qty }));
      const res = await fetch('/api/tebex/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packages, mcUsername, returnUrl: window.location.origin })
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Failed to initiate checkout: " + (data.error || "Unknown error"));
        setLoadingPkg(null);
      }
    } catch (err) {
      alert("Something went wrong!");
      setLoadingPkg(null);
    }
  };

  const handleCheckGiftcard = () => {
    alert("Giftcards can be applied on the final checkout page!");
  };

  const activeCategory = categories.find(c => c.id === activeCategoryId);

  const featuredPackage = React.useMemo(() => {
    if (!categories || categories.length === 0) return null;
    if (storeConfig && storeConfig.featuredPackageId) {
      for (const cat of categories) {
        if (cat.packages) {
          const found = cat.packages.find((p: any) => p.id.toString() === storeConfig.featuredPackageId);
          if (found) return found;
        }
      }
    }
    // Fallback to first
    return categories[0].packages?.[0] || null;
  }, [categories, storeConfig]);

  return (
    <div className="viewport">
        <SiteHeader />

            <main id="site-main" className="site-main outer" style={{ background: '#f8fafc', margin: 0, padding: 0 }}>
               <div className="inner posts" style={{ width: '100%', maxWidth: 'none', padding: 0 }}>
                  <div className="cobblemon-shop-wrapper" style={{ marginTop: '0px', padding: '40px 20px', margin: '0 auto', maxWidth: '1200px' }}>
                    
                    {/* Global Style Override for Shop Page */}
                    <style dangerouslySetInnerHTML={{__html: `
                      /* Keep global header and footer visible, just hide the default sidebar */
                      .desktop-sidebar-container { display: none !important; } 
                      
                      .cobblemon-shop-wrapper {
                        --shop-bg: #f8fafc;
                        --shop-box: #ffffff;
                        --shop-border: #e2e8f0;
                        --shop-text: #333333;
                        --shop-text-muted: #64748b;
                        --accent-color: #0ea5e9;
                        --accent-hover: #0284c7;
                        
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        color: var(--shop-text);
                        background: var(--shop-bg);
                      }
                      
                      .cobblemon-shop-wrapper h1, .cobblemon-shop-wrapper h2, .cobblemon-shop-wrapper h3 {
                        color: #1e293b;
                      }

                      .cobblemon-shop-wrapper .category-pill {
                        background: var(--shop-box);
                        border: 1px solid var(--shop-border);
                        color: var(--shop-text);
                      }

                      .cobblemon-shop-wrapper .category-pill.active {
                        background: var(--accent-color);
                        color: #fff;
                        border-color: var(--accent-color);
                      }

                      .cobblemon-shop-wrapper .package-card {
                        background: var(--shop-box);
                        border: 1px solid var(--shop-border);
                        border-radius: 12px;
                        overflow: hidden;
                        transition: transform 0.2s, box-shadow 0.2s;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                      }

                      .cobblemon-shop-wrapper .package-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                        border-color: #cbd5e1;
                      }
                    `}} />

                {/* TOP NAV & STATUS */}
                <div className="shop-top-bar" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '40px', padding: '10px 0' }}>
                  <div className="top-right-actions">
          
          <div style={{ position: 'relative' }}>
            <div className={`cart-icon-wrapper ${cartAnim ? 'cart-bounce' : ''}`} onClick={() => setShowCartModal(!showCartModal)} style={{ cursor: 'pointer', marginRight: '15px', display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.15)', padding: '10px 20px', borderRadius: '8px', color: '#ffffff' }}>
              <i className="fa-solid fa-cart-shopping" style={{ fontSize: '1.4rem', color: '#ffffff' }}></i>
              {cart.length > 0 && (
                <span style={{ position: 'absolute', top: '-5px', right: '5px', background: 'var(--accent-color)', color: '#000', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }}>
                  {cart.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
              <span style={{ marginLeft: '12px', fontWeight: '900', color: '#ffffff', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Basket</span>
            </div>

            {/* Cart Dropdown */}
            {showCartModal && (
              <div className="cart-dropdown" style={{
                position: 'absolute', top: '120%', right: '15px', width: '350px', background: 'var(--shop-box)', 
                border: '1px solid var(--shop-border)', borderRadius: '12px', padding: '15px', zIndex: 1000,
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--shop-border)', paddingBottom: '10px', marginBottom: '10px' }}>
                  <h3 style={{ margin: 0 }}>Your Basket</h3>
                  <button onClick={() => setShowCartModal(false)} style={{ background: 'none', border: 'none', color: 'var(--shop-text)', cursor: 'pointer' }}><i className="fa-solid fa-xmark"></i></button>
                </div>
                {cart.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#888', padding: '20px 0' }}>Your basket is empty.</p>
                ) : (
                  <>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {cart.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '15px', alignItems: 'center' }}>
                          <img src={item.pkg.image || "https://i.imgur.com/Kz8V5wN.png"} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{item.pkg.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--accent-color)' }}>{item.qty}x {item.pkg.currency} {item.pkg.total_price}</div>
                          </div>
                          <button style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }} onClick={() => setCart(prev => prev.filter(i => i.pkg.id !== item.pkg.id))}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div style={{ borderTop: '1px solid var(--shop-border)', paddingTop: '10px', marginTop: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '15px' }}>
                        <span>Total:</span>
                        <span style={{ color: 'var(--accent-color)' }}>{cart[0]?.pkg.currency} {cart.reduce((sum, item) => sum + (item.pkg.total_price * item.qty), 0).toFixed(2)}</span>
                      </div>
                      
                      <div style={{ marginBottom: '10px' }}>
                        <input 
                          type="text" 
                          value={mcUsername}
                          onChange={e => {
                            setMcUsername(e.target.value);
                            localStorage.setItem('mcUsername', e.target.value);
                          }}
                          placeholder="Minecraft Username"
                          className="clean-input"
                          style={{ padding: '10px', width: '100%', fontSize: '0.9rem' }}
                        />
                      </div>
                      <button className="btn-cyan w-full" onClick={handleCheckout} disabled={loadingPkg === -1 || !mcUsername} style={{ padding: '10px' }}>
                        {loadingPkg === -1 ? <i className="fa-solid fa-spinner fa-spin"></i> : "Secure Checkout"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="currency-selector-wrapper">
            {isFetchingCurrency ? <i className="fa-solid fa-spinner fa-spin currency-spinner"></i> : <i className="fa-solid fa-earth-americas"></i>}
            <select className="currency-select" value={currency} onChange={handleCurrencyChange} disabled={isFetchingCurrency}>
              <option value="USD">USD ($)</option>
              <option value="AUD">AUD ($)</option>
              <option value="BRL">BRL (R$)</option>
              <option value="CAD">CAD ($)</option>
              <option value="DKK">DKK (kr)</option>
              <option value="EUR">EUR (€)</option>
              <option value="NOK">NOK (kr)</option>
              <option value="NZD">NZD ($)</option>
              <option value="PLN">PLN (zł)</option>
              <option value="GBP">GBP (£)</option>
              <option value="SEK">SEK (kr)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
          
          <div className="user-status-box" onClick={() => setShowLoginModal(true)}>
             {mcUsername ? (
               <div className="user-logged-in">
                 <div className="user-text-info">
                   <div className="user-label">Logged in as</div>
                   <div className="user-name">{mcUsername}</div>
                 </div>
                 <div className="mc-avatar-container">
                   <img src={`https://mc-heads.net/avatar/${mcUsername}`} alt={mcUsername} className="mc-face" />
                 </div>
               </div>
             ) : (
               <div className="user-logged-in">
                 <div className="user-text-info">
                   <div className="user-label">Guest</div>
                   <div className="user-name highlight-text">Click to login</div>
                 </div>
                 <div className="mc-avatar-container">
                   <img src="https://mc-heads.net/avatar/steve" alt="Guest" className="mc-face" />
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>

      <div className="shop-layout">
        
        {/* Sidebar */}
        <div className="shop-sidebar">
          {/* Categories Module */}
          <div className="sidebar-box module-box">
            <ul className="category-list">
              <li>
                 <a href="/" className="cat-btn back-home-btn" style={{ fontWeight: 'bold' }}>
                    <i className="fa-solid fa-earth-americas"></i> Back to Main Website
                 </a>
              </li>
              <li>
                <button 
                  onClick={() => setActiveCategoryId('home')}
                  className={activeCategoryId === 'home' ? 'cat-btn active' : 'cat-btn'}
                >
                  <i className="fa-solid fa-house"></i> Store Home
                </button>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    onClick={() => setActiveCategoryId(category.id)}
                    className={activeCategoryId === category.id ? 'cat-btn active' : 'cat-btn'}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Package Module */}
          <div className="sidebar-box module-box featured-box">
            <h3 className="module-title">Featured Package</h3>
            {featuredPackage ? (
              <div className="featured-item">
                <img 
                  src={featuredPackage.image || "https://i.imgur.com/Kz8V5wN.png"} 
                  alt={featuredPackage.name} 
                  className="featured-img" 
                  style={{ maxHeight: '150px', objectFit: 'contain' }}
                />
                <div className="featured-price-sub">{featuredPackage.name}</div>
                <div className="featured-price">
                  {featuredPackage.discount > 0 && (
                    <span style={{ textDecoration: 'line-through', color: '#a3a3a3', fontSize: '0.85em', marginRight: '8px' }}>
                      {(parseFloat(featuredPackage.base_price) + parseFloat(featuredPackage.discount)).toFixed(2)} {featuredPackage.currency}
                    </span>
                  )}
                  <span style={{ color: featuredPackage.discount > 0 ? '#e74c3c' : 'white', fontWeight: 'bold' }}>
                    {featuredPackage.total_price} {featuredPackage.currency}
                  </span>
                </div>
                <button className="btn-cyan w-full" onClick={() => handleAddToCart(featuredPackage)}>Add to Basket</button>
              </div>
            ) : (
              <p className="module-empty-text">Loading...</p>
            )}
          </div>



        </div>

        {/* Main Content */}
        <div className="shop-main">
          {activeCategoryId === 'home' ? (
            <div className="category-container store-home-container" style={{ padding: '40px', background: '#111', border: '1px solid #222', borderRadius: '12px', color: '#ccc' }}>
              <h2 style={{ color: 'white', fontSize: '3rem', marginBottom: '20px', textAlign: 'center', fontWeight: '800' }}>WELCOME TO THE OFFICIAL <br/><span style={{color: '#4bc8c8'}}>POKEDROCK STORE</span></h2>
              
              {storeConfig?.saleActive && (
                <SaleBanner 
                  endDate={storeConfig.saleEndDate}
                  title={storeConfig.saleTitle}
                  subtitle={storeConfig.saleSubtitle}
                />
              )}

              <div style={{ fontSize: '1.1rem', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
                <p><strong>POKEDROCK SMP</strong> is a free-to-play Minecraft Bedrock / MCPE Pokémon server powered by the SERP Pokedrock Addon.</p>
                <p>Purchase items from our official store to enhance your Pokémon adventure, unlock exclusive perks, get powerful rewards, customize your experience, and support the continued development of Pokedrock SMP!</p>
                <p>To begin, simply select a category from the sidebar and choose what you want to purchase.</p>

                <div style={{ background: 'rgba(254, 199, 113, 0.15)', borderLeft: '5px solid #fec771', padding: '20px', margin: '30px 0', color: '#fec771', fontSize: '1.2rem', borderRadius: '4px' }}>
                  ⚠️ <strong>IMPORTANT:</strong> Please make sure you enter your correct <strong>Minecraft Bedrock Gamertag / Xbox Gamertag</strong> when checking out.<br/>
                  Your purchase will be delivered to the player name entered during checkout.
                </div>

                {featuredPackage && (
                  <>
                    <h3 style={{ color: 'white', fontSize: '2.2rem', marginTop: '40px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>🔥 FEATURED ITEM 🔥</h3>
                    <div className="package-grid" style={{ padding: 0, border: 'none', background: 'transparent', marginBottom: '30px' }}>
                      <div className="package-card" style={{ maxWidth: '400px', margin: '0 auto', gridColumn: '1 / -1' }}>
                        <div className="pkg-image-wrapper" onClick={() => { setSelectedPkg(featuredPackage); setSelectedImage(featuredPackage.image); setCopied(false); }}>
                          <img src={featuredPackage.image || "https://i.imgur.com/Kz8V5wN.png"} alt={featuredPackage.name} className="pkg-image" />
                        </div>
                        <div className="pkg-details">
                          <h3 className="pkg-name" onClick={() => { setSelectedPkg(featuredPackage); setSelectedImage(featuredPackage.image); setCopied(false); }}>{featuredPackage.name}</h3>
                          <div className="pkg-price">
                            {featuredPackage.discount > 0 && (
                              <span style={{ textDecoration: 'line-through', color: '#a3a3a3', fontSize: '0.85em', marginRight: '8px' }}>
                                {(parseFloat(featuredPackage.base_price) + parseFloat(featuredPackage.discount)).toFixed(2)} {featuredPackage.currency}
                              </span>
                            )}
                            <span style={{ color: featuredPackage.discount > 0 ? '#e74c3c' : 'white', fontWeight: 'bold' }}>
                              {featuredPackage.total_price} {featuredPackage.currency}
                            </span>
                          </div>
                        </div>
                        <div className="pkg-actions">
                          <button className="btn-buy" onClick={() => handleAddToCart(featuredPackage)} disabled={loadingPkg === featuredPackage.id}>
                            {loadingPkg === featuredPackage.id ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add to Basket"}
                          </button>
                          <button className="btn-info" onClick={() => { setSelectedPkg(featuredPackage); setSelectedImage(featuredPackage.image); setCopied(false); }}>
                            <i className="fa-solid fa-circle-info"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <h3 style={{ color: 'white', fontSize: '2.2rem', marginTop: '40px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>⭐ POKEDROCK SMP FEATURES ⭐</h3>
                
                <h4 style={{ color: '#4bc8c8', marginTop: '20px' }}>🐾 Pokémon & Exclusive Pokémon</h4>
                <p>Discover, collect, train, and build your ultimate Pokémon team. Get access to special and exclusive Pokémon available through the server and store.</p>
                
                <h4 style={{ color: '#4bc8c8', marginTop: '20px' }}>💎 Ranks & Premium Perks</h4>
                <p>Unlock exclusive ranks with special perks, commands, rewards, kits, and other benefits designed to make your Pokedrock journey even better.</p>
                
                <h4 style={{ color: '#4bc8c8', marginTop: '20px' }}>🎁 Kits & Exclusive Rewards</h4>
                <p>Get access to special kits and rewards depending on your rank or purchase. Enjoy valuable items and bonuses to help you progress faster.</p>
                
                <h4 style={{ color: '#4bc8c8', marginTop: '20px' }}>🪙 PokéCoins & In-Game Items</h4>
                <p>Purchase PokéCoins and other useful in-game items to enhance your gameplay and enjoy everything Pokedrock has to offer.</p>
                
                <h4 style={{ color: '#4bc8c8', marginTop: '20px' }}>🏪 Trading & Economy</h4>
                <p>Trade with other players, buy and sell items, build your wealth, and become one of the richest Trainers on Pokedrock SMP.</p>
                
                <h4 style={{ color: '#4bc8c8', marginTop: '20px' }}>🛡️ Land Protection</h4>
                <p>Protect your builds, bases, Pokémon, and valuable resources using our land protection systems.</p>
                
                <h4 style={{ color: '#4bc8c8', marginTop: '20px' }}>⚔️ Pokémon Adventure</h4>
                <p>Explore the world, catch Pokémon, battle other Trainers, build your team, and experience the unique Pokémon gameplay of Pokedrock SMP.</p>
                
                <h4 style={{ color: '#4bc8c8', marginTop: '20px' }}>✨ More Features Coming Soon</h4>
                <p>We are constantly working on new systems, Pokémon content, rewards, cosmetics, events, and exciting features to make Pokedrock SMP even better!</p>

                <h3 style={{ color: 'white', fontSize: '2.2rem', marginTop: '40px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>💰 SUPPORT POKEDROCK SMP</h3>
                <p>Every purchase you make helps support Pokedrock SMP and contributes towards:</p>
                <ul>
                  <li>🖥️ Server hosting and infrastructure</li>
                  <li>⚙️ Development and new features</li>
                  <li>🐛 Bug fixes and optimization</li>
                  <li>🎉 Events and community activities</li>
                  <li>🆕 New Pokémon and content</li>
                  <li>❤️ Keeping the server online and improving it for everyone</li>
                </ul>
                <p>Thank you for supporting Pokedrock SMP!<br/>Your support means a lot to us and helps us continue building a better Pokémon experience for the community.</p>

                <h3 style={{ color: 'white', fontSize: '2.2rem', marginTop: '40px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>🆘 SUPPORT</h3>
                <p>Having an issue with your purchase?<br/>If your package has not been delivered after 20 minutes, please contact our staff through Discord and provide proof of purchase.<br/>For payment issues, missing purchases, or other store-related problems, please open a support ticket on our Discord server.</p>
                
                <p><strong>💬 Join Our Discord</strong><br/>Need help, want to report an issue, or simply want to meet the community?<br/>Join our official Discord server and talk with the Pokedrock SMP community and staff.<br/>
                Discord: <a href="https://discord.com/invite/NtE8QBkmwR" target="_blank" style={{color: '#4bc8c8'}}>https://discord.com/invite/NtE8QBkmwR</a></p>

                <p><strong>📧 CONTACT</strong><br/>For general questions and support:<br/>Email: <a href="mailto:contact@pokefun.in" style={{color: '#4bc8c8'}}>contact@pokefun.in</a><br/>For purchase-related issues, we recommend opening a ticket on our Discord server so our staff can assist you faster.</p>

                <h3 style={{ color: 'white', fontSize: '2.2rem', marginTop: '40px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>⚠️ REFUND POLICY</h3>
                <p>All purchases are final and non-refundable.<br/>By completing a purchase on the Pokedrock SMP Store, you agree to our store terms and refund policy.<br/>Any attempt to perform an unauthorized chargeback or payment reversal may result in a permanent ban from Pokedrock SMP, our associated services, and/or our stores.<br/>Payments are processed and secured through Tebex, a trusted platform for gaming communities and online transactions.</p>

                <h3 style={{ color: 'white', fontSize: '2.2rem', marginTop: '40px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>⏱️ PURCHASE DELIVERY</h3>
                <p>Most purchases are delivered automatically to your Minecraft Bedrock account.<br/>Please allow up to 1–20 minutes for your purchase to appear in-game.<br/>If you have not received your purchase after this period:</p>
                <ul>
                  <li>Make sure you entered the correct Minecraft Bedrock Gamertag.</li>
                  <li>Restart Minecraft or reconnect to the server.</li>
                  <li>Check that you are connected to Pokedrock SMP.</li>
                </ul>
                <p>If the purchase is still missing, open a support ticket on our Discord.<br/>Provide your Tebex purchase receipt/order information so our staff can investigate.</p>

                <h3 style={{ color: 'white', fontSize: '2.2rem', marginTop: '40px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>🚫 BANS & PURCHASED ITEMS</h3>
                <p>If you are banned from Pokedrock SMP for violating our server rules, you may lose access to your purchased perks and items for the duration of your ban.<br/>A server ban does not automatically qualify you for a refund.<br/>All purchases remain subject to our server rules and store policies.</p>

                <h3 style={{ color: 'white', fontSize: '2.2rem', marginTop: '40px', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>❤️ THANK YOU FOR SUPPORTING POKEDROCK</h3>
                <p>Whether you purchase a rank, Pokémon, kit, PokéCoins, or another item from our store, you are directly supporting the future of Pokedrock SMP.<br/>Thank you for being part of our community and helping us make Pokedrock SMP bigger, better, and more exciting! 🎉</p>
                
                <h4 style={{ color: '#4bc8c8', marginTop: '20px', textAlign: 'center', fontSize: '1.5rem' }}>🐾 CATCH • TRAIN • BATTLE • BECOME THE BEST</h4>
                <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Welcome to Pokedrock SMP — your Pokémon adventure starts here!</p>
              </div>
            </div>
          ) : (
            <div className="category-container">
              {activeCategory ? (
                <>
                  <div className="category-header">
                    <h2>{activeCategory.name}</h2>
                    {activeCategory.description && (
                      <div className="cat-desc" dangerouslySetInnerHTML={{ __html: activeCategory.description }} />
                    )}
                  </div>
                  
                  <div className="package-grid">
                    {activeCategory.packages.map((pkg: any) => (
                      <div key={pkg.id} className="package-card">
                        <div className="pkg-image-wrapper" onClick={() => { setSelectedPkg(pkg); setSelectedImage(pkg.image); setCopied(false); }}>
                          {pkg.image ? (
                            <img src={pkg.image} alt={pkg.name} className="pkg-image" />
                          ) : (
                            <i className="fa-solid fa-box-open placeholder-icon"></i>
                          )}
                        </div>
                        
                        <div className="pkg-details">
                          <h3 className="pkg-name" onClick={() => { setSelectedPkg(pkg); setSelectedImage(pkg.image); setCopied(false); }}>{pkg.name}</h3>
                          <div className="pkg-price">
                            {pkg.discount > 0 && (
                              <span style={{ textDecoration: 'line-through', color: '#a3a3a3', fontSize: '0.85em', marginRight: '8px' }}>
                                {(parseFloat(pkg.base_price) + parseFloat(pkg.discount)).toFixed(2)} {pkg.currency}
                              </span>
                            )}
                            <span style={{ color: pkg.discount > 0 ? '#e74c3c' : 'white', fontWeight: 'bold' }}>
                              {pkg.total_price} {pkg.currency}
                            </span>
                          </div>
                        </div>
                        
                        <div className="pkg-actions">
                          <button 
                            className="btn-buy"
                            onClick={() => handleAddToCart(pkg)}
                            disabled={loadingPkg === pkg.id}
                          >
                            {loadingPkg === pkg.id ? <i className="fa-solid fa-spinner fa-spin"></i> : "Add to Basket"}
                          </button>
                          <button className="btn-info" onClick={() => { setSelectedPkg(pkg); setSelectedImage(pkg.image); setCopied(false); }}>
                            <i className="fa-solid fa-circle-info"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {activeCategory.packages.length === 0 && (
                    <div className="empty-category">
                      <i className="fa-solid fa-box-open empty-icon"></i>
                      <p>No packages available in this category.</p>
                    </div>
                  )}
                </>
              ) : (
                 <div className="empty-category">
                   <i className="fa-solid fa-box-open empty-icon"></i>
                   <h3>No category selected</h3>
                   <p>Please select a category from the sidebar to view items.</p>
                 </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* MC Username Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="clean-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Minecraft Account</h2>
              <button className="btn-close" onClick={() => setShowLoginModal(false)}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="mc-steve-icon">
                <img src="https://mc-heads.net/avatar/steve/100" alt="Minecraft" />
              </div>
              <p>Please enter your exact Minecraft username to receive your items in-game.</p>
              <form onSubmit={handleSaveUsername} className="mc-form">
                <input 
                  type="text" 
                  value={tempUsername}
                  onChange={e => setTempUsername(e.target.value)}
                  placeholder="Your Username"
                  className="clean-input"
                  autoFocus
                />
                <button type="submit" className="btn-submit">Continue</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Server Selection Modal */}
      {showServerSelectModal && (
        <div className="modal-overlay" style={{ zIndex: 9999 }}>
          <div className="clean-modal" style={{ maxWidth: '650px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '15px', color: '#fec771' }}>Select Your Server</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: 'var(--shop-text-muted)' }}>
              Please select which Minecraft server you want to purchase items for.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div 
                style={{ 
                  background: 'rgba(0,0,0,0.2)', border: '2px solid var(--shop-border)', padding: '30px', 
                  borderRadius: '12px', cursor: 'pointer', transition: '0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}
                onClick={() => { window.location.href = 'https://store.pokefun.in'; }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#10b981'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--shop-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <img src="/assets/images/cobblemon_logo.png" alt="Cobblemon" style={{ height: '80px', marginBottom: '15px', objectFit: 'contain' }} onError={(e) => e.currentTarget.style.display = 'none'} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Java Edition</h3>
                <p style={{ color: 'var(--shop-text-muted)', fontSize: '1rem', margin: 0 }}>Pokefun Java (Cobblemon)</p>
                <button className="btn-buy" style={{ marginTop: '20px', width: '100%', fontSize: '1rem' }}>Go to Java Store</button>
              </div>

              <div 
                style={{ 
                  background: 'rgba(0,0,0,0.2)', border: '2px solid var(--shop-border)', padding: '30px', 
                  borderRadius: '12px', cursor: 'pointer', transition: '0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}
                onClick={() => { localStorage.setItem('pokefun_server_selected', 'bedrock'); setShowServerSelectModal(false); }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#4bc8c8'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--shop-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <img src="/assets/images/logo.png" alt="Pokedrock" style={{ height: '80px', marginBottom: '15px', objectFit: 'contain' }} />
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Bedrock / MCPE</h3>
                <p style={{ color: 'var(--shop-text-muted)', fontSize: '1rem', margin: 0 }}>Pokedrock SMP Bedrock</p>
                <button className="btn-buy" style={{ marginTop: '20px', width: '100%', fontSize: '1rem', background: '#4bc8c8' }}>Stay on Bedrock</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Package Detail Modal */}
      {selectedPkg && (
        <div className="modal-overlay" onClick={() => setSelectedPkg(null)}>
          <div className="clean-modal pkg-detail" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedPkg.name}</h2>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button className="btn-share" onClick={() => handleShare(selectedPkg.id)}>
                  <i className="fa-solid fa-share-nodes"></i> {copied ? 'Copied!' : 'Share'}
                </button>
                <button className="btn-close" onClick={() => setSelectedPkg(null)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
            <div className="modal-body" style={{textAlign: 'left', display: 'flex', flexDirection: 'column', maxHeight: '70vh'}}>
               <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
                 {selectedImage && (
                   <div className="modal-image-center">
                     <img src={selectedImage} alt={selectedPkg.name} />
                   </div>
                 )}
                 {selectedPkg.media && selectedPkg.media.length > 1 && (
                   <div className="modal-gallery-thumbs">
                     {selectedPkg.media.map((m: any) => (
                       <img 
                         key={m.url} 
                         src={m.url} 
                         alt="Thumbnail" 
                         onClick={() => setSelectedImage(m.url)}
                         className={selectedImage === m.url ? 'active' : ''}
                       />
                     ))}
                   </div>
                 )}
                 <div className="modal-price-large">{selectedPkg.total_price} {selectedPkg.currency}</div>
                 
                 <div 
                   className="modal-desc html-desc" 
                   dangerouslySetInnerHTML={{ __html: (() => {
                     if (!selectedPkg.description) return '';
                     let html = selectedPkg.description;
                     html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                     html = html.replace(/<p>##\s*(.*?)<\/p>/g, '<h2>$1</h2>');
                     html = html.replace(/##\s*(.*?)(<br|<\/p>|\n)/g, '<h2>$1</h2>$2');
                     html = html.replace(/<p>\*\s*(.*?)<\/p>/g, '<li>$1</li>');
                     html = html.replace(/<p>---<\/p>/g, '<hr />');
                     return html;
                   })() }} 
                 />
               </div>
               
               <div style={{ paddingTop: '15px', borderTop: '1px solid var(--shop-border)', marginTop: '10px' }}>
                 <button 
                    className="btn-submit"
                    style={{width: '100%', padding: '15px', fontSize: '1.1rem'}}
                    onClick={() => handleAddToCart(selectedPkg)}
                    disabled={loadingPkg === selectedPkg.id}
                  >
                    {loadingPkg === selectedPkg.id ? "Processing..." : "Add to Basket"}
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Clean Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        /* CSS Variables for Light/Dark Theme */
        :root {
          --shop-bg: #e0e3e5;
          --shop-box: #e0e3e5;
          --shop-text: #111;
          --shop-text-muted: #444;
          --shop-border: #ccc;
        }

        /* Default to dark mode if .dark class is on parent, or media query */
        @media (prefers-color-scheme: dark) {
          :root {
            --shop-bg: transparent;
            --shop-box: #111;
            --shop-text: #fff;
            --shop-text-muted: #ccc;
            --shop-border: #222;
          }
        }
        
        /* Optional global override if Tailwind .dark is used */
        .dark {
            --shop-bg: transparent;
            --shop-box: #111;
            --shop-text: #fff;
            --shop-text-muted: #ccc;
            --shop-border: #222;
        }

        .cobblemon-shop-wrapper {
          position: relative;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 20px 0;
          font-family: 'Righteous', 'Karla', sans-serif;
        }
        
        .shop-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: transparent;
          padding: 10px 0;
          margin-bottom: 40px;
        }
        
        .top-right-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .giftcard-btn {
          background: var(--shop-box);
          color: var(--shop-text);
          border: 2px solid var(--shop-border);
          padding: 10px 20px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .giftcard-btn:hover { border-color: #4bc8c8; color: #4bc8c8; }
        
        .currency-selector-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--shop-box);
          border: 2px solid var(--shop-border);
          padding: 10px 15px;
          border-radius: 8px;
          color: var(--shop-text);
        }
        
        .currency-select {
          background: transparent;
          border: none;
          font-weight: bold;
          color: var(--shop-text);
          font-size: 1.1rem;
          outline: none;
          cursor: pointer;
        }
        .currency-select option { background: var(--shop-box); color: var(--shop-text); }
        
        .user-status-box {
          background: var(--shop-box);
          border: 2px solid var(--shop-border);
          border-radius: 8px;
          padding: 8px 15px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .user-status-box:hover {
          border-color: #4bc8c8;
        }
        
        .user-logged-in { display: flex; align-items: center; gap: 15px; }
        .user-text-info { text-align: right; }
        .user-label { font-size: 0.9rem; color: var(--shop-text-muted); font-weight: 600; text-transform: uppercase; }
        .user-name { font-weight: bold; color: var(--shop-text); font-size: 1.2rem; }
        .highlight-text { color: #4bc8c8; }
        
        .mc-avatar-container { width: 45px; height: 45px; border-radius: 6px; overflow: hidden; }
        .mc-face { width: 100%; height: 100%; object-fit: cover; }

        .shop-layout { display: flex; gap: 30px; align-items: flex-start; }
        
        .shop-sidebar { width: 320px; flex-shrink: 0; display: flex; flex-direction: column; gap: 20px; }
        
        .module-box {
          background: var(--shop-box);
          padding: 25px;
          border-radius: 12px;
          border: 2px solid var(--shop-border);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }
        
        .module-title { font-size: 1.4rem; color: var(--shop-text); margin-bottom: 20px; font-weight: 800; text-align: center; }
        .module-empty-text { font-size: 1.1rem; color: var(--shop-text-muted); margin: 0; }
        
        .category-list { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px; margin: 0;}
        
        .cat-btn {
          width: 100%; text-align: left; background: transparent; border: none;
          padding: 15px 20px; color: var(--shop-text); font-size: 1.8rem; font-weight: bold;
          cursor: pointer; transition: all 0.2s ease; border-radius: 8px;
          font-family: inherit;
          display: flex; align-items: center; gap: 12px; text-decoration: none;
        }
        .cat-btn:hover { background: rgba(0,0,0,0.1); color: #4bc8c8; }
        @media (prefers-color-scheme: dark) {
          .cat-btn:hover { background: #222; color: #4bc8c8; }
        }
        .cat-btn.active { background: rgba(0,0,0,0.1); color: #4bc8c8; font-weight: 900; border-left: 4px solid #4bc8c8; }
        @media (prefers-color-scheme: dark) {
           .cat-btn.active { background: #222; }
        }

        .back-home-btn { color: #4bc8c8; }
        
        /* Featured */
        .featured-item { text-align: center; }
        .featured-img { width: 100%; max-width: 180px; margin: 0 auto 15px; display: block; }
        .featured-price { font-size: 1.5rem; font-weight: bold; color: var(--shop-text); }
        .featured-price-sub { font-size: 1.1rem; color: var(--shop-text-muted); margin-bottom: 15px; }
        
        /* Form Inputs */
        .input-dark {
          width: 100%; background: transparent; border: 2px solid var(--shop-border); color: var(--shop-text);
          padding: 15px; font-size: 1.1rem; text-align: center; margin-bottom: 15px; border-radius: 8px;
        }
        .input-dark:focus { outline: none; border-color: #4bc8c8; }
        
        /* Buttons */
        .w-full { width: 100%; }
        .btn-cyan {
          background: #4bc8c8; color: black; border: none; padding: 15px; border-radius: 8px;
          font-weight: bold; cursor: pointer; transition: 0.2s; font-size: 1.2rem;
        }
        .btn-cyan:hover { background: #3ab0b0; }
        .btn-cyan:active { transform: scale(0.95); }
        
        .btn-grey {
          background: #ccc; color: black; border: none; padding: 15px; border-radius: 8px;
          font-weight: bold; cursor: pointer; transition: 0.2s; font-size: 1.2rem;
        }
        .btn-grey:hover { background: #bbb; }
        .btn-grey:active { transform: scale(0.95); }
        
        /* Recent Payments */
        .recent-payment-item { display: flex; gap: 15px; align-items: center; margin-bottom: 15px; }
        .recent-payment-item:last-child { margin-bottom: 0; }
        .rp-avatar { width: 40px; height: 40px; border-radius: 8px; }
        .rp-info { text-align: left; }
        .rp-name { color: var(--shop-text); font-size: 1.1rem; font-weight: bold; }
        .rp-desc { color: var(--shop-text-muted); font-size: 0.9rem; }
        .rp-date { color: #888; font-size: 0.85rem; }

        .shop-main { flex-grow: 1; min-width: 0; }
        
        .category-container {
          background: transparent;
        }
        
        .category-header {
          padding: 40px;
          border-bottom: 2px solid var(--shop-border);
          text-align: left;
          background: var(--shop-box);
          border-radius: 12px 12px 0 0;
          border: 2px solid var(--shop-border);
          border-bottom: none;
        }
        .category-header h2 { color: var(--shop-text); font-size: 3rem; margin: 0 0 10px 0; font-weight: 800; }
        .cat-desc { color: var(--shop-text-muted); font-size: 1.3rem; line-height: 1.6; max-width: 1000px; margin: 0;}
        .cat-desc img { max-width: 100%; border-radius: 8px; margin-top: 15px; }
        
        /* Grid Layout for Packages */
        .package-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
          padding: 40px;
          background: var(--shop-box);
          border-radius: 0 0 12px 12px;
          border: 2px solid var(--shop-border);
          border-top: none;
        }
        
        .package-card {
          background: var(--shop-bg);
          border: 2px solid var(--shop-border);
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
        }
        .package-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.8);
          border-color: #4bc8c8;
        }
        
        .pkg-image-wrapper {
          height: 280px;
          background: var(--shop-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px;
          cursor: pointer;
          border-bottom: 2px solid var(--shop-border);
        }
        .pkg-image { max-width: 100%; max-height: 100%; object-fit: contain; transition: transform 0.3s; transform: scale(0.75); }
        .package-card:hover .pkg-image { transform: scale(0.85); }
        .placeholder-icon { font-size: 6rem; color: #333; }
        
        .pkg-details { padding: 25px; text-align: center; flex-grow: 1; cursor: pointer; }
        .pkg-name { color: var(--shop-text); font-size: 1.8rem; margin: 0 0 10px 0; font-weight: bold; }
        .pkg-price { color: #4bc8c8; font-size: 1.6rem; font-weight: 800; margin-bottom: 15px; }
        
        .pkg-actions {
          padding: 0 25px 25px 25px;
          display: flex;
          gap: 15px;
          background: var(--shop-bg);
        }
        
        .btn-buy {
          flex-grow: 1;
          background: #4bc8c8; color: black; border: none; border-radius: 8px;
          padding: 15px; font-weight: bold; font-size: 1.3rem; cursor: pointer; transition: all 0.2s;
        }
        .btn-buy:hover:not(:disabled) { background: #3ab0b0; }
        .btn-buy:active:not(:disabled) { transform: scale(0.92); }
        .btn-buy:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .btn-info {
          width: 55px; background: #222; color: #aaa; border: 2px solid #333;
          border-radius: 8px; cursor: pointer; transition: all 0.2s; font-size: 1.3rem;
        }
        .btn-info:hover { background: #333; color: #fff; border-color: #555; }
        .btn-info:active { transform: scale(0.92); }
        
        .empty-category { text-align: center; padding: 60px 20px; color: #9ca3af; }
        .empty-icon { font-size: 3rem; margin-bottom: 15px; color: #cbd5e1;}
          max-height: 250px;
          border-radius: 8px;
        }
        .modal-gallery-thumbs {
          display: flex;
          gap: 10px;
          overflow-x: auto;
          margin-bottom: 20px;
          justify-content: center;
        }
        .modal-gallery-thumbs img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 6px;
          cursor: pointer;
          border: 2px solid transparent;
          opacity: 0.6;
          transition: 0.2s;
        }
        .modal-gallery-thumbs img:hover {
          opacity: 1;
        }
        .modal-gallery-thumbs img.active {
          border-color: var(--accent-color);
          opacity: 1;
        }
        .modal-price-large {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--accent-color);
          text-align: center;
          margin-bottom: 20px;
        }
        .html-desc {
          background: rgba(0, 0, 0, 0.2);
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          word-wrap: break-word;
        }
        .html-desc h2 {
          color: var(--text-color);
          font-size: 1.3rem;
          margin: 15px 0 10px;
        }
        .html-desc strong {
          color: var(--text-color);
        }
        .btn-share {
          background: rgba(255,255,255,0.1);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: bold;
          transition: 0.2s;
        }
        .btn-share:hover {
          background: rgba(255,255,255,0.2);
        }
        .clean-input {
          width: 100%; padding: 18px; border: 2px solid var(--shop-border); border-radius: 8px; background: var(--shop-input-bg);
          font-size: 1.4rem; color: var(--shop-text); margin-bottom: 20px; font-weight: bold;
          text-align: center; transition: border-color 0.2s;
        }
        .clean-input:focus { outline: none; border-color: #10b981; }
        
        .btn-submit {
          width: 100%; background: #10b981; color: white; border: none;
          padding: 18px; border-radius: 8px; font-weight: 900; font-size: 1.4rem;
          cursor: pointer; transition: background 0.2s;
        }
        .btn-submit:hover:not(:disabled) { background: #059669; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed;}
        
        .modal-image-center { height: 250px; display: flex; align-items: center; justify-content: center; margin-bottom: 30px; background: var(--shop-input-bg); border-radius: 12px; border: 2px solid var(--shop-border);}
        .modal-image-center img { max-height: 90%; max-width: 90%; object-fit: contain; transform: scale(1.3); }
        
        .modal-price-large { font-size: 2.5rem; font-weight: 900; color: #10b981; text-align: center; margin-bottom: 20px; }
        
        .html-desc { color: var(--shop-text); font-size: 1.3rem; line-height: 1.6; max-height: 400px; overflow-y: auto; padding-right: 15px; text-align: left;}
        .html-desc p { margin-bottom: 15px; }
        .html-desc ul { margin-left: 20px; margin-bottom: 15px; }
        .html-desc h1, .html-desc h2, .html-desc h3 { margin: 20px 0 10px 0; font-weight: 800; color: var(--shop-text); }
        .html-desc h2 { font-size: 1.8rem; }
        .html-desc h3 { font-size: 1.5rem; }
        .html-desc strong { color: #0284c7; font-weight: bold; }
        .html-desc a { color: #10b981; text-decoration: underline; }

        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .clean-modal {
          background: var(--shop-box);
          color: var(--shop-text);
          padding: 25px;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          border: 2px solid var(--shop-border);
        }
        
        .clean-modal.pkg-detail {
          max-width: 700px;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--shop-border);
        }

        .modal-header h2 {
          margin: 0;
          font-size: 1.8rem;
          color: var(--shop-text);
        }

        .btn-close {
          background: transparent;
          color: var(--shop-text-muted);
          border: none;
          font-size: 1.8rem;
          cursor: pointer;
          transition: color 0.2s;
        }
        
        .btn-close:hover {
          color: #e74c3c;
        }

        @keyframes cartBounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        .cart-bounce {
          animation: cartBounce 0.3s ease-in-out;
        }

        @media (max-width: 800px) {
          .shop-layout { flex-direction: column; }
          .shop-sidebar { width: 100%; }
        }
      `}} />
      {/* Removed the old Cart Modal screen because it's now a dropdown */}

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
    </div>
  );
}
