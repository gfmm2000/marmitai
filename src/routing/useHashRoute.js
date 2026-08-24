import { useCallback, useEffect, useState } from 'react'

const defaultPath = '/refeicoes'

function getPathname() {
  const path = window.location.hash.replace(/^#/, '')
  return path || defaultPath
}

export function useHashRoute() {
  const [pathname, setPathname] = useState(getPathname)

  useEffect(() => {
    function syncPathname() {
      setPathname(getPathname())
    }

    window.addEventListener('hashchange', syncPathname)
    return () => window.removeEventListener('hashchange', syncPathname)
  }, [])

  const navigate = useCallback((path) => {
    window.location.hash = path
  }, [])

  return { navigate, pathname }
}
