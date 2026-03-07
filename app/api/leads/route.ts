import { NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'

// Use /tmp for Vercel Serverless environment compatibility
const LEADS_FILE = process.env.NODE_ENV === 'production'
    ? '/tmp/leads.json'
    : path.join(process.cwd(), 'data', 'leads.json')

// Ensure directory and file exist
if (!fs.existsSync(path.dirname(LEADS_FILE))) {
    fs.mkdirSync(path.dirname(LEADS_FILE), { recursive: true })
}
if (!fs.existsSync(LEADS_FILE)) {
    fs.writeFileSync(LEADS_FILE, JSON.stringify([]))
}

export async function GET() {
    try {
        const data = fs.readFileSync(LEADS_FILE, 'utf8')
        return NextResponse.json({ leads: JSON.parse(data) })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { source, name, email, service, message } = body

        if (!source || !name || !email) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const data = fs.readFileSync(LEADS_FILE, 'utf8')
        const leads = JSON.parse(data)

        const newLead = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            source,
            name,
            email,
            service: service || 'General Inquiry',
            message: message || '',
        }

        leads.push(newLead)
        fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2))

        return NextResponse.json({ success: true, lead: newLead })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }
}
