import { useMemo, useState } from 'react'
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

export default function DataTable({
  columns,
  data,
  pageSize = 20,
  searchPlaceholder = 'Buscar...',
  getSearchText,
  rowKey = (row) => row.id,
  emptyMessage = 'No se encontraron resultados.',
  noun = 'resultados',
}) {
  const [query, setQuery] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (!query.trim()) return data
    const q = query.toLowerCase()
    return data.filter((row) => (getSearchText ? getSearchText(row) : '').toLowerCase().includes(q))
  }, [data, query, getSearchText])

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    const col = columns.find((c) => c.key === sortKey)
    if (!col) return filtered
    const getValue = col.sortValue || col.accessor
    return [...filtered].sort((a, b) => {
      const va = getValue(a)
      const vb = getValue(b)
      if (typeof va === 'number' && typeof vb === 'number') return sortDir === 'asc' ? va - vb : vb - va
      return sortDir === 'asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va))
    })
  }, [filtered, sortKey, sortDir, columns])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageRows = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handleSort = (col) => {
    if (!col.sortable) return
    if (sortKey === col.key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(col.key)
      setSortDir('asc')
    }
    setPage(1)
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-ink-soft absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-ink/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-electric/30"
          />
        </div>
        <p className="text-sm text-ink-soft">
          Mostrando {pageRows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}-
          {Math.min(currentPage * pageSize, sorted.length)} de {sorted.length} {noun}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-ink/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-ink/10">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col)}
                    className={`text-left px-4 py-3 font-semibold text-ink-soft whitespace-nowrap ${col.sortable ? 'cursor-pointer hover:text-ink' : ''}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.label}
                      {col.sortable && sortKey === col.key && (sortDir === 'asc' ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-10 text-ink-soft">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                pageRows.map((row) => (
                  <tr key={rowKey(row)} className="border-b border-ink/5 hover:bg-slate-50/80 transition-colors">
                    {columns.map((col) => (
                      <td key={col.key} className="px-4 py-3 align-middle whitespace-nowrap">
                        {col.render ? col.render(row) : col.accessor(row)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-ink/10 text-ink-soft hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-ink-soft">Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-ink/10 text-ink-soft hover:bg-slate-50 disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
