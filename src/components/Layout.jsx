import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={!sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile header */}
      <div className="sticky top-0 z-10 lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="打开菜单"
        >
          <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="font-semibold text-sm text-slate-800">考研英语 AI 提分训练平台</span>
      </div>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
