import { useState } from 'react'
import { sentenceLibrary } from '../data/mockData'
import AnalyzerResult from './AnalyzerResult'
import PageHeader from './ui/PageHeader'

export default function SentenceAnalyzer() {
  const [input, setInput] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [selectedExample, setSelectedExample] = useState(null)
  const [error, setError] = useState('')

  const handleAnalyze = () => {
    const text = input.trim() || (selectedExample && selectedExample.sentence) || ''
    if (!text) {
      setError('请输入要分析的英文句子')
      return
    }
    setError('')
    setAnalyzing(true)
    setResult(null)

    setTimeout(() => {
      const found = sentenceLibrary.find((s) => s.sentence.trim() === text.trim())
      if (found) {
        setResult(found.analysis)
      } else {
        setResult({
          main: '无法精确解析自定义句子，请选择下方的例句进行体验。',
          clauses: [],
          modifiers: [],
          keyWords: [],
          translation: '（自定义输入暂不支持深度解析，请选择预设例句）',
        })
      }
      setAnalyzing(false)
    }, 1500)
  }

  const loadExample = (item) => {
    setSelectedExample(item)
    setInput(item.sentence)
    setResult(null)
    setError('')
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <PageHeader
        icon="🔍"
        title="AI 长难句解析"
        subtitle="基于深度学习的长难句语法分析，一键拆解句子结构"
      />

      {/* Input Area */}
      <div className="card p-5 sm:p-6 mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          输入英文句子
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setError('') }}
          placeholder="粘贴或输入考研英语长难句..."
          className="input-area min-h-[120px] text-sm leading-relaxed resize-y"
          rows={4}
        />
        {error && (
          <p className="text-red-500 text-sm mt-2 flex items-center gap-1.5">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="btn-primary mt-4 w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {analyzing ? (
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              开始解析
            </>
          )}
        </button>
      </div>

      {/* Example Sentences */}
      <div className="card p-5 sm:p-6 mb-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">📌 选择预设例句体验</h2>
        <div className="space-y-2.5">
          {sentenceLibrary.map((item, i) => (
            <button
              key={i}
              onClick={() => loadExample(item)}
              className={`
                w-full text-left p-3 sm:p-4 rounded-xl border text-sm leading-relaxed
                transition-all duration-200
                ${selectedExample === item
                  ? 'border-indigo-300 bg-indigo-50 text-indigo-900 shadow-sm'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50'
                }
                active:scale-[0.98]
              `}
            >
              <span className="line-clamp-2">{item.sentence.slice(0, 120)}...</span>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {analyzing && (
        <div className="card p-10 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 rounded-full border-[3px] border-indigo-100 border-t-indigo-600 animate-spin mx-auto mb-5" />
            <p className="text-slate-600 font-medium">AI 正在解析句子结构...</p>
            <div className="flex items-center gap-2 mt-4 justify-center">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      {/* Result */}
      {result && !analyzing && <AnalyzerResult result={result} />}

      {/* Empty State */}
      {!result && !analyzing && (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🔬</div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">等待解析</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            在上方输入框中粘贴考研英语长难句，或选择一个预设例句，点击"开始解析"即可查看 AI 分析结果
          </p>
        </div>
      )}
    </div>
  )
}
