import { mockAthletes } from './mockAthletes'

export const defaultUser = mockAthletes[0] // Tomas Rivera

export const defaultProfileChecklist = [
  { label: 'Transcripción académica', done: true },
  { label: 'Video destacado', done: true },
  { label: 'Referencias de entrenadores', done: true },
  { label: 'Sobre mí', done: true },
  { label: 'Preferencias universitarias', done: true },
  { label: 'Escuela secundaria / Equipo club', done: true },
  { label: 'Foto de perfil', done: false },
  { label: 'Estatura y peso', done: true },
  { label: 'Información de contacto', done: true },
  { label: 'GPA', done: true },
  { label: 'Estadísticas de voleibol', done: true },
  { label: 'Nombre de escuela', done: true },
  { label: 'Posición primaria', done: true },
  { label: 'ACT/SAT', done: false },
]

export const coachActivityStats = [
  { label: 'Búsquedas', value: 233, trendPct: 12, bars: [40, 65, 50, 80, 60, 90, 70] },
  { label: 'Vistas', value: 12, trendPct: 8, bars: [2, 4, 1, 5, 3, 6, 4] },
  { label: 'Seguimientos', value: 3, trendPct: -5, bars: [0, 1, 0, 1, 1, 2, 1] },
]

export const recommendedColleges = [
  { collegeId: 'upr-rio-piedras', region: 'pr', badge: 'Recomendado', progress: ['Perfil visto', 'Añadido a lista', 'Mensaje enviado'] },
  { collegeId: 'inter-san-german', region: 'pr', badge: 'Similar a Ti', progress: ['Perfil visto', 'Añadido a lista'] },
  { collegeId: 'pucpr', region: 'pr', badge: 'Recomendado', progress: ['Perfil visto'] },
  { collegeId: 'sagrado', region: 'pr', badge: 'Similar a Ti', progress: ['Perfil visto', 'Mensaje enviado'] },
  { collegeId: 'upr-mayaguez', region: 'pr', badge: 'Recomendado', progress: ['Perfil visto'] },
  { collegeId: 'turabo', region: 'pr', badge: 'Similar a Ti', progress: [] },
  { collegeId: 'florida', region: 'us', badge: 'Reach', progress: ['Perfil visto'] },
  { collegeId: 'penn-state', region: 'us', badge: 'Reach', progress: [] },
  { collegeId: 'ucla', region: 'us', badge: 'Reach', progress: [] },
]

export const activityFeed = [
  { id: 1, text: 'Un entrenador de UPR Río Piedras vio tu perfil', time: 'hace 2 horas' },
  { id: 2, text: 'Inter American University te añadió a su lista', time: 'hace 1 día' },
  { id: 3, text: 'Nuevo mensaje de entrenador de Sagrado Corazón', time: 'hace 2 días' },
  { id: 4, text: 'Tu video highlight fue visto 8 veces esta semana', time: 'hace 3 días' },
  { id: 5, text: 'PUCPR vio tus estadísticas de voleibol', time: 'hace 4 días' },
]

export const recruitingCoach = {
  name: 'Raul Papaleo Pérez',
  from: 'San Juan, PR',
  livesIn: 'Carolina, PR',
  height: "6'1\"",
  college: 'Indiana-Purdue at Fort Wayne (IPFW)',
  career: [
    'Atletas Olímpicos — Atenas 2004 (Equipo Puerto Rico 🇵🇷)',
    'Campeón NORCECA (1er lugar)',
    'Juegos Panamericanos: 3er lugar',
    'Rookie del Año AVP 1996',
    'Ganancias de carrera: $123,806',
    'Mejor resultado AVP: 5to lugar (4 veces)',
    'Compitió de 1994 a 2008',
  ],
  bio:
    'Hola, soy Raul Papaleo Pérez. Jugué voleibol de playa profesionalmente por más de una década — compitiendo en el Tour AVP, el Tour Mundial FIVB, y representando a Puerto Rico en los Juegos Olímpicos de Atenas 2004. Fui campeón NORCECA y Rookie del Año en el AVP en 1996. Hoy mi misión es usar toda esa experiencia para ayudar a los atletas boricuas a conseguir sus becas universitarias y llevar el talento de Puerto Rico al próximo nivel.',
  phone: '(787) 555-0100',
  email: 'raul@volleyrecruitpr.com',
}

export const resources = [
  { title: 'Guía de Reclutamiento LAI', time: '3 min' },
  { title: 'Guía de Voleibol NCAA II', time: '5 min' },
  { title: 'Calendarios de Reclutamiento', time: '4 min' },
  { title: 'Becas NAIA para Puerto Rico', time: '6 min' },
  { title: 'Cómo hacer tu video highlight', time: '8 min' },
]
