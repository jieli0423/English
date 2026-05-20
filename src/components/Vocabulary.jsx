import { useState, useEffect } from 'react'
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
  const [studiedSet, setStudiedSet] = useState(new Set())
  const [wrongBookMode, setWrongBookMode] = useState(false)

  // Words in wrong book: mastery 0 (陌生) or 1 (模糊)
  const wrongWordIndices = words
    .map((_, i) => (mastery[i] <= 1 ? i : -1))
    .filter((i) => i !== -1)

  // Current display list based on mode
  const displayIndices = wrongBookMode ? wrongWordIndices : words.map((_, i) => i)
  const displayPos = displayIndices.indexOf(currentIdx)
  const current = words[currentIdx]
  const totalWords = words.length
  const mastered = mastery.filter((m) => m >= 2).length
  const studiedToday = studiedSet.size

  // Reset index when toggling wrong book if current word not in filter
  useEffect(() => {
    if (wrongBookMode && displayPos === -1 && displayIndices.length > 0) {
      setCurrentIdx(displayIndices[0])
    } else if (!wrongBookMode && displayPos === -1) {
      setCurrentIdx(0)
    }
  }, [wrongBookMode])

  const handleMastery = (level) => {
    const updated = [...mastery]
    updated[currentIdx] = level
    setMastery(updated)
    setStudiedSet((prev) => new Set(prev).add(current.id))
  }

  const goNext = () => {
    const list = displayIndices
    const pos = list.indexOf(currentIdx)
    if (pos < list.length - 1) setCurrentIdx(list[pos + 1])
  }

  const goPrev = () => {
    const list = displayIndices
    const pos = list.indexOf(currentIdx)
    if (pos > 0) setCurrentIdx(list[pos - 1])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') goPrev()
    if (e.key === 'ArrowRight') goNext()
  }

  const canGoPrev = displayPos > 0
  const canGoNext = displayPos < displayIndices.length - 1

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto" onKeyDown={handleKeyDown} tabIndex={0}>
      <PageHeader
        icon="📚"
        title={wrongBookMode ? '错词本' : '单词学习'}
        subtitle={wrongBookMode ? `${wrongWordIndices.length} 个待复习单词` : '考研核心高频词汇 · AI 智能记忆'}
        actions={
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-slate-500">
              今日已学 <strong className="text-indigo-600">{studiedToday}</strong>
            </span>
            <span className="hidden sm:inline text-slate-500">
              已掌握 <strong className="text-emerald-600">{mastered}</strong>
            </span>
          </div>
        }
      />

      {/* Study Stats & Wrong Book Toggle */}
      <div className="flex items-center justify-between gap-3 mt-2 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-100">
            <span>今日学习</span>
            <strong className="text-indigo-600">{studiedToday}</strong>
            <span className="text-slate-300">/</span>
            <span>{totalWords}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 rounded-lg px-3 py-1.5 border border-slate-100">
            <span>已掌握</span>
            <strong className="text-emerald-600">{mastered}</strong>
            <span className="text-slate-300">/</span>
            <span>{totalWords}</span>
          </div>
        </div>
        <button
          onClick={() => setWrongBookMode(!wrongBookMode)}
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-all duration-200 active:scale-[0.97] ${
            wrongBookMode
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-white border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-600'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          错词本
          {!wrongBookMode && wrongWordIndices.length > 0 && (
            <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold">
              {wrongWordIndices.length}
            </span>
          )}
          {wrongBookMode && (
            <span className="text-red-500">({wrongWordIndices.length})</span>
          )}
        </button>
      </div>

      {/* Progress */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500"
            style={{ width: `${((displayPos + 1) / Math.max(1, displayIndices.length)) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium text-slate-500 flex-shrink-0">
          {displayPos + 1} / {displayIndices.length}
        </span>
      </div>

      {/* Empty state for wrong book */}
      {wrongBookMode && wrongWordIndices.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">错词本已清空</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed mb-6">
            太棒了！你已经掌握了所有单词，暂时没有需要复习的错词。
          </p>
          <button
            onClick={() => setWrongBookMode(false)}
            className="btn-primary"
          >
            返回全部单词
          </button>
        </div>
      ) : (
        <>
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
        </>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className="btn-secondary flex items-center gap-2 disabled:opacity-40"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          上一个
        </button>

        {/* Quick word selector dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {displayIndices.map((wordIdx, i) => (
            <button
              key={wordIdx}
              onClick={() => setCurrentIdx(wordIdx)}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-200
                ${wordIdx === currentIdx
                  ? 'bg-indigo-600 scale-125 shadow-sm shadow-indigo-500/50'
                  : mastery[wordIdx] >= 2
                    ? 'bg-emerald-300'
                    : 'bg-slate-300 hover:bg-slate-400'
                }
              `}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={!canGoNext}
          className="btn-primary flex items-center gap-2 disabled:opacity-40"
        >
          {displayPos === displayIndices.length - 1 && wrongBookMode ? '完成复习' : '下一个'}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="text-center text-xs text-slate-400 mt-6">
        💡 使用键盘 ← → 方向键快速切换单词 · 点击 👁 切换释义 · 标记"陌生/模糊"的单词自动进入错词本
      </p>
    </div>
  )
}