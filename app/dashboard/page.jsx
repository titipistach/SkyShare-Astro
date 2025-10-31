'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function Dashboard() {
  useEffect(() => {
    // Starfield
    const starfield = document.getElementById('starfield')
    if (starfield) {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200
      let numStars = 160
      if (width <= 480) numStars = 50
      else if (width <= 768) numStars = 100
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.left = Math.random() * 100 + '%'
        star.style.top = Math.random() * 100 + '%'
        star.style.animationDelay = Math.random() * 3 + 's'
        star.style.opacity = Math.random() * 0.7 + 0.3
        starfield.appendChild(star)
      }
    }

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

    // Interaction navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function() {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'))
        this.classList.add('active')
      })
    })
  }, [])

  return (
    <>
      <Header />
      <div className="starfield" id="starfield"></div>

      <main style={{ paddingTop: '80px' }}>
        <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <div className="nav-item active">
            <span className="nav-icon">📊</span>
            <span>Vue d&apos;ensemble</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">🌙</span>
            <span>Mes réservations</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">📸</span>
            <span>Mes données</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">🛒</span>
            <span>Mes achats</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">👤</span>
            <span>Mon profil</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">💳</span>
            <span>Paiements</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span>Paramètres</span>
          </div>
        </div>

        <div className="dashboard-main">
          <h1 className="page-title">Bienvenue, John ! 🌌</h1>

          <div className="credits-widget">
            <div className="credits-header">
              <div>
                <div className="credits-count">5</div>
                <div className="credits-label">Nuits restantes</div>
              </div>
              <Link href="/rent-telescope" className="btn-primary">Réserver une nuit</Link>
            </div>
            <div className="credits-expiry">Valable jusqu&apos;au 15 mars 2026</div>
            <div className="nights-visual">
              <div className="night-icon used">🌑</div>
              <div className="night-icon used">🌑</div>
              <div className="night-icon available">🌕</div>
              <div className="night-icon available">🌕</div>
              <div className="night-icon available">🌕</div>
              <div className="night-icon available">🌕</div>
              <div className="night-icon available">🌕</div>
            </div>
            <div style={{ fontSize: '0.9rem', color: '#aaa' }}>2 nuits utilisées sur 7</div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Prochaine réservation</div>
              <div className="stat-value">15 Nov</div>
              <div className="stat-subtext">M31 - Andromeda Galaxy</div>
              <div className="countdown">
                <div className="countdown-item">
                  <div className="countdown-value">12</div>
                  <div className="countdown-label">Jours</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">05</div>
                  <div className="countdown-label">Heures</div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-value">23</div>
                  <div className="countdown-label">Min</div>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Temps d&apos;observation total</div>
              <div className="stat-value">18.5h</div>
              <div className="stat-subtext">Réparti sur 2 nuits</div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Données disponibles</div>
              <div className="stat-value">3</div>
              <div className="stat-subtext">42.3 GB à télécharger</div>
            </div>

            <div className="stat-card">
              <div className="stat-label">Cibles capturées</div>
              <div className="stat-value">5</div>
              <div className="stat-subtext">Galaxies (2), Nébuleuses (3)</div>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Mes réservations récentes</h2>
              <a href="#" className="btn-small">Voir tout</a>
            </div>

            <div className="booking-card">
              <div className="booking-info">
                <div className="booking-date">📅 15 Novembre 2025</div>
                <div className="booking-target">🎯 M31 - Andromeda Galaxy</div>
                <div className="booking-target" style={{ fontSize: '0.85rem', color: '#888' }}>Plan: Standard ($99) • Ha+OIII+SII</div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span className="booking-status status-upcoming">À venir</span>
                </div>
              </div>
              <div className="booking-actions">
                <button className="btn-small">Modifier</button>
                <button className="btn-small">Annuler</button>
              </div>
            </div>

            <div className="booking-card">
              <div className="booking-info">
                <div className="booking-date">📅 28 Octobre 2025</div>
                <div className="booking-target">🎯 NGC 7000 - North America Nebula</div>
                <div className="booking-target" style={{ fontSize: '0.85rem', color: '#888' }}>Plan: Discovery ($79) • LRGB</div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span className="booking-status status-pending">⏳ En traitement</span>
                </div>
              </div>
              <div className="booking-actions">
                <button className="btn-small">Voir détails</button>
              </div>
            </div>

            <div className="booking-card">
              <div className="booking-info">
                <div className="booking-date">📅 12 Octobre 2025</div>
                <div className="booking-target">🎯 M42 - Orion Nebula</div>
                <div className="booking-target" style={{ fontSize: '0.85rem', color: '#888' }}>Plan: Standard ($99) • Ha+RGB</div>
                <div style={{ marginTop: '0.5rem' }}>
                  <span className="booking-status status-completed">✅ Terminée</span>
                </div>
              </div>
              <div className="booking-actions">
                <button className="btn-small">Télécharger</button>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="section-header">
              <h2 className="section-title">Mes données récentes</h2>
              <a href="#" className="btn-small">Voir tout</a>
            </div>

            <div className="data-gallery">
              <div className="data-card">
                <div className="data-image">🌌</div>
                <div className="data-info">
                  <div className="data-name">M42 - Orion Nebula</div>
                  <div className="data-date">12 Octobre 2025 • 8.5h</div>
                  <a href="#" className="data-download">⬇ Télécharger (12.3 GB)</a>
                </div>
              </div>

              <div className="data-card">
                <div className="data-image">🌠</div>
                <div className="data-info">
                  <div className="data-name">NGC 7000 - North America</div>
                  <div className="data-date">28 Septembre 2025 • 6.2h</div>
                  <a href="#" className="data-download">⬇ Télécharger (8.9 GB)</a>
                </div>
              </div>

              <div className="data-card">
                <div className="data-image">✨</div>
                <div className="data-info">
                  <div className="data-name">IC 1396 - Elephant Trunk</div>
                  <div className="data-date">15 Septembre 2025 • 10.8h</div>
                  <a href="#" className="data-download">⬇ Télécharger (15.7 GB)</a>
                </div>
              </div>

              <div className="data-card" style={{ border: '2px dashed rgba(255, 136, 0, 0.5)', cursor: 'default' }}>
                <div className="data-image" style={{ background: 'rgba(255, 136, 0, 0.1)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem' }}>+</div>
                    <div style={{ fontSize: '1rem', color: '#FF8800' }}>Réserver une nuit</div>
                  </div>
                </div>
                <div className="data-info">
                  <div className="data-name">Prochaine capture</div>
                  <div className="data-date">Réservez maintenant</div>
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">Actions rapides</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              <Link href="/rent-telescope" className="btn-primary">🌙 Réserver une nuit</Link>
              <Link href="/astrophotography-dataset" className="btn-secondary">🛒 Acheter des données</Link>
              <Link href="/pricing" className="btn-secondary">📦 Acheter un package</Link>
              <button className="btn-secondary">🎁 Offrir une nuit</button>
            </div>
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

