import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/email'
import emailTemplates from '@/lib/email-templates'

// Désactiver la pré-génération statique pour cette route API
export const dynamic = 'force-dynamic'

function getSupabaseClient() {
  // Sécurité : Vérifier la présence des variables avant d'instancier
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Variables Supabase manquantes");
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

export async function GET(request) {
  try {
    // 1. Vérifier le token de sécurité immédiatement
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Créer le client Supabase
    const supabase = getSupabaseClient()
    
    const today = new Date()
    const dans3jours = new Date(today)
    dans3jours.setDate(today.getDate() + 3)

    // Récupérer les tours en cours avec échéance proche
    const { data: tours, error: toursError } = await supabase
      .from('tours')
      .select(`
        id,
        tontine_id,
        date_limite,
        tontines!inner (
          id,
          nom,
          montant
        )
      `)
      .eq('statut', 'en_cours')
      .or(`date_limite.eq.${today.toISOString().split('T')[0]},date_limite.eq.${dans3jours.toISOString().split('T')[0]}`)

    if (toursError) throw toursError

    let emailsSent = 0

    // Pour chaque tour, envoyer les rappels
    for (const tour of tours || []) {
      const { data: membres } = await supabase
        .from('membres_tontine')
        .select(`
          user_id,
          profile:user_id (
            email,
            nom
          )
        `)
        .eq('tontine_id', tour.tontine_id)

      const { data: paiements } = await supabase
        .from('paiements')
        .select('user_id')
        .eq('tour_id', tour.id)
        .eq('valide', true)

      const usersPaids = paiements?.map(p => p.user_id) || []
      const membresNonPayes = membres?.filter(m => !usersPaids.includes(m.user_id)) || []

      for (const membre of membresNonPayes) {
        if (!membre.profile?.email) continue

        const joursRestants = Math.ceil((new Date(tour.date_limite) - today) / (1000 * 60 * 60 * 24))
        
        // --- SÉCURITÉ ANTI-CRASH BUILD ---
        // On vérifie que le template existe avant de l'appeler
        if (typeof emailTemplates?.rappelPaiement !== 'function') {
           console.error("Template 'rappelPaiement' introuvable.");
           continue; 
        }

        const template = emailTemplates.rappelPaiement(
          tour.tontines.nom,
          tour.tontines.montant,
          new Date(tour.date_limite).toLocaleDateString('fr-FR'),
          joursRestants
        )

        // Vérification de la fonction d'envoi
        if (typeof sendEmail === 'function') {
          await sendEmail({
            to: membre.profile.email,
            ...template
          })
          emailsSent++
        }
      }
    }

    return Response.json({ 
      success: true, 
      message: `${tours?.length || 0} tours traités, ${emailsSent} emails envoyés` 
    })
  } catch (error) {
    console.error('Erreur cron:', error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
