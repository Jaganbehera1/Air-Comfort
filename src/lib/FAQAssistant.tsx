import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Send, 
  X, 
  Sparkles, 
  ArrowRight,
  MessageCircle,
  Phone,
  Mail,
  Globe,
  Zap,
  Sun,
  Battery,
  Home,
  Shield,
  Clock,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  ThumbsDown,
  Copy,
  CheckCircle
} from 'lucide-react';
import { findBestMatch, getSuggestions, searchByCategory } from '../../lib/faq-search';
import { getCategories, getPopularFaqs } from '../../lib/faq';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: string;
  liked?: boolean;
}

export function FAQAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'assistant',
      content: '👋 Welcome to Green Leaf Energy Assistance!\n\nI can help you with:\n• Solar installation queries\n• Maintenance & support\n• Pricing & quotations\n• Subsidy information\n• System design & products\n\nFeel free to ask me anything about solar energy!',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [popularFaqs, setPopularFaqs] = useState(getPopularFaqs());
  const [copied, setCopied] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const categories = getCategories();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (input.length > 2) {
      const suggestions = getSuggestions(input);
      setSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [input]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: input,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsTyping(true);

    // Simulate typing delay for better UX
    setTimeout(() => {
      const result = findBestMatch(input);
      const assistantMessage: Message = {
        id: `assistant_${Date.now()}`,
        type: 'assistant',
        content: result.answer,
        timestamp: new Date(),
        category: result.category,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    const faqs = searchByCategory(category);
    const message = faqs.length > 0 
      ? `Here are some questions related to **${category}**:\n\n${faqs.map((f, i) => `${i + 1}. ${f.question}`).join('\n')}\n\nWould you like to know more about any specific question?`
      : `No questions found in the **${category}** category. Please try another category.`;
    
    const assistantMessage: Message = {
      id: `assistant_${Date.now()}`,
      type: 'assistant',
      content: message,
      timestamp: new Date(),
      category,
    };
    setMessages(prev => [...prev, assistantMessage]);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      // Check if line starts with bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('•')) {
        return <div key={i} className="flex items-start gap-2 my-1">
          <span className="text-green-400">•</span>
          <span>{line.replace('•', '').trim()}</span>
        </div>;
      }
      // Check if line is a heading
      if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
        return <div key={i} className="font-bold text-green-300 mt-2">{line.replace(/\*\*/g, '')}</div>;
      }
      return <div key={i}>{line || <br />}</div>;
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 w-96 max-w-full">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Solar Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                  <span className="text-xs opacity-80">Online</span>
                </div>
              </div>
            </div>
            <button className="hover:bg-white/20 p-1 rounded-lg transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideIn`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 ${
                  msg.type === 'user'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {formatMessage(msg.content)}
                </div>
                {msg.category && msg.type === 'assistant' && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full">
                      {msg.category}
                    </span>
                    <button
                      onClick={() => copyToClipboard(msg.content)}
                      className="text-xs hover:bg-white/20 p-1 rounded transition"
                    >
                      {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                )}
                <div className="text-[10px] opacity-60 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start animate-slideIn">
              <div className="bg-gray-100 rounded-2xl p-3">
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

        {/* Popular FAQs */}
        {messages.length <= 3 && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {popularFaqs.slice(0, 3).map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => handleQuickQuestion(faq.question)}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs hover:bg-green-50 hover:border-green-300 transition-all duration-300"
                >
                  {faq.question.length > 30 ? faq.question.slice(0, 30) + '...' : faq.question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="px-4 py-2 bg-white border-t border-gray-200 max-h-32 overflow-y-auto">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSuggestionClick(suggestion)}
                className="block w-full text-left px-3 py-1.5 text-sm hover:bg-green-50 rounded-lg transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-200">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about solar energy..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                input.trim()
                  ? 'bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 text-white hover:shadow-lg'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[10px] text-gray-400 mt-1.5 text-center">
            Powered by AI • Available 24/7
          </p>
        </div>
      </div>
    </div>
  );
}