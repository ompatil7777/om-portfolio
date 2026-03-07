'use client'
import { useEffect, useRef, useState } from 'react'
import { PROJECTS } from '@/lib/constants'
import { Project } from '@/lib/types'

function useInView(ref: React.RefObject<Element | null>) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [ref])
    return inView
}

const CATEGORIES = ['All', 'Cloud', 'DevOps', 'Web', 'Backend']

const PROJECT_EMOJIS: Record<number, string> = { 1: '🤖', 2: '👟', 3: '📈', 4: '⚙️' }
const PROJECT_GRADIENTS: Record<number, string> = {
    1: 'linear-gradient(135deg, #1a1060 0%, #0a2060 100%)',
    2: 'linear-gradient(135deg, #004080 0%, #003850 100%)',
    3: 'linear-gradient(135deg, #003020 0%, #004040 100%)',
    4: 'linear-gradient(135deg, #300060 0%, #1a0040 100%)',
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
    const ref = useRef<HTMLDivElement>(null)
    const [tilt, setTilt] = useState({ x: 0, y: 0 })

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = ref.current!.getBoundingClientRect()
        const xPct = ((e.clientX - rect.left) / rect.width - 0.5) * 2
        const yPct = ((e.clientY - rect.top) / rect.height - 0.5) * 2
        setTilt({ x: yPct * -12, y: xPct * 12 })
    }

    return (
        <div
            ref={ref}
            className="project-card glass"
            onMouseMove={onMouseMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            onClick={() => onOpen(project)}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(0)`,
                transition: 'transform 0.1s ease',
                cursor: 'none',
                padding: 0,
                overflow: 'hidden',
                animationDelay: `${index * 0.1}s`,
            }}
        >
            {/* Project image / gradient */}
            <div style={{
                height: 200,
                background: PROJECT_GRADIENTS[project.id],
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <span style={{ fontSize: 56, filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' }}>
                    {PROJECT_EMOJIS[project.id]}
                </span>
                {project.featured && (
                    <div style={{
                        position: 'absolute', top: 12, right: 12,
                        padding: '4px 10px',
                        background: 'rgba(0,212,255,0.15)',
                        border: '1px solid rgba(0,212,255,0.4)',
                        borderRadius: 100,
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: 10,
                        color: '#00D4FF',
                    }}>
                        FEATURED
                    </div>
                )}
                {/* Glow overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: `radial-gradient(circle at center, ${project.color}22 0%, transparent 70%)`,
                }} />
            </div>

            {/* Content */}
            <div style={{ padding: '20px 24px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{
                        fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: project.color,
                        padding: '3px 10px', border: `1px solid ${project.color}44`, borderRadius: 100,
                    }}>
                        {project.category}
                    </span>
                    {project.metrics && (
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#4A5568' }}>
                            ⭐ {project.metrics.stars}
                        </span>
                    )}
                </div>

                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 700, color: '#F0F6FF', marginBottom: 8 }}>
                    {project.title}
                </h3>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 13, color: '#8892A4', lineHeight: 1.6, marginBottom: 16 }}>
                    {project.description}
                </p>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {project.tech.slice(0, 4).map(t => (
                        <span key={t} style={{
                            fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#4A5568',
                            padding: '3px 8px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6,
                        }}>
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 4 && (
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#4A5568' }}>
                            +{project.tech.length - 4}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <div
            style={{
                position: 'fixed', inset: 0, zIndex: 9999,
                background: 'rgba(2,4,9,0.92)',
                backdropFilter: 'blur(20px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: 24,
                animation: 'fadeIn 0.2s ease',
            }}
            onClick={onClose}
        >
            <div
                className="glass-strong"
                style={{ maxWidth: 720, width: '100%', padding: 0, overflow: 'hidden' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    height: 260,
                    background: PROJECT_GRADIENTS[project.id],
                    position: 'relative',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <span style={{ fontSize: 80 }}>{PROJECT_EMOJIS[project.id]}</span>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute', top: 16, right: 16,
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            borderRadius: '50%', width: 36, height: 36,
                            color: '#F0F6FF', fontSize: 18, cursor: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Content */}
                <div style={{ padding: 40 }}>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                        <span style={{
                            fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: project.color,
                            padding: '4px 12px', border: `1px solid ${project.color}44`, borderRadius: 100,
                        }}>
                            {project.category}
                        </span>
                        {project.featured && (
                            <span style={{
                                fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00D4FF',
                                padding: '4px 12px', border: '1px solid rgba(0,212,255,0.3)', borderRadius: 100,
                            }}>FEATURED</span>
                        )}
                    </div>
                    <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: '#F0F6FF', marginBottom: 16 }}>
                        {project.title}
                    </h2>
                    <p style={{ fontFamily: 'Outfit, sans-serif', fontSize: 15, color: '#8892A4', lineHeight: 1.8, marginBottom: 28 }}>
                        {project.longDescription}
                    </p>

                    {/* Tech stack */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                        {project.tech.map(t => (
                            <span key={t} className="skill-badge">{t}</span>
                        ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 12 }}>
                        <a href={project.github} className="btn-neon" style={{ fontSize: 13 }}>
                            🐙 GitHub
                        </a>
                        {project.demo && (
                            <a href={project.demo} className="btn-neon-filled" style={{ fontSize: 13 }}>
                                🚀 Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Projects() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef)
    const [filter, setFilter] = useState('All')
    const [modal, setModal] = useState<Project | null>(null)

    const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === filter)

    return (
        <section id="projects" ref={sectionRef} className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="blob blob-cyan" style={{ width: 400, height: 400, bottom: '0%', right: '-10%', opacity: 0.06 }} />

            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease', marginBottom: 48,
                }}>
                    <div className="section-label">Portfolio</div>
                    <h2 className="section-heading">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                </div>

                {/* Filter tabs */}
                <div style={{
                    display: 'flex', gap: 8, marginBottom: 48, flexWrap: 'wrap',
                    opacity: inView ? 1 : 0, transition: 'opacity 0.6s ease 0.2s',
                }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: 100,
                                border: `1px solid ${filter === cat ? '#00D4FF' : 'rgba(255,255,255,0.08)'}`,
                                background: filter === cat ? 'rgba(0,212,255,0.1)' : 'transparent',
                                color: filter === cat ? '#00D4FF' : '#8892A4',
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontSize: 13,
                                fontWeight: 500,
                                cursor: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: filter === cat ? '0 0 20px rgba(0,212,255,0.15)' : 'none',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Project Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 24,
                }}>
                    {filtered.map((project, i) => (
                        <div key={project.id} style={{
                            opacity: inView ? 1 : 0,
                            transform: inView ? 'translateY(0)' : 'translateY(30px)',
                            transition: `opacity 0.6s ease ${0.1 + i * 0.1}s, transform 0.6s ease ${0.1 + i * 0.1}s`,
                        }}>
                            <ProjectCard project={project} index={i} onOpen={setModal} />
                        </div>
                    ))}
                </div>
            </div>

            {modal && <ProjectModal project={modal} onClose={() => setModal(null)} />}
        </section>
    )
}
