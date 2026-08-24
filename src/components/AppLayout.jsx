import { Navigation } from './Navigation.jsx'

export function AppLayout({ children, currentPath, navigate }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <a className="brand" href="#/refeicoes" onClick={() => navigate('/refeicoes')}>
          Marmitaí
        </a>
        <Navigation currentPath={currentPath} navigate={navigate} />
      </header>
      <main className="app-content">{children}</main>
    </div>
  )
}
