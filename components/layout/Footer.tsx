'use client'

export default function Footer() {
    return (
        <footer style={{
            padding: '40px max(24px, 5vw)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            background: '#020409',
        }}>
            <div style={{
                maxWidth: 1200, margin: '0 auto',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 20,
            }}>
                <div>
                    <span style={{
                        fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800,
                        color: '#00D4FF', textShadow: '0 0 20px rgba(0,212,255,0.6)',
                    }}>A.</span>
                    <p style={{
                        fontFamily: 'Outfit, sans-serif', fontSize: 13, color: '#4A5568', marginTop: 8,
                    }}>
                        Building cloud infrastructure that powers tomorrow.
                    </p>
                </div>

                <div style={{
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#4A5568',
                    display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4,
                }}>
                    <span>© 2025 Om. All rights reserved.</span>
                    <span style={{ color: '#00D4FF' }}>Crafted with ☁️ & ⚡</span>
                </div>
            </div>
        </footer>
    )
}
