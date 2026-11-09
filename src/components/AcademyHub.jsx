import { Play, Clock, BookOpen, CheckCircle2, Lock } from 'lucide-react'
import ProgressBar from './ProgressBar.jsx'
import { modules } from '../data/mock.js'

export default function AcademyHub({ completed, onOpenLesson }) {
  const total = modules.reduce((n, m) => n + m.lessons.length, 0)
  const done = completed.length
  const pct = Math.round((done / total) * 100)

  return (
    <div className="animate-fadeup space-y-8">
      <section className="overflow-hidden rounded-3xl border border-gold-400/20 bg-navy-800/60 shadow-gold">
        <div className="grid gap-6 p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold-300">Dabenies Curriculum</p>
            <h1 className="mt-2 font-display text-4xl leading-tight text-ivory md:text-5xl">
              Monetize like a pro, not a group chat.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/70">
              Dr. Joy Benny trains creators in affiliate marketing, Twitter monetization, content systems,
              and video editing — a structured academy that replaces noisy Telegram threads with real skill.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenLesson(findNext(completed))}
                className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 hover:bg-gold-300"
              >
                <Play size={16} fill="currentColor" />
                Continue learning
              </button>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs text-cream/70">
                <BookOpen size={14} />
                {done} of {total} lessons shipped
              </span>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-navy-950/50 p-5">
            <ProgressBar value={pct} label="Academy progress" />
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <Stat label="Cohort" value="Cashflow 04" />
              <Stat label="Pace" value="On track" />
              <Stat label="Next live" value="Thu 7pm" />
              <Stat label="Mentor" value="Dr. Joy" />
            </div>
          </div>
        </div>
        <div className="gold-line h-px w-full" />
      </section>

      <div className="space-y-5">
        {modules.map((mod, idx) => {
          const mDone = mod.lessons.filter((l) => completed.includes(l.id)).length
          const mPct = Math.round((mDone / mod.lessons.length) * 100)
          const unlocked = idx === 0 || modules[idx - 1].lessons.every((l) => completed.includes(l.id)) || mDone > 0 || idx < 3
          return (
            <article key={mod.id} className="rounded-2xl border border-white/8 bg-navy-900/70 p-5 md:p-6">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl text-ivory">{mod.title}</h2>
                  <p className="mt-1 text-sm text-cream/60">{mod.subtitle}</p>
                </div>
                <div className="flex items-center gap-3 text-xs text-cream/50">
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} />
                    {mod.duration}
                  </span>
                  <span className="w-32">
                    <ProgressBar value={mPct} />
                  </span>
                </div>
              </div>
              <ul className="divide-y divide-white/5">
                {mod.lessons.map((lesson, li) => {
                  const isDone = completed.includes(lesson.id)
                  const locked = !unlocked && li > 0 && !completed.includes(mod.lessons[li - 1]?.id)
                  return (
                    <li key={lesson.id}>
                      <button
                        disabled={locked}
                        onClick={() => onOpenLesson(lesson.id)}
                        className="flex w-full items-center gap-3 py-3 text-left hover:bg-white/[0.03] disabled:opacity-40"
                      >
                        {isDone ? (
                          <CheckCircle2 size={18} className="text-gold-400" />
                        ) : locked ? (
                          <Lock size={16} className="text-cream/30" />
                        ) : (
                          <span className="grid h-[18px] w-[18px] place-items-center rounded-full border border-cream/30" />
                        )}
                        <span className="flex-1 text-sm">{lesson.title}</span>
                        <span className="text-[11px] uppercase tracking-wider text-cream/40">{lesson.type}</span>
                        <span className="text-xs text-cream/50">{lesson.duration}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/5 bg-navy-800/60 px-3 py-2">
      <p className="text-[10px] uppercase tracking-wider text-cream/40">{label}</p>
      <p className="text-sm text-ivory">{value}</p>
    </div>
  )
}

function findNext(completed) {
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      if (!completed.includes(lesson.id)) return lesson.id
    }
  }
  return modules[0].lessons[0].id
}
