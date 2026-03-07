'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function UrbanNestPage() {
    const [scrolled, setScrolled] = useState(false)
    const [formVisible, setFormVisible] = useState(false)
    const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('')
    const [formData, setFormData] = useState({ name: '', email: '', service: 'Residential', message: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ source: 'Urban Nest Realty', ...formData })
            })
            if (res.ok) {
                setStatus('success')
                setFormData({ name: '', email: '', service: 'Residential', message: '' })
            } else throw new Error()
        } catch (err) {
            setStatus('error')
        }
    }

    return (
        <main style={{ minHeight: '100vh', background: '#020409', color: '#F0F6FF', overflowX: 'hidden' }}>
            {/* Nav */}
            <nav style={{ padding: '24px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(2,4,9,0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 50 }}>
                <Link href="/" style={{ fontSize: 24, fontWeight: 'bold', color: '#00D4FF', textDecoration: 'none' }}>
                    ← Back safely
                </Link>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ color: '#00D4FF', fontWeight: 'bold', fontSize: 18 }}>🏢 Urban Nest Realty</span>
                </div>
            </nav>

            <section style={{ maxWidth: 1000, margin: '80px auto', padding: '0 5vw', position: 'relative' }}>
                {/* Glow BG */}
                <div style={{ position: 'absolute', top: 0, left: 200, width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,212,255,0.1), transparent 70%)' }} />

                <h1 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontFamily: 'Syne, sans-serif', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
                    Find your perfect space<br />with <span style={{ color: '#00D4FF' }}>Urban Nest</span>.
                </h1>
                <p style={{ fontSize: 20, color: '#8892A4', maxWidth: 600, lineHeight: 1.6, marginBottom: 40 }}>
                    We provide premium real estate consulting, property management, and investment strategies. Guiding you home with data-backed market knowledge.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 64 }}>
                    {[
                        { title: 'Residential Luxury', desc: 'Find modern, beautiful homes and premium apartments in the best sought-after locations.', icon: '🏡' },
                        { title: 'Commercial Spaces', desc: 'Offices, retail stores, and highly-lucrative commercial properties to skyrocket your business.', icon: '🏢' },
                        { title: 'Consulting & Investment', desc: 'Secure real estate investments with high ROI, managed properties, and analytical data support.', icon: '📈' }
                    ].map(s => (
                        <div key={s.title} style={{ padding: 32, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 16 }}>
                            <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
                            <h3 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>{s.title}</h3>
                            <p style={{ color: '#8892A4', lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Form Trigger */}
                {!formVisible ? (
                    <div style={{ textAlign: 'center', margin: '80px 0' }}>
                        <h2 style={{ fontSize: 32, marginBottom: 24 }}>Ready to start your property journey?</h2>
                        <button
                            onClick={() => setFormVisible(true)}
                            style={{ padding: '16px 40px', fontSize: 18, background: '#00D4FF', color: '#020409', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Explore Property Options
                        </button>
                    </div>
                ) : (
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: 48, borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', margin: '80px 0', animation: 'fadeIn 0.5s ease' }}>
                        <h2 style={{ fontSize: 32, marginBottom: 32 }}>Real Estate Inquiry</h2>

                        {status === 'success' ? (
                            <div style={{ background: 'rgba(0,255,200,0.1)', color: '#00FFC8', padding: 24, borderRadius: 12, textAlign: 'center' }}>
                                🎉 Thank you! Your real estate inquiry has been saved. Our team will contact you shortly to schedule a viewing or consultation.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 20 }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#8892A4', marginBottom: 8 }}>Full Name</label>
                                        <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8 }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#8892A4', marginBottom: 8 }}>Email Address</label>
                                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8 }} />
                                    </div>
                                </div>

                                <div style={{ marginBottom: 8 }}>
                                    <label style={{ display: 'block', color: '#8892A4', marginBottom: 12 }}>What type of property are you interested in?</label>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                        {['Residential', 'Commercial', 'Land/Investment', 'Luxury Condo'].map(opt => (
                                            <label key={opt} style={{
                                                padding: '12px 20px',
                                                border: formData.service === opt ? '2px solid #00D4FF' : '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: 12,
                                                cursor: 'pointer',
                                                background: formData.service === opt ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.02)',
                                                transition: 'all 0.2s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 8
                                            }}>
                                                <input
                                                    type="radio"
                                                    name="service"
                                                    value={opt}
                                                    checked={formData.service === opt}
                                                    onChange={() => setFormData({ ...formData, service: opt })}
                                                    style={{ display: 'none' }}
                                                />
                                                <div style={{
                                                    width: 16, height: 16, borderRadius: '50%',
                                                    border: formData.service === opt ? '4px solid #00D4FF' : '1px solid #8892A4'
                                                }} />
                                                <span>{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: '#8892A4', marginBottom: 8 }}>What's your preferred location or budget? (Optional)</label>
                                    <textarea rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ width: '100%', padding: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8, fontFamily: 'Outfit, sans-serif' }} placeholder="E.g. Near Downtown, Budget under 1.5M"></textarea>
                                </div>

                                <button disabled={status === 'loading'} type="submit" style={{ padding: 16, background: '#00D4FF', color: '#020409', fontWeight: 'bold', border: 'none', borderRadius: 8, cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontSize: 16, marginTop: 10 }}>
                                    {status === 'loading' ? 'Sending encrypted data...' : 'Request Consultation'}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </section>
        </main>
    )
}
