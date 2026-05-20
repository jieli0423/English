import { useState } from 'react'

const tabs = [
  { key: 'grammar', label: '语法问题', icon: '⚠️' },
  { key: 'improve', label: '高级替换', icon: '✨' },
  { key: 'revised', label: '修改范文', icon: '📝' },
]

export default function WritingFeedback({ result }) {
  const [activeTab, setActiveTab] = useState('grammar')

  const scorePercent = (result.score / result.totalScore) * 100

  return (
    <div className="animate-slide-up">
      {/* Score Card */}
      <div className="card p-6 mb-4 text-center bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0 shadow-lg shadow-indigo-600/20">
        <p className="text-sm text-indigo-200 mb-2 font-medium">AI 评分</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold tracking-tight">{result.score}</span>
          <span className="text-xl text-indigo-200">/ {result.totalScore}</span>
        </div>
        <div className="w-full bg-indigo-500/30 rounded-full h-2.5 mt-4 overflow-hidden">
          <div
            className="h-full rounded-full bg-white/80 transition-all duration-1000"
            style={{ width: `${scorePercent}%` }}
          />
        </div>
        <div className="flex items-center justify-center gap-4 mt-3">
          <span className="text-sm text-indigo-200">
            等级：<span className="font-semibold text-white">{result.level}</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="card overflow-hidden">
        <div className="flex border-b border-slate-100 bg-slate-50/50">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`
                flex-1 py-3.5 text-sm font-medium transition-all duration-200 relative
                ${activeTab === tab.key ? 'text-indigo-600 bg-white' : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'}
                active:scale-[0.97]
              `}
            >
              <span className="mr-1.5">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Grammar Issues */}
          {activeTab === 'grammar' && (
            <div className="space-y-3 animate-fade-in">
              {result.grammarIssues.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">🎉 暂无语法问题，语法使用很正确！</p>
              ) : (
                result.grammarIssues.map((issue, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        issue.severity === 'major' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {issue.type}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        issue.severity === 'major' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {issue.severity === 'major' ? '严重' : '轻微'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">
                      <span className="line-through text-red-500">{issue.original}</span>
                    </p>
                    <p className="text-sm text-emerald-600 mt-1 flex items-start gap-1">
                      <span className="mt-0.5">→</span>
                      <span>{issue.suggestion}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Advanced Replacements */}
          {activeTab === 'improve' && (
            <div className="space-y-3 animate-fade-in">
              {result.improvements.map((imp, i) => (
                <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-violet-50 to-violet-50/50 border border-violet-100">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">
                      高级替换 #{i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mb-1.5">
                    <span className="line-through text-red-400">{imp.original}</span>
                  </p>
                  <p className="text-sm text-emerald-700 font-medium flex items-start gap-1">
                    <span>→</span>
                    <span>{imp.advanced}</span>
                  </p>
                  <p className="text-xs text-violet-500 mt-2 flex items-center gap-1">
                    <span>💡</span>
                    <span>{imp.note}</span>
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Revised Essay */}
          {activeTab === 'revised' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  修改后范文
                </span>
                <span className="text-xs text-slate-400">基于原文润色优化</span>
              </div>
              <div className="p-5 rounded-xl bg-emerald-50/80 border border-emerald-100">
                <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                  {result.revisedEssay}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
