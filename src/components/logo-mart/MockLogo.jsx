/** Renders a mock logo mark from catalogue metadata */
export function MockLogo({ logo, size = 'md', className = '' }) {
  const [primary, secondary = '#2D3436', surface = '#FFFFFF'] = logo.colors || [
    '#E23D28',
    '#2D3436',
    '#FFFFFF',
  ];
  const mark = logo.mark || logo.style || 'lettermark';

  const sizes = {
    sm: { box: 'h-16 w-16 text-lg', word: 'text-base', pad: 'p-3' },
    md: { box: 'h-24 w-24 text-2xl', word: 'text-xl', pad: 'p-5' },
    lg: { box: 'h-36 w-36 text-4xl', word: 'text-3xl', pad: 'p-8' },
    xl: { box: 'h-44 w-44 text-5xl', word: 'text-4xl', pad: 'p-10' },
  };
  const s = sizes[size] || sizes.md;

  if (mark === 'wordmark') {
    return (
      <div className={`flex flex-col items-center justify-center ${s.pad} ${className}`}>
        <span
          className={`font-display font-semibold tracking-[-0.04em] ${s.word}`}
          style={{ color: secondary }}
        >
          {logo.name}
        </span>
        <span
          className="mt-1 h-0.5 w-10"
          style={{ backgroundColor: primary }}
          aria-hidden
        />
      </div>
    );
  }

  if (mark === 'minimal') {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${s.pad} ${className}`}>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5" style={{ backgroundColor: primary }} />
          <span
            className={`font-display font-semibold tracking-tight ${s.word}`}
            style={{ color: secondary }}
          >
            {logo.name.split(' ')[0]}
          </span>
        </div>
      </div>
    );
  }

  if (mark === 'mascot') {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
        <div
          className={`${s.box} relative flex items-center justify-center rounded-full`}
          style={{ backgroundColor: primary }}
        >
          <span className="absolute h-3 w-3 rounded-full bg-white/90" style={{ top: '32%', left: '30%' }} />
          <span className="absolute h-3 w-3 rounded-full bg-white/90" style={{ top: '32%', right: '30%' }} />
          <span
            className="absolute bottom-[28%] h-2 w-6 rounded-full"
            style={{ backgroundColor: secondary }}
          />
        </div>
        <span className="font-display text-xs font-semibold" style={{ color: secondary }}>
          {logo.name}
        </span>
      </div>
    );
  }

  if (mark === 'badge') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div
          className={`${s.box} flex items-center justify-center rounded-full border-[3px]`}
          style={{
            backgroundColor: surface,
            borderColor: primary,
            color: secondary,
          }}
        >
          <div className="text-center">
            <div className="font-display font-bold leading-none tracking-tight">
              {logo.monogram}
            </div>
            <div
              className="mx-auto mt-1 h-px w-6"
              style={{ backgroundColor: primary }}
            />
          </div>
        </div>
      </div>
    );
  }

  // lettermark default
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${s.box} flex items-center justify-center rounded-nova-lg font-display font-bold tracking-tight`}
        style={{ backgroundColor: primary, color: surface }}
      >
        {logo.monogram}
      </div>
    </div>
  );
}
