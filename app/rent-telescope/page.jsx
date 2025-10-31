'use client'

import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function RentTelescope() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [calendarDays, setCalendarDays] = useState([])

  const getMoonPhases = (month, year) => {
    return {
      newMoon: [5, 20],
      fullMoon: [12, 27],
      firstQuarter: [9],
      lastQuarter: [16]
    }
  }

  const getWeatherForecast = (day) => {
    const conditions = [
      { clouds: 10, seeing: 'Excellent', temp: '15°C' },
      { clouds: 25, seeing: 'Good', temp: '12°C' },
      { clouds: 50, seeing: 'Average', temp: '18°C' },
      { clouds: 75, seeing: 'Poor', temp: '20°C' }
    ]
    return conditions[Math.floor(Math.random() * conditions.length)]
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

  const getDayStatus = (date, phases) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (date < today) return 'past'
    if (date.getTime() - today.getTime() < 86400000) return 'unavailable'
    
    const random = Math.random()
    if (random > 0.8) return 'booked'
    if (random > 0.3) return 'available'
    return 'unavailable'
  }

  const renderCalendar = () => {
    const phases = getMoonPhases(currentMonth, currentYear)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push({ type: 'empty', key: `empty-${i}` })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const status = getDayStatus(date, phases)
      const moonPhase = getMoonPhase(day, phases)
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
    const phases = getMoonPhases(currentMonth, currentYear)
    const firstDay = new Date(currentYear, currentMonth, 1).getDay()
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const days = []

    for (let i = 0; i < firstDay; i++) {
      days.push({ type: 'empty', key: `empty-${i}` })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const status = getDayStatus(date, phases)
      const moonPhase = getMoonPhase(day, phases)
      const weather = getWeatherForecast(day)
      days.push({ type: 'day', day, date, status, moonPhase, weather, key: `day-${day}` })
    }

    setCalendarDays(days)
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
    setSelectedDate({ day, date, moonPhase, weather })
  }

  const selectPackage = (packageName, price) => {
    setSelectedPackage(packageName)
    setSelectedPrice(price)
  }

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']
  
  const phases = getMoonPhases(currentMonth, currentYear)

  return (
    <>
      <div className="starfield" id="starfield"></div>
      <Header />
      
      <div className="container">
        <div className="page-header">
          <h1>🌌 Reserve Your Telescope Night</h1>
          <p>Select a date on the calendar to book your observation session</p>
        </div>
        
        <div className="main-content">
          <div className="calendar-section">
            <div className="calendar-header">
              <div className="month-display">{months[currentMonth]} {currentYear}</div>
              <div className="calendar-nav">
                <button className="nav-btn" onClick={previousMonth}>←</button>
                <button className="nav-btn" onClick={nextMonth}>→</button>
              </div>
            </div>
            
            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="day-header">{day}</div>
              ))}
              {calendarDays.map((item) => {
                if (item.type === 'empty') {
                  return <div key={item.key} className="calendar-day disabled"></div>
                }
                const { day, date, status, moonPhase, weather } = item
                let weatherIcon = ''
                if (weather.clouds < 30) weatherIcon = '☀️'
                else if (weather.clouds < 60) weatherIcon = '⛅'
                else weatherIcon = '☁️'
                
                return (
                  <div
                    key={item.key}
                    className={`calendar-day ${status} ${selectedDate?.day === day ? 'selected' : ''}`}
                    onClick={() => status === 'available' && selectDate(day, date, moonPhase, weather)}
                  >
                    <div className="day-number">{day}</div>
                    <div className="moon-phase">{moonPhase}</div>
                    <div className="weather-icon">{weatherIcon}</div>
                    <div className="day-status">
                      {status === 'available' ? 'Available' : status === 'booked' ? 'Booked' : 'Unavailable'}
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="calendar-legend">
              <div className="legend-item">
                <div className="legend-icon available"></div>
                <span>Available</span>
              </div>
              <div className="legend-item">
                <div className="legend-icon booked"></div>
                <span>Fully Booked</span>
              </div>
              <div className="legend-item">
                <div className="legend-icon unavailable"></div>
                <span>Unavailable</span>
              </div>
              <div className="legend-item">
                <span style={{ fontSize: '1.5em' }}>🌑</span>
                <span>New Moon</span>
              </div>
              <div className="legend-item">
                <span style={{ fontSize: '1.5em' }}>🌕</span>
                <span>Full Moon</span>
              </div>
            </div>
          </div>
          
          <div className="sidebar">
            <div className="info-card">
              <div className="card-title">📅 Selected Date</div>
              <div className="selection-display">
                <div className="selection-label">Date</div>
                <div className="selection-value">
                  {selectedDate ? `${months[selectedDate.date.getMonth()]} ${selectedDate.day}, ${selectedDate.date.getFullYear()}` : 'No date selected'}
                </div>
                <div className="selection-label">Moon Phase</div>
                <div className="selection-value">{selectedDate?.moonPhase || '-'}</div>
              </div>
              
              <div className="weather-widget">
                <div className="weather-title">🌤️ Weather Forecast</div>
                <div style={{ color: '#b0b0b0' }}>
                  {selectedDate ? (
                    <>
                      <div style={{ margin: '10px 0' }}>☁️ Cloud coverage: <strong style={{ color: '#fff' }}>{selectedDate.weather.clouds}%</strong></div>
                      <div style={{ margin: '10px 0' }}>👁️ Seeing: <strong style={{ color: '#fff' }}>{selectedDate.weather.seeing}</strong></div>
                      <div style={{ margin: '10px 0' }}>🌡️ Temperature: <strong style={{ color: '#fff' }}>{selectedDate.weather.temp}</strong></div>
                      {selectedDate.weather.clouds < 30 && <div style={{ color: '#4CAF50', fontWeight: 'bold', marginTop: '15px' }}>✓ Excellent conditions!</div>}
                    </>
                  ) : (
                    'Select a date to see forecast'
                  )}
                </div>
              </div>
            </div>
            
            <div className="info-card">
              <div className="card-title">📦 Choose Package</div>
              <div className="package-selector">
                <div className={`package-option ${selectedPackage === 'discovery' ? 'selected' : ''}`} onClick={() => selectPackage('discovery', 79)}>
                  <div>
                    <div className="package-name">Discovery</div>
                    <div style={{ fontSize: '0.85em', color: '#b0b0b0' }}>First-time users</div>
                  </div>
                  <div className="package-price">$79</div>
                </div>
                
                <div className={`package-option ${selectedPackage === 'standard' ? 'selected' : ''}`} onClick={() => selectPackage('standard', 99)}>
                  <div>
                    <div className="package-name">Standard ⭐</div>
                    <div style={{ fontSize: '0.85em', color: '#b0b0b0' }}>Most popular</div>
                  </div>
                  <div className="package-price">$99</div>
                </div>
                
                <div className={`package-option ${selectedPackage === 'student' ? 'selected' : ''}`} onClick={() => selectPackage('student', 69)}>
                  <div>
                    <div className="package-name">Student 🎓</div>
                    <div style={{ fontSize: '0.85em', color: '#b0b0b0' }}>Valid ID required</div>
                  </div>
                  <div className="package-price">$69</div>
                </div>
                
                <div className={`package-option ${selectedPackage === 'newmoon' ? 'selected' : ''}`} onClick={() => selectPackage('newmoon', 129)}>
                  <div>
                    <div className="package-name">New Moon 🌑</div>
                    <div style={{ fontSize: '0.85em', color: '#b0b0b0' }}>Darkest nights</div>
                  </div>
                  <div className="package-price">$129</div>
                </div>
              </div>
            </div>
            
            <div className="info-card">
              <div className="card-title">🌙 Moon Phases This Month</div>
              <div className="moon-phases-guide">
                <div className="moon-guide-item">
                  <div className="moon-guide-icon">🌑</div>
                  <div className="moon-guide-label">New Moon</div>
                  <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>{phases.newMoon.join(', ')}</div>
                </div>
                <div className="moon-guide-item">
                  <div className="moon-guide-icon">🌓</div>
                  <div className="moon-guide-label">First Quarter</div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>{phases.firstQuarter.join(', ')}</div>
                </div>
                <div className="moon-guide-item">
                  <div className="moon-guide-icon">🌕</div>
                  <div className="moon-guide-label">Full Moon</div>
                  <div style={{ fontWeight: 'bold', color: '#e74c3c' }}>{phases.fullMoon.join(', ')}</div>
                </div>
                <div className="moon-guide-item">
                  <div className="moon-guide-icon">🌗</div>
                  <div className="moon-guide-label">Last Quarter</div>
                  <div style={{ fontWeight: 'bold', color: '#fff' }}>{phases.lastQuarter.join(', ')}</div>
                </div>
              </div>
            </div>
            
            <button
              className="book-button"
              disabled={!selectedDate || !selectedPackage}
              onClick={() => {
                if (selectedDate && selectedPackage) {
                  alert(`Booking ${selectedPackage} for ${months[selectedDate.date.getMonth()]} ${selectedDate.day}, ${selectedDate.date.getFullYear()} - $${selectedPrice}`)
                }
              }}
            >
              {selectedDate && selectedPackage
                ? `Book ${selectedPackage.charAt(0).toUpperCase() + selectedPackage.slice(1)} - $${selectedPrice} →`
                : 'Select Date & Package to Continue'}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

