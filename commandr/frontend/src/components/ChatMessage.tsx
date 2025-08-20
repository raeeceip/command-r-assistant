import type { Message } from '../types/message';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-lg flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-gradient-to-br from-primary to-secondary opacity-80' 
            : 'bg-glass/60 border border-glass/30'
        }`}>
          {isUser ? (
            <svg className="w-4 h-4 text-bg-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          ) : (
            <div className="w-4 h-4 bg-gradient-to-br from-primary to-secondary rounded opacity-60"></div>
          )}
        </div>

        {/* Message Content */}
        <div className={`
          px-4 py-3 rounded-xl max-w-md
          ${isUser 
            ? 'bg-glass/40 border border-glass/30 text-primary' 
            : 'bg-glass/60 border border-glass/30 text-primary'
          }
        `}>
          <div className="text-sm leading-relaxed">
            {message.content}
          </div>
          <div className="text-xs text-muted mt-2 opacity-60">
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;