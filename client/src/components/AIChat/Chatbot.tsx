import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { SendIcon, RefreshCwIcon, BotIcon, User2Icon } from 'lucide-react';

// Define chat message structure
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
}

export function Chatbot() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your AI assistant. How can I help you with your freelance work today?",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Mutation for sending chat messages
  const chatMutation = useMutation({
    mutationFn: async (chatMessages: ChatMessage[]) => {
      const response = await apiRequest('POST', '/api/ai/chat', { messages: chatMessages });
      return await response.json();
    },
    onSuccess: (data) => {
      if (data?.message) {
        setMessages(prevMessages => [...prevMessages, data.message]);
      }
      setIsProcessing(false);
    },
    onError: async (error: any) => {
      console.error('Chat error:', error);
      
      // Extract error response data
      let responseData;
      try {
        // Try to parse error response if it contains response data
        if (error?.response) {
          const errorResponse = await error.response.json();
          responseData = errorResponse;
        } else if (error?.message?.includes('fetch')) {
          // Network error
          responseData = { error: 'Network error', message: { content: 'Failed to connect to the server.' } };
        } else {
          responseData = { message: { content: error?.message || 'Unknown error occurred.' } };
        }
      } catch (parseError) {
        console.error('Error parsing error response:', parseError);
        responseData = { message: { content: 'Failed to get a response. Please try again.' } };
      }
      
      // Check for specific error types from our backend
      let errorTitle = 'Error';
      let errorMessage = responseData?.message?.content || 
                        responseData?.friendlyMessage || 
                        'Failed to get a response. Please try again.';
                        
      // Handle API quota errors specifically
      if (responseData?.error === 'API rate limit exceeded') {
        errorTitle = 'API Quota Exceeded';
      } else if (responseData?.error === 'OpenAI API key not configured') {
        errorTitle = 'Configuration Error';
      }
      
      // Add a message from the assistant about the error
      setMessages(prevMessages => [...prevMessages, {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date().toISOString()
      }]);
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: 'destructive',
      });
      
      setIsProcessing(false);
    }
  });
  
  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle sending messages
  const handleSendMessage = () => {
    if (!input.trim() || isProcessing) return;
    
    // Add user message to the chat
    const userMessage: ChatMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Build message history for context (excluding timestamps for API call)
    const messageHistory = [...messages, userMessage].map(({ role, content }) => ({ role, content }));
    
    // Send to the API
    chatMutation.mutate(messageHistory);
  };
  
  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Format timestamp
  const formatTime = (timestamp?: string) => {
    if (!timestamp) return '';
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (error) {
      return '';
    }
  };
  
  // Render chat message
  const renderMessage = (message: ChatMessage, index: number) => {
    const isUser = message.role === 'user';
    
    return (
      <div
        key={index}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex ${isUser ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
          <div className="flex-shrink-0 mr-2">
            <Avatar className={isUser ? 'ml-2' : 'mr-2'}>
              {isUser ? (
                <>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <User2Icon className="h-4 w-4" />
                  </AvatarFallback>
                </>
              ) : (
                <>
                  <AvatarFallback className="bg-blue-600 text-white">
                    <BotIcon className="h-4 w-4" />
                  </AvatarFallback>
                </>
              )}
            </Avatar>
          </div>
          
          <div
            className={`rounded-lg p-3 ${
              isUser
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary'
            }`}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
            <div className="text-xs mt-1 opacity-70 text-right">
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Suggested questions
  const suggestedQuestions = [
    "How can I set better freelance rates?",
    "Tips for managing client expectations",
    "Best practices for tracking time",
    "How to handle difficult clients"
  ];
  
  // Handle clicking a suggested question
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };
  
  return (
    <Card className="w-full max-w-4xl mx-auto h-full flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BotIcon className="h-5 w-5 mr-2 text-primary" />
            <CardTitle className="text-xl">{t('aiAssistant')}</CardTitle>
          </div>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            {t('beta')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-4">
          {messages.length === 1 && (
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">{t('suggestedQuestions')}</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer text-sm py-2 hover:bg-secondary/80"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {messages.map(renderMessage)}
          
          {isProcessing && (
            <div className="flex items-center text-muted-foreground">
              <RefreshCwIcon className="h-4 w-4 mr-2 animate-spin" />
              <span>{t('thinking')}...</span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="p-4 border-t">
        <div className="flex w-full items-center space-x-2">
          <Textarea
            placeholder={t('typeYourMessage')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 min-h-10 max-h-32"
            disabled={isProcessing}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isProcessing}
            className="h-10 w-10 p-2"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
