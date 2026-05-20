import { useState } from 'react'

export default function VocabularyCard({ word, showMeaning, onToggleMeaning }) {
  const [expandedConfusing, setExpandedConfusing] = useState(false)

  return (
    <div className="card p-6 sm:p-8 mb-6 animate-slide-up">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{word.word}</h2>
            <button
              onClick={onToggleMeaning}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              title={showMeaning ? '隐藏释义' : '显示释义'}
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {showMeaning ? (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </>
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </>
                )}
              </svg>
            </button>
          </div>
          <p className="text-slate-400 text-sm mb-1">{word.phonetic}</p>
          {showMeaning && (
            <p className="text-lg text-indigo-700 font-medium animate-fade-in">{word.meaning}</p>
          )}
        </div>
      </div>

      {/* 真题例句 */}
      <div className="mb-5 p-4 bg-gradient-to-r from-indigo-50 to-indigo-50/50 rounded-xl border border-indigo-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">📝 真题例句</span>
        </div>
        <p className="text-slate-700 leading-relaxed mb-2">{word.example}</p>
        {showMeaning && (
          <p className="text-slate-500 text-sm border-t border-indigo-200/50 pt-2 mt-2 animate-fade-in">{word.exampleTrans}</p>
        )}
      </div>

      {/* 词根词缀 */}
      <div className="mb-5 p-4 bg-gradient-to-r from-amber-50 to-amber-50/50 rounded-xl border border-amber-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">🔤 词根词缀</span>
        </div>
        <p className="text-slate-700">{word.root}</p>
      </div>

      {/* 易混词 */}
      <div>
        <button
          onClick={() => setExpandedConfusing(!expandedConfusing)}
          className="flex items-center gap-2 mb-3 text-xs font-semibold text-violet-600 uppercase tracking-wider hover:text-violet-700 transition-colors"
        >
          🔀 易混词辨析（{word.confusing.length} 组）
          <svg className={`w-3.5 h-3.5 transition-transform ${expandedConfusing ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {expandedConfusing && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 animate-slide-up">
            {word.confusing.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-violet-50 border border-violet-100">
                <p className="font-medium text-slate-900 text-sm">{item.word}</p>
                <p className="text-xs text-slate-500 mt-0.5">{item.meaning}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
