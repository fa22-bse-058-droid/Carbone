import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroVideo from '../../assets/hero.mp4'

gsap.registerPlugin(ScrollTrigger)

export default function CinematicSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Initial states
    gsap.set(overlayRef.current, { opacity: 1 })
    gsap.set(glowRef.current, { opacity: 0, scale: 0.8 })
    gsap.set(labelRef.current, { opacity: 0, y: 20, letterSpacing: '0.3em' })
    gsap.set(titleRef.current, { opacity: 0, y: 60 })
    gsap.set(lineRef.current, { opacity: 0, scaleX: 0, transformOrigin: 'left center' })
    gsap.set(descRef.current, { opacity: 0, y: 30 })

    // Scroll-triggered cinematic reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        once: true,
      },
    })

    tl.to(overlayRef.current, { opacity: 0.3, duration: 1.2, ease: 'power2.inOut' })
      .to(glowRef.current, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, '-=0.8')
      .to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to(titleRef.current, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.4')
      .to(lineRef.current, { opacity: 1, scaleX: 1, duration: 0.8, ease: 'power2.out' }, '-=0.6')
      .to(descRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')

    // Parallax on scroll
    gsap.to(videoRef.current, {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Headlight glow pulse
    gsap.to(glowRef.current, {
      opacity: 0.6,
      scale: 1.05,
      duration: 2.5,
      ease: 'power1.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Animate particles
    const particles = particlesRef.current?.querySelectorAll('.particle')
    particles?.forEach((p, i) => {
      gsap.to(p, {
        y: -40 - Math.random() * 60,
        x: (Math.random() - 0.5) * 40,
        opacity: 0,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 3,
        repeat: -1,
        ease: 'power1.out',
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  // Generate particle positions
  const particles = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 40}%`,
    size: `${1 + Math.random() * 2}px`,
    delay: `${Math.random() * 3}s`,
    opacity: 0.3 + Math.random() * 0.4,
  }))

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#080808',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '110%',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'scale(1.05)',
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.5) 40%, rgba(8,8,8,0.7) 70%, rgba(8,8,8,0.95) 100%)',
          zIndex: 1,
        }}
      />

      {/* Headlight glow effect */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 30% at 30% 55%, rgba(201,169,110,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 30% at 70% 55%, rgba(201,169,110,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Particle dust */}
      <div
        ref={particlesRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              position: 'absolute',
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: '#C9A96E',
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Side vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(8,8,8,0.6) 0%, transparent 25%, transparent 75%, rgba(8,8,8,0.6) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 4,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '900px',
          width: '100%',
        }}
      >
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
          — The Experience —
        </div>

        {/* Main heading */}
        <h2
          ref={titleRef}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(40px, 7vw, 96px)',
            letterSpacing: '0.12em',
            color: '#F5F5F5',
            lineHeight: 1.05,
            margin: '0 0 28px',
            textTransform: 'uppercase',
          }}
        >
          Beyond the<br />
          <span style={{ fontStyle: 'italic', color: 'rgba(245,245,245,0.75)' }}>Ordinary</span>
        </h2>

        {/* Gold line */}
        <div
          ref={lineRef}
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #C9A96E, transparent)',
            margin: '0 auto 28px',
          }}
        />

        {/* Description */}
        <p
          ref={descRef}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: 'clamp(13px, 1.5vw, 15px)',
            letterSpacing: '0.12em',
            color: 'rgba(245,245,245,0.85)',
            lineHeight: 1.9,
            maxWidth: '520px',
            margin: '0 auto',
          }}
        >
          Each vehicle in our collection is a testament to human ingenuity.
          Handpicked. Verified. Delivered to those who refuse to settle.
        </p>
      </div>

      {/* Bottom fade into next section */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, #080808)',
          zIndex: 5,
        }}
      />
    </section>
  )
}