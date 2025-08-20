interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator = ({ message = "Thinking..." }: LoadingIndicatorProps) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start gap-3">
        {/* AI Avatar */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-glass/60 border border-glass/30">
          <div className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded opacity-60"></div>
        </div>

        {/* Loading Content */}
        <div className="bg-glass/60 border border-glass/30 text-primary px-4 py-3 rounded-xl">
          <div className="flex items-center gap-2">
            {/* Simple dots */}
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce opacity-60"></div>
              <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm text-secondary ml-2">{message}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;