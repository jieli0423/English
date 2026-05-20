import { useState, useEffect, useRef } from 'react'
import { readingData } from '../data/mockData'
import { analyzeReading } from '../services/api'
import { API_MESSAGES, mockReadingAnalysis } from '../services/prompts'
import ReadingQuestion from './ReadingQuestion'
import ReadingAnalysis from './ReadingAnalysis'
import PageHeader from './ui/PageHeader'

export default function ReadingPractice() {
  const { passages } = readingData
  const passage = passages[0]
  const [answers, setAnswers] = useState({})
  const [submittedSet, setSubmittedSet] = useState(new Set())
  const [currentQ, setCurrentQ] = useState(0)
  const [allDone, setAllDone] = useState(false)
  const [startTime] = useState(Date.now())
  const [elapsed, setElapsed] = useState(0)
  const timerRef = useRef(null)

  // AI analysis state
  const [analysis, setAnalysis] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState('')
  const [usingFallback, setUsingFallback] = useState(false)

  const questions = passage.questions
  const totalQ = questions.length
  const currentQuestion = questions[currentQ]

  // Timer: count up every second
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [startTime])

  const handleSelect = (qId, optionIdx) => {
    if (submittedSet.has(qId)) return
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }))
    setSubmittedSet((prev) => new Set(prev).add(qId))
  }

  const goNext = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      clearInterval(timerRef.current)
      setAllDone(true)
    }
  }

  const goPrev = () => {
    if (currentQ > 0) setCurrentQ(currentQ - 1)
  }

  const handleReset = () => {
    setAnswers({})
    setSubmittedSet(new Set())
    setCurrentQ(0)
    setAllDone(false)
    setElapsed(0)
    setAnalysis(null)
    setAnalysisError('')
    setUsingFallback(false)
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
  }

  // AI Reading Analysis
  const handleAnalyzeReading = async () => {
    setAnalyzing(true)
    setAnalysis(null)
    setAnalysisError('')
    setUsingFallback(false)

    try {
      const data = await analyzeReading(
        passage.paragraphs.join('\n\n'),
        questions.map((q) => ({
          index: q.id,
          type: q.type,
          question: q.question,
          options: q.options,
        }))
      )
      setAnalysis({
        structure: data.structure || '',
        paragraphSummaries: data.paragraphSummaries || [],
        questionAnalysis: data.questionAnalysis || [],
        generalTips: data.generalTips || [],
      })
    } catch (err) {
      if (err.needConfig || err.status === 503) {
        setAnalysisError(API_MESSAGES.noKey)
      } else if (err.status === 502) {
        setAnalysisError(err.message || API_MESSAGES.serverError)
      } else {
        setAnalysisError(API_MESSAGES.networkError)
      }
      setAnalysis(mockReadingAnalysis)
      setUsingFallback(true)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleRegenerateAnalysis = () => {
    handleAnalyzeReading()
  }

  const handleCopyAnalysis = () => {
    if (!analysis) return
    const text = [
      '=== 文章结构分析 ===',
      analysis.structure,
      '',
      '=== 段落主旨 ===',
      ...(analysis.paragraphSummaries || []).map((p) => `第 ${p.index} 段：${p.summary}`),
      '',
      '=== 题目精讲 ===',
      ...(analysis.questionAnalysis || []).map(
        (q) =>
          `第 ${q.questionIndex} 题（${q.type}）：\n定位句：${q.locatingSentence}\n正确答案：${q.correctAnswer}\n解析：${q.explanation}\n错因分析：${q.errorAnalysis}\n技巧：${q.tips}`
      ),
      '',
      '=== 解题技巧 ===',
      ...(analysis.generalTips || []),
    ].join('\n\n')
    navigator.clipboard.writeText(text)
  }

  // Correct count among submitted
  let correctCount = 0
  questions.forEach((q) => {
    if (answers[q.id] !== undefined && answers[q.id] === q.correct) {
      correctCount++
    }
  })
  const answeredCount = submittedSet.size
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Summary view after all questions
  if (allDone) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <PageHeader icon="📖" title="阅读训练" subtitle="答题完成 · 结果汇总" />

        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="card p-6 text-center bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0 shadow-lg shadow-indigo-600/20">
            <p className="text-sm text-indigo-200 mb-1 font-medium">正确率</p>
            <p className="text-4xl font-bold">{accuracy}%</p>
            <p className="text-sm text-indigo-200 mt-2">
              {correctCount}/{totalQ} 题正确
            </p>
          </div>
          <div className="card p-6 text-center bg-gradient-to-br from-emerald-600 to-emerald-700 text-white border-0 shadow-lg shadow-emerald-600/20">
            <p className="text-sm text-emerald-200 mb-1 font-medium">用时</p>
            <p className="text-4xl font-bold">{formatTime(elapsed)}</p>
            <p className="text-sm text-emerald-200 mt-2">
              {totalQ} 道题
            </p>
          </div>
          <div className="card p-6 text-center bg-gradient-to-br from-violet-600 to-violet-700 text-white border-0 shadow-lg shadow-violet-600/20">
            <p className="text-sm text-violet-200 mb-1 font-medium">平均每题</p>
            <p className="text-4xl font-bold">
              {answeredCount > 0 ? Math.round(elapsed / answeredCount) : 0}s
            </p>
            <p className="text-sm text-violet-200 mt-2">
              {accuracy >= 80 ? '🎉 表现优秀' : accuracy >= 50 ? '👍 继续加油' : '💪 需要加强'}
            </p>
          </div>
        </div>

        {/* Review all questions */}
        <div className="card p-5 sm:p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            逐题回顾
          </h3>
          <div className="space-y-3">
            {questions.map((q, i) => {
              const isCorrect = answers[q.id] === q.correct
              return (
                <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-700">第 {i + 1} 题</span>
                    <span className={`text-xs font-medium ${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                      {isCorrect ? '✓ 正确' : '✗ 错误'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 line-clamp-2">{q.question}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* AI Analysis */}
        {analysis && (
          <div className="mb-6">
            {usingFallback && (
              <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-sm text-amber-700">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>{API_MESSAGES.fallback}</span>
              </div>
            )}
            <ReadingAnalysis
              analysis={analysis}
              onRegenerate={handleRegenerateAnalysis}
              onCopy={handleCopyAnalysis}
            />
          </div>
        )}

        {analyzing && (
          <div className="card p-8 sm:p-10 mb-6">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full border-[3px] border-indigo-100 border-t-indigo-600 animate-spin mx-auto mb-5" />
              <p className="text-slate-600 font-medium">AI 正在精讲阅读...</p>
              <p className="text-slate-400 text-sm mt-2">正在分析文章结构和解题思路</p>
            </div>
          </div>
        )}

        {!analysis && !analyzing && (
          <div className="card p-6 mb-6 text-center">
            <p className="text-sm text-slate-500 mb-4">想要更深入地理解这篇文章吗？让 AI 为你逐题精讲。</p>
            <button onClick={handleAnalyzeReading} className="btn-primary flex items-center gap-2 mx-auto">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AI 智能精讲
            </button>
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={handleReset} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            重新练习
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <PageHeader
        icon="📖"
        title="阅读训练"
        subtitle="考研英语真题精练 · AI 智能解析"
        actions={
          <div className="hidden sm:flex items-center gap-3 text-sm">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
              {passage.difficulty}
            </span>
            <span className="text-slate-400">{passage.wordCount} 词</span>
          </div>
        }
      />

      {/* Stats Bar: timer + progress + accuracy + AI button */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-sm">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-mono text-slate-700 font-medium tabular-nums">{formatTime(elapsed)}</span>
        </div>
        <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-sm">
          <span className="text-slate-500">答题</span>
          <span className="font-semibold text-indigo-600">{answeredCount}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500">{totalQ}</span>
        </div>
        {answeredCount > 0 && (
          <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-sm">
            <span className="text-slate-500">正确率</span>
            <span className={`font-semibold ${accuracy >= 80 ? 'text-emerald-600' : accuracy >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
              {accuracy}%
            </span>
          </div>
        )}
        <button
          onClick={handleAnalyzeReading}
          disabled={analyzing}
          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-50 active:scale-[0.97] transition-all duration-150 disabled:opacity-50"
        >
          {analyzing ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              分析中...
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              AI 精讲
            </>
          )}
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Article */}
        <div className="lg:col-span-3">
          <div className="card p-5 sm:p-6">
            <div className="mb-5 pb-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">{passage.title}</h2>
              <p className="text-xs text-slate-400 mt-1">{passage.source}</p>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-slate-700">
              {passage.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          {/* AI Analysis section below article */}
          {analysis && (
            <div className="mt-6">
              {usingFallback && (
                <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-sm text-amber-700">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <span>{API_MESSAGES.fallback}</span>
                </div>
              )}
              <ReadingAnalysis
                analysis={analysis}
                onRegenerate={handleRegenerateAnalysis}
                onCopy={handleCopyAnalysis}
              />
            </div>
          )}

          {/* AI Analysis loading */}
          {analyzing && (
            <div className="card p-8 sm:p-10 mt-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full border-[3px] border-indigo-100 border-t-indigo-600 animate-spin mx-auto mb-5" />
                <p className="text-slate-600 font-medium">AI 正在精讲阅读...</p>
                <p className="text-slate-400 text-sm mt-2">正在分析文章结构和解题思路</p>
              </div>
            </div>
          )}

          {analysisError && !analysis && (
            <div className="card p-6 mt-6 text-center">
              <p className="text-sm text-red-500 mb-3">{analysisError}</p>
              <button onClick={handleAnalyzeReading} className="btn-secondary">
                重试
              </button>
            </div>
          )}
        </div>

        {/* Questions Panel */}
        <div className="lg:col-span-2">
          {/* Question progress */}
          <div className="card p-4 mb-5 bg-slate-50 border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">
                第 {currentQ + 1} 题
              </span>
              <span className="text-xs text-slate-400">
                {currentQuestion.type}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full rounded-full bg-indigo-400 transition-all duration-500"
                style={{ width: `${((currentQ + 1) / totalQ) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <ReadingQuestion
              key={currentQuestion.id}
              question={currentQuestion}
              index={currentQ}
              selected={answers[currentQuestion.id]}
              showResult={submittedSet.has(currentQuestion.id)}
              isCorrect={answers[currentQuestion.id] === currentQuestion.correct}
              onSelect={handleSelect}
              submitted={submittedSet.has(currentQuestion.id)}
            />
          </div>

          {/* Navigation */}
          <div className="mt-6 flex gap-3">
            {currentQ > 0 && (
              <button
                onClick={goPrev}
                className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                上一题
              </button>
            )}
            <button
              onClick={goNext}
              disabled={!submittedSet.has(currentQuestion.id)}
              className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 disabled:opacity-40"
            >
              {currentQ < totalQ - 1 ? (
                <>
                  下一题
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  查看结果
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}