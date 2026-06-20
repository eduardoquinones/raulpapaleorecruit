// Admin-only metadata layered on top of mockAthletes.js — registration/activity
// tracking and profile completion are platform-management concerns, not part of
// the athlete's own editable profile data.
export const adminAthleteMeta = {
  '1': { registeredAt: '2025-08-12', lastActive: '2026-06-18', completionPct: 95, viewedBy: ['upr-rio-piedras', 'sagrado', 'inter-san-german'], savedUniversitiesCount: 2 },
  '2': { registeredAt: '2025-09-02', lastActive: '2026-06-15', completionPct: 70, viewedBy: ['sagrado'], savedUniversitiesCount: 1 },
  '3': { registeredAt: '2025-08-20', lastActive: '2026-06-17', completionPct: 88, viewedBy: ['upr-mayaguez', 'turabo'], savedUniversitiesCount: 3 },
  '4': { registeredAt: '2025-07-30', lastActive: '2026-06-16', completionPct: 100, viewedBy: ['upr-rio-piedras', 'florida', 'penn-state'], savedUniversitiesCount: 5 },
  '5': { registeredAt: '2025-10-05', lastActive: '2026-06-10', completionPct: 55, viewedBy: [], savedUniversitiesCount: 0 },
  '6': { registeredAt: '2025-09-18', lastActive: '2026-06-14', completionPct: 75, viewedBy: ['sagrado'], savedUniversitiesCount: 2 },
  '7': { registeredAt: '2025-11-01', lastActive: '2026-06-12', completionPct: 40, viewedBy: [], savedUniversitiesCount: 0 },
  '8': { registeredAt: '2025-08-25', lastActive: '2026-06-18', completionPct: 92, viewedBy: ['upr-rio-piedras', 'florida'], savedUniversitiesCount: 4 },
  '9': { registeredAt: '2025-10-14', lastActive: '2026-06-09', completionPct: 60, viewedBy: ['inter-san-german'], savedUniversitiesCount: 1 },
  '10': { registeredAt: '2025-09-29', lastActive: '2026-06-13', completionPct: 78, viewedBy: ['upr-mayaguez'], savedUniversitiesCount: 2 },
  '11': { registeredAt: '2025-12-03', lastActive: '2026-05-28', completionPct: 35, viewedBy: [], savedUniversitiesCount: 0 },
  '12': { registeredAt: '2026-06-15', lastActive: '2026-06-17', completionPct: 50, viewedBy: ['sagrado'], savedUniversitiesCount: 1 },
  '13': { registeredAt: '2025-09-09', lastActive: '2026-06-11', completionPct: 85, viewedBy: ['upr-rio-piedras', 'turabo'], savedUniversitiesCount: 3 },
  '14': { registeredAt: '2026-06-13', lastActive: '2026-06-05', completionPct: 45, viewedBy: [], savedUniversitiesCount: 0 },
  '15': { registeredAt: '2025-08-08', lastActive: '2026-06-16', completionPct: 80, viewedBy: ['inter-san-german', 'sagrado'], savedUniversitiesCount: 2 },
}

export const getAdminAthleteMeta = (id) =>
  adminAthleteMeta[id] || { registeredAt: '2025-08-01', lastActive: '2026-06-01', completionPct: 50, viewedBy: [], savedUniversitiesCount: 0 }
