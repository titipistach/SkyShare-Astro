'use client'

import Link from 'next/link'

export default function PurchasesPage() {
  const purchases = [
    {
      id: 1,
      date: 'November 15, 2025',
      type: 'Reservation',
      item: 'M31 - Andromeda Galaxy (Standard)',
      amount: 99,
      status: 'confirmed',
      invoice: '#INV-2025-001'
    },
    {
      id: 2,
      date: 'October 28, 2025',
      type: 'Reservation',
      item: 'NGC 7000 - Discovery Plan',
      amount: 79,
      status: 'processing',
      invoice: '#INV-2025-002'
    },
    {
      id: 3,
      date: 'October 12, 2025',
      type: 'Reservation',
      item: 'M42 - Standard Plan',
      amount: 99,
      status: 'completed',
      invoice: '#INV-2024-089'
    },
    {
      id: 4,
      date: 'October 1, 2025',
      type: 'Package',
      item: '5 Nights Package',
      amount: 450,
      status: 'completed',
      invoice: '#INV-2024-088',
      savings: 45
    },
    {
      id: 5,
      date: 'September 25, 2025',
      type: 'Data',
      item: 'Dataset M31 - Pre-captured',
      amount: 45,
      status: 'completed',
      invoice: '#INV-2024-087'
    }
  ]

  const totalSpent = purchases.reduce((sum, p) => sum + p.amount, 0)
  const totalSavings = purchases.reduce((sum, p) => sum + (p.savings || 0), 0)

  return (
    <>
      <h1 className="page-title">My Purchases</h1>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-label">Total Spent</div>
          <div className="stat-value">${totalSpent}</div>
          <div className="stat-subtext">All categories</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Savings</div>
          <div className="stat-value">${totalSavings}</div>
          <div className="stat-subtext">From packages</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Total Orders</div>
          <div className="stat-value">{purchases.length}</div>
          <div className="stat-subtext">{purchases.filter(p => p.status === 'completed').length} completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Last Purchase</div>
          <div className="stat-value">${purchases[0]?.amount || 0}</div>
          <div className="stat-subtext">{purchases[0]?.date || 'None'}</div>
        </div>
      </div>

      <div className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 className="section-title">Purchase History</h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-small">All</button>
            <button className="btn-small">Reservations</button>
            <button className="btn-small">Packages</button>
            <button className="btn-small">Data</button>
          </div>
        </div>

        {purchases.map((purchase) => (
          <div key={purchase.id} className="booking-card">
            <div className="booking-info" style={{ flex: 2 }}>
              <div className="booking-date">📅 {purchase.date}</div>
              <div className="booking-target">{purchase.item}</div>
              <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.5rem' }}>
                Invoice: {purchase.invoice}
                {purchase.savings && (
                  <span style={{ color: '#4CAF50', marginLeft: '1rem' }}>
                    ✓ Saved ${purchase.savings}
                  </span>
                )}
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span className={`booking-status status-${purchase.status === 'confirmed' ? 'upcoming' : purchase.status === 'processing' ? 'pending' : 'completed'}`}>
                  {purchase.status === 'confirmed' ? 'Confirmed' : purchase.status === 'processing' ? 'Processing' : 'Completed'}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right', marginRight: '1rem' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#FF8800', marginBottom: '0.25rem' }}>
                ${purchase.amount}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#888' }}>{purchase.type}</div>
            </div>
            <div className="booking-actions">
              <button className="btn-small">Invoice</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

