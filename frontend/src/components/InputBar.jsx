import { useState } from 'react'

export default function InputBar({ onSend }) {
  const [text, setText] = useState('')

  function handleSend() {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="input-bar">
      <input
        type="text"
        className="chat-input"
        placeholder="say something… if you must"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      <button className="send-btn" onClick={handleSend}>
        Send
      </button>
    </div>
  )
}