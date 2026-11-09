export default function Avatar({ initials, size = 'md', gold = false }) {
  const sizes = {
    sm: 'h-8 w-8 text-[11px]',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  }
  return (
    <div
      className={`grid ${sizes[size]} shrink-0 place-items-center rounded-full border font-medium ${
        gold
          ? 'border-gold-400/50 bg-gold-400/15 text-gold-200'
          : 'border-white/10 bg-navy-600 text-ivory'
      }`}
    >
      {initials}
    </div>
  )
}
