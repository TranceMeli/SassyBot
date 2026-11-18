// Outline icons (Tabler-style, 24px grid). Decorative by default.
function Icon({ children, ...props }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export const RobotIcon = () => (
  <Icon>
    <rect x="5" y="8" width="14" height="11" rx="3" />
    <path d="M12 4v4M9.5 13h.01M14.5 13h.01M10 16.5h4M3 12v3M21 12v3" />
  </Icon>
)

export const SendIcon = () => (
  <Icon>
    <path d="M10 14 21 3M21 3l-6.5 18a.55.55 0 0 1-1 0L10 14l-7-3.5a.55.55 0 0 1 0-1L21 3" />
  </Icon>
)

export const SunIcon = () => (
  <Icon>
    <circle cx="12" cy="12" r="4" />
    <path d="M3 12h1M12 3v1M20 12h1M12 20v1M5.6 5.6l.7.7M18.4 5.6l-.7.7M17.7 17.7l.7.7M6.3 17.7l-.7.7" />
  </Icon>
)

export const MoonIcon = () => (
  <Icon>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
  </Icon>
)

export const AlertIcon = () => (
  <Icon>
    <path d="M12 9v4M12 17h.01" />
    <path d="M10.24 3.96 2.39 17.06A2 2 0 0 0 4.1 20h15.8a2 2 0 0 0 1.71-2.94L13.76 3.96a2 2 0 0 0-3.52 0z" />
  </Icon>
)

export const RefreshIcon = () => (
  <Icon>
    <path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4" />
  </Icon>
)

export const WifiOffIcon = () => (
  <Icon>
    <path d="M12 18h.01M9.17 15.17a4 4 0 0 1 5.66 0M6.34 12.34a8 8 0 0 1 4.37-2.23M15.5 10.5a8 8 0 0 1 2.16 1.84M3.5 9.5a12 12 0 0 1 3.7-2.6M10.6 6.1a12 12 0 0 1 9.9 3.4M3 3l18 18" />
  </Icon>
)
