import { AlertIcon, RefreshIcon } from './Icons.jsx'

export function TypingIndicator() {
  return (
    <div className="typing">
      <div className="typing-dots" aria-hidden="true">
        <span /><span /><span />
      </div>
      <span>SassyBot is typing…</span>
    </div>
  )
}

export function ErrorNotice({ onRetry }) {
  return (
    <div className="error-card" role="alert">
      <AlertIcon />
      <div>
        <p className="error-title">Couldn't reach SassyBot</p>
        <p className="error-body">Check that the server is running, then try again.</p>
        <button type="button" className="text-btn" onClick={onRetry}>
          <RefreshIcon />
          Retry
        </button>
      </div>
    </div>
  )
}

export default function Message({ role, text }) {
  return (
    <div className={`bubble ${role}`}>
      <span className="sr-only">{role === 'bot' ? 'SassyBot: ' : 'You: '}</span>
      {text}
    </div>
  )
}
