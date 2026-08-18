# myo-family-ui

Shared vanilla-JS/CSS UI building blocks — a connection-card pattern (icon
header, connected/disconnected states, status dot, optional row icon,
inline spinner), a bottom tab bar, and a couple of small generic icons
(folder, library grid) — for small Vite + vanilla-JS apps with a
Settings-style "connect an external account" screen. No framework, no
build step: plain JS + CSS consumed via a normal npm dependency.

**Brand is deliberately not included here.** Colors, logos, and per-app
identity stay in each consuming app; this package only ships structure and
behavior (markup-returning functions + CSS that reads color values from
custom properties).

## Token contract

Component CSS in this package reads the following custom properties, which
**must be defined by the consuming app** (typically in its own
`style.css`, before importing this package's `styles.css`):

| Token | Used for |
|---|---|
| `--bg` | Page background; connected-row background |
| `--surface` | Card background; connect-button background |
| `--border` | Card/row/button borders; spinner track |
| `--ink` | Connect-button text |
| `--muted` | Status text; tab-bar inactive icon/label; disconnect-button text |
| `--primary` | Connect-button hover border; connection-row-icon color; spinner active arc; active tab color |
| `--success` | Connected status dot |
| `--danger` | Error text; disconnect-button hover |

If a consuming app is missing one of these, components using that token
will render unstyled/transparent for it rather than erroring — add the
missing token to that app's own `:root` block before adopting the
affected component.

## Usage

In the consuming app's `package.json`:

```json
"dependencies": {
  "myo-family-ui": "github:bmart2012/myo-family-ui"
}
```

Then `npm install`.

```js
import 'myo-family-ui/styles.css';
import {
  connectionCardHeader, connectionRow, connectionDisconnected, connectionError,
  renderFolderIcon, renderLibraryIcon,
  escapeHtml,
  showTabBar, hideTabBar,
} from 'myo-family-ui';
```

## What's here

- `connection-card.js`/`.css` — an icon+title header, a connected row
  (status dot, optional row icon, name, optional spinner, Disconnect), and
  a disconnected state (status text + Connect button) — the shape a
  Settings screen's "connect an external account" card usually needs.
- `folder-icon.js` — a Feather-style folder outline, for a `connectionRow`'s
  `icon` slot when the connection points at a folder.
- `library-icon.js` — a Feather-style "grid" icon, for a `connectionRow`'s
  `icon` slot when the connection points at a library/collection of
  content rather than a folder — deliberately generic/MIT-licensed rather
  than any specific service's own brand mark.
- `spinner.css` — a small inline loading spinner for showing a related
  fetch is in flight (e.g. inside a `connectionRow`).
- `tab-bar.js`/`.css` — a persistent bottom tab bar pattern
  (`showTabBar()`/`hideTabBar()`/`renderTabBar()`).
- `format.js` — `escapeHtml`.

## Migrating a consuming app

1. Add the dependency and install (see "Usage" above), then `import
   'myo-family-ui/styles.css'` once, near the top of the app's entry file.
2. Check the token contract table above against the app's own `:root`
   block. Add whatever's missing before wiring up any component that reads
   it, or that component will render unstyled for the missing token(s).
3. Replace hand-rolled connection-card markup with `connectionCardHeader()`
   + `connectionRow()`/`connectionDisconnected()`, and a hand-rolled tab
   bar with `showTabBar()`/`hideTabBar()`.
4. Delete the app's own now-duplicate CSS/markup for those pieces, and any
   local `escapeHtml`/folder-icon SVG constant this package now covers.
5. Re-check every screen that used the old markup/classes by hand (a
   screenshot check, not just "it builds") — CSS class renames or
   dropped-but-needed `<svg>` wrapper attributes are easy to miss silently
   (a stroke icon with no `stroke`/`fill` wrapper attrs renders as a solid
   blob, not an error).
