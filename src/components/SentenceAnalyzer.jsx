import { useState } from 'react'
import { sentenceLibrary } from '../data/mockData'
import { analyzeSentence } from '../services/api'
import { API_MESSAGES } from '../services/prompts'
import AnalyzerResult from './AnalyzerResult'
import PageHeader from './ui/PageHeader'

const analysisSteps = [
  { label: '正在识别句子主干...', key: 'main' },
  { label: '正在分析从句结构...', key: 'clauses' },
  { label: '正在提取修饰成分...', key: 'modifiers' },
  { label: '正在标记重点词汇...', key: 'keywords' },
  { label: '正在标注考点...', key: 'examTips' },
  { label: '正在生成中文翻译...', key: 'translation' },
]

function getMockFallback(text) {
  const found = sentenceLibrary.find((s) => s.sentence.trim() === text.trim())
  if (found) {
    return { data: found.analysis, isMock: false }
  }
  return {
    data: {
      main: '无法精确解析自定义句子，请选择下方的例句进行体验。',
      clauses: [],
      modifiers: [],
      keyWords: [],
      translation: '（自定义输入暂不支持深度解析，请选择预设例句）',
      examTips: [
        { tip: '建议选择左侧预设例句体验完整解析功能', type: '提示' },
        { tip: '自定义解析功能即将上线，敬请期待', type: '提示' },
      ],
    },
    isMock: false,
  }
}

export default function SentenceAnalyzer() {
  const [input, setInput] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)
  const [selectedExample, setSelectedExample] = useState(null)
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(-1)
  const [usingFallback, setUsingFallback] = useState(false)

  const doAnalyze = async (text) => {
    setAnalyzing(true)
    setResult(null)
    setCurrentStep(0)
    setError('')
    setUsingFallback(false)

    // Start step animation
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < analysisSteps.length - 1) return prev + 1
        clearInterval(stepInterval)
        return prev
      })
    }, 400)

    try {
      const data = await analyzeSentence(text)
      clearInterval(stepInterval)
      setCurrentStep(analysisSteps.length)

      // Ensure arrays exist for component compatibility
      setResult({
        main: data.main || '',
        clauses: data.clauses || [],
        modifiers: data.modifiers || [],
        keyWords: data.keyWords || [],
        translation: data.translation || '',
        examTips: data.examTips || [],
      })
    } catch (err) {
      clearInterval(stepInterval)
      setCurrentStep(analysisSteps.length)

      if (err.needConfig || err.status === 503) {
        setError(API_MESSAGES.noKey)
      } else if (err.status === 502) {
        setError(err.message || API_MESSAGES.serverError)
      } else {
        setError(API_MESSAGES.networkError)
      }

      // Fallback to mock data
      const fallback = getMockFallback(text)
      setResult(fallback.data)
      setUsingFallback(true)
    } finally {
      setAnalyzing(false)
      setCurrentStep(-1)
    }
  }

  const handleAnalyze = () => {
    const text = input.trim() || (selectedExample && selectedExample.sentence) || ''
    if (!text) {
      setError('请输入要分析的英文句子')
      return
    }
    doAnalyze(text)
  }

  const handleRegenerate = () => {
    const text = input.trim() || (selectedExample && selectedExample.sentence) || ''
    if (text) doAnalyze(text)
  }

  const handleCopy = (res) => {
    const text = [
      `句子主干：${res.main}`,
      '',
      ...(res.clauses || []).map((c) => `[${c.type}] ${c.text}（${c.desc}）`),
      '',
      ...(res.modifiers || []).map((m) => `[${m.type}] ${m.text}（${m.desc}）`),
      '',
      ...(res.keyWords || []).map((k) => `${k.word} — ${k.meaning}`),
      '',
      ...(res.examTips || []).map((t) => `【${t.type}】${t.tip}`),
      '',
      `中文翻译：${res.translation}`,
    ].join('\n')
    navigator.clipboard.writeText(text)
  }

  const loadExample = (item) => {
    setSelectedExample(item)
    setInput(item.sentence)
    setResult(null)
    setError('')
    setUsingFallback(false)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <PageHeader
        icon="🔍"
        title="AI 长难句解析"
        subtitle="基于 DeepSeek 大模型的长难句语法分析，一键拆解句子结构"
      />

      {/* Input Area */}
      <div className="card p-5 sm:p-6 mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          输入英文句子
        </label>
        <textarea
          value={input}
          onChange={(e) => { setInput(e.target.value); setError(''); setUsingFallback(false) }}
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
        <h2 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          选择预设例句体验
        </h2>
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

      {/* Step-by-step Loading State */}
      {analyzing && (
        <div className="card p-8 sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-200 animate-pulse">
                AI
              </div>
              <div>
                <p className="text-slate-700 font-semibold">AI 正在深度解析...</p>
                <p className="text-slate-400 text-xs mt-0.5">正在逐层拆解句子结构</p>
              </div>
            </div>
            <div className="space-y-3">
              {analysisSteps.map((step, i) => {
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

      {/* Result */}
      {result && !analyzing && (
        <>
          {usingFallback && (
            <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-sm text-amber-700">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>{API_MESSAGES.fallback}</span>
            </div>
          )}
          <AnalyzerResult
            result={result}
            onRegenerate={handleRegenerate}
            onCopy={handleCopy}
          />
        </>
      )}

      {/* Empty State */}
      {!result && !analyzing && (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🔬</div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">等待解析</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            在上方输入框中粘贴考研英语长难句，或选择一个预设例句，点击"开始解析"即可调用 DeepSeek AI 分析结果
          </p>
        </div>
      )}
    </div>
  )
}