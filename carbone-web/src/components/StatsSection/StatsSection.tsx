import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 50, suffix: '+', label: 'Curated', sublabel: 'Vehicles' },
  { value: 10, suffix: ' YRS', label: 'Legacy of', sublabel: 'Excellence' },
  { value: 500, suffix: '+', label: 'Satisfied', sublabel: 'Clients' },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([])
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const topLineRef = useRef<HTMLDivElement>(null)
  const bottomLineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Initial states
    gsap.set(itemsRef.current, { opacity: 0, y: 40 })
    gsap.set([topLineRef.current, bottomLineRef.current], { scaleX: 0, transformOrigin: 'center' })

    // Scroll trigger
    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        // Lines expand
        gsap.to([topLineRef.current, bottomLineRef.current], {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
        })

        // Items stagger in
        gsap.to(itemsRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.3,
        })

        // Counter animation
        STATS.forEach((stat, i) => {
          const el = numbersRef.current[i]
          if (!el) return
          gsap.fromTo(
            { val: 0 },
            { val: stat.value },
            {
              val: stat.value,
              duration: 2,
              delay: 0.5 + i * 0.15,
              ease: 'power2.out',
              onUpdate: function () {
                el.textContent = Math.round(this.targets()[0].val).toString()
              },
            }
          )
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
        padding: '100px 24px',
        position: 'relative',
      }}
    >
      {/* Top gold line */}
      <div
        ref={topLineRef}
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
          margin: '0 auto 80px',
        }}
      />

      {/* Stats row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: '900px',
          margin: '0 auto',
          gap: '0',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'center', flex: 1 }}
          >
            {/* Stat item */}
            <div
              ref={(el) => { itemsRef.current[i] = el }}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '0 40px',
              }}
            >
              {/* Number */}
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontWeight: 300,
                  fontSize: 'clamp(56px, 8vw, 100px)',
                  letterSpacing: '0.05em',
                  color: '#F5F5F5',
                  lineHeight: 1,
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <span ref={(el) => { numbersRef.current[i] = el }}>0</span>
                <span
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 300,
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    color: '#C9A96E',
                    letterSpacing: '0.1em',
                  }}
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 300,
                  fontSize: '10px',
                  letterSpacing: '0.35em',
                  color: 'rgba(245,245,245,0.4)',
                  textTransform: 'uppercase',
                  lineHeight: 1.8,
                }}
              >
                {stat.label}<br />
                <span style={{ color: 'rgba(245,245,245,0.6)' }}>{stat.sublabel}</span>
              </div>
            </div>

            {/* Vertical divider — not after last item */}
            {i < STATS.length - 1 && (
              <div
                style={{
                  width: '1px',
                  height: '80px',
                  background: 'linear-gradient(to bottom, transparent, #C9A96E, transparent)',
                  flexShrink: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Bottom gold line */}
      <div
        ref={bottomLineRef}
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '1px',
          background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
          margin: '80px auto 0',
        }}
      />
    </section>
  )
}