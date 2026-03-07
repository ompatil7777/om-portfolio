'use client'
import { useEffect, useRef, useState } from 'react'
import { TerminalLine } from '@/lib/types'

type Command = 'help' | 'whoami' | 'skills' | 'projects' | 'contact' | 'resume' | 'clear' | 'hire me' | string

const COMMANDS_HELP = `Available commands:
  <span class="cmd">about</span>      → Learn about Om
  <span class="cmd">skills</span>     → View tech stack
  <span class="cmd">projects</span>   → Explore projects
  <span class="cmd">contact</span>    → Get contact info
  <span class="cmd">resume</span>     → Download resume
  <span class="cmd">whoami</span>     → Identity reveal
  <span class="cmd">hire me</span>    → Make Om smile 😄
  <span class="cmd">clear</span>      → Clear terminal`

const COMMAND_RESPONSES: Record<string, string> = {
    help: COMMANDS_HELP,
    about: `<span class="success">Om</span> — Cloud & DevOps Engineer
  Obsessed with building scalable infra, automating the boring parts,
  and securing architectures that don't break at 3AM.`,
    whoami: `<span class="success">Om</span> — Cloud & DevOps Engineer
  Building infrastructure that doesn't break at 3AM.
  <span class="highlight">Status:</span> Open to freelance & full-time roles`,
    skills: `╔══════════════════════════════════╗
  ║  <span class="success">Cloud:</span>    AWS, GCP fundamentals  ║
  ║  <span class="success">DevOps:</span>   Docker, K8s, Terraform  ║
  ║  <span class="success">Backend:</span>  Golang, Node.js         ║
  ║  <span class="success">Security:</span> IAM, VPC, WAF, KMS      ║
  ╚══════════════════════════════════╝`,
    projects: `<span class="highlight">[1]</span> Virtual Jarvis Assistant   → AI + Cloud
  <span class="highlight">[2]</span> Shoe E-Commerce Platform    → Full Stack
  <span class="highlight">[3]</span> Stock Price Tracker         → Real-time + Go
  <span class="highlight">[4]</span> DevOps Automation Suite     → K8s + Terraform`,
    contact: `📧  <span class="cmd">aryanpatilofficial77@gmail.com</span>
  🐙  <span class="cmd">github.com/ompatil7777</span>
  💼  <span class="cmd">linkedin.com/in/om-patil-43712724b</span>`,
    resume: `<span class="success">Downloading resume...</span>
  ████████████████████ 100%
  ✅ resume.pdf downloaded successfully`,
    'hire me': `<span class="success">✅ Excellent choice.</span> Running background checks...
  ████████████████████ 100%
  <span class="success">Status: HIGHLY RECOMMENDED</span>
  Let's build something great! → aryanpatilofficial77@gmail.com`,
}

const AUTOCOMPLETE = ['help', 'about', 'whoami', 'skills', 'projects', 'contact', 'resume', 'clear', 'hire me']

function useInView(ref: React.RefObject<Element | null>) {
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.15 })
        if (ref.current) obs.observe(ref.current)
        return () => obs.disconnect()
    }, [ref])
    return inView
}

