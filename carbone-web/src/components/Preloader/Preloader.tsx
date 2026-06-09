import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import logo from '../../assets/logo.png'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const lineTopRef = useRef<HTMLDivElement>(null)
  const lineBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    gsap.set(logoRef.current, { opacity: 0, scale: 0.6 })
    gsap.set(lineTopRef.current, { scaleX: 0 })
    gsap.set(lineBottomRef.current, { scaleX: 0 })
    gsap.set(curtainRef.current, { yPercent: 0 })

    tl
      .to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power3.out',
      })
      .to([lineTopRef.current, lineBottomRef.current], {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.inOut',
      }, '-=0.4')
      .to({}, { duration: 0.5 })
      .to(logoRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.6,
        ease: 'power2.in',
      })
      .to([lineTopRef.current, lineBottomRef.current], {
        scaleX: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, '-=0.4')
      .to(curtainRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        onComplete,
      })

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={curtainRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#080808',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
        }}
      >
        <div
          ref={lineTopRef}
          style={{
            width: '120px',
            height: '1px',
            background: '#C9A96E',
            transformOrigin: 'center',
          }}
        />

        <img
          ref={logoRef}
          src={logo}
          alt="Carbone"
          style={{
            width: '180px',
            height: 'auto',
           
            mixBlendMode: 'screen',
          }}
        />

        <div
          ref={lineBottomRef}
          style={{
            width: '120px',
            height: '1px',
            background: '#C9A96E',
            transformOrigin: 'center',
          }}
        />
      </div>
    </div>
  )
}