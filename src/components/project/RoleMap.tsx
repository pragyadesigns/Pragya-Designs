interface Props {
  owned: string[]
  collaborated: string[]
}

export default function RoleMap({ owned, collaborated }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted mb-2">I owned</p>
        <div className="flex flex-wrap gap-2">
          {owned.map((item) => (
            <span
              key={item}
              className="text-xs px-3 py-1.5 rounded-full bg-ink text-white"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-widest text-muted mb-2">Collaborated on</p>
        <div className="flex flex-wrap gap-2">
          {collaborated.map((item) => (
            <span
              key={item}
              className="text-xs px-3 py-1.5 rounded-full border border-border text-muted"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
