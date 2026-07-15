export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  popular: boolean;
  created_at: string;
  updated_at: string;
  keywords?: string[];
}

const STORAGE_KEY = 'kse_online_assistance_faqs_v1';

const sampleFaqs: FAQItem[] = [
  {
    id: 'faq_1',
    question: 'How long does solar installation take?',
    answer:
      'Most residential installations are completed within 1 to 3 days after site assessment and approval, depending on system size and roof condition.',
    category: 'Installation',
    popular: true,
    keywords: ['installation', 'timeline', 'duration', 'site visit'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_2',
    question: 'Do you provide maintenance services after installation?',
    answer:
      'Yes. We offer routine maintenance, cleaning, and performance checks to keep the system running efficiently over time.',
    category: 'Maintenance',
    popular: true,
    keywords: ['maintenance', 'cleaning', 'service', 'support', 'checkup'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_3',
    question: 'What documents are needed for a rooftop solar proposal?',
    answer:
      'We usually need the property address, electricity bill, roof type or photos, and a preferred installation timeline so we can prepare the right proposal.',
    category: 'Process',
    popular: false,
    keywords: ['documents', 'proposal', 'electricity bill', 'roof photos'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_4',
    question: 'Can I get a quotation before booking a site visit?',
    answer:
      'Absolutely. We can provide a preliminary estimate based on your usage and rooftop details, then confirm with a site visit if needed.',
    category: 'General',
    popular: true,
    keywords: ['quotation', 'estimate', 'quote', 'site visit'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_5',
    question: 'What services do you offer?',
    answer:
      'We offer rooftop solar installation, system design, maintenance, performance checks, and quotation support for residential and commercial projects.',
    category: 'General',
    popular: true,
    keywords: ['services', 'installation', 'maintenance', 'quotation', 'commercial'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_6',
    question: 'Do you provide battery backup solutions?',
    answer:
      'Yes. We can recommend battery backup and inverter options to support your home or business during power cuts.',
    category: 'Products',
    popular: false,
    keywords: ['battery', 'backup', 'inverter', 'power cut'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_7',
    question: 'Is my roof suitable for solar?',
    answer:
      'Most rooftops can be evaluated for solar. We usually check the roof area, shading, structure, and orientation before recommending a system.',
    category: 'Installation',
    popular: false,
    keywords: ['roof', 'suitability', 'shading', 'orientation'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_8',
    question: 'Do you provide warranty or support after installation?',
    answer:
      'Yes. We provide installation support and help with warranty-related questions based on the equipment and service package you choose.',
    category: 'Support',
    popular: false,
    keywords: ['warranty', 'support', 'service'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function readAll(): FAQItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return sampleFaqs;
    return JSON.parse(raw) as FAQItem[];
  } catch (error) {
    console.error('Failed to read FAQ data', error);
    return sampleFaqs;
  }
}

function writeAll(items: FAQItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Failed to save FAQ data', error);
  }
}

export function listFaqs(): FAQItem[] {
  return readAll().sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
}

export function getFaq(id: string): FAQItem | undefined {
  return readAll().find((item) => item.id === id);
}

export function saveFaq(faq: FAQItem) {
  const items = readAll();
  const index = items.findIndex((item) => item.id === faq.id);
  if (index >= 0) {
    items[index] = faq;
  } else {
    items.push(faq);
  }
  writeAll(items);
}

export function deleteFaq(id: string) {
  const items = readAll().filter((item) => item.id !== id);
  writeAll(items);
}

export function createFaqDraft(partial: Partial<FAQItem> = {}): FAQItem {
  const now = new Date().toISOString();
  return {
    id: `faq_${Date.now()}`,
    question: '',
    answer: '',
    category: 'General',
    popular: false,
    created_at: now,
    updated_at: now,
    ...partial,
  };
}
