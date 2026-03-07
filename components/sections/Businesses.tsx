'use client'
import { useEffect, useRef, useState } from 'react'

function useInView(ref: React.RefObject<Element | null>) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [ref])
    return inView
}

const BUSINESSES = [
    {
        name: 'Urban Nest Realty',
        type: 'Real Estate Business',
        description: 'Providing premium real estate consulting, property management, and investment strategies. Helping clients find their perfect homes and lucrative commercial spaces in prime locations.',
        icon: '🏢',
        color: '#00D4FF',
        metrics: ['Residential', 'Commercial', 'Consulting'],
        link: '#',
    },
    {
        name: 'CloudCraft Digital',
        type: 'Freelance Agency',
        description: 'A boutique digital agency offering full-stack web development, workflow automation via n8n, and tailored cloud solutions for modern startups and SMEs.',
        icon: '⚡',
        color: '#7B2FFF',
        metrics: ['Web Dev', 'Automation', 'Cloud Setup'],
        link: '#',
    },
]

export default function Businesses() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef)

    return (
        <section id="businesses" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #050810 0%, #020409 100%)' }}>
            <div className="blob blob-blue" style={{ width: 500, height: 500, top: '20%', left: '-15%', opacity: 0.08 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{
                    opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                    textAlign: 'center', marginBottom: 64,
                }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Ventures</div>
                    <h2 className="section-heading">
                        Businesses & <span className="gradient-text">Agencies</span>
                    </h2>
                    <p style={{ color: '#8892A4', fontSize: 16, fontFamily: 'Outfit, sans-serif', maxWidth: 480, margin: '0 auto' }}>
                        Beyond code — building and scaling successful business ventures across different industries.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: 32,
                }}>
                    {BUSINESSES.map((biz, i) => (
                        <div key={biz.name} className="glass" style={{
                            padding: 40,
                            borderRadius: 24,
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(40px)',
                            transition: `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.15}s`,
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Background accent */}
                            <div style={{
                                position: 'absolute', top: 0, right: 0,
                                width: 150, height: 150,
                                background: `radial-gradient(circle at top right, ${biz.color}33, transparent)`,
                                borderRadius: '0 24px 0 100%',
                            }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: 16,
                                    background: `${biz.color}15`, border: `1px solid ${biz.color}44`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 28, boxShadow: `0 0 24px ${biz.color}22`,
                                }}>
                                    {biz.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: '#F0F6FF' }}>
                                        {biz.name}
                                    </h3>
                                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: biz.color, fontWeight: 500, letterSpacing: 1 }}>
                                        {biz.type.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: '#8892A4', lineHeight: 1.7, marginBottom: 32, minHeight: 80 }}>
                                {biz.description}
                            </p>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                                {biz.metrics.map(m => (
                                    <span key={m} style={{
                                        padding: '6px 12px', borderRadius: 100,
                                        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                                        fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#F0F6FF',
                                    }}>
                                        {m}
                                    </span>
                                ))}
                            </div>

                            <a
                                href={biz.link}
                                className="magnetic-btn"
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8,
                                    fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 600,
                                    color: biz.color, textDecoration: 'none',
                                }}
                            >
                                Explore Venture <span style={{ transition: 'transform 0.3s ease' }}>→</span>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
