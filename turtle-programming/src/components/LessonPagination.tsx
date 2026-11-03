import './LessonPagination.css'

export default function LessonPagination({ titles, current, onChange, onReturn }: { titles: string[]; current: number; onChange: (page: number) => void; onReturn: () => void }) {
  const isLastPage = current === titles.length - 1
  return <nav className="lesson-pagination" aria-label="Lesson pages">
    <div className="page-selector">
      <label htmlFor="lesson-page">Page {current + 1} of {titles.length}</label>
      <select id="lesson-page" value={current} onChange={event => onChange(Number(event.target.value))}>
        {titles.map((title, index) => <option key={index} value={index}>{index + 1}. {title}</option>)}
      </select>
    </div>
    <div className="page-buttons">
      {isLastPage ? <button className="button primary" onClick={onReturn}>Return to lessons</button> : <>
        <button className="button previous-page" disabled={current === 0} onClick={() => onChange(current - 1)}>Previous</button>
        <button className="button primary" onClick={() => onChange(current + 1)}>Next <span aria-hidden="true">&rarr;</span></button>
      </>}
    </div>
  </nav>
}
