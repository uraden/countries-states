export type AppEnv = {
    apiBaseUrl?: string;
    apiKey?: string;
  };
  
  export const env: AppEnv = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
    apiKey: import.meta.env.VITE_API_KEY as string,
  };
  
  export function missingEnvKeys(e: AppEnv = env): string[] {
    const missing: string[] = [];
    if (!e.apiBaseUrl) missing.push("VITE_API_BASE_URL");
    if (!e.apiKey) missing.push("VITE_API_KEY");
    return missing;
  }
  
  export function isEnvConfigured(e: AppEnv = env): e is Required<AppEnv> {
    return missingEnvKeys(e).length === 0;
  }
  