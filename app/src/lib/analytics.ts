import { createAnalyticsClient, type AnalyticsProperties } from "@gg/analytics";
import { appConfig } from "../config";

const analytics = createAnalyticsClient({
  enabled: appConfig.analytics.enabled,
  provider: appConfig.analytics.provider,
  mixpanelToken: appConfig.analytics.mixpanelToken,
  debug: appConfig.analytics.debug,
  defaultProperties: {
    surface: "app",
  },
});

export function initAnalytics() {
  analytics.init();
}

export function identifyUser(userId: string, properties?: AnalyticsProperties) {
  analytics.identify(userId, properties);
}

export function resetAnalytics() {
  analytics.reset();
}

export function trackAppEvent(
  eventName: string,
  properties?: AnalyticsProperties,
) {
  analytics.track(eventName, properties);
}

export function trackAppPageView() {
  const path = typeof window === "undefined" ? "/" : window.location.pathname;
  const title = typeof document === "undefined" ? "gg app" : document.title;

  analytics.trackPageView(path, {
    title,
  });
}
