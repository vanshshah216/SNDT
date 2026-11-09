import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// In-memory sliding-window rate limit: 5 submissions per IP per 10 minutes.
// Resets whenever the server instance restarts/cold-starts, so it's not a
// substitute for a shared store under heavy serverless scaling, but it stops
// a single visitor (or script) from hammering the Gmail SMTP account, which
// is the actual risk at this traffic size.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const submissionsByIp = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const timestamps = (submissionsByIp.get(ip) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  )

  if (timestamps.length >= RATE_LIMIT_MAX) {
    submissionsByIp.set(ip, timestamps)
    return true
  }

  timestamps.push(now)
  submissionsByIp.set(ip, timestamps)
  return false
}

function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) return forwardedFor.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req)
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 },
      )
    }

    const gmailUser = process.env.GMAIL_USER
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD
    const contactRecipient = process.env.CONTACT_RECIPIENT || gmailUser

    if (!gmailUser || !gmailAppPassword) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables')
      return NextResponse.json(
        { success: false, error: 'Email service is not configured' },
        { status: 503 },
      )
    }

    const { name, email, phone, subject, message } = await req.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 },
      )
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    })

    await transporter.sendMail({
      from: `"SNDT Website" <${gmailUser}>`,
      to: contactRecipient,
      replyTo: email,
      subject: subject || 'New Contact Message',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${escapeHtml(String(name))}</p>
        <p><b>Email:</b> ${escapeHtml(String(email))}</p>
        <p><b>Phone:</b> ${escapeHtml(String(phone || ''))}</p>
        <p><b>Subject:</b> ${escapeHtml(String(subject || ''))}</p>
        <p><b>Message:</b><br/>${escapeHtml(String(message)).replace(/\n/g, '<br/>')}</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
