import type { ReactNode } from "react";

export function Field({
  label,
  htmlFor,
  children,
  hint,
  error,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  hint?: string;
  error?: string;
}) {
  const hintId = hint ? `${htmlFor}-hint` : undefined;
  const errId = error ? `${htmlFor}-err` : undefined;
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-xs text-gray-500">{hint}</p>
      )}
      {error && (
        <p id={errId} role="alert" className="text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
