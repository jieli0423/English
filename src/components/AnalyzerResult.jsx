const sectionStyles = {
  main: {
    container: 'border-l-4 border-l-indigo-500',
    titleClass: 'text-indigo-700',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
}

function Section({ title, icon, children, className = '' }) {
  return (
    <div className={`card p-5 sm:p-6 ${className}`}>
      <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function AnalyzerResult({ result }) {
  return (
    <div className="animate-slide-up space-y-4">
      {/* 主干结构 */}
      <div className={`card p-5 sm:p-6 border-l-4 border-l-indigo-500`}>
        <h3 className="text-sm font-semibold text-indigo-700 mb-3 flex items-center gap-2">
          {sectionStyles.main.icon}
          主干结构
        </h3>
        <p className="text-slate-800 font-medium leading-relaxed text-base">{result.main}</p>
      </div>

      {/* 从句分析 */}
      {result.clauses && result.clauses.length > 0 && (
        <Section
          title="从句分析"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          <div className="space-y-3">
            {result.clauses.map((clause, i) => (
              <div key={i} className="p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
                    {clause.type}
                  </span>
                </div>
                <p className="text-sm text-slate-800 leading-relaxed">{clause.text}</p>
                <p className="text-xs text-slate-500 mt-1">{clause.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 修饰成分 */}
      {result.modifiers && result.modifiers.length > 0 && (
        <Section
          title="修饰成分"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          }
        >
          <div className="grid sm:grid-cols-2 gap-3">
            {result.modifiers.map((mod, i) => (
              <div key={i} className="p-3 rounded-xl bg-amber-50 border border-amber-100">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 mb-1">
                  {mod.type}
                </span>
                <p className="text-sm text-slate-800 leading-relaxed">{mod.text}</p>
                <p className="text-xs text-slate-500 mt-1">{mod.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 重点词汇 */}
      {result.keyWords && result.keyWords.length > 0 && (
        <Section
          title="重点词汇"
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {result.keyWords.map((kw, i) => (
              <div key={i} className="p-3 rounded-xl bg-violet-50 border border-violet-100">
                <p className="font-medium text-slate-900 text-sm">{kw.word}</p>
                <p className="text-xs text-slate-500 mt-0.5">{kw.meaning}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 中文翻译 */}
      {result.translation && (
        <div className="card p-5 sm:p-6 border-l-4 border-l-emerald-500">
          <h3 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            中文翻译
          </h3>
          <p className="text-slate-700 leading-relaxed">{result.translation}</p>
        </div>
      )}
    </div>
  )
}
