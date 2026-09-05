(() => {
  if (location.protocol !== 'file:') return;
  const clean = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      const value = node.nodeValue || '';
      if (value.includes('${') || value.includes('}}}}') || value.includes("`).join('')")) node.remove();
    });
    const sidebar = document.getElementById('sidebar');
    if (!sidebar || document.querySelector('.file-admin-backdrop')) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'file-admin-backdrop';
    backdrop.style.cssText = 'display:none;position:fixed;inset:0;z-index:40;background:rgba(2,6,23,.7);backdrop-filter:blur(4px)';
    backdrop.onclick = () => sidebar.classList.remove('open');
    document.body.appendChild(backdrop);
    document.getElementById('sidebar-toggle')?.addEventListener('click', () => { backdrop.style.display = 'block'; }, true);
    document.getElementById('sidebar-close')?.addEventListener('click', () => { backdrop.style.display = 'none'; }, true);
    document.addEventListener('click', event => {
      if (event.target.closest('#sidebar-toggle')) backdrop.style.display = 'block';
      if (event.target.closest('#sidebar-close') || event.target.closest('.file-admin-backdrop')) backdrop.style.display = 'none';
    }, true);
    document.querySelectorAll('[data-nav]').forEach(link => link.addEventListener('click', () => {
      sidebar.classList.remove('open');
      backdrop.style.display = 'none';
    }, true));
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', clean, { once: true });
  else clean();
})();
