export default function PageHeader({ icon, title, subtitle, actions }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h1>
          {subtitle && <p className="text-slate-500 text-sm mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  )
}
