"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Error</div>
          <h1 className="section-title">Something went wrong</h1>
          <p className="section-desc">
            We could not load this page. Please try again or return to the homepage.
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={reset}>
          Try again
        </button>
        {process.env.NODE_ENV === "development" ? (
          <pre className="history-content section-border-bottom">{error.message}</pre>
        ) : null}
      </div>
    </main>
  );
}
