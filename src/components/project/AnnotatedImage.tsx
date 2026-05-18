interface Pin {
  x: number   // % from left
  y: number   // % from top
  label: string
}

interface Props {
  src: string
  alt: string
  pins?: Pin[]
}

export default function AnnotatedImage({ src, alt, pins = [] }: Props) {
  return (
    <div className="w-full">
      <div className="relative rounded-xl overflow-hidden border border-border">
        <img src={src} alt={alt} className="w-full block" />
        {pins.map((pin, i) => (
          <div
            key={i}
            className="absolute group"
            style={{ left: `${pin.x}%`, top: `${pin.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            {/* Pin dot */}
            <div className="w-6 h-6 rounded-full bg-ink text-white text-[10px] font-medium flex items-center justify-center cursor-default shadow-sm">
              {i + 1}
            </div>
            {/* Tooltip */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-ink text-white text-[10px] px-2.5 py-1.5 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
              {pin.label}
            </div>
          </div>
        ))}
      </div>

      {/* Pin legend */}
      {pins.length > 0 && (
        <div className="mt-4 space-y-1.5">
          {pins.map((pin, i) => (
            <div key={i} className="flex items-start gap-3 text-xs text-muted">
              <span className="w-5 h-5 rounded-full bg-ink text-white text-[10px] font-medium flex items-center justify-center shrink-0 mt-px">
                {i + 1}
              </span>
              {pin.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
