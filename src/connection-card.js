// The "connection card" pattern for a Settings-style screen that connects
// an external account (Drive, Yoto, etc.): an icon + title header, then
// either a connected row (status dot + name + Disconnect) or a
// disconnected state (status text + Connect button).
//
// Callers are responsible for escaping any untrusted dynamic text (folder
// names, emails, error messages) before passing it in — these functions do
// not escape their inputs, matching how call sites already handle it.

// Feather-style icons (single-color, drawn as strokes rather than filled
// shapes — e.g. the folder icon, a headphones glyph) need fill="none" plus
// an explicit stroke set on the wrapping <svg>, since the shape has no
// per-path fill/stroke of its own. Multi-color icons (e.g. Google's Drive
// triangle) set their own per-path `fill` and must NOT get a wrapper stroke
// — inheriting one would outline every path in the current text color.
function iconSvgAttrs(iconStroke) {
  return iconStroke ? ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' : '';
}

export function connectionCardHeader({ icon, iconViewBox = '0 0 24 24', iconStroke = false, title }) {
  return `
    <div class="connection-card-header">
      <svg class="connection-icon" viewBox="${iconViewBox}"${iconSvgAttrs(iconStroke)} aria-hidden="true">${icon}</svg>
      <h2>${title}</h2>
    </div>
  `;
}

/**
 * The connected state: status dot, an optional row icon indicating *what*
 * this connection points at (pass renderFolderIcon()/renderLibraryIcon(),
 * or any other pre-rendered <svg> markup — this function doesn't render an
 * icon itself, it just places one), a name/label (already-escaped HTML —
 * e.g. a folder name or a signed-in email), an optional loading spinner,
 * and a Disconnect button.
 */
export function connectionRow({
  name,
  disconnectId = 'connection-disconnect-btn',
  icon = '',
  loading = false,
}) {
  return `
    <div class="connection-row">
      <span class="connection-status-dot" aria-hidden="true"></span>
      ${icon}
      <span class="connection-name">${name}</span>
      ${loading ? '<span class="connection-loading-spinner" role="status" aria-label="Loading"></span>' : ''}
      <button id="${disconnectId}" class="connection-disconnect-btn" type="button"${loading ? ' disabled' : ''}>Disconnect</button>
    </div>
  `;
}

/** The disconnected state: status text plus a Connect button. */
export function connectionDisconnected({
  statusText,
  icon,
  iconViewBox = '0 0 24 24',
  iconStroke = false,
  connectId = 'connection-connect-btn',
  connectLabel,
}) {
  return `
    <p class="connection-status-text">${statusText}</p>
    <button id="${connectId}" class="connection-connect-btn" type="button">
      <svg class="connection-icon-small" viewBox="${iconViewBox}"${iconSvgAttrs(iconStroke)} aria-hidden="true">${icon}</svg>
      ${connectLabel}
    </button>
  `;
}

export function connectionError(message) {
  return `<p class="connection-error">${message}</p>`;
}
