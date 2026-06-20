const variants = {
  gold: 'bg-gold hover:bg-gold-light text-ink shadow-lg shadow-gold/25',
  primary: 'bg-electric hover:bg-electric-light text-white shadow-lg shadow-electric/25',
  glass: 'glass text-ink hover:bg-white/90',
  outline: 'bg-transparent border border-white/40 hover:border-white text-white',
  outlineInk: 'bg-transparent border border-ink/15 hover:border-ink/40 text-ink',
  ghost: 'bg-transparent hover:bg-ink/5 text-ink',
  ghostDark: 'bg-transparent hover:bg-white/10 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  as: Component = 'button',
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