export default function TerminalSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const inView = useInView(sectionRef)
    const [lines, setLines] = useState<TerminalLine[]>([
        { type: 'output', content: '<span class="success">Welcome to Om\'s Portfolio Terminal v1.0.0</span>' },
        { type: 'output', content: 'Type <span class="cmd">help</span> to see available commands.' },
    ])
    const [input, setInput] = useState('')
    const [history, setHistory] = useState<string[]>([])
    const [histIdx, setHistIdx] = useState(-1)
    const [typing, setTyping] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }

    useEffect(scrollToBottom, [lines, typing])

    const typeResponse = (text: string) => {
        setTyping('')
        const chars = text.split('')
        let i = 0
        const interval = setInterval(() => {
            if (i < chars.length) {
                setTyping(prev => (prev ?? '') + chars[i])
                i++
            } else {
                clearInterval(interval)
                setLines(prev => [...prev, { type: 'output', content: text }])
                setTyping(null)
            }
        }, 5)
    }

    const runCommand = (cmd: Command) => {
        const trimmed = cmd.trim().toLowerCase()
        setLines(prev => [...prev, { type: 'input', content: trimmed }])
        setHistory(prev => [trimmed, ...prev])
        setHistIdx(-1)
        setInput('')

        if (trimmed === 'clear') {
            setLines([])
            return
        }
        if (trimmed === 'resume') {
            window.open('/resume.pdf', '_blank')
        }

        const response = COMMAND_RESPONSES[trimmed]
        if (response) {
            setTimeout(() => typeResponse(response), 100)
        } else if (trimmed === '') {
            // nothing
        } else {
            setTimeout(() => {
                setLines(prev => [...prev, { type: 'error', content: `<span class="error">Command not found: ${trimmed}</span> — try <span class="cmd">help</span>` }])
            }, 100)
        }
    }

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            runCommand(input)
        } else if (e.key === 'Tab') {
            e.preventDefault()
            const match = AUTOCOMPLETE.find(c => c.startsWith(input.toLowerCase()))
            if (match) setInput(match)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            const nextIdx = Math.min(histIdx + 1, history.length - 1)
            setHistIdx(nextIdx)
            setInput(history[nextIdx] || '')
        } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            const nextIdx = Math.max(histIdx - 1, -1)
            setHistIdx(nextIdx)
            setInput(nextIdx === -1 ? '' : history[nextIdx] || '')
        }
    }

    return (
        <section ref={sectionRef} className="section" style={{ position: 'relative', background: 'linear-gradient(180deg, #020409 0%, #050810 50%, #020409 100%)' }}>
            <div className="blob blob-cyan" style={{ width: 300, height: 300, top: '20%', right: '-5%', opacity: 0.06 }} />

            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <div style={{
                    opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                    textAlign: 'center', marginBottom: 48,
                }}>
                    <div className="section-label" style={{ justifyContent: 'center' }}>Interactive</div>
                    <h2 className="section-heading">
                        Portfolio <span className="gradient-text">Terminal</span>
                    </h2>
                    <p style={{ color: '#8892A4', fontSize: 16, fontFamily: 'Outfit, sans-serif' }}>
                        Type <code style={{ color: '#00D4FF', fontFamily: 'JetBrains Mono, monospace', fontSize: 14 }}>help</code> to explore via command line
                    </p>
                </div>

                <div
                    className="terminal-container"
                    onClick={() => inputRef.current?.focus()}
                    style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
                    }}
                >
                    {/* Terminal header */}
                    <div className="terminal-header">
                        <div className="terminal-dot" style={{ background: '#FF5F57' }} />
                        <div className="terminal-dot" style={{ background: '#FEBC2E' }} />
                        <div className="terminal-dot" style={{ background: '#28C840' }} />
                        <span style={{
                            marginLeft: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#4A5568',
                        }}>
                            om@portfolio:~
                        </span>
                    </div>

                    <div ref={bodyRef} className="terminal-body">
                        {lines.map((line, i) => (
                            <div key={i} className="terminal-output" style={{ marginBottom: 2 }}>
                                {line.type === 'input' && (
                                    <span>
                                        <span className="terminal-prompt">om@portfolio:~$</span>
                                        {' '}
                                        <span style={{ color: '#F0F6FF' }}>{line.content}</span>
                                    </span>
                                )}
                                {line.type !== 'input' && (
                                    <div
                                        style={{ paddingLeft: 0, whiteSpace: 'pre-wrap' }}
                                        dangerouslySetInnerHTML={{ __html: line.content }}
                                    />
                                )}
                            </div>
                        ))}

                        {/* Typing animation */}
                        {typing !== null && (
                            <div className="terminal-output" style={{ whiteSpace: 'pre-wrap' }}
                                dangerouslySetInnerHTML={{ __html: typing }} />
                        )}

                        {/* Input line */}
                        {typing === null && (
                            <div className="terminal-input-line" style={{ marginTop: 4 }}>
                                <span className="terminal-prompt">om@portfolio:~$</span>
                                <input
                                    ref={inputRef}
                                    className="terminal-input"
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleKey}
                                    autoFocus={inView}
                                    autoComplete="off"
                                    spellCheck={false}
                                    aria-label="Terminal input"
                                />
                                <span className="cursor-blink" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
