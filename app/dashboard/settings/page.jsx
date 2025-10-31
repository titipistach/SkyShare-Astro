'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    weatherAlerts: true,
    newsletter: true,
    darkMode: true,
    language: 'fr',
    timezone: 'America/New_York',
    autoDownload: false
  })

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <h1 className="page-title">Settings</h1>

      <div className="section" style={{ marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Notifications</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive emails for your reservations and updates' },
            { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive SMS for important alerts' },
            { key: 'weatherAlerts', label: 'Weather Alerts', desc: 'Get notified about weather conditions for your reservations' },
            { key: 'newsletter', label: 'Newsletter', desc: 'Receive our newsletter with news and tips' }
          ].map(({ key, label, desc }) => (
            <div key={key} className="booking-card" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ color: '#fff', fontWeight: '600', marginBottom: '0.25rem' }}>{label}</div>
                <div style={{ color: '#888', fontSize: '0.85rem' }}>{desc}</div>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
                <input
                  type="checkbox"
                  checked={settings[key]}
                  onChange={() => handleToggle(key)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: settings[key] ? '#FF8800' : '#555',
                  transition: '0.3s',
                  borderRadius: '26px'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '20px',
                    width: '20px',
                    left: '3px',
                    bottom: '3px',
                    backgroundColor: '#fff',
                    transition: '0.3s',
                    borderRadius: '50%',
                    transform: settings[key] ? 'translateX(24px)' : 'translateX(0)'
                  }}></span>
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="section" style={{ marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Preferences</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="booking-card">
            <div>
              <div style={{ color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Language</div>
              <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 136, 0, 0.3)',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  width: '200px'
                }}
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>

          <div className="booking-card">
            <div>
              <div style={{ color: '#aaa', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Timezone</div>
              <select
                value={settings.timezone}
                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 136, 0, 0.3)',
                  color: '#fff',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  width: '300px'
                }}
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/Paris">Europe/Paris (CET)</option>
              </select>
            </div>
          </div>

          <div className="booking-card" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: '600', marginBottom: '0.25rem' }}>Auto Download</div>
              <div style={{ color: '#888', fontSize: '0.85rem' }}>Automatically download available data</div>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
              <input
                type="checkbox"
                checked={settings.autoDownload}
                onChange={() => handleToggle('autoDownload')}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings.autoDownload ? '#FF8800' : '#555',
                transition: '0.3s',
                borderRadius: '26px'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '""',
                  height: '20px',
                  width: '20px',
                  left: '3px',
                  bottom: '3px',
                  backgroundColor: '#fff',
                  transition: '0.3s',
                  borderRadius: '50%',
                  transform: settings.autoDownload ? 'translateX(24px)' : 'translateX(0)'
                }}></span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Account</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn-small" style={{ width: 'fit-content' }}>Change Password</button>
          <button className="btn-small" style={{ width: 'fit-content', background: 'rgba(220, 53, 69, 0.2)', borderColor: '#dc3545', color: '#dc3545' }}>
            Delete Account
          </button>
        </div>
      </div>
    </>
  )
}

