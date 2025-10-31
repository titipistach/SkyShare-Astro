'use client'

import { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export default function Team() {
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

    // Animations au scroll – seuils optimisés
    const elements = document.querySelectorAll('.team-page .reveal-on-scroll')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
          observer.unobserve(entry.target)
        }
      })
    }, { root: null, rootMargin: '0px 0px -5% 0px', threshold: 0.15 })

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <div className="starfield" id="starfield"></div>
      <Header />
      
      <main id="main-content" className="team-page" style={{ paddingTop: '80px' }}>
        <section className="reveal-on-scroll">
          <h1>
            Meet Our Professional <span className="desktop-only-break"><br /></span>
            <span className="headline-desktop gradient-text">Astrophotography Team</span>
            <span className="headline-mobile"> <span className="gradient-text">Astro</span> Team</span>
          </h1>
          <p className="section-subtitle">
            Passionate astronomers and imaging specialists dedicated to making professional astrophotography 
            accessible to everyone. Combined expertise of 15+ years under the world&apos;s darkest skies.
          </p>
          
          <div className="team-stats reveal-on-scroll">
            <div className="stat-card">
              <div className="stat-value">500+</div>
              <div className="stat-label">Nights Under Bortle 1 Skies</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">3,500+</div>
              <div className="stat-label">Hours of Imaging Data</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">450+</div>
              <div className="stat-label">Happy Astrophotographers</div>
            </div>
          </div>
        </section>

        <section className="reveal-on-scroll">
          <h2>Our <span className="gradient-text">Astronomy Experts</span></h2>
          <p className="section-subtitle">Meet the professionals behind your astrophotography success</p>
          
          <div className="team-grid">
            <div className="team-card reveal-on-scroll">
              <div className="team-photo">
                <Image
                  src="/images/Team_Ben.webp"
                  alt="Alexandre Dubois"
                  width={150}
                  height={150}
                  priority
                  loading="eager"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
              <h3 className="team-name">Alexandre Dubois</h3>
              <p className="team-role">Lead Astrophotographer & Observatory Director</p>
              <p className="team-bio">
                With 8+ years capturing deep-sky wonders, Alexandre specializes in narrowband imaging 
                and has published work in Sky & Telescope. Passionate about teaching beginners 
                the art of astrophotography under pristine skies.
              </p>
            </div>
            
            <div className="team-card reveal-on-scroll">
              <div className="team-photo">
                <Image
                  src="/images/Team_Thibaud.webp"
                  alt="Sarah Chen"
                  width={150}
                  height={150}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTUnIGhlaWdodD0nMTUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PHJlY3Qgd2lkdGg9JzE1JyBoZWlnaHQ9JzE1JyBmaWxsPSIjMjIyIi8+PC9zdmc+"
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                />
              </div>
              <h3 className="team-name">Sarah Chen</h3>
              <p className="team-role">Technical Systems Specialist</p>
              <p className="team-bio">
                Former aerospace engineer turned telescope automation expert. Sarah ensures our 
                remote observatory systems run flawlessly 24/7, providing seamless control 
                experiences for all skill levels.
              </p>
            </div>
          </div>
        </section>

        <section className="reveal-on-scroll">
          <h2>Our <span className="gradient-text">Mission</span></h2>
          <p className="section-subtitle">Making Professional Astrophotography Accessible</p>
          
          <div className="cta-section reveal-on-scroll">
            <p style={{ fontSize: '1.2rem', color: '#d0d0d0', lineHeight: '1.8', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
              At SkyShare, we believe everyone should have the chance to explore the universe.<br />
              We provide affordable remote access to telescopes located under some of the world&apos;s darkest skies — making professional astrophotography possible for anyone, anywhere.<br />
              Whether you want to capture your own data or receive a fully processed image, SkyShare makes the wonders of the cosmos just a click away.
            </p>
          </div>
        </section>

        <section className="reveal-on-scroll">
          <h2>Why Choose Our <span className="gradient-text">Professional Team</span></h2>
          <p className="section-subtitle">Expertise that makes the difference</p>
          
          <div className="team-grid">
            <div className="team-card reveal-on-scroll">
              <div className="team-photo">🌌</div>
              <h3 className="team-name">Bortle 1 Expertise</h3>
              <p className="team-bio">
                Our team operates exclusively under the world&apos;s darkest skies, delivering 
                exceptional image quality impossible to achieve in light-polluted areas.
              </p>
            </div>
            
            <div className="team-card reveal-on-scroll">
              <div className="team-photo">🎓</div>
              <h3 className="team-name">Personalized Support</h3>
              <p className="team-bio">
                Whether you&apos;re a beginner or expert, our team provides 7-day support, 
                session planning assistance.
              </p>
            </div>
            
            <div className="team-card reveal-on-scroll">
              <div className="team-photo">🔧</div>
              <h3 className="team-name">Professional Equipment</h3>
              <p className="team-bio">
                Access to our SkyWatcher Esprit 100ED, cooled cameras, and premium filters 
                worth $15,000+.
              </p>
            </div>
          </div>
        </section>

        <section className="reveal-on-scroll">
          <h2>Ready to Work With Our <span className="gradient-text">Expert Team</span>?</h2>
          <p className="section-subtitle">
            Join hundreds of astrophotographers who trust our expertise to capture 
            stunning deep-sky images under the world&apos;s darkest skies.
          </p>
          
          <div className="cta-section reveal-on-scroll">
            <Link href="/rent-telescope" prefetch className="btn-primary">Book Your Night</Link>
            <Link href="/#faq" className="btn-secondary">Learn More</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

