import { useState } from 'react'
import { SendIcon } from './Icons.jsx'

export default function InputBar({ onSend }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onSend(trimmed)
    setText('')
  }

  return (
    <form className="input-bar" onSubmit={handleSubmit}>
      <label htmlFor="chat-input" className="sr-only">
        Message SassyBot
      </label>
      <input
        id="chat-input"
        type="text"
        className="chat-input"
        placeholder="Say something… if you must"
        autoComplete="off"
        value={text}
        onChange={e => setText(e.target.value)}
        autoFocus
      />
      <button type="submit" className="send-btn">
        <SendIcon />
        Send
      </button>
    </form>
  )
}
