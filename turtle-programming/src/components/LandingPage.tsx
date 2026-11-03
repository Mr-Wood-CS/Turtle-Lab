import Curriculum from './Curriculum'
import './LandingPage.css'

export default function LandingPage({ onLessons }: { onLessons: () => void }) {
  return <>
    <header className="landing-introduction">
      <p className="unit-level">Third Level Computing Science</p>
      <h1>Python Turtle programming</h1>
      <p>Learn how to give a computer instructions by drawing with Python Turtle. Across six lessons, you will learn about sequence, iteration, variables, subroutines and selection, then combine these ideas to create different shapes and colours.</p>
      <p>Each lesson explains one idea at a time, with diagrams and example code. Use the lessons alongside the practical tasks in your booklet.</p>
      <button className="button primary" onClick={onLessons}>Go to lessons <span aria-hidden="true">&rarr;</span></button>
    </header>
    <Curriculum />
  </>
}