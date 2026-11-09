"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const PERMISSIONS_LIST = [
  { id: 'DELETE_POSTS', label: 'Delete Posts' },
  { id: 'ANNOUNCEMENTS', label: 'Post Announcements/Guides' },
  { id: 'MANAGE_ROLES', label: 'Manage Roles & Staff' },
  { id: 'READ_DMS', label: 'Read Player DMs (Spy)' },
  { id: 'BAN_USERS', label: 'Ban & Warn Users' },
  { id: 'MANAGE_GIVEAWAYS_POLLS', label: 'Manage Giveaways & Polls' },
  { id: 'MANAGE_EVENTS_TOURNAMENTS', label: 'Manage Events & Tournaments' },
  { id: 'MANAGE_REWARDS_STORE', label: 'Manage Rewards & Store' }
];

const ROLES_LIST = ['ALL', 'OWNER', 'ADMIN', 'SUB_ADMIN', 'STAFF', 'USER'];

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const USERS_PER_PAGE = 40;
  
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editRole, setEditRole] = useState('');
  const [editPermissions, setEditPermissions] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const myRole = (session?.user as any)?.role;
  const myPermissions = (session?.user as any)?.permissions || [];
  const userEmail = (session?.user?.email || '').toLowerCase();
  const userName = ((session?.user as any)?.username || session?.user?.name || '').toLowerCase();
  const isMasterOwner = ['msgboys832@gmail.com', 'boysmsg832@gmail.com', 'pokefunsmp@gmail.com', 'shifan@pokefun.in', 'shifangouri01@gmail.com'].includes(userEmail) || ['boysmsg01', 'pokefunadmin'].includes(userName);
  const canManageRoles = myRole === 'OWNER' || myRole === 'ADMIN' || myPermissions.includes('MANAGE_ROLES') || isMasterOwner;

  useEffect(() => {
    if (status === 'unauthenticated' || (!canManageRoles && status !== 'loading')) {
      router.push('/admin');
      return;
    }

    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        if (!data.error && Array.isArray(data)) {
          setUsers(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session, status, router, canManageRoles]);

  const openEditModal = (user: any) => {
    setEditingUser(user);
    setEditRole(user.role);
    setEditPermissions(user.permissions || []);
  };

  const togglePermission = (permId: string) => {
    setEditPermissions(prev => 
      prev.includes(permId) ? prev.filter(p => p !== permId) : [...prev, permId]
    );
  };

  const handleSave = async () => {
    if (!editingUser) return;
    setSaving(true);
    
    const res = await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: editingUser.email, 
        role: editRole,
        permissions: editPermissions
      })
    });
    
    if (res.ok) {
      const updated = await res.json();
      setUsers(users.map(u => u.email === updated.email ? updated : u));
      setEditingUser(null);
      alert(`Success! Updated permissions for ${updated.name}.`);
    } else {
      const data = await res.json();
      alert(data.error || "Failed to update user");
    }
    setSaving(false);
  };

  const filteredUsers = users.filter(u => {
    const nameMatch = (u.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = (u.email || '').toLowerCase().includes(searchQuery.toLowerCase());
    const userMatch = (u.username || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = nameMatch || emailMatch || userMatch;
    const matchesRole = selectedRole === 'ALL' || u.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE) || 1;
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

  if (loading || status === 'loading') {
    return (
      <div style={{ textAlign: 'center', marginTop: '120px', color: 'white' }}>
        <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2.5rem', color: '#10b981', marginBottom: '15px' }}></i>
        <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>Loading All Players Database...</p>
      </div>
    );
  }

  return (
    <div className="inner" style={{ paddingTop: '80px', paddingBottom: '60px', maxWidth: '1100px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={() => router.push('/admin')} 
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: 'white', padding: '10px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Dashboard
          </button>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#10b981', margin: 0 }}>All Players & Staff</h1>
            <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '0.9rem' }}>
              Connected Database: <strong>{users.length}</strong> total registered players across all networks
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search by name, username, or email..." 
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
          style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(0,0,0,0.4)', color: 'white', outline: 'none', fontSize: '0.95rem' }}
        />

        {/* Role Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 700, marginRight: '6px' }}>Filter Role:</span>
          {ROLES_LIST.map(role => (
            <button
              key={role}
              onClick={() => { setSelectedRole(role); setCurrentPage(1); }}
              style={{
                background: selectedRole === role ? '#10b981' : 'rgba(255,255,255,0.07)',
                color: selectedRole === role ? '#ffffff' : '#cbd5e1',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: '0.2s'
              }}
            >
              {role} {role === 'ALL' ? `(${users.length})` : `(${users.filter(u => u.role === role).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', minWidth: '700px' }}>
          <thead style={{ background: 'rgba(0,0,0,0.4)', borderBottom: '1.5px solid rgba(255,255,255,0.1)' }}>
            <tr>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase' }}>Player</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase' }}>Email</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase' }}>Role</th>
              <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase' }}>Joined</th>
              <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '0.82rem', color: '#94a3b8', textTransform: 'uppercase' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                  No players found matching your search.
                </td>
              </tr>
            ) : (
              paginatedUsers.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={u.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name || 'Trainer')}&background=random`} 
                        alt={u.name} 
                        style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(255,255,255,0.1)' }} 
                      />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'white' }}>{u.name || 'Trainer'}</div>
                        <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>@{u.username || 'trainer'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '0.85rem' }}>{u.email}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '6px', 
                      background: u.role === 'OWNER' ? '#ef4444' : u.role === 'ADMIN' ? '#3b82f6' : u.role === 'SUB_ADMIN' ? '#10b981' : u.role === 'STAFF' ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      letterSpacing: '0.5px'
                    }}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#64748b', fontSize: '0.82rem' }}>
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <a 
                        href={`/messages?user=${encodeURIComponent(u.username || u.name)}`}
                        style={{ padding: '6px 12px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}
                      >
                        <i className="fa-solid fa-message"></i> DM
                      </a>
                      <button 
                        onClick={() => openEditModal(u)}
                        style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                      >
                        <i className="fa-solid fa-pen"></i> Role
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Showing {((currentPage - 1) * USERS_PER_PAGE) + 1} - {Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length)} of {filteredUsers.length} players
            </span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                style={{
                  background: currentPage === 1 ? 'transparent' : 'rgba(255,255,255,0.1)',
                  color: currentPage === 1 ? '#475569' : 'white',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                Previous
              </button>
              <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.88rem', padding: '0 8px' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                style={{
                  background: currentPage === totalPages ? 'transparent' : 'rgba(255,255,255,0.1)',
                  color: currentPage === totalPages ? '#475569' : 'white',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Role Modal */}
      {editingUser && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
          <div style={{ background: '#1e293b', padding: '30px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '90%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', margin: '0 0 15px' }}>
              Edit Role & Permissions: {editingUser.name}
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 700 }}>Role:</label>
              <select 
                value={editRole} 
                onChange={(e) => setEditRole(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: '#0f172a', color: 'white', fontWeight: 700 }}
              >
                <option value="USER">USER</option>
                <option value="STAFF">STAFF</option>
                <option value="SUB_ADMIN">SUB_ADMIN</option>
                <option value="ADMIN">ADMIN</option>
                <option value="OWNER">OWNER</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 700 }}>Custom Staff Permissions:</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                {PERMISSIONS_LIST.map(p => (
                  <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={editPermissions.includes(p.id)} 
                      onChange={() => togglePermission(p.id)}
                    />
                    {p.label}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => setEditingUser(null)}
                style={{ padding: '10px 18px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
              >
                Cancel
              </button>
              <button 
                disabled={saving}
                onClick={handleSave}
                style={{ padding: '10px 20px', background: '#10b981', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 800 }}
              >
                {saving ? 'Saving...' : 'Save Permissions'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
