import { useState } from 'react'
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

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh', width: '100vw', transition: 'background-color 0.5s ease' }}>
      <div className="container">
        <div className="header">
          <h1>Professional Background Changer</h1>
          <p>Selected: {colors.find(c => c.value === bgColor)?.name || 'Custom'} ({bgColor})</p>
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
      </div>
    </div>
  )
}

export default App
