'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Lead {
    id: string
    date: string
    source: string
    name: string
    email: string
    service: string
    message: string
}

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)

    const fetchLeads = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/leads')
            const data = await res.json()
            if (data.leads) setLeads(data.leads.reverse()) // Newest first
        } catch (e) {
            console.error('Failed to load leads')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchLeads()
    }, [])

    return (
        <main style={{ minHeight: '100vh', background: '#020409', color: '#F0F6FF', overflowX: 'hidden' }}>
            <nav style={{ padding: '24px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <Link href="/" style={{ fontSize: 18, color: '#8892A4', textDecoration: 'none' }}>
                    ← Return to site
                </Link>
                <div style={{ fontWeight: 'bold', fontSize: 20 }}>
                    🔒 Executive Admin Center
                </div>
            </nav>

            <section style={{ maxWidth: 1200, margin: '64px auto', padding: '0 5vw', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
                    <div>
                        <h1 style={{ fontSize: 40, fontFamily: 'Syne, sans-serif', fontWeight: 700, marginBottom: 8 }}>Inquiry Lead Pipeline</h1>
                        <p style={{ color: '#8892A4' }}>View collected leads from Urban Nest Realty and CloudCraft Digital.</p>
                    </div>
                    <button onClick={fetchLeads} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', transition: '0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
                        Refresh Data ↻
                    </button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: 80, color: '#8892A4' }}>Decrypting Secure Database...</div>
                ) : leads.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 80, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px dashed rgba(255,255,255,0.1)' }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                        <h3 style={{ fontSize: 24, marginBottom: 8 }}>No leads found yet.</h3>
                        <p style={{ color: '#8892A4' }}>When users fill out the forms on your venture pages, they will appear here securely.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: 24 }}>
                        {leads.map(lead => (
                            <div key={lead.id} style={{
                                background: 'rgba(255,255,255,0.02)',
                                borderLeft: `4px solid ${lead.source.includes('Nest') ? '#00D4FF' : '#7B2FFF'}`,
                                padding: 24,
                                borderRadius: '0 16px 16px 0',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                                animation: 'fadeIn 0.5s ease',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 16 }}>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        <div style={{ background: lead.source.includes('Nest') ? 'rgba(0,212,255,0.1)' : 'rgba(123,47,255,0.1)', color: lead.source.includes('Nest') ? '#00D4FF' : '#7B2FFF', padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 'bold', fontFamily: 'JetBrains Mono, monospace' }}>
                                            {lead.source.toUpperCase()}
                                        </div>
                                        <span style={{ color: '#8892A4', fontSize: 13 }}>{new Date(lead.date).toLocaleString()}</span>
                                    </div>
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 100, fontSize: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                                        🎯 {lead.service}
                                    </div>
                                </div>

                                <h3 style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 4 }}>{lead.name}</h3>
                                <a href={`mailto:${lead.email}`} style={{ color: '#00D4FF', textDecoration: 'none', fontSize: 15 }}>{lead.email}</a>

                                {lead.message && (
                                    <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                        <div style={{ color: '#8892A4', fontSize: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Message / Details</div>
                                        <p style={{ lineHeight: 1.6, color: '#F0F6FF', whiteSpace: 'pre-wrap' }}>{lead.message}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
