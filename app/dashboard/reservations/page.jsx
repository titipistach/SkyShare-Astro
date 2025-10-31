'use client'

import Link from 'next/link'

export default function ReservationsPage() {
  const reservations = [
    {
      id: 1,
      date: 'November 15, 2025',
      target: 'M31 - Andromeda Galaxy',
      plan: 'Standard ($99)',
      filters: 'Ha+OIII+SII',
      status: 'upcoming',
      statusText: 'Upcoming',
      countdown: { days: 12, hours: 5, minutes: 23 }
    },
    {
      id: 2,
      date: 'October 28, 2025',
      target: 'NGC 7000 - North America Nebula',
      plan: 'Discovery ($79)',
      filters: 'LRGB',
      status: 'pending',
      statusText: '⏳ Processing'
    },
    {
      id: 3,
      date: 'October 12, 2025',
      target: 'M42 - Orion Nebula',
      plan: 'Standard ($99)',
      filters: 'Ha+RGB',
      status: 'completed',
      statusText: '✅ Completed',
      downloadSize: '12.3 GB'
    },
    {
      id: 4,
      date: 'October 5, 2025',
      target: 'IC 1396 - Elephant Trunk',
      plan: 'Standard ($99)',
      filters: 'Ha+OIII',
      status: 'completed',
      statusText: '✅ Completed',
      downloadSize: '15.7 GB'
    }
  ]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="page-title">My Reservations</h1>
        <Link href="/rent-telescope" className="btn-primary">New Reservation</Link>
      </div>

      <div className="section">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button className="btn-small" style={{ background: 'rgba(255, 136, 0, 0.2)', color: '#FF8800' }}>All</button>
          <button className="btn-small">Upcoming</button>
          <button className="btn-small">In Progress</button>
          <button className="btn-small">Completed</button>
        </div>

        {reservations.map((reservation) => (
          <div key={reservation.id} className="booking-card">
            <div className="booking-info">
              <div className="booking-date">📅 {reservation.date}</div>
              <div className="booking-target">🎯 {reservation.target}</div>
              <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem' }}>
                Plan: {reservation.plan} • {reservation.filters}
              </div>
              {reservation.countdown && (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF8800' }}>{reservation.countdown.days}</div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>Days</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF8800' }}>{reservation.countdown.hours}</div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>Hours</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FF8800' }}>{reservation.countdown.minutes}</div>
                    <div style={{ fontSize: '0.75rem', color: '#888' }}>Minutes</div>
                  </div>
                </div>
              )}
              <div style={{ marginTop: '0.75rem' }}>
                <span className={`booking-status status-${reservation.status}`}>{reservation.statusText}</span>
              </div>
            </div>
            <div className="booking-actions">
              {reservation.status === 'upcoming' && (
                <>
                  <button className="btn-small">Edit</button>
                  <button className="btn-small">Cancel</button>
                </>
              )}
              {reservation.status === 'pending' && (
                <button className="btn-small">View Details</button>
              )}
              {reservation.status === 'completed' && (
                <button className="btn-small">⬇ Download ({reservation.downloadSize})</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

