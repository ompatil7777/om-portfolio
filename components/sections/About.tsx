'use client'
import { useEffect, useRef, useState } from 'react'
import { TIMELINE } from '@/lib/constants'

const stats = [
    { value: 10, suffix: '+', label: 'Projects' },
    { value: 8, suffix: '+', label: 'Technologies' },
    { value: 3, suffix: '+', label: 'Cloud Certs' },
    { value: '∞', suffix: '', label: 'Coffee Cups' },
]

function useInView(ref: React.RefObject<Element | null>, threshold = 0.2) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setInView(true)
        }, { threshold })
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [ref, threshold])
    return inView
}

function Counter({ target, suffix }: { target: number | string; suffix: string }) {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref)

    useEffect(() => {
        if (!inView || typeof target !== 'number') return
        let start = 0
        const end = target
        const duration = 1800
        const step = (duration / end)
        const timer = setInterval(() => {
            start++
            setCount(start)
            if (start >= end) clearInterval(timer)
        }, step)
        return () => clearInterval(timer)
    }, [inView, target])

    return (
        <div ref={ref} className="stat-number">
            {typeof target === 'string' ? target : count}{suffix}
        </div>
    )
}

export default function About() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef)

    return (
        <section id="about" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* BG blobs */}
            <div className="blob blob-violet" style={{ width: 400, height: 400, top: '0%', right: '-10%', opacity: 0.08 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                }}>
                    <div className="section-label">About Me</div>
                    <h2 className="section-heading">
                        The Engineer<br />
                        <span className="gradient-text">Behind the Stack</span>
                    </h2>
                </div>

                {/* Content Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 64,
                    alignItems: 'center',
                    marginTop: 64,
                }}>
                    {/* Left: Text */}
                    <div style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateX(0)' : 'translateX(-30px)',
                        transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
                    }}>
                        {[
                            "Hey, I'm Om.",
                            "A passionate Cloud and DevOps Engineer obsessed with building scalable infrastructure, automating the boring parts, and securing architectures that don't sleep.",
                            "From Kubernetes clusters to CI/CD pipelines — I engineer systems that scale, breathe, and self-heal."
                        ].map((text, i) => (
                            <p key={i} style={{
                                fontFamily: i === 0 ? 'Syne, sans-serif' : 'Outfit, sans-serif',
                                fontSize: i === 0 ? 'clamp(28px, 3.5vw, 40px)' : 'clamp(15px, 1.5vw, 17px)',
                                fontWeight: i === 0 ? 700 : 400,
                                color: i === 0 ? '#F0F6FF' : '#8892A4',
                                lineHeight: i === 0 ? 1.15 : 1.8,
                                marginBottom: i === 0 ? 24 : 20,
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(15px)',
                                transition: `opacity 0.7s ease ${0.3 + i * 0.15}s, transform 0.7s ease ${0.3 + i * 0.15}s`,
                            }}>
                                {text}
                            </p>
                        ))}

                        {/* Tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 32 }}>
                            {['AWS Certified', 'Open Source', 'DevOps Enthusiast', 'Cloud Native', 'Go Developer', 'Linux Sysadmin'].map((tag, i) => (
                                <span key={tag} className="skill-badge" style={{
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateY(0)' : 'translateY(10px)',
                                    transition: `opacity 0.5s ease ${0.6 + i * 0.08}s, transform 0.5s ease ${0.6 + i * 0.08}s`,
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right: Avatar + Timeline */}
                    <div style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateX(0)' : 'translateX(30px)',
                        transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
                    }}>
                        {/* Avatar hexagon */}
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
                            <div style={{ position: 'relative', width: 160, height: 160 }}>
                                <div style={{
                                    width: 160, height: 160,
                                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                                    background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,47,255,0.15))',
                                    border: '2px solid rgba(0,212,255,0.3)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 64,
                                    boxShadow: '0 0 40px rgba(0,212,255,0.2)',
                                    animation: 'float 5s ease-in-out infinite',
                                }}>
                                    👨‍💻
                                </div>
                                {/* Orbiting badges */}
                                {['☁️ AWS', '⚓ K8s', '🔐 Security'].map((b, i) => (
                                    <div key={b} style={{
                                        position: 'absolute',
                                        width: 64,
                                        height: 24,
                                        borderRadius: 100,
                                        background: 'rgba(2,4,9,0.95)',
                                        border: '1px solid rgba(0,212,255,0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontFamily: 'JetBrains Mono, monospace',
                                        fontSize: 9,
                                        color: '#00D4FF',
                                        top: `${[(-16), 70, 140][i]}px`,
                                        left: `${[100, 140, 60][i]}px`,
                                        animation: `float ${4 + i}s ease-in-out infinite ${i * 0.5}s`,
                                        boxShadow: '0 0 12px rgba(0,212,255,0.2)',
                                    }}>
                                        {b}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div style={{ position: 'relative' }}>
                            <div className="timeline-line" />
                            {TIMELINE.map((item, i) => (
                                <div key={item.year} className={`timeline-node ${inView ? 'active' : ''}`} style={{
                                    opacity: inView ? 1 : 0,
                                    transform: inView ? 'translateX(0)' : 'translateX(-20px)',
                                    transition: `opacity 0.6s ease ${0.5 + i * 0.12}s, transform 0.6s ease ${0.5 + i * 0.12}s`,
                                }}>
                                    <div className="timeline-dot" />
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                                            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#00D4FF' }}>{item.year}</span>
                                            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, fontWeight: 600, color: '#F0F6FF' }}>{item.role}</span>
                                        </div>
                                        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: '#8892A4', lineHeight: 1.6 }}>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1,
                    marginTop: 80,
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 20,
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.02)',
                }}>
                    {stats.map((s, i) => (
                        <div key={s.label} className="stat-card" style={{
                            borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(20px)',
                            transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                        }}>
                            <Counter target={s.value} suffix={s.suffix} />
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
