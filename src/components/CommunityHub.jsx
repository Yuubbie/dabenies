import { useState } from 'react'
import { Hash, Heart, MessageCircle, Send, Users } from 'lucide-react'
import Avatar from './Avatar.jsx'
import { channels, initialPosts, currentStudent } from '../data/mock.js'

export default function CommunityHub() {
  const [active, setActive] = useState(channels[0].id)
  const [posts, setPosts] = useState(initialPosts)
  const [draft, setDraft] = useState('')
  const [openComments, setOpenComments] = useState({})
  const [reply, setReply] = useState({})

  const list = posts[active] || []
  const channel = channels.find((c) => c.id === active)

  const publish = (e) => {
    e.preventDefault()
    const body = draft.trim()
    if (!body) return
    const post = {
      id: `p-${Date.now()}`,
      author: currentStudent.name,
      avatar: currentStudent.avatar,
      role: currentStudent.cohort.split('·')[1]?.trim() || 'Member',
      time: 'Just now',
      body,
      likes: 0,
      liked: false,
      comments: [],
    }
    setPosts((prev) => ({ ...prev, [active]: [post, ...(prev[active] || [])] }))
    setDraft('')
  }

  const toggleLike = (id) => {
    setPosts((prev) => ({
      ...prev,
      [active]: prev[active].map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      ),
    }))
  }

  const addComment = (postId) => {
    const body = (reply[postId] || '').trim()
    if (!body) return
    setPosts((prev) => ({
      ...prev,
      [active]: prev[active].map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: `rc-${Date.now()}`, author: currentStudent.name, avatar: currentStudent.avatar, body, time: 'Just now' },
              ],
            }
          : p
      ),
    }))
    setReply((r) => ({ ...r, [postId]: '' }))
  }

  return (
    <div className="animate-fadeup grid gap-6 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-2">
        <p className="px-2 text-[11px] uppercase tracking-[0.24em] text-gold-300/80">Rooms</p>
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActive(ch.id)}
            className={`w-full rounded-2xl border px-3 py-3 text-left ${
              active === ch.id
                ? 'border-gold-400/30 bg-gold-400/10 text-ivory'
                : 'border-transparent bg-navy-900/50 text-cream/70 hover:bg-white/5'
            }`}
          >
            <p className="flex items-center gap-2 text-sm font-medium">
              <Hash size={14} className="text-gold-300" />
              {ch.name.replace('#', '')}
            </p>
            <p className="mt-1 line-clamp-2 text-[11px] text-cream/45">{ch.desc}</p>
            <p className="mt-2 inline-flex items-center gap-1 text-[10px] text-cream/40">
              <Users size={10} />
              {ch.members} members
            </p>
          </button>
        ))}
      </aside>

      <section className="rounded-3xl border border-white/8 bg-navy-900/70 p-4 md:p-6">
        <div className="mb-5">
          <h1 className="font-display text-3xl">{channel.name}</h1>
          <p className="mt-1 text-sm text-cream/55">{channel.desc}</p>
        </div>

        <form onSubmit={publish} className="mb-6 rounded-2xl border border-gold-400/20 bg-navy-800/60 p-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder={`Share in ${channel.name}…`}
            className="w-full resize-none bg-transparent text-sm outline-none placeholder:text-cream/30"
          />
          <div className="mt-2 flex justify-end">
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-gold-400 px-4 py-1.5 text-sm font-medium text-navy-950">
              <Send size={14} />
              Post
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {list.map((post) => (
            <article key={post.id} className="rounded-2xl border border-white/8 bg-navy-950/40 p-4">
              <div className="flex gap-3">
                <Avatar initials={post.avatar} gold={post.author.includes('Joy')} />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{post.author}</span>
                    <span className="ml-2 text-[11px] text-gold-300/70">{post.role}</span>
                    <span className="ml-2 text-[11px] text-cream/35">{post.time}</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-cream/80">{post.body}</p>
                  <div className="mt-3 flex gap-4 text-xs text-cream/50">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`inline-flex items-center gap-1 ${post.liked ? 'text-gold-300' : 'hover:text-ivory'}`}
                    >
                      <Heart size={14} fill={post.liked ? 'currentColor' : 'none'} />
                      {post.likes}
                    </button>
                    <button
                      onClick={() => setOpenComments((o) => ({ ...o, [post.id]: !o[post.id] }))}
                      className="inline-flex items-center gap-1 hover:text-ivory"
                    >
                      <MessageCircle size={14} />
                      {post.comments.length}
                    </button>
                  </div>
                  {(openComments[post.id] || post.comments.length > 0) && (
                    <div className="mt-3 space-y-2 border-t border-white/5 pt-3">
                      {post.comments.map((c) => (
                        <div key={c.id} className="flex gap-2">
                          <Avatar initials={c.avatar} size="sm" gold={c.author.includes('Joy')} />
                          <p className="text-xs text-cream/70">
                            <span className="font-medium text-ivory">{c.author}</span> {c.body}
                            <span className="ml-2 text-cream/35">{c.time}</span>
                          </p>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input
                          value={reply[post.id] || ''}
                          onChange={(e) => setReply((r) => ({ ...r, [post.id]: e.target.value }))}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              addComment(post.id)
                            }
                          }}
                          placeholder="Write a reply…"
                          className="flex-1 rounded-lg border border-white/10 bg-navy-800 px-2 py-1.5 text-xs outline-none focus:border-gold-400/40"
                        />
                        <button
                          onClick={() => addComment(post.id)}
                          className="rounded-lg bg-gold-400/15 px-2 text-gold-200"
                        >
                          <Send size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
