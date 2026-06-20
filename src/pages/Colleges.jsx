import { useEffect, useMemo, useState } from 'react'
import CollegeCard from '../components/CollegeCard'
import CollegeDetailModal from '../components/CollegeDetailModal'
import { SkeletonGrid } from '../components/ui/Skeleton'
import { useAdminData } from '../context/AdminDataContext'

const regionFilters = ['Todas', 'Puerto Rico', 'Estados Unidos']
const divisionFilters = ['Todas', 'NCAA I', 'NCAA II', 'LAI', 'NAIA']

export default function Colleges() {
  const { universities } = useAdminData()
  const [region, setRegion] = useState('Todas')
  const [division, setDivision] = useState('Todas')
  const [loading, setLoading] = useState(true)
  const [detailCollege, setDetailCollege] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    return universities.filter((c) => {
      if (!c.active) return false
      if (region === 'Puerto Rico' && c.region !== 'PR') return false
      if (region === 'Estados Unidos' && c.region !== 'US') return false
      if (division !== 'Todas' && !c.division.includes(division)) return false
      return true
    })
  }, [universities, region, division])

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => (a.region === b.region ? 0 : a.region === 'PR' ? -1 : 1)),
    [filtered]
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-heading font-extrabold text-ink mb-2">Universidades</h1>
      <p className="text-ink-soft mb-8">Explora programas de voleibol en Puerto Rico y Estados Unidos.</p>

      <div className="flex flex-wrap gap-3 mb-8">
        <div className="flex gap-1.5 glass rounded-pill p-1.5">
          {regionFilters.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`px-3 py-1.5 rounded-pill text-sm font-medium transition-colors ${
                region === r ? 'bg-deep text-white' : 'text-ink-soft hover:bg-ink/5'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-1.5 glass rounded-pill p-1.5">
          {divisionFilters.map((d) => (
            <button
              key={d}
              onClick={() => setDivision(d)}
              className={`px-3 py-1.5 rounded-pill text-sm font-medium transition-colors ${
                division === d ? 'bg-electric text-white' : 'text-ink-soft hover:bg-ink/5'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <SkeletonGrid count={8} className="lg:grid-cols-4" />
      ) : (
        <>
          <p className="text-sm text-ink-soft mb-4">{sorted.length} universidades encontradas</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sorted.map((c) => <CollegeCard key={c.id} college={c} onViewMore={setDetailCollege} />)}
          </div>
        </>
      )}

      <CollegeDetailModal college={detailCollege} onClose={() => setDetailCollege(null)} />
    </div>
  )
}
