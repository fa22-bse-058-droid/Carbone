import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Placeholder 4K luxury car image from Unsplash (replace with your actual asset)
import heroImage from '../../assets/hero-poster.jpg'
const HERO_IMAGE = heroImage
// Replace with your actual video path: '/assets/hero.mp4'
const HERO_VIDEO = '/assets/hero.mp4'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const scrollLineRef = useRef<HTMLDivElement>(null)
  const scrollTextRef = useRef<HTMLSpanElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })

    gsap.set([headingRef.current, subRef.current], {
      opacity: 0,
      y: 40,
    })
    gsap.set([scrollLineRef.current, scrollTextRef.current], {
      opacity: 0,
    })

    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.6,
      ease: 'power3.out',
    })
      .to(
        subRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=0.9'
      )
      .to(
        [scrollLineRef.current, scrollTextRef.current],
        {
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.4'
      )

    // Subtle parallax on scroll
    gsap.to(imageRef.current, {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  // Video crossfade once loaded
  const handleVideoReady = () => {
    setVideoReady(true)
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.inOut',
    })
    gsap.to(videoRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut',
    })
    videoRef.current?.play()
  }

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
      }}
    >
      {/* 4K Image — shows immediately */}
      <img
        ref={imageRef}
        src={HERO_IMAGE}
        alt="Luxury automobile"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'scale(1.05)',
        }}
      />

      {/* Video — hidden until ready, then crossfades over image */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="auto"
        onCanPlayThrough={handleVideoReady}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0,
        }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Dark gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(8,8,8,0.25) 0%, rgba(8,8,8,0.5) 60%, rgba(8,8,8,0.85) 100%)',
          zIndex: 1,
        }}
      />

      {/* Side vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(8,8,8,0.4) 0%, transparent 30%, transparent 70%, rgba(8,8,8,0.4) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {/* Oversized editorial heading */}
        <h1
          ref={headingRef}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(56px, 10vw, 140px)',
            letterSpacing: '0.18em',
            color: '#F5F5F5',
            lineHeight: 1,
            margin: '0 0 24px',
            textTransform: 'uppercase',
          }}
        >
          OUR COLLECTION
        </h1>

        {/* Gold divider line */}
        <div
          style={{
            width: '60px',
            height: '1px',
            background: '#C9A96E',
            margin: '0 auto 24px',
          }}
        />

        {/* Subheadline */}
        <p
          ref={subRef}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            fontSize: 'clamp(16px, 2vw, 22px)',
            letterSpacing: '0.25em',
            color: 'rgba(245,245,245,0.7)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Engineering Luxury Redefined
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <div
          ref={scrollLineRef}
          style={{
            width: '1px',
            height: '50px',
            background: 'linear-gradient(to bottom, #C9A96E, transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
        <span
          ref={scrollTextRef}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            fontSize: '9px',
            letterSpacing: '0.3em',
            color: 'rgba(245,245,245,0.5)',
            textTransform: 'uppercase',
          }}
        >
          SCROLL
        </span>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }

        @media (max-width: 768px) {
          section h1 {
            letter-spacing: 0.1em !important;
          }
        }
      `}</style>
    </section>
  )
}