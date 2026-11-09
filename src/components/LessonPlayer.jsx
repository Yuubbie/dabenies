import { useMemo, useState } from 'react'
import { CheckCircle2, Download, MessageSquare, Paperclip, Play, Pause, Volume2, Maximize2, Send } from 'lucide-react'
import { modules, lessonComments } from '../data/mock.js'
import Avatar from './Avatar.jsx'
import { currentStudent } from '../data/mock.js'

export default function LessonPlayer({ lessonId, completed, onToggleComplete, onSelectLesson }) {
  const { lesson, module } = useMemo(() => findLesson(lessonId), [lessonId])
  const [tab, setTab] = useState('comments')
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(34)
  const [comments, setComments] = useState(lessonComments[lesson.id] || [])
  const [draft, setDraft] = useState('')
  const done = completed.includes(lesson.id)

  const submit = (e) => {
    e.preventDefault()
    const body = draft.trim()
    if (!body) return
    setComments((prev) => [
      ...prev,
      { id: `n-${Date.now()}`, author: currentStudent.name, avatar: currentStudent.avatar, time: 'Just now', body },
    ])
    setDraft('')
  }

  return (
    <div className="animate-fadeup grid gap-6 xl:grid-cols-[1.7fr_1fr]">
      <div className="space-y-4">
        <div className="overflow-hidden rounded-3xl border border-gold-400/20 bg-navy-900 shadow-gold">
          <div className="relative aspect-video bg-gradient-to-br from-navy-700 via-navy-900 to-navy-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(201,162,39,0.18),transparent_45%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="grid h-16 w-16 place-items-center rounded-full border border-gold-400/40 bg-navy-950/70 text-gold-300 backdrop-blur"
              >
                {playing ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" className="ml-1" />}
              </button>
              <p className="font-display text-2xl text-ivory">{lesson.title}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-gold-300/80">{module.title}</p>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="h-1 w-full cursor-pointer accent-gold-400"
              />
              <div className="mt-2 flex items-center justify-between text-[11px] text-cream/60">
                <span className="inline-flex items-center gap-3">
                  <Volume2 size={14} />
                  {formatTime(progress, lesson.duration)} / {lesson.duration}
                </span>
                <Maximize2 size={14} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-navy-900/80 px-4 py-3">
          <div>
            <h1 className="font-display text-2xl">{lesson.title}</h1>
            <p className="text-xs text-cream/50">{lesson.type} · {lesson.duration}</p>
          </div>
          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
              done ? 'bg-gold-400 text-navy-950' : 'border border-gold-400/40 text-gold-200 hover:bg-gold-400/10'
            }`}
          >
            <CheckCircle2 size={16} />
            {done ? 'Lesson complete' : 'Mark complete'}
          </button>
        </div>

        <div className="rounded-2xl border border-white/8 bg-navy-900/80">
          <div className="flex gap-1 border-b border-white/5 p-2">
            {[
              { id: 'comments', label: 'Discussion', icon: MessageSquare },
              { id: 'resources', label: 'Resources', icon: Paperclip },
            ].map((t) => {
              const Icon = t.icon
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                    tab === t.id ? 'bg-gold-400/15 text-gold-200' : 'text-cream/60 hover:text-ivory'
                  }`}
                >
                  <Icon size={14} />
                  {t.label}
                </button>
              )
            })}
          </div>
          {tab === 'comments' ? (
            <div className="p-4">
              <form onSubmit={submit} className="mb-4 flex gap-2">
                <Avatar initials={currentStudent.avatar} size="sm" />
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Share a takeaway from this lesson…"
                  className="flex-1 rounded-xl border border-white/10 bg-navy-800 px-3 py-2 text-sm outline-none placeholder:text-cream/30 focus:border-gold-400/40"
                />
                <button type="submit" className="rounded-xl bg-gold-400/20 px-3 text-gold-200">
                  <Send size={16} />
                </button>
              </form>
              <div className="space-y-4">
                {comments.length === 0 && <p className="text-sm text-cream/40">Be the first to leave a reflection.</p>}
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <Avatar initials={c.avatar} size="sm" gold={c.author.includes('Joy')} />
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{c.author}</span>
                        <span className="ml-2 text-xs text-cream/40">{c.time}</span>
                      </p>
                      <p className="mt-0.5 text-sm text-cream/70">{c.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {[lesson.resource, 'Session Notes.pdf', 'Transcript.vtt'].map((name) => (
                <button
                  key={name}
                  className="flex w-full items-center justify-between rounded-xl border border-white/8 bg-navy-800/70 px-4 py-3 text-sm hover:border-gold-400/30"
                >
                  <span>{name}</span>
                  <span className="inline-flex items-center gap-1 text-xs text-gold-300">
                    <Download size={14} />
                    Download
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <aside className="rounded-2xl border border-white/8 bg-navy-900/80 p-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold-300/80">Up next in this module</p>
        <ul className="mt-3 space-y-1">
          {module.lessons.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => onSelectLesson(l.id)}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm ${
                  l.id === lesson.id ? 'bg-gold-400/15 text-gold-200' : 'text-cream/70 hover:bg-white/5'
                }`}
              >
                {completed.includes(l.id) ? <CheckCircle2 size={14} className="text-gold-400" /> : <span className="h-3.5 w-3.5 rounded-full border border-cream/30" />}
                <span className="flex-1">{l.title}</span>
                <span className="text-[11px] text-cream/40">{l.duration}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}

function findLesson(id) {
  for (const module of modules) {
    const lesson = module.lessons.find((l) => l.id === id)
    if (lesson) return { lesson, module }
  }
  const module = modules[0]
  return { lesson: module.lessons[0], module }
}

function formatTime(pct, duration) {
  const [m, s] = duration.split(':').map(Number)
  const total = m * 60 + s
  const cur = Math.round((pct / 100) * total)
  const mm = String(Math.floor(cur / 60)).padStart(2, '0')
  const ss = String(cur % 60).padStart(2, '0')
  return `${mm}:${ss}`
}
