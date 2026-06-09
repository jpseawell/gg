export type AnalyticsProvider = "mixpanel" | "none";

export type AnalyticsPropertyValue =
  | string
  | number
  | boolean
  | null
  | undefined;

export type AnalyticsProperties = Record<
  string,
  AnalyticsPropertyValue | AnalyticsPropertyValue[]
>;

export interface AnalyticsClient {
  init: () => void;
  identify: (userId: string, properties?: AnalyticsProperties) => void;
  reset: () => void;
  track: (eventName: string, properties?: AnalyticsProperties) => void;
  trackPageView: (path: string, properties?: AnalyticsProperties) => void;
}

export interface AnalyticsOptions {
  enabled?: boolean | undefined;
  provider?: AnalyticsProvider | undefined;
  mixpanelToken?: string | undefined;
  debug?: boolean | undefined;
  defaultProperties?: AnalyticsProperties | undefined;
}

const pageViewedEvent = "Page Viewed";

export function createAnalyticsClient(
  options: AnalyticsOptions,
): AnalyticsClient {
  const provider = options.provider ?? "mixpanel";
  const enabled = options.enabled ?? false;
  const defaultProperties = cleanProperties(options.defaultProperties);
  let mixpanelClient: MixpanelBrowser | undefined;
  let initialized = false;
  let initPromise: Promise<void> | undefined;
  let missingTokenWarned = false;
  let queuedActions: QueuedAnalyticsAction[] = [];

  function canSend() {
    return enabled && provider === "mixpanel";
  }

  function getMixpanelToken() {
    return options.mixpanelToken?.trim();
  }

  function warnMissingToken() {
    if (!options.debug || missingTokenWarned) {
      return;
    }

    missingTokenWarned = true;
    console.warn(
      "Analytics enabled without a Mixpanel token; events are disabled.",
    );
  }

  function sendOrQueue(action: QueuedAnalyticsAction) {
    if (!canSend()) {
      return;
    }

    if (initialized && mixpanelClient) {
      action(mixpanelClient);
      return;
    }

    if (!getMixpanelToken()) {
      warnMissingToken();
      return;
    }

    queuedActions.push(action);
    void initializeMixpanel();
  }

  async function initializeMixpanel() {
    if (!canSend() || initialized) {
      return;
    }

    const token = getMixpanelToken();
    if (!token) {
      warnMissingToken();
      return;
    }

    if (!initPromise) {
      initPromise = import("mixpanel-browser")
        .then((module) => {
          mixpanelClient = module.default;
          mixpanelClient.init(token, {
            debug: options.debug ?? false,
            persistence: "localStorage",
          });

          if (Object.keys(defaultProperties).length > 0) {
            mixpanelClient.register(defaultProperties);
          }

          initialized = true;

          const actions = queuedActions;
          queuedActions = [];
          actions.forEach((action) => action(mixpanelClient!));
        })
        .catch((error: unknown) => {
          initPromise = undefined;
          queuedActions = [];

          if (options.debug) {
            console.error("Failed to initialize analytics provider.", error);
          }
        });
    }

    await initPromise;
  }

  function identify(userId: string, properties?: AnalyticsProperties) {
    const profile = cleanProperties(properties);
    sendOrQueue((client) => {
      client.identify(userId);

      if (Object.keys(profile).length > 0) {
        client.people.set(profile);
      }
    });
  }

  function reset() {
    sendOrQueue((client) => {
      client.reset();
    });
  }

  function track(eventName: string, properties?: AnalyticsProperties) {
    const eventProperties = cleanProperties(properties);
    sendOrQueue((client) => {
      client.track(eventName, {
        ...defaultProperties,
        ...eventProperties,
      });
    });
  }

  return {
    init() {
      void initializeMixpanel();
    },

    identify,

    reset,

    track,

    trackPageView(path, properties) {
      track(pageViewedEvent, {
        path,
        ...cleanProperties(properties),
      });
    },
  };
}

type MixpanelBrowser = (typeof import("mixpanel-browser"))["default"];

type QueuedAnalyticsAction = (client: MixpanelBrowser) => void;

function cleanProperties(properties?: AnalyticsProperties) {
  if (!properties) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined),
  ) as AnalyticsProperties;
}
