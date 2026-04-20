import { useState } from 'react'

function PhraseForm({ onSearch, loading }) {
  const [input, setInput] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSearch(input)
  }

  return (
    <div>
      <h2>Search for another way to say something</h2>
      <p className="section-text">
        Try words like <strong>happy</strong>, <strong>important</strong>, or short phrases
        like <strong>work together</strong>.
      </p>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a word or short phrase"
          aria-label="Enter a word or phrase"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Get Suggestions'}
        </button>
      </form>
    </div>
  )
}

export default PhraseForm
