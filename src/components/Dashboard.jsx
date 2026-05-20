import { useNavigate } from 'react-router-dom'

const tools = [
  {
    id: 'sentence',
    title: 'AI 长难句解析',
    desc: '一键拆解句子主干、从句、修饰成分，标注考研核心词汇和语法考点，再难的句子也能看懂。',
    link: '/sentence-analyzer',
    color: 'from-indigo-500 to-indigo-600',
    shadow: 'shadow-indigo-500/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    id: 'reading',
    title: 'AI 阅读精讲',
    desc: '逐题精讲阅读文章，分析定位句、正确选项和干扰项，总结考研阅读六大题型的解题技巧。',
    link: '/reading',
    color: 'from-emerald-500 to-emerald-600',
    shadow: 'shadow-emerald-500/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: 'writing',
    title: 'AI 作文批改',
    desc: '基于考研评分标准的智能批改，检测语法错误、提供高级表达替换、生成润色范文，附送提分建议。',
    link: '/writing',
    color: 'from-violet-500 to-violet-600',
    shadow: 'shadow-violet-500/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    id: 'vocabulary',
    title: 'AI 单词记忆助手',
    desc: '根据遗忘曲线推送考研核心词汇，配合真题例句和词根词缀记忆法，高效扩充词汇量。',
    link: '/vocabulary',
    color: 'from-amber-500 to-amber-600',
    shadow: 'shadow-amber-500/20',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
]

const steps = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
      </svg>
    ),
    title: '输入内容',
    desc: '粘贴考研英语长难句、上传作文或选择阅读文章',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'AI 分析',
    desc: 'DeepSeek 大模型逐层拆解，6 步可视化分析过程',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: '获得提分建议',
    desc: '结构化展示分析结果，标注考研考点，附带实战技巧',
  },
]

const audiences = [
  {
    title: '看不懂长难句',
    desc: '遇到长句子就头晕，分不清主干和修饰，阅读速度提不上来。',
    gradient: 'from-indigo-50 to-indigo-100/30',
    border: 'border-indigo-100',
    icon: (
      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    link: '/sentence-analyzer',
  },
  {
    title: '阅读总是错',
    desc: '文章读懂了题却做不对，定位句找不准，干扰项分辨困难。',
    gradient: 'from-emerald-50 to-emerald-100/30',
    border: 'border-emerald-100',
    icon: (
      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    link: '/reading',
  },
  {
    title: '作文不会改',
    desc: '写完作文不知道哪里扣分，不会润色提升，分数一直上不去。',
    gradient: 'from-violet-50 to-violet-100/30',
    border: 'border-violet-100',
    icon: (
      <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
    link: '/writing',
  },
  {
    title: '单词记不住',
    desc: '背了忘忘了背，缺乏科学复习计划，真题词汇覆盖率低。',
    gradient: 'from-amber-50 to-amber-100/30',
    border: 'border-amber-100',
    icon: (
      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    link: '/vocabulary',
  },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-2xl" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-medium border border-white/10 mb-6">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Powered by DeepSeek AI
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              考研英语 AI 学习工具
            </h1>
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-indigo-200 leading-relaxed max-w-2xl mx-auto">
              用 AI 拆解长难句、精讲阅读、批改作文，让每一次练习都变成提分。
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate('/sentence-analyzer')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-indigo-700 rounded-xl font-semibold text-sm hover:bg-indigo-50 active:scale-[0.97] transition-all duration-150 shadow-xl shadow-indigo-900/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                开始长难句解析
              </button>
              <button
                onClick={() => navigate('/writing')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-white/10 text-white rounded-xl font-medium text-sm hover:bg-white/20 active:scale-[0.97] transition-all duration-150 border border-white/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                体验作文批改
              </button>
            </div>

            {/* Feature pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs text-indigo-200">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                无需配置
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                即开即用
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                AI 实时分析
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                考研考点标注
              </span>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      {/* ===== Core Tools Section ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">四大核心工具</h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            覆盖考研英语全部重点难点，用 AI 帮你精准提分
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => navigate(tool.link)}
              className="group card p-6 text-left hover:shadow-lg active:scale-[0.98] transition-all duration-200 flex flex-col"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-lg ${tool.shadow} group-hover:scale-110 transition-transform duration-200`}>
                {tool.icon}
              </div>
              <h3 className="mt-4 font-semibold text-slate-900 text-base">{tool.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed flex-1">{tool.desc}</p>
              <div className="mt-4 flex items-center gap-1 text-xs font-medium text-indigo-600 group-hover:text-indigo-700 transition-colors">
                开始使用
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section className="bg-slate-100/60 border-y border-slate-200/50">
        <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">三步搞定英语难题</h2>
            <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              简单三步，告别盲目刷题，让每次练习都有针对性反馈
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 sm:gap-12">
            {steps.map((step, i) => (
              <div key={i} className="text-center relative">
                {/* Step number */}
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-indigo-600 mb-4">
                    {step.icon}
                  </div>
                </div>
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden sm:block absolute top-8 left-[60%] w-[80%] h-px border-t-2 border-dashed border-slate-300" />
                )}
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold mb-3">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-slate-900 text-base">{step.title}</h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Target Audience ===== */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">适合这样的你</h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
            如果你在备考考研英语时遇到这些困扰，这个工具就是为你准备的
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.link)}
              className={`group card p-5 text-left bg-gradient-to-br ${item.gradient} border ${item.border} hover:shadow-md active:scale-[0.98] transition-all duration-200`}
            >
              <div className={`w-10 h-10 rounded-lg bg-white shadow-sm border ${item.border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="font-semibold text-slate-900 text-sm mb-1.5">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 mb-4">准备好了吗？选择一个工具开始提分之旅</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => navigate(tool.link)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-gradient-to-r ${tool.color} text-white shadow-sm hover:shadow-md active:scale-[0.97] transition-all duration-150`}
              >
                {tool.title.replace('AI ', '')}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                AI
              </span>
              考研英语 AI 学习工具
            </div>
            <p className="text-xs text-slate-400">
              基于 DeepSeek 大模型 · 专为考研英语设计
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}