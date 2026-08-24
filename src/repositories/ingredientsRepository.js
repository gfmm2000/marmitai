const storageKey = 'marmitai.ingredients'

function readIngredients() {
  try {
    const savedIngredients = window.localStorage.getItem(storageKey)
    const ingredients = savedIngredients ? JSON.parse(savedIngredients) : []
    return Array.isArray(ingredients) ? ingredients : []
  } catch {
    return []
  }
}

function saveIngredients(ingredients) {
  window.localStorage.setItem(storageKey, JSON.stringify(ingredients))
}

function createId() {
  return window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const ingredientsRepository = {
  list() {
    return readIngredients().sort((first, second) => first.name.localeCompare(second.name, 'pt-PT'))
  },

  create({ name }) {
    const ingredient = { id: createId(), name: name.trim(), createdAt: new Date().toISOString() }
    saveIngredients([...readIngredients(), ingredient])
    return ingredient
  },

  update(id, { name }) {
    const ingredients = readIngredients().map((ingredient) =>
      ingredient.id === id ? { ...ingredient, name: name.trim() } : ingredient,
    )
    saveIngredients(ingredients)
  },

  remove(id) {
    saveIngredients(readIngredients().filter((ingredient) => ingredient.id !== id))
  },
}
