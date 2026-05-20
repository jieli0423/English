import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '首页仪表盘', icon: '🏠' },
  { path: '/vocabulary', label: '单词学习', icon: '📚' },
  { path: '/sentence-analyzer', label: '长难句解析', icon: '🔍' },
  { path: '/reading', label: '阅读训练', icon: '📖' },
  { path: '/writing', label: '作文批改', icon: '✍️' },
]

export default function Sidebar({ collapsed, onClose }) {
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <>
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-30 h-full
          bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950
          text-white transition-all duration-300 ease-in-out
          ${collapsed ? '-translate-x-full' : 'translate-x-0'}
          lg:translate-x-0 lg:w-64 w-64
          flex flex-col shadow-2xl shadow-slate-900/50
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-white/5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold shadow-lg shadow-indigo-500/30">
            K
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight">考研英语</h1>
            <p className="text-xs text-indigo-300/70">AI 提分训练平台</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = isActive(item.path)
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 group relative
                  ${active
                    ? 'bg-indigo-500/15 text-indigo-200'
                    : 'text-indigo-200/50 hover:text-indigo-200 hover:bg-white/[0.04]'
                  }
                `}
              >
                {/* Active accent bar */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50" />
                )}
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400/60" />
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-5 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/[0.04]">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-sm font-bold shadow-inner">
              研
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">研友小明</p>
              <p className="text-xs text-indigo-300/50">距考研还有 36 天</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
