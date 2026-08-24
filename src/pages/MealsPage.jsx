import { useState } from 'react'
import { ingredientsRepository } from '../repositories/ingredientsRepository.js'
import { mealsRepository } from '../repositories/mealsRepository.js'

const emptyForm = { name: '', imageUrl: '', ingredientIds: [] }

export function MealsPage() {
  const [meals, setMeals] = useState(() => mealsRepository.list())
  const [form, setForm] = useState(emptyForm)
  const [editingMeal, setEditingMeal] = useState(null)
  const ingredients = ingredientsRepository.list()

  function resetForm() {
    setForm(emptyForm)
    setEditingMeal(null)
  }

  function toggleIngredient(ingredientId) {
    setForm((current) => ({
      ...current,
      ingredientIds: current.ingredientIds.includes(ingredientId)
        ? current.ingredientIds.filter((id) => id !== ingredientId)
        : [...current.ingredientIds, ingredientId],
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.name.trim()) return
    if (editingMeal) mealsRepository.update(editingMeal.id, form)
    else mealsRepository.create(form)
    setMeals(mealsRepository.list())
    resetForm()
  }

  function handleEdit(meal) {
    setEditingMeal(meal)
    setForm({ name: meal.name, imageUrl: meal.imageUrl, ingredientIds: meal.ingredientIds })
  }

  function handleDelete(meal) {
    if (!window.confirm(`Eliminar a refeição “${meal.name}”? `)) return
    mealsRepository.remove(meal.id)
    setMeals(mealsRepository.list())
    if (editingMeal?.id === meal.id) resetForm()
  }
  return (
    <section className="page" aria-labelledby="meals-heading">
      <div className="page-heading">
        <p className="eyebrow">As suas receitas</p>
        <h1 id="meals-heading">Refeições</h1>
        <p className="page-description">Crie refeições e associe os ingredientes que já registou.</p>
      </div>
      <div className="meals-grid">
        <form className="meal-form" onSubmit={handleSubmit}>
          <h2>{editingMeal ? 'Editar refeição' : 'Nova refeição'}</h2>
          <label htmlFor="meal-name">Nome</label>
          <input autoFocus id="meal-name" maxLength="100" onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Ex.: Frango com arroz" required value={form.name} />
          <label htmlFor="meal-image">Imagem (URL opcional)</label>
          <input id="meal-image" onChange={(event) => setForm((current) => ({ ...current, imageUrl: event.target.value }))} placeholder="https://..." type="url" value={form.imageUrl} />
          <fieldset className="ingredient-selector">
            <legend>Ingredientes</legend>
            {ingredients.length === 0 ? <p className="field-help">Adicione ingredientes primeiro para os poder associar.</p> : <div className="checkbox-list">{ingredients.map((ingredient) => <label className="checkbox-label" key={ingredient.id}><input checked={form.ingredientIds.includes(ingredient.id)} onChange={() => toggleIngredient(ingredient.id)} type="checkbox" />{ingredient.name}</label>)}</div>}
          </fieldset>
          <div className="form-actions"><button className="button button-primary" type="submit">{editingMeal ? 'Guardar alterações' : 'Adicionar refeição'}</button>{editingMeal && <button className="button button-secondary" onClick={resetForm} type="button">Cancelar</button>}</div>
        </form>
        <div className="meal-list-panel">
          <div className="list-heading"><h2>As suas refeições</h2><span>{meals.length}</span></div>
          {meals.length === 0 ? <p className="empty-state">Ainda não tem refeições. Crie a primeira para começar a planear.</p> : <ul className="meal-list">{meals.map((meal) => <li className="meal-card" key={meal.id}>{meal.imageUrl ? <img alt="" className="meal-image" src={meal.imageUrl} /> : <div aria-hidden="true" className="meal-image meal-image-placeholder">🍲</div>}<div className="meal-details"><h3>{meal.name}</h3><p>{meal.ingredientIds.length ? meal.ingredientIds.map((id) => ingredients.find((ingredient) => ingredient.id === id)?.name).filter(Boolean).join(', ') || 'Sem ingredientes disponíveis' : 'Sem ingredientes associados'}</p></div><div className="row-actions"><button className="text-button" onClick={() => handleEdit(meal)} type="button">Editar</button><button className="text-button text-button-danger" onClick={() => handleDelete(meal)} type="button">Eliminar</button></div></li>)}</ul>}
        </div>
      </div>
    </section>
  )
}
