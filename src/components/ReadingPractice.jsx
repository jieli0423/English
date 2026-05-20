import { useState, useEffect, useRef } from 'react'
import { readingData } from '../data/mockData'
import ReadingQuestion from './ReadingQuestion'
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
    // If already submitted this question, ignore
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
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
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

      {/* Stats Bar: timer + progress + accuracy */}
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