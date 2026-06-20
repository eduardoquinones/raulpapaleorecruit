const GRADIENTS_BY_INITIALS = {
  UPR: ['#1E40AF', '#3B82F6'],
  IAU: ['#92400E', '#F59E0B'],
  PUC: ['#1E3A5F', '#2B5CE6'],
  USC: ['#134E4A', '#059669'],
  RUM: ['#1E40AF', '#3B82F6'],
  TUR: ['#312E81', '#6366F1'],
}

const GRADIENTS_BY_COLOR = {
  '#2B5CE6': ['#1E40AF', '#3B82F6'],
  '#E8A020': ['#92400E', '#F59E0B'],
  '#0D1B3E': ['#1E3A5F', '#2B5CE6'],
}

export function getCollegeGradient(college) {
  return GRADIENTS_BY_INITIALS[college.initials] || GRADIENTS_BY_COLOR[college.color] || ['#1E40AF', '#3B82F6']
}

export function collegeGradientStyle(college) {
  const [from, to] = getCollegeGradient(college)
  return { backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }
}
