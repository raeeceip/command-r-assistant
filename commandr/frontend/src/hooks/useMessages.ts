import { useState, useCallback } from 'react';
import type { Message } from '../types/message';
import { SendMessage, ClearChat } from '../../wailsjs/go/main/App';

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string, temperature: number = 0.3) => {
    try {
      console.log('Sending message to backend:', content, temperature);
      const response = await SendMessage(content, temperature);
      console.log('Received response:', response);
      return response.content;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, []);

  const addMessage = useCallback(async (content: string, temperature: number = 0.3) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      sender: 'user',
      content,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseContent = await sendMessage(content, temperature);
      
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        sender: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        status: 'sent'
      };

      setMessages(prev => [
        ...prev.slice(0, -1),
        { ...userMessage, status: 'sent' },
        assistantMessage
      ]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [
        ...prev.slice(0, -1),
        { ...userMessage, status: 'error', content: userMessage.content + ' (Failed to send)' }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [sendMessage]);

  const clearMessages = useCallback(async () => {
    try {
      console.log('Clearing chat...');
      await ClearChat();
      setMessages([]);
      console.log('Chat cleared successfully');
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  }, []);

  return {
    messages,
    isLoading,
    addMessage,
    clearMessages
  };
};