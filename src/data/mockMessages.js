export const athleteThreads = [
  {
    id: 1,
    from: 'Coach José Méndez',
    school: 'UPR Río Piedras',
    online: true,
    unread: true,
    messages: [
      { from: 'coach', text: 'Hola Tomas, vimos tu video más reciente y nos encantó tu técnica de saque.', time: '10:02 AM' },
      { from: 'coach', text: 'Nos encantaría verte en nuestro próximo showcase el mes que viene.', time: '10:03 AM' },
      { from: 'me', text: '¡Hola Coach! Muchas gracias, claro que estoy interesado.', time: '10:15 AM' },
    ],
  },
  {
    id: 2,
    from: 'Coach Ana Pérez',
    school: 'Inter San Germán',
    online: true,
    unread: true,
    messages: [
      { from: 'coach', text: '¿Podrías enviarnos tu video más reciente de la temporada?', time: 'Ayer' },
    ],
  },
  {
    id: 3,
    from: 'Coach Carmen Ríos',
    school: 'Sagrado Corazón',
    online: false,
    unread: false,
    messages: [
      { from: 'coach', text: 'Gracias por tu interés en nuestro programa.', time: 'Hace 3 días' },
      { from: 'me', text: 'Gracias a ustedes, espero su respuesta.', time: 'Hace 3 días' },
    ],
  },
]

export const coachThreads = [
  {
    id: 1,
    from: 'Tomas Rivera',
    school: 'Perpetuo Socorro',
    online: true,
    unread: true,
    messages: [
      { from: 'athlete', text: 'Gracias por contactarme, aquí está mi video más reciente.', time: 'Hace 1 hora' },
    ],
  },
  {
    id: 2,
    from: 'Daniela Cruz',
    school: 'Academia María Reina',
    online: true,
    unread: true,
    messages: [
      { from: 'athlete', text: '¿Tienen becas disponibles para el 2026?', time: 'Hace 6 horas' },
    ],
  },
  {
    id: 3,
    from: 'Miguel Santos',
    school: 'Notre Dame',
    online: false,
    unread: false,
    messages: [
      { from: 'athlete', text: 'Estaré disponible para una llamada esta semana.', time: 'Hace 2 días' },
    ],
  },
]
