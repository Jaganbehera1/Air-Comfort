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
  // ===== INSTALLATION CATEGORY =====
  {
    id: 'faq_1',
    question: 'How long does solar installation take?',
    answer: 'Most residential installations are completed within 1 to 3 days after site assessment and approval, depending on system size and roof condition. Commercial installations may take 5-7 days.',
    category: 'Installation',
    popular: true,
    keywords: ['installation', 'timeline', 'duration', 'site visit', 'time', 'days', 'schedule', 'complete'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_2',
    question: 'Is my roof suitable for solar panels?',
    answer: 'Most rooftops can be evaluated for solar. We check the roof area (minimum 100 sq ft per kW), shading from trees/buildings, roof structure strength, and orientation (south-facing is best in India). We offer free site assessment to determine suitability.',
    category: 'Installation',
    popular: true,
    keywords: ['roof', 'suitability', 'shading', 'orientation', 'south facing', 'structure', 'assessment', 'check'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_3',
    question: 'Can solar panels be installed on all types of roofs?',
    answer: 'Yes, solar panels can be installed on most roof types including tile, metal, concrete, flat, and RCC roofs. Our team uses specialized mounting structures for each roof type to ensure safety and durability.',
    category: 'Installation',
    popular: false,
    keywords: ['roof type', 'tile', 'metal', 'concrete', 'flat', 'RCC', 'mounting', 'installation'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_4',
    question: 'Do solar panels require a lot of maintenance?',
    answer: 'Solar panels require minimal maintenance. We recommend cleaning panels 2-4 times per year to remove dust and debris. Our annual maintenance package includes professional cleaning, system inspection, and performance optimization.',
    category: 'Installation',
    popular: false,
    keywords: ['maintenance', 'cleaning', 'dust', 'debris', 'inspection', 'optimization', 'service'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ===== MAINTENANCE CATEGORY =====
  {
    id: 'faq_5',
    question: 'Do you provide maintenance services after installation?',
    answer: 'Yes! We offer comprehensive maintenance services including routine cleaning, performance checks, system monitoring, and annual inspection. Our maintenance plans start at ₹500 per month.',
    category: 'Maintenance',
    popular: true,
    keywords: ['maintenance', 'cleaning', 'service', 'support', 'checkup', 'monitoring', 'inspection', 'monthly'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_6',
    question: 'What happens if my solar system stops working?',
    answer: 'Our system monitoring alerts us to any performance issues. We provide 24/7 support and warranty coverage for equipment. Most issues are resolved within 24-48 hours. Contact our support team for immediate assistance.',
    category: 'Maintenance',
    popular: true,
    keywords: ['breakdown', 'fault', 'repair', 'warranty', 'support', 'issue', 'problem', 'not working', 'failure'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_7',
    question: 'How often should solar panels be cleaned?',
    answer: 'Solar panels should be cleaned every 3-6 months, depending on your location and environmental factors. Dust, bird droppings, and pollen can reduce efficiency by 15-25%. We offer professional cleaning services.',
    category: 'Maintenance',
    popular: false,
    keywords: ['clean', 'cleaning', 'dust', 'dirt', 'efficiency', 'pollution', 'service', 'professional'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ===== PROCESS CATEGORY =====
  {
    id: 'faq_8',
    question: 'What documents are needed for a rooftop solar proposal?',
    answer: 'We need: 1) Property address and ownership proof, 2) Last 6 months of electricity bills, 3) Roof photos or site measurements, 4) Preferred installation timeline, 5) Any specific requirements or budget constraints.',
    category: 'Process',
    popular: true,
    keywords: ['documents', 'proposal', 'electricity bill', 'roof photos', 'measurements', 'ownership', 'address', 'timeline'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_9',
    question: 'Can I get a quotation before booking a site visit?',
    answer: 'Absolutely! We provide a preliminary estimate based on your monthly electricity usage and rooftop area. After you share your details, we can give you a rough quote within 24 hours, then confirm with a site visit.',
    category: 'Process',
    popular: true,
    keywords: ['quotation', 'estimate', 'quote', 'site visit', 'preliminary', 'rough', 'budget', 'cost', 'price'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_10',
    question: 'What is the process for getting a solar system installed?',
    answer: 'Our process: 1) Free consultation & site assessment, 2) Custom system design & quotation, 3) Approval & documentation, 4) Equipment procurement, 5) Professional installation (1-3 days), 6) Quality check & commissioning, 7) Ongoing support & maintenance.',
    category: 'Process',
    popular: false,
    keywords: ['process', 'steps', 'procedure', 'consultation', 'design', 'approval', 'installation', 'support'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_11',
    question: 'Do I need to take permission from the electricity department?',
    answer: 'Yes, for grid-connected systems, you need approval from your local electricity distribution company (DISCOM). We help you with the entire approval process, including net metering application and documentation.',
    category: 'Process',
    popular: false,
    keywords: ['permission', 'electricity department', 'DISCOM', 'grid', 'net metering', 'approval', 'documentation'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ===== GENERAL CATEGORY =====
  {
    id: 'faq_12',
    question: 'What services do you offer?',
    answer: 'We offer comprehensive solar solutions including: • Residential & Commercial Rooftop Solar Installation • System Design & Engineering • Annual Maintenance Contracts • Solar Panel Cleaning • Battery Storage Solutions • Inverter Upgrades • Energy Monitoring • Government Subsidy Assistance.',
    category: 'General',
    popular: true,
    keywords: ['services', 'installation', 'maintenance', 'design', 'battery', 'inverter', 'subsidy', 'monitoring', 'cleaning'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_13',
    question: 'What is the warranty period for solar panels and equipment?',
    answer: 'We offer: • Solar Panels: 25-year performance warranty • Inverters: 5-10 years warranty • Battery Systems: 3-5 years warranty • Mounting Structures: 10-year warranty • Installation Work: 1-year warranty on labor. Extended warranties are available for purchase.',
    category: 'General',
    popular: true,
    keywords: ['warranty', 'guarantee', 'panels', 'inverter', 'battery', 'mounting', 'labor', 'extended'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_14',
    question: 'How much does a solar system cost?',
    answer: 'The cost depends on system size, equipment quality, and installation complexity. A typical 3kW residential system costs ₹1.2-1.8 lakhs, and a 5kW system costs ₹2-3.5 lakhs. We provide free quotes after site assessment.',
    category: 'General',
    popular: true,
    keywords: ['cost', 'price', 'budget', 'system size', '3kW', '5kW', 'lakhs', 'affordable', 'investment'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_15',
    question: 'Is solar energy reliable in rainy or cloudy weather?',
    answer: 'Yes, solar panels still generate electricity on cloudy days, though at reduced efficiency (about 30-50% of normal output). Modern panels work with diffused sunlight. During extended rainy periods, grid power serves as backup.',
    category: 'General',
    popular: false,
    keywords: ['rainy', 'cloudy', 'monsoon', 'weather', 'efficiency', 'diffused', 'backup', 'reliable'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_16',
    question: 'What is net metering and how does it work?',
    answer: 'Net metering allows you to sell excess solar power back to the grid. A bidirectional meter measures both import and export. You get credit for exported units, which offsets your electricity bill. This typically reduces bills by 60-90%.',
    category: 'General',
    popular: true,
    keywords: ['net metering', 'bi-directional', 'export', 'import', 'credit', 'bill reduction', 'grid', 'sell'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ===== PRODUCTS CATEGORY =====
  {
    id: 'faq_17',
    question: 'Do you provide battery backup solutions?',
    answer: 'Yes! We offer lithium-ion and lead-acid battery storage solutions. Battery capacity ranges from 2.5kWh to 20kWh, supporting 4-24 hours of backup. Our hybrid inverters automatically switch to battery during power cuts.',
    category: 'Products',
    popular: true,
    keywords: ['battery', 'backup', 'storage', 'lithium', 'lead acid', 'capacity', 'inverter', 'power cut', 'hybrid'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_18',
    question: 'What brands do you use for solar equipment?',
    answer: 'We partner with leading brands: Solar Panels: Tata Power Solar, Waaree, Adani Solar, Vikram Solar; Inverters: SMA, Huawei, Fronius, GoodWe; Batteries: Luminous, Exide, Livguard. All equipment comes with manufacturer warranty.',
    category: 'Products',
    popular: false,
    keywords: ['brands', 'tata', 'waaree', 'adani', 'vikram', 'sma', 'huawei', 'fronius', 'goodwe', 'luminous', 'exide'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_19',
    question: 'What is the difference between on-grid and hybrid systems?',
    answer: 'On-Grid: Connected to grid, no battery, works only when grid is available. Cheaper and simpler. Hybrid: Includes battery storage, works during power cuts, stores excess solar energy. More expensive but provides backup. Choose based on power cut frequency.',
    category: 'Products',
    popular: true,
    keywords: ['on-grid', 'hybrid', 'difference', 'comparison', 'battery', 'power cut', 'backup', 'grid', 'system'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_20',
    question: 'Can I expand my solar system later?',
    answer: 'Yes, systems are designed to be expandable. You can add more panels, increase battery capacity, or upgrade your inverter. We recommend planning for future expansion during the initial design phase.',
    category: 'Products',
    popular: false,
    keywords: ['expand', 'upgrade', 'add', 'capacity', 'future', 'planning', 'modular', 'flexible'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ===== SUPPORT CATEGORY =====
  {
    id: 'faq_21',
    question: 'Do you provide support after installation?',
    answer: 'Yes, we provide comprehensive post-installation support including: • 24/7 Technical Support Hotline • Annual Maintenance Contracts • Performance Monitoring • On-site Service • Warranty Management • System Health Reports',
    category: 'Support',
    popular: true,
    keywords: ['support', 'after sales', 'service', 'warranty', 'monitoring', 'maintenance', 'help', 'technical'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_22',
    question: 'What happens to my solar system during a power outage?',
    answer: 'With an on-grid system, it automatically shuts down for safety during power outages. With a hybrid system, it switches to battery backup, keeping essential loads running. We recommend hybrid systems for areas with frequent power cuts.',
    category: 'Support',
    popular: false,
    keywords: ['power outage', 'power cut', 'blackout', 'backup', 'on-grid', 'hybrid', 'safety', 'automatic'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_23',
    question: 'How can I monitor my solar system performance?',
    answer: 'We provide a mobile app and web portal for real-time monitoring. You can track daily generation, consumption, export/import, savings, and system health. You also receive monthly performance reports via email.',
    category: 'Support',
    popular: false,
    keywords: ['monitor', 'app', 'portal', 'performance', 'track', 'savings', 'reports', 'real-time'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ===== GOVERNMENT SUBSIDY CATEGORY =====
  {
    id: 'faq_24',
    question: 'What government subsidies are available for solar?',
    answer: 'Central Government: 30-40% subsidy on rooftop solar systems up to 10kW. State Governments: Additional subsidies vary by state (e.g., Odisha offers 20-30%). PM Surya Ghar Yojana: Special scheme for residential users. We help with the application process.',
    category: 'Government',
    popular: true,
    keywords: ['subsidy', 'government', 'PM Surya Ghar', 'central', 'state', 'Odisha', '30%', '40%', 'scheme'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_25',
    question: 'How do I apply for solar subsidy?',
    answer: 'We handle the entire subsidy application process: 1) System design & approval, 2) Application submission to DISCOM, 3) Technical inspection, 4) Installation & commissioning, 5) Final approval & subsidy disbursement. We ensure all documentation is compliant.',
    category: 'Government',
    popular: false,
    keywords: ['apply', 'application', 'process', 'subsidy', 'DISCOM', 'approval', 'commissioning', 'documentation'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_26',
    question: 'Who is eligible for solar subsidy?',
    answer: 'Eligibility: • Indian citizens with valid ID • Residential property owners • Systems up to 10kW capacity • Properties with valid electricity connection • Not applicable for commercial/industrial setups. Contact us for detailed eligibility check.',
    category: 'Government',
    popular: false,
    keywords: ['eligible', 'who', 'qualify', 'residential', 'owner', 'property', 'Aadhaar', 'PAN'],
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

// Get unique categories for filtering
export function getCategories(): string[] {
  const items = readAll();
  const categories = new Set(items.map(item => item.category));
  return ['All', ...Array.from(categories)];
}

// Get popular FAQs
export function getPopularFaqs(): FAQItem[] {
  return readAll().filter(item => item.popular).slice(0, 6);
}