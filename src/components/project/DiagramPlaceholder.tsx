interface Props {
  label: string      // diagram name from markdown
  aspectRatio?: string // e.g. '16/9', '4/3', '3/2'
}

export default function DiagramPlaceholder({ label, aspectRatio = '16/9' }: Props) {
  return (
    <div
      className="w-full rounded-xl border border-dashed border-border bg-muted flex flex-col items-center justify-center gap-2 text-center px-6"
      style={{ aspectRatio }}
    >
      <span className="text-label-12 text-muted-foreground/60">Image coming soon</span>
      <span className="text-copy-13 text-muted-foreground">{label}</span>
    </div>
  )
}
