import { createClient } from '@base44/sdk';
import { appParams } from '@/lib/app-params';

const { appId, functionsVersion, appBaseUrl } = appParams;

// Do NOT pass token here — let the SDK read it dynamically from localStorage on each request.
// Passing token at init time captures a null value on first load (when token arrives via URL
// and is stored to localStorage by app-params.js), causing all auth calls to fail.
export const base44 = createClient({
  appId,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});