import { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  Filter
} from 'lucide-react';
import { FAQItem } from '../../lib/faq';
// For the widget
import { listFaqs, findBestMatch, getPopularFaqs } from '../../lib/faq-data';

// For the FAQ section
import { getCategories, searchFaqs, getFaqsByCategory } from '../../lib/faq-data';
export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [filteredFaqs, setFilteredFaqs] = useState<FAQItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<string[]>(['All']);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [popularFaqs, setPopularFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    loadFaqs();
  }, []);

  useEffect(() => {
    filterFaqs();
  }, [faqs, searchTerm, selectedCategory]);

  const loadFaqs = () => {
    const allFaqs = listFaqs();
    setFaqs(allFaqs);
    setFilteredFaqs(allFaqs);
    setCategories(['All', ...getCategories()]);
    setPopularFaqs(getPopularFaqs());
  };

  const filterFaqs = () => {
    let filtered = faqs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(term) ||
        faq.answer.toLowerCase().includes(term) ||
        faq.keywords?.some(k => k.toLowerCase().includes(term)) ||
        faq.category.toLowerCase().includes(term)
      );
    }

    setFilteredFaqs(filtered);
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-yellow-100 to-green-100 rounded-full text-green-700 text-sm font-semibold mb-4">
            ❓ Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500 bg-clip-text text-transparent">
              Find Your
            </span> Answer
          </h2>
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Browse through our most common questions or search for specific topics.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions... (e.g., installation, subsidy, warranty)"
              className="w-full px-5 py-3 pl-12 rounded-2xl border-2 border-gray-200 bg-white focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-100 transition-all duration-300 shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-2 border-gray-200'
                }`}
              >
                {category === 'All' ? '📋 All' : category}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="text-center mt-4 text-sm text-gray-500">
            Showing {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'}
          </div>
        </div>

        {/* Popular FAQs Quick Access */}
        {!searchTerm && selectedCategory === 'All' && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <h3 className="text-sm font-semibold text-gray-700">Popular Questions</h3>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {popularFaqs.slice(0, 4).map((faq) => (
                <button
                  key={faq.id}
                  onClick={() => {
                    setSearchTerm(faq.question);
                    setExpandedId(faq.id);
                  }}
                  className="px-4 py-2 bg-white border-2 border-yellow-200 rounded-full text-sm hover:bg-yellow-50 hover:border-yellow-400 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {faq.question.length > 40 ? faq.question.slice(0, 40) + '...' : faq.question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl shadow-lg border-2 border-gray-200">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700">No questions found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-green-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-2 ${
                  expandedId === faq.id ? 'border-green-400' : 'border-gray-200 hover:border-green-200'
                }`}
              >
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-0.5 rounded-full">
                        {faq.category}
                      </span>
                      {faq.popular && (
                        <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Popular
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mt-2">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 text-green-500">
                    {expandedId === faq.id ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </button>
                
                {expandedId === faq.id && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-100 animate-slideDown">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {faq.answer}
                    </p>
                    {faq.keywords && faq.keywords.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {faq.keywords.slice(0, 5).map((keyword) => (
                          <span
                            key={keyword}
                            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
}