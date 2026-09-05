const STORAGE_KEY = 'nexus-admin-state';

const defaults = {
  theme: localStorage.getItem('nx-theme') || 'dark',
  sidebarOpen: false,
  activePage: 'overview'
};

let state = { ...defaults };
try {
  state = { ...state, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
} catch {}

export function getAdminState() {
  return { ...state };
}

export function setAdminState(patch) {
  state = { ...state, ...patch };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent('nexus:admin-state', { detail: getAdminState() }));
  return getAdminState();
}

export function setSidebarOpen(open) {
  return setAdminState({ sidebarOpen: open });
}
