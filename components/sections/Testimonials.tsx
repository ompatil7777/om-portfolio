'use client'
import { useEffect, useRef, useState } from 'react'

function useInView(ref: React.RefObject<Element | null>) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [ref])
    return inView
}

const TESTIMONIALS = [
    {
        name: 'Rahul Sharma',
        role: 'Founder @ TechStartup India',
        avatar: '👨‍💼',
        content: "Om transformed our lead generation process. Using n8n, he automated our entire CRM pipeline, saving our sales team 15 hours a week. Incredible work ethic and technical skills.",
        company: 'TechStartup India',
        color: '#00D4FF',
    },
    {
        name: 'Priya Mehta',
        role: 'Client @ Urban Nest Realty',
        avatar: '🏡',
        content: "We were looking for the perfect commercial space for our new office. Om's deep market knowledge and professionalism made the entire process seamless. Highly recommend Urban Nest!",
        company: 'Urban Nest',
        color: '#7B2FFF',
    },
    {
        name: 'Alex Thompson',
        role: 'Owner @ SaaS Platform',
        avatar: '🧑‍🚀',
        content: "Hired Om for a custom full-stack web application. He delivered a high-performance Next.js site with flawless animations and responsive design. The quality is exceptional.",
        company: 'SaaS Platform',
        color: '#00FFC8',
    },
    {
        name: 'David Chen',
        role: 'Marketing Director',
        avatar: '👨‍🔬',
        content: "Om built automated webhooks connecting Facebook Ads directly into our database and Slack channel. What used to be manual data entry is now completely automated instantly.",
        company: 'Enterprise Corp',
        color: '#BD00FF',
    },
]

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef)
    const [activeIdx, setActiveIdx] = useState(0)

    // Auto-rotate
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIdx(i => (i + 1) % TESTIMONIALS.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section id="testimonials" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #020409, #050810, #020409)' }}>
            <div className="blob blob-blue" style={{ width: 400, height: 400, top: '5%', right: '-5%', opacity: 0.05 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{
                    opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                    textAlign: 'center', marginBottom: 64,
                }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Social Proof</div>
                    <h2 className="section-heading">
                        What Clients <span className="gradient-text">Say</span>
                    </h2>
                </div>

                {/* Featured Quote */}
                <div style={{
                    maxWidth: 700, margin: '0 auto 48px',
                    opacity: inView ? 1 : 0, transition: 'opacity 0.7s ease 0.2s',
                    textAlign: 'center',
                }}>
                    <div className="glass-strong" style={{ padding: '40px 48px', borderRadius: 24, position: 'relative' }}>
                        {/* Quote mark */}
                        <div style={{
                            position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)',
                            fontSize: 64, color: TESTIMONIALS[activeIdx].color,
                            fontFamily: 'Georgia, serif', lineHeight: 1, opacity: 0.3,
                        }}>"</div>

                        <p style={{
                            fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(15px, 1.5vw, 18px)',
                            color: '#F0F6FF', lineHeight: 1.8, marginBottom: 28, fontStyle: 'italic',
                        }}>
                            &ldquo;{TESTIMONIALS[activeIdx].content}&rdquo;
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: '50%',
                                background: `${TESTIMONIALS[activeIdx].color}22`,
                                border: `2px solid ${TESTIMONIALS[activeIdx].color}44`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 20,
                            }}>
                                {TESTIMONIALS[activeIdx].avatar}
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700, color: '#F0F6FF' }}>
                                    {TESTIMONIALS[activeIdx].name}
                                </div>
                                <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 12, color: '#8892A4' }}>
                                    {TESTIMONIALS[activeIdx].role}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dots navigation */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 48 }}>
                    {TESTIMONIALS.map((t, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIdx(i)}
                            style={{
                                width: i === activeIdx ? 24 : 8, height: 8,
                                borderRadius: 100,
                                background: i === activeIdx ? TESTIMONIALS[i].color : 'rgba(255,255,255,0.12)',
                                border: 'none', cursor: 'none',
                                transition: 'all 0.4s ease',
                                boxShadow: i === activeIdx ? `0 0 10px ${TESTIMONIALS[i].color}` : 'none',
                            }}
                            aria-label={`Testimonial ${i + 1}`}
                        />
                    ))}
                </div>

                {/* All testimonial cards grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                    {TESTIMONIALS.map((t, i) => (
                        <div
                            key={t.name}
                            className="glass"
                            onClick={() => setActiveIdx(i)}
                            style={{
                                padding: 24, borderRadius: 20, cursor: 'none',
                                borderColor: activeIdx === i ? `${t.color}44` : 'rgba(255,255,255,0.08)',
                                boxShadow: activeIdx === i ? `0 0 24px ${t.color}22` : 'none',
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, border-color 0.3s, box-shadow 0.3s`,
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: '50%',
                                    background: `${t.color}15`,
                                    border: `1px solid ${t.color}33`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 18,
                                }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: '#F0F6FF' }}>{t.name}</div>
                                    <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 11, color: '#8892A4' }}>{t.role}</div>
                                </div>
                            </div>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: '#8892A4', lineHeight: 1.7 }}>
                                &ldquo;{t.content.slice(0, 100)}...&rdquo;
                            </p>
                            {/* Stars */}
                            <div style={{ marginTop: 12, color: '#FFB800', fontSize: 12, letterSpacing: 2 }}>
                                ★★★★★
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
