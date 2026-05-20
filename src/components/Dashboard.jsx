import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dashboardData, levelConfig } from '../data/mockData'
import StatCard from './ui/StatCard'
import TaskCard from './ui/TaskCard'
import ProgressCard from './ui/ProgressCard'

export default function Dashboard() {
  const navigate = useNavigate()
  const { userName, stats, progress, todayTasks, recommendations, recentRecords, continueLearning, dailyGoal } = dashboardData
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const dateStr = `${currentTime.getFullYear()}年${currentTime.getMonth() + 1}月${currentTime.getDate()}日`
  const dayOfWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][currentTime.getDay()]

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 6) return '夜深了，早点休息'
    if (hour < 9) return '早上好'
    if (hour < 12) return '上午好'
    if (hour < 14) return '中午好'
    if (hour < 18) return '下午好'
    return '晚上好'
  }

  const examDays = 36
  const completedCount = todayTasks.filter(t => t.completed).length

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              {getGreeting()}，{userName}
              <span className="inline-block ml-2">👋</span>
            </h1>
            <p className="text-slate-500 mt-1.5 text-sm sm:text-base">
              {dateStr} {dayOfWeek}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2.5 px-5 py-2.5 bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm">
            <span className="text-sm text-indigo-600 font-medium">📅 距考研还有</span>
            <span className="text-xl font-bold text-indigo-700">{examDays}</span>
            <span className="text-sm text-indigo-600">天</span>
          </div>
        </div>
      </div>

      {/* Stats Grid: 4 cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🔥" label="连续学习天数" value={stats.streak} unit="天" bgColor="bg-amber-50" trend={12} />
        <StatCard icon="⭐" label="当前等级" value={stats.level} bgColor="bg-indigo-50" />
        <StatCard icon="✅" label="今日任务完成" value={`${stats.tasksCompleted}/${stats.tasksTotal}`} bgColor="bg-emerald-50" />
        <StatCard icon="⏱️" label="累计学习时长" value={stats.studyHours} unit="小时" bgColor="bg-blue-50" trend={8} />
      </div>

      {/* Continue Learning CTA */}
      <div className="card p-5 sm:p-6 mb-8 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-0 shadow-lg shadow-indigo-600/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-2xl">
              🎯
            </div>
            <div>
              <p className="font-semibold text-lg">继续学习</p>
              <p className="text-indigo-200 text-sm mt-0.5">{continueLearning.title}</p>
              <p className="text-indigo-300/80 text-xs mt-0.5">{continueLearning.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => navigate(continueLearning.link)}
            className="px-6 py-2.5 bg-white text-indigo-700 rounded-lg font-semibold text-sm hover:bg-indigo-50 transition-all duration-200 shadow-lg shadow-indigo-900/20 flex items-center gap-2"
          >
            继续学习
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="card p-5 sm:p-6 mb-8">
        <ProgressCard
          label="整体学习进度"
          value={progress}
          detail={`已完成 ${Math.round(5000 * progress / 100)} / 5000 个知识点`}
        />
      </div>

      {/* Level Progress */}
      <div className="grid lg:grid-cols-4 gap-6 mb-8">
        <div className="lg:col-span-1 card p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">🏅 等级进度</h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
              Lv.{levelConfig.current}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{levelConfig.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{levelConfig.xp} / {levelConfig.xpNext} XP</p>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
              style={{ width: `${(levelConfig.xp / levelConfig.xpNext) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
            <span>{levelConfig.milestones.filter(m => m.level <= levelConfig.current).slice(-2)[0]?.title}</span>
            <span>→</span>
            <span className="font-medium text-indigo-600">{levelConfig.milestones.find(m => m.level === levelConfig.current + 1)?.title || 'MAX'}</span>
          </div>
        </div>

        {/* Daily Goal */}
        <div className="lg:col-span-1 card p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">🎯 今日目标</h3>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">📌</span>
            <p className="text-sm text-slate-800 font-medium">{dailyGoal}</p>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-slate-500">完成进度</span>
            <span className="font-semibold text-indigo-600">{completedCount}/{stats.tasksTotal}</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-700"
              style={{ width: `${(completedCount / stats.tasksTotal) * 100}%` }}
            />
          </div>
        </div>

        {/* Recent Study Records */}
        <div className="lg:col-span-2 card p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">📋 最近学习记录</h3>
          <div className="space-y-0">
            {recentRecords.map((record, i) => (
              <div key={record.id} className="flex items-start gap-3 py-3 border-b border-slate-50 last:border-0">
                <div className="relative flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 ring-2 ring-indigo-100" />
                  {i < recentRecords.length - 1 && (
                    <div className="w-px h-full bg-indigo-100 absolute top-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-800">{record.action}</span>
                    <span className="text-xs text-slate-400 flex-shrink-0 ml-2">{record.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{record.detail}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0 mt-1">{record.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's Tasks + Recommendations */}
      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Tasks */}
        <div className="lg:col-span-2 card p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-900">📋 今日学习任务</h2>
            <span className="text-sm text-slate-400">{completedCount}/{todayTasks.length} 已完成</span>
          </div>
          <div className="space-y-2">
            {todayTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="card p-5 sm:p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-5">🎯 今日推荐</h2>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <button
                key={rec.id}
                onClick={() => navigate(rec.link)}
                className="w-full text-left p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${rec.color} flex items-center justify-center text-lg mb-3 group-hover:scale-110 transition-transform`}>
                  {rec.icon}
                </div>
                <h3 className="text-sm font-semibold text-slate-900 mb-1">{rec.title}</h3>
                <p className="text-xs text-slate-500">{rec.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Motivation Quote */}
      <div className="card p-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-0 shadow-lg shadow-indigo-600/20">
        <div className="flex items-start gap-4">
          <span className="text-3xl mt-1">💪</span>
          <div>
            <p className="font-medium text-lg leading-relaxed">"考研不是因为有希望才坚持，而是因为坚持才有希望。"</p>
            <p className="text-indigo-200 text-sm mt-1.5">你已经连续学习 {stats.streak} 天了，每一步都算数！</p>
          </div>
        </div>
      </div>
    </div>
  )
}
