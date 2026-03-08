'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SKILLS } from '@/lib/constants'
import { Skill } from '@/lib/types'

const ORBIT_RADII: Record<number, number> = { 1: 110, 2: 180, 3: 255 }
const ORBIT_SPEEDS: Record<number, number> = { 1: 0.0006, 2: 0.0004, 3: 0.00025 }

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null)
    const animRef = useRef<number>(0)
    const anglesRef = useRef<Record<string, number>>({})
    const [tooltip, setTooltip] = useState<Skill | null>(null)
    const [paused, setPaused] = useState(false)
    const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({})

    // Framer Motion Cinematic scroll drivers
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    })

    const scaleIn = useTransform(scrollYProgress, [0, 1], [0.8, 1])
    const opacityIn = useTransform(scrollYProgress, [0, 0.6], [0, 1])
    const hudY = useTransform(scrollYProgress, [0, 1], [100, 0])

    // Initialize angles
    useEffect(() => {
        SKILLS.forEach(s => {
            anglesRef.current[s.name] = (s.angle * Math.PI) / 180
        })
    }, [])

    // Orbit animation
    useEffect(() => {
        if (paused) return

        const animate = () => {
            const pos: Record<string, { x: number; y: number }> = {}
            SKILLS.forEach(s => {
                const r = ORBIT_RADII[s.orbit]
                const speed = ORBIT_SPEEDS[s.orbit]
                anglesRef.current[s.name] = (anglesRef.current[s.name] || 0) + speed
                const angle = anglesRef.current[s.name]
                pos[s.name] = {
                    x: 50 + (r / 280) * 50 * Math.cos(angle),
                    y: 50 + (r / 280) * 50 * Math.sin(angle),
                }
            })
            setNodePositions(pos)
            animRef.current = requestAnimationFrame(animate)
        }
        animRef.current = requestAnimationFrame(animate)
        return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
    }, [paused])

    const handleNodeHover = (skill: Skill | null) => {
        setTooltip(skill)
        setPaused(!!skill)
    }

    return (
        <section id="skills" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #020409 0%, #0A0E1A 50%, #020409 100%)' }}>
            <div className="blob blob-blue" style={{ width: 500, height: 500, top: '20%', left: '-15%', opacity: 0.06 }} />

            {/* Subtle Grid / Scanline Background for Mecha/Anime Feel */}
            <div style={{
                position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none',
                backgroundSize: '40px 40px',
                backgroundImage: 'linear-gradient(to right, #00FFC8 1px, transparent 1px), linear-gradient(to bottom, #00FFC8 1px, transparent 1px)'
            }} />

            <motion.div
                style={{ maxWidth: 1200, margin: '0 auto', scale: scaleIn, opacity: opacityIn, position: 'relative', zIndex: 10 }}
            >
                <div style={{
                    marginBottom: 64, textAlign: 'center',
                }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>
                        Tech Stack <span style={{ fontFamily: 'JetBrains Mono', color: '#00FFC8', opacity: 0.5, marginLeft: 8 }}>// 技術スタック</span>
                    </div>
                    <h2 className="section-heading">
                        Skills <span className="gradient-text">Constellation</span>
                    </h2>
                    <p style={{ color: '#8892A4', fontFamily: 'Outfit, sans-serif', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
                        Hover any skill node to explore — the universe orbits around a cloud-native core. Activating HUD targeting system.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 64, alignItems: 'center' }}>
                    {/* Orbit System */}
                    <div className="orbit-system">
                        {/* Mecha Targeting Reticle */}
                        <div style={{
                            position: 'absolute', inset: -20, border: '1px solid rgba(0, 255, 200, 0.1)', borderRadius: '50%',
                            animation: 'spin 20s linear infinite reverse', pointerEvents: 'none', borderStyle: 'dashed'
                        }} />

                        {/* Orbit rings */}
                        {([1, 2, 3] as const).map(o => (
                            <div key={o} className="orbit-ring" style={{
                                width: ORBIT_RADII[o] * 2, height: ORBIT_RADII[o] * 2,
                                opacity: 0.3,
                            }} />
                        ))}

                        {/* Core */}
                        <div className="orbit-core">
                            <div style={{ fontSize: 7, lineHeight: 1.4, textAlign: 'center', padding: 8 }}>
                                ☁️<br />Cloud-Native<br />Stack
                            </div>
                        </div>

                        {/* Skill nodes */}
                        {SKILLS.map(skill => {
                            const pos = nodePositions[skill.name]
                            return (
                                <div
                                    key={skill.name}
                                    className="orbit-skill-node"
                                    onMouseEnter={() => handleNodeHover(skill)}
                                    onMouseLeave={() => handleNodeHover(null)}
                                    style={{
                                        left: pos ? `${pos.x}%` : '50%',
                                        top: pos ? `${pos.y}%` : '50%',
                                        borderColor: tooltip?.name === skill.name ? skill.color : undefined,
                                        boxShadow: tooltip?.name === skill.name ? `0 0 24px ${skill.color}66` : undefined,
                                        color: tooltip?.name === skill.name ? skill.color : undefined,
                                        transform: tooltip?.name === skill.name ? 'translate(-50%, -50%) scale(1.2)' : 'translate(-50%, -50%) scale(1)',
                                        transition: 'border-color 0.2s, box-shadow 0.2s, color 0.2s, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                    }}
                                >
                                    <span style={{ fontSize: 14 }}>{skill.icon}</span>
                                    <span>{skill.name}</span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Tooltip / Skill List in a HUD Framework */}
                    <motion.div style={{ position: 'relative', y: hudY }}>
                        {/* Anime HUD Corner Accents */}
                        <div style={{ position: 'absolute', top: -10, left: -10, width: 20, height: 20, borderTop: '2px solid #00FFC8', borderLeft: '2px solid #00FFC8', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', top: -10, right: -10, width: 20, height: 20, borderTop: '2px solid #00FFC8', borderRight: '2px solid #00FFC8', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: -10, left: -10, width: 20, height: 20, borderBottom: '2px solid #00FFC8', borderLeft: '2px solid #00FFC8', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', bottom: -10, right: -10, width: 20, height: 20, borderBottom: '2px solid #00FFC8', borderRight: '2px solid #00FFC8', pointerEvents: 'none' }} />

                        {tooltip ? (
                            <div className="glass-strong" style={{
                                padding: 32, borderRadius: 0, // Hard edges for Mecha feel
                                borderColor: `${tooltip.color}44`,
                                borderLeft: `4px solid ${tooltip.color}`, // Anime HUD side bar
                                boxShadow: `0 0 40px ${tooltip.color}22`,
                                animation: 'fadeIn 0.2s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                {/* HUD Background scanline */}
                                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)', pointerEvents: 'none' }} />

                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, position: 'relative' }}>
                                    <span style={{ fontSize: 32 }}>{tooltip.icon}</span>
                                    <div>
                                        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: tooltip.color }}>
                                            {tooltip.name}
                                        </div>
                                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#4A5568', marginTop: 2, display: 'flex', gap: 8 }}>
                                            <span>ORBIT_LEVEL:{tooltip.orbit}</span>
                                            <span style={{ color: tooltip.color, opacity: 0.5 }}>[ アクティブ ]</span>
                                        </div>
                                    </div>
                                </div>
                                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: '#8892A4', lineHeight: 1.7, position: 'relative' }}>
                                    {tooltip.description}
                                </p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    { label: 'Cloud Infrastructure', skills: ['AWS', 'Docker', 'Kubernetes'], color: '#00D4FF', jp: 'インフラ' },
                                    { label: 'Automation & DevOps', skills: ['Terraform', 'CI/CD', 'Prometheus'], color: '#7B2FFF', jp: '自動化' },
                                    { label: 'Backend Engineering', skills: ['Golang', 'Node.js', 'Redis'], color: '#00FFC8', jp: 'バックエンド' },
                                    { label: 'Security & Operations', skills: ['Security', 'Linux', 'Git', 'Python'], color: '#BD00FF', jp: 'セキュリティ' },
                                ].map((cat, i) => (
                                    <div key={cat.label} className="glass" style={{
                                        padding: '20px 24px',
                                        borderRadius: 0,
                                        borderLeft: `2px solid ${cat.color}66`,
                                    }}>
                                        <div style={{
                                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                            fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, color: cat.color,
                                            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10
                                        }}>
                                            <span>{cat.label}</span>
                                            <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, opacity: 0.4 }}>{cat.jp}</span>
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                            {cat.skills.map(s => {
                                                const skill = SKILLS.find(sk => sk.name === s)
                                                return (
                                                    <span key={s} className="skill-badge" style={{ borderRadius: 4, background: 'rgba(255,255,255,0.03)' }}>
                                                        {skill?.icon} {s}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
