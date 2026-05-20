export default function ProgressCard({ value, max = 100, label, detail, color = 'indigo', size = 'md', showPercent = true }) {
  const percent = Math.round((value / max) * 100)
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-3.5' }

  const colorMap = {
    indigo: 'from-indigo-500 to-indigo-400',
    emerald: 'from-emerald-500 to-emerald-400',
    amber: 'from-amber-500 to-amber-400',
    red: 'from-red-500 to-red-400',
    violet: 'from-violet-500 to-violet-400',
  }

  return (
    <div>
      {(label || showPercent) && (
        <div className="flex items-center justify-between mb-2">
          {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
          {showPercent && <span className="text-sm font-medium text-slate-500">{percent}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heights[size] || heights.md}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorMap[color] || colorMap.indigo} transition-all duration-1000 ease-out relative`}
          style={{ width: `${percent}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-slow" />
        </div>
      </div>
      {detail && <p className="text-xs text-slate-400 mt-2">{detail}</p>}
    </div>
  )
}
