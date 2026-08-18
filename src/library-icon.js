// Feather "grid" icon. Deliberately generic/MIT-licensed rather than any
// service-specific brand mark: a connection row that represents "you're
// connected to a library of content" (e.g. a Yoto account) can use this the
// same way a Drive-folder row uses renderFolderIcon() — same "what this
// connection points at" role, not a vendor logo.
export const LIBRARY_ICON_PATH =
  '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>';

export function renderLibraryIcon() {
  return `<svg class="connection-row-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${LIBRARY_ICON_PATH}</svg>`;
}
