// lib/email-templates.js
// Export des templates d'emails (safe pour les Client et Server Components)

export const emailTemplates = {
  // Email de bienvenue
  welcome: (nom) => ({
    subject: '🎉 Bienvenue sur TontineApp !',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #16a34a; margin: 0; font-size: 32px;">🎯 TontineApp</h1>
          </div>
          
          <h2 style="color: #16a34a; margin-bottom: 20px;">Bienvenue ${nom} !</h2>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Merci de t'être inscrit sur TontineApp. Nous sommes ravis de t'accueillir !
          </p>
          
          <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0; font-weight: bold; color: #15803d;">Tu peux maintenant :</p>
            <ul style="margin: 0; padding-left: 20px; color: #374151;">
              <li style="margin-bottom: 8px;">Créer ta première tontine</li>
              <li style="margin-bottom: 8px;">Inviter tes amis et ta famille</li>
              <li style="margin-bottom: 8px;">Gérer tes paiements en toute transparence</li>
              <li>Suivre l'historique de toutes tes transactions</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" 
               style="display: inline-block; background-color: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Accéder à mon dashboard
            </a>
          </div>
          
          <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 40px;">
            TontineApp - Gérez vos tontines simplement
          </p>
        </div>
      </body>
      </html>
    `
  }),

  // Invitation à rejoindre une tontine
  invitation: (nomTontine, montant, periodicite, lienInvitation) => ({
    subject: `📨 Tu es invité(e) à rejoindre "${nomTontine}"`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px 20px;">
          <h1 style="color: #16a34a; margin-bottom: 20px; font-size: 28px;">📨 Invitation Tontine</h1>
          
          <p style="color: #374151; line-height: 1.6; font-size: 16px;">
            Tu as été invité(e) à rejoindre une tontine :
          </p>
          
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border: 2px solid #16a34a;">
            <h2 style="margin: 0 0 16px 0; color: #15803d; font-size: 24px;">${nomTontine}</h2>
            <div style="background-color: white; padding: 16px; border-radius: 8px;">
              <p style="margin: 8px 0; color: #374151; font-size: 16px;">
                💰 <strong>Cotisation :</strong> ${montant.toLocaleString()} FCFA
              </p>
              <p style="margin: 8px 0; color: #374151; font-size: 16px;">
                📅 <strong>Périodicité :</strong> ${periodicite}
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${lienInvitation}" 
               style="display: inline-block; background-color: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Rejoindre la tontine
            </a>
          </div>
          
          <p style="color: #9ca3af; font-size: 14px; margin-top: 20px;">
            Lien direct : <a href="${lienInvitation}" style="color: #16a34a; text-decoration: none;">${lienInvitation}</a>
          </p>
        </div>
      </body>
      </html>
    `
  }),

  // C'est ton tour de recevoir
  tonTour: (nomTontine, montantTotal, dateTour) => ({
    subject: `🎉 C'est ton tour ! ${nomTontine}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px 20px;">
          <h1 style="color: #16a34a; margin-bottom: 20px; font-size: 28px;">🎉 C'est ton tour !</h1>
          
          <p style="color: #374151; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
            Félicitations ! C'est maintenant ton tour de recevoir les fonds de la tontine <strong>${nomTontine}</strong>.
          </p>
          
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border: 2px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 18px; font-weight: bold;">
              Montant total : <span style="font-size: 24px; color: #d97706;">${montantTotal.toLocaleString()} FCFA</span>
            </p>
            <p style="margin: 12px 0 0 0; color: #b45309; font-size: 16px;">
              📅 Date : ${new Date(dateTour).toLocaleDateString('fr-FR')}
            </p>
          </div>
          
          <p style="color: #374151; line-height: 1.6; font-size: 16px;">
            Les autres membres ont finalisé leurs paiements. Tu peux maintenant consulter les détails dans ton dashboard.
          </p>
        </div>
      </body>
      </html>
    `
  }),

  // Paiement validé
  paiementValide: (nomTontine, montant, periode) => ({
    subject: `✅ Paiement validé - ${nomTontine}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px 20px;">
          <h1 style="color: #16a34a; margin-bottom: 20px; font-size: 28px;">✅ Paiement validé</h1>
          
          <p style="color: #374151; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
            Ton paiement pour la tontine <strong>${nomTontine}</strong> a été validé avec succès.
          </p>
          
          <div style="background-color: #f0fdf4; border-left: 4px solid #16a34a; padding: 20px; margin: 20px 0;">
            <p style="margin: 8px 0; color: #374151;">
              💰 <strong>Montant :</strong> ${montant.toLocaleString()} FCFA
            </p>
            <p style="margin: 8px 0; color: #374151;">
              📅 <strong>Période :</strong> ${periode}
            </p>
          </div>
          
          <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 40px;">
            Merci de ta participation !
          </p>
        </div>
      </body>
      </html>
    `
  }),

  // Rappel de paiement
  rappelPaiement: (nomTontine, montant, dateLimite, joursRestants) => ({
    subject: `⏰ Rappel : Paiement avant le ${dateLimite} - ${nomTontine}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
        <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px 20px;">
          <h1 style="color: #ea580c; margin-bottom: 20px; font-size: 28px;">⏰ Rappel de paiement</h1>
          
          <p style="color: #374151; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
            Tu n'as pas encore effectué ton paiement pour la tontine <strong>${nomTontine}</strong>.
          </p>
          
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 24px; border-radius: 12px; margin: 24px 0; border: 2px solid #f59e0b;">
            <p style="margin: 8px 0; color: #92400e; font-size: 16px;">
              💰 <strong>Montant à payer :</strong> <span style="font-size: 20px; color: #d97706;">${montant.toLocaleString()} FCFA</span>
            </p>
            <p style="margin: 12px 0 0 0; color: #b45309; font-size: 16px;">
              📅 <strong>Limite :</strong> ${dateLimite}
            </p>
            <p style="margin: 8px 0 0 0; color: #b45309; font-size: 16px;">
              ⏳ <strong>Temps restant :</strong> ${joursRestants} jours
            </p>
          </div>
          
          <p style="color: #374151; line-height: 1.6; font-size: 16px;">
            Veuillez effectuer votre paiement dès que possible pour éviter tout désagrément. Les autres membres comptent sur toi !
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard" 
               style="display: inline-block; background-color: #ea580c; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Effectuer le paiement
            </a>
          </div>
          
          <p style="color: #9ca3af; font-size: 14px; text-align: center; margin-top: 40px;">
            TontineApp - Gérez vos tontines simplement
          </p>
        </div>
      </body>
      </html>
    `
  }),
}
