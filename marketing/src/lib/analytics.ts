import { createAnalyticsClient, type AnalyticsProperties } from "@gg/analytics";
import { marketingConfig } from "../config";

const analytics = createAnalyticsClient({
  enabled: marketingConfig.analytics.enabled,
  provider: marketingConfig.analytics.provider,
  mixpanelToken: marketingConfig.analytics.mixpanelToken,
  debug: marketingConfig.analytics.debug,
  defaultProperties: {
    surface: "marketing",
  },
});

export function initMarketingAnalytics() {
  analytics.init();
}

export function trackMarketingEvent(
  eventName: string,
  properties?: AnalyticsProperties,
) {
  analytics.track(eventName, properties);
}

export function trackMarketingPageView() {
  const path = typeof window === "undefined" ? "/" : window.location.pathname;
  const title =
    typeof document === "undefined" ? "gg marketing" : document.title;

  analytics.trackPageView(path, {
    title,
  });
}
