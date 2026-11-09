export default function ProgressBar({ value, label }) {
  const pct = Math.max(0, Math.min(100, value))
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs text-cream/70">
          <span>{label}</span>
          <span className="text-gold-300">{pct}%</span>
        </div>
      )}
      <div className="h-1.5 overflow-hidden rounded-full bg-navy-600">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-200 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
