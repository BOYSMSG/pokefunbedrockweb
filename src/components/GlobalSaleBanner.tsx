"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function GlobalSaleBanner() {
  const [storeConfig, setStoreConfig] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState('...');

  useEffect(() => {
    fetch('/api/store-config')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.config?.saleActive) {
          setStoreConfig(data.config);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!storeConfig) return;
    const targetDate = new Date(storeConfig.saleEndDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft("0d 0h 0m 0s");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [storeConfig]);

  if (!storeConfig) return null;

  return (
    <a href="https://store.pokefun.in" style={{ 
      display: "block", 
      background: "linear-gradient(90deg, #f59e0b, #ef4444)", 
      color: "white", 
      textAlign: "center", 
      padding: "10px", 
      textDecoration: "none", 
      fontWeight: "bold",
      fontSize: "1rem",
      zIndex: 9999,
      position: "relative"
    }}>
      <span style={{ marginRight: '10px' }}><i className="fa-solid fa-gift"></i></span>
      {storeConfig.saleTitle} - <span style={{ background: 'rgba(0,0,0,0.2)', padding: '2px 6px', borderRadius: '4px', margin: '0 5px' }}>{storeConfig.discountPercentage}% OFF</span> 
      <span style={{ marginLeft: '10px', fontSize: '0.9rem', opacity: 0.9 }}><i className="fa-regular fa-clock"></i> Ends in {timeLeft}</span>
    </a>
  );
}
