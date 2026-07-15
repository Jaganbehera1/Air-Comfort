import { useEffect, useState } from 'react';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import { FAQItem, createFaqDraft, deleteFaq, listFaqs, saveFaq } from '../../lib/faq';

export function AdminOnlineAssistancePage() {
  const [items, setItems] = useState<FAQItem[]>([]);
  const [form, setForm] = useState<FAQItem>(createFaqDraft());
  const [editingId, setEditingId] = useState<string | null>(null);

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
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this FAQ entry?')) return;
    deleteFaq(id);
    setItems(listFaqs());
    if (editingId === id) resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Online Assistance</h1>
          <p className="mt-2 text-gray-600">Manage frequently asked questions and keep support content polished and up to date.</p>
        </div>

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-6">
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{editingId ? 'Edit Question' : 'Add New Question'}</h2>
              {editingId && (
                <button type="button" onClick={resetForm} className="flex items-center gap-2 text-sm text-gray-500">
                  <X className="h-4 w-4" /> Cancel
                </button>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Question</label>
                <input
                  value={form.question}
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="What is the installation timeline?"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Answer</label>
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  rows={5}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                  placeholder="Write a clear response for customers..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                    placeholder="General"
                  />
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                  <input
                    id="popular"
                    type="checkbox"
                    checked={form.popular}
                    onChange={(e) => setForm({ ...form, popular: e.target.checked })}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="popular" className="text-sm font-medium text-gray-700">Show as popular question</label>
                </div>
              </div>
            </div>

            <button type="submit" className="mt-6 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-3 text-white font-semibold hover:bg-green-700">
              <Save className="h-4 w-4" /> {editingId ? 'Update FAQ' : 'Add FAQ'}
            </button>
          </form>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                      {item.popular && <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">Popular</span>}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleEdit(item)} className="rounded-full p-2 text-green-600 hover:bg-green-50">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="rounded-full p-2 text-red-500 hover:bg-red-50">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
