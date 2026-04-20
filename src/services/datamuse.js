import { categorizeSuggestions } from '../utils/categorize'

export async function getSuggestions(query) {
  const cleanedQuery = query.trim()

  if (!cleanedQuery) return []

  const endpoint = `https://api.datamuse.com/words?ml=${encodeURIComponent(cleanedQuery)}&max=18`
  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error('Failed to fetch suggestions')
  }

  const data = await response.json()

  return categorizeSuggestions(data)
}