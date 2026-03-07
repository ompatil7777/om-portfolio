'use client'
import { useEffect, useRef, useState } from 'react'
import GitHubStats from '@/components/ui/GitHubStats'

function useInView(ref: React.RefObject<Element | null>) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [ref])
    return inView
}

export default function OpenSource() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef)

    return (
        <section id="github" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #020409 0%, #050810 50%, #020409 100%)' }}>
            <div className="blob blob-cyan" style={{ width: 400, height: 400, top: '10%', left: '-10%', opacity: 0.05 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{
                    opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                    textAlign: 'center', marginBottom: 64,
                }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Open Source</div>
                    <h2 className="section-heading" style={{ position: 'relative', display: 'inline-block' }}>
                        <span className="gradient-text glow-cyan" style={{ display: 'inline-block', animation: 'neonFlicker 3s infinite' }}>GitHub</span> Activity
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), transparent)', filter: 'blur(10px)', animation: 'shimmer 2s infinite', mixBlendMode: 'overlay', pointerEvents: 'none' }} />
                    </h2>
                    <p style={{ color: '#8892A4', fontSize: 16, fontFamily: 'Outfit, sans-serif', maxWidth: 480, margin: '0 auto' }}>
                        Building in public — explore repos, contributions, and open-source work
                    </p>
                    <a
                        href={`https://github.com/ompatil7777`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-neon"
                        style={{ marginTop: 24, display: 'inline-flex', fontSize: 13 }}
                    >
                        🐙 View GitHub Profile
                    </a>
                </div>

                <GitHubStats />
            </div>
        </section>
    )
}
