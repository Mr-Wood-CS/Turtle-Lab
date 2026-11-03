import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import LessonCard from './components/LessonCard'
import LessonDetail from './components/LessonDetail'
import ShapeExplorer from './components/ShapeExplorer'
import LandingPage from './components/LandingPage'
import { lessons } from './data/lessons'
import './App.css'

type Route = { view: string; selected: number | null }

function readRoute(hash: string): Route {
  const lessonMatch = /^#\/lesson\/([1-9]\d*)\/?$/.exec(hash)
  if (lessonMatch) {
    const index = Number(lessonMatch[1]) - 1
    if (index >= 0 && index < lessons.length) return { view: 'lessons', selected: index }
    return { view: 'lessons', selected: null }
  }
  if (hash === '#/lessons') return { view: 'lessons', selected: null }
  if (hash === '#/playground') return { view: 'playground', selected: null }
  return { view: 'overview', selected: null }
}
export default function App() {
  const [route, setRoute] = useState(() => readRoute(window.location.hash))
  const { view, selected } = route

  useEffect(() => {
    function syncRoute() {
      setRoute(readRoute(window.location.hash))
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  function navigate(nextView: string) {
    window.location.hash = nextView === 'overview' ? '/' : `/${nextView}`
  }

  function openLesson(index: number) {
    window.location.hash = `/lesson/${index + 1}`
  }
  return <>
    <a className="skip-link" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus() }}>Skip to content</a>
    <Sidebar view={view} onNavigate={navigate} />
    <main id="main-content" className="page-content" tabIndex={-1}>
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



