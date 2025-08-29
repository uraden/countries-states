import axios from "axios";
import { env, isEnvConfigured } from "./env";

export const http = axios.create();

if (isEnvConfigured(env)) {
  http.defaults.baseURL = env.apiBaseUrl;
  http.interceptors.request.use((config) => {
    config.headers.set("X-API-Key", env.apiKey!);
    return config;
  });
}