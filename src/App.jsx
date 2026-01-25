import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [bgColor, setBgColor] = useState('#ffffff')

  const colors = [
    { name: 'Slate', value: '#1e293b' },
    { name: 'Navy', value: '#1e40af' },
    { name: 'Emerald', value: '#059669' },
    { name: 'Violet', value: '#7c3aed' },
    { name: 'Rose', value: '#e11d48' },
    { name: 'Amber', value: '#d97706' },
    { name: 'Teal', value: '#0d9488' },
    { name: 'Indigo', value: '#4338ca' },
    { name: 'Crimson', value: '#dc2626' },
    { name: 'Charcoal', value: '#374151' }
  ]

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = parseInt(e.key)
      if (key >= 1 && key <= colors.length) {
        setBgColor(colors[key - 1].value)
      } else if (e.key === '0') {
        setBgColor('#ffffff')
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    setBgColor(colors[randomIndex].value)
  }

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', width: '100vw', transition: 'background-color 0.5s ease' }}>
      <div className="container">
        <div className="header">
          <h1>Professional Background Changer</h1>
          <p>Selected: {colors.find(c => c.value === bgColor)?.name || 'Custom'} ({bgColor})</p>
          <p className="shortcut-hint">Press 1-9 for colors, 0 to reset</p>
        </div>
        <div className="color-grid">
          {colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setBgColor(color.value)}
              className={`color-btn ${bgColor === color.value ? 'active' : ''}`}
              style={{ backgroundColor: color.value }}
            >
              <span className="color-name">{color.name}</span>
              <span className="color-code">{color.value}</span>
            </button>
          ))}
        </div>
        <button 
          onClick={() => setBgColor('#ffffff')}
          className="reset-btn"
        >
          Reset
        </button>
        <button 
          onClick={getRandomColor}
          className="random-btn"
        >
          Random
        </button>
      </div>
    </div>
  )
}

export default App
