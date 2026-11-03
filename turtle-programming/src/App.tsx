import { useState } from 'react'
import Sidebar from './components/Sidebar'
import LessonCard from './components/LessonCard'
import LessonDetail from './components/LessonDetail'
import ShapeExplorer from './components/ShapeExplorer'
import LandingPage from './components/LandingPage'
import { lessons } from './data/lessons'
import './App.css'

export default function App() {
  const [view, setView] = useState('overview')
  const [selected, setSelected] = useState<number | null>(null)
  function navigate(nextView: string) {
    setView(nextView)
    setSelected(null)
    window.scrollTo({ top: 0 })
  }

  function openLesson(index: number) {
    setView('lessons')
    setSelected(index)
    window.scrollTo({ top: 0 })
  }

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <Sidebar view={view} onNavigate={navigate} />
    <main id="main-content" className="page-content">
      {view === 'overview' && <LandingPage onLessons={() => navigate('lessons')} />}
      {view === 'lessons' && selected === null && <>
        <header className="unit-heading">
          <p className="unit-level">Third Level Computing Science</p>
          <h1>Lessons</h1>
          <p>Choose a lesson to learn the programming concept. Your practical tasks are in your booklet.</p>
        </header>
        <section aria-labelledby="lessons-heading">
          <div className="section-heading"><h2 id="lessons-heading">Lessons</h2></div>
          <div className="lesson-list">{lessons.map((lesson, index) => <LessonCard key={lesson.title} lesson={lesson} index={index} onOpen={() => openLesson(index)} />)}</div>
        </section>
      </>}
      {view === 'lessons' && selected !== null && <LessonDetail key={selected} lesson={lessons[selected]!} index={selected} onBack={() => navigate('lessons')} />}
      {view === 'playground' && <ShapeExplorer />}

      <footer>Python Turtle programming <span>Third Level Computing Science</span></footer>
    </main>
  </>
}



