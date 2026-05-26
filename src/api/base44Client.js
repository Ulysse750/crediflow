import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, functionsVersion, appBaseUrl, serverUrl } = appParams;

// serverUrl comes from the `server_url` URL param (injected by Base44 preview runtime).
// appBaseUrl comes from `app_base_url`. Both fall back to VITE env vars.
// Do NOT pass token at init — SDK reads base44_access_token from localStorage dynamically.
export const base44 = createClient({
  appId,
  functionsVersion,
  serverUrl: serverUrl || appBaseUrl || '',
  appBaseUrl,
});