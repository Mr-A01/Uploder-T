export const ADMIN_PAGES = [
  'overview', 'analytics', 'activity', 'users', 'files', 'storage',
  'billing', 'reports', 'servers', 'queues', 'logs', 'integrations',
  'security', 'announcements', 'settings', 'audit'
];

export function isAdminPage(value) {
  return ADMIN_PAGES.includes(value);
}
