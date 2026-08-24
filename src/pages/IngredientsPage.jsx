import { useState } from 'react'
import { ingredientsRepository } from '../repositories/ingredientsRepository.js'

export function IngredientsPage() {
  const [ingredients, setIngredients] = useState(() => ingredientsRepository.list())
  const [name, setName] = useState('')
  const [editingIngredient, setEditingIngredient] = useState(null)

  function refreshIngredients() {
    setIngredients(ingredientsRepository.list())
  }

  function resetForm() {
    setName('')
    setEditingIngredient(null)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const normalizedName = name.trim()
    if (!normalizedName) return

    if (editingIngredient) {
      ingredientsRepository.update(editingIngredient.id, { name: normalizedName })
    } else {
      ingredientsRepository.create({ name: normalizedName })
    }

    refreshIngredients()
    resetForm()
  }

  function handleEdit(ingredient) {
    setEditingIngredient(ingredient)
    setName(ingredient.name)
  }

  function handleDelete(ingredient) {
    if (!window.confirm(`Eliminar o ingrediente “${ingredient.name}”?`)) return
    ingredientsRepository.remove(ingredient.id)
    refreshIngredients()
    if (editingIngredient?.id === ingredient.id) resetForm()
  }

  return (
    <section className="page" aria-labelledby="ingredients-heading">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Base da despensa</p>
          <h1 id="ingredients-heading">Ingredientes</h1>
          <p className="page-description">Crie os ingredientes que poderá associar às suas refeições.</p>
        </div>
      </div>

      <div className="ingredients-grid">
        <form className="ingredient-form" onSubmit={handleSubmit}>
          <h2>{editingIngredient ? 'Editar ingrediente' : 'Novo ingrediente'}</h2>
          <label htmlFor="ingredient-name">Nome</label>
          <input
            autoFocus
            id="ingredient-name"
            maxLength="100"
            onChange={(event) => setName(event.target.value)}
            placeholder="Ex.: Arroz"
            required
            value={name}
          />
          <div className="form-actions">
            <button className="button button-primary" type="submit">
              {editingIngredient ? 'Guardar alterações' : 'Adicionar ingrediente'}
            </button>
            {editingIngredient && (
              <button className="button button-secondary" onClick={resetForm} type="button">
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="ingredient-list-panel">
          <div className="list-heading">
            <h2>Os seus ingredientes</h2>
            <span>{ingredients.length}</span>
          </div>
          {ingredients.length === 0 ? (
            <p className="empty-state">Ainda não tem ingredientes. Comece por adicionar o primeiro.</p>
          ) : (
            <ul className="ingredient-list">
              {ingredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <span>{ingredient.name}</span>
                  <div className="row-actions">
                    <button className="text-button" onClick={() => handleEdit(ingredient)} type="button">Editar</button>
                    <button className="text-button text-button-danger" onClick={() => handleDelete(ingredient)} type="button">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
