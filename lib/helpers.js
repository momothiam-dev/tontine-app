// lib/helpers.js
export function calculateTourDates(dateDebut, periodicite, nbMembres) {
  const tours = []
  const startDate = new Date(dateDebut)
  
  for (let i = 0; i < nbMembres; i++) {
    const tourDate = new Date(startDate)
    
    if (periodicite === 'hebdomadaire') {
      tourDate.setDate(startDate.getDate() + (i * 7))
    } else if (periodicite === 'mensuel') {
      tourDate.setMonth(startDate.getMonth() + i)
    }
    
    tours.push({
      numero: i + 1,
      date_limite: tourDate.toISOString().split('T')[0],
    })
  }
  
  return tours
}

export function shuffleArray(array) {
  // Mélanger pour ordre aléatoire
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}