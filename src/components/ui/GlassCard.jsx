export default function GlassCard({ children, className = '', hover = false, dark = false, premium = false, as: Component = 'div', ...props }) {
  return (
    <Component
      className={`${dark ? 'glass-dark' : 'glass'} ${premium ? 'gradient-border' : ''} rounded-card shadow-glass ${
        hover ? 'transition-all duration-300 ease-out hover:shadow-glass-lg hover:-translate-y-1' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
