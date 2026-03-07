'use client'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [visible, setVisible] = useState(false)
    const mouseRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    // Particle canvas
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        let animId: number

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const particles = Array.from({ length: 120 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
        }))

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach(p => {
                // Mouse repulsion
                const dx = p.x - mouseRef.current.x
                const dy = p.y - mouseRef.current.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 120) {
                    p.vx += (dx / dist) * 0.3
                    p.vy += (dy / dist) * 0.3
                }

                p.vx *= 0.99
                p.vy *= 0.99
                p.x += p.vx
                p.y += p.vy

                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`
                ctx.fill()
            })

            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 100) {
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 100)})`
                        ctx.lineWidth = 0.5
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.stroke()
                    }
                }
            }

            animId = requestAnimationFrame(draw)
        }
        draw()

        const onMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener('mousemove', onMove)

        return () => {
            cancelAnimationFrame(animId)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMove)
        }
    }, [])

    const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })

    return (
        <section
            id="hero"
            style={{
                position: 'relative',
                minHeight: '100dvh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'radial-gradient(ellipse at center, #0A0E1A 0%, #020409 60%)',
            }}
        >
            {/* Particle Canvas */}
            <canvas
                ref={canvasRef}
                style={{ position: 'absolute', inset: 0, zIndex: 0 }}
            />

            {/* Gradient Blobs */}
            <div className="blob blob-blue" style={{ width: 600, height: 600, top: '-10%', left: '-15%' }} />
            <div className="blob blob-violet" style={{ width: 500, height: 500, bottom: '-10%', right: '-10%', opacity: 0.12 }} />
            <div className="blob blob-cyan" style={{ width: 300, height: 300, top: '40%', right: '10%', opacity: 0.08 }} />

            {/* Floating Geometric Shapes */}
            <div className="float-1" style={{
                position: 'absolute', top: '15%', right: '8%',
                width: 80, height: 80,
                border: '1px solid rgba(0,212,255,0.2)',
                borderRadius: 12,
                transform: 'rotate(45deg)',
                boxShadow: '0 0 30px rgba(0,212,255,0.08)',
                zIndex: 1,
            }} />
            <div className="float-2" style={{
                position: 'absolute', bottom: '20%', left: '6%',
                width: 60, height: 60,
                border: '1px solid rgba(123,47,255,0.2)',
                borderRadius: '50%',
                boxShadow: '0 0 30px rgba(123,47,255,0.08)',
                zIndex: 1,
            }} />
            <div className="float-3" style={{
                position: 'absolute', top: '30%', left: '12%',
                width: 40, height: 40,
                border: '1px solid rgba(0,255,200,0.2)',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                background: 'rgba(0,255,200,0.03)',
                zIndex: 1,
            }} />

            {/* Hero Content */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    textAlign: 'center',
                    padding: '0 max(24px, 5vw)',
                    maxWidth: 900,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                }}
            >
                {/* Available Badge */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                    <div className="available-badge" style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(-10px)',
                        transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                    }}>
                        <span className="pulse-dot" />
                        Available for Work
                    </div>
                </div>

                {/* Main Heading */}
                <h1
                    className="glow-blue"
                    style={{
                        fontFamily: 'Syne, sans-serif',
                        fontSize: 'clamp(72px, 14vw, 140px)',
                        fontWeight: 800,
                        lineHeight: 0.9,
                        letterSpacing: '-0.04em',
                        color: '#F0F6FF',
                        textShadow: '0 0 60px rgba(0,212,255,0.5), 0 0 120px rgba(0,212,255,0.2)',
                        marginBottom: 24,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(40px)',
                        transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
                    }}
                >
                    OM
                </h1>

                {/* Sub heading */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 16,
                        marginBottom: 24,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
                    }}
                >
                    {['Cloud', 'DevOps', 'Backend Engineer'].map((t, i) => (
                        <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <span style={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontSize: 'clamp(14px, 2vw, 20px)',
                                fontWeight: 500,
                                color: '#8892A4',
                                letterSpacing: '0.05em',
                            }}>
                                {t}
                            </span>
                            {i < 2 && (
                                <span style={{
                                    width: 5, height: 5, borderRadius: '50%',
                                    background: '#00D4FF',
                                    boxShadow: '0 0 10px #00D4FF',
                                    animation: `dotPulse ${1.5 + i * 0.5}s ease-in-out infinite`,
                                }} />
                            )}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <p
                    style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 'clamp(15px, 1.5vw, 18px)',
                        color: 'rgba(240,246,255,0.55)',
                        maxWidth: 560,
                        margin: '0 auto 48px',
                        lineHeight: 1.7,
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s',
                    }}
                >
                    Engineering cloud infrastructure that scales to millions, automating the impossible, and securing what matters most.
                </p>

                {/* CTA Row */}
                <div
                    style={{
                        display: 'flex',
                        gap: 16,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        opacity: visible ? 1 : 0,
                        transform: visible ? 'scale(1)' : 'scale(0.9)',
                        transition: 'opacity 0.8s ease 0.8s, transform 0.8s ease 0.8s',
                    }}
                >
                    <button
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-neon-filled"
                        style={{ fontSize: 14 }}
                    >
                        <span>View Projects</span>
                        <span>→</span>
                    </button>
                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="btn-neon"
                        style={{ fontSize: 14 }}
                    >
                        <span>Contact Me</span>
                    </button>
                    <a
                        href="/resume.pdf"
                        download
                        className="btn-neon"
                        style={{ fontSize: 14, borderColor: 'rgba(255,255,255,0.15)', color: '#8892A4' }}
                    >
                        <span>↓ Resume</span>
                    </a>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                onClick={scrollToAbout}
                style={{
                    position: 'absolute',
                    bottom: 40,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    background: 'none',
                    border: 'none',
                    cursor: 'none',
                    opacity: visible ? 1 : 0,
                    transition: 'opacity 0.8s ease 1.2s',
                    zIndex: 10,
                }}
            >
                <span style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 11,
                    letterSpacing: '0.15em',
                    color: '#4A5568',
                    textTransform: 'uppercase',
                }}>
                    scroll to explore
                </span>
                <div style={{ animation: 'float 2s ease-in-out infinite' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 4v12M5 11l5 5 5-5" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </button>
        </section>
    )
}
