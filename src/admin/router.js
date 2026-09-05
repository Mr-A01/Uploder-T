import { ADMIN_PAGES, isAdminPage } from './pages.js';
import { setAdminState, setSidebarOpen } from './state.js';

let currentPage = 'overview';

function pageFromHash() {
  const value = window.location.hash.replace(/^#\/?/, '');
  return isAdminPage(value) ? value : 'overview';
}

function destroyPageCharts() {
  if (!window.Chart?.instances) return;
  Object.values(window.Chart.instances).forEach(chart => chart.destroy());
}

function showPage(page) {
  const target = document.getElementById(`page-${page}`);
  if (!target) return;
  destroyPageCharts();
  document.querySelectorAll('.page-content').forEach(view => {
    view.style.display = 'none';
    view.classList.remove('admin-route-enter');
  });
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.classList.toggle('active', link.dataset.nav === page);
  });
  document.querySelectorAll('[data-mobile-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.mobilePage === page);
  });
  target.style.display = 'block';
  void target.offsetWidth;
  target.classList.add('admin-route-enter');
  currentPage = page;
  setAdminState({ activePage: page, sidebarOpen: false });
  setSidebarOpen(false);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.dispatchEvent(new CustomEvent('nexus:admin-page', { detail: page }));
  window.setTimeout(() => {
    if (page === 'storage') window.initStorageCharts?.();
    if (page === 'billing') window.initBillingCharts?.();
    if (page === 'analytics') window.initAnalyticsCharts?.();
  }, 60);
}

export function navigate(page) {
  const next = isAdminPage(page) ? page : 'overview';
  if (window.location.hash !== `#${next}`) window.location.hash = next;
  else showPage(next);
}

export function initAdminRouter() {
  document.addEventListener('click', event => {
    const link = event.target.closest('[data-nav],[data-mobile-page]');
    if (!link) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    navigate(link.dataset.nav || link.dataset.mobilePage);
  }, true);
  window.addEventListener('hashchange', () => showPage(pageFromHash()));
  showPage(pageFromHash());
}

export function getCurrentAdminPage() {
  return currentPage;
}

export { ADMIN_PAGES };
