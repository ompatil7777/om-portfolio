'use client'
import { useEffect, useRef, useState } from 'react'
import { SKILLS } from '@/lib/constants'
import { Skill } from '@/lib/types'

function useInView(ref: React.RefObject<Element | null>) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.2 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [ref])
    return inView
}

const ORBIT_RADII = { 1: 110, 2: 180, 3: 255 }
const ORBIT_SPEEDS = { 1: 0.0006, 2: 0.0004, 3: 0.00025 }

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef)
    const animRef = useRef<number>()
    const anglesRef = useRef<Record<string, number>>({})
    const [tooltip, setTooltip] = useState<Skill | null>(null)
    const [paused, setPaused] = useState(false)
    const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({})

    // Initialize angles
    useEffect(() => {
        SKILLS.forEach(s => {
            anglesRef.current[s.name] = (s.angle * Math.PI) / 180
        })
    }, [])

    // Orbit animation
    useEffect(() => {
        if (!inView || paused) return

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
    }, [inView, paused])

    // Snapshot positions when paused
    const handleNodeHover = (skill: Skill | null) => {
        setTooltip(skill)
        setPaused(!!skill)
    }

    return (
        <section id="skills" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #020409 0%, #0A0E1A 50%, #020409 100%)' }}>
            <div className="blob blob-blue" style={{ width: 500, height: 500, top: '20%', left: '-15%', opacity: 0.06 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                <div style={{
                    opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease', marginBottom: 64, textAlign: 'center',
                }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Tech Stack</div>
                    <h2 className="section-heading">
                        Skills <span className="gradient-text">Constellation</span>
                    </h2>
                    <p style={{ color: '#8892A4', fontFamily: 'Outfit, sans-serif', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
                        Hover any skill node to explore — the universe orbits around a cloud-native core
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                    {/* Orbit System */}
                    <div className="orbit-system" style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.8s ease 0.3s' }}>
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
                                        transition: 'border-color 0.2s, box-shadow 0.2s, color 0.2s',
                                    }}
                                >
                                    <span style={{ fontSize: 14 }}>{skill.icon}</span>
                                    <span>{skill.name}</span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Tooltip / Skill List */}
                    <div>
                        {tooltip ? (
                            <div className="glass-strong" style={{
                                padding: 32, borderRadius: 20,
                                borderColor: `${tooltip.color}44`,
                                boxShadow: `0 0 40px ${tooltip.color}22`,
                                animation: 'fadeIn 0.2s ease',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                                    <span style={{ fontSize: 32 }}>{tooltip.icon}</span>
                                    <div>
                                        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: tooltip.color }}>
                                            {tooltip.name}
                                        </div>
                                        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#4A5568', marginTop: 2 }}>
                                            ORBIT {tooltip.orbit}
                                        </div>
                                    </div>
                                </div>
                                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: '#8892A4', lineHeight: 1.7 }}>
                                    {tooltip.description}
                                </p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {[
                                    { label: 'Cloud Infrastructure', skills: ['AWS', 'Docker', 'Kubernetes'], color: '#00D4FF' },
                                    { label: 'Automation & DevOps', skills: ['Terraform', 'CI/CD', 'Prometheus'], color: '#7B2FFF' },
                                    { label: 'Backend Engineering', skills: ['Golang', 'Node.js', 'Redis'], color: '#00FFC8' },
                                    { label: 'Security & Operations', skills: ['Security', 'Linux', 'Git', 'Python'], color: '#BD00FF' },
                                ].map((cat, i) => (
                                    <div key={cat.label} className="glass" style={{
                                        padding: '20px 24px',
                                        opacity: inView ? 1 : 0,
                                        transform: inView ? 'translateX(0)' : 'translateX(30px)',
                                        transition: `opacity 0.6s ease ${0.4 + i * 0.1}s, transform 0.6s ease ${0.4 + i * 0.1}s`,
                                    }}>
                                        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, color: cat.color, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                                            {cat.label}
                                        </div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                            {cat.skills.map(s => {
                                                const skill = SKILLS.find(sk => sk.name === s)
                                                return (
                                                    <span key={s} className="skill-badge">
                                                        {skill?.icon} {s}
                                                    </span>
                                                )
                                            })}
                                        </div>
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
