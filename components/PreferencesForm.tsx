'use client'

import { useState, useEffect } from 'react'
import { UserPreferences } from '@/app/api/user/preferences/route'
import { Save, Loader2, Check } from 'lucide-react'

export default function PreferencesForm() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [hasPreferences, setHasPreferences] = useState(false)

  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    family_size: 2,
    servings_preference: 4,
    dietary_restrictions: [],
    allergies: [],
    dislikes: [],
    preferred_cuisines: [],
    cooking_skill_level: 'intermediate',
    max_prep_time: 45,
    budget_level: 'moderate',
    preferred_stores: [],
    meal_prep_day: 'sunday',
    snacks_included: true,
    breakfast_importance: 'moderate',
    has_kids: false,
    kid_ages: [],
    kid_friendly_required: false,
    nutrition_goals: [],
    protein_priority: false,
    batch_cooking_preference: false,
    leftover_tolerance: 'moderate',
    variety_importance: 'high'
  })

  useEffect(() => {
    fetchPreferences()
  }, [])

  const fetchPreferences = async () => {
    try {
      const response = await fetch('/api/user/preferences')
      if (response.ok) {
        const data = await response.json()
        if (data.hasPreferences && data.preferences) {
          setPreferences(data.preferences)
          setHasPreferences(true)
        }
      }
    } catch (error) {
      console.error('Failed to fetch preferences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)

    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      })

      if (!response.ok) {
        throw new Error('Failed to save preferences')
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Failed to save preferences:', error)
      alert('Failed to save preferences. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleArrayAdd = (field: keyof UserPreferences, value: string) => {
    const current = (preferences[field] as string[]) || []
    if (value && !current.includes(value)) {
      setPreferences({
        ...preferences,
        [field]: [...current, value]
      })
    }
  }

  const handleArrayRemove = (field: keyof UserPreferences, value: string) => {
    const current = (preferences[field] as string[]) || []
    setPreferences({
      ...preferences,
      [field]: current.filter(item => item !== value)
    })
  }

  if (loading) {
    return <div className="text-center py-8"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></div>
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Meal Planning Preferences</h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-amber-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : saved ? (
            <Check className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Preferences'}
        </button>
      </div>

      {/* Family & Serving Info */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Family & Serving Info</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Family Size</label>
            <input
              type="number"
              min="1"
              max="12"
              value={preferences.family_size}
              onChange={e => setPreferences({ ...preferences, family_size: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Servings per Recipe</label>
            <input
              type="number"
              min="1"
              max="12"
              value={preferences.servings_preference}
              onChange={e => setPreferences({ ...preferences, servings_preference: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </section>

      {/* Dietary Restrictions & Allergies */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Dietary Restrictions & Allergies</h3>
        <div className="space-y-4">
          <ArrayInput
            label="Dietary Restrictions"
            items={preferences.dietary_restrictions || []}
            suggestions={['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'pescatarian', 'keto', 'paleo']}
            onAdd={(value) => handleArrayAdd('dietary_restrictions', value)}
            onRemove={(value) => handleArrayRemove('dietary_restrictions', value)}
          />
          <ArrayInput
            label="Allergies"
            items={preferences.allergies || []}
            suggestions={['peanuts', 'tree nuts', 'dairy', 'eggs', 'shellfish', 'soy', 'wheat', 'gluten']}
            onAdd={(value) => handleArrayAdd('allergies', value)}
            onRemove={(value) => handleArrayRemove('allergies', value)}
          />
          <ArrayInput
            label="Dislikes"
            items={preferences.dislikes || []}
            suggestions={['mushrooms', 'olives', 'cilantro', 'onions', 'tomatoes', 'peppers']}
            onAdd={(value) => handleArrayAdd('dislikes', value)}
            onRemove={(value) => handleArrayRemove('dislikes', value)}
          />
        </div>
      </section>

      {/* Cooking Preferences */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Cooking Preferences</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cooking Skill Level</label>
            <select
              value={preferences.cooking_skill_level}
              onChange={e => setPreferences({ ...preferences, cooking_skill_level: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Prep Time (minutes)</label>
            <input
              type="number"
              min="10"
              max="120"
              step="5"
              value={preferences.max_prep_time}
              onChange={e => setPreferences({ ...preferences, max_prep_time: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Budget Level</label>
            <select
              value={preferences.budget_level}
              onChange={e => setPreferences({ ...preferences, budget_level: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="budget">Budget-Friendly</option>
              <option value="moderate">Moderate</option>
              <option value="premium">Premium</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Meal Prep Day</label>
            <select
              value={preferences.meal_prep_day}
              onChange={e => setPreferences({ ...preferences, meal_prep_day: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
              <option value="saturday">Saturday</option>
            </select>
          </div>
        </div>
      </section>

      {/* Kids & Family */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Kids & Family</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferences.has_kids}
              onChange={e => setPreferences({ ...preferences, has_kids: e.target.checked })}
              className="w-4 h-4"
            />
            <span>I have kids</span>
          </label>
          {preferences.has_kids && (
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.kid_friendly_required}
                onChange={e => setPreferences({ ...preferences, kid_friendly_required: e.target.checked })}
                className="w-4 h-4"
              />
              <span>Only show kid-friendly recipes</span>
            </label>
          )}
        </div>
      </section>

      {/* Special Preferences */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Special Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferences.snacks_included}
              onChange={e => setPreferences({ ...preferences, snacks_included: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Include snack suggestions</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferences.batch_cooking_preference}
              onChange={e => setPreferences({ ...preferences, batch_cooking_preference: e.target.checked })}
              className="w-4 h-4"
            />
            <span>I prefer batch cooking / meal prep</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferences.protein_priority}
              onChange={e => setPreferences({ ...preferences, protein_priority: e.target.checked })}
              className="w-4 h-4"
            />
            <span>Prioritize high-protein recipes</span>
          </label>
          <div>
            <label className="block text-sm font-medium mb-2">Leftover Tolerance</label>
            <select
              value={preferences.leftover_tolerance}
              onChange={e => setPreferences({ ...preferences, leftover_tolerance: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="minimal">Minimal - Prefer fresh meals</option>
              <option value="moderate">Moderate - Some leftovers OK</option>
              <option value="high">High - Love leftovers</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  )
}

// Helper component for array inputs with suggestions
function ArrayInput({
  label,
  items,
  suggestions,
  onAdd,
  onRemove
}: {
  label: string
  items: string[]
  suggestions: string[]
  onAdd: (value: string) => void
  onRemove: (value: string) => void
}) {
  const [inputValue, setInputValue] = useState('')

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim())
      setInputValue('')
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleAdd()}
          placeholder={`Add ${label.toLowerCase()}...`}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {suggestions.map(suggestion => (
          !items.includes(suggestion) && (
            <button
              key={suggestion}
              onClick={() => onAdd(suggestion)}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
            >
              + {suggestion}
            </button>
          )
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <div key={item} className="flex items-center gap-1 px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
            <span>{item}</span>
            <button
              onClick={() => onRemove(item)}
              className="text-teal-600 hover:text-teal-800 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
