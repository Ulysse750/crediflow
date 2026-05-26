import { createClient } from '@base44/sdk';

const appId = import.meta.env.VITE_BASE44_APP_ID;
const functionsVersion = import.meta.env.VITE_BASE44_FUNCTIONS_VERSION;

// Read server_url from URL params first, then fall back to env var.
const params = new URLSearchParams(window.location.search);
const serverUrl =
  params.get('server_url') ||
  localStorage.getItem('base44_server_url') ||
  import.meta.env.VITE_BASE44_APP_BASE_URL ||
  '';

// Persist it so refreshes / direct nav still work.
if (params.get('server_url')) {
  localStorage.setItem('base44_server_url', params.get('server_url'));
}

export const base44 = createClient({
  appId,
  functionsVersion,
  serverUrl,
});