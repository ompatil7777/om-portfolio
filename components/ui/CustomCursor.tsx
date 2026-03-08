'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const [hovering, setHovering] = useState(false)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        let mouseX = 0, mouseY = 0
        let cursorX = 0, cursorY = 0
        let glowX = 0, glowY = 0
        let raf: number

        const onMove = (e: MouseEvent) => {
            if (!visible) setVisible(true) // Show cursor only after user moves mouse
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const hoverable = target.closest('a, button, [data-hover], .nav-link, .project-card, .orbit-skill-node, .service-card')
            setHovering(!!hoverable)
        }

        const animate = () => {
            cursorX += (mouseX - cursorX) * 0.3 // Fast follow for main cursor
            cursorY += (mouseY - cursorY) * 0.3
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`
            }

            glowX += (mouseX - glowX) * 0.1 // Slower follow for trailing glow
            glowY += (mouseY - glowY) * 0.1
            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`
            }
            raf = requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseover', onMouseOver)
        raf = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseover', onMouseOver)
            cancelAnimationFrame(raf)
        }
    }, [visible])

    // Hide if mobile/touch device
    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) {
            setVisible(false)
        }
    }, [])

    return (
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease', pointerEvents: 'none', zIndex: 999999, position: 'fixed', inset: 0 }}>
            <div ref={glowRef} className="cursor-glow" />
            <div ref={cursorRef} className={`anime-cursor ${hovering ? 'hovering' : ''}`}>
                <svg viewBox="0 0 100 100" width="36" height="36" className="shuriken-svg">
                    <path d="M50 0L56 40L96 30L64 56L90 90L50 68L10 90L36 56L4 30L44 40Z" fill="#00FFC8" />
                    <circle cx="50" cy="50" r="10" fill="#020409" stroke="#00FFC8" strokeWidth="2" />
                </svg>
            </div>
        </div>
    )
}
