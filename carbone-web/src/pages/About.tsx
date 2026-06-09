import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'



gsap.registerPlugin(ScrollTrigger)

const TIMELINE = [
  {
    year: '1998',
    title: 'The Foundation',
    desc: 'Carbone was established in Lahore by a group of automotive enthusiasts with a singular vision — to bring world-class luxury automobiles to Pakistan\'s most discerning clientele.',
  },
  {
    year: '2004',
    title: 'First Exotic Import',
    desc: 'We completed Pakistan\'s first documented private import of a Ferrari 360 Modena — a landmark moment that established Carbone as the authority on exotic automobiles in the region.',
  },
  {
    year: '2010',
    title: 'Expansion to Karachi',
    desc: 'Growing demand led us to open our second showroom in Karachi\'s DHA, bringing our white-glove service to Pakistan\'s commercial capital and expanding our clientele across the country.',
  },
  {
    year: '2015',
    title: 'Classic Division Launch',
    desc: 'We launched our dedicated Classic Automobiles division — sourcing, restoring, and certifying vintage vehicles from the golden era of motoring for collectors across South Asia.',
  },
  {
    year: '2019',
    title: 'Electric Pioneer',
    desc: 'Carbone became the first luxury dealer in Pakistan to formally import and service electric vehicles, introducing Tesla and other EV brands to a market hungry for sustainable luxury.',
  },
  {
    year: '2024',
    title: 'Digital Transformation',
    desc: 'We launched our AI-powered concierge platform — bringing the Carbone experience online, allowing clients to discover, finance, and acquire their perfect vehicle from anywhere in Pakistan.',
  },
]

const STATS = [
  { number: '26', label: 'Years of Excellence' },
  { number: '1,200+', label: 'Vehicles Delivered' },
  { number: '3', label: 'Showroom Locations' },
  { number: '98%', label: 'Client Satisfaction' },
]

const TEAM = [
  {
    name: 'Zafar Mahmood',
    title: 'Founder & Chairman',
    desc: 'A lifelong automotive enthusiast, Zafar built Carbone from a single showroom into Pakistan\'s most respected luxury automobile house.',
  },
  {
    name: 'Aisha Khalid',
    title: 'Head of Acquisitions',
    desc: 'With over 15 years in international automotive sourcing, Aisha ensures every vehicle in our collection meets Carbone\'s uncompromising standard.',
  },
  {
    name: 'Omar Siddiqui',
    title: 'Client Relations Director',
    desc: 'Omar leads our concierge team with a philosophy simple — every client deserves the experience they imagined when they first dreamed of their perfect car.',
  },
]

