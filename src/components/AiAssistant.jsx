import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { aiReplies, defaultAiReply, currentStudent } from '../data/mock.js'
import Avatar from './Avatar.jsx'

export default function AiAssistant({ embedded = false, onClose }) {
  const [messages, setMessages] = useState([
    { id: 'a0', role: 'ai', text: defaultAiReply },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const ask = (e) => {
    e?.preventDefault()
    const text = input.trim()
    if (!text || typing) return
    setInput('')
    setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text }])
    setTyping(true)
    const reply = aiReplies.find((r) => r.match.test(text))?.text || defaultAiReply
    window.setTimeout(() => {
      setMessages((m) => [...m, { id: `a-${Date.now()}`, role: 'ai', text: reply }])
      setTyping(false)
    }, 700)
  }

  const prompts = [
    'How do I pick a high-payout affiliate offer?',
    'Write a Twitter thread that converts',
    'How should I batch and edit this week?',
  ]

  return (
    <div className={`flex h-full flex-col ${embedded ? '' : 'animate-fadeup'}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-gold-300">
            <Sparkles size={14} />
            Dabenies AI
          </p>
          <h1 className="font-display text-3xl">Study companion</h1>
          <p className="mt-1 text-sm text-cream/55">Ask about affiliates, Twitter monetization, content systems, or video edits.</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="text-xs text-cream/50 hover:text-ivory">
            Close
          </button>
        )}
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto rounded-2xl border border-white/8 bg-navy-900/70 p-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
            {m.role === 'ai' && (
              <div className="grid h-8 w-8 place-items-center rounded-full border border-gold-400/40 bg-gold-400/10 text-gold-300">
                <Sparkles size={14} />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                m.role === 'user' ? 'bg-gold-400/20 text-ivory' : 'bg-navy-800 text-cream/80'
              }`}
            >
              {m.text}
            </div>
            {m.role === 'user' && <Avatar initials={currentStudent.avatar} size="sm" />}
          </div>
        ))}
        {typing && <p className="pl-10 text-xs text-gold-300/70">Dabenies AI is composing…</p>}
        <div ref={endRef} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {prompts.map((p) => (
          <button
            key={p}
            onClick={() => {
              setInput(p)
            }}
            className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-cream/60 hover:border-gold-400/40 hover:text-ivory"
          >
            {p}
          </button>
        ))}
      </div>

      <form onSubmit={ask} className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Dabenies AI…"
          className="flex-1 rounded-xl border border-white/10 bg-navy-800 px-3 py-2.5 text-sm outline-none focus:border-gold-400/40"
        />
        <button type="submit" className="rounded-xl bg-gold-400 px-4 text-navy-950">
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
