import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    number: '01',
    title: 'Curated Car Sales',
    subtitle: 'New & Pre-Owned',
    description: 'Every vehicle in our collection is hand-selected, rigorously inspected, and verified for authenticity. From exotic supercars to timeless classics — we source only what meets our standard of excellence.',
    features: ['Multi-point inspection', 'Authenticity verification', 'Full service history', 'Certified pre-owned program'],
    icon: '◈',
  },
  {
    number: '02',
    title: 'Bespoke Financing',
    subtitle: 'Tailored Loan Solutions',
    description: 'Our financial advisors work with Pakistan\'s leading banks to secure competitive rates tailored to your profile. Drive your dream vehicle today with flexible installment plans.',
    features: ['Bank liaison service', 'Competitive interest rates', 'Flexible tenure 12–60 months', 'Same-day approval'],
    icon: '◇',
  },
  {
    number: '03',
    title: 'Trade-In Valuation',
    subtitle: 'Fair Market Assessment',
    description: 'Upgrade seamlessly. Bring in your current vehicle for a transparent, market-accurate valuation. Our experts assess every detail to ensure you receive the fairest offer — no negotiations, no games.',
    features: ['Free valuation', 'Market-accurate pricing', 'Instant cash offer', 'Seamless upgrade path'],
    icon: '◉',
  },
  {
    number: '04',
    title: 'VIP Test Drive',
    subtitle: 'Private Experience',
    description: 'Schedule a private test drive at your preferred time. Our concierge team prepares the vehicle, briefs you on its capabilities, and ensures an unhurried, pressure-free experience.',
    features: ['Private time slots', 'Dedicated concierge', 'Extended drive routes', 'On-road performance briefing'],
    icon: '◎',
  },
  {
    number: '05',
    title: 'After-Sale Service',
    subtitle: 'Lifetime Partnership',
    description: 'Our relationship does not end at the sale. Carbone clients receive priority access to maintenance scheduling, warranty support, and our network of certified service partners across Pakistan.',
    features: ['Priority service booking', 'Warranty management', 'Certified service network', 'Annual vehicle health check'],
    icon: '◐',
  },
  {
    number: '06',
    title: 'Concierge Delivery',
    subtitle: 'White Glove Handover',
    description: 'Your vehicle is delivered to your doorstep — fully detailed, fueled, and ready. Our team handles all documentation, registration, and insurance coordination so you simply drive away.',
    features: ['Doorstep delivery', 'Full documentation handling', 'Insurance coordination', 'Registration assistance'],
    icon: '◑',
  },
]

const PROCESS = [
  { step: '01', title: 'Discover', desc: 'Browse our curated inventory or let our AI concierge find your perfect match based on budget, lifestyle, and taste.' },
  { step: '02', title: 'Experience', desc: 'Schedule a private viewing or test drive. Our team prepares everything — you simply arrive and fall in love.' },
  { step: '03', title: 'Acquire', desc: 'Complete your purchase with full financing support, documentation handling, and white-glove delivery to your door.' },
]

