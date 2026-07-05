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

export async function POST(req: Request) {
  try {
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
