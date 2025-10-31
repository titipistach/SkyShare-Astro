'use client'

import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import styles from './rent-telescope.module.css'

export default function RentTelescope() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [calendarDays, setCalendarDays] = useState([])
  const [weatherByDay, setWeatherByDay] = useState({})

  // COORDONNÉES OBSERVATOIRE (fournies)
  const LAT = 31.547182
  const LON = -99.382293

  // Moon phase (emoji) from actual date using synodic cycle
  const getMoonEmoji = (date) => {
    const synodic = 29.530588853
    const knownNewMoon = new Date(Date.UTC(2000, 0, 6, 18, 14)) // Jan 6, 2000 18:14 UTC
    const days = (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - knownNewMoon.getTime()) / 86400000
    const phase = ((days % synodic) + synodic) % synodic
    const frac = phase / synodic
    // 8-phase mapping
    if (frac < 0.0625) return '🌑'
    if (frac < 0.1875) return '🌒'
    if (frac < 0.3125) return '🌓'
    if (frac < 0.4375) return '🌔'
    if (frac < 0.5625) return '🌕'
    if (frac < 0.6875) return '🌖'
    if (frac < 0.8125) return '🌗'
    if (frac < 0.9375) return '🌘'
    return '🌑'
  }

  const getWeatherForecast = (day) => {
    const data = weatherByDay[day]
    if (!data) return { clouds: null, seeingIdx: null, transparencyIdx: null, temp: '-' }
    const { clouds, seeingIdx = null, transparencyIdx = null } = data

    return { clouds, seeingIdx, transparencyIdx, temp: '-' }
  }

  // Liste des jours du mois correspondant aux 4 phases principales
  const getMonthPhases = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const res = { newMoon: [], firstQuarter: [], fullMoon: [], lastQuarter: [] }
    for (let d = 1; d <= daysInMonth; d++) {
      const emoji = getMoonEmoji(new Date(year, month, d))
      if (emoji === '🌑') res.newMoon.push(d)
      else if (emoji === '🌓') res.firstQuarter.push(d)
      else if (emoji === '🌕') res.fullMoon.push(d)
      else if (emoji === '🌗') res.lastQuarter.push(d)
    }
    return res
  }

  const getMoonPhase = (day, phases) => {
    if (phases.newMoon.includes(day)) return '🌑'
    if (phases.fullMoon.includes(day)) return '🌕'
    if (phases.firstQuarter.includes(day)) return '🌓'
    if (phases.lastQuarter.includes(day)) return '🌗'
    
    const cycle = day % 30
    if (cycle < 7) return '🌒'
    if (cycle < 14) return '🌓'
    if (cycle < 21) return '🌔'
    if (cycle < 28) return '🌗'
    return '🌘'
  }

  const getDayStatus = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return 'past'
    if (date.getTime() - today.getTime() < 86400000) return 'unavailable'
    // Statut métier indépendant de la météo (exemple simple: aléatoire contrôlé)
    const r = Math.random()
    if (r > 0.8) return 'booked'      // quelques jours déjà réservés
    if (r > 0.3) return 'available'   // majorité disponibles
    return 'unavailable'              // certains jours masqués par l'opérateur
  }

  const renderCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push({ type: 'empty', key: `empty-${i}` })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const status = getDayStatus(date)
      const moonPhase = getMoonEmoji(date)
      const weather = getWeatherForecast(day)
      days.push({ type: 'day', day, date, status, moonPhase, weather, key: `day-${day}` })
    }

    setCalendarDays(days)
  }

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
  }, [])

  useEffect(() => {
    renderCalendar()
  }, [currentMonth, currentYear])

  // Récupère la couverture nuageuse (et seeing dispo) via 7Timer! astro
  useEffect(() => {
    // 7Timer! JSON: http://www.7timer.info/bin/astro.php?lon=...&lat=...&ac=0&unit=metric&output=json&tzshift=0
    const url = `https://www.7timer.info/bin/astro.php?lon=${LON}&lat=${LAT}&ac=0&unit=metric&output=json&tzshift=0`

    let cancelled = false
    fetch(url)
      .then(res => res.json())
      .then(json => {
        if (cancelled) return
        const map = {}
        const init = json?.init // e.g. "2025103100"
        const series = json?.dataseries || []
        if (init && series.length) {
          const initDate = new Date(
            Number(init.slice(0, 4)),
            Number(init.slice(4, 6)) - 1,
            Number(init.slice(6, 8)),
            Number(init.slice(8, 10))
          )

          // Agréger par jour du mois courant
          const perDay = {}
          series.forEach((p) => {
            // timepoint = heures après init
            const d = new Date(initDate.getTime() + p.timepoint * 60 * 60 * 1000)
            if (d.getFullYear() !== currentYear || d.getMonth() !== currentMonth) return
            const day = d.getDate()
            // 7Timer cloudcover 0..9 -> approx %
            const cloudsPct = Math.round((Number(p.cloudcover) / 9) * 100)
            const seeing = p.seeing != null ? Number(p.seeing) : null
            const transparency = p.transparency != null ? Number(p.transparency) : null
            if (!perDay[day]) perDay[day] = { sumClouds: 0, n: 0, sumSeeing: 0, nSeeing: 0, sumTransp: 0, nTransp: 0 }
            perDay[day].sumClouds += cloudsPct
            perDay[day].n += 1
            if (seeing != null) { perDay[day].sumSeeing += seeing; perDay[day].nSeeing += 1 }
            if (transparency != null) { perDay[day].sumTransp += transparency; perDay[day].nTransp += 1 }
          })

          Object.keys(perDay).forEach((k) => {
            const day = Number(k)
            const avgClouds = Math.round(perDay[k].sumClouds / Math.max(perDay[k].n, 1))
            const avgSeeing = perDay[k].nSeeing ? Math.round(perDay[k].sumSeeing / perDay[k].nSeeing) : null
            const avgTransp = perDay[k].nTransp ? Math.round(perDay[k].sumTransp / perDay[k].nTransp) : null
            map[day] = { clouds: avgClouds, seeingIdx: avgSeeing, transparencyIdx: avgTransp }
          })
        }
        setWeatherByDay(map)
      })
      .catch(() => setWeatherByDay({}))

    return () => { cancelled = true }
  }, [currentMonth, currentYear])

  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const selectDate = (day, date, moonPhase, weather) => {
    // Interdit: Student sur New Moon → ne pas sélectionner
    if (selectedPackage === 'student' && moonPhase === '🌑') {
      return
    }

    setSelectedDate({ day, date, moonPhase, weather })
    if (moonPhase === '🌑') {
      setSelectedPackage('newmoon')
      setSelectedPrice(129)
    }
  }

  const selectPackage = (packageName, price) => {
    setSelectedPackage(packageName)
    setSelectedPrice(price)
    // Si Student et une date est sélectionnée, marquer cette date en Pending
    if (packageName === 'student' && selectedDate?.day) {
      // Si la date courante est New Moon, on annule la sélection de date
      if (selectedDate.moonPhase === '🌑') {
        setSelectedDate(null)
        return
      }
    }
  }

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  
  const phases = getMonthPhases(currentYear, currentMonth)

  return (
    <>
      <div className="starfield" id="starfield"></div>
      <Header />
      
      <div className={`container ${styles.rentPage}`}>
        <div className={styles.pageHeader}>
          <h1>🌌 Reserve Your Telescope Night</h1>
          <p>Select a date on the calendar to book your observation session</p>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.calendarSection}>
            <div className={styles.calendarHeader}>
              <div className={styles.monthDisplay}>{months[currentMonth]} {currentYear}</div>
              <div className={styles.calendarNav}>
                <button className={styles.navBtn} onClick={previousMonth}>←</button>
                <button className={styles.navBtn} onClick={nextMonth}>→</button>
              </div>
            </div>
            
            <div className={styles.calendarGrid}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className={styles.dayHeader}>{day}</div>
              ))}
              {calendarDays.map((item) => {
                if (item.type === 'empty') {
                  return <div key={item.key} className={styles.calendarDay}></div>
                }
                const { day, date, status, moonPhase, weather } = item
                let weatherIcon = '—'
                if (weather.clouds === null || weather.clouds === undefined) {
                  weatherIcon = '—'
                } else if (weather.clouds < 30) weatherIcon = '☀️'
                else if (weather.clouds < 60) weatherIcon = '⛅'
                else weatherIcon = '☁️'
                
                return (
                  <div
                    key={item.key}
                    className={`${styles.calendarDay} ${styles[status]} ${selectedDate?.day === day ? styles.selected : ''}`}
                    onClick={() => status === 'available' && selectDate(day, date, moonPhase, weather)}
                  >
                    {moonPhase === '🌑' && (
                      <div className={styles.newMoonTag}>New Moon</div>
                    )}
                    <div className={styles.dayNumber}>{day}</div>
                    <div className={styles.moonPhase}>{moonPhase}</div>
                    <div className={styles.weatherIcon}>{weatherIcon}</div>
                    <div className={styles.dayStatus}>
                      {status === 'available' ? 'Available' : status === 'booked' ? 'Booked' : 'Unavailable'}
                    </div>
                  </div>
                )
              })}
            </div>
            
              <div className={styles.calendarLegend}>
              <div className={styles.legendItem}>
                <div className={styles.legendIcon + ' ' + styles.legendIconAvailable}></div>
                <span>Available</span>
              </div>
              <div className={styles.legendItem}>
                <div className={styles.legendIcon + ' ' + styles.legendIconBooked}></div>
                <span>Fully Booked</span>
              </div>
                <div className={styles.legendItem}>
                  <div className={styles.legendIcon} style={{ background: '#FFC107' }}></div>
                  <span>Pending</span>
                </div>
              <div className={styles.legendItem}>
                <div className={styles.legendIcon + ' ' + styles.legendIconUnavailable}></div>
                <span>Unavailable</span>
              </div>
              <div className={styles.legendItem}>
                <span style={{ fontSize: '1.5em' }}>🌑</span>
                <span>New Moon</span>
              </div>
              <div className={styles.legendItem}>
                <span style={{ fontSize: '1.5em' }}>🌕</span>
                <span>Full Moon</span>
              </div>
            </div>
          </div>
          
          <div className={styles.sidebar}>
            <div className={styles.infoCard}>
              <div className={styles.cardTitle}>📅 Selected Date</div>
              <div className={styles.selectionDisplay}>
                <div className={styles.selectionLabel}>Date</div>
                <div className={styles.selectionValue}>
                  {selectedDate ? `${months[selectedDate.date.getMonth()]} ${selectedDate.day}, ${selectedDate.date.getFullYear()}` : 'No date selected'}
                </div>
                <div className={styles.selectionLabel}>Moon Phase</div>
                <div className={styles.selectionValue}>{selectedDate?.moonPhase || '-'}</div>
              </div>
              
              <div className="weather-widget">
                <div className="weather-title">🌤️ Weather Forecast</div>
                <div style={{ color: '#b0b0b0' }}>
                  {selectedDate ? (
                    <>
                      {selectedDate.weather.clouds == null ? (
                        <div style={{ margin: '10px 0', color: '#aaa' }}>Not available yet</div>
                      ) : (
                        <>
                          <div style={{ margin: '10px 0' }}>☁️ Cloud coverage: <strong style={{ color: '#fff' }}>{selectedDate.weather.clouds}%</strong></div>
                          <div style={{ margin: '10px 0' }}>👁️ Seeing (1–5): <strong style={{ color: '#fff' }}>{selectedDate.weather.seeingIdx ?? '-'}</strong></div>
                          <div style={{ margin: '10px 0' }}>🔎 Transparency (1–5): <strong style={{ color: '#fff' }}>{selectedDate.weather.transparencyIdx ?? '-'}</strong></div>
                        </>
                      )}
                      <div style={{ margin: '10px 0' }}>🌡️ Temperature: <strong style={{ color: '#fff' }}>{selectedDate.weather.temp}</strong></div>
                      {selectedDate.weather.clouds < 30 && <div style={{ color: '#4CAF50', fontWeight: 'bold', marginTop: '15px' }}>✓ Excellent conditions!</div>}
                    </>
                  ) : (
                    'Select a date to see forecast'
                  )}
                </div>
              </div>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.cardTitle}>📦 Choose Package</div>
              <div className={styles.packageSelector}>
                {(() => {
                  const isNewMoonDay = selectedDate?.moonPhase === '🌑'
                  return (
                    <>
                      {/* Student */}
                      <div className={`${styles.packageOption} ${selectedPackage === 'student' ? styles.selectedOption : ''} ${isNewMoonDay ? styles.disabledOption : ''}`} onClick={() => !isNewMoonDay && selectPackage('student', 69)}>
                        <div>
                          <div className={styles.packageName}>Student 🎓</div>
                          <div style={{ fontSize: '0.85em', color: '#b0b0b0' }}>Valid ID required</div>
                        </div>
                        <div className={styles.packagePrice}>$69</div>
                      </div>

                      {/* Discovery */}
                      <div className={`${styles.packageOption} ${selectedPackage === 'discovery' ? styles.selectedOption : ''} ${isNewMoonDay ? styles.disabledOption : ''}`} onClick={() => !isNewMoonDay && selectPackage('discovery', 79)}>
                        <div>
                          <div className={styles.packageName}>Discovery</div>
                          <div style={{ fontSize: '0.85em', color: '#b0b0b0' }}>First-time users</div>
                        </div>
                        <div className={styles.packagePrice}>$79</div>
                      </div>

                      {/* Standard */}
                      <div className={`${styles.packageOption} ${selectedPackage === 'standard' ? styles.selectedOption : ''} ${isNewMoonDay ? styles.disabledOption : ''}`} onClick={() => !isNewMoonDay && selectPackage('standard', 99)}>
                        <div>
                          <div className={styles.packageName}>Standard ⭐</div>
                          <div style={{ fontSize: '0.85em', color: '#b0b0b0' }}>Most popular</div>
                        </div>
                        <div className={styles.packagePrice}>$99</div>
                      </div>

                      {/* New Moon */}
                      <div className={`${styles.packageOption} ${selectedPackage === 'newmoon' ? styles.selectedOption : ''}`} onClick={() => selectPackage('newmoon', 129)}>
                        <div>
                          <div className={styles.packageName}>New Moon 🌑</div>
                          <div style={{ fontSize: '0.85em', color: '#b0b0b0' }}>Darkest nights</div>
                        </div>
                        <div className={styles.packagePrice}>$129</div>
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
            
            <div className={styles.infoCard}>
              <div className={styles.cardTitle}>🌙 Moon Phases This Month</div>
              <div className={styles.moonPhasesGuide}>
                <div className={styles.moonGuideItem}>
                  <div className={styles.moonGuideIcon}>🌑</div>
                  <div className={styles.moonGuideLabel}>New Moon</div>
                  <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>{phases.newMoon.join(', ')}</div>
                </div>
                <div className={styles.moonGuideItem}>
                  <div className={styles.moonGuideIcon}>🌓</div>
                  <div className={styles.moonGuideLabel}>First Quarter</div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>{phases.firstQuarter.join(', ')}</div>
                </div>
                <div className={styles.moonGuideItem}>
                  <div className={styles.moonGuideIcon}>🌕</div>
                  <div className={styles.moonGuideLabel}>Full Moon</div>
                  <div style={{ fontWeight: 'bold', color: '#e74c3c' }}>{phases.fullMoon.join(', ')}</div>
                </div>
                <div className={styles.moonGuideItem}>
                  <div className={styles.moonGuideIcon}>🌗</div>
                  <div className={styles.moonGuideLabel}>Last Quarter</div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>{phases.lastQuarter.join(', ')}</div>
                </div>
              </div>
            </div>
            
            {(() => {
              const selStatus = selectedDate ? (calendarDays.find(it => it.type === 'day' && it.day === selectedDate.day)?.status) : null
              const isStudent = selectedPackage === 'student'
              const disable = !selectedDate || !selectedPackage || selStatus === 'pending'
              let label = 'Select Date & Package to Continue'
              if (selectedDate && selectedPackage) {
                if (isStudent) {
                  // Si Student + date choisie: affichage spécifique
                  label = selStatus === 'pending' ? 'Pending verification (Student)' : 'Request Student Verification →'
                } else {
                  label = `Book ${selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} - $${selectedPrice} →`
                }
              }
              return (
                <>
                  <button
                    className={styles.bookButton}
                    disabled={disable}
                    onClick={() => {
                      if (disable) return
                      // Flux Student: cliquer déclenche le Pending et désactive ensuite
                      if (isStudent && selectedDate) {
                        const d = selectedDate.day
                        setCalendarDays(prev => prev.map(it => {
                          if (it.type === 'day' && it.day === d) return { ...it, status: 'pending' }
                          return it
                        }))
                        return
                      }
                      // Flux non-Student: booking normal (placeholder)
                      if (selectedDate && selectedPackage) {
                        alert(`Booking ${selectedPackage} for ${months[selectedDate.date.getMonth()]} ${selectedDate.day}, ${selectedDate.date.getFullYear()} - $${selectedPrice}`)
                      }
                    }}
                  >
                    {label}
                  </button>
                  {isStudent && selStatus === 'pending' && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ color: '#FFC107', fontSize: '.9rem', marginBottom: '6px' }}>
                        Student booking pending verification.
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          style={{ padding: '.5rem .75rem', border: '1px solid rgba(76,175,80,.6)', background: 'rgba(76,175,80,.15)', color: '#8BC34A', cursor: 'pointer' }}
                          onClick={() => {
                            if (!selectedDate) return
                            const d = selectedDate.day
                            setCalendarDays(prev => prev.map(it => {
                              if (it.type === 'day' && it.day === d) return { ...it, status: 'booked' }
                              return it
                            }))
                          }}
                        >Approve</button>
                        <button
                          style={{ padding: '.5rem .75rem', border: '1px solid rgba(160,160,160,.7)', background: 'rgba(160,160,160,.12)', color: '#ddd', cursor: 'pointer' }}
                          onClick={() => {
                            if (!selectedDate) return
                            const d = selectedDate.day
                            setCalendarDays(prev => prev.map(it => {
                              if (it.type === 'day' && it.day === d) return { ...it, status: 'available' }
                              return it
                            }))
                          }}
                        >Deny</button>
                      </div>
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

