import { useState, useEffect, useCallback } from 'react'
import './App.css'

function App() {
  const [bgColor, setBgColor] = useState(() => {
    const saved = localStorage.getItem('bgColor')
    return saved || '#1e293b'
  })
  const [colorHistory, setColorHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [previewColor, setPreviewColor] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const colors = [
    { name: 'Slate', value: '#1e293b' },
    { name: 'Navy', value: '#1e3a8a' },
    { name: 'Emerald', value: '#10b981' },
    { name: 'Violet', value: '#8b5cf6' },
    { name: 'Rose', value: '#f43f5e' },
    { name: 'Amber', value: '#f59e0b' },
    { name: 'Teal', value: '#14b8a6' },
    { name: 'Indigo', value: '#6366f1' },
    { name: 'Crimson', value: '#ef4444' },
    { name: 'Charcoal', value: '#4b5563' },
    { name: 'Gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }
  ]

  useEffect(() => {
    const handleKeyPress = (e) => {
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
    setTimeout(() => setIsLoading(false), 1200)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const changeColor = useCallback((color) => {
    setBgColor(color)
    localStorage.setItem('bgColor', color)
    setColorHistory(prev => [color, ...prev.slice(0, 12)])
  }, [])

  const copyColorCode = (color) => {
    navigator.clipboard.writeText(color)
    console.log('Color copied:', color)
  }

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    const selectedColor = colors[randomIndex].value
    changeColor(selectedColor)
  }

  return (
    <div style={{ background: previewColor || bgColor, minHeight: '100vh', width: '100vw', transition: 'background 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}>
      {isLoading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
      <div className="container">
        <div className="header">
          <h1>Background Changer</h1>
          <p>Current: {colors.find(c => c.value === bgColor)?.name || 'Custom'} ({bgColor})</p>
          <p className="color-count">{colors.length} colors</p>
          <p className="shortcut-hint">Press 1-9 for colors, 0 to reset, Space for random color</p>
          <p className="version">v1.1.0</p>
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
              title={`${color.name} - ${color.value}`}
              aria-label={`Change background to ${color.name}`}
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
            aria-label="Reset background to dark slate"
          >
            Reset to Default
          </button>
          <button 
            onClick={getRandomColor}
            className="random-btn"
            aria-label="Select random background color"
          >
            Random Color
          </button>
        </div>
      </div>
      )}
    </div>
  )
}

export default App
