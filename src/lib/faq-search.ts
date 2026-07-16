import Fuse, { type IFuseOptions } from 'fuse.js';
import { FAQItem, listFaqs } from './faq';

export interface FaqMatch {
  faq?: FAQItem;
  score?: number;
  answer: string;
  found: boolean;
  category?: string;
}

const DEFAULT_ACCEPT_SCORE = 0.45;

const fuseOptions: IFuseOptions<FAQItem> = {
  includeScore: true,
  threshold: 0.35,
  ignoreLocation: true,
  isCaseSensitive: false,
  minMatchCharLength: 2,
  keys: [
    { name: 'question', weight: 0.5 },
    { name: 'answer', weight: 0.25 },
    { name: 'category', weight: 0.1 },
    { name: 'keywords', weight: 0.8 },
  ],
};

export function findBestMatch(query: string, acceptScore = DEFAULT_ACCEPT_SCORE): FaqMatch {
  const q = (query || '').trim().toLowerCase();
  
  if (!q) {
    return { 
      found: false, 
      answer: "Please ask a question and I'll try to help you find the answer." 
    };
  }

  // Quick contact detection - user asking for phone/call/contact
  if (/(call|phone|contact|mobile|number|reach|whatsapp|talk|speak|connect)/i.test(q)) {
    return { 
      found: true, 
      answer: '📞 You can reach our team at:\n• Phone: 8260660327\n• WhatsApp: 8260660327\n• Email: info@greenleafenergy.com\n• Working Hours: 8:00 AM - 8:00 PM (Mon-Sat)', 
      score: 0,
      category: 'Contact'
    };
  }

  // Price/estimate detection
  if (/(price|cost|budget|estimate|quote|₹|rupees|lakh|thousand)/i.test(q)) {
    const items = listFaqs();
    const priceFaq = items.find(item => 
      item.question.toLowerCase().includes('cost') || 
      item.question.toLowerCase().includes('price') ||
      item.keywords?.some(k => k.includes('cost') || k.includes('price'))
    );
    if (priceFaq) {
      return { found: true, faq: priceFaq, answer: priceFaq.answer, score: 0.1 };
    }
  }

  // Warranty detection
  if (/(warranty|guarantee|service|repair|replacement)/i.test(q)) {
    const items = listFaqs();
    const warrantyFaq = items.find(item => 
      item.question.toLowerCase().includes('warranty') || 
      item.keywords?.some(k => k.includes('warranty'))
    );
    if (warrantyFaq) {
      return { found: true, faq: warrantyFaq, answer: warrantyFaq.answer, score: 0.1 };
    }
  }

  const items = listFaqs();
  const fuse = new Fuse(items, fuseOptions);
  const results = fuse.search(q);

  if (!results || results.length === 0) {
    return { 
      found: false, 
      answer: "I couldn't find a specific answer to your question. Please try rephrasing or contact our support team at 8260660327 for assistance." 
    };
  }

  // Get top 3 results for context
  const topResults = results.slice(0, 3);
  const best = topResults[0];
  const score = typeof best.score === 'number' ? best.score : 1;

  // If the best match is very good, return it
  if (score <= acceptScore) {
    return { 
      found: true, 
      faq: best.item, 
      score, 
      answer: best.item.answer,
      category: best.item.category
    };
  }

  // If we have multiple results and some are relevant, suggest them
  if (topResults.length > 1 && topResults.some(r => (r.score || 1) < 0.6)) {
    const relevantResults = topResults.filter(r => (r.score || 1) < 0.6);
    const suggestions = relevantResults.map(r => `• ${r.item.question}`).join('\n');
    return {
      found: true,
      answer: `I found some related questions:\n\n${suggestions}\n\nWould you like to know more about any of these?`,
      score: 0.3
    };
  }

  return { 
    found: false, 
    answer: "I couldn't find an exact match. Please try rephrasing your question or contact our team at 8260660327 for personalized assistance.",
    score 
  };
}

// Search by category
export function searchByCategory(category: string): FAQItem[] {
  const items = listFaqs();
  if (category === 'All') return items;
  return items.filter(item => item.category === category);
}

// Get suggestions based on partial query
export function getSuggestions(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];
  
  const items = listFaqs();
  const fuse = new Fuse(items, {
    keys: ['question', 'keywords'],
    threshold: 0.6,
    minMatchCharLength: 2,
  });
  
  const results = fuse.search(q).slice(0, 5);
  return results.map(r => r.item.question);
}