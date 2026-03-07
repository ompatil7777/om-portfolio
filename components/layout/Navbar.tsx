'use client'
import { useEffect, useRef, useState } from 'react'
import { NAV_ITEMS } from '@/lib/constants'
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [active, setActive] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)
    const logoClickCount = useRef(0)
    const logoClickTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50)
            // Detect active section
            const sections = NAV_ITEMS.map(n => n.href.replace('#', ''))
            for (const id of [...sections].reverse()) {
                const el = document.getElementById(id)
                if (el && window.scrollY >= el.offsetTop - 120) {
                    setActive(`#${id}`)
                    break
                }
            }
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (href: string) => {
        const id = href.replace('#', '')
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    // Easter egg: Konami code
    useEffect(() => {
        const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
        let pos = 0
        const onKey = (e: KeyboardEvent) => {
            if (e.key === seq[pos]) {
                pos++
                if (pos === seq.length) {
                    matrixRain()
                    pos = 0
                }
            } else {
                pos = 0
            }
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    // Easter egg: sudo hire om typed anywhere
    useEffect(() => {
        let typed = ''
        const trigger = 'sudo hire om'
        const onKey = (e: KeyboardEvent) => {
            typed += e.key.toLowerCase()
            if (typed.includes(trigger)) {
                typed = ''
                alert('✅ Excellent choice! Running background checks...\n[████████████████████] 100%\nStatus: HIGHLY RECOMMENDED 🚀\nLet\'s build something great together!')
            }
            if (typed.length > 30) typed = typed.slice(-30)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [])

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0,
                zIndex: 1000,
                padding: '0 max(24px, 4vw)',
                height: 72,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
                background: scrolled ? 'rgba(2, 4, 9, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
            }}
        >
            {/* Logo — triple-click triggers confetti easter egg */}
            <button
                onClick={() => {
                    logoClickCount.current += 1
                    if (logoClickTimer.current) clearTimeout(logoClickTimer.current)
                    if (logoClickCount.current >= 3) {
                        logoClickCount.current = 0
                        triggerConfetti()
                        return
                    }
                    logoClickTimer.current = setTimeout(() => {
                        if (logoClickCount.current === 1) window.scrollTo({ top: 0, behavior: 'smooth' })
                        logoClickCount.current = 0
                    }, 350)
                }}
                style={{ background: 'none', border: 'none', cursor: 'none', padding: 0 }}
                id="logo-btn"
            >
                <span style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 28,
                    fontWeight: 800,
                    color: '#00D4FF',
                    textShadow: '0 0 20px rgba(0,212,255,0.8)',
                    letterSpacing: '-0.02em',
                }}>
                    A.
                </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
                {NAV_ITEMS.map(item => (
                    <button
                        key={item.href}
                        onClick={() => scrollTo(item.href)}
                        className={`nav-link ${active === item.href ? 'active' : ''}`}
                        style={{ background: 'none', border: 'none' }}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            {/* Right actions */}
            <div className="hidden md:flex items-center gap-4">
                <ThemeToggle />
                <button
                    onClick={() => scrollTo('#contact')}
                    className="btn-neon-filled"
                    style={{ fontSize: 13, padding: '10px 24px' }}
                >
                    Hire Me ✦
                </button>
            </div>

            {/* Mobile menu button */}
            <button
                className="flex md:hidden flex-col gap-[5px]"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ background: 'none', border: 'none', cursor: 'none', padding: 8 }}
                aria-label="Toggle menu"
            >
                {[0, 1, 2].map(i => (
                    <span key={i} style={{
                        display: 'block', width: 22, height: 1.5,
                        background: '#F0F6FF',
                        transition: 'all 0.3s ease',
                        transform: menuOpen && i === 0 ? 'rotate(45deg) translate(4px, 4px)' :
                            menuOpen && i === 2 ? 'rotate(-45deg) translate(4px, -4px)' :
                                menuOpen && i === 1 ? 'scaleX(0)' : 'none',
                        opacity: menuOpen && i === 1 ? 0 : 1,
                    }} />
                ))}
            </button>

            {/* Mobile Menu */}
            {menuOpen && (
                <div style={{
                    position: 'fixed', top: 72, left: 0, right: 0,
                    background: 'rgba(2,4,9,0.98)',
                    backdropFilter: 'blur(24px)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    padding: '24px',
                    display: 'flex', flexDirection: 'column', gap: 16,
                    zIndex: 999,
                }}>
                    {NAV_ITEMS.map(item => (
                        <button
                            key={item.href}
                            onClick={() => scrollTo(item.href)}
                            className="nav-link"
                            style={{ background: 'none', border: 'none', textAlign: 'left', fontSize: 18 }}
                        >
                            {item.label}
                        </button>
                    ))}
                    <button onClick={() => scrollTo('#contact')} className="btn-neon-filled" style={{ marginTop: 8 }}>
                        Hire Me ✦
                    </button>
                </div>
            )}
        </nav>
    )
}

function matrixRain() {
    const canvas = document.createElement('canvas')
    canvas.className = 'matrix-canvas'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    document.body.appendChild(canvas)
    const ctx = canvas.getContext('2d')!
    const cols = Math.floor(window.innerWidth / 14)
    const drops: number[] = Array(cols).fill(1)
    const chars = 'アイウエオカキクケコサシスセソ01OM'.split('')
    let frame = 0

    const draw = () => {
        ctx.fillStyle = 'rgba(2,4,9,0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#00D4FF'
        ctx.font = '13px JetBrains Mono'
        drops.forEach((y, x) => {
            ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x * 14, y * 14)
            if (y * 14 > canvas.height && Math.random() > 0.975) drops[x] = 0
            drops[x]++
        })
        frame++
    }

    const interval = setInterval(draw, 50)
    setTimeout(() => {
        clearInterval(interval)
        canvas.remove()
    }, 3000)
}

function triggerConfetti() {
    for (let i = 0; i < 60; i++) {
        const el = document.createElement('div')
        const tx = (Math.random() - 0.5) * 400
        const ty = -(Math.random() * 300 + 100)
        el.style.cssText = `
      position: fixed;
      top: 50%; left: 50%;
      width: 8px; height: 8px;
      border-radius: 50%;
      background: ${['#00D4FF', '#7B2FFF', '#00FFC8', '#BD00FF'][Math.floor(Math.random() * 4)]};
      pointer-events: none;
      z-index: 999999;
      --tx: ${tx}px; --ty: ${ty}px;
      animation: confettiBurst 1.2s ease-out forwards;
      animation-delay: ${Math.random() * 0.3}s;
    `
        document.body.appendChild(el)
        setTimeout(() => el.remove(), 2000)
    }
}
