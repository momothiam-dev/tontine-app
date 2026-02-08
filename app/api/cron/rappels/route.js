// app/api/cron/rappels/route.js
import { createClient } from '@supabase/supabase-js'
import { sendEmail, emailTemplates } from '@/lib/resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Clé admin (à ajouter dans .env)
)

export async function GET(request) {
  try {
    // Vérifier le token de sécurité
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const today = new Date()
    const dans3jours = new Date(today)
    dans3jours.setDate(today.getDate() + 3)

    // Récupérer les tours en cours avec échéance proche
    const { data: tours } = await supabase
      .from('tours')
      .select(`
        *,
        tontine:tontine_id (nom, montant),
        membres:tontine_id (
          user_id,
          profile:user_id (email, nom)
        )
      `)
      .eq('statut', 'en_cours')
      .or(`date_limite.eq.${today.toISOString().split('T')[0]},date_limite.eq.${dans3jours.toISOString().split('T')[0]}`)

    // Envoyer les rappels
    for (const tour of tours || []) {
      // Récupérer les membres qui n'ont pas payé
      const { data: paiements } = await supabase
        .from('paiements')
        .select('user_id')
        .eq('tour_id', tour.id)
        .eq('valide', true)

      const usersPaids = paiements.map(p => p.user_id)
      const membresNonPayes = tour.membres.filter(m => !usersPaids.includes(m.user_id))

      // Envoyer email à chaque membre non payé
      for (const membre of membresNonPayes) {
        const joursRestants = Math.ceil((new Date(tour.date_limite) - today) / (1000 * 60 * 60 * 24))
        
        const template = emailTemplates.rappelPaiement(
          tour.tontine.nom,
          tour.tontine.montant,
          new Date(tour.date_limite).toLocaleDateString('fr-FR'),
          joursRestants
        )

        await sendEmail({
          to: membre.profile.email,
          ...template
        })
      }
    }

    return Response.json({ success: true, message: `${tours?.length || 0} tours traités` })
  } catch (error) {
    console.error('Erreur cron:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}