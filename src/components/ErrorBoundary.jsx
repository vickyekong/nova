import { Component } from 'react';
import { site } from '../data/site';

/**
 * Catches render errors so a broken subtree shows a recovery path
 * instead of a blank page, and reports them to the console.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('[Nova] Unhandled render error.', error, info?.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="container-nova flex min-h-screen flex-col items-center justify-center py-16 text-center">
        <h1 className="heading-md">Something broke on our end.</h1>
        <p className="mt-3 max-w-md text-ink-soft">
          Reload the page to try again. If it keeps happening, email{' '}
          <a href={`mailto:${site.email}`} className="text-nova hover:underline">
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-primary mt-8"
        >
          Reload page
        </button>
      </div>
    );
  }
}
