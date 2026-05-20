const API_BASE = '/api'

async function fetchAPI(endpoint, body) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok) {
    const err = new Error(data.error || `请求失败 (${res.status})`)
    err.status = res.status
    err.needConfig = data.needConfig
    throw err
  }

  return data
}

export async function analyzeSentence(sentence) {
  return fetchAPI('analyze-sentence', { sentence })
}

export async function reviewWriting(essay) {
  return fetchAPI('review-writing', { essay })
}
