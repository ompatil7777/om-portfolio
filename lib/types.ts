// TypeScript type definitions

export interface NavItem {
    label: string
    href: string
}

export interface TimelineItem {
    year: string
    role: string
    description: string
    icon: string
}

export interface Skill {
    name: string
    icon: string
    orbit: 1 | 2 | 3
    angle: number
    description: string
    color: string
}

export interface Project {
    id: number
    title: string
    description: string
    longDescription: string
    gradient: string
    tech: string[]
    github: string
    demo: string | null
    category: 'Cloud' | 'DevOps' | 'Web' | 'Backend'
    featured: boolean
    metrics?: { stars: number; commits: number; deployments: string }
    color: string
}

export interface Service {
    id: number
    title: string
    description: string
    icon: string
    price: string
    features: string[]
    color: string
}

export interface ArchitectureNode {
    id: string
    label: string
    icon: string
    x: number
    y: number
    color: string
}

export interface ArchitectureEdge {
    from: string
    to: string
}

export interface Message {
    role: 'user' | 'assistant'
    content: string
}

export interface TerminalLine {
    type: 'input' | 'output' | 'error'
    content: string
}
