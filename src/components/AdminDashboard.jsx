import { useMemo, useState } from 'react'
import { Activity, BookOpen, MessageSquare, TrendingUp, Search, Plus, Check } from 'lucide-react'
import { analytics, students as seedStudents, publishDrafts, modules } from '../data/mock.js'
import ProgressBar from './ProgressBar.jsx'
import Avatar from './Avatar.jsx'

export default function AdminDashboard({ view }) {
  if (view === 'students') return <Members />
  if (view === 'publish') return <Publish />
  return <Overview />
}

function Overview() {
  const max = Math.max(...analytics.engagement)
  return (
    <div className="animate-fadeup space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-gold-300">Creator Studio</p>
        <h1 className="font-display text-4xl">Good evening, Dr. Joy</h1>
        <p className="mt-1 text-sm text-cream/55">Your creators are shipping. Here is the pulse of Dabenies Academy.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi icon={Activity} label="Active students" value={analytics.activeStudents} delta={`+${analytics.weeklyDelta.students} this week`} />
        <Kpi icon={TrendingUp} label="Completion rate" value={`${analytics.completionRate}%`} delta={`+${analytics.weeklyDelta.completion}%`} />
        <Kpi icon={MessageSquare} label="Community posts" value={analytics.communityPosts} delta={`+${analytics.weeklyDelta.posts}`} />
        <Kpi icon={BookOpen} label="Avg. watch time" value={analytics.avgWatch} delta={`+${analytics.weeklyDelta.watch}m`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-white/8 bg-navy-900/70 p-5">
          <p className="text-sm text-cream/60">Community engagement · 7 days</p>
          <div className="mt-6 flex h-44 items-end gap-3">
            {analytics.engagement.map((v, i) => (
              <div key={analytics.days[i]} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-gold-700 to-gold-300"
                  style={{ height: `${(v / max) * 100}%` }}
                />
                <span className="text-[10px] text-cream/40">{analytics.days[i]}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-3xl border border-white/8 bg-navy-900/70 p-5">
          <p className="text-sm text-cream/60">Curriculum health</p>
          <div className="mt-4 space-y-4">
            {modules.map((m) => (
              <ProgressBar key={m.id} value={40 + m.lessons.length * 8} label={m.title.replace(/Module \d+: /, '')} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function Kpi({ icon: Icon, label, value, delta }) {
  return (
    <div className="rounded-2xl border border-gold-400/15 bg-navy-900/70 p-4 shadow-gold">
      <div className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-gold-400/10 text-gold-300">
        <Icon size={16} />
      </div>
      <p className="text-[11px] uppercase tracking-wider text-cream/40">{label}</p>
      <p className="font-display text-3xl">{value}</p>
      <p className="text-xs text-gold-300/80">{delta}</p>
    </div>
  )
}

function Members() {
  const [query, setQuery] = useState('')
  const [rows, setRows] = useState(seedStudents)
  const [filter, setFilter] = useState('All')
  const filtered = useMemo(
    () =>
      rows.filter((s) => {
        const q = query.toLowerCase()
        const match = s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
        return match && (filter === 'All' || s.status === filter)
      }),
    [rows, query, filter]
  )

  const cycleStatus = (id) => {
    const order = ['Active', 'At Risk', 'Alumni']
    setRows((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s
        const next = order[(order.indexOf(s.status) + 1) % order.length]
        return { ...s, status: next }
      })
    )
  }

  return (
    <div className="animate-fadeup space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-gold-300">Members</p>
          <h1 className="font-display text-4xl">Steward the room</h1>
        </div>
        <div className="flex gap-2">
          {['All', 'Active', 'At Risk', 'Alumni'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs ${filter === f ? 'bg-gold-400/20 text-gold-200' : 'text-cream/50'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-navy-800 px-3 py-2">
        <Search size={14} className="text-cream/40" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search members…"
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>
      <div className="overflow-hidden rounded-2xl border border-white/8">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-800/80 text-[11px] uppercase tracking-wider text-cream/40">
            <tr>
              <th className="px-4 py-3 font-medium">Member</th>
              <th className="px-4 py-3 font-medium">Cohort</th>
              <th className="px-4 py-3 font-medium">Progress</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Last seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-navy-900/60">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-white/[0.03]">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Avatar initials={s.name.split(' ').map((n) => n[0]).join('')} size="sm" />
                    <div>
                      <p>{s.name}</p>
                      <p className="text-[11px] text-cream/40">{s.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-cream/70">{s.cohort}</td>
                <td className="px-4 py-3 w-40">
                  <ProgressBar value={s.progress} />
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => cycleStatus(s.id)}
                    className={`rounded-full px-2.5 py-0.5 text-[11px] ${
                      s.status === 'Active'
                        ? 'bg-gold-400/15 text-gold-200'
                        : s.status === 'At Risk'
                          ? 'bg-red-400/15 text-red-200'
                          : 'bg-white/10 text-cream/70'
                    }`}
                  >
                    {s.status}
                  </button>
                </td>
                <td className="px-4 py-3 text-cream/50">{s.last}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Publish() {
  const [drafts, setDrafts] = useState(publishDrafts)
  const [title, setTitle] = useState('')
  const [notice, setNotice] = useState('')

  const add = (e) => {
    e.preventDefault()
    const t = title.trim()
    if (!t) return
    setDrafts((d) => [{ id: `nd-${Date.now()}`, title: t, status: 'Draft', lessons: 0, updated: 'Just now' }, ...d])
    setTitle('')
    setNotice('Draft saved to the studio.')
  }

  const publish = (id) => {
    setDrafts((d) => d.map((x) => (x.id === id ? { ...x, status: 'Live', updated: 'Just now' } : x)))
    setNotice('Published to Dabenies Academy.')
  }

  return (
    <div className="animate-fadeup space-y-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.24em] text-gold-300">Publish</p>
        <h1 className="font-display text-4xl">Release with excellence</h1>
      </div>
      <form onSubmit={add} className="flex flex-col gap-3 rounded-2xl border border-gold-400/20 bg-navy-900/70 p-4 sm:flex-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New module or intensive title…"
          className="flex-1 rounded-xl border border-white/10 bg-navy-800 px-3 py-2 text-sm outline-none focus:border-gold-400/40"
        />
        <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold-400 px-4 py-2 text-sm font-medium text-navy-950">
          <Plus size={14} />
          Create draft
        </button>
      </form>
      {notice && <p className="text-sm text-gold-300">{notice}</p>}
      <div className="space-y-3">
        {drafts.map((d) => (
          <div key={d.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/8 bg-navy-900/70 px-4 py-4">
            <div>
              <p className="font-medium">{d.title}</p>
              <p className="text-xs text-cream/45">
                {d.lessons} lessons · {d.updated}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-cream/60">{d.status}</span>
              {d.status !== 'Live' && (
                <button
                  onClick={() => publish(d.id)}
                  className="inline-flex items-center gap-1 rounded-full bg-gold-400/20 px-3 py-1 text-xs text-gold-200"
                >
                  <Check size={12} />
                  Publish
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
