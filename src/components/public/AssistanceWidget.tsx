import { useEffect, useMemo, useRef, useState } from 'react';
import { 
  MessageCircleMore, 
  X, 
  Sparkles, 
  Send,
  Zap,
  Home,
  Shield,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Copy,
  CheckCircle
} from 'lucide-react';
import { listFaqs, findBestMatch, getPopularFaqs } from '../../lib/faq-data';
import { getCategories, searchFaqs, getFaqsByCategory } from '../../lib/faq-data';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  timestamp: Date;
  category?: string;
};

export function AssistanceWidget() {
  const [open, setOpen] = useState(false);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [popularFaqs, setPopularFaqs] = useState<FAQItem[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const widgetRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const allFaqs = listFaqs();
    setFaqs(allFaqs);
    setPopularFaqs(getPopularFaqs());
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: '👋 Welcome to Green Leaf Energy!\n\nI can help you with:\n• Solar installation queries\n• Maintenance & support\n• Pricing & quotations\n• Subsidy information\n• System design & products\n\nFeel free to ask me anything about solar energy!',
        timestamp: new Date(),
      },
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [open]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const suggestions = useMemo(() => {
    const popular = popularFaqs.slice(0, 4);
    if (popular.length < 4) {
      const general = faqs
        .filter(f => !popular.some(p => p.id === f.id))
        .slice(0, 4 - popular.length);
      return [...popular, ...general];
    }
    return popular;
  }, [faqs, popularFaqs]);

  const handleSend = (text?: string) => {
    const value = (text || input).trim();
    if (!value) return;

    const userMessage: ChatMessage = { 
      id: Date.now().toString(), 
      role: 'user', 
      text: value,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const result = findBestMatch(value);
      const reply = result.answer;
      
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-reply`,
          role: 'assistant',
          text: reply,
          timestamp: new Date(),
          category: result.category,
        },
      ]);
      setIsTyping(false);
    }, 400 + Math.random() * 400);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(question), 100);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatMessage = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.trim().startsWith('•') || line.trim().startsWith('•')) {
        return <div key={i} className="flex items-start gap-2 my-0.5">
          <span className="text-green-400">•</span>
          <span>{line.replace('•', '').trim()}</span>
        </div>;
      }
      if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
        return <div key={i} className="font-semibold text-green-600 mt-1">{line.replace(/\*\*/g, '')}</div>;
      }
      return <div key={i}>{line || <br />}</div>;
    });
  };

  return (
    // Changed: bottom-24 to move it up above WhatsApp button
    <div ref={widgetRef} className="fixed bottom-24 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-600 to-blue-600 px-5 py-3.5 text-white shadow-2xl hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          <MessageCircleMore className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-sm font-semibold">Need Help?</span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        </button>
      ) : (
        <div className="w-[380px] max-w-[92vw] overflow-hidden rounded-2xl border border-green-100 bg-white shadow-2xl animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 px-4 py-3.5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Solar Assistant</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                    <p className="text-[10px] text-green-100">Online</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setOpen(false)} 
                className="rounded-full p-1.5 hover:bg-white/20 transition-all duration-300 hover:rotate-90"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex max-h-[450px] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-100">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                >
                  <div 
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900' 
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {formatMessage(message.text)}
                    </div>
                    
                    {message.category && message.role === 'assistant' && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                          {message.category}
                        </span>
                        <button
                          onClick={() => copyToClipboard(message.text)}
                          className="text-[10px] hover:bg-gray-100 p-1 rounded transition"
                        >
                          {copied ? <CheckCircle className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-gray-400" />}
                        </button>
                      </div>
                    )}
                    
                    <div className="text-[9px] opacity-50 mt-1">
                      {message.timestamp?.toLocaleTimeString() || ''}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fadeIn">
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {suggestions.length > 0 && messages.length <= 2 && (
              <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-yellow-500" /> Quick Questions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestions.slice(0, 4).map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => handleQuickQuestion(faq.question)}
                      className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs hover:bg-green-50 hover:border-green-300 transition-all duration-300 hover:scale-105 shadow-sm"
                    >
                      {faq.question.length > 30 ? faq.question.slice(0, 30) + '...' : faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-200 bg-white p-3">
              <div className="flex items-center gap-2 rounded-full border-2 border-gray-200 px-3.5 py-1.5 focus-within:border-green-400 focus-within:ring-4 focus-within:ring-green-100 transition-all duration-300">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about solar..."
                  className="flex-1 border-none bg-transparent text-sm outline-none placeholder:text-gray-400"
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={() => handleSend()} 
                  disabled={!input.trim()}
                  className={`rounded-full p-2 transition-all duration-300 ${
                    input.trim()
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg hover:scale-105'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="text-[9px] text-gray-400 text-center mt-1.5">
                Powered by AI • Available 24/7
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #86efac;
          border-radius: 10px;
        }
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </div>
  );
}