// Site constants and data
import { Project, Skill, TimelineItem, Service, NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'GitHub', href: '#github' },
    { label: 'Businesses', href: '#businesses' },
    { label: 'Contact', href: '#contact' },
]

export const TIMELINE: TimelineItem[] = [
    { year: '2023', role: 'Full-Stack Development', description: 'Began building web applications using React, Next.js, and modern JavaScript frameworks.', icon: '💻' },
    { year: '2024', role: 'Backend & Automation', description: 'Developed Python backends, Discord bots, and automated workflows using n8n.', icon: '⚙️' },
    { year: '2025', role: 'Cloud Computing Journey', description: 'Diving into Cloud Infrastructure. Currently mastering AWS fundamentals, Docker containerization, and modern deployment strategies.', icon: '☁️' },
    { year: 'Present', role: 'Entrepreneur & Freelancer', description: 'Managing Urban Nest Realty and running a digital freelance agency while building software.', icon: '🏢' },
]

export const SKILLS: Skill[] = [
    // Orbit 1 (inner)
    { name: 'AWS', icon: '☁️', orbit: 1, angle: 0, description: 'EC2, S3, IAM, CloudFront, Lambda fundamentals.', color: '#FF9900' },
    { name: 'Docker', icon: '🐳', orbit: 1, angle: 120, description: 'Containerizing applications, Docker Compose, efficient images.', color: '#2496ED' },
    { name: 'n8n', icon: '⚙️', orbit: 1, angle: 240, description: 'Workflow automation, API integrations, complex webhook routing.', color: '#EA4A5A' },
    // Orbit 2 (middle)
    { name: 'Python', icon: '🐍', orbit: 2, angle: 30, description: 'Backend APIs, AI integrations, scripting, automation bots.', color: '#3776AB' },
    { name: 'React', icon: '⚛️', orbit: 2, angle: 150, description: 'Component-based UI, hooks, state management.', color: '#61DAFB' },
    { name: 'Node.js', icon: '💚', orbit: 2, angle: 270, description: 'Express servers, REST APIs, asynchronous programming.', color: '#68A063' },
    // Orbit 3 (outer)
    { name: 'Next.js', icon: '▲', orbit: 3, angle: 0, description: 'Full-stack React framework, SSR, API routes.', color: '#F0F6FF' },
    { name: 'Tailwind', icon: '🌊', orbit: 3, angle: 72, description: 'Utility-first CSS, responsive design systems.', color: '#38B2AC' },
    { name: 'Git', icon: '📦', orbit: 3, angle: 144, description: 'Version control, branching, GitHub collaboration.', color: '#F05032' },
    { name: 'Linux', icon: '🐧', orbit: 3, angle: 216, description: 'Ubuntu server setup, SSH, basic shell scripting.', color: '#FCC624' },
    { name: 'Databases', icon: '🗄️', orbit: 3, angle: 288, description: 'MongoDB, PostgreSQL, database design.', color: '#336791' },
]

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: 'Virtual Jarvis Assistant',
        description: 'Voice-activated AI assistant with real-time responses and system automation.',
        longDescription: 'A cutting-edge voice-activated AI assistant designed to automate tasks and provide system monitoring. Features include natural language processing, voice recognition, and system management capabilities built with Python.',
        gradient: 'from-blue-600 to-violet-600',
        tech: ['Python', 'AI / NLP', 'Voice Recognition', 'Automation'],
        github: 'https://github.com/ompatil7777/virtual-jarvis-assistant',
        demo: '#',
        category: 'Backend',
        featured: true,
        metrics: { stars: 0, commits: 0, deployments: 'Local' },
        color: '#00D4FF',
    },
    {
        id: 2,
        title: 'Stock Market Tracker',
        description: 'Real-time stock tracking dashboard with interactive charting and analytics.',
        longDescription: 'A real-time stock tracking platform featuring interactive TradingView charts. Built using web technologies to fetch and display live market data, providing users with actionable insights and technical indicators.',
        gradient: 'from-green-500 to-cyan-600',
        tech: ['React/JS', 'APIs', 'Charting', 'WebSockets'],
        github: 'https://github.com/ompatil7777/stock-market-tracker',
        demo: '#',
        category: 'Web',
        featured: true,
        color: '#00FFC8',
    },
    {
        id: 3,
        title: 'Workflow Automation Engine',
        description: 'Complex data routing and multi-app integrations using n8n.',
        longDescription: 'Engineered robust automated workflows connecting various SaaS tools using n8n. Features include automated lead processing, data synchronization across platforms, and custom webhook creation.',
        gradient: 'from-violet-600 to-purple-800',
        tech: ['n8n', 'Webhooks', 'REST APIs', 'Automation'],
        github: '#',
        demo: null,
        category: 'DevOps',
        featured: false,
        color: '#7B2FFF',
    },
]

