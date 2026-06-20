export const adminConversations = [
  {
    id: 'conv1',
    athleteName: 'Tomas Rivera',
    coachName: 'Coach José Méndez',
    university: 'UPR Río Piedras',
    flagged: false,
    messages: [
      { from: 'coach', text: 'Hola Tomas, vimos tu video más reciente y nos encantó tu técnica de saque.', time: '2026-06-10 10:02 AM' },
      { from: 'coach', text: 'Nos encantaría verte en nuestro próximo showcase el mes que viene.', time: '2026-06-10 10:03 AM' },
      { from: 'athlete', text: '¡Hola Coach! Muchas gracias, claro que estoy interesado.', time: '2026-06-10 10:15 AM' },
    ],
  },
  {
    id: 'conv2',
    athleteName: 'Tomas Rivera',
    coachName: 'Coach Ana Pérez',
    university: 'Inter San Germán',
    flagged: false,
    messages: [
      { from: 'coach', text: '¿Podrías enviarnos tu video más reciente de la temporada?', time: '2026-06-09 4:20 PM' },
    ],
  },
  {
    id: 'conv3',
    athleteName: 'Tomas Rivera',
    coachName: 'Coach Carmen Ríos',
    university: 'Sagrado Corazón',
    flagged: false,
    messages: [
      { from: 'coach', text: 'Gracias por tu interés en nuestro programa.', time: '2026-06-07 1:00 PM' },
      { from: 'athlete', text: 'Gracias a ustedes, espero su respuesta.', time: '2026-06-07 2:30 PM' },
    ],
  },
  {
    id: 'conv4',
    athleteName: 'Daniela Cruz',
    coachName: 'Coach Carmen Ríos',
    university: 'Sagrado Corazón',
    flagged: false,
    messages: [
      { from: 'athlete', text: '¿Tienen becas disponibles para el 2026?', time: '2026-06-12 9:10 AM' },
      { from: 'coach', text: 'Sí, tenemos algunas plazas. Te enviamos los detalles por correo.', time: '2026-06-12 11:45 AM' },
    ],
  },
  {
    id: 'conv5',
    athleteName: 'Miguel Santos',
    coachName: 'Coach Rafael Cruz',
    university: 'UPR Mayagüez',
    flagged: false,
    messages: [
      { from: 'athlete', text: 'Estaré disponible para una llamada esta semana.', time: '2026-06-11 6:00 PM' },
    ],
  },
  {
    id: 'conv6',
    athleteName: 'Valeria Soto',
    coachName: 'Coach José Méndez',
    university: 'UPR Río Piedras',
    flagged: true,
    messages: [
      { from: 'coach', text: '¿Puedes enviarme tu número de teléfono personal y dirección de casa?', time: '2026-06-14 8:05 PM' },
      { from: 'athlete', text: 'Prefiero mantener la comunicación por aquí, gracias.', time: '2026-06-14 8:20 PM' },
    ],
  },
  {
    id: 'conv7',
    athleteName: 'Gabriel Santiago',
    coachName: 'Coach Mariana Soto',
    university: 'Turabo',
    flagged: false,
    messages: [
      { from: 'coach', text: 'Nos gustaría invitarte a una práctica abierta el próximo mes.', time: '2026-06-08 3:30 PM' },
    ],
  },
]

export const getConversationById = (id) => adminConversations.find((c) => c.id === id)
