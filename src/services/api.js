const API_BASE = import.meta.env.VITE_API_URL || '/api'

const FETCH_TIMEOUT = 35000

async function fetchAPI(endpoint, body) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT)

  let res
  try {
    res = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })
  } catch (err) {
    clearTimeout(timeoutId)
    if (err.name === 'AbortError') {
      throw new Error('请求超时，AI 响应时间过长，请稍后重试')
    }
    throw new Error('网络连接失败，请检查网络或稍后重试')
  }
  clearTimeout(timeoutId)

  let data
  try {
    data = await res.json()
  } catch {
    throw new Error('服务器返回了非 JSON 格式的数据')
  }

  if (!res.ok) {
    const err = new Error(data?.error || `请求失败 (${res.status})`)
    err.status = res.status
    err.needConfig = data?.needConfig
    throw err
  }

  return data
}

/** Normalizers: ensure stable JSON structure for each endpoint */
function normalizeSentenceAnalysis(data) {
  if (!data || typeof data !== 'object') throw new Error('无效的句子分析结果')
  return {
    main: data.main || '',
    clauses: Array.isArray(data.clauses) ? data.clauses : [],
    modifiers: Array.isArray(data.modifiers) ? data.modifiers : [],
    keyWords: Array.isArray(data.keyWords) ? data.keyWords : [],
    translation: data.translation || '',
    examTips: Array.isArray(data.examTips) ? data.examTips : [],
  }
}

function normalizeWritingReview(data) {
  if (!data || typeof data !== 'object') throw new Error('无效的作文批改结果')
  return {
    score: typeof data.score === 'number' ? data.score : 0,
    totalScore: typeof data.totalScore === 'number' ? data.totalScore : 20,
    level: data.level || '未评级',
    grammarIssues: Array.isArray(data.grammarIssues) ? data.grammarIssues : [],
    improvements: Array.isArray(data.improvements) ? data.improvements : [],
    revisedEssay: data.revisedEssay || '',
    overallAdvice: data.overallAdvice || '',
  }
}

function normalizeReadingAnalysis(data) {
  if (!data || typeof data !== 'object') throw new Error('无效的阅读分析结果')
  return {
    structure: data.structure || '',
    paragraphSummaries: Array.isArray(data.paragraphSummaries) ? data.paragraphSummaries : [],
    questionAnalysis: Array.isArray(data.questionAnalysis) ? data.questionAnalysis : [],
    generalTips: Array.isArray(data.generalTips) ? data.generalTips : [],
  }
}

export async function analyzeSentence(sentence) {
  const raw = await fetchAPI('analyze-sentence', { sentence })
  return normalizeSentenceAnalysis(raw)
}

export async function reviewWriting(essay) {
  const raw = await fetchAPI('review-writing', { essay })
  return normalizeWritingReview(raw)
}

export async function analyzeReading(passage, questions) {
  const raw = await fetchAPI('analyze-reading', { passage, questions })
  return normalizeReadingAnalysis(raw)
}

function normalizeWordAnalysis(data) {
  if (!data || typeof data !== 'object') throw new Error('无效的单词分析结果')
  return {
    chineseMeaning: data.chineseMeaning || '',
    examMeanings: Array.isArray(data.examMeanings) ? data.examMeanings : [],
    rootAnalysis: data.rootAnalysis || '',
    exampleSentence: data.exampleSentence || '',
    exampleTranslation: data.exampleTranslation || '',
    confusingWords: Array.isArray(data.confusingWords) ? data.confusingWords : [],
    mnemonic: data.mnemonic || '',
    collocations: Array.isArray(data.collocations) ? data.collocations : [],
    writingUsage: data.writingUsage || '',
  }
}

export async function analyzeWord(word, meaning, phonetic, example) {
  const raw = await fetchAPI('analyze-word', { word, meaning, phonetic, example })
  return normalizeWordAnalysis(raw)
}
