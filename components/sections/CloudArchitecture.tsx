'use client'
import { useEffect, useRef, useState } from 'react'
import { ARCHITECTURE_NODES, ARCHITECTURE_EDGES } from '@/lib/constants'

function useInView(ref: React.RefObject<Element | null>) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [ref])
    return inView
}

export default function CloudArchitecture() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef)
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)
    const [packets, setPackets] = useState<Array<{ id: number; edge: number; t: number }>>([])
    const animRef = useRef<number>()
    const packetId = useRef(0)

    const NODE_DESCRIPTIONS: Record<string, string> = {
        user: 'End users accessing the application via web browsers over HTTPS.',
        cloudfront: 'AWS CloudFront CDN — global edge caching, SSL termination, DDoS protection.',
        alb: 'Application Load Balancer — distributes traffic across healthy container instances.',
        ecs: 'ECS Fargate — serverless container execution, auto-scaling, no server management.',
        lambda: 'AWS Lambda — event-driven functions for async processing and webhooks.',
        api: 'API Gateway — REST API management with auth, rate limiting, and throttling.',
        rds: 'Amazon RDS PostgreSQL — managed relational database with Multi-AZ failover.',
        redis: 'ElastiCache Redis — in-memory caching for sessions, rate limiting, real-time data.',
        s3: 'Amazon S3 — object storage for static assets, backups, and data lake.',
    }

    // Animate data packets
    useEffect(() => {
        if (!inView) return
        const interval = setInterval(() => {
            const edgeIdx = Math.floor(Math.random() * ARCHITECTURE_EDGES.length)
            setPackets(prev => [...prev.slice(-20), { id: packetId.current++, edge: edgeIdx, t: 0 }])
        }, 600)
        return () => clearInterval(interval)
    }, [inView])

    useEffect(() => {
        const animate = () => {
            setPackets(prev => prev
                .map(p => ({ ...p, t: p.t + 0.018 }))
                .filter(p => p.t < 1)
            )
            animRef.current = requestAnimationFrame(animate)
        }
        animRef.current = requestAnimationFrame(animate)
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
    }, [])

    return (
        <section id="architecture" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #020409 0%, #050810 50%, #020409 100%)' }}>
            <div className="blob blob-violet" style={{ width: 500, height: 500, top: '20%', left: '-15%', opacity: 0.06 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease', marginBottom: 64, textAlign: 'center',
                }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Cloud Architecture</div>
                    <h2 className="section-heading">
                        Live Infrastructure <span className="gradient-text">Diagram</span>
                    </h2>
                    <p style={{ color: '#8892A4', fontSize: 16, fontFamily: 'Outfit, sans-serif', maxWidth: 500, margin: '0 auto' }}>
                        Hover any node to explore the AWS cloud infrastructure powering production deployments
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
                    {/* Diagram */}
                    <div
                        className="glass"
                        style={{
                            padding: 24,
                            position: 'relative',
                            opacity: inView ? 1 : 0,
                            transition: 'opacity 0.8s ease 0.3s',
                            minHeight: 520,
                        }}
                    >
                        {/* SVG connections */}
                        <svg
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                        >
                            {ARCHITECTURE_EDGES.map((edge, i) => {
                                const from = ARCHITECTURE_NODES.find(n => n.id === edge.from)!
                                const to = ARCHITECTURE_NODES.find(n => n.id === edge.to)!
                                return (
                                    <g key={i}>
                                        <line
                                            x1={from.x} y1={from.y}
                                            x2={to.x} y2={to.y}
                                            stroke="rgba(0,212,255,0.15)"
                                            strokeWidth="0.4"
                                        />
                                        {/* Animated packets on this edge */}
                                        {packets.filter(p => p.edge === i).map(p => (
                                            <circle
                                                key={p.id}
                                                cx={from.x + (to.x - from.x) * p.t}
                                                cy={from.y + (to.y - from.y) * p.t}
                                                r="1"
                                                fill="#00D4FF"
                                                opacity={0.8}
                                                style={{ filter: 'drop-shadow(0 0 2px #00D4FF)' }}
                                            />
                                        ))}
                                    </g>
                                )
                            })}
                        </svg>

                        {/* Nodes */}
                        {ARCHITECTURE_NODES.map(node => (
                            <button
                                key={node.id}
                                onMouseEnter={() => setHoveredNode(node.id)}
                                onMouseLeave={() => setHoveredNode(null)}
                                style={{
                                    position: 'absolute',
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                    transform: 'translate(-50%, -50%)',
                                    background: hoveredNode === node.id
                                        ? `rgba(${parseInt(node.color.slice(1, 3), 16)}, ${parseInt(node.color.slice(3, 5), 16)}, ${parseInt(node.color.slice(5, 7), 16)}, 0.15)`
                                        : 'rgba(10, 14, 26, 0.95)',
                                    border: `1px solid ${hoveredNode === node.id ? node.color : 'rgba(255,255,255,0.1)'}`,
                                    borderRadius: 12,
                                    padding: '8px 12px',
                                    cursor: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: 4,
                                    minWidth: 72,
                                    transition: 'all 0.3s ease',
                                    boxShadow: hoveredNode === node.id ? `0 0 20px ${node.color}44` : 'none',
                                    transform: `translate(-50%, -50%) ${hoveredNode === node.id ? 'scale(1.1)' : 'scale(1)'}`,
                                    zIndex: hoveredNode === node.id ? 10 : 1,
                                }}
                            >
                                <span style={{ fontSize: 18 }}>{node.icon}</span>
                                <span style={{
                                    fontFamily: 'JetBrains Mono, monospace',
                                    fontSize: 8,
                                    color: hoveredNode === node.id ? node.color : '#8892A4',
                                    textAlign: 'center',
                                    lineHeight: 1.3,
                                    whiteSpace: 'nowrap',
                                }}>
                                    {node.label}
                                </span>
                                {/* Pulse ring */}
                                {hoveredNode === node.id && (
                                    <div style={{
                                        position: 'absolute',
                                        inset: -6,
                                        border: `1px solid ${node.color}`,
                                        borderRadius: 16,
                                        animation: 'pulse-ring 1.5s ease-out infinite',
                                        pointerEvents: 'none',
                                    }} />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Node description panel */}
                    <div>
                        {hoveredNode ? (
                            <div className="glass-strong" style={{ padding: 36 }}>
                                {(() => {
                                    const node = ARCHITECTURE_NODES.find(n => n.id === hoveredNode)!
                                    return (
                                        <>
                                            <div style={{ fontSize: 48, marginBottom: 16 }}>{node.icon}</div>
                                            <h3 style={{
                                                fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700,
                                                color: node.color, marginBottom: 12,
                                            }}>
                                                {node.label}
                                            </h3>
                                            <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: '#8892A4', lineHeight: 1.8 }}>
                                                {NODE_DESCRIPTIONS[hoveredNode]}
                                            </p>
                                        </>
                                    )
                                })()}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                                <div className="glass" style={{ padding: 28 }}>
                                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: '#F0F6FF', marginBottom: 12 }}>
                                        Production Architecture
                                    </h3>
                                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, color: '#8892A4', lineHeight: 1.7 }}>
                                        A battle-tested AWS cloud architecture designed for high availability, auto-scaling, and zero-downtime deployments.
                                    </p>
                                </div>
                                {(['Multi-AZ Failover', 'Auto-Scaling Groups', 'Zero-Trust Security', 'GitOps Deployments']).map((f, i) => (
                                    <div key={f} className="glass" style={{
                                        padding: '16px 24px',
                                        display: 'flex', alignItems: 'center', gap: 12,
                                        opacity: inView ? 1 : 0,
                                        transition: `opacity 0.5s ease ${0.4 + i * 0.1}s`,
                                    }}>
                                        <span style={{ color: '#00FFC8', fontSize: 16 }}>✓</span>
                                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, color: '#F0F6FF' }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
