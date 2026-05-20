import { useState } from 'react'

const tabs = [
  { key: 'grammar', label: '语法问题', icon: '⚠️' },
  { key: 'improve', label: '高级替换', icon: '✨' },
  { key: 'revised', label: '修改范文', icon: '📝' },
]

export default function WritingFeedback({ result, onRegenerate, onCopy }) {
  const [activeTab, setActiveTab] = useState('grammar')
  const [copyText, setCopyText] = useState('复制结果')

  const scorePercent = (result.score / result.totalScore) * 100

  const handleCopy = () => {
    if (onCopy) {
      onCopy(result)
      return
    }
    const text = [
      `AI 评分：${result.score}/${result.totalScore}（${result.level}）`,
      '',
      '== 语法问题 ==',
      ...result.grammarIssues.map((g) => `[${g.severity === 'major' ? '严重' : '轻微'}] ${g.type}: ${g.original} → ${g.suggestion}`),
      '',
      '== 高级替换 ==',
      ...result.improvements.map((imp) => `${imp.original} → ${imp.advanced}（${imp.note}）`),
      '',
      '== 修改后范文 ==',
      result.revisedEssay,
    ].join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopyText('已复制!')
      setTimeout(() => setCopyText('复制结果'), 2000)
    })
  }

  return (
    <div className="animate-slide-up space-y-4">
      {/* AI 助手提示条 */}
      <div className="card p-4 bg-gradient-to-r from-indigo-50 to-indigo-100/30 border border-indigo-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm">
          AI
        </div>
        <p className="text-sm text-indigo-700 leading-relaxed">
          <span className="font-semibold">AI 批改完成</span> — 已为你检测语法错误并提供高级表达替换。点击下方"复制结果"可保存完整批改报告。
        </p>
      </div>

      {/* Score Card */}
      <div className="card p-6 text-center bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0 shadow-lg shadow-indigo-600/20">
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

      {/* 整体建议 */}
      {result.overallAdvice && (
        <div className="card p-5 sm:p-6 border-l-4 border-l-indigo-500">
          <h3 className="text-sm font-semibold text-indigo-700 mb-2 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            整体建议
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">{result.overallAdvice}</p>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex items-center gap-3 pt-1">
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="btn-secondary flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            重新生成
          </button>
        )}
        <button
          onClick={handleCopy}
          className="btn-secondary flex items-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copyText}
        </button>
      </div>
    </div>
  )
}