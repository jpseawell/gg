/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_APP_URL?: string;
  readonly VITE_MARKETING_URL?: string;
  readonly VITE_ANALYTICS_ENABLED?: string;
  readonly VITE_ANALYTICS_PROVIDER?: string;
  readonly VITE_MIXPANEL_TOKEN?: string;
  readonly VITE_MIXPANEL_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
