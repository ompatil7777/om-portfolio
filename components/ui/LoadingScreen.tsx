'use client'
import { useEffect, useRef, useState } from 'react'

interface LoadingScreenProps {
    onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState<'loading' | 'typing' | 'split' | 'done'>('loading')
    const [typedText, setTypedText] = useState('')
    const leftRef = useRef<HTMLDivElement>(null)
    const rightRef = useRef<HTMLDivElement>(null)
    const fullText = 'OM PORTFOLIO'

    useEffect(() => {
        // Phase 1: Loading bar
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval)
                    setPhase('typing')
                    return 100
                }
                return p + Math.random() * 8 + 2
            })
        }, 60)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (phase !== 'typing') return
        let i = 0
        const typeInterval = setInterval(() => {
            setTypedText(fullText.slice(0, i + 1))
            i++
            if (i >= fullText.length) {
                clearInterval(typeInterval)
                setTimeout(() => setPhase('split'), 300)
            }
        }, 80)
        return () => clearInterval(typeInterval)
    }, [phase])

    useEffect(() => {
        if (phase !== 'split') return
        if (leftRef.current) leftRef.current.style.transform = 'translateX(-100%)'
        if (rightRef.current) rightRef.current.style.transform = 'translateX(100%)'
        setTimeout(() => {
            setPhase('done')
            onComplete()
        }, 700)
    }, [phase, onComplete])

    if (phase === 'done') return null

    return (
        <div className="loading-screen" style={{ position: 'fixed', inset: 0, zIndex: 999999, background: '#020409', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32, overflow: 'hidden' }}>
            {/* Split overlay */}
            <div ref={leftRef} className="loading-split-left" style={{ transition: 'transform 0.7s cubic-bezier(0.76,0,0.24,1)' }} />
            <div ref={rightRef} className="loading-split-right" style={{ transition: 'transform 0.7s cubic-bezier(0.76,0,0.24,1)' }} />

            {/* Logo SVG draw */}
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ opacity: phase === 'loading' ? 1 : 1 }}>
                <path
                    d="M 8 56 L 32 8 L 56 56 M 20 36 L 44 36"
                    stroke="#00D4FF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    strokeDasharray="200"
                    strokeDashoffset="200"
                    style={{ animation: 'drawLine 0.8s ease forwards' }}
                />
            </svg>

            <div style={{ textAlign: 'center' }}>
                <div className="loading-bar-track" style={{ width: 280, height: 2 }}>
                    <div className="loading-bar-fill" style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#8892A4', marginTop: 12, letterSpacing: '0.15em' }}>
                    {phase === 'loading' && `Initializing... ${Math.min(Math.round(progress), 100)}%`}
                    {(phase === 'typing' || phase === 'split') && (
                        <span style={{ color: '#F0F6FF', fontSize: 18, letterSpacing: '0.3em', fontWeight: 600 }}>
                            {typedText}
                            <span className="cursor-blink" />
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
