import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { useMessages } from './hooks/useMessages';
import './App.css';

function App() {
  const { messages, isLoading, addMessage, clearMessages } = useMessages();

  const handleSendMessage = (content: string) => {
    addMessage(content);
  };

  const handleClearChat = () => {
    clearMessages();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">CommandR</h1>
        <button
          onClick={handleClearChat}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
        >
          Clear Chat
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow messages={messages} isLoading={isLoading} />
        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
