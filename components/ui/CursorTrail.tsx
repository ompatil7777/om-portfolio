'use client'
import { useEffect, useRef } from 'react'

interface Trail {
    x: number
    y: number
    life: number
    maxLife: number
    size: number
    color: string
}

const COLORS = ['#00D4FF', '#7B2FFF', '#00FFC8', '#BD00FF']

export default function CursorTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        const trails: Trail[] = []
        let mouseX = -999, mouseY = -999
        let raf: number

        const onMove = (e: MouseEvent) => {
            mouseX = e.clientX
            mouseY = e.clientY

            // Spawn trail particle
            if (Math.random() > 0.35) {
                trails.push({
                    x: mouseX + (Math.random() - 0.5) * 4,
                    y: mouseY + (Math.random() - 0.5) * 4,
                    life: 0,
                    maxLife: 20 + Math.random() * 20,
                    size: Math.random() * 3 + 1,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                })
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Update & draw trails
            for (let i = trails.length - 1; i >= 0; i--) {
                const t = trails[i]
                t.life++
                if (t.life >= t.maxLife) { trails.splice(i, 1); continue }

                const progress = t.life / t.maxLife
                const alpha = (1 - progress) * 0.6
                const size = t.size * (1 - progress * 0.5)

                ctx.beginPath()
                ctx.arc(t.x, t.y - progress * 8, size, 0, Math.PI * 2)
                ctx.fillStyle = t.color + Math.floor(alpha * 255).toString(16).padStart(2, '0')
                ctx.fill()
            }

            raf = requestAnimationFrame(draw)
        }
        draw()

        window.addEventListener('mousemove', onMove)
        return () => {
            cancelAnimationFrame(raf)
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMove)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed', inset: 0,
                zIndex: 99996,
                pointerEvents: 'none',
            }}
        />
    )
}
