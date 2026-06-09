import type { AnalyticsProvider } from "@gg/analytics";
import { createSurfaceLinks } from "@gg/config";

const fallbackAppUrl =
  typeof window === "undefined"
    ? "http://localhost:5173"
    : window.location.origin;

export const appConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001",
  appUrl: import.meta.env.VITE_APP_URL ?? fallbackAppUrl,
  marketingUrl: import.meta.env.VITE_MARKETING_URL ?? "http://localhost:4321",
  analytics: {
    enabled: parseBoolean(import.meta.env.VITE_ANALYTICS_ENABLED),
    provider: parseAnalyticsProvider(import.meta.env.VITE_ANALYTICS_PROVIDER),
    mixpanelToken: import.meta.env.VITE_MIXPANEL_TOKEN,
    debug: parseBoolean(import.meta.env.VITE_MIXPANEL_DEBUG),
  },
} as const;

export const surfaceLinks = createSurfaceLinks({
  appUrl: appConfig.appUrl,
  marketingUrl: appConfig.marketingUrl,
});

function parseBoolean(value: string | undefined) {
  return value === "true";
}

function parseAnalyticsProvider(value: string | undefined): AnalyticsProvider {
  if (value === "none" || value === "mixpanel") {
    return value;
  }

  return "mixpanel";
}
