import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Optionally log error to a service
    // console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    const { hasError } = this.state;
    const { fallback, children } = this.props;
    if (hasError) {
      return fallback || null;
    }
    return children;
  }
}

export default ErrorBoundary;
