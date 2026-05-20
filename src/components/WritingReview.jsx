import { useState } from 'react'
import { writingData, mockWritingReview } from '../data/mockData'
import { reviewWriting } from '../services/api'
import { API_MESSAGES } from '../services/prompts'
import WritingFeedback from './WritingFeedback'
import PageHeader from './ui/PageHeader'

const reviewSteps = [
  { label: '正在评估作文水平...', key: 'scoring' },
  { label: '正在检测语法错误...', key: 'grammar' },
  { label: '正在分析表达质量...', key: 'quality' },
  { label: '正在生成修改建议...', key: 'suggestions' },
  { label: '正在润色范文...', key: 'polish' },
  { label: '正在生成评分报告...', key: 'report' },
]

export default function WritingReview() {
  const [essay, setEssay] = useState('')
  const [reviewing, setReviewing] = useState(false)
  const [result, setResult] = useState(null)
  const [currentStep, setCurrentStep] = useState(-1)
  const [error, setError] = useState('')
  const [usingFallback, setUsingFallback] = useState(false)

  const doReview = async () => {
    if (!essay.trim()) return
    setReviewing(true)
    setResult(null)
    setError('')
    setUsingFallback(false)
    setCurrentStep(0)

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < reviewSteps.length - 1) return prev + 1
        clearInterval(stepInterval)
        return prev
      })
    }, 350)

    try {
      const data = await reviewWriting(essay)
      clearInterval(stepInterval)
      setCurrentStep(reviewSteps.length)

      setResult({
        score: data.score ?? mockWritingReview.score,
        totalScore: data.totalScore ?? mockWritingReview.totalScore,
        level: data.level || mockWritingReview.level,
        grammarIssues: data.grammarIssues || [],
        improvements: data.improvements || [],
        revisedEssay: data.revisedEssay || '',
        overallAdvice: data.overallAdvice || '',
      })
    } catch (err) {
      clearInterval(stepInterval)
      setCurrentStep(reviewSteps.length)

      if (err.needConfig || err.status === 503) {
        setError(API_MESSAGES.noKey)
      } else if (err.status === 502) {
        setError(err.message || API_MESSAGES.serverError)
      } else {
        setError(API_MESSAGES.networkError)
      }

      // Fallback to mock review
      setResult(mockWritingReview)
      setUsingFallback(true)
    } finally {
      setReviewing(false)
      setCurrentStep(-1)
    }
  }

  const handleReview = () => {
    doReview()
  }

  const handleRegenerate = () => {
    doReview()
  }

  const handleCopy = (res) => {
    const text = [
      `AI 评分：${res.score}/${res.totalScore}（${res.level}）`,
      '',
      '== 语法问题 ==',
      ...res.grammarIssues.map((g) => `[${g.severity === 'major' ? '严重' : '轻微'}] ${g.type}: ${g.original} → ${g.suggestion}`),
      '',
      ...(res.overallAdvice ? [`整体建议：${res.overallAdvice}`, ''] : []),
      '== 高级替换 ==',
      ...res.improvements.map((imp) => `${imp.original} → ${imp.advanced}（${imp.note}）`),
      '',
      '== 修改后范文 ==',
      res.revisedEssay,
    ].join('\n')
    navigator.clipboard.writeText(text)
  }

  const loadSample = () => {
    setEssay(writingData.sampleEssay)
    setResult(null)
    setError('')
    setUsingFallback(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <PageHeader
        icon="✍️"
        title="作文批改"
        subtitle="AI 智能作文评分 · 语法纠错 · 高级表达润色"
      />

      {/* Prompt */}
      <div className="card p-4 sm:p-5 mb-6 bg-gradient-to-r from-indigo-50 to-indigo-100/30 border border-indigo-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-indigo-700">📌 作文题目</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-600">
            {writingData.prompts[0].topic}
          </span>
        </div>
        <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">
          {writingData.prompts[0].description}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Input */}
        <div>
          <div className="card p-5 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                你的作文
              </label>
              <button
                onClick={loadSample}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium active:scale-[0.97] transition-all duration-150 flex items-center gap-1"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                加载范文示例
              </button>
            </div>
            <textarea
              value={essay}
              onChange={(e) => { setEssay(e.target.value); setError(''); setUsingFallback(false) }}
              placeholder="在此粘贴或输入你的作文..."
              className="input-area min-h-[350px] text-sm leading-relaxed resize-y"
              rows={12}
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>{essay.length} 字符</span>
                {essay.trim() && (
                  <span className="text-slate-300">|</span>
                )}
                {essay.trim() && (
                  <span className="text-emerald-600 font-medium">
                    约 {Math.max(1, Math.round(essay.split(/\s+/).filter(Boolean).length))} 词
                  </span>
                )}
              </div>
              <button
                onClick={handleReview}
                disabled={reviewing || !essay.trim()}
                className="btn-primary flex items-center gap-2"
              >
                {reviewing ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    AI 批改中...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    开始批改
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-3 flex items-center gap-1.5">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
          </div>
        </div>

        {/* Right: Results */}
        <div>
          {/* Step-by-step Loading */}
          {reviewing && (
            <div className="card p-8 sm:p-10 min-h-[400px]">
              <div className="max-w-sm mx-auto">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200 animate-pulse">
                    AI
                  </div>
                  <div>
                    <p className="text-slate-700 font-semibold">AI 正在批改作文...</p>
                    <p className="text-slate-400 text-xs mt-0.5">逐项分析你的作文内容</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {reviewSteps.map((step, i) => {
                    const isDone = i < currentStep
                    const isActive = i === currentStep
                    return (
                      <div key={step.key} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isDone
                            ? 'bg-emerald-500'
                            : isActive
                              ? 'bg-indigo-600 ring-4 ring-indigo-100'
                              : 'bg-slate-200'
                        }`}>
                          {isDone ? (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : isActive ? (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          ) : null}
                        </div>
                        <span className={`text-sm transition-all duration-300 ${
                          isDone
                            ? 'text-emerald-600 font-medium'
                            : isActive
                              ? 'text-indigo-700 font-semibold'
                              : 'text-slate-400'
                        }`}>
                          {step.label}
                        </span>
                        {isActive && (
                          <div className="flex gap-1 ml-auto">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {result && !reviewing && (
            <>
              {usingFallback && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-sm text-amber-700">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>{API_MESSAGES.fallback}</span>
                </div>
              )}
              <WritingFeedback
                result={result}
                onRegenerate={handleRegenerate}
                onCopy={handleCopy}
              />
            </>
          )}

          {!result && !reviewing && (
            <div className="card p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
              <div className="text-5xl mb-4">✍️</div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">等待批改</h3>
              <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                在左侧输入框中写下你的作文，点击"开始批改"即可获得 AI 智能评分和详细修改建议
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">📊 AI 智能评分</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1">🔍 语法纠错</span>
                <span className="w-1 h-1 rounded-full bg-slate-300" />
                <span className="flex items-center gap-1">✨ 高级表达润色</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}