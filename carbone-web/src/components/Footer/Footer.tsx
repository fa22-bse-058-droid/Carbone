import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Inventory', path: '/inventory' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Contact', path: '/contact' },
]

const LEGAL_LINKS = ['Privacy Policy', 'Terms of Use', 'Cookie Policy']

export default function Footer() {
  const navigate = useNavigate()
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#080808',
        borderTop: '1px solid rgba(201,169,110,0.12)',
        padding: '80px 40px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '200px',
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main footer grid */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr',
          gap: '60px',
          marginBottom: '64px',
        }}
      >
        {/* Brand column */}
        <div>
          <div
  style={{
    fontFamily: 'Cormorant Garamond, serif',
    fontWeight: 300,
    fontSize: '28px',
    letterSpacing: '0.3em',
    color: '#F5F5F5',
    textTransform: 'uppercase',
    marginBottom: '24px',
  }}
>
  Carbone
</div>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontSize: '18px',
              letterSpacing: '0.08em',
              color: 'rgba(245,245,245,0.4)',
              lineHeight: 1.8,
              maxWidth: '300px',
              margin: '0 0 32px',
              fontStyle: 'italic',
            }}
          >
            Engineering Luxury Redefined. Where every vehicle tells a story of excellence.
          </p>

          {/* WhatsApp CTA */}
          <motion.a
            href="https://wa.me/923001234567?text=Hello%20Carbone%2C%20I%27m%20interested%20in%20your%20collection."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ backgroundColor: '#25D366', borderColor: '#25D366', color: '#080808' }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'rgba(245,245,245,0.6)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '10px 20px',
              textDecoration: 'none',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ fontSize: '14px' }}>💬</span>
            WhatsApp Us
          </motion.a>
        </div>

        {/* Navigation column */}
        <div>
          <div
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              fontSize: '9px',
              letterSpacing: '0.4em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Navigation
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <motion.button
                  onClick={() => navigate(link.path)}
                  whileHover={{ x: 6, color: '#F5F5F5' }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '11px',
                    letterSpacing: '0.2em',
                    color: 'rgba(245,245,245,0.4)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    padding: 0,
                    textAlign: 'left',
                  }}
                >
                  {link.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div>
          <div
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              fontSize: '9px',
              letterSpacing: '0.4em',
              color: '#C9A96E',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            Contact
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { label: 'Location', value: 'Lahore, Pakistan' },
              { label: 'Phone', value: '+92 300 000 0000' },
              { label: 'Email', value: 'info@carbone.pk' },
              { label: 'Hours', value: 'Mon – Sat · 10am – 7pm' },
            ].map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '8px',
                    letterSpacing: '0.3em',
                    color: 'rgba(245,245,245,0.25)',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    color: 'rgba(245,245,245,0.55)',
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)',
          marginBottom: '32px',
        }}
      />

      {/* Bottom row */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: '9px',
            letterSpacing: '0.2em',
            color: 'rgba(245,245,245,0.2)',
            textTransform: 'uppercase',
          }}
        >
          © {year} Carbone. All rights reserved.
        </div>

        <div style={{ display: 'flex', gap: '24px' }}>
          {LEGAL_LINKS.map((link) => (
            <motion.button
              key={link}
              whileHover={{ color: 'rgba(245,245,245,0.6)' }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 300,
                fontSize: '9px',
                letterSpacing: '0.2em',
                color: 'rgba(245,245,245,0.2)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'uppercase',
                padding: 0,
              }}
            >
              {link}
            </motion.button>
          ))}
        </div>

        <div
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'rgba(201,169,110,0.3)',
            fontStyle: 'italic',
          }}
        >
          Crafted with precision.
        </div>
      </div>
    </footer>
  )
}