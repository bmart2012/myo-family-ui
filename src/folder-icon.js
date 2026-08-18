// Feather-style outline folder (viewBox 0 0 24 24, stroke set on the
// wrapping svg) — for a connectionRow icon slot when the connection
// points at a folder.
export const FOLDER_ICON_PATH =
  '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>';

export function renderFolderIcon() {
  return `<svg class="connection-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${FOLDER_ICON_PATH}</svg>`;
}
