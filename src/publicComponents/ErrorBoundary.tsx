import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
  }

  render() {
    if ((this.state as any).hasError) {
      // You can render any custom fallback UI
      return <h1>发生了些错误。。</h1>
    }

    // eslint-disable-next-line react/prop-types
    return (this.props as any).children
  }
}
