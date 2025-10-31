'use client'

import Link from 'next/link'

export default function DataPage() {
  const datasets = [
    {
      id: 1,
      name: 'M42 - Orion Nebula',
      date: 'October 12, 2025',
      duration: '8.5h',
      size: '12.3 GB',
      integration: 'Ha: 3h, RGB: 5.5h',
      emoji: '🌌'
    },
    {
      id: 2,
      name: 'NGC 7000 - North America',
      date: 'September 28, 2025',
      duration: '6.2h',
      size: '8.9 GB',
      integration: 'LRGB: 6.2h',
      emoji: '🌠'
    },
    {
      id: 3,
      name: 'IC 1396 - Elephant Trunk',
      date: 'September 15, 2025',
      duration: '10.8h',
      size: '15.7 GB',
      integration: 'Ha+OIII: 10.8h',
      emoji: '✨'
    },
    {
      id: 4,
      name: 'M31 - Andromeda Galaxy',
      date: 'September 2, 2025',
      duration: '12.4h',
      size: '18.2 GB',
      integration: 'LRGB: 12.4h',
      emoji: '🌌'
    }
  ]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="page-title">My Data</h1>
        <Link href="/astrophotography-dataset" className="btn-primary">Buy Data</Link>
      </div>

      <div className="section">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {datasets.map((dataset) => (
            <div key={dataset.id} className="data-card">
              <div className="data-image">{dataset.emoji}</div>
              <div className="data-info">
                <div className="data-name">{dataset.name}</div>
                <div className="data-date">{dataset.date} • {dataset.duration}</div>
                <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.75rem' }}>
                  {dataset.integration}
                </div>
                <a href="#" className="data-download">⬇ Download ({dataset.size})</a>
              </div>
            </div>
          ))}

          <Link href="/rent-telescope" className="data-card" style={{ textDecoration: 'none', display: 'block' }}>
            <div className="data-image" style={{ background: 'rgba(255, 136, 0, 0.1)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem' }}>+</div>
                <div style={{ fontSize: '1rem', color: '#FF8800' }}>Book a Night</div>
              </div>
            </div>
            <div className="data-info">
              <div className="data-name">Next Capture</div>
              <div className="data-date">Book Now</div>
            </div>
          </Link>
        </div>
      </div>

      <div className="section" style={{ marginTop: '2rem' }}>
        <h2 className="section-title">Storage Space</h2>
        <div style={{ background: 'rgba(20, 20, 20, 0.8)', border: '1px solid rgba(255, 136, 0, 0.3)', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ color: '#aaa' }}>Used: 55.1 GB / 100 GB</span>
            <span style={{ color: '#FF8800', fontWeight: 'bold' }}>55%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '55%' }}></div>
          </div>
        </div>
      </div>
    </>
  )
}

