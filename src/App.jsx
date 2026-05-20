import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Vocabulary from './components/Vocabulary'
import SentenceAnalyzer from './components/SentenceAnalyzer'
import ReadingPractice from './components/ReadingPractice'
import WritingReview from './components/WritingReview'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="vocabulary" element={<Vocabulary />} />
          <Route path="sentence-analyzer" element={<SentenceAnalyzer />} />
          <Route path="reading" element={<ReadingPractice />} />
          <Route path="writing" element={<WritingReview />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
