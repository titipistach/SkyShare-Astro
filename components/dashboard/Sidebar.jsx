'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '../../app/dashboard/dashboard.module.css'

export default function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    { icon: '📊', label: 'Overview', path: '/dashboard' },
    { icon: '🌙', label: 'My Reservations', path: '/dashboard/reservations' },
    { icon: '📸', label: 'My Data', path: '/dashboard/data' },
    { icon: '🛒', label: 'My Purchases', path: '/dashboard/purchases' },
    { icon: '👤', label: 'My Profile', path: '/dashboard/profile' },
    { icon: '💳', label: 'Payments', path: '/dashboard/payments' },
    { icon: '⚙️', label: 'Settings', path: '/dashboard/settings' },
  ]

  return (
    <div className="dashboard-sidebar">
      {menuItems.map((item) => {
        const isActive = pathname === item.path
        return (
          <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
            <div className={`nav-item ${isActive ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

