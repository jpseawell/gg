export const appRoutes = {
  home: "/",
} as const;

export const marketingRoutes = {
  home: "/",
} as const;

export interface SurfaceUrlConfig {
  appUrl: string;
  marketingUrl: string;
}

export function createSurfaceLinks(config: SurfaceUrlConfig) {
  return {
    app: {
      home: joinUrl(config.appUrl, appRoutes.home),
    },
    marketing: {
      home: joinUrl(config.marketingUrl, marketingRoutes.home),
    },
  } as const;
}

export function joinUrl(baseUrl: string, path: string) {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return `${normalizedBase}/`;
  }

  return `${normalizedBase}${normalizedPath}`;
}
