const FORMAL_WORDS = [
  'therefore',
  'furthermore',
  'moreover',
  'assist',
  'purchase',
  'require',
  'obtain',
  'reside',
  'demonstrate',
  'subsequent',
  'utilize',
  'commence',
]

const CASUAL_WORDS = [
  'help',
  'buy',
  'get',
  'live',
  'start',
  'show',
  'ask',
  'talk',
  'deal',
  'hang',
  'pick',
  'try',
]

function getCategory(word, index) {
  const lowered = word.toLowerCase()

  if (FORMAL_WORDS.includes(lowered)) return 'formal'
  if (CASUAL_WORDS.includes(lowered)) return 'casual'

  if (index % 3 === 0) return 'formal'
  if (index % 3 === 1) return 'casual'
  return 'academic'
}

export function categorizeSuggestions(items) {
  return items.slice(0, 12).map((item, index) => ({
    word: item.word,
    score: item.score,
    category: getCategory(item.word, index),
  }))
}
