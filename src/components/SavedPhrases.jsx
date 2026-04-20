function SavedPhrases({ items, allItems, activeFilter, onFilterChange, onRemove }) {
  return (
    <div>
      <div className="saved-header">
        <h2>Saved Phrases</h2>
        <p className="section-text">Your saved items stay in the browser using local storage.</p>
      </div>

      <div className="filter-row">
        <label htmlFor="category-filter">Filter:</label>
        <select
          id="category-filter"
          value={activeFilter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
          <option value="academic">Academic</option>
        </select>
      </div>

      <p className="saved-count">{allItems.length} saved total</p>

      {items.length === 0 ? (
        <p className="empty-state">No saved phrases in this category yet.</p>
      ) : (
        <ul className="saved-list">
          {items.map((item) => (
            <li key={`${item.word}-${item.category}`} className="saved-item">
              <div>
                <strong>{item.word}</strong>
                <p>{item.category}</p>
              </div>
              <button type="button" onClick={() => onRemove(item.word)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SavedPhrases