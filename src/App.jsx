import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [bgColor, setBgColor] = useState(() => {
    const saved = localStorage.getItem('bgColor')
    return saved || '#1e293b'
  })
  const [colorHistory, setColorHistory] = useState(() => {
    const saved = localStorage.getItem('colorHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [showHistory, setShowHistory] = useState(false)
  const [copyFeedback, setCopyFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [previewColor, setPreviewColor] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const colors = [
    { name: 'Slate', value: '#1e293b' },
    { name: 'Snow', value: '#f8fafc' },
    { name: 'Midnight', value: '#1e1b4b' },
    { name: 'Forest', value: '#14532d' },
    { name: 'Lime', value: '#84cc16' },
    { name: 'Sunset', value: '#f97316' },
    { name: 'Plum', value: '#a855f7' },
    { name: 'Peach', value: '#fdba74' },
    { name: 'Blush', value: '#fb7185' },
    { name: 'Sky', value: '#38bdf8' },
    { name: 'Gold', value: '#eab308' },
    { name: 'Lavender', value: '#c4b5fd' },
    { name: 'Mint', value: '#06b6d4' },
    { name: 'Sand', value: '#d6d3d1' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Cocoa', value: '#78350f' },
    { name: 'Cherry', value: '#be123c' },
    { name: 'Steel', value: '#64748b' },
    { name: 'Rainbow', value: 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)' }
  ]

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.repeat) return
      const key = parseInt(e.key)
      if (key >= 1 && key <= colors.length) {
        changeColor(colors[key - 1].value)
      } else if (e.key === '0') {
        changeColor('#1e293c')
      } else if (e.key === ' ') {
        e.preventDefault()
        getRandomColor()
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    setTimeout(() => setIsLoading(false), 1000)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const changeColor = useCallback((color) => {
    setBgColor(color)
    localStorage.setItem('bgColor', color)
    setColorHistory(prev => [color, ...prev.slice(0, 15)])
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
  }, [])

  const copyColorCode = (color) => {
    navigator.clipboard.writeText(color)
    console.log('Copied to clipboard:', color)
  }

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    const selectedColor = colors[randomIndex].value
    changeColor(selectedColor)
  }

  return (
    <div style={{ background: previewColor || bgColor, minHeight: '100vh', width: '100vw', transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
      <div className="container">
        <div className="header">
          <h1>Color Studio</h1>
          <p>Active: {colors.find(c => c.value === bgColor)?.name || 'Custom'} ({bgColor})</p>
          <p className="color-count">{colors.length} presets</p>
          <p className="shortcut-hint">Hotkeys: 1-9 select, 0 reset, Space random</p>
          <p className="version">v2.1.0</p>
        </div>
        <div className="color-grid">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => changeColor(color.value)}
              onMouseEnter={() => setPreviewColor(color.value)}
              onMouseLeave={() => setPreviewColor(null)}
              className={`color-btn ${bgColor === color.value ? 'active' : ''}`}
              style={{ background: color.value }}
              title={`${color.name}: ${color.value}`}
              aria-label={`Apply ${color.name} background`}
            >
              <span className="color-name">{color.name}</span>
              <span className="color-code" onClick={(e) => { e.stopPropagation(); copyColorCode(color.value); }}>{color.value}</span>
            </button>
          ))}
        </div>
        <div className="button-row">
          <button 
            onClick={() => changeColor('#1e293b')}
            className="reset-btn"
            aria-label="Apply default slate background"
          >
            Default
          </button>
          <button 
            onClick={getRandomColor}
            className="random-btn"
            aria-label="Get a surprise random color"
          >
            Surprise Me
          </button>
        </div>
      </div>
      )}
    </div>
  )
}

export default App
