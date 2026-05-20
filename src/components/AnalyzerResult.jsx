import { useState } from 'react'

function Section({ title, desc, icon, children, className = '' }) {
  return (
    <div className={`card p-5 sm:p-6 ${className}`}>
      <h3 className="text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {desc && <p className="text-xs text-slate-400 mb-3 ml-6">{desc}</p>}
      {children}
    </div>
  )
}

export default function AnalyzerResult({ result, onRegenerate, onCopy }) {
  const [copyText, setCopyText] = useState('复制结果')

  const handleCopy = () => {
    if (onCopy) {
      onCopy(result)
      return
    }
    const text = [
      `主干结构：${result.main}`,
      '',
      ...(result.clauses || []).map((c) => `[${c.type}] ${c.text}`),
      '',
      ...(result.examTips || []).map((t) => `【${t.type}】${t.tip}`),
      '',
      `中文翻译：${result.translation}`,
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
          <span className="font-semibold">AI 分析完成</span> — 已为你拆解句子结构，标注语法考点。点击下方"复制结果"可保存分析内容。
        </p>
      </div>

      {/* 主干结构 */}
      <div className="card p-5 sm:p-6 border-l-4 border-l-indigo-500">
        <h3 className="text-sm font-semibold text-indigo-700 mb-1 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          句子主干
        </h3>
        <p className="text-xs text-indigo-400 mb-3 ml-6">去除修饰成分后的核心主谓宾/主系表结构</p>
        {result.main ? (
          <p className="text-slate-800 font-medium leading-relaxed text-base bg-indigo-50/50 rounded-lg p-3 border border-indigo-100/50">
            {result.main}
          </p>
        ) : (
          <p className="text-slate-400 text-sm italic">暂无主干分析</p>
        )}
      </div>

      {/* 从句分析 */}
      {result.clauses && result.clauses.length > 0 && (
        <Section
          title="从句分析"
          desc="识别句子中的各类从句及其语法功能"
          icon={
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          <div className="space-y-3">
            {result.clauses.map((clause, i) => (
              <div key={i} className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                    {clause.type}
                  </span>
                  <span className="text-xs text-slate-400">#{i + 1}</span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">{clause.text}</p>
                {clause.desc && (
                  <p className="text-xs text-slate-500 mt-1.5 flex items-start gap-1">
                    <span className="text-slate-300 mt-0.5">→</span>
                    <span>{clause.desc}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 修饰成分 */}
      {result.modifiers && result.modifiers.length > 0 && (
        <Section
          title="修饰成分"
          desc="定语、状语、补语等修饰性短语分析"
          icon={
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          }
        >
          <div className="grid sm:grid-cols-2 gap-3">
            {result.modifiers.map((mod, i) => (
              <div key={i} className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 mb-1">
                  {mod.type}
                </span>
                <p className="text-sm text-slate-800 leading-relaxed">{mod.text}</p>
                {mod.desc && (
                  <p className="text-xs text-slate-500 mt-1">{mod.desc}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 重点词汇 */}
      {result.keyWords && result.keyWords.length > 0 && (
        <Section
          title="重点词汇"
          desc="考研核心高频词汇，需重点掌握"
          icon={
            <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {result.keyWords.map((kw, i) => (
              <div key={i} className="p-3 rounded-xl bg-violet-50 border border-violet-100">
                <p className="font-medium text-slate-900 text-sm">{kw.word}</p>
                <p className="text-xs text-slate-500 mt-0.5">{kw.meaning}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 考研考点 */}
      {result.examTips && result.examTips.length > 0 && (
        <Section
          title="考研考点"
          desc="该句子涉及的考研英语核心语法考点"
          icon={
            <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        >
          <div className="space-y-3">
            {result.examTips.map((tip, i) => (
              <div key={i} className="p-3 rounded-xl bg-rose-50 border border-rose-100">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-700 mb-1.5">
                  {tip.type}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 中文翻译 */}
      {result.translation && (
        <div className="card p-5 sm:p-6 border-l-4 border-l-emerald-500">
          <h3 className="text-sm font-semibold text-emerald-700 mb-1 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            中文翻译
          </h3>
          <p className="text-xs text-emerald-500 mb-3 ml-6">整句通顺的中文翻译</p>
          <p className="text-slate-700 leading-relaxed bg-emerald-50/50 rounded-lg p-3 border border-emerald-100/50">
            {result.translation}
          </p>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex items-center gap-3 pt-2">
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