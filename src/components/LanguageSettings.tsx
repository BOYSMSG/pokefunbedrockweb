"use client";

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

export default function LanguageSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, isAuto, setIsAuto } = useLanguage();

  const toggleOpen = () => setIsOpen(!isOpen);

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
  ];

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          background: '#1a1f2e',
          border: '1px solid #2a2f3e',
          borderRadius: '12px',
          padding: '15px',
          width: '220px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          <h4 style={{ margin: 0, fontSize: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px', color: '#a3a3a3' }}>
            Language Settings
          </h4>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.95rem' }}>
            <input 
              type="checkbox" 
              checked={isAuto} 
              onChange={(e) => setIsAuto(e.target.checked)} 
              style={{ accentColor: 'var(--ghost-accent-color)' }}
            />
            Auto (Browser Default)
          </label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '5px' }}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setIsAuto(false);
                  setLanguage(lang.code);
                }}
                style={{
                  background: !isAuto && language === lang.code ? 'rgba(255, 26, 117, 0.2)' : 'transparent',
                  color: !isAuto && language === lang.code ? 'var(--ghost-accent-color)' : '#d1d5db',
                  border: !isAuto && language === lang.code ? '1px solid var(--ghost-accent-color)' : '1px solid transparent',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: '0.2s',
                  fontSize: '0.9rem'
                }}
                onMouseEnter={(e) => {
                  if (!(!isAuto && language === lang.code)) {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!(!isAuto && language === lang.code)) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={toggleOpen}
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          background: '#10b981',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <i className="fa-solid fa-gear" style={{ animation: isOpen ? 'none' : 'spin 4s linear infinite' }}></i>
      </button>

      <style>{`
        @keyframes spin { 
          100% { transform: rotate(360deg); } 
        }
      `}</style>
    </div>
  );
}