export const SERVICES: Service[] = [
    {
        id: 1,
        title: 'Cloud Infrastructure Setup',
        description: 'Design and deploy scalable AWS infrastructure — VPCs, ECS, RDS, CDN, IAM policies, cost optimization.',
        icon: '☁️',
        price: 'Starting from $500',
        features: ['Multi-region setup', 'Auto-scaling', 'Cost optimization', 'Security hardening', 'Monitoring & alerting'],
        color: '#00D4FF',
    },
    {
        id: 2,
        title: 'DevOps Automation Pipeline',
        description: 'Full CI/CD pipeline setup with GitHub Actions, ArgoCD, Docker, Kubernetes, monitoring with Grafana.',
        icon: '⚙️',
        price: 'Starting from $400',
        features: ['CI/CD setup', 'GitOps workflows', 'Container orchestration', 'Automated testing', 'Deployment strategies'],
        color: '#7B2FFF',
    },
    {
        id: 3,
        title: 'Backend API Development',
        description: 'High-performance REST or GraphQL APIs in Golang or Node.js — auth, rate limiting, caching.',
        icon: '🔌',
        price: 'Starting from $350',
        features: ['REST & GraphQL', 'Authentication/JWT', 'Rate limiting', 'Redis caching', 'API documentation'],
        color: '#00FFC8',
    },
    {
        id: 4,
        title: 'Portfolio / Web Development',
        description: 'Custom portfolio websites or landing pages with Next.js — the same quality as what you\'re viewing now.',
        icon: '💻',
        price: 'Starting from $200',
        features: ['Next.js 14', 'GSAP animations', 'Three.js visuals', 'SEO optimized', 'Lighthouse 95+'],
        color: '#BD00FF',
    },
]

export const CONTACT_LINKS = [
    { label: 'GitHub', href: 'https://github.com/ompatil7777', icon: '🐙' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/ompatil', icon: '💼' },
    { label: 'Email', href: 'mailto:contact@ompatil.com', icon: '📧' },
    { label: 'Urban Nest', href: '#businesses', icon: '🏢' },
]

export const ARCHITECTURE_NODES = [
    { id: 'user', label: 'User / Browser', icon: '👤', x: 50, y: 5, color: '#00FFC8' },
    { id: 'cloudflare', label: 'Cloudflare / DNS', icon: '🌐', x: 50, y: 25, color: '#00D4FF' },
    { id: 'frontend', label: 'Next.js Frontend', icon: '▲', x: 30, y: 50, color: '#F0F6FF' },
    { id: 'n8n', label: 'n8n Workflow', icon: '⚙️', x: 70, y: 50, color: '#EA4A5A' },
    { id: 'api', label: 'Python Backend', icon: '🐍', x: 50, y: 70, color: '#00D4FF' },
    { id: 'db', label: 'Database', icon: '🗄️', x: 50, y: 90, color: '#527FFF' },
]

export const ARCHITECTURE_EDGES = [
    { from: 'user', to: 'cloudflare' },
    { from: 'cloudflare', to: 'frontend' },
    { from: 'cloudflare', to: 'n8n' },
    { from: 'n8n', to: 'api' },
    { from: 'frontend', to: 'api' },
    { from: 'api', to: 'db' },
]
