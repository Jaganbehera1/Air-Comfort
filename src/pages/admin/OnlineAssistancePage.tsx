import { useEffect, useState } from 'react';
import { 
  Pencil, 
  Trash2, 
  Save, 
  X, 
  Plus, 
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  HelpCircle,
  Star,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Tag,
  Layers,
  Grid,
  List,
  FileText,
  Users,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react';
import { FAQItem, createFaqDraft, deleteFaq, listFaqs, saveFaq } from '../../lib/faq';

export function AdminOnlineAssistancePage() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [form, setForm] = useState<FAQItem>(createFaqDraft());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showPopularOnly, setShowPopularOnly] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    setItems(listFaqs());
  }, []);

  const resetForm = () => {
    setForm(createFaqDraft());
    setEditingId(null);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.question.trim() || !form.answer.trim()) return;

    const now = new Date().toISOString();
    const faq: FAQItem = {
      ...form,
      id: editingId || `faq_${Date.now()}`,
      question: form.question.trim(),
      answer: form.answer.trim(),
      category: form.category.trim() || 'General',
      updated_at: now,
      created_at: editingId ? form.created_at : now,
    };

    saveFaq(faq);
    setItems(listFaqs());
    resetForm();
  };

  const handleEdit = (item: FAQItem) => {
    setForm(item);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this FAQ entry?')) return;
    deleteFaq(id);
    setItems(listFaqs());
    if (editingId === id) resetForm();
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter and search
  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesPopular = !showPopularOnly || item.popular;
    return matchesSearch && matchesCategory && matchesPopular;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(items.map(item => item.category))];

  const stats = {
    total: items.length,
    popular: items.filter(i => i.popular).length,
    categories: categories.length - 1,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Online Assistance
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">Manage frequently asked questions and support content</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-500">{items.length} FAQs</span>
            </div>
            <button
              onClick={() => {
                resetForm();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
            >
              <Plus className="h-5 w-5" />
              Add New FAQ
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500 font-medium">Total FAQs</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl border border-yellow-200 p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-2xl font-bold text-yellow-600">{stats.popular}</p>
            <p className="text-xs text-yellow-600 font-medium">Popular Questions</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-200 p-4 text-center hover:shadow-md transition-all duration-300">
            <p className="text-2xl font-bold text-purple-600">{stats.categories}</p>
            <p className="text-xs text-purple-600 font-medium">Categories</p>
          </div>
        </div>

        {/* Form Section */}
        <div className={`bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 transition-all duration-500 ${editingId || form.question || form.answer ? 'ring-2 ring-blue-200' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${editingId ? 'bg-gradient-to-br from-yellow-50 to-amber-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
                {editingId ? <Pencil className="h-5 w-5 text-yellow-600" /> : <Plus className="h-5 w-5 text-blue-600" />}
              </div>
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? 'Edit FAQ' : 'Add New FAQ'}
              </h2>
              {editingId && (
                <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">
                  Editing
                </span>
              )}
            </div>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-all duration-300"
              >
                <X className="h-4 w-4" />
                <span className="text-sm font-medium">Cancel</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  <span className="text-red-500">*</span> Question
                </label>
                <input
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  placeholder="e.g. What is the installation timeline?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Category
                </label>
                <input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none bg-gray-50/50"
                  placeholder="e.g. Installation, Maintenance"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                <span className="text-red-500">*</span> Answer
              </label>
              <textarea
                value={form.answer}
                onChange={(e) => setForm({ ...form, answer: e.target.value })}
                rows={4}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none bg-gray-50/50 resize-none"
                placeholder="Write a clear and helpful response for customers..."
              />
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={form.popular}
                  onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-lg border-2 transition-all duration-300 flex items-center justify-center ${
                  form.popular 
                    ? 'border-yellow-400 bg-yellow-400' 
                    : 'border-gray-300 bg-white group-hover:border-yellow-300'
                }`}>
                  {form.popular && <Star className="h-3.5 w-3.5 text-white" />}
                </div>
                <span className="text-sm font-medium text-gray-700">Mark as Popular</span>
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all duration-300"
              >
                <Save className="h-5 w-5" />
                {editingId ? 'Update FAQ' : 'Add FAQ'}
              </button>
            </div>
          </form>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search FAQs by question, answer, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
              <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:border-yellow-300 transition-all duration-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPopularOnly}
                  onChange={(e) => setShowPopularOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded border-2 transition-all duration-300 flex items-center justify-center ${
                  showPopularOnly ? 'border-yellow-400 bg-yellow-400' : 'border-gray-300'
                }`}>
                  {showPopularOnly && <Star className="h-3 w-3 text-white" />}
                </div>
                <span className="text-sm font-medium text-gray-700">Popular only</span>
              </label>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-all duration-300 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <List className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-all duration-300 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              FAQs
              <span className="ml-2 text-sm font-normal text-gray-400">
                ({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'})
              </span>
            </h2>
          </div>

          {filteredItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mb-4">
                <HelpCircle className="h-12 w-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700">No FAQs found</h3>
              <p className="text-gray-400 mt-1">
                {searchTerm || filterCategory !== 'all' || showPopularOnly ? 'Try adjusting your filters' : 'Add your first FAQ'}
              </p>
              {!searchTerm && filterCategory === 'all' && !showPopularOnly && (
                <button
                  onClick={() => {
                    resetForm();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <Plus className="h-5 w-5" />
                  Add FAQ
                </button>
              )}
            </div>
          ) : (
            <div className={`space-y-3 ${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0' : ''}`}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'grid' ? 'p-5' : 'p-4'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="flex items-start gap-2 hover:text-blue-600 transition-colors group flex-1"
                        >
                          <div className="mt-1 flex-shrink-0">
                            {expandedId === item.id ? (
                              <ChevronUp className="h-4 w-4 text-blue-500" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                            )}
                          </div>
                          <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {item.question}
                          </h3>
                        </button>
                        {item.popular && (
                          <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-50 to-amber-50 px-2.5 py-1 text-xs font-semibold text-yellow-700 border border-yellow-200 flex-shrink-0">
                            <Star className="h-3 w-3" />
                            Popular
                          </span>
                        )}
                      </div>
                      
                      {item.category && (
                        <div className="flex items-center gap-1 text-xs text-gray-400 ml-6">
                          <Tag className="h-3 w-3" />
                          <span>{item.category}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-all duration-300"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-all duration-300"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {(expandedId === item.id || viewMode === 'grid') && (
                    <div className={`mt-3 pt-3 border-t border-gray-200 ${viewMode === 'grid' ? '' : 'ml-6'}`}>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Updated: {new Date(item.updated_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <HelpCircle className="h-3 w-3 text-blue-500" />
              {stats.total} FAQs
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              {stats.popular} Popular
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <Tag className="h-3 w-3 text-purple-500" />
              {stats.categories} Categories
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Live
            </span>
            <span className="w-px h-3 bg-gray-200"></span>
            <span>v2.0.1</span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}