export default function About() {
  const navigate = useNavigate()
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

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
          — Our Story —
        </div>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
          fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '0.15em',
          color: '#F5F5F5', textTransform: 'uppercase',
          margin: '0 0 8px',
        }}>
          The Carbone Legacy
        </h1>
        <div style={{
          fontSize: '12px', letterSpacing: '0.2em',
          color: 'rgba(245,245,245,0.3)', textTransform: 'uppercase',
          fontWeight: 300,
        }}>
          26 years of automotive excellence in Pakistan
        </div>
      </div>

      {/* Gold divider */}
      <div style={{
        width: '60px', height: '1px',
        background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
        margin: '0 auto 80px',
      }} />

      {/* Mission statement */}
      <div style={{
        maxWidth: '800px', margin: '0 auto',
        padding: '0 40px 100px', textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: 'clamp(28px, 3vw, 44px)', letterSpacing: '0.06em',
            color: '#F5F5F5', lineHeight: 1.4,
            marginBottom: '32px',
          }}>
            "We do not simply sell automobiles.<br />
            We deliver the realisation of a dream."
          </h2>
          <p style={{
            fontSize: '13px', lineHeight: 2,
            color: 'rgba(245,245,245,0.45)', fontWeight: 300,
            letterSpacing: '0.04em',
          }}>
            Carbone was founded on the belief that acquiring a luxury automobile should be
            as extraordinary as owning one. From the first conversation to the moment you
            drive away, every interaction with our team is designed to be unhurried,
            informed, and deeply personal. We are not a dealership. We are a house of
            automotive excellence and every client is a guest.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <div style={{
        background: '#111', borderTop: '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a',
        padding: '80px 40px', marginBottom: '120px',
      }}>
        <div style={{
          maxWidth: '1000px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '48px',
        }}>
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                fontSize: 'clamp(36px, 4vw, 56px)', color: '#C9A96E',
                letterSpacing: '0.05em', marginBottom: '8px',
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '9px', letterSpacing: '0.25em',
                color: 'rgba(245,245,245,0.35)', textTransform: 'uppercase',
                fontWeight: 300,
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{
        maxWidth: '1000px', margin: '0 auto',
        padding: '0 40px 120px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            fontSize: '10px', letterSpacing: '0.4em',
            color: '#C9A96E', textTransform: 'uppercase',
            marginBottom: '16px', fontWeight: 300,
          }}>
            — Milestones —
          </div>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.12em',
            color: '#F5F5F5', textTransform: 'uppercase', margin: 0,
          }}>
            Our Journey
          </h2>
        </div>

        {/* Timeline items */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: '50%',
            top: 0, bottom: 0, width: '1px',
            background: 'linear-gradient(to bottom, transparent, #C9A96E, transparent)',
            transform: 'translateX(-50%)',
          }} />

          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 64px 1fr',
                gap: '0', marginBottom: '64px',
                alignItems: 'center',
              }}
            >
              {/* Left content */}
              <div style={{
                textAlign: i % 2 === 0 ? 'right' : 'left',
                padding: i % 2 === 0 ? '0 40px 0 0' : '0 0 0 40px',
                gridColumn: i % 2 === 0 ? '1' : '3',
                gridRow: '1',
              }}>
                <div style={{
                  fontSize: '9px', letterSpacing: '0.25em',
                  color: '#C9A96E', textTransform: 'uppercase',
                  marginBottom: '10px', fontWeight: 300,
                }}>
                  {item.year}
                </div>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                  fontSize: '24px', letterSpacing: '0.08em',
                  color: '#F5F5F5', marginBottom: '12px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontSize: '12px', lineHeight: 1.8,
                  color: 'rgba(245,245,245,0.4)', fontWeight: 300,
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>

              {/* Center dot */}
              <div style={{
                gridColumn: '2', gridRow: '1',
                display: 'flex', justifyContent: 'center',
              }}>
                <div style={{
                  width: '12px', height: '12px',
                  borderRadius: '50%', background: '#C9A96E',
                  border: '3px solid #080808',
                  boxShadow: '0 0 0 1px #C9A96E',
                }} />
              </div>

              {/* Right empty or content */}
              {i % 2 !== 0 && (
                <div style={{ gridColumn: '1', gridRow: '1' }} />
              )}
              {i % 2 === 0 && (
                <div style={{ gridColumn: '3', gridRow: '1' }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div style={{
        background: '#111', borderTop: '1px solid #1a1a1a',
        padding: '100px 40px', marginBottom: '120px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{
              fontSize: '10px', letterSpacing: '0.4em',
              color: '#C9A96E', textTransform: 'uppercase',
              marginBottom: '16px', fontWeight: 300,
            }}>
              — The People —
            </div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '0.12em',
              color: '#F5F5F5', textTransform: 'uppercase', margin: 0,
            }}>
              Our Leadership
            </h2>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            {TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{
                  background: '#080808',
                  border: '1px solid #1a1a1a',
                  padding: '40px 32px',
                  textAlign: 'center',
                }}
              >
                {/* Avatar placeholder */}
                <div style={{
                  width: '80px', height: '80px',
                  borderRadius: '50%',
                  border: '1px solid #C9A96E',
                  margin: '0 auto 24px',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '28px', fontWeight: 300,
                  color: '#C9A96E',
                }}>
                  {member.name.charAt(0)}
                </div>

                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                  fontSize: '22px', letterSpacing: '0.08em',
                  color: '#F5F5F5', marginBottom: '6px',
                }}>
                  {member.name}
                </h3>
                <div style={{
                  fontSize: '9px', letterSpacing: '0.2em',
                  color: '#C9A96E', textTransform: 'uppercase',
                  marginBottom: '20px', fontWeight: 300,
                }}>
                  {member.title}
                </div>
                <div style={{
                  width: '32px', height: '1px',
                  background: '#C9A96E', margin: '0 auto 20px',
                }} />
                <p style={{
                  fontSize: '12px', lineHeight: 1.8,
                  color: 'rgba(245,245,245,0.4)', fontWeight: 300,
                  margin: 0,
                }}>
                  {member.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        maxWidth: '700px', margin: '0 auto',
        padding: '0 40px 120px', textAlign: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontSize: 'clamp(28px, 3vw, 44px)', letterSpacing: '0.1em',
            color: '#F5F5F5', textTransform: 'uppercase',
            marginBottom: '24px',
          }}>
            Visit Our Showroom
          </h2>
          <p style={{
            fontSize: '13px', lineHeight: 1.9,
            color: 'rgba(245,245,245,0.4)', fontWeight: 300,
            marginBottom: '40px', letterSpacing: '0.03em',
          }}>
            Experience the Carbone difference in person. Our showrooms in Lahore
            and Karachi are open by appointment — ensuring every visit receives
            our full, undivided attention.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <motion.button
              onClick={() => navigate('/inventory')}
              whileHover={{ background: '#C9A96E', color: '#080808' }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'transparent',
                border: '1px solid #C9A96E', color: '#C9A96E',
                padding: '16px 36px', cursor: 'pointer',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '11px', letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              VIEW COLLECTION
            </motion.button>
            <motion.button
              onClick={() => navigate('/contact')}
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
              CONTACT US
            </motion.button>
          </div>
        </motion.div>
      </div>

    </div>
  )
}