export default function StatCard({ icon, label, value, unit, bgColor, trend }) {
  return (
    <div className="card p-5 group hover:shadow-lg transition-all duration-300 cursor-default">
      <div className="flex items-start justify-between mb-3">
        <span className={`w-10 h-10 rounded-lg ${bgColor || 'bg-indigo-50'} flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
          {icon}
        </span>
        {trend !== undefined && (
          <span className={`text-xs font-medium flex items-center gap-0.5 ${trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
            <svg className={`w-3 h-3 ${trend >= 0 ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {unit && <span className="text-sm text-slate-400">{unit}</span>}
      </div>
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  )
}
