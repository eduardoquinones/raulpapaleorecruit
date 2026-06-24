import { useState } from 'react'
import { collegeGradientStyle } from '../utils/collegeGradient'

export default function CollegeLogo({ college, size = 48, className = '' }) {
  const [errored, setErrored] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const showImg = Boolean(college.logoUrl) && !errored

  return (
    <div className={`relative shrink-0 rounded-full ${className}`} style={{ width: size, height: size }}>
      {showImg && !loaded && (
        <div className="absolute inset-0 rounded-full bg-ink/10 animate-pulse" />
      )}
      {showImg && (
        <img
          src={college.logoUrl}
          alt={college.name}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 w-full h-full rounded-full object-contain bg-white border border-ink/10 shadow-sm transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ padding: size * 0.08 }}
        />
      )}
      {!showImg && (
        <div
          className="absolute inset-0 rounded-full flex items-center justify-center text-white font-bold shadow-md"
          style={{ ...collegeGradientStyle(college), fontSize: size * 0.3 }}
        >
          {college.initials}
        </div>
      )}
    </div>
  )
}
