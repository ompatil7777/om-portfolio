'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function UrbanNestPage() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [scrolled, setScrolled] = useState(false)
    const [activeTab, setActiveTab] = useState('residential')

    // Investment Calculator
    const [propertyValue, setPropertyValue] = useState(500000)
    const [appreciation, setAppreciation] = useState(6) // %

    // Form state
    const [formVisible, setFormVisible] = useState(false)
    const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('')
    const [formData, setFormData] = useState({ name: '', email: '', service: 'Residential', message: '' })

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('mousemove', handleMouseMove) }
    }, [])

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
                setTimeout(() => { setStatus(''); setFormVisible(false) }, 5000)
            } else throw new Error()
        } catch {
            setStatus('error')
        }
    }

    // Calculator logic: Future value after 10 years compound interest
    const futureValue = propertyValue * Math.pow(1 + (appreciation / 100), 10)
    const totalProfit = futureValue - propertyValue

    const listings = {
        residential: [
            { title: 'The Vertex Penthouse', tags: ['Luxury', 'Downtown', '4 Bed'], price: '$1.2M', imgUrl: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800)' },
            { title: 'Oakwood Estate', tags: ['Suburban', 'Pool', '6 Bed'], price: '$850k', imgUrl: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800)' }
        ],
        commercial: [
            { title: 'TechHub Tower Floor', tags: ['Retail', 'High Foot Traffic'], price: '$4.5M', imgUrl: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800)' },
            { title: 'Riverfront Plaza Space', tags: ['Office Space', 'Class A'], price: '$22k/month', imgUrl: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800)' }
        ]
    }

    return (
        <main style={{ minHeight: '100vh', background: '#010510', color: '#F0F6FF', overflowX: 'hidden', fontFamily: 'Outfit, sans-serif' }}>
            {/* Elegant Background Nodes */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.15, pointerEvents: 'none', background: 'radial-gradient(circle at 15% 50%, rgba(0, 212, 255, 0.4), transparent 50%), radial-gradient(circle at 85% 30%, rgba(0, 212, 255, 0.2), transparent 50%)', transform: `translate(${mousePos.x}px, ${mousePos.y}px)`, transition: 'transform 0.2s out' }} />

            {/* Nav */}
            <nav style={{ padding: '20px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: scrolled ? 'rgba(1,5,16,0.85)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none', borderBottom: scrolled ? '1px solid rgba(0,212,255,0.1)' : '1px solid transparent', position: 'fixed', width: '100%', top: 0, zIndex: 50, transition: 'all 0.3s' }}>
                <Link href="/#businesses" className="magnetic-btn" style={{ fontSize: 16, fontWeight: 600, color: '#F0F6FF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span>←</span> Portfolio
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 24 }}>🏢</span>
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 22, color: '#00D4FF', letterSpacing: 0.5 }}>URBAN NEST</span>
                </div>
            </nav>

            <div style={{ position: 'relative', zIndex: 10 }}>
                {/* Hero */}
                <section style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 5vw', maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
                    <div>
                        <div style={{ display: 'inline-block', padding: '6px 20px', borderRadius: 100, border: '1px solid rgba(0,212,255,0.4)', color: '#00D4FF', fontSize: 13, fontWeight: 'bold', marginBottom: 32, letterSpacing: 2, textTransform: 'uppercase', background: 'rgba(0,212,255,0.05)' }}>
                            Elite Real Estate Consultancy
                        </div>
                        <h1 style={{ fontSize: 'clamp(44px, 7vw, 90px)', fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1.05, marginBottom: 24 }}>
                            Redefining <br /> <span style={{ color: 'transparent', WebkitTextStroke: '2px #00D4FF' }}>Modern Living.</span>
                        </h1>
                        <p style={{ fontSize: 22, color: '#8892A4', maxWidth: 800, lineHeight: 1.6, margin: '0 auto 48px auto' }}>
                            Data-driven property acquisitions. We guide high-net-worth individuals, investors, and families to their perfectly curated residential and commercial spaces.
                        </p>
                        <button onClick={() => { setFormVisible(true); setTimeout(() => document.getElementById('consult-form')?.scrollIntoView({ behavior: 'smooth' }), 100) }} style={{ padding: '20px 48px', background: '#00D4FF', color: '#010510', border: 'none', borderRadius: 100, fontSize: 18, fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 30px rgba(0,212,255,0.3)', transition: 'all 0.3s' }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,212,255,0.4)' }} onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,212,255,0.3)' }}>
                            Schedule Consultation
                        </button>
                    </div>
                </section>

                {/* Exclusive Properties Mini-Gallery & Toggles */}
                <section style={{ padding: '80px 5vw', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
                            <h2 style={{ fontSize: 40, fontFamily: 'Syne, sans-serif', fontWeight: 800 }}>Exclusive <span style={{ color: '#00D4FF' }}>Listings</span></h2>
                            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', padding: 6, borderRadius: 100, border: '1px solid rgba(255,255,255,0.1)' }}>
                                <button onClick={() => setActiveTab('residential')} style={{ padding: '10px 24px', borderRadius: 100, border: 'none', cursor: 'pointer', background: activeTab === 'residential' ? '#00D4FF' : 'transparent', color: activeTab === 'residential' ? '#010510' : '#8892A4', fontWeight: 600, fontSize: 14, transition: '0.2s' }}>Residential</button>
                                <button onClick={() => setActiveTab('commercial')} style={{ padding: '10px 24px', borderRadius: 100, border: 'none', cursor: 'pointer', background: activeTab === 'commercial' ? '#00D4FF' : 'transparent', color: activeTab === 'commercial' ? '#010510' : '#8892A4', fontWeight: 600, fontSize: 14, transition: '0.2s' }}>Commercial</button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 32 }}>
                            {listings[activeTab as keyof typeof listings].map((card, i) => (
                                <div key={i} style={{ borderRadius: 24, overflow: 'hidden', height: 400, backgroundImage: card.imgUrl, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 32, border: '1px solid rgba(255,255,255,0.1)', transition: 'transform 0.4s', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                                        {card.tags.map(t => <span key={t} style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 'bold' }}>{t}</span>)}
                                    </div>
                                    <h3 style={{ fontSize: 32, fontFamily: 'Syne', fontWeight: 700, marginBottom: 8 }}>{card.title}</h3>
                                    <div style={{ color: '#00D4FF', fontSize: 20, fontFamily: 'JetBrains Mono' }}>{card.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Investment Calculator Widget */}
                <section style={{ padding: '120px 5vw', maxWidth: 1000, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                        <div>
                            <div style={{ fontSize: 64, marginBottom: 24 }}>📈</div>
                            <h2 style={{ fontSize: 40, fontFamily: 'Syne, sans-serif', fontWeight: 800, marginBottom: 24 }}>Wealth Building Analyzer</h2>
                            <p style={{ color: '#8892A4', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>See why real estate remains the most reliable vehicle for generational wealth. Adjust the metrics below based on regional average property growth.</p>

                            <div style={{ marginBottom: 32 }}>
                                <label style={{ display: 'flex', justifyContent: 'space-between', color: '#F0F6FF', marginBottom: 12, fontWeight: 500, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase' }}>
                                    <span>Initial Property Investment:</span>
                                    <span style={{ color: '#00D4FF', fontFamily: 'JetBrains Mono' }}>${propertyValue.toLocaleString()}</span>
                                </label>
                                <input type="range" min="100000" max="5000000" step="50000" value={propertyValue} onChange={e => setPropertyValue(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#00D4FF' }} />
                            </div>

                            <div>
                                <label style={{ display: 'flex', justifyContent: 'space-between', color: '#F0F6FF', marginBottom: 12, fontWeight: 500, fontSize: 14, letterSpacing: 1, textTransform: 'uppercase' }}>
                                    <span>Expected Annual Appreciation:</span>
                                    <span style={{ color: '#00D4FF', fontFamily: 'JetBrains Mono' }}>{appreciation}%</span>
                                </label>
                                <input type="range" min="2" max="15" step="1" value={appreciation} onChange={e => setAppreciation(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#00D4FF' }} />
                            </div>
                        </div>

                        {/* Results Board */}
                        <div style={{ padding: 48, borderRadius: 24, background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.2)', display: 'flex', flexDirection: 'column', gap: 32, position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: '#00D4FF' }} />

                            <div>
                                <div style={{ color: '#8892A4', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>Estimated Total Value (10 Yrs)</div>
                                <div style={{ fontSize: 48, fontWeight: 800, color: '#F0F6FF', fontFamily: 'JetBrains Mono' }}>
                                    ${Math.round(futureValue).toLocaleString()}
                                </div>
                            </div>

                            <div>
                                <div style={{ color: '#8892A4', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontWeight: 600 }}>Pure Capital Appreciation Profit</div>
                                <div style={{ fontSize: 36, fontWeight: 800, color: '#00D4FF', fontFamily: 'JetBrains Mono' }}>
                                    +${Math.round(totalProfit).toLocaleString()}
                                </div>
                                <div style={{ marginTop: 12, fontSize: 13, background: 'rgba(0,212,255,0.1)', display: 'inline-block', padding: '6px 12px', borderRadius: 100, color: '#00D4FF' }}>
                                    Not including rental yield cash flow
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Secure Form Section */}
                {(formVisible || status !== '') && (
                    <section id="consult-form" style={{ padding: '80px 5vw', maxWidth: 800, margin: '0 auto', animation: 'fadeIn 0.7s ease' }}>
                        <div className="glass" style={{ padding: 48, borderRadius: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                                <h2 style={{ fontSize: 36, fontFamily: 'Syne', fontWeight: 800, marginBottom: 12 }}>Confidential <span style={{ color: '#00D4FF' }}>Inquiry</span></h2>
                                <p style={{ color: '#8892A4' }}>Submit your details to receive private access to off-market properties and portfolio consultations from Om Patil.</p>
                            </div>

                            {status === 'success' ? (
                                <div style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)', padding: 40, borderRadius: 16, textAlign: 'center' }}>
                                    <h3 style={{ fontSize: 24, color: '#00D4FF', marginBottom: 12, fontFamily: 'Syne', fontWeight: 700 }}>Profile Registered.</h3>
                                    <p style={{ color: '#F0F6FF', lineHeight: 1.6 }}>Thank you. Your details are secure in the Urban Nest backend. An associate from our office will contact you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 24 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 24 }}>
                                        <div>
                                            <input required placeholder="Your Legal Name *" type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '16px 20px', background: 'rgba(0,0,0,0.4)', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', transition: '0.3s', fontSize: 16, fontFamily: 'Outfit' }} onFocus={e => e.target.style.borderBottomColor = '#00D4FF'} onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'} />
                                        </div>
                                        <div>
                                            <input required placeholder="Email Address *" type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '16px 20px', background: 'rgba(0,0,0,0.4)', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'white', outline: 'none', transition: '0.3s', fontSize: 16, fontFamily: 'Outfit' }} onFocus={e => e.target.style.borderBottomColor = '#00D4FF'} onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'} />
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 16 }}>
                                        <div style={{ color: '#8892A4', fontSize: 14, marginBottom: 16 }}>Primary Objective:</div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                            {['Residential Purchase', 'Commercial Space', 'Real Estate Investment', 'Property Management'].map(opt => (
                                                <div key={opt} onClick={() => setFormData({ ...formData, service: opt })} style={{ padding: '16px', border: formData.service === opt ? '2px solid #00D4FF' : '2px solid rgba(255,255,255,0.05)', borderRadius: 12, cursor: 'pointer', background: formData.service === opt ? 'rgba(0,212,255,0.05)' : 'rgba(0,0,0,0.3)', transition: '0.2s', display: 'flex', alignItems: 'center', gap: 12 }}>
                                                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: formData.service === opt ? '#00D4FF' : 'transparent', border: formData.service === opt ? 'none' : '2px solid #8892A4' }} />
                                                    <span style={{ fontSize: 14, fontWeight: formData.service === opt ? 600 : 400, color: formData.service === opt ? '#F0F6FF' : '#8892A4' }}>{opt}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginTop: 16 }}>
                                        <textarea rows={4} placeholder="Target location, estimated budget, or specific requirements (Optional)" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ width: '100%', padding: '20px', background: 'rgba(0,0,0,0.4)', border: 'none', borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '12px 12px 0 0', outline: 'none', resize: 'vertical', transition: '0.3s', fontSize: 16, fontFamily: 'Outfit' }} onFocus={e => e.target.style.borderBottomColor = '#00D4FF'} onBlur={e => e.target.style.borderBottomColor = 'rgba(255,255,255,0.1)'} />
                                    </div>

                                    <button disabled={status === 'loading'} type="submit" style={{ padding: '20px', background: '#F0F6FF', color: '#010510', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2, cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1, marginTop: 16, transition: '0.2s' }} onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.background = '#00D4FF' }} onMouseLeave={e => { if (status !== 'loading') e.currentTarget.style.background = '#F0F6FF' }}>
                                        {status === 'loading' ? 'Securing Request...' : 'Submit Profile Data'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </section>
                )}

                <footer style={{ padding: '40px 5vw', textAlign: 'center', color: '#8892A4', fontSize: 14, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    © {new Date().getFullYear()} Urban Nest Realty. Exclusive properties via Om Patil.
                </footer>
            </div>
        </main>
    )
}
