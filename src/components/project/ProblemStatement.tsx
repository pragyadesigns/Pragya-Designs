interface Props {
  text: string
  attribution?: string
}

export default function ProblemStatement({ text, attribution }: Props) {
  return (
    <div className="border-l-2 border-ink pl-6 py-1 my-2">
      <p className="text-base md:text-lg font-light text-ink leading-relaxed italic">
        "{text}"
      </p>
      {attribution && (
        <p className="text-xs text-muted mt-3 not-italic">{attribution}</p>
      )}
    </div>
  )
}
