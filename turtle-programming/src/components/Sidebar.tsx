import './Sidebar.css'

export default function Sidebar({ view, onNavigate }: { view: string; onNavigate: (view: string) => void }) {
  return <header className="site-header">
    <div className="site-header-inner">
      <a className="brand" href="#/" onClick={event => { event.preventDefault(); onNavigate('overview') }}>Turtle Lab</a>
      <nav aria-label="Main navigation">
        {[
          ['overview', 'Home'],
          ['lessons', 'Lessons'],
          ['playground', 'Shape explorer'],

        ].map(([id, label]) => <button key={id} className={(view === id) ? 'active' : ''} aria-current={(view === id) ? 'page' : undefined} onClick={() => onNavigate(id)}>{label}</button>)}
      </nav>
    </div>
  </header>
}

