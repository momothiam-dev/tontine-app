import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { emailTemplates } from '@/lib/email-templates'

export async function POST(request) {
  try {
    const { email, nom } = await request.json()
    if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 })

    const template = emailTemplates.welcome(nom || '')
    const result = await sendEmail({ to: email, ...template })

    if (!result.success) {
      console.error('sendEmail failed', result.error)
      return NextResponse.json({ error: 'Email sending failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('send-welcome error', err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
