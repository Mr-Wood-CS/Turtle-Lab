import { useRef, useState } from 'react'
import type { Lesson } from '../data/lessons'
import { pupilNotes } from '../data/pupilNotes'
import { conceptPageTitles } from '../data/conceptPageTitles'
import LearningObjectives from './LearningObjectives'
import LessonPagination from './LessonPagination'
import ConceptDiagram from './ConceptDiagram'
import LessonIllustration from './LessonIllustration'
import './LessonDetail.css'

export default function LessonDetail({ lesson, index, onBack }: { lesson: Lesson; index: number; onBack: () => void }) {
  const [page, setPage] = useState(0)
  const [copyStatus, setCopyStatus] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)
  const notes = pupilNotes[index]!
  const ideaTitles = conceptPageTitles[index]!
  const titles = ['Learning intention & success criteria', 'The idea in everyday life', ...ideaTitles, 'Example code explained', 'What to remember']
  const examplePage = 2 + ideaTitles.length
  const isLastPage = page === titles.length - 1

  function changePage(next: number) {
    if (next < 0 || next >= titles.length) return
    setPage(next)
    setCopyStatus('')
    heading.current?.focus()
    window.scrollTo({ top: 0 })
  }

  async function copyCode() {
    try { await navigator.clipboard.writeText(lesson.code); setCopyStatus('Code copied') }
    catch { setCopyStatus('Select the code below and copy it manually.') }
  }

  return <section className={`lesson-detail ${page === examplePage ? 'lesson-detail-wide' : ''}`}>
    <button className="back-link" onClick={onBack}>&larr; All lessons</button>
    <header className="lesson-heading">
      <p className="unit-level">Lesson {index + 1}: {lesson.concept.name}</p>
      <p className="page-position">Page {page + 1} of {titles.length}</p>
      <h1 ref={heading} tabIndex={-1}>{titles[page]}</h1>
    </header>
    <div className="lesson-page" key={page}>
      {page === 0 && <><LearningObjectives lesson={lesson} /><p className="booklet-note">Read one page at a time. Use Next to continue, or choose a page from the menu below. Your practical tasks are in your booklet.</p></>}
      {page === 1 && <><p>{lesson.concept.explanation}</p><p className="familiar-example">{notes.familiar}</p><ConceptDiagram index={index} /></>}
      {page >= 2 && page < examplePage && <><p>{notes.paragraphs[page - 2]}</p><LessonIllustration lesson={index} part={page - 2} />{notes.words[page - 2] && <aside className="word-note"><h2>Key word: {notes.words[page - 2]![0]}</h2><p>{notes.words[page - 2]![1]}</p></aside>}</>}
      {page === examplePage && <>
        <p>Read the code alongside its explanation. You can run the example in Thonny.</p>
        <div className="example-layout">
          <section><h2>Example code</h2><div className="code-panel"><div className="code-heading"><span>lesson_{index + 1}.py</span><button onClick={copyCode}>Copy code</button></div><pre><code>{lesson.code}</code></pre></div><p className="copy-status" role="status">{copyStatus}</p></section>
          <section className="code-reading"><h2>Reading the code</h2><dl>{notes.commands.map(([command, meaning]) => <div key={command}><dt><code>{command}</code></dt><dd>{meaning}</dd></div>)}</dl></section>
        </div>
        <section className="example-result"><h2>What appears on screen?</h2><p>{notes.result}</p><LessonIllustration lesson={index} output /></section>
      </>}

      {isLastPage && <><p className="main-idea">{notes.remember}</p><section className="review-criteria"><h2>Success criteria</h2><p>You should now be able to say:</p><ul>{lesson.criteria.map(criterion => <li key={criterion}>I can {criterion.charAt(0).toLowerCase() + criterion.slice(1)}</li>)}</ul></section><p className="booklet-note">Use your booklet for the practical tasks. You can come back to any of these pages while you work.</p></>}
    </div>
    <LessonPagination titles={titles} current={page} onChange={changePage} onReturn={onBack} />
  </section>
}




