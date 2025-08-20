interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  onDismiss?: () => void;
}

const ErrorMessage = ({ message, onRetry, onDismiss }: ErrorMessageProps) => {
  return (
    <div className="flex justify-start group">
      <div className="max-w-lg flex flex-row items-start gap-3">
        {/* Error Icon */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-glass border border-error">
          <svg className="w-5 h-5 text-error" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
          </svg>
        </div>

        {/* Error Content */}
        <div className="bg-glass border border-error/30 text-error px-6 py-4 rounded-2xl shadow-soft">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-semibold">Error</span>
                <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
              </div>
              <p className="text-sm text-primary leading-relaxed">
                {message}
              </p>
            </div>

            {/* Dismiss Button */}
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="w-6 h-6 text-muted hover:text-error transition-colors"
                title="Dismiss error"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Retry Button */}
          {onRetry && (
            <div className="mt-3 pt-3 border-t border-error/20">
              <button
                onClick={onRetry}
                className="px-4 py-2 bg-error/10 border border-error/30 rounded-lg text-error text-sm hover:bg-error/20 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;