import type { Lesson } from '../data/lessons'
import './LearningObjectives.css'

export default function LearningObjectives({ lesson }: { lesson: Lesson }) {
  return <div className="learning-objectives">
    <section className="learning-intention"><h2>Learning intention</h2>
      <p>We are learning to {lesson.intention}</p>
    </section>
    <section className="success-criteria"><h2>Success criteria</h2>
      <ul>{lesson.criteria.map(criterion => <li key={criterion}>I can {criterion.charAt(0).toLowerCase() + criterion.slice(1)}</li>)}</ul>
    </section>
  </div>
}


