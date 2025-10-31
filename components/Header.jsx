'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    const readAuth = () => setIsAuthed(typeof window !== 'undefined' && !!localStorage.getItem('ss_auth'))
    readAuth()
    const onStorage = (e) => {
      if (e.key === 'ss_auth') readAuth()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <header>
      <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="logo">SkyShare Astro</div>
      </Link>

      {/* Bouton hamburger (mobile) */}
      <button
        className={`hamburger ${mobileOpen ? 'is-active' : ''}`}
        aria-label="Open menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Navigation desktop */}
      <nav>
        <div className="dropdown">
          <Link href="/#services">Services</Link>
          <div className="dropdown-content">
            <Link href="/rent-telescope">Rent Telescope</Link>
            <Link href="/astrophotography-dataset">Astrophotography Dataset</Link>
          </div>
        </div>
        <Link href="/pricing">Pricing</Link>
        {/* <Link href="/#gallery">Gallery</Link> */}
        {/* <Link href="/#blog">Blog</Link> */}
        <Link href="/team">Team</Link>
        <Link href="/#faq">FAQ</Link>
        <a href="https://www.skyshare-astro.com/remote-telescope-faq/" target="_blank" rel="noopener noreferrer">Contact</a>
        <Link href={isAuthed ? '/dashboard' : '/login'}>My Account</Link>
        <Link href="/rent-telescope" className="btn-primary">Book Now</Link>
      </nav>

      {/* Navigation mobile */}
      <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`}>
        {/* <Link href="/#services" onClick={() => setMobileOpen(false)}>Services</Link> */}
        <Link href="/rent-telescope" onClick={() => setMobileOpen(false)}>Rent Telescope</Link>
        <Link href="/astrophotography-dataset" onClick={() => setMobileOpen(false)}>Astrophotography Dataset</Link>
        <Link href="/pricing" onClick={() => setMobileOpen(false)}>Pricing</Link>
        {/* <Link href="/#gallery" onClick={() => setMobileOpen(false)}>Gallery</Link> */}
        {/* <Link href="/#blog" onClick={() => setMobileOpen(false)}>Blog</Link> */}
        <Link href="/team" onClick={() => setMobileOpen(false)}>Team</Link>
        <Link href="/#faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
        <a href="https://www.skyshare-astro.com/remote-telescope-faq/" target="_blank" rel="noopener noreferrer">Contact</a>
        <Link href={isAuthed ? '/dashboard' : '/login'} onClick={() => setMobileOpen(false)}>My Account</Link>
        <Link href="/rent-telescope" className="btn-primary" onClick={() => setMobileOpen(false)}>Book Now</Link>
      </div>
    </header>
  )
}

