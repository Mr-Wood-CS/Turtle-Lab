import { useState } from 'react'
import './ShapeExplorer.css'

export default function ShapeExplorer() {
  const [sides, setSides] = useState(5)
  const [colour, setColour] = useState('#42795d')
  const angle = Number((360 / sides).toFixed(2))
  const points = Array.from({ length: sides }, (_, index) => {
    const position = index * 2 * Math.PI / sides - Math.PI / 2
    return `${150 + 105 * Math.cos(position)},${150 + 105 * Math.sin(position)}`
  }).join(' ')

  return <section className="explorer">
    <h1>Shape explorer</h1>
    <p className="page-description">Choose the number of sides to see the shape and the angle your turtle needs to turn.</p>
    <div className="explorer-grid">
      <div className="explorer-controls">
        <label htmlFor="sides">Number of sides <strong>{sides}</strong></label>
        <input id="sides" type="range" min="3" max="10" value={sides} onChange={event => setSides(Number(event.target.value))} />
        <div className="range-labels"><span>3 sides</span><span>10 sides</span></div>
        <label htmlFor="colour">Pen colour</label>
        <input id="colour" type="color" value={colour} onChange={event => setColour(event.target.value)} />
        <div className="angle-box" role="status">
          <span>Turning angle</span>
          <strong>{angle}&deg;</strong>
          <p>Turn your turtle this much after drawing each side.</p>
        </div>
      </div>
      <div className="shape-canvas">
        <svg viewBox="0 0 300 300" aria-label={`Shape with ${sides} sides`} role="img">
          <polygon points={points} fill={colour + '12'} stroke={colour} strokeWidth="2" strokeLinejoin="round" />
          {points.split(' ').map((point, index) => <circle key={index} cx={point.split(',')[0]} cy={point.split(',')[1]} r="3" fill={colour} />)}
        </svg>
      </div>
    </div>
  </section>
}
