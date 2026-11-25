/** Splits "plain **bold** plain" into segments. Shared by the site and the CV generator. */
export function parseBold(text: string): { text: string; bold: boolean }[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('**') && part.endsWith('**') ? { text: part.slice(2, -2), bold: true } : { text: part, bold: false },
    )
}

/** Renders **bold** markup from resume.ts as emphasised text. */
export function RichText({ children }: { children: string }) {
  return (
    <>
      {parseBold(children).map((seg, i) =>
        seg.bold ? (
          <strong key={i} className="font-semibold text-fg">
            {seg.text}
          </strong>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  )
}
