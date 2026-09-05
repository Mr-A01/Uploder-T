import { installAdminComponentStyles } from './components.js';
import { initAdminRouter } from './router.js';
import { setSidebarOpen } from './state.js';

function installShell() {
  cleanupStaticTemplateArtifacts();
  installAdminComponentStyles();
  document.body.insertAdjacentHTML('afterbegin', '<nexus-admin-overlay></nexus-admin-overlay>');
  document.body.insertAdjacentHTML('beforeend', '<nexus-admin-mobile-bar></nexus-admin-mobile-bar>');

  document.addEventListener('click', event => {
    const menuButton = event.target.closest('#sidebar-toggle');
    const closeButton = event.target.closest('#sidebar-close');
    if (menuButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      document.getElementById('sidebar')?.classList.add('open');
      setSidebarOpen(true);
    }
    if (closeButton) {
      event.preventDefault();
      event.stopImmediatePropagation();
      document.getElementById('sidebar')?.classList.remove('open');
      setSidebarOpen(false);
    }
  }, true);

  window.addEventListener('nexus:admin-state', event => {
    const open = event.detail.sidebarOpen;
    document.body.classList.toggle('admin-sidebar-open', open);
    document.getElementById('sidebar')?.classList.toggle('open', open);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      document.getElementById('sidebar')?.classList.remove('open');
      setSidebarOpen(false);
    }
  });
}

function cleanupStaticTemplateArtifacts() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    const value = node.nodeValue || '';
    if (value.includes('${') || value.includes('}}}}') || value.includes("`).join('')")) node.remove();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    installShell();
    initAdminRouter();
  }, { once: true });
} else {
  installShell();
  initAdminRouter();
}
