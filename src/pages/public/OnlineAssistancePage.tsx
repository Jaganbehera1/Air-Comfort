import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Mail, MessageCircle, Phone, Search, Sparkles, Headphones } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db, ContactInfo } from '../../lib/firebase';
import { FAQItem, listFaqs } from '../../lib/faq';

export function OnlineAssistancePage() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

  useEffect(() => {
    setItems(listFaqs());
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      const docSnap = await getDoc(doc(db, 'contact_info', 'default'));
      if (docSnap.exists()) {
        setContactInfo(docSnap.data() as ContactInfo);
      }
    } catch (error) {
      console.error('Failed to load contact info:', error);
    }
  };

  const categories = ['All', ...Array.from(new Set(items.map((item) => item.category).filter(Boolean)))];
  const filteredItems = items.filter((item) => {
    const matchesSearch = `${item.question} ${item.answer}`.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const popularItems = filteredItems.filter((item) => item.popular).slice(0, 4);
  const showNoResults = filteredItems.length === 0;

  const handleCall = () => {
    if (contactInfo?.phone_number) {
      window.location.href = `tel:${contactInfo.phone_number}`;
    }
  };

  const handleEmail = () => {
    if (contactInfo?.email) {
      window.location.href = `mailto:${contactInfo.email}?subject=Solar Assistance Request`;
    }
  };

  const handleWhatsApp = () => {
    if (contactInfo?.whatsapp_number) {
      const message = encodeURIComponent('Hello, I need assistance with solar solutions.');
      window.open(`https://wa.me/${contactInfo.whatsapp_number.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-emerald-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <section className="rounded-3xl bg-white shadow-xl border border-gray-100 p-8 md:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              <Sparkles className="h-4 w-4" />
              Online Assistance
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
              Need help with solar solutions?
            </h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Browse our frequently asked questions, find quick answers, and get in touch with our team whenever you need support.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for answers..."
                  className="w-full rounded-full border border-gray-300 py-3 pl-10 pr-4 text-sm shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
              <div className="rounded-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600">
                {filteredItems.length} result{filteredItems.length === 1 ? '' : 's'}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((value) => (
                <button
                  key={value}
                  onClick={() => setCategory(value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    category === value
                      ? 'bg-green-600 text-white shadow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </section>

          <aside className="rounded-3xl border border-green-100 bg-green-900 p-8 text-white shadow-xl">
            <div className="flex items-center gap-2 text-green-200">
              <Headphones className="h-5 w-5" />
              <span className="font-semibold">Popular Questions</span>
            </div>
            <div className="mt-5 space-y-3">
              {popularItems.length > 0 ? (
                popularItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setExpandedId(item.id)}
                    className="flex w-full items-start justify-between rounded-2xl bg-white/10 px-4 py-3 text-left transition hover:bg-white/20"
                  >
                    <span className="text-sm font-medium">{item.question}</span>
                    <ChevronDown className="mt-0.5 h-4 w-4 shrink-0" />
                  </button>
                ))
              ) : (
                <p className="text-sm text-green-100">No popular questions match your current filter.</p>
              )}
            </div>
          </aside>
        </div>

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-xl border border-gray-100">
          {showNoResults ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <h2 className="text-2xl font-semibold text-gray-900">No answers found</h2>
              <p className="mt-2 text-gray-600">Try another keyword or contact our team directly for personalized support.</p>
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <button onClick={handleCall} className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left transition hover:shadow-md">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <p className="mt-3 font-semibold text-gray-900">Call Office</p>
                  <p className="text-sm text-gray-600">{contactInfo?.phone_number || 'Available on request'}</p>
                </button>
                <button onClick={handleWhatsApp} className="rounded-2xl border border-green-200 bg-green-50 p-4 text-left transition hover:shadow-md">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  <p className="mt-3 font-semibold text-gray-900">WhatsApp</p>
                  <p className="text-sm text-gray-600">Chat with our team instantly</p>
                </button>
                <button onClick={handleEmail} className="rounded-2xl border border-red-200 bg-red-50 p-4 text-left transition hover:shadow-md">
                  <Mail className="h-5 w-5 text-red-600" />
                  <p className="mt-3 font-semibold text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{contactInfo?.email || 'Reach us directly'}</p>
                </button>
                <Link to="/contact" className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-left transition hover:shadow-md">
                  <Headphones className="h-5 w-5 text-amber-600" />
                  <p className="mt-3 font-semibold text-gray-900">Contact Form</p>
                  <p className="text-sm text-gray-600">Send a detailed enquiry</p>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const isOpen = expandedId === item.id;
                return (
                  <div key={item.id} className="rounded-2xl border border-gray-200 bg-gray-50/70 overflow-hidden">
                    <button
                      onClick={() => setExpandedId(isOpen ? null : item.id)}
                      className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.question}</p>
                        <p className="mt-1 text-xs uppercase tracking-wide text-green-600">{item.category}</p>
                      </div>
                      {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
                    </button>
                    {isOpen && <div className="border-t border-gray-200 px-5 py-4 text-sm leading-7 text-gray-700">{item.answer}</div>}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
