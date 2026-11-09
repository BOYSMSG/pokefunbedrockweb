"use client";

import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/profile");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fa-solid fa-circle-check" style={{ fontSize: '3rem', color: '#10B981', marginBottom: '16px' }}></i>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Already logged in!</h2>
          <p style={{ color: '#94A3B8' }}>Redirecting to your profile...</p>
        </div>
      </div>
    );
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/admin"
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #111827 0%, #000000 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '50px',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '450px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center'
      }}>
        
        <div style={{ marginBottom: '30px' }}>
          <i className="fa-solid fa-gamepad" style={{ fontSize: '3.5rem', color: '#10b981', marginBottom: '15px' }}></i>
          <h1 style={{ color: 'white', margin: 0, fontSize: '2rem', fontWeight: 800 }}>Pokefun Login</h1>
          <p style={{ color: 'gray', marginTop: '10px' }}>Join the community to unlock all features.</p>
        </div>

        {!isAdmin ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button 
              onClick={() => signIn('discord', { callbackUrl: '/' })} 
              style={{
                background: '#5865F2', color: 'white', padding: '15px', borderRadius: '12px',
                fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                transition: '0.2s', boxShadow: '0 4px 15px rgba(88, 101, 242, 0.4)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
            >
              <i className="fa-brands fa-discord"></i> Login with Discord
            </button>

            <button 
              onClick={() => signIn('google', { callbackUrl: '/' })} 
              style={{
                background: '#db4437', color: 'white', padding: '15px', borderRadius: '12px',
                fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                transition: '0.2s', boxShadow: '0 4px 15px rgba(219, 68, 55, 0.4)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
            >
              <i className="fa-brands fa-google"></i> Login with Google
            </button>

            <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
              <span style={{ color: 'gray', fontSize: '0.9rem' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
            </div>

            <button 
              onClick={() => setIsAdmin(true)} 
              style={{
                background: 'transparent', color: 'gray', padding: '12px', borderRadius: '12px',
                fontSize: '1rem', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer',
                transition: '0.2s'
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = 'white'; e.currentTarget.style.border = '1px solid gray'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'gray'; e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)'; }}
            >
              <i className="fa-solid fa-shield-halved"></i> Admin Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
            
            <div>
              <label style={{ display: 'block', color: 'gray', marginBottom: '8px', fontSize: '0.9rem' }}>Admin Email</label>
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', background: 'rgba(0,0,0,0.5)', color: 'white', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: 'gray', marginBottom: '8px', fontSize: '0.9rem' }}>Password</label>
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '15px', borderRadius: '10px', border: 'none', background: 'rgba(0,0,0,0.5)', color: 'white', outline: 'none' }}
              />
            </div>

            <button 
              type="submit" 
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '15px', borderRadius: '10px',
                fontSize: '1.1rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '10px',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
              }}
            >
              Authenticate
            </button>

            <button 
              type="button"
              onClick={() => setIsAdmin(false)} 
              style={{
                background: 'transparent', color: 'gray', padding: '10px', borderRadius: '10px',
                fontSize: '0.9rem', border: 'none', cursor: 'pointer', textDecoration: 'underline'
              }}
            >
              Cancel
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
