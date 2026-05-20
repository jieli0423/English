import { useState, useMemo } from 'react'
import { vocabularyData } from '../data/mockData'
import VocabularyCard from './VocabularyCard'
import PageHeader from './ui/PageHeader'

const GOALS = [50, 60, 70, 80, 90, 100]
const RATIOS = [
  { value: 2, label: '1 : 2', desc: '每 1 个新词配 2 个复习词' },
  { value: 3, label: '1 : 3', desc: '每 1 个新词配 3 个复习词' },
]

const LEVELS = [
  { value: 0, label: '陌生', color: 'bg-red-500 text-white border-red-500', hover: 'hover:border-red-300 hover:bg-red-50' },
  { value: 1, label: '模糊', color: 'bg-amber-500 text-white border-amber-500', hover: 'hover:border-amber-300 hover:bg-amber-50' },
  { value: 2, label: '熟悉', color: 'bg-blue-500 text-white border-blue-500', hover: 'hover:border-blue-300 hover:bg-blue-50' },
  { value: 3, label: '已掌握', color: 'bg-emerald-500 text-white border-emerald-500', hover: 'hover:border-emerald-300 hover:bg-emerald-50' },
]

const LEVEL_LABELS = { 0: '陌生', 1: '模糊', 2: '熟悉', 3: '已掌握' }
const LEVEL_COLORS = { 0: 'bg-red-100 text-red-700', 1: 'bg-amber-100 text-amber-700', 2: 'bg-blue-100 text-blue-700', 3: 'bg-emerald-100 text-emerald-700' }

// ---------- localStorage helpers ----------
function loadSetting(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback } catch { return fallback }
}
function saveSetting(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* noop */ }
}

function getToday() {
  return new Date().toDateString()
}

