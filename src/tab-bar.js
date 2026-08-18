// Persistent bottom tab bar living outside the app's main content container,
// shared shape across MYO-family apps. Each tab is
// { id, label, icon (raw <path>/<svg> children), onSelect }.

export function renderTabBar(tabBarEl, tabs, activeId) {
  tabBarEl.innerHTML = `
    <div class="tab-bar-inner">
      ${tabs
        .map(
          (tab) => `
            <button class="tab-button${tab.id === activeId ? ' active' : ''}" data-tab="${tab.id}" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${tab.icon}</svg>
              <span>${tab.label}</span>
            </button>
          `
        )
        .join('')}
    </div>
  `;
  tabs.forEach((tab) => {
    tabBarEl.querySelector(`[data-tab="${tab.id}"]`).addEventListener('click', tab.onSelect);
  });
}

export function showTabBar(tabBarEl, tabs, activeId) {
  renderTabBar(tabBarEl, tabs, activeId);
  tabBarEl.style.display = 'flex';
  document.body.classList.add('tab-bar-visible');
}

export function hideTabBar(tabBarEl) {
  tabBarEl.style.display = 'none';
  document.body.classList.remove('tab-bar-visible');
}
