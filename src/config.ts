import { z } from 'zod';

const DEFAULT_CONFIG = {
  nwsApiBase: 'https://api.weather.gov',
  userAgent: 'weather-app/1.0',
  serverName: 'weather-app',
  serverVersion: '1.0.0',
} as const;

const configSchema = z.object({
  nwsApiBase: z.string(),
  userAgent: z.string(),
  serverName: z.string(),
  serverVersion: z.string(),
});

export type Config = z.infer<typeof configSchema>;

function parseArgs() {
  const args = process.argv.slice(2);
  const parsed: Partial<Config> = {};
  
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '');
    const value = args[i + 1];
    if (key in DEFAULT_CONFIG) {
      parsed[key as keyof Config] = value;
    }
  }
  
  return parsed;
}

export function getConfig(): Config {
  // Priority: CLI args > Environment variables > Defaults
  const config = {
    nwsApiBase: process.env.NWS_API_BASE ?? DEFAULT_CONFIG.nwsApiBase,
    userAgent: process.env.USER_AGENT ?? DEFAULT_CONFIG.userAgent,
    serverName: process.env.SERVER_NAME ?? DEFAULT_CONFIG.serverName,
    serverVersion: process.env.SERVER_VERSION ?? DEFAULT_CONFIG.serverVersion,
    ...parseArgs(), // CLI args override everything
  };

  return configSchema.parse(config);
} 
