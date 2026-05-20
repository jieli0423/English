export default function ReadingQuestion({ question, index, selected, showResult, isCorrect, onSelect, submitted }) {
  return (
    <div
      className={`card p-4 sm:p-5 transition-all duration-200 ${
        submitted ? (isCorrect ? 'ring-1 ring-emerald-300' : 'ring-1 ring-red-300') : ''
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium flex items-center justify-center flex-shrink-0">
          {index + 1}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
          {question.type}
        </span>
      </div>

      <p className="text-sm text-slate-800 font-medium mb-3 leading-relaxed">{question.question}</p>

      <div className="space-y-2">
        {question.options.map((opt, oi) => {
          const isSelected = selected === oi
          const isCorrectOpt = question.correct === oi
          const showCorrect = submitted && isCorrectOpt
          const showWrong = submitted && isSelected && !isCorrectOpt

          return (
            <button
              key={oi}
              onClick={() => onSelect(question.id, oi)}
              disabled={submitted}
              className={`
                w-full text-left p-3 rounded-xl border text-sm transition-all duration-200
                ${showCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : showWrong
                    ? 'bg-red-50 border-red-300 text-red-800'
                    : isSelected
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/30'
                }
              `}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span>
              <span>{opt.slice(3)}</span>
            </button>
          )
        })}
      </div>

      {/* 答案解析 */}
      {submitted && (
        <div className="mt-4 animate-slide-up space-y-2">
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs font-medium text-blue-700 mb-1">✅ 答案解析</p>
            <p className="text-xs text-slate-600 leading-relaxed">{question.explanation}</p>
          </div>
          {!isCorrect && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100">
              <p className="text-xs font-medium text-red-700 mb-1">❌ 错因分析</p>
              <p className="text-xs text-slate-600 leading-relaxed">{question.errorAnalysis}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
