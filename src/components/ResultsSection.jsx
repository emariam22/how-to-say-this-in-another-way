function buildExampleSentence(word, category, originalQuery) {
  const templates = {
    formal: `A more formal way to express "${originalQuery}" is "${word}" in professional writing.`,
    casual: `In a casual conversation, someone might say "${word}" instead of "${originalQuery}".`,
    academic: `In an academic context, "${word}" could be used in place of "${originalQuery}" for a more precise tone.`,
  }

  return templates[category] || `"${word}" can be used as an alternative to "${originalQuery}".`
}

function ResultsSection({ query, results, onSave, savedPhrases }) {
  function isSaved(word) {
    return savedPhrases.some((item) => item.word.toLowerCase() === word.toLowerCase())
  }

  return (
    <div className="results-wrapper">
      <div className="results-header">
        <h2>Suggestions for: “{query}”</h2>
        <p className="section-text">
          These results are grouped by tone to make the options easier to understand.
        </p>
      </div>

      <div className="results-grid">
        {results.map((item) => (
          <article key={`${item.word}-${item.category}`} className="result-card">
            <div className="result-top">
              <h3>{item.word}</h3>
              <span className={`badge badge-${item.category}`}>{item.category}</span>
            </div>

            <p className="score-text">Relevance score: {item.score}</p>
            <p className="example-label">Example sentence</p>
            <p className="example-text">
              {buildExampleSentence(item.word, item.category, query)}
            </p>

            <button
              type="button"
              className="save-button"
              disabled={isSaved(item.word)}
              onClick={() => onSave(item)}
            >
              {isSaved(item.word) ? 'Saved' : 'Save Phrase'}
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

export default ResultsSection