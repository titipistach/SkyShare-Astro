'use client'

import { useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function AstrophotographyDataset() {
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

  return (
    <>
      <div className="starfield" id="starfield"></div>
      <Header />
      
      <main style={{ paddingTop: '80px' }}>
        <section>
          <h1>Professional Deep Sky <span className="gradient-text">Images Database</span></h1>
          <p className="section-subtitle">Access exclusive datasets captured under the world&apos;s darkest skies</p>
          <div className="intro">
            <p>Découvrez notre collection exclusive de <strong>deep sky images</strong> capturées sous les ciels les plus purs de classe Bortle 1. Chaque dataset contient les fichiers FITS bruts et les images traitées, vous offrant un accès direct aux données d&apos;observation professionnelles pour vos projets d&apos;astrophotographie, de recherche ou d&apos;éducation.</p>
          </div>
        </section>

        <section>
          <h2>Browse Our Deep Sky <span className="gradient-text">Images Gallery</span></h2>
          <p style={{ textAlign: 'center', marginBottom: '2rem' }}>Notre galerie contient plus de <strong>200 objets du ciel profond</strong> documentés avec précision :</p>
          <div className="gallery">
            <div className="gallery-item">
              <div className="placeholder-img"></div>
              <div className="gallery-item-content">
                <h4>Nébuleuse d&apos;Orion (M42)</h4>
                <p>15 heures d&apos;exposition • Filtre Ha-OIII-SII • 0,8&quot;/pixel</p>
              </div>
            </div>
            <div className="gallery-item">
              <div className="placeholder-img"></div>
              <div className="gallery-item-content">
                <h4>Galaxie d&apos;Andromède (M31)</h4>
                <p>Mosaïque 2x3 panneaux • Résolution exceptionnelle</p>
              </div>
            </div>
            <div className="gallery-item">
              <div className="placeholder-img"></div>
              <div className="gallery-item-content">
                <h4>Nébuleuse de l&apos;Aigle (M16)</h4>
                <p>Détails des piliers de la création • 12h exposition</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>What You Get in Each <span className="gradient-text">Dataset</span></h2>
          <h3>Raw FITS Files Specifications</h3>
          <div className="info-box">
            <h4>Format technique</h4>
            <ul>
              <li>Format : 16-bit FITS non compressé</li>
              <li>Résolution : 4096x4096 pixels (capteur Sony IMX571)</li>
              <li>Taille pixel : 3,76 μm (0,8&quot;/pixel)</li>
              <li>Refroidissement : -20°C (bruit thermique minimal)</li>
            </ul>
          </div>
          <h3>Processed Images Formats</h3>
          <div className="info-box">
            <h4>Formats disponibles</h4>
            <ul>
              <li>TIFF 16-bit : Pour post-traitement avancé</li>
              <li>JPEG haute qualité : Pour publication et partage</li>
              <li>PNG transparent : Pour compositions</li>
              <li>Versions annotées avec identification</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>How to Download and <span className="gradient-text">Use Your Data</span></h2>
          <h3>Step-by-Step Download Guide</h3>
          <p><strong>Étape 1 : Sélection et commande</strong><br />Parcourez notre galerie et sélectionnez vos objets. Choisissez vos formats (FITS, TIFF, ou pack complet) et validez votre commande avec paiement sécurisé.</p>
          <p><strong>Étape 2 : Téléchargement</strong><br />Recevez votre lien de téléchargement par email (valide 30 jours). Téléchargez vos fichiers sur nos serveurs haute vitesse avec checksums fournis.</p>
          <p><strong>Étape 3 : Utilisation</strong><br />Importez vos FITS dans votre logiciel favori, suivez nos guides de traitement inclus, et partagez vos résultats !</p>
          <h3>Processing Software Recommendations</h3>
          <div className="info-box">
            <h4>Logiciels recommandés</h4>
            <ul>
              <li>PixInsight : Le standard professionnel</li>
              <li>Adobe Photoshop : Excellent pour les finitions</li>
              <li>Siril : Traitement complet open-source</li>
              <li>DeepSkyStacker : Empilement automatisé</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>Technical <span className="gradient-text">Specifications</span></h2>
          <h3 style={{ textAlign: 'center' }}>Bortle 1 Sky Quality Advantages</h3>
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Critère</th>
                <th>Bortle 9 (Ville)</th>
                <th>Bortle 5 (Banlieue)</th>
                <th>Bortle 1 (Site)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Magnitude limite</strong></td>
                <td>4.0</td>
                <td>5.6</td>
                <td><strong>7.6-8.0</strong></td>
              </tr>
              <tr>
                <td><strong>Fond de ciel</strong></td>
                <td>19.0 mag/arcsec²</td>
                <td>20.5</td>
                <td><strong>21.7-22.0</strong></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      <Footer />
    </>
  )
}

