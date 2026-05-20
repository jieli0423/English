const categoryColors = {
  '词汇': 'bg-indigo-100 text-indigo-700',
  '语法': 'bg-violet-100 text-violet-700',
  '阅读': 'bg-emerald-100 text-emerald-700',
  '写作': 'bg-amber-100 text-amber-700',
  '综合': 'bg-rose-100 text-rose-700',
  '翻译': 'bg-cyan-100 text-cyan-700',
}

export default function TaskCard({ task, onToggle }) {
  const handleClick = () => {
    if (onToggle) onToggle(task.id)
  }

  return (
    <label
      onClick={handleClick}
      className={`
        flex items-center gap-3 p-3 rounded-xl cursor-pointer
        transition-all duration-200 select-none
        ${task.completed
          ? 'bg-emerald-50/80 border border-emerald-100'
          : 'bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30'
        }
      `}
    >
      <div className={`
        w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0
        transition-all duration-200
        ${task.completed
          ? 'bg-emerald-500 border-emerald-500'
          : 'border-slate-300'
        }
      `}>
        {task.completed && (
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
          {task.title}
        </p>
      </div>
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${categoryColors[task.category] || 'bg-slate-100 text-slate-600'}`}>
        {task.category}
      </span>
    </label>
  )
}
