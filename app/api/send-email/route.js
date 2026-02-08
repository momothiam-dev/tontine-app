import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'
import { emailTemplates } from '@/lib/email-templates'

export async function POST(request) {
  try {
    const { type, to, payload } = await request.json()

    if (!type || !to) {
      return NextResponse.json({ error: 'Missing type or to' }, { status: 400 })
    }

    let template
    switch (type) {
      case 'invitation':
        template = emailTemplates.invitation(
          payload.nomTontine,
          payload.montant,
          payload.periodicite,
          payload.lienInvitation
        )
        break
      case 'tonTour':
        template = emailTemplates.tonTour(
          payload.nomTontine,
          payload.montantTotal,
          payload.dateTour
        )
        break
      case 'paiementValide':
        template = emailTemplates.paiementValide(
          payload.nomTontine,
          payload.montant
        )
        break
      case 'welcome':
        template = emailTemplates.welcome(payload.nom)
        break
      default:
        return NextResponse.json({ error: 'Unknown template type' }, { status: 400 })
    }

    const result = await sendEmail({ to, ...template })
    if (!result.success) {
      console.error('sendEmail failed', result.error)
      return NextResponse.json({ error: 'Email sending failed' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('send-email route error', err)
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 })
  }
}
