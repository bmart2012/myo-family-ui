// A centered spinner + message for a full page/section's own loading state
// — e.g. "Checking your library against Drive…" while a status check runs,
// or "Loading details…" while a detail view's own data fetches. Reuses the
// same spinner as connectionLoading()/a Disconnect button mid-request
// (spinner.css), just with more vertical breathing room since this isn't
// confined to a compact card — connectionLoading() is the right choice
// instead when the loading state belongs *inside* a connection card.

/** Callers are responsible for escaping any untrusted dynamic text before
 * passing it in, matching every other function in this package. */
export function loadingState(text = 'Loading…') {
  return `
    <div class="loading-state">
      <span class="connection-loading-spinner" role="status" aria-label="Loading"></span>
      <span>${text}</span>
    </div>
  `;
}
