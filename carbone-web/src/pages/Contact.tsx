import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

const LOCATIONS = [
  {
    city: 'Lahore',
    address: 'Plot 14, MM Alam Road, Gulberg III, Lahore',
    phone: '+92 42 3571 0000',
    email: 'lahore@carbone.pk',
    hours: 'Mon – Sat · 10am – 7pm',
    whatsapp: '923001234567',
  },
  {
    city: 'Karachi',
    address: 'Shop 3, Zamzama Commercial Lane 4, DHA Phase 5, Karachi',
    phone: '+92 21 3580 0000',
    email: 'karachi@carbone.pk',
    hours: 'Mon – Sat · 10am – 7pm',
    whatsapp: '923007654321',
  },
]

export default function Contact() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', subject: '', message: ''
  })
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSent(true)
  }

  return (
    <div style={{
      background: '#080808', minHeight: '100vh',
      color: '#F5F5F5', fontFamily: 'Montserrat, sans-serif',
      paddingTop: '100px',
    }}>

      {/* Header */}
      <div ref={headerRef} style={{ textAlign: 'center', padding: '60px 40px 48px' }}>
        <div style={{
          fontSize: '10px', letterSpacing: '0.4em',
          color: '#C9A96E', textTransform: 'uppercase',
          marginBottom: '16px', fontWeight: 300,
        }}>
          — Get In Touch —
        </div>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
          fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '0.15em',
          color: '#F5F5F5', textTransform: 'uppercase',
          margin: '0 0 8px',
        }}>
          Contact Us
        </h1>
        <div style={{
          fontSize: '12px', letterSpacing: '0.2em',
          color: 'rgba(245,245,245,0.3)', textTransform: 'uppercase',
          fontWeight: 300,
        }}>
          We respond within 24 hours
        </div>
      </div>

      {/* Gold divider */}
      <div style={{
        width: '60px', height: '1px',
        background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
        margin: '0 auto 80px',
      }} />

      {/* Main grid — form + info */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 40px 120px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '80px',
      }}>

        {/* Left — Contact form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: '36px', letterSpacing: '0.1em',
            color: '#F5F5F5', marginBottom: '8px',
          }}>
            Send a Message
          </h2>
          <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '36px' }} />

          {formSent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                textAlign: 'center', padding: '64px 40px',
                background: '#111', border: '1px solid rgba(201,169,110,0.3)',
              }}
            >
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                fontSize: '32px', color: '#C9A96E',
                letterSpacing: '0.1em', marginBottom: '16px',
              }}>
                Message Received
              </div>
              <div style={{
                fontSize: '12px', color: '#888',
                letterSpacing: '0.08em', lineHeight: 1.9,
              }}>
                Thank you for reaching out.<br />
                A member of our team will contact you<br />
                within 24 hours.
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name + Phone */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '16px', marginBottom: '16px',
              }}>
                {[
                  { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Your name' },
                  { label: 'Phone', key: 'phone', type: 'tel', placeholder: '+92 300 0000000' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{
                      fontSize: '9px', letterSpacing: '0.2em',
                      color: '#555', textTransform: 'uppercase',
                      display: 'block', marginBottom: '10px',
                    }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      required
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      style={{
                        width: '100%', background: '#111',
                        border: '1px solid #333', color: '#F5F5F5',
                        padding: '14px 16px', fontFamily: 'Montserrat, sans-serif',
                        fontSize: '13px', boxSizing: 'border-box' as const,
                        outline: 'none',
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Email */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  fontSize: '9px', letterSpacing: '0.2em',
                  color: '#555', textTransform: 'uppercase',
                  display: 'block', marginBottom: '10px',
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%', background: '#111',
                    border: '1px solid #333', color: '#F5F5F5',
                    padding: '14px 16px', fontFamily: 'Montserrat, sans-serif',
                    fontSize: '13px', boxSizing: 'border-box' as const,
                    outline: 'none',
                  }}
                />
              </div>

              {/* Subject */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  fontSize: '9px', letterSpacing: '0.2em',
                  color: '#555', textTransform: 'uppercase',
                  display: 'block', marginBottom: '10px',
                }}>
                  Subject
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%', background: '#111',
                    border: '1px solid #333',
                    color: formData.subject ? '#F5F5F5' : '#555',
                    padding: '14px 16px', fontFamily: 'Montserrat, sans-serif',
                    fontSize: '13px', boxSizing: 'border-box' as const,
                    outline: 'none',
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="purchase">Vehicle Purchase Enquiry</option>
                  <option value="testdrive">Book a Test Drive</option>
                  <option value="tradein">Trade-In Valuation</option>
                  <option value="financing">Financing & Leasing</option>
                  <option value="service">After-Sale Service</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{
                  fontSize: '9px', letterSpacing: '0.2em',
                  color: '#555', textTransform: 'uppercase',
                  display: 'block', marginBottom: '10px',
                }}>
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%', background: '#111',
                    border: '1px solid #333', color: '#F5F5F5',
                    padding: '14px 16px', fontFamily: 'Montserrat, sans-serif',
                    fontSize: '13px', boxSizing: 'border-box' as const,
                    outline: 'none', resize: 'none',
                    lineHeight: 1.8,
                  }}
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ background: '#C9A96E', color: '#080808' }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '100%', background: 'transparent',
                  border: '1px solid #C9A96E', color: '#C9A96E',
                  padding: '18px', fontFamily: 'Montserrat, sans-serif',
                  fontSize: '11px', letterSpacing: '0.25em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  boxSizing: 'border-box' as const,
                }}
              >
                SEND MESSAGE
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Right — Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: '36px', letterSpacing: '0.1em',
            color: '#F5F5F5', marginBottom: '8px',
          }}>
            Our Showrooms
          </h2>
          <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '36px' }} />

          {LOCATIONS.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              style={{
                background: '#111', border: '1px solid #1a1a1a',
                padding: '32px', marginBottom: '20px',
              }}
            >
              {/* City */}
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                fontSize: '28px', letterSpacing: '0.1em',
                color: '#F5F5F5', marginBottom: '20px',
              }}>
                {loc.city}
              </div>

              {/* Details */}
              {[
                { icon: '◈', label: 'Address', value: loc.address },
                { icon: '◇', label: 'Phone', value: loc.phone },
                { icon: '◉', label: 'Email', value: loc.email },
                { icon: '◎', label: 'Hours', value: loc.hours },
              ].map((item, j) => (
                <div key={j} style={{
                  display: 'flex', gap: '14px',
                  marginBottom: j < 3 ? '16px' : '0',
                  paddingBottom: j < 3 ? '16px' : '0',
                  borderBottom: j < 3 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  alignItems: 'flex-start',
                }}>
                  <span style={{ color: '#C9A96E', fontSize: '12px', marginTop: '1px' }}>
                    {item.icon}
                  </span>
                  <div>
                    <div style={{
                      fontSize: '9px', letterSpacing: '0.2em',
                      color: '#555', textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      fontSize: '13px', color: 'rgba(245,245,245,0.6)',
                      fontWeight: 300, lineHeight: 1.6,
                    }}>
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}

              {/* WhatsApp */}
              <motion.a
                href={`https://wa.me/${loc.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ background: '#1ebe57' }}
                transition={{ duration: 0.2 }}
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '8px',
                  background: '#25D366', color: '#fff',
                  padding: '12px', textDecoration: 'none',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '10px', fontWeight: 500,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  marginTop: '20px',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WHATSAPP {loc.city.toUpperCase()}
              </motion.a>
            </motion.div>
          ))}

          {/* General email */}
          <div style={{
            background: '#111', border: '1px solid rgba(201,169,110,0.2)',
            padding: '24px 32px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontSize: '9px', letterSpacing: '0.2em',
                color: '#555', textTransform: 'uppercase', marginBottom: '6px',
              }}>
                General Enquiries
              </div>
              <div style={{
                fontSize: '14px', color: '#C9A96E',
                fontWeight: 300, letterSpacing: '0.05em',
              }}>
                info@carbone.pk
              </div>
            </div>
            <span style={{ color: '#C9A96E', fontSize: '20px' }}>◈</span>
          </div>
        </motion.div>
      </div>

      {/* Map placeholder */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 40px 120px',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: '#111', border: '1px solid #1a1a1a',
            height: '400px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '16px',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Embed Google Maps here later */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.016!2d74.3587!3d31.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMxJzEzLjQiTiA3NMKwMjEnMzEuMyJF!5e0!3m2!1sen!2spk!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Carbone Lahore Showroom"
          />
        </motion.div>
      </div>

    </div>
  )
}