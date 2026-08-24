import { AppLayout } from './components/AppLayout.jsx'
import { IngredientsPage } from './pages/IngredientsPage.jsx'
import { MealsPage } from './pages/MealsPage.jsx'
import { PlannerPage } from './pages/PlannerPage.jsx'
import { useHashRoute } from './routing/useHashRoute.js'
import './App.css'

const routes = {
  '/ingredientes': IngredientsPage,
  '/planear': PlannerPage,
  '/refeicoes': MealsPage,
}

function App() {
  const { navigate, pathname } = useHashRoute()
  const Page = routes[pathname] ?? MealsPage

  return (
    <AppLayout currentPath={pathname} navigate={navigate}>
      <Page />
    </AppLayout>
  )
}

export default App
