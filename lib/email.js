// lib/email.js
import nodemailer from 'nodemailer'

// Configuration Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: `"TontineApp" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      html,
    })

    console.log('Email envoyé:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return { success: false, error }
  }
}
