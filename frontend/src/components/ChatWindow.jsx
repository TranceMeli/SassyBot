import { useEffect, useRef } from 'react'
import Message, { ErrorNotice, TypingIndicator } from './Message.jsx'
import { RobotIcon } from './Icons.jsx'

const STARTERS = ['How are you?', 'Tell me a joke', 'Who are you?']

function EmptyState({ onSend }) {
  return (
    <div className="empty">
      <div className="avatar large">
        <RobotIcon />
      </div>
      <h2 className="empty-title">Go on, impress me</h2>
      <p className="empty-body">Ask anything. Expect attitude, not therapy.</p>
      <ul className="chips" aria-label="Conversation starters">
        {STARTERS.map(text => (
          <li key={text}>
            <button type="button" className="chip" onClick={() => onSend(text)}>
              {text}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function ChatWindow({ messages, isTyping, startedAt, onSend, onRetry }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    bottomRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [messages, isTyping])

  if (messages.length === 0 && !isTyping) {
    return (
      <main className="chat-window">
        <EmptyState onSend={onSend} />
      </main>
    )
  }

  const time = startedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <main className="chat-window">
      <p className="sys-line">Today, {time}</p>
      <div role="log" aria-live="polite" aria-label="Conversation" style={{ display: 'contents' }}>
        {messages.map(msg =>
          msg.role === 'error' ? (
            <ErrorNotice key={msg.id} onRetry={() => onRetry(msg.id)} />
          ) : (
            <Message key={msg.id} role={msg.role} text={msg.text} />
          )
        )}
        {isTyping && <TypingIndicator />}
      </div>
      <div ref={bottomRef} />
    </main>
  )
}
