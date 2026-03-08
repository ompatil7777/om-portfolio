'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CloudCraftPage() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [scrolled, setScrolled] = useState(false)
    const [roiCalc, setRoiCalc] = useState({ hours: 10, rate: 50 })

    // Form state
    const [formVisible, setFormVisible] = useState(false)
    const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('')
    const [formData, setFormData] = useState({ name: '', email: '', service: 'Workflow Automation', message: '' })

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', handleScroll)
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ source: 'CloudCraft Digital', ...formData })
            })
            if (res.ok) {
                setStatus('success')
                setTimeout(() => { setStatus(''); setFormVisible(false) }, 4000)
            } else throw new Error()
        } catch {
            setStatus('error')
        }
    }

    return (
        <main style={{ minHeight: '100vh', background: '#020409', color: '#F0F6FF', overflowX: 'hidden', fontFamily: 'Outfit, sans-serif' }}>
            {/* Ambient Background Grid */}
            <div style={{
                position: 'fixed', inset: 0, zIndex: 0, opacity: 0.15, pointerEvents: 'none',
                backgroundImage: 'linear-gradient(rgba(123, 47, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(123, 47, 255, 0.2) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
                transition: 'transform 0.1s out'
            }} />
            <div className="blob blob-purple" style={{ width: 800, height: 800, top: '-20%', right: '-10%', opacity: 0.1, zIndex: 0 }} />

            {/* Nav */}
            <nav style={{
                padding: '20px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: scrolled ? 'rgba(2,4,9,0.8)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(123,47,255,0.1)' : '1px solid transparent',
                position: 'fixed', width: '100%', top: 0, zIndex: 50, transition: 'all 0.3s'
            }}>
                <Link href="/#businesses" className="magnetic-btn" style={{ fontSize: 16, fontWeight: 600, color: '#F0F6FF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 100, border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span>←</span> Portfolio
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 8, height: 8, background: '#7B2FFF', borderRadius: '50%', boxShadow: '0 0 10px #7B2FFF', animation: 'pulse 2s infinite' }} />
                    <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 20, letterSpacing: 1 }}>CLOUDCRAFT</span>
                </div>
            </nav>

            <div style={{ position: 'relative', zIndex: 10 }}>
                {/* Hero Section */}
                <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', padding: '120px 5vw', maxWidth: 1400, margin: '0 auto' }}>
                    <div style={{ flex: 1, paddingRight: 40 }}>
                        <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 100, background: 'rgba(123,47,255,0.1)', border: '1px solid rgba(123,47,255,0.3)', color: '#A78BFA', fontSize: 13, fontWeight: 'bold', marginBottom: 24, letterSpacing: 1, textTransform: 'uppercase' }}>
                            Next-Gen Digital Agency
                        </div>
                        <h1 style={{ fontSize: 'clamp(40px, 6vw, 84px)', fontFamily: 'Syne, sans-serif', fontWeight: 800, lineHeight: 1.05, marginBottom: 32 }}>
                            We Build <br />
                            <span style={{ background: 'linear-gradient(135deg, #A78BFA 0%, #7B2FFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Unfair Advantages
                            </span>
                        </h1>
                        <p style={{ fontSize: 20, color: '#8892A4', maxWidth: 540, lineHeight: 1.6, marginBottom: 48 }}>
                            Stop doing manual work. We architect highly-scalable web applications, cloud infrastructure, and completely automated n8n workflows for ambitious modern startups.
                        </p>
                        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                            <button onClick={() => { setFormVisible(true); setTimeout(() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' }), 100) }} style={{ padding: '16px 32px', background: '#7B2FFF', color: 'white', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 0 30px rgba(123,47,255,0.3)', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                Automate My Business ⚡
                            </button>
                            <a href="#services" style={{ padding: '16px 32px', background: 'transparent', color: '#F0F6FF', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
                                View Capabilities
                            </a>
                        </div>
                    </div>

                    {/* Hero 3D Element */}
                    <div style={{ flex: 1, justifyContent: 'center', perspective: 1000, display: window.innerWidth > 900 ? 'flex' : 'none' }}>
                        <div style={{
                            width: 450, height: 450, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(123,47,255,0.3)', borderRadius: 24,
                            transform: `rotateX(${mousePos.y * -0.5}deg) rotateY(${mousePos.x * 0.5}deg)`,
                            transition: 'transform 0.1s', display: 'flex', flexDirection: 'column', padding: 32, position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                        }}>
                            <div style={{ position: 'absolute', top: -100, left: -100, right: -100, bottom: -100, background: 'radial-gradient(circle at center, rgba(123,47,255,0.15) 0%, transparent 50%)', animation: 'spin 10s linear infinite' }} />
                            <div style={{ display: 'flex', gap: 12, marginBottom: 40, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 24 }}>
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                                <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: '#8892A4', marginLeft: 16 }}>terminal — n8n payload execution</span>
                            </div>
                            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 14, color: '#00FFC8', lineHeight: 1.8 }}>
                                <div style={{ color: '#F0F6FF' }}>&gt; Executing automated pipeline...</div>
                                <div style={{ color: '#8892A4' }}>[1] Connecting CRM via OAuth2... OK</div>
                                <div style={{ color: '#8892A4' }}>[2] Extracting new leads payload... OK</div>
                                <div style={{ color: '#8892A4' }}>[3] AI analyzing sentiment... OK</div>
                                <div style={{ color: '#A78BFA' }}>[4] Route: High Priority 🚀</div>
                                <br />
                                <div style={{ color: '#00FFC8' }}>SUCCESS: 14 hours of manual labor saved.</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" style={{ padding: '120px 5vw', background: '#050810', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                        <div style={{ textAlign: 'center', marginBottom: 80 }}>
                            <h2 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontFamily: 'Syne, sans-serif', fontWeight: 800, marginBottom: 16 }}>Our Technical Arsenal</h2>
                            <p style={{ color: '#8892A4', fontSize: 18, maxWidth: 600, margin: '0 auto' }}>Specialized enterprise-grade development and automation.</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
                            {[
                                { title: 'Workflow Automation', sub: 'Powered by n8n & Make', desc: 'We build custom middleware connecting your detached SaaS apps. Automatic CRM syncing, AI email drafting, and data pipeline ETL without lifting a finger.', color: '#00FFC8', icon: '⚙️' },
                                { title: 'Full-Stack Applications', sub: 'Next.js, React, Node', desc: 'Ultra-fast, SEO-optimized web applications with stunning micro-interactions. Real-time dashboards, SaaS platforms, and internal tools.', color: '#A78BFA', icon: '💻' },
                                { title: 'Cloud Infrastructure', sub: 'AWS, Docker, CI/CD', desc: 'Battle-tested backend architectures that scale. Serverless functions, managed databases, load balancing, and zero-downtime GitHub Actions pipelines.', color: '#00D4FF', icon: '☁️' },
                            ].map((s, i) => (
                                <div key={i} className="glass" style={{
                                    padding: 40, borderRadius: 24, border: `1px solid ${s.color}33`, transition: 'all 0.4s', position: 'relative', overflow: 'hidden'
                                }} onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 20px 40px ${s.color}22` }} onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = `${s.color}33`; e.currentTarget.style.boxShadow = 'none' }}>
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle at top right, ${s.color}15, transparent)`, borderRadius: '0 24px 0 100%', pointerEvents: 'none' }} />
                                    <div style={{ fontSize: 48, marginBottom: 24, filter: `drop-shadow(0 0 10px ${s.color}55)` }}>{s.icon}</div>
                                    <h3 style={{ fontSize: 24, fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                                    <div style={{ fontFamily: 'JetBrains Mono', fontSize: 12, color: s.color, marginBottom: 20, letterSpacing: 1 }}>{s.sub.toUpperCase()}</div>
                                    <p style={{ color: '#8892A4', lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ROI Calculator Feature */}
                <section style={{ padding: '120px 5vw', maxWidth: 1000, margin: '0 auto' }}>
                    <div className="glass-strong" style={{ padding: '48px', borderRadius: 24, border: '1px solid rgba(123,47,255,0.3)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
                        <div>
                            <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(0,255,200,0.1)', color: '#00FFC8', borderRadius: 100, fontSize: 12, fontWeight: 'bold', marginBottom: 16 }}>Interactive ROI Calculator</div>
                            <h2 style={{ fontSize: 36, fontFamily: 'Syne, sans-serif', fontWeight: 800, marginBottom: 24 }}>Calculate Your Savings</h2>
                            <p style={{ color: '#8892A4', marginBottom: 32, lineHeight: 1.6 }}>Adjust the sliders to see how much money our n8n automation workflows can save your business annually by replacing repetitive manual tasks.</p>

                            <div style={{ marginBottom: 24 }}>
                                <label style={{ display: 'flex', justifyContent: 'space-between', color: '#F0F6FF', marginBottom: 8, fontWeight: 500 }}>
                                    <span>Manual hours wasted per week:</span>
                                    <span style={{ color: '#A78BFA' }}>{roiCalc.hours} hrs</span>
                                </label>
                                <input type="range" min="1" max="100" value={roiCalc.hours} onChange={e => setRoiCalc({ ...roiCalc, hours: parseInt(e.target.value) })} style={{ width: '100%', accentColor: '#7B2FFF' }} />
                            </div>

                            <div>
                                <label style={{ display: 'flex', justifyContent: 'space-between', color: '#F0F6FF', marginBottom: 8, fontWeight: 500 }}>
                                    <span>Average employee hourly rate:</span>
                                    <span style={{ color: '#A78BFA' }}>${roiCalc.rate}/hr</span>
                                </label>
                                <input type="range" min="15" max="150" value={roiCalc.rate} onChange={e => setRoiCalc({ ...roiCalc, rate: parseInt(e.target.value) })} style={{ width: '100%', accentColor: '#7B2FFF' }} />
                            </div>
                        </div>

                        <div style={{ background: '#020409', padding: 40, borderRadius: 20, textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)' }}>
                            <div style={{ color: '#8892A4', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Estimated Annual Savings</div>
                            <div style={{ fontSize: 56, fontFamily: 'Syne', fontWeight: 800, color: '#00FFC8', marginBottom: 16 }}>
                                ${(roiCalc.hours * roiCalc.rate * 52).toLocaleString()}
                            </div>
                            <div style={{ color: '#8892A4', fontSize: 13, lineHeight: 1.5 }}>By automating {roiCalc.hours} hours/week of data entry, email routing, and sync tasks.</div>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                {(formVisible || status !== '') && (
                    <section id="inquiry-form" style={{ padding: '80px 5vw', maxWidth: 800, margin: '0 auto', animation: 'fadeIn 0.5s' }}>
                        <div className="glass" style={{ padding: 48, borderRadius: 24, border: '1px solid rgba(123,47,255,0.4)', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 4, background: 'linear-gradient(90deg, #7B2FFF, #00FFC8)' }} />

                            <h2 style={{ fontSize: 32, fontFamily: 'Syne', fontWeight: 800, marginBottom: 8 }}>Initialize Project <span style={{ color: '#A78BFA' }}>Payload</span></h2>
                            <p style={{ color: '#8892A4', marginBottom: 40 }}>Direct secure line to Om Patil. We normally respond within 4 hours.</p>

                            {status === 'success' ? (
                                <div style={{ background: 'rgba(0,255,200,0.1)', border: '1px solid rgba(0,255,200,0.3)', padding: 32, borderRadius: 16, textAlign: 'center' }}>
                                    <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                                    <h3 style={{ fontSize: 24, color: '#00FFC8', marginBottom: 8 }}>Payload Delivered Successfully</h3>
                                    <p style={{ color: '#F0F6FF' }}>We've received your data and will be in touch shortly to architect your solution.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 24 }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: '#A78BFA', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Contact Name</label>
                                            <input required type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: '16px 20px', background: 'rgba(2,4,9,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 12, outline: 'none', transition: 'border-color 0.2s', fontFamily: 'Outfit' }} onFocus={e => e.target.style.borderColor = '#7B2FFF'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', fontSize: 13, color: '#A78BFA', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Email Address</label>
                                            <input required type="email" placeholder="john@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: '16px 20px', background: 'rgba(2,4,9,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 12, outline: 'none', transition: 'border-color 0.2s', fontFamily: 'Outfit' }} onFocus={e => e.target.style.borderColor = '#7B2FFF'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, color: '#A78BFA', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Core Objective</label>
                                        <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} style={{ width: '100%', padding: '16px 20px', background: 'rgba(2,4,9,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 12, outline: 'none', appearance: 'none', fontFamily: 'Outfit', cursor: 'pointer' }}>
                                            <option value="Workflow Automation">Workflow Automation (n8n/Backend)</option>
                                            <option value="Web App Development">Full-Stack Web App Development</option>
                                            <option value="Cloud Architecture">Cloud Architecture & CI/CD</option>
                                            <option value="Consulting">Technical Consulting</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ display: 'block', fontSize: 13, color: '#A78BFA', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Project Scope / Requirements</label>
                                        <textarea required rows={5} placeholder="Tell us about the manual processes you want to automate, or the app you want to build..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ width: '100%', padding: '16px 20px', background: 'rgba(2,4,9,0.5)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 12, outline: 'none', resize: 'vertical', fontFamily: 'Outfit' }} onFocus={e => e.target.style.borderColor = '#7B2FFF'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                                    </div>

                                    <button disabled={status === 'loading'} type="submit" style={{ padding: '18px', background: 'linear-gradient(90deg, #7B2FFF, #A78BFA)', color: 'white', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: status === 'loading' ? 'not-allowed' : 'pointer', opacity: status === 'loading' ? 0.7 : 1, marginTop: 16, transition: 'transform 0.2s', boxShadow: '0 10px 20px rgba(123,47,255,0.2)' }} onMouseEnter={e => { if (status !== 'loading') e.currentTarget.style.transform = 'translateY(-2px)' }} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                                        {status === 'loading' ? 'Encrypting & Transmitting...' : 'DEPLOY INQUIRY 🚀'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </section>
                )}

                <footer style={{ padding: '40px 5vw', textAlign: 'center', color: '#8892A4', fontSize: 14, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    © {new Date().getFullYear()} CloudCraft Digital & Om Patil. Engineering the future.
                </footer>
            </div>
        </main>
    )
}
