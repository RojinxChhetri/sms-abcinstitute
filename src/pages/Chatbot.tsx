import React, { useState, useRef, useEffect } from 'react';
import { dummyData } from '../data/dummyData';
import Card from '../components/Card';
import Button from '../components/Button';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your SmartEdu AI Assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const response = findResponse(input);
      const aiMessage: Message = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const findResponse = (query: string): string => {
    // Check for exact matches in dummy data
    const exactMatch = dummyData.chatbot.find(
      item => item.query.toLowerCase() === query.toLowerCase()
    );
    
    if (exactMatch) return exactMatch.response;
    
    // Check for keyword matches
    const keywords = [
      { terms: ['grade', 'marks'], response: "Your grades: CS101 - Assignment 1: A, Midterm: B+; MATH201 - Quiz 1: A-, Assignment 1: B" },
      { terms: ['attend', 'absence'], response: "Your overall attendance is 90%. Warning: Your attendance in CS101 is 78%, which is below the required 80%." },
      { terms: ['counsel', 'appointment', 'book'], response: "You can book a counseling appointment through the Counseling tab in the sidebar. Available slots are shown in the calendar." },
      { terms: ['exam', 'test', 'final'], response: "The final exams for this semester begin on December 10, 2025. Your personalized exam schedule is available in the Grades section." },
      { terms: ['prerequisite', 'require'], response: "Course prerequisites can be found on the Course Registration page. You must complete all prerequisites before enrolling in advanced courses." },
      { terms: ['deadline', 'due', 'submit'], response: "The course registration deadline for the next semester is November 15, 2025. Late registrations will incur a fee." },
    ];
    
    for (const keyword of keywords) {
      if (keyword.terms.some(term => query.toLowerCase().includes(term))) {
        return keyword.response;
      }
    }
    
    // Default response
    return "I'm not sure I understand your question. Could you please rephrase or ask about grades, attendance, counseling, exams, or course registration?";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
        <p className="text-gray-500 mt-1 sm:mt-0">Get help with your academic queries</p>
      </div>

      <Card className="h-[calc(100vh-220px)] flex flex-col">
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`flex max-w-[80%] ${
                    message.isUser 
                      ? 'bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                      : 'bg-gray-100 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg'
                  } px-4 py-3 shadow-sm`}
                >
                  <div className="mr-2 flex-shrink-0 mt-1">
                    {message.isUser ? (
                      <User size={16} className={message.isUser ? 'text-white' : 'text-gray-500'} />
                    ) : (
                      <Bot size={16} className="text-blue-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-sm">
                        {message.isUser ? 'You' : 'SmartEdu AI'}
                      </span>
                      <span className="ml-2 text-xs opacity-70">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm mt-1">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg px-4 py-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Ask a question..."
              className="flex-1 border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <Button 
              variant="primary"
              className="rounded-l-none"
              onClick={handleSendMessage}
            >
              <Send size={18} />
            </Button>
          </div>
          <div className="mt-3 text-xs text-gray-500">
            <p>Suggested questions:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {dummyData.chatbot.slice(0, 3).map((item, idx) => (
                <button
                  key={idx}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 transition"
                  onClick={() => {
                    setInput(item.query);
                  }}
                >
                  {item.query}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;