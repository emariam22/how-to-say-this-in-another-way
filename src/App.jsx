import { useEffect, useMemo, useState } from 'react'
import './App.css'
import PhraseForm from './components/PhraseForm'
import ResultsSection from './components/ResultsSection'
import SavedPhrases from './components/SavedPhrases'
import { getSuggestions } from './services/datamuse'

const STORAGE_KEY = 'saved-language-phrases'

function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [savedPhrases, setSavedPhrases] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setSavedPhrases(JSON.parse(saved))
      } catch (err) {
        console.error('Could not parse saved phrases:', err)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPhrases))
  }, [savedPhrases])

  async function handleSearch(userInput) {
    const trimmed = userInput.trim()
    setQuery(trimmed)
    setError('')
    setResults([])

    if (!trimmed) {
      setError('Please enter a word or phrase first.')
      return
    }

    try {
      setLoading(true)
      const data = await getSuggestions(trimmed)

      if (!data.length) {
        setError('No suggestions were found. Try a different word or a shorter phrase.')
      }

      setResults(data)
    } catch (err) {
      console.error(err)
      setError('Something went wrong while getting suggestions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSave(item) {
    const alreadySaved = savedPhrases.some(
      (saved) => saved.word.toLowerCase() === item.word.toLowerCase()
    )

    if (alreadySaved) return

    setSavedPhrases((prev) => [item, ...prev])
  }

  function handleRemove(wordToRemove) {
    setSavedPhrases((prev) =>
      prev.filter((item) => item.word.toLowerCase() !== wordToRemove.toLowerCase())
    )
  }

  const filteredSavedPhrases = useMemo(() => {
    if (activeFilter === 'all') return savedPhrases
    return savedPhrases.filter((item) => item.category === activeFilter)
  }, [savedPhrases, activeFilter])

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Language Assistant</p>
          <h1>How to Say This in Another Way</h1>
          <p className="hero-text">
            Enter a word or short phrase to get alternative ways to express it by tone,
            along with example sentences and a saved list for later review.
          </p>
        </div>
      </header>

      <main className="main-grid">
        <section className="card search-card">
          <PhraseForm onSearch={handleSearch} loading={loading} />

          {error && <p className="message error-message">{error}</p>}
          {loading && <p className="message">Loading suggestions...</p>}

          {!loading && !error && results.length > 0 && (
            <ResultsSection
              query={query}
              results={results}
              onSave={handleSave}
              savedPhrases={savedPhrases}
            />
          )}
        </section>

        <aside className="card sidebar-card">
          <SavedPhrases
            items={filteredSavedPhrases}
            allItems={savedPhrases}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onRemove={handleRemove}
          />
        </aside>
      </main>
    </div>
  )
}

export default App
