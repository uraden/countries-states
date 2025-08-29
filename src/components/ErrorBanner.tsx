export function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
    return (
      <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm flex items-start justify-between">
        <span>{message}</span>
        {onRetry && (
          <button className="underline" onClick={onRetry}>Retry</button>
        )}
      </div>
    );
  }
  