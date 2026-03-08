'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ARCHITECTURE_NODES, ARCHITECTURE_EDGES } from '@/lib/constants'

export default function CloudArchitecture() {
    const sectionRef = useRef<HTMLElement>(null)
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)
    const [packets, setPackets] = useState<Array<{ id: number; edge: number; t: number }>>([])
    const animRef = useRef<number>(0)
    const packetId = useRef(0)

    // Framer Motion Cinematic scroll drivers
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    })

    const scaleIn = useTransform(scrollYProgress, [0, 1], [0.8, 1])
    const opacityIn = useTransform(scrollYProgress, [0, 0.6], [0, 1])
    const hologramY = useTransform(scrollYProgress, [0, 1], [150, 0])

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
        const interval = setInterval(() => {
            const edgeIdx = Math.floor(Math.random() * ARCHITECTURE_EDGES.length)
            setPackets(prev => [...prev.slice(-20), { id: packetId.current++, edge: edgeIdx, t: 0 }])
        }, 600)
        return () => clearInterval(interval)
    }, [])

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

            {/* Anime Grid Background */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.02, pointerEvents: 'none',
                backgroundSize: '50px 50px',
                backgroundImage: 'linear-gradient(to right, #7B2FFF 1px, transparent 1px), linear-gradient(to bottom, #7B2FFF 1px, transparent 1px)'
            }} />

            <motion.div
                style={{ maxWidth: 1200, margin: '0 auto', scale: scaleIn, opacity: opacityIn, position: 'relative', zIndex: 10 }}
            >
                {/* Header */}
                <div style={{ marginBottom: 64, textAlign: 'center' }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>
                        Cloud Architecture <span style={{ fontFamily: 'JetBrains Mono', color: '#7B2FFF', opacity: 0.5, marginLeft: 8 }}>// クラウド構造</span>
                    </div>
                    <h2 className="section-heading">
                        Live Infrastructure <span className="gradient-text">Diagram</span>
                    </h2>
                    <p style={{ color: '#8892A4', fontSize: 16, fontFamily: 'Outfit, sans-serif', maxWidth: 500, margin: '0 auto' }}>
                        Hover any node to explore the AWS cloud infrastructure diagram powering production deployments.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
                    {/* Diagram Hologram Array */}
                    <motion.div
                        className="glass"
                        style={{
                            padding: 24, position: 'relative', minHeight: 520, borderRadius: 0,
                            border: '1px solid rgba(123, 47, 255, 0.2)', borderRight: '4px solid #7B2FFF',
                            boxShadow: '0 0 40px rgba(123, 47, 255, 0.05), inset 0 0 20px rgba(123, 47, 255, 0.05)',
                            y: hologramY
                        }}
                    >
                        {/* HUD Elements */}
                        <div style={{ position: 'absolute', top: 10, left: 10, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#7B2FFF', opacity: 0.6 }}>AWS_INFRA_V2.1</div>
                        <div style={{ position: 'absolute', bottom: 10, right: 10, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#7B2FFF', opacity: 0.6 }}>[ ONLINE ]</div>
                        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(123,47,255,0.03) 3px, rgba(123,47,255,0.03) 4px)', pointerEvents: 'none' }} />

                        {/* SVG connections */}
                        <svg
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
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
                                                r="1.2"
                                                fill={to.color}
                                                opacity={0.8}
                                                style={{ filter: `drop-shadow(0 0 4px ${to.color})` }}
                                            />
                                        ))}
                                    </g>
                                )
                            })}
                        </svg>

                        {/* Nodes */}
                        <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
                            {ARCHITECTURE_NODES.map(node => (
                                <button
                                    key={node.id}
                                    onMouseEnter={() => setHoveredNode(node.id)}
                                    onMouseLeave={() => setHoveredNode(null)}
                                    style={{
                                        position: 'absolute',
                                        left: `${node.x}%`,
                                        top: `${node.y}%`,
                                        background: hoveredNode === node.id
                                            ? `rgba(${parseInt(node.color.slice(1, 3), 16)}, ${parseInt(node.color.slice(3, 5), 16)}, ${parseInt(node.color.slice(5, 7), 16)}, 0.15)`
                                            : 'rgba(10, 14, 26, 0.95)',
                                        border: `1px solid ${hoveredNode === node.id ? node.color : 'rgba(255,255,255,0.1)'}`,
                                        borderRadius: 4, // More rigid, mecha shape
                                        padding: '8px 12px',
                                        cursor: 'none',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 4,
                                        minWidth: 72,
                                        transition: 'all 0.3s ease',
                                        boxShadow: hoveredNode === node.id ? `0 0 20px ${node.color}44` : 'none',
                                        transform: `translate(-50%, -50%) ${hoveredNode === node.id ? 'scale(1.15) translateY(-5px)' : 'scale(1)'}`,
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
                                    {/* Mecha Targeting Box */}
                                    {hoveredNode === node.id && (
                                        <div style={{
                                            position: 'absolute', inset: -4, border: `1px solid ${node.color}`,
                                            pointerEvents: 'none', mixBlendMode: 'screen'
                                        }}>
                                            <div style={{ position: 'absolute', top: -1, left: -1, width: 4, height: 4, background: node.color }} />
                                            <div style={{ position: 'absolute', top: -1, right: -1, width: 4, height: 4, background: node.color }} />
                                            <div style={{ position: 'absolute', bottom: -1, left: -1, width: 4, height: 4, background: node.color }} />
                                            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 4, height: 4, background: node.color }} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Node description panel */}
                    <div style={{ position: 'relative' }}>
                        {hoveredNode ? (
                            <div className="glass-strong" style={{ padding: 36, borderRadius: 0, borderTop: `4px solid ${ARCHITECTURE_NODES.find(n => n.id === hoveredNode)!.color}` }}>
                                {(() => {
                                    const node = ARCHITECTURE_NODES.find(n => n.id === hoveredNode)!
                                    return (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                                <div style={{ fontSize: 48 }}>{node.icon}</div>
                                                <div style={{ fontFamily: 'JetBrains Mono', color: node.color, opacity: 0.5, fontSize: 12 }}>ID:{node.id.toUpperCase()}</div>
                                            </div>
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
                                <div className="glass" style={{ padding: 28, borderRadius: 0, borderLeft: '4px solid #F0F6FF' }}>
                                    <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 20, fontWeight: 700, color: '#F0F6FF', marginBottom: 12 }}>
                                        Production Architecture
                                    </h3>
                                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 14, color: '#8892A4', lineHeight: 1.7 }}>
                                        A battle-tested AWS cloud architecture designed for high availability, auto-scaling, and zero-downtime deployments.
                                    </p>
                                </div>
                                {(
                                    [
                                        { t: 'Multi-AZ Failover', jp: 'フェイルオーバー' },
                                        { t: 'Auto-Scaling Groups', jp: 'オートスケーリング' },
                                        { t: 'Zero-Trust Security', jp: 'ゼロトラスト' },
                                        { t: 'GitOps Deployments', jp: 'デプロイ' }
                                    ]
                                ).map((f, i) => (
                                    <div key={f.t} className="glass" style={{
                                        padding: '16px 24px', borderRadius: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                            <span style={{ color: '#00FFC8', fontSize: 16 }}>✓</span>
                                            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 14, color: '#F0F6FF' }}>{f.t}</span>
                                        </div>
                                        <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#00FFC8', opacity: 0.3 }}>{f.jp}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </section>
    )
}
