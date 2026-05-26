import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, functionsVersion, appBaseUrl } = appParams;

// Read server_url directly from the current URL params first (most reliable at init time),
// then fall back to localStorage (via appParams), then VITE env, then empty string.
const urlServerUrl = new URLSearchParams(window.location.search).get('server_url');
const serverUrl = urlServerUrl || appParams.serverUrl || appBaseUrl || '';

export const base44 = createClient({
  appId,
  functionsVersion,
  serverUrl,
  appBaseUrl,
});