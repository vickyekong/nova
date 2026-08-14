import { cn } from '../../lib/utils';

const variants = {
  solid: {
    base: 'rounded-nova px-3.5 py-2 text-sm font-medium',
    active: 'bg-nova text-white',
    idle: 'border border-ink/20 bg-white text-ink hover:border-nova hover:text-nova',
  },
  round: {
    base: 'rounded-full px-4 py-2 text-sm font-medium',
    active: 'bg-nova text-white',
    idle: 'border border-ink/20 bg-white text-ink hover:border-nova hover:text-nova',
  },
  subtle: {
    base: 'rounded-nova border px-3 py-1.5 text-xs font-medium',
    active: 'border-nova bg-nova/10 text-nova',
    idle: 'border-ink/10 text-ink-muted hover:border-ink/20',
  },
};

/**
 * Single-select filter buttons.
 * @param {{id: string, label: string}[]} options
 */
export function FilterPills({
  options,
  value,
  onChange,
  variant = 'solid',
  className,
  children,
}) {
  const style = variants[variant] || variants.solid;

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          aria-pressed={value === option.id}
          data-cursor="hover"
          className={cn(
            'transition-colors',
            style.base,
            value === option.id ? style.active : style.idle,
          )}
        >
          {option.label}
        </button>
      ))}
      {children}
    </div>
  );
}
