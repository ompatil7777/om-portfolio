'use client'
import { useEffect, useRef, useState } from 'react'

// Theme toggle — dark/light mode
export default function ThemeToggle() {
    const [dark, setDark] = useState(true)

    useEffect(() => {
        const stored = localStorage.getItem('theme')
        const isDark = stored ? stored === 'dark' : true
        setDark(isDark)
        applyTheme(isDark)
    }, [])

    const toggle = () => {
        const next = !dark
        setDark(next)
        localStorage.setItem('theme', next ? 'dark' : 'light')
        applyTheme(next)
    }

    // Hold for 3s → CRT retro mode easter egg
    const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
    const onMouseDown = () => {
        holdTimer.current = setTimeout(() => {
            document.body.classList.toggle('crt-mode')
        }, 3000)
    }
    const onMouseUp = () => {
        if (holdTimer.current) clearTimeout(holdTimer.current)
    }

    return (
        <button
            onClick={toggle}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode (hold 3s for CRT mode 👾)'}
            style={{
                width: 40, height: 40,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
                fontSize: 16,
                cursor: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'
                e.currentTarget.style.background = 'rgba(0,212,255,0.08)'
                e.currentTarget.style.transform = 'rotate(20deg) scale(1.1)'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.transform = 'none'
                onMouseUp()
            }}
            aria-label="Toggle theme"
        >
            <span style={{ transition: 'transform 0.4s ease', display: 'inline-block', transform: dark ? 'rotate(0deg)' : 'rotate(180deg)' }}>
                {dark ? '🌙' : '☀️'}
            </span>
        </button>
    )
}

function applyTheme(dark: boolean) {
    if (dark) {
        document.documentElement.style.setProperty('--bg-primary', '#020409')
        document.documentElement.style.setProperty('--text-primary', '#F0F6FF')
        document.documentElement.style.setProperty('--text-secondary', '#8892A4')
        document.body.style.background = '#020409'
        document.body.style.color = '#F0F6FF'
    } else {
        document.documentElement.style.setProperty('--bg-primary', '#F4F6FC')
        document.documentElement.style.setProperty('--text-primary', '#0A0E1A')
        document.documentElement.style.setProperty('--text-secondary', '#4A5568')
        document.body.style.background = '#F4F6FC'
        document.body.style.color = '#0A0E1A'
    }
}