export default function Services() {
  const navigate = useNavigate()
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <div style={{
      background: '#080808',
      minHeight: '100vh',
      color: '#F5F5F5',
      fontFamily: 'Montserrat, sans-serif',
      paddingTop: '100px',
    }}>

      {/* Header */}
      <div ref={headerRef} style={{ textAlign: 'center', padding: '60px 40px 48px' }}>
        <div style={{
          fontSize: '10px', letterSpacing: '0.4em',
          color: '#C9A96E', textTransform: 'uppercase',
          marginBottom: '16px', fontWeight: 300,
        }}>
          — What We Offer —
        </div>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
          fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '0.15em',
          color: '#F5F5F5', textTransform: 'uppercase',
          margin: '0 0 8px',
        }}>
          Our Services
        </h1>
        <div style={{
          fontSize: '12px', letterSpacing: '0.2em',
          color: 'rgba(245,245,245,0.3)', textTransform: 'uppercase',
          fontWeight: 300,
        }}>
          Luxury, without compromise
        </div>
      </div>

      {/* Gold divider */}
      <div style={{
        width: '60px', height: '1px',
        background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
        margin: '0 auto 80px',
      }} />

      {/* Services grid */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 40px', marginBottom: '120px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '1px',
        background: '#1a1a1a',
        border: '1px solid #1a1a1a',
      }}>
        {SERVICES.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ background: '#111111' }}
            style={{
              background: '#080808',
              padding: '48px 40px',
              cursor: 'default',
              transition: 'background 0.3s ease',
            }}
          >
            {/* Number + icon */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'flex-start', marginBottom: '28px',
            }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '48px', fontWeight: 300,
                color: 'rgba(201,169,110,0.2)',
                lineHeight: 1,
              }}>
                {service.number}
              </span>
              <span style={{
                fontSize: '24px',
                color: 'rgba(201,169,110,0.4)',
              }}>
                {service.icon}
              </span>
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '28px', fontWeight: 300,
              letterSpacing: '0.06em', color: '#F5F5F5',
              margin: '0 0 6px',
            }}>
              {service.title}
            </h3>
            <div style={{
              fontSize: '9px', letterSpacing: '0.25em',
              color: '#C9A96E', textTransform: 'uppercase',
              marginBottom: '20px', fontWeight: 300,
            }}>
              {service.subtitle}
            </div>

            {/* Divider */}
            <div style={{
              width: '32px', height: '1px',
              background: '#C9A96E', marginBottom: '20px',
            }} />

            {/* Description */}
            <p style={{
              fontSize: '13px', lineHeight: 1.8,
              color: 'rgba(245,245,245,0.5)', fontWeight: 300,
              marginBottom: '24px', letterSpacing: '0.02em',
            }}>
              {service.description}
            </p>

            {/* Features */}
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {service.features.map((f, j) => (
                <li key={j} style={{
                  fontSize: '11px', letterSpacing: '0.08em',
                  color: 'rgba(245,245,245,0.35)', fontWeight: 300,
                  padding: '6px 0',
                  borderBottom: j < service.features.length - 1
                    ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span style={{ color: '#C9A96E', fontSize: '6px' }}>◆</span>
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Process section */}
      <div style={{
        background: '#111', borderTop: '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a',
        padding: '100px 40px', marginBottom: '120px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              fontSize: '10px', letterSpacing: '0.4em',
              color: '#C9A96E', textTransform: 'uppercase',
              marginBottom: '16px', fontWeight: 300,
            }}>
              — How It Works —
            </div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.12em',
              color: '#F5F5F5', textTransform: 'uppercase', margin: 0,
            }}>
              The Carbone Process
            </h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            gap: '48px', position: 'relative',
          }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute', top: '32px', left: '16.6%',
              right: '16.6%', height: '1px',
              background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
            }} />

            {PROCESS.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ textAlign: 'center' }}
              >
                {/* Step circle */}
                <div style={{
                  width: '64px', height: '64px',
                  border: '1px solid #C9A96E',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 28px',
                  background: '#111',
                }}>
                  <span style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '18px', fontWeight: 300,
                    color: '#C9A96E',
                  }}>
                    {p.step}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '28px', fontWeight: 300,
                  letterSpacing: '0.1em', color: '#F5F5F5',
                  textTransform: 'uppercase', marginBottom: '16px',
                }}>
                  {p.title}
                </h3>
                <p style={{
                  fontSize: '13px', lineHeight: 1.8,
                  color: 'rgba(245,245,245,0.4)', fontWeight: 300,
                  letterSpacing: '0.02em',
                }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        maxWidth: '800px', margin: '0 auto',
        padding: '0 40px 120px', textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            fontSize: '10px', letterSpacing: '0.4em',
            color: '#C9A96E', textTransform: 'uppercase',
            marginBottom: '24px', fontWeight: 300,
          }}>
            — Begin Your Journey —
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.12em',
            color: '#F5F5F5', textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            Ready to Find Your Car?
          </h2>
          <p style={{
            fontSize: '13px', lineHeight: 1.9,
            color: 'rgba(245,245,245,0.4)', fontWeight: 300,
            marginBottom: '48px', letterSpacing: '0.03em',
          }}>
            Whether you know exactly what you want or need guidance from our experts —
            we are here. Reach out via WhatsApp for the fastest response,
            or browse our full inventory to begin.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noreferrer"
              whileHover={{ background: '#1ebe57' }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: '#25D366', color: '#fff',
                padding: '16px 36px', textDecoration: 'none',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.15em', textTransform: 'uppercase',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WHATSAPP US
            </motion.a>

            <motion.button
              onClick={() => navigate('/inventory')}
              whileHover={{ borderColor: '#C9A96E', color: '#C9A96E' }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'transparent',
                border: '1px solid #333', color: '#888',
                padding: '16px 36px', cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px', letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              BROWSE INVENTORY
            </motion.button>
          </div>
        </motion.div>
      </div>

    </div>
  )
}