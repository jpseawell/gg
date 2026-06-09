import type { AnalyticsProvider } from "@gg/analytics";
import { createSurfaceLinks } from "@gg/config";

export const marketingConfig = {
  appUrl: import.meta.env.PUBLIC_APP_URL ?? "http://localhost:5173",
  marketingUrl: import.meta.env.PUBLIC_MARKETING_URL ?? "http://localhost:4321",
  analytics: {
    enabled: parseBoolean(import.meta.env.PUBLIC_ANALYTICS_ENABLED),
    provider: parseAnalyticsProvider(import.meta.env.PUBLIC_ANALYTICS_PROVIDER),
    mixpanelToken: import.meta.env.PUBLIC_MIXPANEL_TOKEN,
    debug: parseBoolean(import.meta.env.PUBLIC_MIXPANEL_DEBUG),
  },
} as const;

export const surfaceLinks = createSurfaceLinks({
  appUrl: marketingConfig.appUrl,
  marketingUrl: marketingConfig.marketingUrl,
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
