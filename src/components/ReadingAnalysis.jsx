import { useState } from 'react'

export default function ReadingAnalysis({ analysis, onRegenerate }) {
  const [copyText, setCopyText] = useState('复制分析')
  const [expandedTips, setExpandedTips] = useState(false)

  const handleCopy = () => {
    const text = [
      '=== 文章结构分析 ===',
      analysis.structure,
      '',
      '=== 段落主旨 ===',
      ...(analysis.paragraphSummaries || []).map(
        (p) => `第 ${p.index} 段：${p.summary}`
      ),
      '',
      '=== 题目精讲 ===',
      ...(analysis.questionAnalysis || []).map(
        (q) =>
          `第 ${q.questionIndex} 题（${q.type}）：
定位句：${q.locatingSentence}
正确答案：${q.correctAnswer}
解析：${q.explanation}
错因分析：${q.errorAnalysis}
技巧：${q.tips}`
      ),
      '',
      '=== 解题技巧 ===',
      ...(analysis.generalTips || []),
    ].join('\n\n')

    navigator.clipboard.writeText(text).then(() => {
      setCopyText('已复制!')
      setTimeout(() => setCopyText('复制分析'), 2000)
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
          <span className="font-semibold">AI 精讲完成</span> — 已分析文章结构、段落主旨和每道题的定位句与解题思路。
        </p>
      </div>

      {/* 文章结构 */}
      <div className="card p-5 sm:p-6 border-l-4 border-l-indigo-500">
        <h3 className="text-sm font-semibold text-indigo-700 mb-1 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          文章结构分析
        </h3>
        <p className="text-xs text-indigo-400 mb-3 ml-6">整体行文脉络和逻辑结构概览</p>
        {analysis.structure ? (
          <div className="bg-indigo-50/50 rounded-lg p-4 border border-indigo-100/50">
            <p className="text-slate-700 leading-relaxed text-sm">{analysis.structure}</p>
          </div>
        ) : (
          <p className="text-slate-400 text-sm italic">暂无结构分析</p>
        )}
      </div>

      {/* 段落主旨 */}
      {analysis.paragraphSummaries && analysis.paragraphSummaries.length > 0 && (
        <div className="card p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            段落主旨
          </h3>
          <p className="text-xs text-slate-400 mb-3 ml-6">各段落核心内容概括</p>
          <div className="space-y-3">
            {analysis.paragraphSummaries.map((p) => (
              <div key={p.index} className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex-shrink-0 mt-0.5">
                  {p.index}
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">{p.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 逐题精讲 */}
      {analysis.questionAnalysis && analysis.questionAnalysis.length > 0 && (
        <div className="card p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-1 flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            逐题精讲
          </h3>
          <p className="text-xs text-slate-400 mb-4 ml-6">每道题的定位、解析、错因和解题技巧</p>
          <div className="space-y-4">
            {analysis.questionAnalysis.map((q) => (
              <div key={q.questionIndex} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                {/* 题号 + 类型 */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium flex items-center justify-center">
                    {q.questionIndex}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                    {q.type}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 ml-auto">
                    答案 {q.correctAnswer}
                  </span>
                </div>

                {/* 定位句 */}
                <div className="mb-3 p-3 rounded-lg bg-white border border-slate-100">
                  <p className="text-xs font-medium text-indigo-600 mb-1 flex items-center gap-1">
                    <span>📍</span> 原文定位句
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{q.locatingSentence}</p>
                </div>

                {/* 解析 */}
                {q.explanation && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-emerald-600 mb-1 flex items-center gap-1">
                      <span>✅</span> 答案解析
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed p-3 rounded-lg bg-emerald-50/50 border border-emerald-100/50">
                      {q.explanation}
                    </p>
                  </div>
                )}

                {/* 错因分析 */}
                {q.errorAnalysis && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-red-600 mb-1 flex items-center gap-1">
                      <span>❌</span> 错因分析
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed p-3 rounded-lg bg-red-50/50 border border-red-100/50">
                      {q.errorAnalysis}
                    </p>
                  </div>
                )}

                {/* 解题技巧 */}
                {q.tips && (
                  <div className="p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-50/50 border border-amber-100">
                    <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
                      <span>💡</span> 解题技巧
                    </p>
                    <p className="text-sm text-amber-800 leading-relaxed">{q.tips}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 通用技巧 */}
      {analysis.generalTips && analysis.generalTips.length > 0 && (
        <div className="card p-5 sm:p-6 overflow-hidden">
          <button
            onClick={() => setExpandedTips(!expandedTips)}
            className="flex items-center justify-between w-full text-sm font-semibold text-slate-700"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              考研阅读通用技巧
              <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-600 ml-1">
                {analysis.generalTips.length} 条
              </span>
            </span>
            <svg className={`w-4 h-4 text-slate-400 transition-transform ${expandedTips ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedTips && (
            <div className="mt-4 space-y-2.5 animate-slide-up">
              {analysis.generalTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-700 p-3 rounded-lg bg-violet-50/50 border border-violet-100/50">
                  <span className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          )}
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