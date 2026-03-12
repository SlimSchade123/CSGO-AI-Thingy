import { type ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'accent'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-bg-primary font-semibold hover:bg-accent-hover active:scale-95',
  secondary: 'bg-bg-elevated border border-border text-text-primary hover:bg-bg-hover hover:border-border-hover',
  danger: 'bg-rarity-covert/20 border border-rarity-covert text-rarity-covert hover:bg-rarity-covert/30',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-hover',
  accent: 'bg-rarity-special/20 border border-rarity-special text-rarity-special hover:bg-rarity-special/30',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-3 text-base rounded-lg',
}

export function Button({
  variant = 'secondary',
  size = 'md',
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 select-none
        ${sizeClasses[size]} ${variantClasses[variant]}
        ${disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
        ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
