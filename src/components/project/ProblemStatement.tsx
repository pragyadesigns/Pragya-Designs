interface Props {
  text: string
  attribution?: string
}

export default function ProblemStatement({ text, attribution }: Props) {
  return (
    <div className="my-2 space-y-4">
      {text.split('\n\n').map((para, i) => (
        <p key={i} className="text-copy-16 text-muted-foreground">
          {para.split('\n').map((line, j, arr) => (
            <span key={j}>{line}{j < arr.length - 1 && <br />}</span>
          ))}
        </p>
      ))}
      {attribution && (
        <p className="text-copy-13 text-muted-foreground mt-3 not-italic">{attribution}</p>
      )}
    </div>
  )
}
