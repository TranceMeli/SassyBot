import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import InputBar from './components/InputBar.jsx'

const THEME_KEY = 'sassybot-theme'

function readStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY)
  } catch {
    return null
  }
}

function initialTheme() {
  const stored = readStoredTheme()
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

let nextId = 1
const newId = () => nextId++

export default function App() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [online, setOnline] = useState(true)
  const [startedAt, setStartedAt] = useState(null)
  const [theme, setTheme] = useState(initialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      // Storage unavailable (private mode): the toggle still works for this visit.
    }
  }

  async function requestReply(text) {
    setIsTyping(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setOnline(true)
      setMessages(prev => [...prev, { id: newId(), role: 'bot', text: data.response }])
    } catch {
      setOnline(false)
      setMessages(prev => [...prev, { id: newId(), role: 'error', retryText: text }])
    } finally {
      setIsTyping(false)
    }
  }

  function sendMessage(text) {
    if (!startedAt) setStartedAt(new Date())
    setMessages(prev => [...prev, { id: newId(), role: 'user', text }])
    requestReply(text)
  }

  function retry(errorId) {
    const failed = messages.find(m => m.id === errorId)
    if (!failed) return
    setMessages(prev => prev.filter(m => m.id !== errorId))
    requestReply(failed.retryText)
  }

  return (
    <div className="shell">
      <Header online={online} theme={theme} onToggleTheme={toggleTheme} />
      <ChatWindow
        messages={messages}
        isTyping={isTyping}
        startedAt={startedAt}
        onSend={sendMessage}
        onRetry={retry}
      />
      <InputBar onSend={sendMessage} />
    </div>
  )
}
