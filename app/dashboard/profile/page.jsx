'use client'

import { useState } from 'react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    organization: 'Astrophotography Enthusiast',
    bio: 'Passionate about deep-sky astrophotography and exploring the cosmos.'
  })

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="page-title">My Profile</h1>
        <button className="btn-primary" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </div>

      <div className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Personal Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.firstName}
                    onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div style={{ color: '#fff', fontSize: '1rem' }}>{profile.firstName}</div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.lastName}
                    onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div style={{ color: '#fff', fontSize: '1rem' }}>{profile.lastName}</div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div style={{ color: '#fff', fontSize: '1rem' }}>{profile.email}</div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div style={{ color: '#fff', fontSize: '1rem' }}>{profile.phone}</div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Country</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.country}
                    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div style={{ color: '#fff', fontSize: '1rem' }}>{profile.country}</div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>About</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Organization</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.organization}
                    onChange={(e) => setProfile({ ...profile, organization: e.target.value })}
                    className="input-field"
                  />
                ) : (
                  <div style={{ color: '#fff', fontSize: '1rem' }}>{profile.organization}</div>
                )}
              </div>
              <div>
                <label style={{ display: 'block', color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Biography</label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="input-field"
                    rows={4}
                  />
                ) : (
                  <div style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.6' }}>{profile.bio}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Account Statistics</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Member Since</div>
            <div className="stat-value">2023</div>
            <div className="stat-subtext">2 years of experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Total Reservations</div>
            <div className="stat-value">12</div>
            <div className="stat-subtext">8 completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Nights Observed</div>
            <div className="stat-value">24h</div>
            <div className="stat-subtext">Total time</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Data Downloaded</div>
            <div className="stat-value">55GB</div>
            <div className="stat-subtext">12 datasets</div>
          </div>
        </div>
      </div>
    </>
  )
}

