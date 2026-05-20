import { useState } from 'react'
import { analyzeWord } from '../services/api'
import { mockWordAnalysis, API_MESSAGES } from '../services/prompts'

export default function VocabularyCard({ word, showMeaning, onToggleMeaning, wordType }) {
  const [expandedConfusing, setExpandedConfusing] = useState(false)

  // AI 精讲 state
  const [aiResult, setAiResult] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState('')
  const [aiFallback, setAiFallback] = useState(false)
  const [copyText, setCopyText] = useState('复制结果')
  const [expandedAi, setExpandedAi] = useState(false)

  const typeLabel = wordType === 'new' ? '新词' : '复习词'
  const typeStyles = wordType === 'new'
    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
    : 'bg-indigo-100 text-indigo-700 border-indigo-200'

  const handleAiAnalyze = async () => {
    if (aiResult && !aiError) {
      // Toggle display if already loaded
      setExpandedAi(!expandedAi)
      return
    }
    setAiLoading(true)
    setAiError('')
    setAiFallback(false)
    setExpandedAi(true)

    try {
      const data = await analyzeWord(word.word, word.meaning, word.phonetic, word.example)
      setAiResult(data)
    } catch (err) {
      const isConfigErr = err.needConfig || err.status === 503
      setAiError(isConfigErr ? API_MESSAGES.noKey : (err.status === 502 ? (err.message || API_MESSAGES.serverError) : API_MESSAGES.networkError))

      // Fallback
      const fallback = mockWordAnalysis(word.word)
      setAiResult({
        chineseMeaning: fallback.chineseMeaning || word.meaning,
        examMeanings: fallback.examMeanings,
        rootAnalysis: fallback.rootAnalysis || word.root,
        exampleSentence: fallback.exampleSentence,
        exampleTranslation: fallback.exampleTranslation,
        confusingWords: fallback.confusingWords,
        mnemonic: fallback.mnemonic,
        collocations: fallback.collocations,
        writingUsage: fallback.writingUsage,
      })
      setAiFallback(true)
    } finally {
      setAiLoading(false)
    }
  }

  const handleRegenerate = () => {
    setAiResult(null)
    setAiError('')
    setAiFallback(false)
    handleAiAnalyze()
  }

  const handleCopy = () => {
    if (!aiResult) return
    const text = [
      `【AI 精讲】${word.word}`,
      '',
      `中文释义：${aiResult.chineseMeaning}`,
      '',
      '考研常见含义：',
      ...aiResult.examMeanings.map((m) => `  · ${m}`),
      '',
      `词根词缀：${aiResult.rootAnalysis}`,
      '',
      `真题例句：${aiResult.exampleSentence}`,
      `翻译：${aiResult.exampleTranslation}`,
      '',
      '易混词辨析：',
      ...aiResult.confusingWords.map((c) => `  · ${c.word}（${c.meaning}）：${c.difference || ''}`),
      '',
      `联想记忆：${aiResult.mnemonic}`,
      '',
      '常见搭配：',
      ...aiResult.collocations.map((c) => `  · ${c}`),
      '',
      `写作应用：${aiResult.writingUsage}`,
    ].join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopyText('已复制!')
      setTimeout(() => setCopyText('复制结果'), 2000)
    })
  }

  return (
    <div className="card p-6 sm:p-8 mb-6 animate-slide-up">
      {/* Word Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{word.word}</h2>
            {wordType && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${typeStyles}`}>
                {typeLabel}
              </span>
            )}
            <button
              onClick={onToggleMeaning}
              className="p-1.5 rounded-lg hover:bg-slate-100 active:bg-slate-200 active:scale-90 transition-all duration-150"
              title={showMeaning ? '隐藏释义' : '显示释义'}
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMeaning ? (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </>
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </>
                )}
              </svg>
            </button>
          </div>
          <p className="text-slate-400 text-sm mb-1">{word.phonetic}</p>
          {showMeaning && (
            <p className="text-lg text-indigo-700 font-medium animate-fade-in">{word.meaning}</p>
          )}
        </div>
      </div>

      {/* 真题例句 */}
      <div className="mb-5 p-4 bg-gradient-to-r from-indigo-50 to-indigo-50/50 rounded-xl border border-indigo-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">真题例句</span>
        </div>
        <p className="text-slate-700 leading-relaxed mb-2">{word.example}</p>
        {showMeaning && (
          <p className="text-slate-500 text-sm border-t border-indigo-200/50 pt-2 mt-2 animate-fade-in">{word.exampleTrans}</p>
        )}
      </div>

      {/* 词根词缀 */}
      <div className="mb-5 p-4 bg-gradient-to-r from-amber-50 to-amber-50/50 rounded-xl border border-amber-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">词根词缀</span>
        </div>
        <p className="text-slate-700">{word.root}</p>
      </div>

      {/* 易混词 */}
      <div className="mb-5">
        <button
          onClick={() => setExpandedConfusing(!expandedConfusing)}
          className="flex items-center gap-2 mb-3 text-xs font-semibold text-violet-600 uppercase tracking-wider hover:text-violet-700 active:scale-[0.97] transition-all duration-150"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          易混词辨析（{word.confusing.length} 组）
          <svg className={`w-3.5 h-3.5 transition-transform ${expandedConfusing ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedConfusing && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 animate-slide-up">
            {word.confusing.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-violet-50 border border-violet-100">
                <p className="font-medium text-slate-900 text-sm">{item.word}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.meaning}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI 精讲 Button */}
      <div className="border-t border-slate-100 pt-4">
        <button
          onClick={handleAiAnalyze}
          disabled={aiLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 active:scale-[0.97] transition-all duration-150 shadow-sm disabled:opacity-60"
        >
          {aiLoading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              AI 分析中...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AI 精讲
              {aiResult && !expandedAi && (
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              )}
            </>
          )}
        </button>
      </div>

      {/* AI 精讲 Result */}
      {expandedAi && (
        <div className="mt-5 pt-5 border-t border-slate-100 animate-slide-up">
          {/* AI header */}
          <div className="card p-3 bg-gradient-to-r from-indigo-50 to-indigo-100/30 border border-indigo-100 flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm">
              AI
            </div>
            <p className="text-sm text-indigo-700 leading-relaxed">
              <span className="font-semibold">AI 精讲</span> — 基于考研英语考点的深度单词解析
            </p>
          </div>

          {/* Fallback warning */}
          {aiFallback && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-sm text-amber-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>{API_MESSAGES.fallback}</span>
            </div>
          )}

          {/* Error */}
          {aiError && !aiResult && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-sm text-red-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{aiError}</span>
              <button onClick={handleRegenerate} className="ml-auto text-xs font-medium underline">重试</button>
            </div>
          )}

          {/* Loading skeleton */}
          {aiLoading && (
            <div className="space-y-3 mb-4">
              <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-5/6" />
            </div>
          )}

          {/* Result content */}
          {aiResult && !aiLoading && (
            <div className="space-y-4">
              {/* 中文释义 */}
              {aiResult.chineseMeaning && (
                <div className="card p-4 border-l-4 border-l-emerald-500">
                  <p className="text-xs font-medium text-emerald-600 mb-1">中文释义</p>
                  <p className="text-slate-800 font-medium">{aiResult.chineseMeaning}</p>
                </div>
              )}

              {/* 考研常见含义 */}
              {aiResult.examMeanings && aiResult.examMeanings.length > 0 && (
                <div className="card p-4">
                  <p className="text-xs font-medium text-indigo-600 mb-2 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    考研常见含义
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {aiResult.examMeanings.map((m, i) => (
                      <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {i + 1}. {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 词根词缀 */}
              {aiResult.rootAnalysis && (
                <div className="card p-4 bg-gradient-to-r from-amber-50 to-amber-50/30">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs font-semibold text-amber-700">词根词缀分析</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{aiResult.rootAnalysis}</p>
                </div>
              )}

              {/* 真题例句 + 翻译 */}
              {aiResult.exampleSentence && (
                <div className="card p-4 border-l-4 border-l-indigo-500">
                  <p className="text-xs font-medium text-indigo-600 mb-1">真题例句</p>
                  <p className="text-sm text-slate-800 leading-relaxed mb-2">{aiResult.exampleSentence}</p>
                  {aiResult.exampleTranslation && (
                    <p className="text-xs text-slate-500 border-t border-indigo-100 pt-2 mt-2">{aiResult.exampleTranslation}</p>
                  )}
                </div>
              )}

              {/* 易混词辨析 */}
              {aiResult.confusingWords && aiResult.confusingWords.length > 0 && (
                <div className="card p-4">
                  <p className="text-xs font-medium text-violet-600 mb-2">易混词辨析</p>
                  <div className="space-y-2">
                    {aiResult.confusingWords.map((c, i) => (
                      <div key={i} className="p-3 rounded-lg bg-violet-50 border border-violet-100">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm text-slate-900">{c.word}</span>
                          <span className="text-xs text-slate-500">— {c.meaning}</span>
                        </div>
                        {c.difference && (
                          <p className="text-xs text-slate-500">{c.difference}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 联想记忆 */}
              {aiResult.mnemonic && (
                <div className="card p-4 bg-gradient-to-r from-emerald-50 to-emerald-50/30 border border-emerald-100">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs font-semibold text-emerald-700">联想记忆法</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{aiResult.mnemonic}</p>
                </div>
              )}

              {/* 常见搭配 */}
              {aiResult.collocations && aiResult.collocations.length > 0 && (
                <div className="card p-4">
                  <p className="text-xs font-medium text-blue-600 mb-2">常见搭配</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {aiResult.collocations.map((c, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-blue-50 border border-blue-100">
                        <p className="text-sm text-slate-800">{c}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 写作可用表达 */}
              {aiResult.writingUsage && (
                <div className="card p-4 border-l-4 border-l-rose-500">
                  <p className="text-xs font-medium text-rose-600 mb-1">写作可用表达</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{aiResult.writingUsage}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button onClick={handleRegenerate} className="btn-secondary flex items-center gap-2 text-xs">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  重新生成
                </button>
                <button onClick={handleCopy} className="btn-secondary flex items-center gap-2 text-xs">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copyText}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}