import { useEffect, useRef } from 'react'
import Message, { TypingIndicator } from './Message.jsx'

export default function ChatWindow({ messages, isTyping }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="chat-window">
      <div className="sys-line">— session started —</div>
      {messages.map(msg => (
        <Message key={msg.id} role={msg.role} text={msg.text} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  )
}