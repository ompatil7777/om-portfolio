'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null)
    const ringRef = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const [hovering, setHovering] = useState(false)

    useEffect(() => {
        let mouseX = 0, mouseY = 0
        let ringX = 0, ringY = 0
        let glowX = 0, glowY = 0
        let raf: number

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY
        }

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const hoverable = target.closest('a, button, [data-hover], .nav-link, .project-card, .orbit-skill-node, .service-card')
            setHovering(!!hoverable)
        }

        const animate = () => {
            if (dotRef.current) {
                dotRef.current.style.left = mouseX + 'px'
                dotRef.current.style.top = mouseY + 'px'
            }
            ringX += (mouseX - ringX) * 0.15
            ringY += (mouseY - ringY) * 0.15
            if (ringRef.current) {
                ringRef.current.style.left = ringX + 'px'
                ringRef.current.style.top = ringY + 'px'
            }
            glowX += (mouseX - glowX) * 0.06
            glowY += (mouseY - glowY) * 0.06
            if (glowRef.current) {
                glowRef.current.style.left = glowX + 'px'
                glowRef.current.style.top = glowY + 'px'
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
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
            <div ref={glowRef} className="cursor-glow" />
        </>
    )
}
