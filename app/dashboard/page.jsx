'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  useEffect(() => {
    // Animation pour les stats
    document.querySelectorAll('.stat-card').forEach((card, index) => {
      card.style.opacity = '0'
      card.style.transform = 'translateY(20px)'
      setTimeout(() => {
        card.style.transition = 'all 0.5s ease'
        card.style.opacity = '1'
        card.style.transform = 'translateY(0)'
      }, index * 100)
    })
  }, [])

  return (
    <>
          <h1 className="page-title">Welcome, John! 🌌</h1>

          <div className="credits-widget">
            <div className="credits-header">
              <div>
                <div className="credits-count">5</div>
                <div className="credits-label">Nights Remaining</div>
              </div>
              <Link href="/rent-telescope" className="btn-primary">Book a Night</Link>
            </div>
            <div className="credits-expiry">Valid until March 15, 2026</div>
            <div className="nights-visual">
              <div className="night-icon used">🌑</div>
              <div className="night-icon used">🌑</div>
              <div className="night-icon available">🌕</div>
              <div className="night-icon available">🌕</div>
              <div className="night-icon available">🌕</div>
              <div className="night-icon available">🌕</div>
              <div className="night-icon available">🌕</div>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#aaa' }}>2 nights used out of 7</div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Next Reservation</div>
              <div className="stat-value">Nov 15</div>
              <div className="stat-subtext">M31 - Andromeda Galaxy</div>
              <div className="countdown">
                <div className="countdown-item">
                  <div className="countdown-value">12</div>
                  <div className="countdown-label">Days</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">05</div>
                  <div className="countdown-label">Hours</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">23</div>
                  <div className="countdown-label">Min</div>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Total Observation Time</div>
              <div className="stat-value">18.5h</div>
              <div className="stat-subtext">Spread over 2 nights</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Available Data</div>
              <div className="stat-value">3</div>
              <div className="stat-subtext">42.3 GB to download</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Captured Targets</div>
              <div className="stat-value">5</div>
              <div className="stat-subtext">Galaxies (2), Nebulae (3)</div>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Recent Reservations</h2>
              <a href="#" className="btn-small">View All</a>
            </div>

            <div className="booking-card">
              <div className="booking-info">
                <div className="booking-date">📅 November 15, 2025</div>
                <div className="booking-target">🎯 M31 - Andromeda Galaxy</div>
                <div className="booking-target" style={{ fontSize: '0.85rem', color: '#888' }}>Plan: Standard ($99) • Ha+OIII+SII</div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span className="booking-status status-upcoming">Upcoming</span>
                </div>
              </div>
              <div className="booking-actions">
                <button className="btn-small">Edit</button>
                <button className="btn-small">Cancel</button>
              </div>
            </div>

            <div className="booking-card">
              <div className="booking-info">
                <div className="booking-date">📅 October 28, 2025</div>
                <div className="booking-target">🎯 NGC 7000 - North America Nebula</div>
                <div className="booking-target" style={{ fontSize: '0.85rem', color: '#888' }}>Plan: Discovery ($79) • LRGB</div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span className="booking-status status-pending">⏳ Processing</span>
                </div>
              </div>
              <div className="booking-actions">
                <button className="btn-small">View Details</button>
              </div>
            </div>

            <div className="booking-card">
              <div className="booking-info">
                <div className="booking-date">📅 October 12, 2025</div>
                <div className="booking-target">🎯 M42 - Orion Nebula</div>
                <div className="booking-target" style={{ fontSize: '0.85rem', color: '#888' }}>Plan: Standard ($99) • Ha+RGB</div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span className="booking-status status-completed">✅ Completed</span>
                </div>
              </div>
              <div className="booking-actions">
                <button className="btn-small">Download</button>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Recent Data</h2>
              <a href="#" className="btn-small">View All</a>
            </div>

            <div className="data-gallery">
              <div className="data-card">
                <div className="data-image">🌌</div>
                <div className="data-info">
                  <div className="data-name">M42 - Orion Nebula</div>
                  <div className="data-date">October 12, 2025 • 8.5h</div>
                  <a href="#" className="data-download">⬇ Download (12.3 GB)</a>
                </div>
              </div>

              <div className="data-card">
                <div className="data-image">🌠</div>
                <div className="data-info">
                  <div className="data-name">NGC 7000 - North America</div>
                  <div className="data-date">September 28, 2025 • 6.2h</div>
                  <a href="#" className="data-download">⬇ Download (8.9 GB)</a>
                </div>
              </div>

              <div className="data-card">
                <div className="data-image">✨</div>
                <div className="data-info">
                  <div className="data-name">IC 1396 - Elephant Trunk</div>
                  <div className="data-date">September 15, 2025 • 10.8h</div>
                  <a href="#" className="data-download">⬇ Download (15.7 GB)</a>
                </div>
              </div>

            <div className="data-card add-card" style={{ cursor: 'default' }}>
              <div className="data-image">
                <div className="add-cta">
                  <div style={{ fontSize: '3rem' }}>+</div>
                  <div style={{ fontSize: '1rem', color: '#FF8800' }}>Book a Night</div>
                </div>
              </div>
              <div className="data-info">
                <div className="data-name">Next Capture</div>
                <div className="data-date">Book Now</div>
              </div>
            </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">Quick Actions</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem', justifyContent: 'center' }}>
              <Link href="/rent-telescope" className="btn-primary">🌙 Book a Night</Link>
              <Link href="/astrophotography-dataset" className="btn-secondary">🛒 Buy Data</Link>
              <Link href="/pricing" className="btn-secondary">📦 Buy a Package</Link>
            </div>
          </div>
    </>
  )
}

