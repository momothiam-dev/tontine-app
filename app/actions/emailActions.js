'use server'

import { sendEmail } from '@/lib/email'
import { emailTemplates } from '@/lib/email-templates'

export async function sendInvitationEmail(to, nomTontine, montant, periodicite, lienInvitation) {
  try {
    const template = emailTemplates.invitation(nomTontine, montant, periodicite, lienInvitation)
    return await sendEmail({ to, ...template })
  } catch (error) {
    console.error('Erreur envoi email invitation:', error)
    return { success: false, error: error.message }
  }
}

export async function sendTonTourEmail(to, nomTontine, montantTotal, dateTour) {
  try {
    const template = emailTemplates.tonTour(nomTontine, montantTotal, dateTour)
    return await sendEmail({ to, ...template })
  } catch (error) {
    console.error('Erreur envoi email tonTour:', error)
    return { success: false, error: error.message }
  }
}

export async function sendPaiementValideEmail(to, nomTontine, montant) {
  try {
    const template = emailTemplates.paiementValide(nomTontine, montant)
    return await sendEmail({ to, ...template })
  } catch (error) {
    console.error('Erreur envoi email paiement validé:', error)
    return { success: false, error: error.message }
  }
}
