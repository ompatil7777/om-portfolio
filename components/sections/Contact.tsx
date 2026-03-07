'use client'
import { useEffect, useRef, useState } from 'react'
import { CONTACT_LINKS } from '@/lib/constants'

function useInView(ref: React.RefObject<Element | null>) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [ref])
    return inView
}

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef)
    const [form, setForm] = useState({ name: '', email: '', subject: '', type: '', message: '' })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        await new Promise(r => setTimeout(r, 1800))
        setStatus('success')
    }

    return (
        <section id="contact" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="blob blob-violet" style={{ width: 500, height: 500, bottom: '-10%', left: '-10%', opacity: 0.08 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                    textAlign: 'center', marginBottom: 64,
                }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Let&apos;s Connect</div>
                    <h2 className="section-heading">
                        Start a <span className="gradient-text">Conversation</span>
                    </h2>
                    <p style={{ color: '#8892A4', fontSize: 16, fontFamily: 'Outfit, sans-serif', maxWidth: 480, margin: '0 auto' }}>
                        Ready to build something incredible? I&apos;m available for freelance projects and full-time opportunities.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 48, alignItems: 'start' }}>
                    {/* Left */}
                    <div style={{
                        opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-30px)',
                        transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
                    }}>
                        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 700, color: '#F0F6FF', marginBottom: 16 }}>
                            Let&apos;s Build Together
                        </h3>
                        <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: '#8892A4', lineHeight: 1.8, marginBottom: 40 }}>
                            Whether you need cloud infrastructure, a DevOps pipeline, or a stunning web experience — I&apos;m here to make it happen.
                        </p>

                        {/* Contact details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
                            {[
                                { icon: '📧', label: 'aryanpatilofficial77@gmail.com', href: 'mailto:aryanpatilofficial77@gmail.com' },
                                { icon: '📍', label: 'India (Remote Worldwide)', href: '#' },
                                { icon: '⏰', label: 'Response within 24h', href: '#' },
                            ].map(item => (
                                <a key={item.label} href={item.href} style={{
                                    display: 'flex', alignItems: 'center', gap: 12,
                                    fontFamily: 'Outfit, sans-serif', fontSize: 14, color: '#8892A4',
                                    textDecoration: 'none', transition: 'color 0.3s ease',
                                }}>
                                    <span style={{ fontSize: 18 }}>{item.icon}</span>
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Social links */}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {CONTACT_LINKS.map(link => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        width: 44, height: 44,
                                        borderRadius: '50%',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        background: 'rgba(255,255,255,0.02)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 18,
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        cursor: 'none',
                                    }}
                                    title={link.label}
                                    onMouseEnter={e => {
                                        const t = e.currentTarget
                                        t.style.border = '1px solid rgba(0,212,255,0.4)'
                                        t.style.background = 'rgba(0,212,255,0.08)'
                                        t.style.boxShadow = '0 0 20px rgba(0,212,255,0.2)'
                                    }}
                                    onMouseLeave={e => {
                                        const t = e.currentTarget
                                        t.style.border = '1px solid rgba(255,255,255,0.08)'
                                        t.style.background = 'rgba(255,255,255,0.02)'
                                        t.style.boxShadow = 'none'
                                    }}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="glass-strong" style={{
                        padding: 40,
                        opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(30px)',
                        transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
                    }}>
                        {status === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                                <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: '#00FFC8', marginBottom: 12 }}>
                                    Message Sent!
                                </h3>
                                <p style={{ fontFamily: 'Outfit, sans-serif', color: '#8892A4', fontSize: 14 }}>
                                    I&apos;ll get back to you within 24 hours. Let&apos;s build something great!
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="btn-neon"
                                    style={{ marginTop: 24 }}
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <input
                                            className="form-input" placeholder=" "
                                            value={form.name}
                                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                            required
                                        />
                                        <label className="form-label">Name</label>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <input
                                            className="form-input" type="email" placeholder=" "
                                            value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                            required
                                        />
                                        <label className="form-label">Email</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <input
                                        className="form-input" placeholder=" "
                                        value={form.subject}
                                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                                        required
                                    />
                                    <label className="form-label">Subject</label>
                                </div>

                                <div className="form-group">
                                    <select
                                        className="form-input"
                                        value={form.type}
                                        onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                                        style={{ paddingTop: 16 }}
                                        required
                                    >
                                        <option value="" disabled>Project Type</option>
                                        {['Cloud Infrastructure', 'DevOps Pipeline', 'Backend API', 'Web/Portfolio', 'Other'].map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <textarea
                                        className="form-input" placeholder=" " rows={5}
                                        value={form.message}
                                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                                        style={{ resize: 'vertical', minHeight: 120 }}
                                        required
                                    />
                                    <label className="form-label">Message</label>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-neon-filled"
                                    disabled={status === 'loading'}
                                    style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 15 }}
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>Send Message →</>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
