// app/api/cron/rappels/route.js
import { createClient } from '@supabase/supabase-js'
import { sendEmail, emailTemplates } from '@/lib/email'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
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
      // Récupérer les membres de cette tontine
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

      // Récupérer les paiements validés pour ce tour
      const { data: paiements } = await supabase
        .from('paiements')
        .select('user_id')
        .eq('tour_id', tour.id)
        .eq('valide', true)

      const usersPaids = paiements?.map(p => p.user_id) || []
      const membresNonPayes = membres?.filter(m => !usersPaids.includes(m.user_id)) || []

      // Envoyer email à chaque membre non payé
      for (const membre of membresNonPayes) {
        if (!membre.profile?.email) continue

        const joursRestants = Math.ceil((new Date(tour.date_limite) - today) / (1000 * 60 * 60 * 24))
        
        const template = emailTemplates.rappelPaiement(
          tour.tontines.nom,
          tour.tontines.montant,
          new Date(tour.date_limite).toLocaleDateString('fr-FR'),
          joursRestants
        )

        await sendEmail({
          to: membre.profile.email,
          ...template
        })

        emailsSent++
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
```

---

## 🔑 AJOUTER LA VARIABLE D'ENVIRONNEMENT

Il te manque une variable pour sécuriser le cron.

**Dans Vercel → Settings → Environment Variables, ajoute :**
```
Key:   CRON_SECRET
//Value: ton-secret-aleatoire-super-long-123456789
```

💡 **Génère un secret aléatoire** : Tu peux utiliser n'importe quelle chaîne longue et complexe, par exemple :
```
tontine-cron-secret-2024-abc123xyz789