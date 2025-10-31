'use client'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { useEffect } from 'react'

export default function LoginPage() {
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
    // TODO: intégrer auth réelle plus tard
    localStorage.setItem('ss_auth', '1')
    window.location.href = '/dashboard'
  }

  return (
    <>
      <Header />
      <div className="starfield" id="starfield"></div>
      <main className="auth-page" style={{ paddingTop: '80px' }}>
        <section>
          <h1>Sign in to <span className="gradient-text">your account</span></h1>
          <p className="section-subtitle">Welcome back. Please enter your details.</p>

          <div className="auth-card">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" autoComplete="current-password" required />
              </div>

              <div className="form-row">
                <label className="checkbox">
                  <input type="checkbox" id="remember" name="remember" />
                  <span>Remember me</span>
                </label>
                <Link href="#" className="link-muted">Forgot password?</Link>
              </div>

              <button type="submit" className="btn-primary auth-submit">Sign in</button>

              <p className="auth-switch">
                Don&apos;t have an account? <Link href="/signup" className="link-accent">Sign up</Link>
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
