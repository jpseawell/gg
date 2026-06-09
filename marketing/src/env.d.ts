/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_APP_URL?: string;
  readonly PUBLIC_MARKETING_URL?: string;
  readonly PUBLIC_ANALYTICS_ENABLED?: string;
  readonly PUBLIC_ANALYTICS_PROVIDER?: string;
  readonly PUBLIC_MIXPANEL_TOKEN?: string;
  readonly PUBLIC_MIXPANEL_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
