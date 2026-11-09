export default function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-gold-400/40 bg-navy-800 shadow-glow">
        <span className="font-display text-xl font-semibold text-gold-300">D</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold-400 animate-pulseGold" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-xl tracking-wide text-ivory">Dabenies</p>
          <p className="text-[10px] uppercase tracking-[0.28em] text-gold-300/80">Academy</p>
        </div>
      )}
    </div>
  )
}
