'use client'

import { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Sidebar from '../../components/dashboard/Sidebar'
import styles from './dashboard.module.css'

export default function DashboardLayout({ children }) {
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
  }, [])

  return (
    <>
      <Header />
      <div className="starfield" id="starfield"></div>
      <main className={styles.dashboardRoot} style={{ paddingTop: '80px' }}>
        <div className="dashboard-container">
          <Sidebar />
          <div className="dashboard-main">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

