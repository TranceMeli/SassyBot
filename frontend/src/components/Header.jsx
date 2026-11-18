import { MoonIcon, RobotIcon, SunIcon, WifiOffIcon } from './Icons.jsx'

export default function Header({ online, theme, onToggleTheme }) {
  const isDark = theme === 'dark'

  return (
    <header className="header">
      <div className="avatar">
        <RobotIcon />
      </div>
      <div className="header-text">
        <h1 className="logo">SassyBot</h1>
        {online ? (
          <p className="status">
            <span className="status-dot" aria-hidden="true" />
            Online · replies in seconds
          </p>
        ) : (
          <p className="status offline">
            <WifiOffIcon />
            Offline
          </p>
        )}
      </div>
      <button
        type="button"
        className="icon-btn"
        onClick={onToggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  )
}
