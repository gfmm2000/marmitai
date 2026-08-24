const navigationItems = [
  { href: '/refeicoes', label: 'Refeições' },
  { href: '/ingredientes', label: 'Ingredientes' },
  { href: '/planear', label: 'Planear' },
]

export function Navigation({ currentPath, navigate }) {
  return (
    <nav aria-label="Navegação principal">
      <ul className="navigation-list">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <a
              aria-current={currentPath === item.href ? 'page' : undefined}
              className={currentPath === item.href ? 'navigation-link is-active' : 'navigation-link'}
              href={`#${item.href}`}
              onClick={() => navigate(item.href)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
