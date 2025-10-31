'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { useEffect } from 'react'

export default function SignupPage() {
  useEffect(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: intégrer inscription réelle
    localStorage.setItem('ss_auth', '1')
    window.location.href = '/dashboard'
  }

  return (
    <>
      <Header />
      <div className="starfield" id="starfield"></div>
      <main className="auth-page" style={{ paddingTop: '80px' }}>
        <section>
          <h1>Create your <span className="gradient-text">account</span></h1>
          <p className="section-subtitle">Join SkyShare Astro in minutes.</p>

          <div className="auth-card">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="firstName">First name</label>
                  <input id="firstName" name="firstName" type="text" autoComplete="given-name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last name</label>
                  <input id="lastName" name="lastName" type="text" autoComplete="family-name" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>

              <div className="form-row two-cols">
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input id="password" name="password" type="password" autoComplete="new-password" required />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm">Confirm password</label>
                  <input id="confirm" name="confirm" type="password" autoComplete="new-password" required />
                </div>
              </div>

              <label className="checkbox" style={{ marginTop: '0.5rem' }}>
                <input type="checkbox" id="terms" required />
                <span>I agree to the Terms & Conditions</span>
              </label>

              <label className="checkbox" style={{ marginTop: '0.5rem' }}>
                <input type="checkbox" id="newsletter" />
                <span>Subscribe to newsletter (optional)</span>
              </label>

              <button type="submit" className="btn-primary auth-submit">Create account</button>

              <p className="auth-switch">
                Already have an account? <Link href="/login" className="link-accent">Sign in</Link>
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
