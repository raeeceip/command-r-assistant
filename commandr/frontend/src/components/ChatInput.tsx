import { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage && !isLoading) {
      onSend(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  return (
    <div className="border-t border-glass/30 bg-glass/40 backdrop-blur-lg p-4">
      {/* Quick Prompts */}
      {message === '' && (
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {['Ask me anything', 'Help with writing', 'Explain concepts', 'Code assistance'].map((prompt, index) => (
            <button
              key={index}
              onClick={() => setMessage(prompt)}
              className="px-3 py-1.5 text-xs bg-glass/60 border border-glass/30 rounded-full text-secondary hover:text-primary hover:bg-glass/80 transition-all"
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end gap-3 max-w-3xl mx-auto">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
            disabled={isLoading}
            className="
              w-full px-4 py-3 
              bg-bg-secondary/80 border border-glass/50 rounded-xl
              text-primary placeholder-muted
              resize-none min-h-[48px] max-h-[120px]
              focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
            rows={1}
          />
        </div>
        
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="
            w-10 h-10 rounded-lg
            bg-gradient-to-br from-primary to-secondary opacity-80
            text-bg-primary
            flex items-center justify-center
            hover:opacity-100 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatInput;