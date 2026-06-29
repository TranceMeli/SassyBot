import { useState } from 'react'
import Header from './components/Header.jsx'
import ChatWindow from './components/ChatWindow.jsx'
import InputBar from './components/InputBar.jsx'

const INITIAL_MESSAGES = [
  { id: 1, role: 'bot', text: 'Oh great, another human. What do you want?' },
]

export default function App() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [isTyping, setIsTyping] = useState(false)

  async function sendMessage(text) {
    const userMsg = { id: Date.now(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      const botMsg = { id: Date.now() + 1, role: 'bot', text: data.response }
      setMessages(prev => [...prev, botMsg])
    } catch {
      const errMsg = { id: Date.now() + 1, role: 'bot', text: 'Error 500: I crashed. Impressive, honestly.' }
      setMessages(prev => [...prev, errMsg])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="shell">
      <Header />
      <ChatWindow messages={messages} isTyping={isTyping} />
      <InputBar onSend={sendMessage} />
    </div>
  )
}