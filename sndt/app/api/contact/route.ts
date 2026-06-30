import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sndtgujarati24@gmail.com',
        pass: 'scrhowugefbwmpbf'
      }
    })

    await transporter.sendMail({
      from: `"SNDT Website" <sndtgujarati24@gmail.com>`,
      to: 'sndtgujarati24@gmail.com',
      subject: subject || 'New Contact Message',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b><br/>${message}</p>
      `
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}