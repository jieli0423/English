import { useState } from 'react'
import { vocabularyData } from '../data/mockData'
import VocabularyCard from './VocabularyCard'
import PageHeader from './ui/PageHeader'

const levels = [
  { value: 0, label: '陌生', activeColor: 'bg-red-500 text-white border-red-500', color: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' },
  { value: 1, label: '模糊', activeColor: 'bg-amber-500 text-white border-amber-500', color: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' },
  { value: 2, label: '熟悉', activeColor: 'bg-blue-500 text-white border-blue-500', color: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' },
  { value: 3, label: '已掌握', activeColor: 'bg-emerald-500 text-white border-emerald-500', color: 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' },
]

export default function Vocabulary() {
  const [words] = useState(vocabularyData)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [mastery, setMastery] = useState(vocabularyData.map((w) => w.masterLevel))
  const [showMeaning, setShowMeaning] = useState(true)

  const current = words[currentIdx]
  const totalWords = words.length
  const mastered = mastery.filter((m) => m >= 2).length

  const handleMastery = (level) => {
    const updated = [...mastery]
    updated[currentIdx] = level
    setMastery(updated)
  }

  const goNext = () => {
    if (currentIdx < totalWords - 1) setCurrentIdx(currentIdx + 1)
  }

  const goPrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') goPrev()
    if (e.key === 'ArrowRight') goNext()
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto" onKeyDown={handleKeyDown} tabIndex={0}>
      <PageHeader
        icon="📚"
        title="单词学习"
        subtitle="考研核心高频词汇 · AI 智能记忆"
        actions={
          <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500">
            <span>已掌握 <strong className="text-emerald-600">{mastered}</strong></span>
            <span>学习中 <strong className="text-amber-600">{totalWords - mastered}</strong></span>
          </div>
        }
      />

      {/* Progress */}
      <div className="mt-2 mb-6 flex items-center gap-4">
        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500"
            style={{ width: `${((currentIdx + 1) / totalWords) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-slate-500 flex-shrink-0">
          {currentIdx + 1} / {totalWords}
        </span>
      </div>

      {/* Word Card */}
      <VocabularyCard
        word={current}
        showMeaning={showMeaning}
        onToggleMeaning={() => setShowMeaning(!showMeaning)}
      />

      {/* Mastery Buttons */}
      <div className="card p-4 sm:p-6 mb-6">
        <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          掌握程度
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {levels.map((level) => {
            const isActive = mastery[currentIdx] === level.value
            return (
              <button
                key={level.value}
                onClick={() => handleMastery(level.value)}
                className={`
                  py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200
                  ${isActive ? level.activeColor : level.color}
                  ${isActive ? 'ring-2 ring-offset-2 shadow-md' : 'hover:shadow-sm active:scale-[0.97]'}
                  active:scale-[0.97]
                `}
              >
                {level.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <button
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-40"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          上一个
        </button>

        {/* Quick word selector */}
        <div className="hidden sm:flex items-center gap-1.5">
          {words.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-200
                ${i === currentIdx
                  ? 'bg-indigo-600 scale-125 shadow-sm shadow-indigo-500/50'
                  : mastery[i] >= 2
                    ? 'bg-emerald-300'
                    : 'bg-slate-300 hover:bg-slate-400'
                }
              `}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={currentIdx === totalWords - 1}
          className="btn-primary flex items-center gap-2 disabled:opacity-40"
        >
          下一个
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        💡 使用键盘 ← → 方向键快速切换单词 · 点击 👁 切换释义
      </p>
    </div>
  )
}
