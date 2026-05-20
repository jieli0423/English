import { useState } from 'react'
import { readingData } from '../data/mockData'
import ReadingQuestion from './ReadingQuestion'
import PageHeader from './ui/PageHeader'

export default function ReadingPractice() {
  const { passages } = readingData
  const passage = passages[0]
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (qId, optionIdx) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }))
  }

  const handleSubmit = () => {
    setSubmitted(true)
    const results = {}
    passage.questions.forEach((q) => {
      results[q.id] = answers[q.id] === q.correct
    })
    setShowResults(results)
  }

  const handleReset = () => {
    setAnswers({})
    setShowResults({})
    setSubmitted(false)
  }

  const correctCount = Object.values(showResults).filter(Boolean).length
  const totalQuestions = passage.questions.length
  const answeredCount = Object.keys(answers).length

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

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Article */}
        <div className="lg:col-span-3">
          <div className="card p-5 sm:p-6 mb-6">
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

        {/* Questions */}
        <div className="lg:col-span-2">
          {/* Progress */}
          {submitted ? (
            <div className="card p-4 mb-5 bg-gradient-to-r from-indigo-50 to-indigo-100/50 border-indigo-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">答题结果</span>
                <span className="text-lg font-bold text-indigo-700">{correctCount}/{totalQuestions}</span>
              </div>
              <div className="w-full bg-indigo-200 rounded-full h-2 mt-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-700"
                  style={{ width: `${(correctCount / totalQuestions) * 100}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {correctCount === totalQuestions ? '🎉 全部正确！太棒了！' :
                 correctCount >= 3 ? '👍 不错，继续加油！' :
                 '💪 需要加强练习，加油！'}
              </p>
            </div>
          ) : (
            <div className="card p-4 mb-5 bg-slate-50 border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">答题进度</span>
                <span className="text-sm font-semibold text-indigo-600">{answeredCount}/{totalQuestions}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-400 transition-all duration-500"
                  style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            {passage.questions.map((q, qi) => (
              <ReadingQuestion
                key={q.id}
                question={q}
                index={qi}
                selected={answers[q.id]}
                showResult={showResults[q.id] !== undefined}
                isCorrect={showResults[q.id]}
                onSelect={handleSelect}
                submitted={submitted}
              />
            ))}
          </div>

          {/* Submit / Reset */}
          <div className="mt-6 flex gap-3">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={answeredCount < totalQuestions}
                className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                提交答案
              </button>
            ) : (
              <button onClick={handleReset} className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                重新练习
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
