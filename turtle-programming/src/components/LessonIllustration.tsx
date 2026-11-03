import { useId } from 'react'
import './LessonIllustration.css'

type Visual = 'pen' | 'turn' | 'square' | 'loop' | 'indent' | 'repeats' | 'input' | 'variable' | 'angle' | 'text' | 'parts' | 'define' | 'call' | 'condition' | 'branch' | 'random' | 'return' | 'shapes' | 'colours' | 'testing'
const lessonVisuals: Visual[][] = [
  ['pen', 'turn', 'square'],
  ['loop', 'indent', 'repeats'],
  ['input', 'variable', 'angle', 'text'],
  ['parts', 'define', 'call', 'indent'],
  ['condition', 'branch', 'random', 'return'],
  ['parts', 'call', 'shapes', 'colours', 'testing'],
]
const captions: Record<Visual, string> = {
  pen: 'Pen down leaves a line. Pen up lets the turtle move without drawing.',
  turn: 'Moving changes the turtle’s position. Turning changes the direction it faces.',
  square: 'Four forward movements and four quarter turns complete a square.',
  loop: 'The same pair of instructions repeats to draw each side.',
  indent: 'The shaded block shows which instructions belong inside the loop.',
  repeats: 'Each repeat adds one side. After four repeats, the square is complete.',
  input: 'The program asks a question. The user types an answer.',
  variable: 'The name stays the same. The stored value can change.',
  angle: 'A five-sided shape needs a 72° turn after each side.',
  text: 'Quotation marks mean text. A variable name looks up its stored value.',
  parts: 'Small named parts can work together in a larger program.',
  define: 'The definition stores the instructions. It does not run them yet.',
  call: 'Calling square() runs the saved instructions, then the program continues.',
  condition: 'A condition asks a question with a true or false answer.',
  branch: 'Only the matching path is followed.',
  random: 'Each choice can be 1 or 2. The same number can appear again.',
  return: 'The function sends a colour back for the pen to use.',
  shapes: 'Choosing 3, 4, 5 or 6 sides changes the shape.',
  colours: 'The same shape can use a different pen or fill colour.',
  testing: 'Check each possible number of sides, rather than relying on one random result.',
}

