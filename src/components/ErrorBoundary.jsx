import React from 'react';

// Top-level safety net: without this, any unguarded field access (e.g. a malformed API
// response) throws during render and React unmounts the entire app, leaving a blank page.
// This contains that failure to a single message instead of taking down the whole site.
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Unhandled UI error:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    minHeight: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    padding: '40px 20px',
                    color: '#fff'
                }}>
                    <h2 style={{ marginBottom: '12px' }}>Something went wrong</h2>
                    <p style={{ color: '#999', marginBottom: '20px' }}>
                        This section failed to load. Please refresh the page.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => window.location.reload()}
                    >
                        Reload
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
