import { useMemo, useState } from 'react'
import Shell from './components/Shell.jsx'
import AcademyHub from './components/AcademyHub.jsx'
import LessonPlayer from './components/LessonPlayer.jsx'
import CommunityHub from './components/CommunityHub.jsx'
import AiAssistant from './components/AiAssistant.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import { initialCompleted, modules } from './data/mock.js'

export default function App() {
  const [role, setRole] = useState('student')
  const [studentView, setStudentView] = useState('catalog')
  const [adminView, setAdminView] = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [completed, setCompleted] = useState(initialCompleted)
  const [activeLesson, setActiveLesson] = useState(modules[0].lessons[3].id)

  const view = role === 'admin' ? adminView : studentView

  const onRole = (next) => {
    setRole(next)
    if (next === 'admin') setAdminView('overview')
    else setStudentView('catalog')
  }

  const onView = (id) => {
    if (role === 'admin') setAdminView(id)
    else setStudentView(id)
  }

  const openLesson = (id) => {
    setActiveLesson(id)
    setStudentView('lesson')
  }

  const toggleComplete = (id) => {
    setCompleted((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const body = useMemo(() => {
    if (role === 'admin') return <AdminDashboard view={adminView} />
    if (studentView === 'lesson') {
      return (
        <LessonPlayer
          lessonId={activeLesson}
          completed={completed}
          onToggleComplete={toggleComplete}
          onSelectLesson={setActiveLesson}
        />
      )
    }
    if (studentView === 'community') return <CommunityHub />
    if (studentView === 'ai') return <div className="mx-auto h-[70vh] max-w-3xl"><AiAssistant /></div>
    return <AcademyHub completed={completed} onOpenLesson={openLesson} />
  }, [role, adminView, studentView, activeLesson, completed])

  return (
    <Shell
      role={role}
      onRole={onRole}
      view={view}
      onView={onView}
      mobileOpen={mobileOpen}
      setMobileOpen={setMobileOpen}
    >
      {body}
    </Shell>
  )
}
