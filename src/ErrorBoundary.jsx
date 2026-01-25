import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          backgroundColor: '#1e293b',
          color: 'white',
          fontFamily: 'Segoe UI, sans-serif'
        }}>
          <h1>Something went wrong.</h1>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary