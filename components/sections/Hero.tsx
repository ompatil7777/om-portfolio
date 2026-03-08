'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const mouseRef = useRef({ x: 0, y: 0 })
    const [visible, setVisible] = useState(false)

    // Framer Motion Scroll Drivers
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Cinematic scroll transformations
    const scaleText = useTransform(scrollYProgress, [0, 0.4], [1, 5])
    const opacityText = useTransform(scrollYProgress, [0, 0.3], [1, 0])
    const yText = useTransform(scrollYProgress, [0, 0.4], [0, 200])

    // Anime Speed Lines Opacity
    const speedLinesOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.6], [0, 0.8, 0])

    // Background dimming
    const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3])

    // Character translations (Anime Touch)
    const kanjiY1 = useTransform(scrollYProgress, [0, 0.5], [0, -400])
    const kanjiY2 = useTransform(scrollYProgress, [0, 0.5], [0, 400])

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    // Particle canvas remains immersive
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

        const particles = Array.from({ length: 80 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
            color: Math.random() > 0.5 ? '#00FFC8' : '#7B2FFF' // Anime neon palette
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
                ctx.fillStyle = p.color
                ctx.globalAlpha = p.alpha
                ctx.fill()
            })
            ctx.globalAlpha = 1

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
            ref={containerRef}
            style={{
                position: 'relative',
                height: '300vh', // Extended height for scroll-driven animations
                background: '#020409',
            }}
        >
            {/* Sticky Container for Cinematic Viewport */}
            <div style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <motion.div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: bgOpacity }}>
                    {/* Particle Canvas */}
                    <canvas
                        ref={canvasRef}
                        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
                    />

                    {/* Dark gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 0%, #020409 80%)' }} />

                    {/* Gradient Blobs */}
                    <div className="blob blob-blue" style={{ width: 600, height: 600, top: '-10%', left: '-15%' }} />
                    <div className="blob blob-violet" style={{ width: 500, height: 500, bottom: '-10%', right: '-10%', opacity: 0.12 }} />
                    <div className="blob blob-cyan" style={{ width: 300, height: 300, top: '40%', right: '10%', opacity: 0.08 }} />
                </motion.div>

                {/* Anime Speed Lines Effect (Shows on Scroll) */}
                <motion.div
                    style={{
                        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                        opacity: speedLinesOpacity,
                        backgroundImage: 'repeating-radial-gradient(circle at center, transparent 0, transparent 40px, rgba(123, 47, 255, 0.05) 41px, transparent 42px)',
                        backgroundSize: '100px 100px',
                        mixBlendMode: 'screen',
                        animation: 'spin 10s linear infinite'
                    }}
                />

                {/* Floating Japanese Typography (Anime Aesthetic) */}
                <motion.div style={{
                    position: 'absolute', left: '5%', top: '20%', zIndex: 2,
                    fontFamily: 'JetBrains Mono', fontSize: '10vh', fontWeight: 800,
                    color: 'rgba(0, 255, 200, 0.03)', WebkitTextStroke: '1px rgba(0,255,200,0.1)',
                    writingMode: 'vertical-rl', textOrientation: 'upright',
                    y: kanjiY1
                }}>
                    自動化
                </motion.div>
                <motion.div style={{
                    position: 'absolute', right: '5%', bottom: '10%', zIndex: 2,
                    fontFamily: 'JetBrains Mono', fontSize: '10vh', fontWeight: 800,
                    color: 'rgba(123, 47, 255, 0.03)', WebkitTextStroke: '1px rgba(123,47,255,0.1)',
                    writingMode: 'vertical-rl', textOrientation: 'upright',
                    y: kanjiY2
                }}>
                    エンジニア
                </motion.div>

                {/* Main Content (Scales and fades out on scroll) */}
                <motion.div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        textAlign: 'center',
                        padding: '0 max(24px, 5vw)',
                        maxWidth: 900,
                        scale: scaleText,
                        opacity: opacityText,
                        y: yText,
                        filter: visible ? 'blur(0px)' : 'blur(10px)',
                        transition: 'filter 1s ease-out'
                    }}
                >
                    {/* Available Badge */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
                        <div className="available-badge" style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0)' : 'translateY(-10px)',
                            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
                            boxShadow: '0 0 20px rgba(0,255,200,0.2), inset 0 0 10px rgba(0,255,200,0.1)',
                            borderColor: 'rgba(0,255,200,0.3)',
                            color: '#00FFC8'
                        }}>
                            <span className="pulse-dot" style={{ background: '#00FFC8' }} />
                            System Ready // Available
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1
                        className="glow-blue"
                        style={{
                            fontFamily: 'Syne, sans-serif',
                            fontSize: 'clamp(72px, 14vw, 150px)',
                            fontWeight: 800,
                            lineHeight: 0.9,
                            letterSpacing: '-0.04em',
                            color: '#F0F6FF',
                            textShadow: '0 0 60px rgba(0,212,255,0.5), 0 0 120px rgba(0,212,255,0.2)',
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
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
                            marginTop: 16,
                            marginBottom: 24,
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s',
                        }}
                    >
                        {['Cloud', 'DevOps', 'Master Architect'].map((t, i) => (
                            <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <span style={{
                                    fontFamily: 'Space Grotesk, sans-serif',
                                    fontSize: 'clamp(12px, 2vw, 18px)',
                                    fontWeight: 600,
                                    color: '#A78BFA',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase'
                                }}>
                                    {t}
                                </span>
                                {i < 2 && (
                                    <span style={{
                                        width: 5, height: 5, borderRadius: '50%',
                                        background: '#00FFC8',
                                        boxShadow: '0 0 10px #00FFC8',
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
                            color: '#8892A4',
                            maxWidth: 560,
                            margin: '0 auto 48px',
                            lineHeight: 1.7,
                            opacity: visible ? 1 : 0,
                            transform: visible ? 'translateY(0)' : 'translateY(15px)',
                            transition: 'opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s',
                        }}
                    >
                        Forging cloud infrastructure that scales, summoning seamless automated workflows, and engineering the future of the web.
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
                            style={{ fontSize: 14, background: 'linear-gradient(135deg, #7B2FFF, #00FFC8)', color: '#020409', boxShadow: '0 0 30px rgba(0,255,200,0.3)' }}
                        >
                            <span>Explore Projects</span>
                            <span>→</span>
                        </button>
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="btn-neon"
                            style={{ fontSize: 14, borderColor: '#7B2FFF', color: '#A78BFA' }}
                        >
                            <span>Contact Me</span>
                        </button>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        left: '50%',
                        x: '-50%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        background: 'none',
                        border: 'none',
                        opacity: opacityText, // Fades out with the text
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
                        Scroll to ascend
                    </span>
                    <div style={{ animation: 'float 2s ease-in-out infinite' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 4v12M5 11l5 5 5-5" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </motion.div>
            </div >
        </section >
    )
}
