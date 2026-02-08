'use server'

import nodemailer from 'nodemailer'
import { emailTemplates } from '@/lib/email-templates'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendWelcomeEmail(email, nom) {
  try {
    const template = emailTemplates.welcome(nom)
    const info = await transporter.sendMail({
      from: `"TontineApp" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: template.subject,
      html: template.html,
    })

    console.log('Email envoyé:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return { success: false, error: error.message }
  }
}
