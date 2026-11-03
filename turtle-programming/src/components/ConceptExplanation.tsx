import type { Lesson } from '../data/lessons'
import { pupilNotes } from '../data/pupilNotes'
import './ConceptExplanation.css'

export default function ConceptExplanation({ lesson, index }: { lesson: Lesson; index: number }) {
  const notes = pupilNotes[index]!
  return <section className="concept-explanation" aria-labelledby="concept-heading">
    <h2 id="concept-heading">What does {lesson.concept.name.toLowerCase()} mean?</h2>
    <p>{lesson.concept.explanation}</p>
    <p className="familiar-example">{notes.familiar}</p>
    <h2>Understanding the idea</h2>
    {notes.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    <section className="key-words"><h2>Key words</h2><dl>{notes.words.map(([word, meaning]) => <div key={word}><dt>{word}</dt><dd>{meaning}</dd></div>)}</dl></section>
  </section>
}
