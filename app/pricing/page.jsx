'use client'

import { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function Pricing() {
  useEffect(() => {
    const starfield = document.getElementById('starfield')
    if (starfield) {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1200
      let numStars = 200
      if (width <= 480) numStars = 60
      else if (width <= 768) numStars = 120
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

    // Révélation au scroll (générique)
    const toReveal = document.querySelectorAll(
      'main section, .pricing-card, .pack-card, .info-item, .cta-section'
    )
    toReveal.forEach(el => el.classList.add('reveal-on-scroll'))

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { root: null, rootMargin: '0px 0px -5% 0px', threshold: 0.15 })

    toReveal.forEach(el => revealObserver.observe(el))

    return () => revealObserver.disconnect()
  }, [])

  return (
    <>
      <div className="starfield" id="starfield"></div>
      <Header />
      
      <main style={{ paddingTop: '80px' }}>
        <section>
          <h1>Transparent <span className="gradient-text">Pricing</span></h1>
          <p className="section-subtitle">
            Access professional equipment under the world&apos;s darkest skies
          </p>
        </section>

        <section>
          <h2>Individual Night <span className="gradient-text">Reservations</span></h2>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <span className="badge badge-new">First Time</span>
              <div className="plan-icon">🌟</div>
              <h3 className="plan-name">Discovery</h3>
              <p className="plan-subtitle">Your first booking</p>
              <div className="original-price">$99</div>
              <div className="plan-price">$79<span>/night</span></div>
              <div className="savings">Save 20%</div>
              <ul className="plan-features">
                <li>Full night imaging</li>
                <li>All filters included</li>
                <li>Raw FITS data</li>
                <li>Delivery within 24h</li>
                <li>New customer offer</li>
              </ul>
              <button className="btn-select">Try Now</button>
            </div>

            <div className="pricing-card">
              <div className="plan-icon">🔭</div>
              <h3 className="plan-name">Standard</h3>
              <p className="plan-subtitle">For regular enthusiasts</p>
              <div className="plan-price">$99<span>/night</span></div>
              <ul className="plan-features">
                <li>Full night imaging</li>
                <li>All filters included</li>
                <li>Raw FITS data</li>
                <li>Delivery within 24h</li>
              </ul>
              <button className="btn-select">Book Now</button>
            </div>

            <div className="pricing-card">
              <span className="badge badge-student">Student</span>
              <div className="plan-icon">🎓</div>
              <h3 className="plan-name">Student</h3>
              <p className="plan-subtitle">Dedicated education program</p>
              <div className="original-price">$99</div>
              <div className="plan-price">$69<span>/night</span></div>
              <div className="savings">Save 30%</div>
              <ul className="plan-features">
                <li>Full night imaging</li>
                <li>All filters included</li>
                <li>Raw FITS data</li>
                <li>Delivery within 24h</li>
                <li>Exclusive student rate</li>
              </ul>
              <button className="btn-select">Verify Eligibility</button>
            </div>

            <div className="pricing-card premium">
              <span className="badge badge-premium">Premium</span>
              <div className="plan-icon">🌑</div>
              <h3 className="plan-name">New Moon</h3>
              <p className="plan-subtitle">Optimal conditions guaranteed</p>
              <div className="plan-price">$129<span>/night</span></div>
              <ul className="plan-features">
                <li>Full night imaging</li>
                <li>All filters included</li>
                <li>Raw FITS data</li>
                <li>Delivery within 24h</li>
                <li>New moon nights</li>
                <li>Maximum darkness</li>
              </ul>
              <button className="btn-select">Book Premium</button>
            </div>
          </div>
        </section>

        <section>
          <h2>💫 Multi-Night <span className="gradient-text">Packages</span></h2>
          
          <div className="packs-grid">
            <div className="pack-card">
              <div className="pack-nights">7 NIGHTS</div>
              <div className="pack-total">$549</div>
              <div className="pack-per-night">Only $78.40/night</div>
              <div className="pack-savings">SAVE $144</div>
              <ul className="plan-features">
                <li>Valid for 6 months</li>
                <li>Complete date flexibility</li>
                <li>Priority support included</li>
                <li>Perfect for medium projects</li>
              </ul>
              <button className="btn-select">Choose This Pack</button>
            </div>

            <div className="pack-card">
              <div className="pack-nights">20 NIGHTS</div>
              <div className="pack-total">$1,499</div>
              <div className="pack-per-night">Only $74.95/night</div>
              <div className="pack-savings">SAVE $481</div>
              <ul className="plan-features">
                <li>Valid for 12 months</li>
                <li>Maximum flexibility</li>
                <li>Priority support included</li>
                <li>Perfect for ambitious projects</li>
              </ul>
              <button className="btn-select">Best Value</button>
            </div>
          </div>
        </section>

        <section>
          <div className="info-section">
            <h3 style={{ fontFamily: "'Orbitron', monospace", fontSize: '2rem', marginBottom: '1rem', color: '#FCA311' }}>✨ Everything Included</h3>
            <p style={{ color: '#b0b0b0', maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1.1rem' }}>
              Whatever your choice, you access the same professional equipment worth $15,000+
            </p>
            
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">🔭</div>
                <div className="info-title">Pro Equipment</div>
                <div className="info-text">High-performance telescopes and cameras, perfectly maintained</div>
              </div>
              <div className="info-item">
                <div className="info-icon">🌌</div>
                <div className="info-title">Bortle 1 Sky</div>
                <div className="info-text">The world&apos;s darkest skies, 250+ clear nights/year</div>
              </div>
              <div className="info-item">
                <div className="info-icon">📊</div>
                <div className="info-title">Raw Data</div>
                <div className="info-text">Complete FITS files delivered within 24h, ready for processing</div>
              </div>
              <div className="info-item">
                <div className="info-icon">🛡️</div>
                <div className="info-title">Weather Guarantee</div>
                <div className="info-text">Refund or reschedule in case of bad weather</div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="cta-section">
            <h2 className="cta-title">Ready to Capture the Universe?</h2>
            <p className="cta-text">
              Join hundreds of astrophotographers who trust SkyShare Astro
            </p>
            <Link href="/rent-telescope" className="cta-button">Check Availability →</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