function Turtle({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) {
  return <g transform={`translate(${x} ${y}) rotate(${rotate})`}><ellipse rx="19" ry="14" fill="#d4e6d5" stroke="#38644b" strokeWidth="2"/><path d="m-10-11-5-8m5 30-5 8m23-29 5-7m-5 28 5 7" stroke="#38644b" strokeWidth="3" strokeLinecap="round"/><circle cx="23" r="7" fill="#d4e6d5" stroke="#38644b" strokeWidth="2"/><circle cx="26" cy="-2" r="1.5" fill="#263c2d"/><path d="m-8-8 12 0 5 8-5 8H-8l-5-8z" fill="none" stroke="#719678"/></g>
}
function Polygon({ x, y, sides, colour = '#38644b', filled = false }: { x: number; y: number; sides: number; colour?: string; filled?: boolean }) {
  const points = Array.from({ length: sides }, (_, i) => `${x + 45 * Math.cos(i * 2 * Math.PI / sides - Math.PI / 2)},${y + 45 * Math.sin(i * 2 * Math.PI / sides - Math.PI / 2)}`).join(' ')
  return <polygon points={points} fill={filled ? colour + '22' : 'none'} stroke={colour} strokeWidth="3" />
}

export default function LessonIllustration({ lesson, part = 0, output = false }: { lesson: number; part?: number; output?: boolean }) {
  const id = useId().replace(/:/g, '')
  const visual = lessonVisuals[lesson]![part]!
  const caption = output ? ['A green outline and pale green fill.', 'Four repeated moves and turns draw a square.', 'Example result when the user chooses 5 sides.', 'Three calls draw three squares.', 'Either colour is possible. Each run draws one square.', 'One of these four shapes is drawn each time.'][lesson]! : captions[visual]
  const arrow = (path: string) => <path d={path} fill="none" stroke="#54715b" strokeWidth="2" markerEnd={`url(#${id}-arrow)`}/>
  const box = (x: number, y: number, text: string, width = 170) => <g><rect x={x} y={y} width={width} height="52" rx="5" fill="#edf3ec" stroke="#a9bfac"/><text x={x + width / 2} y={y + 31} textAnchor="middle">{text}</text></g>
  const is = (...types: Visual[]) => !output && types.includes(visual)
  return <figure className="lesson-illustration">
    <svg viewBox="0 0 640 250" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>{caption}</title>
      <defs><marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10" fill="#54715b"/></marker></defs>
      {output && <>
        {lesson < 2 && <rect x="235" y="45" width="150" height="150" stroke={lesson === 0 ? 'seagreen' : '#222'} strokeWidth="3" fill={lesson === 0 ? 'honeydew' : 'none'}/>}
        {lesson === 2 && <Polygon x={320} y={125} sides={5}/>}
        {lesson === 3 && [160, 320, 480].map(x => <rect key={x} x={x - 35} y="90" width="70" height="70" fill="none" stroke="#222" strokeWidth="3"/>)}
        {lesson === 4 && <><rect x="160" y="60" width="115" height="115" fill="none" stroke="seagreen" strokeWidth="3"/><rect x="365" y="60" width="115" height="115" fill="none" stroke="coral" strokeWidth="3"/><text x="320" y="125" textAnchor="middle">or</text></>}
        {lesson === 5 && [3,4,5,6].map((s, i) => <g key={s}><Polygon x={100 + i * 145} y={115} sides={s}/><text x={100 + i * 145} y="195" textAnchor="middle">{s} sides</text></g>)}
      </>}
      {is('pen') && <><text x="165" y="42" textAnchor="middle">Pen down</text><path d="M70 110h165" stroke="#38644b" strokeWidth="4"/><Turtle x={245} y={110}/><text x="475" y="42" textAnchor="middle">Pen up</text><path d="M380 110h165" stroke="#a7b3a7" strokeWidth="2" strokeDasharray="5 7"/><Turtle x={555} y={110}/><text x="165" y="190" textAnchor="middle">A line is drawn</text><text x="475" y="190" textAnchor="middle">No line is drawn</text></>}
      {is('turn') && <><text x="160" y="30" textAnchor="middle">Move forward</text><text x="160" y="59" textAnchor="middle" className="movement-code">turtle.forward(100)</text><Turtle x={80} y={110}/>{arrow('M120 110h135')}<Turtle x={285} y={110}/><text x="465" y="30" textAnchor="middle">Turn right</text><text x="465" y="59" textAnchor="middle" className="movement-code">turtle.right(90)</text><Turtle x={455} y={105}/>{arrow('M492 99 Q545 145 485 178')}<Turtle x={455} y={185} rotate={90}/></>}
      {is('square', 'repeats', 'loop') && [1,2,3,4].map((count, i) => <g key={count}><path d={['M25 50h65','M25 50h65v65','M25 50h65v65H25','M25 50h65v65H25V50'][i]} transform={`translate(${40 + i * 150} 20)`} fill="none" stroke="#38644b" strokeWidth="3"/><text x={95 + i * 150} y="170" textAnchor="middle">{count} {visual === 'square' ? 'side' : 'repeat'}{count > 1 ? 's' : ''}</text></g>)}
      {is('indent') && <><text x="80" y="55" className="visual-code">for i in range(4):</text><rect x="100" y="70" width="420" height="95" rx="4" fill="#e4efe3"/><path d="M89 79v78" stroke="#74977d" strokeWidth="3"/><text x="120" y="107" className="visual-code">turtle.forward(100)</text><text x="120" y="145" className="visual-code">turtle.right(90)</text><text x="80" y="210" className="visual-code">turtle.done()</text><text x="435" y="210">runs after the loop</text></>}
      {is('input') && <><rect x="70" y="35" width="500" height="165" rx="8" fill="#f5f6f4" stroke="#b5c2b5"/><text x="100" y="80">How many sides?</text><text x="100" y="125" className="typed-answer">5</text><path d="M122 105v25" stroke="#38644b" strokeWidth="2"/><text x="100" y="175" className="visual-note">The answer starts as text.</text></>}
      {is('variable', 'text') && <>{box(75, 35, 'sides')}<rect x="75" y="87" width="170" height="100" fill="#fff" stroke="#a9bfac"/><text x="160" y="153" className="stored-value" textAnchor="middle">5</text>{arrow('M270 110h80')}{box(380, 85, visual === 'text' ? '"blue" is text' : 'Use the stored 5', 195)}<text x="320" y="225" textAnchor="middle">{visual === 'text' ? 'sides is a name. "sides" is the word sides.' : 'sides is the label. 5 is the value inside.'}</text></>}
      {is('angle') && <><Polygon x={240} y={130} sides={5}/><path d="M283 116l81 59" stroke="#a1afa0" strokeDasharray="5 5"/><path d="M283 116l-17 50" stroke="#38644b" strokeWidth="3"/><path d="M311 137 A35 35 0 0 1 272 149" stroke="#b06c39" fill="none" strokeWidth="3"/><text x="375" y="130" className="stored-value">72°</text><text x="375" y="165">Turn here</text></>}
      {is('parts') && <>{box(60, 50, 'Drawing part')}{box(60, 145, 'Colour part')}{arrow('M240 76h85l45 49')}{arrow('M240 171h85l45-46')}<Polygon x={480} y={125} sides={5} filled/></>}
      {is('define') && <><rect x="65" y="30" width="510" height="170" rx="6" fill="#f4f6f2" stroke="#a9bfac"/><text x="90" y="67" className="visual-code">def square():</text><text x="120" y="107" className="visual-code">for i in range(4):</text><text x="150" y="143" className="visual-code">turtle.forward(30)</text><text x="150" y="179" className="visual-code">turtle.right(90)</text><text x="320" y="232" textAnchor="middle">Instructions saved under the name square</text></>}
      {is('call') && <>{box(30, 85, lesson === 5 ? 'shape()' : 'square()', 145)}{arrow('M185 110h75')}{box(275, 85, 'Run instructions', 170)}{arrow('M455 110h70')}<Polygon x={580} y={110} sides={4}/><text x="320" y="205" textAnchor="middle">When the instructions finish, continue after the call.</text></>}
      {is('condition', 'branch') && <><path d="M320 20 435 78 320 136 205 78z" fill="#f1f4eb" stroke="#9eaf9c"/><text x="320" y="83" textAnchor="middle">number == 1?</text>{arrow('M205 78H115v83')}{arrow('M435 78h90v83')}<text x="125" y="136">True</text><text x="475" y="136">False</text>{box(30, 175, 'Choose green')}{box(440, 175, 'Check number == 2')}</>}
      {is('random') && <>{[1,2,2,1,1,2].map((n,i) => <g key={i}><rect x={35+i*100} y="65" width="70" height="70" rx="12" fill="#f2f5ef" stroke="#9db59f"/><text x={70+i*100} y="110" textAnchor="middle" className="stored-value">{n}</text></g>)}<text x="320" y="195" textAnchor="middle">An example of six separate choices</text></>}
      {is('return') && <>{box(45, 75, 'getcolour()', 175)}{arrow('M235 100h110')}<circle cx="405" cy="100" r="32" fill="seagreen"/><text x="405" y="170" textAnchor="middle">"seagreen"</text>{arrow('M450 100h80')}<Turtle x={565} y={100}/></>}
      {is('shapes', 'testing', 'colours') && [3,4,5,6].map((s,i) => <g key={s}><Polygon x={100+i*145} y={105} sides={visual === 'colours' ? 4 : s} colour={visual === 'colours' ? ['#38644b','#b8654d','#5c72a0','#9a7440'][i] : '#38644b'} filled={visual === 'colours'}/><text x={100+i*145} y="185" textAnchor="middle">{visual === 'testing' ? `Check ${s} sides` : visual === 'colours' ? ['Green','Coral','Blue','Gold'][i] : `${s} sides`}</text></g>)}
    </svg>
    <figcaption>{caption}</figcaption>
  </figure>
}