export default function Vocabulary() {
  // ---------- State ----------
  const [mode, setMode] = useState('settings') // settings | learning | complete
  const [dailyGoal, setDailyGoal] = useState(() => loadSetting('vocab_daily_goal', 60))
  const [ratio, setRatio] = useState(() => loadSetting('vocab_daily_ratio', 2))
  const [masteryMap, setMasteryMap] = useState(() => loadSetting('vocab_mastery', {}))
  const [completedIds, setCompletedIds] = useState(() => {
    const savedDate = loadSetting('vocab_completed_date', '')
    return savedDate === getToday() ? loadSetting('vocab_completed', []) : []
  })
  const [currentIdx, setCurrentIdx] = useState(0)
  const [showMeaning, setShowMeaning] = useState(true)

  // ---------- Persist settings ----------
  const updateGoal = (g) => { setDailyGoal(g); saveSetting('vocab_daily_goal', g) }
  const updateRatio = (r) => { setRatio(r); saveSetting('vocab_daily_ratio', r) }

  // ---------- Computed ----------
  const allWords = vocabularyData
  const newWords = useMemo(() => allWords.filter((w) => w.isNew), [allWords])
  const reviewWords = useMemo(() => allWords.filter((w) => !w.isNew), [allWords])

  const newCount = Math.round(dailyGoal / (ratio + 1))
  const reviewCount = dailyGoal - newCount

  // Filter out already-completed words for today, then take what we need
  const availableNew = newWords.filter((w) => !completedIds.includes(w.id))
  const availableReview = reviewWords.filter((w) => !completedIds.includes(w.id))

  const todayNewWords = useMemo(() => availableNew.slice(0, newCount), [availableNew, newCount])
  const todayReviewWords = useMemo(() => availableReview.slice(0, reviewCount), [availableReview, reviewCount])
  // Order: new words first, then review words
  const todayWordList = useMemo(() => [...todayNewWords, ...todayReviewWords], [todayNewWords, todayReviewWords])

  const current = todayWordList[currentIdx] || null
  const totalPlanned = todayWordList.length
  const completedToday = completedIds.length
  const remaining = Math.max(0, dailyGoal - completedToday)
  const progressPct = dailyGoal > 0 ? Math.min(100, Math.round((completedToday / dailyGoal) * 100)) : 0
  const isNewWord = current ? current.isNew : false

  // Stats for completion page
  const completedWords = allWords.filter((w) => completedIds.includes(w.id))
  const newDone = completedWords.filter((w) => w.isNew).length
  const reviewDone = completedWords.filter((w) => !w.isNew).length
  const levelDist = { 0: 0, 1: 0, 2: 0, 3: 0 }
  completedWords.forEach((w) => {
    const lvl = masteryMap[w.id] ?? w.masterLevel
    if (lvl in levelDist) levelDist[lvl]++
  })
  const isAllFinished = currentIdx >= todayWordList.length

  // ---------- Actions ----------
  const startLearning = () => {
    setCurrentIdx(0)
    setMode('learning')
  }

  const handleMastery = (level) => {
    if (!current) return
    const id = current.id
    const newMap = { ...masteryMap, [id]: level }
    const newCompleted = completedIds.includes(id) ? completedIds : [...completedIds, id]

    setMasteryMap(newMap)
    setCompletedIds(newCompleted)
    saveSetting('vocab_mastery', newMap)
    saveSetting('vocab_completed', newCompleted)
    saveSetting('vocab_completed_date', getToday())

    if (currentIdx + 1 >= todayWordList.length) {
      setMode('complete')
    } else {
      setCurrentIdx(currentIdx + 1)
      setShowMeaning(true)
    }
  }

  const handleRestart = () => {
    setMode('settings')
    setCurrentIdx(0)
    setShowMeaning(true)
  }

  const handleResetToday = () => {
    setCompletedIds([])
    setMasteryMap({})
    setCurrentIdx(0)
    setMode('settings')
    saveSetting('vocab_completed', [])
    saveSetting('vocab_mastery', {})
    saveSetting('vocab_completed_date', getToday())
  }

  // ---------- Render: Settings Mode ----------
  if (mode === 'settings') {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <PageHeader
          icon=""
          title="每日背词"
          subtitle="自定义每日学习任务 · AI 智能记忆"
        />

        {/* Settings Card */}
        <div className="card p-5 sm:p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            学习设置
          </h3>

          {/* Daily Goal */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">每日目标词数</label>
            <div className="flex flex-wrap gap-2">
              {GOALS.map((g) => (
                <button
                  key={g}
                  onClick={() => updateGoal(g)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-150 active:scale-[0.97] ${
                    dailyGoal === g
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                  }`}
                >
                  {g} 词
                </button>
              ))}
            </div>
          </div>

          {/* Ratio */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              新词 <span className="text-slate-400 mx-1">:</span> 复习词 比例
            </label>
            <div className="flex flex-wrap gap-3">
              {RATIOS.map((r) => (
                <button
                  key={r.value}
                  onClick={() => updateRatio(r.value)}
                  className={`px-5 py-3 rounded-xl text-sm border transition-all duration-150 active:scale-[0.97] text-left ${
                    ratio === r.value
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <span className="font-semibold">{r.label}</span>
                  <span className={`text-xs ml-2 ${ratio === r.value ? 'text-indigo-200' : 'text-slate-400'}`}>
                    {r.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Auto-calculated */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-indigo-100/30 border border-indigo-100">
            <div className="grid grid-cols-2 gap-4 text-center text-sm">
              <div>
                <p className="text-indigo-400 text-xs mb-1">今日新词</p>
                <p className="text-2xl font-bold text-indigo-700">
                  {newCount}
                  <span className="text-xs font-normal text-indigo-400 ml-1">个</span>
                </p>
                <p className="text-xs text-indigo-400 mt-0.5">可用 {availableNew.length} 个</p>
              </div>
              <div>
                <p className="text-indigo-400 text-xs mb-1">今日复习词</p>
                <p className="text-2xl font-bold text-indigo-700">
                  {reviewCount}
                  <span className="text-xs font-normal text-indigo-400 ml-1">个</span>
                </p>
                <p className="text-xs text-indigo-400 mt-0.5">可用 {availableReview.length} 个</p>
              </div>
            </div>
          </div>
        </div>

        {/* Task Dashboard */}
        <div className="card p-5 sm:p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            今日任务看板
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500">目标词数</p>
              <p className="text-xl font-bold text-slate-800 mt-1">{dailyGoal}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500">已完成</p>
              <p className="text-xl font-bold text-emerald-600 mt-1">{completedToday}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-500">剩余</p>
              <p className="text-xl font-bold text-indigo-600 mt-1">{remaining}</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-700" style={{ width: `${progressPct}%` }} />
          </div>
          <p className="text-xs text-slate-400 text-right mt-1.5">{progressPct}%</p>

          {/* Quick stats */}
          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
            <span>新词池 <strong className="text-emerald-600">{newWords.length}</strong></span>
            <span>复习池 <strong className="text-indigo-600">{reviewWords.length}</strong></span>
            <span>已掌握 <strong className="text-emerald-600">{Object.values(masteryMap).filter((v) => v >= 2).length}</strong></span>
          </div>
        </div>

        {/* Start / Reset buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={startLearning}
            disabled={totalPlanned === 0}
            className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-base disabled:opacity-40"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {completedToday > 0 ? '继续今日任务' : '开始今日任务'}
          </button>
          {completedToday > 0 && (
            <button onClick={handleResetToday} className="btn-secondary flex items-center justify-center gap-2 py-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              重置今日进度
            </button>
          )}
        </div>

        {totalPlanned === 0 && (
          <p className="text-xs text-amber-600 text-center mt-3">
            所有单词已学完，重置进度后可重新开始
          </p>
        )}
      </div>
    )
  }

  // ---------- Render: Completion ----------
  if (mode === 'complete') {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <PageHeader
          icon=""
          title="今日任务完成"
          subtitle={`完成日期：${new Date().toLocaleDateString('zh-CN')}`}
        />

        {/* Big encouragement */}
        <div className="card p-8 text-center bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0 shadow-lg shadow-indigo-600/20 mb-6">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-2">太棒了！今日任务已完成！</h2>
          <p className="text-indigo-200 text-sm">
            {completedToday >= dailyGoal
              ? '你已完成今日全部目标词数，继续保持！'
              : `今日已学 ${completedToday} 个单词，明天继续加油！`}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="card p-5 text-center">
            <p className="text-xs text-slate-500 mb-1">今日完成</p>
            <p className="text-3xl font-bold text-slate-800">{completedToday}<span className="text-sm font-normal text-slate-400 ml-1">词</span></p>
          </div>
          <div className="card p-5 text-center">
            <p className="text-xs text-slate-500 mb-1">新词完成</p>
            <p className="text-3xl font-bold text-emerald-600">{newDone}<span className="text-sm font-normal text-slate-400 ml-1">词</span></p>
          </div>
          <div className="card p-5 text-center">
            <p className="text-xs text-slate-500 mb-1">复习完成</p>
            <p className="text-3xl font-bold text-indigo-600">{reviewDone}<span className="text-sm font-normal text-slate-400 ml-1">词</span></p>
          </div>
          <div className="card p-5 text-center">
            <p className="text-xs text-slate-500 mb-1">完成率</p>
            <p className="text-3xl font-bold text-emerald-600">{dailyGoal > 0 ? Math.round((completedToday / Math.max(1, dailyGoal)) * 100) : 0}%</p>
          </div>
        </div>

        {/* Mastery Distribution */}
        <div className="card p-5 sm:p-6 mb-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            </svg>
            掌握程度分布
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((lvl) => (
              <div key={lvl} className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                <p className="text-lg font-bold text-slate-800">{levelDist[lvl]}</p>
                <p className={`text-xs mt-1 ${LEVEL_COLORS[lvl].split(' ')[0].replace('bg-', 'text-')}`}>
                  {LEVEL_LABELS[lvl]}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Encouragement */}
        <div className="card p-5 sm:p-6 mb-6 bg-gradient-to-r from-amber-50 to-amber-100/30 border border-amber-100">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💪</span>
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">
                {completedToday >= dailyGoal ? '目标达成！' : '不错的开始！'}
              </p>
              <p className="text-sm text-amber-700 leading-relaxed">
                {completedToday >= dailyGoal
                  ? '坚持每天完成目标，考研词汇量将稳步提升。每天进步一点点，考场之上见真章！'
                  : `今日完成了 ${completedToday} 个单词的学习，虽然还未达到目标 ${dailyGoal} 词，但每一份努力都不会白费。`}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handleRestart} className="btn-primary flex-1 flex items-center justify-center gap-2 py-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回设置
          </button>
          <button onClick={startLearning} className="btn-secondary flex-1 flex items-center justify-center gap-2 py-3">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            继续学习
          </button>
        </div>
      </div>
    )
  }

  // ---------- Render: Learning Mode ----------
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <PageHeader
        icon=""
        title="单词学习"
        subtitle={`第 ${currentIdx + 1} / ${totalPlanned} 词 · 今日进度 ${completedToday} / ${dailyGoal}`}
      />

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-700">
              新词 {newDone}/{Math.min(newCount, todayNewWords.length)}
            </span>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-100 text-indigo-700">
              复习 {reviewDone}/{Math.min(reviewCount, todayReviewWords.length)}
            </span>
          </span>
          <span>{progressPct}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-500" style={{ width: `${(completedToday / Math.max(1, dailyGoal)) * 100}%` }} />
        </div>
      </div>

      {/* Word Card */}
      {current && (
        <VocabularyCard
          word={current}
          showMeaning={showMeaning}
          onToggleMeaning={() => setShowMeaning(!showMeaning)}
          wordType={isNewWord ? 'new' : 'review'}
        />
      )}

      {/* Mastery Buttons */}
      <div className="card p-4 sm:p-6 mb-6">
        <p className="text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          掌握程度
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {LEVELS.map((level) => {
            const isActive = current && masteryMap[current.id] === level.value
            return (
              <button
                key={level.value}
                onClick={() => handleMastery(level.value)}
                className={`
                  py-3 px-4 rounded-xl border-2 font-medium text-sm transition-all duration-200
                  ${isActive ? level.color : `bg-white text-slate-600 border-slate-200 ${level.hover}`}
                  ${isActive ? 'ring-2 ring-offset-2 shadow-md' : 'hover:shadow-sm'}
                  active:scale-[0.97]
                `}
              >
                {level.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Word count remaining */}
      <div className="text-center text-xs text-slate-400">
        已完成 {completedToday} 个，剩余 {Math.max(0, totalPlanned - currentIdx - 1)} 个
      </div>
    </div>
  )
}