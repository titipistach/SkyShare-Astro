import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="logo" style={{ marginBottom: '1rem' }}>SkyShare Astro</div>
      <p>Democratizing professional astrophotography</p>
      <nav>
        <Link href="/rent-telescope">Rent Telescope</Link>
        <Link href="/astrophotography-dataset">Astrophotography Dataset</Link>
        <Link href="/pricing">Pricing</Link>
        <a href="https://www.skyshare-astro.com/astrophotography-data/" target="_blank" rel="noopener noreferrer">Gallery</a>
        <Link href="/team">Team</Link>
        <a href="https://www.skyshare-astro.com/remote-telescope-faq/" target="_blank" rel="noopener noreferrer">Contact</a>
        <Link href="/#faq">FAQ</Link>
      </nav>
      <p style={{ marginTop: '2rem', fontSize: '0.9rem' }}>© 2023-2025 SkyShare Astro. All rights reserved.</p>
    </footer>
  )
}

