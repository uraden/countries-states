import type { ReactNode } from "react";
import { env, isEnvConfigured, missingEnvKeys } from "../lib/env";

export function ConfigGate({ children }: { children: ReactNode }) {
  if (isEnvConfigured(env)) return <>{children}</>;

  const missing = missingEnvKeys(env);

  return (
    <main className="min-h-screen grid place-items-center p-6 bg-gray-50">
      <div className="max-w-xl w-full rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Project not configured</h1>
        <p className="mt-2 text-sm text-gray-600">
          We couldn’t find the required environment variables.
        </p>

        <div className="mt-4 rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm">
          <div className="font-medium text-yellow-900">Missing:</div>
          <ul className="list-disc pl-5 text-yellow-900">
            {missing.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>

        <div className="mt-5 space-y-3 text-sm">
          <p className="text-gray-700 font-medium">Fix in 3 steps:</p>
          <ol className="list-decimal pl-5 space-y-1 text-gray-700">
            <li>
              Create a file <code>.env</code> in the project root.
            </li>
            <li>Paste the keys (replace values with your real ones):</li>
          </ol>

          <pre className="mt-2 rounded bg-gray-100 p-3 overflow-auto text-xs">
            {`VITE_API_BASE_URL=https://xxxx.unruffledneumann.xyz/api/v1 
VITE_API_KEY=YOUR_KEY_HERE`}
          </pre>

          <p>Then restart the dev server.</p>
        </div>
      </div>
    </main>
  );
}
