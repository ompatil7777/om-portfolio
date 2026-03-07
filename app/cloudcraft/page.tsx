'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function CloudCraftPage() {
    const [scrolled, setScrolled] = useState(false)
    const [formVisible, setFormVisible] = useState(false)
    const [status, setStatus] = useState<'' | 'loading' | 'success' | 'error'>('')
    const [formData, setFormData] = useState({ name: '', email: '', service: 'Cloud Infrastructure', message: '' })

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
                setFormData({ name: '', email: '', service: 'Cloud Infrastructure', message: '' })
            } else throw new Error()
        } catch (err) {
            setStatus('error')
        }
    }

    return (
        <main style={{ minHeight: '100vh', background: '#020409', color: '#F0F6FF', overflowX: 'hidden' }}>
            {/* Nav */}
            <nav style={{ padding: '24px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link href="/" style={{ fontSize: 24, fontWeight: 'bold', color: '#F0F6FF', textDecoration: 'none' }}>
                    ← Back to Portfolio
                </Link>
                <div style={{ display: 'flex', gap: 16 }}>
                    <span style={{ color: '#7B2FFF', fontWeight: 'bold', fontSize: 18 }}>⚡ CloudCraft Digital</span>
                </div>
            </nav>

            <section style={{ maxWidth: 1000, margin: '80px auto', padding: '0 5vw', position: 'relative' }}>
                {/* Glow BG */}
                <div style={{ position: 'absolute', top: 0, left: 200, width: 400, height: 400, background: 'radial-gradient(circle, rgba(123,47,255,0.1), transparent 70%)' }} />

                <h1 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontFamily: 'Syne, sans-serif', fontWeight: 800, marginBottom: 24, lineHeight: 1.1 }}>
                    Scale your ideas with <span style={{ color: '#7B2FFF' }}>CloudCraft</span>
                </h1>
                <p style={{ fontSize: 20, color: '#8892A4', maxWidth: 600, lineHeight: 1.6, marginBottom: 40 }}>
                    We specialize in highly automated, cloud-native solutions offering workflow automation via n8n, custom web apps, and secure backend architectures.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 64 }}>
                    {[
                        { title: 'Workflow Automation', desc: 'n8n pipelines connecting CRMs, databases, and APIs to save your team hundreds of hours.', icon: '⚙️' },
                        { title: 'Full-Stack Apps', desc: 'High-performance React/Next.js frontends powered by scalable Go or Python backends.', icon: '💻' },
                        { title: 'Cloud Setup', desc: 'AWS serverless deployments, Terraform modules, and Dockerized architectures.', icon: '☁️' }
                    ].map(s => (
                        <div key={s.title} style={{ padding: 32, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(123,47,255,0.3)', borderRadius: 16 }}>
                            <div style={{ fontSize: 40, marginBottom: 16 }}>{s.icon}</div>
                            <h3 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 12 }}>{s.title}</h3>
                            <p style={{ color: '#8892A4', lineHeight: 1.6 }}>{s.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Form Trigger */}
                {!formVisible ? (
                    <div style={{ textAlign: 'center', margin: '80px 0' }}>
                        <h2 style={{ fontSize: 32, marginBottom: 24 }}>Ready to automate and scale?</h2>
                        <button
                            onClick={() => setFormVisible(true)}
                            style={{ padding: '16px 40px', fontSize: 18, background: '#7B2FFF', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', transition: '0.3s' }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Let's Talk About Your Project
                        </button>
                    </div>
                ) : (
                    <div style={{ background: 'rgba(255,255,255,0.02)', padding: 48, borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', margin: '80px 0', animation: 'fadeIn 0.5s ease' }}>
                        <h2 style={{ fontSize: 32, marginBottom: 32 }}>Project Inquiry Form</h2>

                        {status === 'success' ? (
                            <div style={{ background: 'rgba(0,255,200,0.1)', color: '#00FFC8', padding: 24, borderRadius: 12, textAlign: 'center' }}>
                                🎉 Thank you! Your inquiry has been sent directly to Om. He will reach out shortly.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                                    <div>
                                        <label style={{ display: 'block', color: '#8892A4', marginBottom: 8 }}>Name</label>
                                        <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ width: '100%', padding: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8 }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: '#8892A4', marginBottom: 8 }}>Email</label>
                                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ width: '100%', padding: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8 }} />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: '#8892A4', marginBottom: 8 }}>Interested Service</label>
                                    <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} style={{ width: '100%', padding: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8, fontFamily: 'Outfit, sans-serif' }}>
                                        <option value="Workflow Automation (n8n)">Workflow Automation (n8n)</option>
                                        <option value="Cloud Infrastructure">Cloud Infrastructure Assembly</option>
                                        <option value="Full-stack Web Development">Full-stack Website</option>
                                        <option value="Other">Other Consulting</option>
                                    </select>
                                </div>

                                <div>
                                    <label style={{ display: 'block', color: '#8892A4', marginBottom: 8 }}>Project Details</label>
                                    <textarea required rows={5} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ width: '100%', padding: 16, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: 8, fontFamily: 'Outfit, sans-serif' }}></textarea>
                                </div>

                                <button disabled={status === 'loading'} type="submit" style={{ padding: 16, background: '#7B2FFF', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: 8, cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontSize: 16, marginTop: 10 }}>
                                    {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
                                </button>
                            </form>
                        )}
                    </div>
                )}
            </section>
        </main>
    )
}
