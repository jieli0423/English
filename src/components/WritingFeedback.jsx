import { useState } from 'react'

const tabs = [
  { key: 'grammar', label: '语法问题', icon: '⚠️' },
  { key: 'improve', label: '高级替换', icon: '✨' },
  { key: 'revised', label: '修改范文', icon: '📝' },
]

const levelConfig = {
  '优秀': { color: 'emerald', bg: 'from-emerald-600 to-emerald-700', shadow: 'shadow-emerald-600/20', text: 'text-emerald-200', label: '非常出色，保持水平！' },
  '良好': { color: 'blue', bg: 'from-blue-600 to-blue-700', shadow: 'shadow-blue-600/20', text: 'text-blue-200', label: '基础扎实，仍有提升空间' },
  '一般': { color: 'indigo', bg: 'from-indigo-600 to-indigo-700', shadow: 'shadow-indigo-600/20', text: 'text-indigo-200', label: '需要加强练习，查漏补缺' },
  '较差': { color: 'amber', bg: 'from-amber-600 to-amber-700', shadow: 'shadow-amber-600/20', text: 'text-amber-200', label: '基础薄弱，建议系统复习' },
}

export default function WritingFeedback({ result, onRegenerate, onCopy }) {
  const [activeTab, setActiveTab] = useState('grammar')
  const [copyText, setCopyText] = useState('复制结果')

  const scorePercent = result.totalScore > 0 ? (result.score / result.totalScore) * 100 : 0
  const level = levelConfig[result.level] || levelConfig['一般']
  const majorCount = result.grammarIssues.filter((g) => g.severity === 'major').length
  const minorCount = result.grammarIssues.filter((g) => g.severity === 'minor').length

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
      <div className={`card p-6 text-center bg-gradient-to-br ${level.bg} text-white border-0 shadow-lg ${level.shadow}`}>
        <p className={`text-sm ${level.text} mb-2 font-medium flex items-center justify-center gap-2`}>
          AI 评分
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white`}>
            {result.level}
          </span>
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold tracking-tight">{result.score}</span>
          <span className={`text-xl ${level.text}`}>/ {result.totalScore}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2.5 mt-4 overflow-hidden">
          <div
            className="h-full rounded-full bg-white/80 transition-all duration-1000"
            style={{ width: `${scorePercent}%` }}
          />
        </div>
        <p className={`text-sm ${level.text} mt-3`}>{level.label}</p>
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
              {tab.key === 'grammar' && result.grammarIssues.length > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-red-100 text-red-600">
                  {result.grammarIssues.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="p-5">
          {/* Grammar Issues */}
          {activeTab === 'grammar' && (
            <div className="space-y-3 animate-fade-in">
              {/* Summary badges */}
              {result.grammarIssues.length > 0 && (
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {majorCount > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      严重错误 {majorCount} 处
                    </span>
                  )}
                  {minorCount > 0 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                      轻微问题 {minorCount} 处
                    </span>
                  )}
                  <span className="text-xs text-slate-400">共 {result.grammarIssues.length} 处问题</span>
                </div>
              )}
              {result.grammarIssues.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-3xl mb-2">🎉</p>
                  <p className="text-sm text-slate-500">暂无语法问题，语法使用很正确！</p>
                </div>
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
              <p className="text-xs text-slate-400 mb-3">
                以下是将你的原文表达升级为更高级、更地道的考研英语表达
              </p>
              {result.improvements.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-3xl mb-2">✨</p>
                  <p className="text-sm text-slate-500">暂无高级替换建议</p>
                </div>
              ) : (
                result.improvements.map((imp, i) => (
                  <div key={i} className="p-4 rounded-xl bg-gradient-to-r from-violet-50 to-violet-50/50 border border-violet-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">
                        高级替换 #{i + 1}
                      </span>
                      <span className="text-xs text-violet-400">推荐</span>
                    </div>
                    <p className="text-sm text-slate-500 mb-1.5">
                      <span className="line-through text-red-400">{imp.original}</span>
                    </p>
                    <p className="text-sm text-emerald-700 font-medium flex items-start gap-1">
                      <span className="text-emerald-500">→</span>
                      <span>{imp.advanced}</span>
                    </p>
                    {imp.note && (
                      <p className="text-xs text-violet-500 mt-2 flex items-start gap-1">
                        <span className="text-violet-300 mt-0.5">💡</span>
                        <span>{imp.note}</span>
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Revised Essay */}
          {activeTab === 'revised' && (
            <div className="animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                  修改后范文
                </span>
                <span className="text-xs text-slate-400">基于原文润色优化，保留原意的同时提升表达质量</span>
              </div>
              {result.revisedEssay ? (
                <div className="p-5 rounded-xl bg-emerald-50/80 border border-emerald-100">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 mb-3">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    优化后版本
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                    {result.revisedEssay}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic text-center py-8">暂无修改后的范文</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 整体建议 */}
      {result.overallAdvice && (
        <div className="card p-5 sm:p-6 border-l-4 border-l-indigo-500">
          <h3 className="text-sm font-semibold text-indigo-700 mb-1 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            整体建议
          </h3>
          <p className="text-xs text-indigo-400 mb-3 ml-6">针对本次作文的总结性提升建议</p>
          <div className="bg-indigo-50/50 rounded-lg p-4 border border-indigo-100/50">
            <p className="text-sm text-slate-700 leading-relaxed">{result.overallAdvice}</p>
          </div>
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