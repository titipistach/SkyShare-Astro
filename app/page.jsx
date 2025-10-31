'use client'

import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Link from 'next/link'
import Script from 'next/script'

export default function HomePage() {
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

    // FAQ Accordion functionality
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', () => {
        const answer = question.nextElementSibling
        const isOpen = answer.style.display === 'block'

        document.querySelectorAll('.faq-answer').forEach(ans => {
          ans.style.display = 'none'
        })

        if (!isOpen) {
          answer.style.display = 'block'
        }
      })
    })

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      })
    })

    // Video loading debug (if needed, can be removed in production)
    const video = document.querySelector('.hero-video')
    if (video) {
      video.addEventListener('loadstart', () => console.log('Video loading started'))
      video.addEventListener('loadeddata', () => console.log('Video data loaded'))
      video.addEventListener('canplay', () => console.log('Video can play'))
      video.addEventListener('error', (e) => console.error('Video error:', e))
      video.addEventListener('play', () => console.log('Video started playing'))

      setTimeout(() => {
        video.play().catch(e => console.error('Play failed:', e))
      }, 1000)
    }

    // Révélation au scroll (générique)
    const toReveal = document.querySelectorAll(
      'main section, .feature-card, .pricing-card, .home-price-card, .offer-card, .faq-item, .testimonial-card'
    )
    toReveal.forEach(el => el.classList.add('reveal-on-scroll'))

    // Fallback + marquer visibles au chargement
    const markIfVisible = (el) => {
      const rect = el.getBoundingClientRect()
      const viewportH = typeof window !== 'undefined' ? window.innerHeight : 800
      if (rect.top < viewportH * 0.9) el.classList.add('in-view')
    }

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            revealObserver.unobserve(entry.target)
          }
        })
      }, { root: null, rootMargin: '0px 0px -5% 0px', threshold: 0.1 })

      toReveal.forEach(el => {
        markIfVisible(el)
        revealObserver.observe(el)
      })

      return () => revealObserver.disconnect()
    } else {
      // Pas d'IO: afficher directement
      toReveal.forEach(el => el.classList.add('in-view'))
    }
  }, [])

  return (
    <>
      <Header />
      <div className="starfield" id="starfield"></div>

      <main>
        <div className="hero-wrapper">
          <section className="hero">
            <video className="hero-video" autoPlay muted loop playsInline>
              <source src="/videos/Stars In The Galaxy Nebula.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo.
            </video>
            <div className="hero-overlay"></div>
            <div className="hero-transition"></div>
            <div className="hero-fade"></div>

            <h1>
              Capture the <span className="gradient-text">Universe</span>
            </h1>
            <p className="hero-subtitle">
              Rent world-class telescopes under Bortle 1 skies.<br />
              Professional astrophotography made accessible <span style={{ color: '#FCA311' }}>Telescope from $69/night • Datasets from $45</span>.
            </p>
            <div className="hero-cta">
              <Link href="#pricing" className="btn-primary">View Telescope Plans</Link>
              <Link href="/astrophotography-dataset" className="btn-secondary">Browse Datasets</Link>
            </div>
          </section>
        </div>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">$99</div>
              <div className="stat-label">Per Full Night</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">Bortle 1</div>
              <div className="stat-label">Darkest Skies</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">Next Day</div>
              <div className="stat-label">Image Delivery</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">Pro Grade</div>
              <div className="stat-label">Equipment</div>
            </div>
          </div>
        </section>

        <section>
          <p style={{ fontSize: '1.1rem', color: '#d0d0d0', lineHeight: '1.8', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
            Discovering professional astrophotography has never been more accessible.<br /><br />

            Our <strong>online telescope rental service</strong> provides remote access to world-class equipment located under pristine Bortle 1 skies.<br /><br />

            <strong style={{ color: '#FCA311' }}>From 69$ per night</strong>, you can capture stunning galaxies, nebulae, and star clusters with the same quality as professional observatories.<br /><br />

            No need to invest thousands in equipment or battle urban light pollution—<br />
            <strong>start your astrophotography journey today</strong> with full control from your home.
          </p>
        </section>

        <section id="features">
          <h2>Professional Equipment You&apos;ll <span className="gradient-text">Control</span></h2>
          <p className="section-subtitle">
            Access to cutting-edge astrophotography equipment worth $18,500+ in pristine dark sky conditions
          </p>

          <div className="specs-container">
            <h3 style={{ color: '#FFA500', fontSize: '1.5rem', marginBottom: '2rem', borderBottom: '2px solid #FFA500', paddingBottom: '0.5rem' }}>Raw FITS Files Specifications</h3>

            <div className="specs-grid">
              <div className="spec-item">
                <div className="spec-icon">✓</div>
                <div className="spec-content">
                  <h3>Telescope</h3>
                  <p>SkyWatcher Esprit 100ED<br />Focal length: 550mm (f/5.5)<br />Apochromatic refractor for maximum sharpness</p>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-icon">✓</div>
                <div className="spec-content">
                  <h3>Camera</h3>
                  <p>QHY600M Pro Cooled<br />Resolution: 61MP (9576×6388 pixels)<br />Sony IMX571 sensor<br />Cooling: -20°C below ambient</p>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-icon">✓</div>
                <div className="spec-content">
                  <h3>Mount</h3>
                  <p>iOptron CEM70<br />Payload: 70 lbs<br />Precision autoguiding system<br />Sub-arcsecond tracking accuracy</p>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-icon">✓</div>
                <div className="spec-content">
                  <h3>Filters</h3>
                  <p>7-position automated filter wheel<br />LRGB + Ha, OIII, SII narrowband<br />2&quot; premium optical glass</p>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-icon">✓</div>
                <div className="spec-content">
                  <h3>Format</h3>
                  <p>16-bit FITS format<br />Full calibration frames included<br />Dark, flat, bias frames provided<br />Compatible with PixInsight, Photoshop</p>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-icon">✓</div>
                <div className="spec-content">
                  <h3>Data Delivery</h3>
                  <p>4+ GB raw data per session<br />Next-day secure download<br />Optional pre-stacked master files<br />Professional calibration included</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>Why Bortle 1 Skies <span className="gradient-text">Matter</span></h2>
          <p className="section-subtitle bortle-subtitle">
            Bortle 1 is the darkest sky rating on Earth — zero light pollution,<br />
            7,500+ visible stars, and pristine conditions impossible to find in<br />
            cities or suburbs. The difference between Bortle 1 and urban skies<br />
            isn&apos;t just visible—it&apos;s measurable and transformative for your<br />
            astrophotography results.
          </p>

          <table className="comparison-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Bortle 1 (Our Site)</th>
                <th>Bortle 6 (Suburban)</th>
                <th>Your Gain</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Limiting Magnitude</strong></td>
                <td>21.7 mag/arcsec²</td>
                <td>19.1 mag/arcsec²</td>
                <td className="gain-highlight">+2.6 mag</td>
              </tr>
              <tr>
                <td><strong>Nebula Contrast</strong></td>
                <td>Excellent</td>
                <td>Poor</td>
                <td className="gain-highlight">+400%</td>
              </tr>
              <tr>
                <td><strong>Background Noise</strong></td>
                <td>180 ADU</td>
                <td>1200 ADU</td>
                <td className="gain-highlight">-85%</td>
              </tr>
              <tr>
                <td><strong>Required Exposure</strong></td>
                <td>30 minutes</td>
                <td>3+ hours</td>
                <td className="gain-highlight">-80% time</td>
              </tr>
              <tr>
                <td><strong>Visible Deep-Sky Objects</strong></td>
                <td>7,500+</td>
                <td>~600</td>
                <td className="gain-highlight">12× more targets</td>
              </tr>
            </tbody>
          </table>

          <p style={{ color: '#d0d0d0', marginTop: '2rem', textAlign: 'center', fontSize: '1.05rem' }}>
            These numbers translate to real results: you&apos;ll capture in 30 minutes what would take 3+ hours in suburban locations, with details impossible to obtain under light-polluted skies.
          </p>
        </section>

        <section>
          <h2>Why Choose <span className="gradient-text">SkyShare</span></h2>
          <p className="section-subtitle">Professional astrophotography without the complexity</p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">★</div>
              <h3>Bortle 1 Skies</h3>
              <p>Access the darkest skies on Earth with zero light pollution for pristine astrophotography results. From 21-22 mag/arcsec^2, making this a true dark sky location. The site averages 240 clear nights per year.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">$</div>
              <h3>Affordable Pricing</h3>
              <p>Full night access for just $99—the price others charge per hour. No hidden fees, no equipment maintenance costs. Professional-grade results without the $18,500+ equipment investment.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">▶</div>
              <h3>Fast Delivery</h3>
              <p>Book in minutes, get your images the next day. Receive professional FITS files and calibration frames within 24 hours, ready for processing.</p>
            </div>
          </div>
        </section>

        <section className="dual-offers">
          <div className="dual-offers-inner">
            <h2>Two Ways to Capture the <span className="gradient-text">Universe</span></h2>
            <p className="section-subtitle">Choose your path: rent our telescope for custom captures, or download ready datasets instantly</p>

            <div className="offers-grid">
              <div className="offer-card offer-rent">
                <div className="offer-badge">Most Popular</div>

                <div className="offer-header-space">
                  <h3 className="offer-title">Rent Telescope</h3>
                  <p className="offer-desc">Control our professional equipment remotely. Choose your targets, customize exposures, receive raw FITS data the&nbsp;next&nbsp;day.</p>
                </div>

                <div className="offer-price">
                  <span className="price-main">From $69</span>
                  <span className="price-sub">/night</span>
                </div>

                <ul className="offer-features">
                  <li>Choose your own targets</li>
                  <li>Full control over exposures</li>
                  <li>All filters (LRGB, Ha, OIII, SII)</li>
                  <li>Raw FITS + calibration frames</li>
                  <li>Weather guarantee included</li>
                </ul>

                <Link href="#pricing" className="btn-primary offer-btn">View Telescope Plans</Link>
              </div>

              <div className="offer-card offer-datasets">
                <div className="offer-header-space">
                  <h3 className="offer-title alt">Buy Ready Datasets</h3>
                  <p className="offer-desc">Instant access to pre-captured deep-sky data. Download calibrated FITS files and start processing immediately. No weather delays.</p>
                </div>

                <div className="offer-price">
                  <span className="price-main">From $45</span>
                  <span className="price-sub">/dataset</span>
                </div>

                <ul className="offer-features alt">
                  <li>Instant download (no waiting)</li>
                  <li>2,500+ objects available</li>
                  <li>Pre-calibrated & stacked files</li>
                  <li>Multiple integration times</li>
                  <li>Commercial license included</li>
                </ul>

                <Link href="/astrophotography-dataset" className="btn-secondary offer-btn">Browse Dataset Library</Link>
              </div>
            </div>

            <div className="offer-help">
              <h3>Not sure which option is right for you?</h3>
              <p>
                <strong style={{ color: '#FCA311' }}>Rent a telescope</strong> if you want to choose specific targets and have full creative control over your imaging session.<br />
                <strong style={{ color: '#FCA311' }}>Buy datasets</strong> if you need instant results, want to practice processing techniques, or can&apos;t wait for weather conditions.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2>Simple 3-Step <span className="gradient-text">Process</span></h2>

          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Book Your Night</h3>
              <p>Select your date and submit your target preferences in a few clicks. Our intelligent booking system shows real-time weather forecasts, moon phase data, and optimal observation windows for your chosen objects.</p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>We Capture</h3>
              <p>Our team operates the telescope to acquire the best deep-sky data under optimal conditions. Your session includes automatic flat field correction, precision autoguiding for sub-arcsecond tracking, and multi-filter imaging sequences.</p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Your Data</h3>
              <p>Receive all raw frames and calibration files ready to stack. Download includes 16-bit FITS files organized by filter, complete dark/flat/bias library, and optional pre-stacked master files in LRGB or SHO palette.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Real <span className="gradient-text">Results</span></h2>
          <p className="section-subtitle">What our clients achieve with SkyShare Astro</p>

          <div className="testimonial-card">
            <div className="testimonial-content">
              &quot;My first session on M42 with SkyShare revealed details I&apos;d never seen with my 8-inch telescope in the city. The Trapezium central region showed 6 distinct stars, and dust clouds appeared with incredible clarity. The data quality is simply exceptional—professional-grade results without the professional-grade investment.&quot;
            </div>
            <div className="testimonial-author">
              <div className="author-info">— Marc D., Amateur Astrophotographer</div>
              <div className="testimonial-metric">SNR 247 on M42 in 45 minutes</div>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              &quot;I use SkyShare for my commercial astrophotography projects. The consistent quality and ease of use save me tremendous time. My clients love the large-format prints, and the Bortle 1 data produces gallery-quality results every time.&quot;
            </div>
            <div className="testimonial-author">
              <div className="author-info">— Sarah L., Professional Photographer</div>
              <div className="testimonial-metric">ROI 800%</div>
            </div>
          </div>
        </section>

        <section id="faq">
          <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p className="section-subtitle">Everything you need to know about renting telescopes online</p>

          <div className="faq-container">
            <div className="faq-item">
              <div className="faq-question">
                How much does online telescope rental cost?
                <span>+</span>
              </div>
              <div className="faq-answer">
                $99 per night gives you 6 hours of continuous access to professional equipment, including all raw FITS data and calibration frames. There are no hidden fees or hourly charges.
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                Do I need prior astrophotography experience?
                <span>+</span>
              </div>
              <div className="faq-answer">
                No prior experience required. Our interface simplifies the technical complexity—simply choose your target from our catalog of 500+ objects, and our team handles telescope operation, focusing, guiding, and data acquisition.
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                What happens if weather conditions are poor?
                <span>+</span>
              </div>
              <div className="faq-answer">
                Free automatic rescheduling with no penalties. Our predictive weather system monitors conditions 48 hours in advance and alerts you if your session needs rescheduling.
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                What file formats will I receive?
                <span>+</span>
              </div>
              <div className="faq-answer">
                All raw light frames in 16-bit FITS format, organized by filter (LRGB, Ha, OIII, SII). Each session includes complete calibration libraries and is compatible with all major processing software.
              </div>
            </div>

            <div className="faq-item">
              <div className="faq-question">
                Can I buy pre-captured astrophotography data?
                <span>+</span>
              </div>
              <div className="faq-answer">
                Yes! Browse our library of deep-sky datasets starting at $45. Each dataset includes calibrated FITS files with multiple integration times. Instant download, no weather delays. Perfect for practicing processing techniques or accessing rare objects.
              </div>
            </div>
          </div>

          {/* Bouton vers la FAQ complète */}
          <div className="faq-cta">
            <Link href="/faq" className="btn-secondary">
              More Questions? View Complete FAQ
              <span className="icon-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"/>
                </svg>
              </span>
            </Link>
            <p style={{ marginTop: '0.9rem', color: '#D8D8D8', fontSize: '1rem' }}>
              Explore 20+ answers on booking, equipment specs, weather policy & technical support
            </p>
          </div>
        </section>

        <section id="pricing">
          <h2>Simple, Transparent <span className="gradient-text">Pricing</span></h2>
          <p className="section-subtitle">Professional astrophotography accessible to everyone</p>

          <div className="home-pricing-grid">
            <div className="home-price-card">
              <div className="home-plan">Student</div>
              <div className="home-price">$69 <span className="home-per">/night</span></div>
              <ul className="home-features">
              <li>Full night imaging</li>
                <li>All filters included</li>
                <li>Raw FITS data</li>
                <li>Delivery within 24h</li>
                <li>Exclusive student rate</li>
              </ul>
              <Link href="/pricing" className="btn-primary">Select This Plan</Link>
            </div>

            <div className="home-price-card">
              <div className="home-plan">Discovery</div>
              <div className="home-price">$79 <span className="home-per">/night</span></div>
              <ul className="home-features">
                <li>Full night imaging</li>
                <li>All filters included</li>
                <li>Raw FITS data</li>
                <li>Delivery within 24h</li>
                <li>New customer offer</li>
              </ul>
              <Link href="/pricing" className="btn-primary">Select This Plan</Link>
            </div>

            <div className="home-price-card">
              <div className="home-plan">Standard</div>
              <div className="home-price">$99 <span className="home-per">/night</span></div>
              <ul className="home-features">
                <li>Full night imaging</li>
                <li>All filters included</li>
                <li>Raw FITS data</li>
                <li>Delivery within 24h</li>
              </ul>
              <Link href="/pricing" className="btn-primary">Select This Plan</Link>
            </div>

            <div className="home-price-card">
              <div className="home-plan">New Moon</div>
              <div className="home-price">$129 <span className="home-per">/night</span></div>
              <ul className="home-features">
                <li>Full night imaging</li>
                <li>All filters included</li>
                <li>Raw FITS data</li>
                <li>Delivery within 24h</li>
                <li>New moon nights</li>
                <li>Maximum darkness</li>
              </ul>
              <Link href="/pricing" className="btn-primary">Select This Plan</Link>
            </div>
          </div>
        </section>

        <section className="cta-section" id="book">
          <h2>Ready to Capture Your First <span className="gradient-text">Galaxy</span>?</h2>
          <p>Your perfect night under the stars is just a click away. Join hundreds of astrophotographers discovering the universe through SkyShare Astro.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="https://www.skyshare-astro.com/book-telescope-time/" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Book Your Night Now</Link>
            <Link href="/astrophotography-dataset" className="btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>Browse Datasets</Link>
          </div>
          <p style={{ marginTop: '2rem', fontSize: '0.95rem', color: '#808080' }}>
            🌟 Instant booking • ☁️ Weather guarantees • 📸 Next-day delivery • 💯 Satisfaction guaranteed
          </p>
        </section>
      </main>
      <Footer />
      <Script id="faq-schema" type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How much does online telescope rental cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "$99 per night gives you 6 hours of continuous access to professional equipment, including all raw FITS data and calibration frames. There are no hidden fees or hourly charges."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need prior astrophotography experience?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No prior experience required. Our interface simplifies the technical complexity—simply choose your target from our catalog of 500+ objects, and our team handles telescope operation, focusing, guiding, and data acquisition."
                }
              },
              {
                "@type": "Question",
                "name": "What happens if weather conditions are poor?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Free automatic rescheduling with no penalties. Our predictive weather system monitors conditions 48 hours in advance and alerts you if your session needs rescheduling."
                }
              },
              {
                "@type": "Question",
                "name": "What file formats will I receive?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "All raw light frames in 16-bit FITS format, organized by filter (LRGB, Ha, OIII, SII). Each session includes complete calibration libraries and is compatible with all major processing software."
                }
              },
              {
                "@type": "Question",
                "name": "Can I buy pre-captured astrophotography data?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Browse our library of deep-sky datasets starting at $45. Each dataset includes calibrated FITS files with multiple integration times. Instant download, no weather delays. Perfect for practicing processing techniques or accessing rare objects."
                }
              }
            ]
          }
        `}
      </Script>
    </>
  )
}
