// Google Picker helper for a folder-select "connect an external account"
// flow. Deliberately takes every credential/context as a parameter (access
// token, developer key, optional parent folder id) rather than reading any
// app-specific config — this module knows nothing about where those values
// come from (a consuming app's own OAuth flow, wherever it stores a
// previously-picked folder id, etc).

let pickerApiPromise = null;

function loadPickerApi() {
  if (!pickerApiPromise) {
    pickerApiPromise = new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load the Google API script'));
      document.head.appendChild(script);
    });
  }
  return pickerApiPromise;
}

/**
 * Opens the Google Picker's folder-select view with an access token already
 * in hand. Resolves `{ folderId, folderName }` on a pick, or `null` on
 * cancel — never rejects for a cancel, only a load failure.
 *
 * `parentFolderId`, when given, opens the Picker showing that folder's
 * contents instead of Drive's root — pass the *parent* of a
 * previously-picked folder (not that folder's own id) so it shows up as a
 * directly clickable item rather than the Picker landing inside it. Google's
 * `DocsView.setParent()` shows a folder's contents, it doesn't pre-select
 * it, which is why the parent (not the folder itself) is what belongs here.
 *
 * Always hides the Picker's left navigation pane (`Feature.NAV_HIDDEN`) —
 * this view is the only one ever registered, so My Drive/Shared
 * drives/Recent/Starred have nothing to switch to, and hiding them trims
 * the dialog down to just the folder list.
 */
export async function openDriveFolderPicker({ accessToken, developerKey, parentFolderId }) {
  await loadPickerApi();
  await new Promise((resolve) => window.gapi.load('picker', resolve));

  return new Promise((resolve) => {
    const view = new window.google.picker.DocsView(window.google.picker.ViewId.FOLDERS)
      .setSelectFolderEnabled(true)
      .setIncludeFolders(true)
      .setMimeTypes('application/vnd.google-apps.folder');
    if (parentFolderId) view.setParent(parentFolderId);

    const picker = new window.google.picker.PickerBuilder()
      .addView(view)
      .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
      .setOAuthToken(accessToken)
      .setDeveloperKey(developerKey)
      .setCallback((data) => {
        if (data.action === window.google.picker.Action.PICKED) {
          resolve({ folderId: data.docs[0].id, folderName: data.docs[0].name });
        } else if (data.action === window.google.picker.Action.CANCEL) {
          resolve(null);
        }
      })
      .build();
    picker.setVisible(true);
  });
}
