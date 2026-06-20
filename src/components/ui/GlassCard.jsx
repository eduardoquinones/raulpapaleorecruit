export default function GlassCard({ children, className = '', hover = false, dark = false, as: Component = 'div', ...props }) {
  return (
    <Component
      className={`${dark ? 'glass-dark' : 'glass'} rounded-card shadow-glass ${
        hover ? 'transition-all duration-300 hover:shadow-glass-lg hover:-translate-y-0.5' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
