import { useState } from 'react';
import ChatWindow from './components/ChatWindow.tsx';
import ChatInput from './components/ChatInput.tsx';
import SettingsPanel from './components/SettingsPanel.tsx';
import { useMessages } from './hooks/useMessages.ts';
import './index.css';

function App() {
  const { messages, isLoading, addMessage } = useMessages();
  const [showSettings, setShowSettings] = useState(false);

  const handleSendMessage = (content: string) => {
    // Use a default temperature of 0.3 for balanced responses
    addMessage(content, 0.3);
  };

  return (
    <div className="h-screen flex flex-col bg-bg-primary">
      {/* Simple Header */}
      <div className="p-4 border-b border-glass/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-md opacity-80"></div>
            <h1 className="text-lg font-medium text-primary">CommandR</h1>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-secondary hover:text-primary transition-colors p-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex relative">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <ChatWindow 
            messages={messages} 
            isLoading={isLoading} 
          />
          <ChatInput 
            onSend={handleSendMessage} 
            isLoading={isLoading} 
          />
        </div>

        {/* Settings Panel */}
        <SettingsPanel 
          isVisible={showSettings}
          temperature={0.3}
          onTemperatureChange={() => {}}
          onClose={() => setShowSettings(false)}
        />
      </main>
    </div>
  );
}

export default App;
