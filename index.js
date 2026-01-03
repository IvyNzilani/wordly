const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

// ========================
// FETCH WORD DATA
// ========================
async function fetchWord(word) {
  const input = document.getElementById('word-input')

  if (!word) {
    displayError('Please enter a word')
    return
  }

  try {
    const res = await fetch(`${API_URL}${word}`)
    if (!res.ok) throw new Error('Word not found')

    const data = await res.json()
    displayWord(data[0])
    clearError()

    if (input) input.value = ''
  } catch (error) {
    displayError(error.message)
  }
}

// ========================
// DISPLAY WORD DATA
// ========================
function displayWord(data) {
  const title = document.getElementById('word-title')
  const phonetic = document.getElementById('phonetic')
  const audio = document.getElementById('audio')
  const definition = document.getElementById('definition')
  const synonyms = document.getElementById('synonyms')

  if (!title || !phonetic || !audio || !definition || !synonyms) return

  title.textContent = data.word
  phonetic.textContent = data.phonetic || 'No pronunciation available'
  definition.textContent = data.meanings[0].definitions[0].definition
  synonyms.textContent = data.meanings[0].definitions[0].synonyms?.join(', ') || 'No synonyms'

  if (data.phonetics[0]?.audio) {
    audio.src = data.phonetics[0].audio
    audio.classList.remove('hidden')
  } else {
    audio.classList.add('hidden')
  }
}

// ========================
// ERROR HANDLING
// ========================
function displayError(message) {
  const errorDiv = document.getElementById('error')
  if (!errorDiv) return

  errorDiv.textContent = message
  errorDiv.classList.remove('hidden')
}

function clearError() {
  const errorDiv = document.getElementById('error')
  if (!errorDiv) return

  errorDiv.textContent = ''
  errorDiv.classList.add('hidden')
}

// ========================
// FORM SUBMISSION
// ========================
document.getElementById('search-form')?.addEventListener('submit', e => {
  e.preventDefault()
  const input = document.getElementById('word-input')
  fetchWord(input.value.trim())
})

// ========================
// EXPORTS FOR TESTING
// ========================
if (typeof module !== 'undefined') {
  module.exports = {
    fetchWord,
    displayWord,
    displayError,
    clearError
  }
}
ccz-vaij-kvw