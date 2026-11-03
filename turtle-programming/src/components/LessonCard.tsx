import type { Lesson } from '../data/lessons'
import './LessonCard.css'

export default function LessonCard({ lesson, index, onOpen }: { lesson: Lesson; index: number; onOpen: () => void }) {
  return <button className="lesson-card" onClick={onOpen}>
    <span className="lesson-number">{index + 1}</span>
    <span className="lesson-title">{lesson.concept.name}<small>{lesson.title}</small></span>

    <span className="lesson-arrow" aria-hidden="true">&rarr;</span>
  </button>
}


