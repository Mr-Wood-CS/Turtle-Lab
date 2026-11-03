import './ConceptDiagram.css'

const diagrams = [
  { caption: 'Sequence: follow the instructions in order.', labels: ['Move forward', 'Turn right', 'Move forward'], loop: false },
  { caption: 'Iteration: the same instructions run again.', labels: ['Move forward', 'Turn right', 'Repeat'], loop: true },
  { caption: 'Input becomes a stored value that the program can use.', labels: ['You type 5', 'sides stores 5', 'Draw 5 sides'], loop: false },
  { caption: 'A call runs the instructions saved in a subroutine.', labels: ['Call square()', 'Run its commands', 'Continue'], loop: false },
  { caption: 'Selection chooses a colour by checking the number.', labels: ['Choose 1 or 2', 'Check the number', 'Return a colour'], loop: false },
  { caption: 'Several programming ideas work together to draw a shape.', labels: ['Choose sides', 'Repeat the drawing', 'Shape complete'], loop: false },
]

export default function ConceptDiagram({ index }: { index: number }) {
  if (index === 0) return <figure className="concept-diagram">
    <svg viewBox="0 0 660 240" role="img" aria-labelledby="sequence-everyday-title">
      <title id="sequence-everyday-title">First put on your socks, then put on your shoes.</title>
      <rect x="40" y="15" width="245" height="205" rx="5" fill="#f3f6f1" stroke="#b5c5b5" />
      <rect x="375" y="15" width="245" height="205" rx="5" fill="#f3f6f1" stroke="#b5c5b5" />
      <text x="162" y="47" textAnchor="middle">1. Socks first</text>
      <g stroke="#42654e" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M135 74h48v62l-40 39q-17 13-30-1t2-28l20-20z" fill="#d7e5d8" />
        <path d="M135 86h48m-48 8h48M119 144l24 27" fill="none" />
      </g>
      <path d="M305 116h45m-10-10 10 10-10 10" fill="none" stroke="#42654e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="497" y="47" textAnchor="middle">2. Shoes next</text>
      <g stroke="#42654e" strokeWidth="2.5" strokeLinejoin="round">
        <path d="M437 115q15 12 35-4l23 22 46 13q16 5 16 24H437z" fill="#d7e5d8" />
        <path d="M437 157h118m-73-34-13 10m25-1-13 10m25-2-13 10" fill="none" />
      </g>
      <text x="162" y="199" textAnchor="middle" className="diagram-step">Put on your socks.</text>
      <text x="497" y="199" textAnchor="middle" className="diagram-step">Then put on your shoes.</text>
    </svg>
    <figcaption>The order matters: socks go on before shoes, just as program instructions need the right sequence.</figcaption>
  </figure>
  const diagram = diagrams[index]!
  return <figure className="concept-diagram">
    <svg viewBox="0 0 660 170" role="img" aria-labelledby={`diagram-title-${index}`}>
      <title id={`diagram-title-${index}`}>{diagram.caption}</title>
      <defs><marker id={`arrow-${index}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10" fill="#42654e" /></marker></defs>
      {diagram.labels.map((label, step) => <g key={label}>
        <rect x={15 + step * 220} y="38" width="190" height="70" rx="4" fill="#f3f6f1" stroke="#b5c5b5" />
        <text x={110 + step * 220} y="66" textAnchor="middle" className="diagram-step">{step + 1}</text>
        <text x={110 + step * 220} y="90" textAnchor="middle">{label}</text>
        {step < 2 && <path d={`M${210 + step * 220} 73h22`} fill="none" stroke="#42654e" strokeWidth="2" markerEnd={`url(#arrow-${index})`} />}
      </g>)}
      {diagram.loop && <path d="M550 112v30H110v-27" fill="none" stroke="#42654e" strokeWidth="2" markerEnd={`url(#arrow-${index})`} />}
    </svg>
    <figcaption>{diagram.caption}</figcaption>
  </figure>
}
