import { useEffect, useMemo, useRef, useState } from 'react';
import { MessageCircleMore, X, Sparkles, Send } from 'lucide-react';
import { FAQItem, listFaqs } from '../../lib/faq';
import { findBestMatch } from '../../lib/faqService';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};


export function AssistanceWidget() {
  const [open, setOpen] = useState(false);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setFaqs(listFaqs());
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: 'Hello! I can help with common solar questions. Ask me anything like installation, maintenance, or quotations.',
      },
    ]);
  }, []);

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

  const suggestions = useMemo(() => faqs.slice(0, 4), [faqs]);

  const handleSend = (text?: string) => {
    const value = (text || input).trim();
    if (!value) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', text: value };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const reply = findBestMatch(value).answer;

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-reply`,
          role: 'assistant',
          text: reply,
        },
      ]);
    }, 250);
  };

  return (
    <div ref={widgetRef} className="fixed bottom-20 right-5 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-full bg-green-600 px-4 py-3 text-white shadow-2xl transition hover:bg-green-700"
        >
          <MessageCircleMore className="h-5 w-5" />
          <span className="text-sm font-semibold">Need Help?</span>
        </button>
      ) : (
        <div className="w-[340px] max-w-[92vw] overflow-hidden rounded-3xl border border-green-100 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-green-600 to-emerald-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <div>
                <p className="text-sm font-semibold">FAQ Chat Assistant</p>
                <p className="text-xs text-green-50">Free help using saved answers</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-white/20">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex max-h-[430px] flex-col">
            <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4 scrollbar-thin scrollbar-thumb-green-300 scrollbar-track-gray-100">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-6 ${message.role === 'user' ? 'bg-green-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}>
                    {message.text}
                  </div>
                </div>
              ))}

              {suggestions.length > 0 && messages.length <= 1 && (
                <div className="rounded-2xl border border-dashed border-green-200 bg-white p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Try asking</p>
                  <div className="space-y-2">
                    {suggestions.map((faq) => (
                      <button key={faq.id} onClick={() => handleSend(faq.question)} className="block w-full rounded-xl bg-green-50 px-3 py-2 text-left text-sm text-gray-700 hover:bg-green-100">
                        {faq.question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 bg-white p-3">
              <div className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 border-none bg-transparent text-sm outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button onClick={() => handleSend()} className="rounded-full bg-green-600 p-2 text-white">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
