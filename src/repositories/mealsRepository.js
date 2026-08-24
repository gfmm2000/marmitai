const storageKey = 'marmitai.meals'

function readMeals() {
  try {
    const savedMeals = window.localStorage.getItem(storageKey)
    const meals = savedMeals ? JSON.parse(savedMeals) : []
    return Array.isArray(meals) ? meals : []
  } catch {
    return []
  }
}

function saveMeals(meals) {
  window.localStorage.setItem(storageKey, JSON.stringify(meals))
}

function createId() {
  return window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function sanitizeMeal({ name, imageUrl = '', ingredientIds = [] }) {
  return { name: name.trim(), imageUrl: imageUrl.trim(), ingredientIds: [...new Set(ingredientIds)] }
}

export const mealsRepository = {
  list() {
    return readMeals().sort((first, second) => first.name.localeCompare(second.name, 'pt-PT'))
  },

  create(data) {
    const meal = { id: createId(), ...sanitizeMeal(data), createdAt: new Date().toISOString() }
    saveMeals([...readMeals(), meal])
    return meal
  },

  update(id, data) {
    saveMeals(readMeals().map((meal) => (meal.id === id ? { ...meal, ...sanitizeMeal(data) } : meal)))
  },

  remove(id) {
    saveMeals(readMeals().filter((meal) => meal.id !== id))
  },
}
