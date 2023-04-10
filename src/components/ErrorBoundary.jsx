import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{textAlign: "center", color: "red"}}>
          <h1>Error.....</h1>
          <p>Something went wrong.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
