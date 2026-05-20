import { useState } from 'react'
import { writingData, mockWritingReview } from '../data/mockData'
import WritingFeedback from './WritingFeedback'
import PageHeader from './ui/PageHeader'

export default function WritingReview() {
  const [essay, setEssay] = useState('')
  const [reviewing, setReviewing] = useState(false)
  const [result, setResult] = useState(null)

  const handleReview = () => {
    if (!essay.trim()) return
    setReviewing(true)
    setResult(null)

    setTimeout(() => {
      setResult(mockWritingReview)
      setReviewing(false)
    }, 2000)
  }

  const loadSample = () => {
    setEssay(writingData.sampleEssay)
    setResult(null)
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
              onChange={(e) => setEssay(e.target.value)}
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
          </div>
        </div>

        {/* Right: Results */}
        <div>
          {reviewing && (
            <div className="card p-10 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-[3px] border-indigo-100 border-t-indigo-600 animate-spin mx-auto mb-5" />
                <p className="text-slate-600 font-medium">AI 正在批改你的作文...</p>
                <p className="text-slate-400 text-sm mt-2">正在检测语法错误、分析表达水平</p>
              </div>
            </div>
          )}

          {result && !reviewing && <WritingFeedback result={result} />}

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
