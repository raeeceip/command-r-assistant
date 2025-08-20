interface SettingsPanelProps {
  isVisible: boolean;
  temperature: number;
  onTemperatureChange: (value: number) => void;
  onClose: () => void;
}

const SettingsPanel = ({ isVisible, onClose }: SettingsPanelProps) => {
  if (!isVisible) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-72 bg-glass/60 backdrop-blur-xl border-l border-glass/30 z-50">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-md opacity-60"></div>
            <h2 className="text-lg font-medium text-primary">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors p-2 rounded-lg hover:bg-glass/40"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Model Information */}
        <div className="space-y-6">
          <div className="bg-glass/40 border border-glass/30 rounded-xl p-4">
            <h3 className="text-sm font-medium text-primary mb-3">AI Model</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Model:</span>
                <span className="text-primary font-medium">Command R</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Provider:</span>
                <span className="text-primary">Cohere</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Status:</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full opacity-80"></div>
                  <span className="text-accent">Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* App Information */}
          <div className="bg-glass/40 border border-glass/30 rounded-xl p-4">
            <h3 className="text-sm font-medium text-primary mb-3">Application</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Version:</span>
                <span className="text-primary">1.0.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Framework:</span>
                <span className="text-primary">Wails + React</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary">Theme:</span>
                <span className="text-primary">Dark</span>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcuts */}
          <div className="bg-glass/40 border border-glass/30 rounded-xl p-4">
            <h3 className="text-sm font-medium text-primary mb-3">Shortcuts</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-secondary text-sm">Send message</span>
                <kbd className="px-2 py-1 bg-glass/60 border border-glass/30 rounded text-xs text-primary">Enter</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary text-sm">New line</span>
                <kbd className="px-2 py-1 bg-glass/60 border border-glass/30 rounded text-xs text-primary">Shift + Enter</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary text-sm">Open settings</span>
                <kbd className="px-2 py-1 bg-glass/60 border border-glass/30 rounded text-xs text-primary">Ctrl + ,</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 border-t border-glass/30">
          <div className="text-center">
            <p className="text-xs text-muted">CommandR Assistant</p>
            <p className="text-xs text-muted mt-1">Powered by AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;