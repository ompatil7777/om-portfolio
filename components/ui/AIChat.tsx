'use client'
import { useState, useRef, useEffect } from 'react'
import { Message } from '@/lib/types'

const SUGGESTED = [
    "What projects has Om built?",
    "What's Om's tech stack?",
    "Is Om available for hire?",
    "Tell me about the DevOps suite",
]

const AI_RESPONSES: Record<string, string> = {
    project: "Om has built some impressive projects:\n\n🤖 **Virtual Jarvis Assistant** — AI-powered voice assistant on AWS\n👟 **Shoe E-Commerce** — Full-stack with Next.js, Stripe & Redis\n📈 **Stock Price Tracker** — Real-time Go backend + WebSockets\n⚙️ **DevOps Automation Suite** — K8s + Terraform + ArgoCD",
    stack: "Om's core tech stack:\n\n☁️ **Cloud:** AWS (ECS, Lambda, RDS, S3, CloudFront)\n🐳 **DevOps:** Docker, Kubernetes, Terraform, ArgoCD\n🐹 **Backend:** Golang, Node.js, REST APIs\n🔐 **Security:** IAM, VPC, WAF, KMS, zero-trust",
    hire: "Yes! Om is currently available for:\n\n✅ **Freelance projects** (cloud, DevOps, backend)\n✅ **Full-time roles** (cloud-native, platform engineering)\n\nReach out at: contact@ompatil.com\n\nResponse time: within 24 hours 🚀",
    devops: "The **DevOps Automation Suite** is Om's flagship project:\n\n• End-to-end Terraform IaC for AWS\n• GitHub Actions CI + ArgoCD GitOps CD\n• Prometheus + Grafana observability stack\n• Zero to production in under 10 minutes\n• Multi-region, blue/green deployments",
}

function getResponse(msg: string): string {
    const lower = msg.toLowerCase()
    if (lower.includes('project')) return AI_RESPONSES.project
    if (lower.includes('stack') || lower.includes('skill') || lower.includes('technology')) return AI_RESPONSES.stack
    if (lower.includes('hire') || lower.includes('available') || lower.includes('job') || lower.includes('work')) return AI_RESPONSES.hire
    if (lower.includes('devops') || lower.includes('automation') || lower.includes('kubernetes')) return AI_RESPONSES.devops
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) return "Hey there! 👋 I'm Om's portfolio assistant. Ask me about his projects, skills, or availability!"
    if (lower.includes('contact') || lower.includes('email')) return "You can reach Om at:\n📧 contact@ompatil.com\n💼 linkedin.com/in/ompatil\n🐙 github.com/ompatil7777"
    return "I can tell you about Om's projects, tech stack, and availability. Try asking:\n\n• 'What projects has Om built?'\n• 'What's his tech stack?'\n• 'Is he available for hire?'"
}

export default function AIChat() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hey! 👋 I'm Om's AI assistant. I know everything about his skills, projects, and availability. How can I help?" }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, loading])

    const send = async (text: string) => {
        if (!text.trim()) return
        const userMsg: Message = { role: 'user', content: text }
        setMessages(prev => [...prev, userMsg])
        setInput('')
        setLoading(true)
        await new Promise(r => setTimeout(r, 800 + Math.random() * 600))
        const reply = getResponse(text)
        setMessages(prev => [...prev, { role: 'assistant', content: reply }])
        setLoading(false)
    }

    return (
        <div style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 9000 }}>
            {/* Chat Panel */}
            {open && (
                <div className="glass-strong" style={{
                    position: 'absolute',
                    bottom: 72,
                    right: 0,
                    width: 320,
                    height: 440,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 20,
                    overflow: 'hidden',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,212,255,0.08)',
                    animation: 'fadeIn 0.25s ease',
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '14px 16px',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', alignItems: 'center', gap: 10,
                        background: 'rgba(255,255,255,0.02)',
                    }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 16,
                        }}>🤖</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: '#F0F6FF' }}>
                                Om&apos;s Assistant
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FFC8', boxShadow: '0 0 6px #00FFC8' }} />
                                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#00FFC8' }}>Online</span>
                            </div>
                        </div>
                        <button onClick={() => setOpen(false)} style={{
                            background: 'none', border: 'none', color: '#4A5568',
                            fontSize: 18, cursor: 'none', lineHeight: 1,
                        }}>×</button>
                    </div>

                    {/* Messages */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {messages.map((m, i) => (
                            <div key={i} className={m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
                                style={{ whiteSpace: 'pre-wrap', fontSize: 13, lineHeight: 1.6 }}>
                                {m.content}
                            </div>
                        ))}
                        {loading && (
                            <div className="chat-bubble-ai" style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                                {[0, 1, 2].map(i => (
                                    <span key={i} style={{
                                        width: 6, height: 6, borderRadius: '50%',
                                        background: '#8892A4',
                                        animation: `dotPulse 1.2s ease-in-out infinite ${i * 0.2}s`,
                                    }} />
                                ))}
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Suggested prompts */}
                    {messages.length <= 1 && (
                        <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {SUGGESTED.map(s => (
                                <button
                                    key={s}
                                    onClick={() => send(s)}
                                    style={{
                                        padding: '5px 10px',
                                        borderRadius: 100,
                                        border: '1px solid rgba(0,212,255,0.2)',
                                        background: 'rgba(0,212,255,0.05)',
                                        color: '#8892A4',
                                        fontFamily: 'Outfit, sans-serif',
                                        fontSize: 11,
                                        cursor: 'none',
                                        transition: 'all 0.2s ease',
                                        textAlign: 'left',
                                    }}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input */}
                    <div style={{
                        padding: '10px 12px',
                        borderTop: '1px solid rgba(255,255,255,0.06)',
                        display: 'flex', gap: 8,
                    }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && send(input)}
                            placeholder="Ask me anything..."
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: 10,
                                padding: '10px 12px',
                                color: '#F0F6FF',
                                fontFamily: 'Outfit, sans-serif',
                                fontSize: 13,
                                outline: 'none',
                            }}
                        />
                        <button
                            onClick={() => send(input)}
                            disabled={loading}
                            style={{
                                width: 36, height: 36,
                                borderRadius: 10,
                                background: 'linear-gradient(135deg, #00D4FF, #7B2FFF)',
                                border: 'none',
                                color: 'white',
                                fontSize: 15,
                                cursor: 'none',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                opacity: loading ? 0.6 : 1,
                            }}
                        >
                            →
                        </button>
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: 56, height: 56,
                    borderRadius: '50%',
                    background: open
                        ? 'rgba(2,4,9,0.9)'
                        : 'linear-gradient(135deg, #00D4FF20, #7B2FFF20)',
                    border: '1px solid rgba(0,212,255,0.4)',
                    boxShadow: '0 0 30px rgba(0,212,255,0.3)',
                    cursor: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                    transition: 'all 0.3s ease',
                    animation: open ? 'none' : 'breathe 3s ease-in-out infinite',
                }}
                title="Chat with Om's AI"
                aria-label="Open AI chat"
            >
                {open ? '×' : '🤖'}
            </button>

            {!open && (
                <div style={{
                    position: 'absolute',
                    bottom: 64,
                    right: 0,
                    background: 'rgba(2,4,9,0.95)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                    padding: '6px 12px',
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: 12,
                    color: '#8892A4',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                }}>
                    Chat with Om&apos;s AI
                </div>
            )}
        </div>
    )
}
