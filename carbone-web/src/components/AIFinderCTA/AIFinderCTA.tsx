import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'

gsap.registerPlugin(ScrollTrigger)

export default function AIFinderCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    gsap.set([labelRef.current, headingRef.current, descRef.current, btnRef.current], {
      opacity: 0,
      y: 30,
    })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to([labelRef.current, headingRef.current, descRef.current, btnRef.current], {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
        })
      },
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#080808',
        padding: '120px 24px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(201,169,110,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top line */}
      <div
        style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, transparent, #C9A96E)',
          margin: '0 auto 40px',
        }}
      />

      {/* Label */}
      <div
        ref={labelRef}
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 300,
          fontSize: '10px',
          letterSpacing: '0.4em',
          color: '#C9A96E',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}
      >
        — Powered by AI —
      </div>

      {/* Heading */}
      <h2
        ref={headingRef}
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 300,
          fontSize: 'clamp(36px, 6vw, 80px)',
          letterSpacing: '0.12em',
          color: '#F5F5F5',
          textTransform: 'uppercase',
          lineHeight: 1.1,
          margin: '0 0 28px',
        }}
      >
        Find Your<br />
        <span style={{ fontStyle: 'italic', color: 'rgba(245,245,245,0.6)' }}>Perfect Match</span>
      </h2>

      {/* Description */}
      <p
        ref={descRef}
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 300,
          fontSize: 'clamp(13px, 1.5vw, 15px)',
          letterSpacing: '0.1em',
          color: 'rgba(245,245,245,0.5)',
          lineHeight: 1.9,
          maxWidth: '480px',
          margin: '0 auto 48px',
        }}
      >
        Answer three questions. Let our AI concierge curate the ideal
        vehicle from our collection tailored to your budget, lifestyle, and taste.
      </p>

      {/* CTA Button */}
      <div ref={btnRef}>
        <motion.button
          onClick={() => navigate('/ai-finder')}
          whileHover={{ backgroundColor: '#C9A96E', color: '#080808', borderColor: '#C9A96E' }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: '10px',
            letterSpacing: '0.4em',
            color: '#F5F5F5',
            background: 'transparent',
            border: '1px solid rgba(201,169,110,0.5)',
            padding: '18px 56px',
            cursor: 'pointer',
            textTransform: 'uppercase',
          }}
        >
          Find My Car
        </motion.button>
      </div>

      {/* Bottom line */}
      <div
        style={{
          width: '1px',
          height: '60px',
          background: 'linear-gradient(to bottom, #C9A96E, transparent)',
          margin: '40px auto 0',
        }}
      />
    </section>
  )
}