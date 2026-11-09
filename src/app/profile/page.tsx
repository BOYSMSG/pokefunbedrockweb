"use client";

import React, { useState, useEffect } from 'react';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editConnections, setEditConnections] = useState({
    minecraft: '', discord: '', youtube: '', instagram: '', google: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (session?.user?.email) {
      fetch(`/api/profile?email=${encodeURIComponent(session.user.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setProfile(data.user);
            setPosts(data.posts || []);
            setEditName(data.user.name || '');
            setEditUsername(data.user.username || '');
            setEditBio(data.user.bio || '');
            setEditConnections({
              minecraft: data.user.connections?.minecraft || '',
              discord: data.user.connections?.discord || '',
              youtube: data.user.connections?.youtube || '',
              instagram: data.user.connections?.instagram || '',
              google: data.user.connections?.google || ''
            });
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [session, status, router]);

  const handleSaveProfile = async () => {
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: editName, 
          username: editUsername, 
          bio: editBio,
          connections: editConnections
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setProfile(updated);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to update profile");
      }
    } catch (e) {
      alert("An error occurred while saving profile.");
    }
  };

  if (loading || status === 'loading') {
    return (
      <div style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#94a3b8',
        gap: '16px'
      }}>
        <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: '2.5rem', color: '#06b6d4' }}></i>
        <p style={{ fontSize: '1.1rem', margin: 0 }}>Loading Trainer Profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '30px 40px', borderRadius: '16px', textAlign: 'center' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ color: '#ef4444', fontSize: '2.5rem', marginBottom: '12px' }}></i>
          <h2 style={{ color: '#0B1524', margin: '0 0 10px 0' }}>Unable to load profile</h2>
          <p style={{ color: '#94a3b8', margin: '0 0 20px 0' }}>Please make sure you are signed in or try refreshing the page.</p>
          <Link href="/login" style={{ background: '#06b6d4', color: '#060b13', padding: '10px 24px', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#F8FBFF', minHeight: '100vh', width: '100%', color: '#0B1524' }}>
      <div className="inner" style={{ paddingTop: '110px', paddingBottom: '80px', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
        
        {/* Profile Card */}
        <div style={{ 
          background: 'radial-gradient(ellipse at top left, rgba(6, 182, 212, 0.08) 0%, rgba(13, 23, 38, 0.95) 100%)', 
          padding: '36px', 
          borderRadius: '24px', 
          border: '1px solid rgba(6, 182, 212, 0.2)', 
          display: 'flex', 
          gap: '30px', 
          alignItems: 'flex-start', 
          marginBottom: '40px', 
          flexWrap: 'wrap', 
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 182, 212, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle glow circle */}
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

          {/* Avatar with cyan glow */}
          <div style={{ position: 'relative' }}>
            <img 
              src={profile.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=06b6d4&color=fff`} 
              alt={profile.name} 
              style={{ 
                width: '120px', 
                height: '120px', 
                borderRadius: '50%', 
                border: '3px solid #06b6d4', 
                objectFit: 'cover',
                boxShadow: '0 0 25px rgba(6, 182, 212, 0.4)'
              }} 
            />
            {profile.connections?.minecraft && (
              <img 
                src={`https://mc-heads.net/avatar/${profile.connections.minecraft}/40`}
                alt="Minecraft Skin"
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  border: '2px solid #060b13',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}
                title={`Minecraft IGN: ${profile.connections.minecraft}`}
              />
            )}
          </div>
          
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '6px' }}>
              <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: '#0B1524', letterSpacing: '-0.5px' }}>
                {profile.name}
              </h1>
              <span style={{ 
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(16, 185, 129, 0.2))', 
                color: '#38bdf8', 
                padding: '4px 14px', 
                borderRadius: '20px', 
                fontWeight: 700, 
                fontSize: '0.82rem', 
                border: '1px solid rgba(6, 182, 212, 0.4)', 
                textTransform: 'uppercase', 
                letterSpacing: '1px' 
              }}>
                {profile.role || 'Trainer'}
              </span>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="fa-solid fa-fingerprint" style={{ color: '#06b6d4' }}></i> {profile.username ? `@${profile.username}` : profile.email}
            </p>

            <p style={{ color: '#cbd5e1', margin: '0 0 20px 0', lineHeight: 1.6, maxWidth: '620px', fontSize: '1rem' }}>
              {profile.bio || "Exploring the Cobblemon wild and battling gym leaders on Pokéfun SMP!"}
            </p>
            
            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '24px', color: '#94a3b8', fontSize: '0.95rem', marginBottom: '22px' }}>
              <span><strong style={{ color: '#0B1524', fontSize: '1.1rem' }}>{posts.length}</strong> Posts</span>
              <span><strong style={{ color: '#0B1524', fontSize: '1.1rem' }}>{profile.followers?.length || 0}</strong> Followers</span>
              <span><strong style={{ color: '#0B1524', fontSize: '1.1rem' }}>{profile.following?.length || 0}</strong> Following</span>
            </div>

            {/* Reward Points Pill */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '22px', flexWrap: 'wrap' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.25) 100%)', 
                padding: '10px 20px', 
                borderRadius: '12px', 
                border: '1px solid rgba(245, 158, 11, 0.4)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px' 
              }}>
                <i className="fa-solid fa-gem" style={{ color: '#f59e0b', fontSize: '1.4rem' }}></i>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#fcd34d', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Reward Points</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0B1524' }}>{profile.rewardPoints || 0}</div>
                </div>
              </div>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.04)', 
                padding: '10px 20px', 
                borderRadius: '12px', 
                border: '1px solid rgba(255, 255, 255, 0.1)', 
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <i className="fa-solid fa-medal" style={{ color: '#06b6d4', fontSize: '1.4rem' }}></i>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>Trainer Rank</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0B1524' }}>{profile.rewardRank || "Ace Trainer"}</div>
                </div>
              </div>
            </div>

            {/* Social Connections */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {profile.connections?.minecraft && (
                <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <i className="fa-solid fa-cube"></i> {profile.connections.minecraft}
                </span>
              )}
              {profile.connections?.discord && (
                <span style={{ background: 'rgba(88, 101, 242, 0.15)', color: '#a5b4fc', border: '1px solid rgba(88, 101, 242, 0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <i className="fa-brands fa-discord"></i> {profile.connections.discord}
                </span>
              )}
              {profile.connections?.google && (
                <span style={{ background: 'rgba(219, 68, 55, 0.15)', color: '#fca5a5', border: '1px solid rgba(219, 68, 55, 0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <i className="fa-brands fa-google"></i> Connected
                </span>
              )}
              {profile.connections?.youtube && (
                <a href={`https://youtube.com/@${profile.connections.youtube.replace('@', '')}`} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(255, 0, 0, 0.15)', color: '#fca5a5', border: '1px solid rgba(255, 0, 0, 0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: 600 }}>
                  <i className="fa-brands fa-youtube"></i> {profile.connections.youtube}
                </a>
              )}
              {profile.connections?.instagram && (
                <a href={`https://instagram.com/${profile.connections.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(225, 48, 108, 0.15)', color: '#f472b6', border: '1px solid rgba(225, 48, 108, 0.3)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontWeight: 600 }}>
                  <i className="fa-brands fa-instagram"></i> {profile.connections.instagram}
                </a>
              )}
            </div>
          </div>

          <div>
            <button 
              onClick={() => setIsEditing(true)}
              style={{ 
                background: 'rgba(6, 182, 212, 0.15)', 
                color: '#38bdf8', 
                border: '1px solid rgba(6, 182, 212, 0.4)', 
                padding: '10px 20px', 
                borderRadius: '12px', 
                cursor: 'pointer', 
                fontWeight: 700, 
                fontSize: '0.95rem', 
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = '#06b6d4';
                e.currentTarget.style.color = '#060b13';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(6, 182, 212, 0.4)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'rgba(6, 182, 212, 0.15)';
                e.currentTarget.style.color = '#38bdf8';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <i className="fa-solid fa-pen-to-square"></i> Edit Profile
            </button>
          </div>
        </div>

        {/* User Posts Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#0B1524' }}>
            <i className="fa-solid fa-photo-film" style={{ color: '#06b6d4', marginRight: '10px' }}></i>
            My Posts & Reels
          </h2>
          <Link href="/community/create" style={{ 
            background: '#06b6d4', 
            color: '#060b13', 
            padding: '8px 18px', 
            borderRadius: '20px', 
            fontSize: '0.9rem', 
            fontWeight: 700, 
            textDecoration: 'none' 
          }}>
            + Create New
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '22px' }}>
          {posts.length === 0 ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              background: 'rgba(13, 23, 38, 0.5)', 
              borderRadius: '16px', 
              padding: '50px 20px', 
              textAlign: 'center',
              border: '1px dashed rgba(255, 255, 255, 0.1)'
            }}>
              <i className="fa-solid fa-comment-slash" style={{ fontSize: '2.5rem', color: '#475569', marginBottom: '14px' }}></i>
              <p style={{ color: '#94a3b8', margin: '0 0 15px 0' }}>You haven't posted any updates or clips yet.</p>
              <Link href="/community/create" style={{ color: '#06b6d4', textDecoration: 'none', fontWeight: 600 }}>
                Share your first post &rarr;
              </Link>
            </div>
          ) : (
            posts.map(post => (
              <div 
                key={post._id} 
                onClick={() => router.push(`/community/post/${post._id}`)} 
                style={{ 
                  background: 'rgba(13, 23, 38, 0.8)', 
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(255,255,255,0.08)', 
                  cursor: 'pointer', 
                  transition: 'all 0.25s ease' 
                }} 
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.5)';
                }} 
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {post.media && post.mediaType === 'image' && (
                  <img src={post.media} alt="Post media" style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                )}
                {post.media && post.mediaType === 'video' && (
                  <video src={post.media} controls style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
                )}
                {post.media && post.mediaType === 'youtube' && (
                  <iframe 
                    width="100%" 
                    height="160" 
                    src={post.media.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/").replace("autoplay=1", "autoplay=0")} 
                    title="YouTube video" 
                    frameBorder="0" 
                    allowFullScreen
                  ></iframe>
                )}
                {(!post.media) && (
                  <div style={{ width: '100%', height: '120px', background: 'rgba(6, 182, 212, 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                    <i className="fa-solid fa-message" style={{ fontSize: '2.5rem' }}></i>
                  </div>
                )}
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8', padding: '3px 8px', borderRadius: '8px', fontWeight: 600 }}>{post.category || 'Post'}</span>
                    <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 style={{ color: '#0B1524', margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 700 }}>{post.title}</h4>
                  <div style={{ display: 'flex', gap: '15px', marginTop: '12px', fontSize: '0.85rem', color: '#94a3b8' }}>
                    <span><i className="fa-solid fa-heart" style={{ color: '#ef4444', marginRight: '4px' }}></i> {post.likes?.length || 0}</span>
                    <span><i className="fa-solid fa-eye" style={{ color: '#06b6d4', marginRight: '4px' }}></i> {post.views || 0}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Modal */}
        {isEditing && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(3, 6, 10, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, overflowY: 'auto', padding: '20px' }}>
            <div style={{ background: '#0b1424', padding: '32px', borderRadius: '22px', width: '100%', maxWidth: '540px', border: '1px solid rgba(6, 182, 212, 0.3)', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 60px rgba(0,0,0,0.8)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: '#0B1524', margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>Edit Trainer Profile</h2>
                <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '1.4rem', cursor: 'pointer' }}>&times;</button>
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Display Name</label>
                <input value={editName} onChange={e => setEditName(e.target.value)} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(6, 11, 19, 0.8)', color: '#0B1524', outline: 'none' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Pokefun Web ID (@username)</label>
                <input value={editUsername} onChange={e => setEditUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(6, 11, 19, 0.8)', color: '#0B1524', outline: 'none' }} placeholder="lowercase, numbers, and underscore only" />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#94a3b8', marginBottom: '6px', fontSize: '0.85rem', fontWeight: 600 }}>Bio</label>
                <textarea value={editBio} onChange={e => setEditBio(e.target.value)} rows={3} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(6, 11, 19, 0.8)', color: '#0B1524', outline: 'none' }} />
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '20px 0' }} />
              <h3 style={{ color: '#0B1524', marginTop: 0, marginBottom: '15px', fontSize: '1.05rem', fontWeight: 700 }}>Linked Accounts</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.82rem' }}><i className="fa-solid fa-cube" style={{ color: '#10b981' }}></i> Minecraft IGN</label>
                  <input value={editConnections.minecraft} onChange={e => setEditConnections({...editConnections, minecraft: e.target.value})} placeholder="In-game name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(6, 11, 19, 0.8)', color: '#0B1524', fontSize: '0.88rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.82rem' }}><i className="fa-brands fa-discord" style={{ color: '#5865F2' }}></i> Discord</label>
                  {editConnections.discord ? (
                    <input value={editConnections.discord} disabled title="Discord is automatically linked" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.03)', color: '#64748b', fontSize: '0.88rem', cursor: 'not-allowed' }} />
                  ) : (
                    <button onClick={() => signIn('discord')} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#5865F2', color: '#0B1524', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
                      <i className="fa-brands fa-discord"></i> Link Discord
                    </button>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.82rem' }}><i className="fa-brands fa-youtube" style={{ color: '#ef4444' }}></i> YouTube</label>
                  <input value={editConnections.youtube} onChange={e => setEditConnections({...editConnections, youtube: e.target.value})} placeholder="Channel name" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(6, 11, 19, 0.8)', color: '#0B1524', fontSize: '0.88rem' }} />
                </div>
                <div>
                  <label style={{ display: 'block', color: '#94a3b8', marginBottom: '5px', fontSize: '0.82rem' }}><i className="fa-brands fa-instagram" style={{ color: '#ec4899' }}></i> Instagram</label>
                  <input value={editConnections.instagram} onChange={e => setEditConnections({...editConnections, instagram: e.target.value})} placeholder="@username" style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(6, 11, 19, 0.8)', color: '#0B1524', fontSize: '0.88rem' }} />
                </div>
              </div>

              <button 
                onClick={handleSaveProfile} 
                style={{ 
                  width: '100%', 
                  padding: '14px', 
                  background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)', 
                  color: '#060b13', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  fontSize: '1rem',
                  boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
                }}
              >
                Save Profile Changes
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}