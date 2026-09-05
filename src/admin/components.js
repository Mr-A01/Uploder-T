import { setSidebarOpen } from './state.js';

class NexusAdminOverlay extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<div class="admin-sidebar-backdrop" aria-hidden="true"></div>';
    this.addEventListener('click', () => setSidebarOpen(false));
  }
}

class NexusAdminMobileBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="admin-mobile-bar" aria-label="Admin navigation">
        <a href="#overview" data-mobile-page="overview"><span>⌂</span><small>داشبورد</small></a>
        <a href="#analytics" data-mobile-page="analytics"><span>◒</span><small>تحلیل</small></a>
        <a href="#users" data-mobile-page="users"><span>◉</span><small>کاربران</small></a>
        <a href="#security" data-mobile-page="security"><span>◇</span><small>امنیت</small></a>
        <a href="#settings" data-mobile-page="settings"><span>⚙</span><small>تنظیمات</small></a>
      </nav>`;
  }
}

class NexusAdminPageFrame extends HTMLElement {
  connectedCallback() {
    this.setAttribute('role', 'main');
  }
}

customElements.define('nexus-admin-overlay', NexusAdminOverlay);
customElements.define('nexus-admin-mobile-bar', NexusAdminMobileBar);
customElements.define('nexus-admin-page-frame', NexusAdminPageFrame);

export function installAdminComponentStyles() {
  if (document.getElementById('admin-component-styles')) return;
  const style = document.createElement('style');
  style.id = 'admin-component-styles';
  style.textContent = `
    .admin-sidebar-backdrop{position:fixed;inset:0;z-index:40;background:rgba(2,6,23,.7);backdrop-filter:blur(4px);opacity:0;pointer-events:none;transition:opacity .25s}
    body.admin-sidebar-open .admin-sidebar-backdrop{opacity:1;pointer-events:auto}
    .admin-mobile-bar{display:none}
    .admin-mobile-bar a{color:#64748b;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;font-size:18px;transition:color .2s,transform .2s}
    .admin-mobile-bar a small{font-size:9px}
    .admin-mobile-bar a.active{color:#a78bfa;transform:translateY(-1px)}
    @media(max-width:1023px){
      body.admin-sidebar-open{overflow:hidden}
      .admin-mobile-bar{display:grid;grid-template-columns:repeat(5,1fr);position:fixed;inset-inline:0;bottom:0;z-index:35;background:rgba(15,15,20,.94);backdrop-filter:blur(18px);border-top:1px solid rgba(139,92,246,.12);padding-bottom:env(safe-area-inset-bottom)}
      #main-content{padding-bottom:5.5rem!important}
    }
  `;
  document.head.appendChild(style);
}
