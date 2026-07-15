import Fuse, { type IFuseOptions } from 'fuse.js';
import { FAQItem, listFaqs } from './faq';

export interface FaqMatch {
  faq?: FAQItem;
  score?: number; // lower is better (0 best)
  answer: string;
  found: boolean;
}

const DEFAULT_ACCEPT_SCORE = 0.4; // Accept scores <= this as good matches

const fuseOptions: IFuseOptions<FAQItem> = {
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  isCaseSensitive: false,
  minMatchCharLength: 2,
  keys: [
    { name: 'question', weight: 0.45 },
    { name: 'answer', weight: 0.25 },
    { name: 'category', weight: 0.1 },
    { name: 'keywords', weight: 0.7 },
  ],
};

// Search FAQs using Fuse.js and return the best match if confident enough.
export function findBestMatch(query: string, acceptScore = DEFAULT_ACCEPT_SCORE): FaqMatch {
  const q = (query || '').trim();
  if (!q) {
    return { found: false, answer: "Sorry, I couldn't find an answer. Please contact our support team." };
  }

  // quick-contact detection: user asking for phone/call/contact
  if (/(call|phone|contact|mobile|number|reach|whatsapp|talk)/i.test(q)) {
    return { found: true, answer: 'You can reach our team at 7978966065', score: 0 };
  }

  const items = listFaqs();
  const fuse = new Fuse(items, fuseOptions);
  const results = fuse.search(q);
  if (!results || results.length === 0) {
    return { found: false, answer: "Sorry, I couldn't find an answer. Please contact our support team." };
  }

  const best = results[0];
  const score = typeof best.score === 'number' ? best.score : 1;
  if (score <= acceptScore) {
    return { found: true, faq: best.item, score, answer: best.item.answer };
  }

  return { found: false, answer: "Sorry, I couldn't find an answer. Please contact our support team.", score };
}
