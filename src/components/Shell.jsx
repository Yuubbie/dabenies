import {
  LayoutDashboard,
  GraduationCap,
  PlayCircle,
  MessagesSquare,
  Sparkles,
  BarChart3,
  Users,
  Library,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'
import Logo from './Logo.jsx'
import Avatar from './Avatar.jsx'
import { currentStudent, doctorJoy } from '../data/mock.js'

const studentNav = [
  { id: 'catalog', label: 'Academy Hub', icon: GraduationCap },
  { id: 'lesson', label: 'Active Lesson', icon: PlayCircle },
  { id: 'community', label: 'Community', icon: MessagesSquare },
  { id: 'ai', label: 'Dabenies AI', icon: Sparkles },
]

const adminNav = [
  { id: 'overview', label: 'Overview', icon: BarChart3 },
  { id: 'students', label: 'Members', icon: Users },
  { id: 'publish', label: 'Publish', icon: Library },
]

export default function Shell({
  role,
  onRole,
  view,
  onView,
  children,
  mobileOpen,
  setMobileOpen,
}) {
  const nav = role === 'admin' ? adminNav : studentNav
  const person = role === 'admin' ? doctorJoy : currentStudent

  return (
    <div className="min-h-screen bg-navy-950 bg-luxe text-ivory">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-gold-400/10 bg-navy-900/90 px-4 py-5 lg:flex">
        <Logo />
        <p className="mt-6 px-2 text-[10px] uppercase tracking-[0.24em] text-gold-300/60">
          {role === 'admin' ? 'Creator Studio' : 'Student Portal'}
        </p>
        <nav className="mt-3 flex flex-1 flex-col gap-1">
          {nav.map((item) => {
            const Icon = item.icon
            const active = view === item.id
            return (
              <button
                key={item.id}
                onClick={() => onView(item.id)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? 'bg-gold-400/15 text-gold-200 shadow-gold'
                    : 'text-cream/70 hover:bg-white/5 hover:text-ivory'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <RoleSwitch role={role} onRole={onRole} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-gold-400/10 bg-navy-900 p-4">
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button onClick={() => setMobileOpen(false)} className="rounded-lg p-2 hover:bg-white/5">
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {nav.map((item) => {
                const Icon = item.icon
                const active = view === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onView(item.id)
                      setMobileOpen(false)
                    }}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                      active ? 'bg-gold-400/15 text-gold-200' : 'text-cream/70'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                )
              })}
            </nav>
            <div className="mt-6">
              <RoleSwitch role={role} onRole={onRole} />
            </div>
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-white/5 bg-navy-950/80 px-4 py-3 backdrop-blur-xl sm:px-6">
          <button className="rounded-lg p-2 hover:bg-white/5 lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu size={18} />
          </button>
          <div className="hidden items-center gap-2 text-xs text-cream/50 sm:flex">
            <span>Dabenies</span>
            <ChevronRight size={12} />
            <span className="text-gold-300">{role === 'admin' ? "Dr. Joy's Studio" : 'Academy'}</span>
            <ChevronRight size={12} />
            <span className="text-ivory">{nav.find((n) => n.id === view)?.label}</span>
          </div>
          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-navy-800 px-3 py-1.5 text-sm text-cream/50 md:flex">
              <Search size={14} />
              <span>Search affiliates, threads, edits…</span>
            </div>
            <button className="relative rounded-full border border-white/10 p-2 hover:bg-white/5">
              <Bell size={16} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-gold-400" />
            </button>
            <div className="flex items-center gap-2 rounded-full border border-gold-400/20 bg-navy-800 py-1 pl-1 pr-3">
              <Avatar initials={person.avatar} size="sm" gold={role === 'admin'} />
              <div className="hidden leading-tight sm:block">
                <p className="text-xs font-medium">{person.name}</p>
                <p className="text-[10px] text-gold-300/80">{person.title || person.role}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}

function RoleSwitch({ role, onRole }) {
  return (
    <div className="rounded-2xl border border-gold-400/20 bg-navy-800/80 p-3">
      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gold-300/70">View as</p>
      <div className="grid grid-cols-2 gap-1 rounded-xl bg-navy-950 p-1">
        <button
          onClick={() => onRole('student')}
          className={`rounded-lg px-2 py-1.5 text-xs ${
            role === 'student' ? 'bg-gold-400/20 text-gold-200' : 'text-cream/60'
          }`}
        >
          Student
        </button>
        <button
          onClick={() => onRole('admin')}
          className={`flex items-center justify-center gap-1 rounded-lg px-2 py-1.5 text-xs ${
            role === 'admin' ? 'bg-gold-400/20 text-gold-200' : 'text-cream/60'
          }`}
        >
          <LayoutDashboard size={12} />
          Dr. Joy
        </button>
      </div>
    </div>
  )
}
