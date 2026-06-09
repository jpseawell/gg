const defaultHost = "0.0.0.0";
const defaultPort = 3001;

export interface ServerConfig {
  host: string;
  port: number;
}

export function parsePort(value: string | undefined, fallback = defaultPort) {
  const rawValue = value?.trim();

  if (!rawValue) {
    return fallback;
  }

  const port = Number(rawValue);

  if (!Number.isInteger(port) || port < 0 || port > 65535) {
    throw new Error(
      `PORT must be an integer between 0 and 65535. Received: ${value}`,
    );
  }

  return port;
}

export function getServerConfig(
  env: NodeJS.ProcessEnv = process.env,
): ServerConfig {
  return {
    host: env.HOST?.trim() || defaultHost,
    port: parsePort(env.PORT),
  };
}
