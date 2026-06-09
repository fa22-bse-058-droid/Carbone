import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logo from '../../assets/logo.png'

gsap.registerPlugin(ScrollTrigger)

interface NavbarProps {
  visible: boolean
}

const NAV_LINKS = [
  { label: 'HOME', path: '/' },
  { label: 'INVENTORY', path: '/inventory' },
  { label: 'ABOUT', path: '/about' },
  { label: 'SERVICES', path: '/services' },
  { label: 'CONTACT', path: '/contact' },
]

export default function Navbar({ visible }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Fade in after preloader
  useEffect(() => {
    if (!visible) return
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
    )
  }, [visible])

  // Scroll background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          opacity: 0,
          padding: '0 48px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: scrolled ? '#111111' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(201,169,110,0.1)' : 'none',
          transition: 'background-color 0.6s ease, border-bottom 0.6s ease',
        }}
      >
       <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
  <span style={{
    fontFamily: 'Cormorant Garamond, serif',
    fontWeight: 400,
    fontSize: '22px',
    letterSpacing: '0.25em',
    color: '#F5F5F5',
    textTransform: 'uppercase',
  }}>
    CARBONE
  </span>
</Link>

        {/* Desktop Nav Links */}
        <ul
          style={{
            display: 'flex',
            gap: '40px',
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 300,
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  color: location.pathname === link.path ? '#C9A96E' : '#F5F5F5',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== link.path)
                    (e.target as HTMLElement).style.color = '#C9A96E'
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== link.path)
                    (e.target as HTMLElement).style.color = '#F5F5F5'
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger — mobile only */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-hamburger"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            flexDirection: 'column',
            gap: '5px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: i === 1 ? (menuOpen ? '24px' : '16px') : '24px',
                height: '1px',
                background: '#F5F5F5',
                transition: 'width 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
                transformOrigin: 'center',
                transform: menuOpen
                  ? i === 0
                    ? 'translateY(6px) rotate(45deg)'
                    : i === 2
                    ? 'translateY(-6px) rotate(-45deg)'
                    : 'scaleX(0)'
                  : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 999,
          backgroundColor: '#080808',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontSize: '36px',
              letterSpacing: '0.12em',
              color: location.pathname === link.path ? '#C9A96E' : '#F5F5F5',
              textDecoration: 'none',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          nav { padding: 0 24px !important; }
        }
      `}</style>
    </>
  )
}