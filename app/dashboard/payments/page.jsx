'use client'

import { useState } from 'react'

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      brand: 'Mastercard',
      last4: '8888',
      expiry: '06/26',
      isDefault: false
    }
  ])

  const transactions = [
    {
      id: 1,
      date: 'November 15, 2025',
      description: 'Reservation M31 - Standard',
      amount: 99,
      status: 'completed',
      method: 'Visa •••• 4242'
    },
    {
      id: 2,
      date: 'October 28, 2025',
      description: 'Reservation NGC 7000 - Discovery',
      amount: 79,
      status: 'completed',
      method: 'Visa •••• 4242'
    },
    {
      id: 3,
      date: 'October 1, 2025',
      description: '5 Nights Package',
      amount: 450,
      status: 'completed',
      method: 'Mastercard •••• 8888'
    },
    {
      id: 4,
      date: 'September 25, 2025',
      description: 'Dataset M31',
      amount: 45,
      status: 'refunded',
      method: 'Visa •••• 4242'
    }
  ]

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="page-title">Payments</h1>
        <button className="btn-primary">Add Card</button>
      </div>

      <div className="section" style={{ marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Payment Methods</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="booking-card"
              style={{ alignItems: 'center' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <div style={{
                  width: '50px',
                  height: '35px',
                  background: method.brand === 'Visa' ? '#1A1F71' : '#EB001B',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.8rem'
                }}>
                  {method.brand === 'Visa' ? 'VISA' : 'MC'}
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: '600', marginBottom: '0.25rem' }}>
                    {method.brand} •••• {method.last4}
                  </div>
                  <div style={{ color: '#888', fontSize: '0.85rem' }}>
                    Expires {method.expiry}
                  </div>
                </div>
                {method.isDefault && (
                  <span className="booking-status status-upcoming" style={{ fontSize: '0.75rem' }}>
                    Default
                  </span>
                )}
              </div>
              <div className="booking-actions">
                {!method.isDefault && (
                  <button className="btn-small">Set as Default</button>
                )}
                <button className="btn-small">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <h2 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Transaction History</h2>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button className="btn-small" style={{ background: 'rgba(255, 136, 0, 0.2)', color: '#FF8800' }}>All</button>
          <button className="btn-small">Completed</button>
          <button className="btn-small">Pending</button>
          <button className="btn-small">Refunded</button>
        </div>

        {transactions.map((transaction) => (
          <div key={transaction.id} className="booking-card">
            <div className="booking-info" style={{ flex: 2 }}>
              <div className="booking-date">📅 {transaction.date}</div>
              <div className="booking-target">{transaction.description}</div>
              <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.5rem' }}>
                {transaction.method}
              </div>
              <div style={{ marginTop: '0.75rem' }}>
                <span className={`booking-status status-${transaction.status === 'completed' ? 'completed' : transaction.status === 'refunded' ? 'pending' : 'upcoming'}`}>
                  {transaction.status === 'completed' ? 'Completed' : transaction.status === 'refunded' ? 'Refunded' : 'Pending'}
                </span>
              </div>
            </div>
            <div style={{ textAlign: 'right', marginRight: '1rem' }}>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: transaction.status === 'refunded' ? '#FFC107' : '#FF8800',
                marginBottom: '0.25rem'
              }}>
                ${transaction.amount}
              </div>
              {transaction.status === 'refunded' && (
                <div style={{ fontSize: '0.75rem', color: '#FFC107' }}>Refunded</div>
              )}
            </div>
            <div className="booking-actions">
              <button className="btn-small">Receipt</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

