export const siteUrl = 'https://aircomforts.netlify.app';
export const siteName = 'Air Comfort Solar';
export const defaultImage = '/images/og-default.jpg';
export const businessName = 'Air Comfort Solar';
export const businessPhone = '+91-7008-XXXXXX';
export const businessEmail = 'info@aircomfortsolar.com';
export const businessAddress = 'Bhubaneswar, Odisha, India';
export const businessAreas = [
  'Bhubaneswar',
  'Cuttack',
  'Puri',
  'Khordha',
  'Nayagarh',
  'Balasore',
  'Sambalpur',
  'Berhampur',
  'Rourkela',
  'Jajpur',
  'Kendrapara',
  'Jagatsinghpur',
  'Angul',
  'Dhenkanal',
  'Koraput',
  'Rayagada',
  'Nabarangpur',
  'Kalahandi',
  'Bargarh',
  'Jharsuguda',
];

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  image?: string;
  type?: 'website' | 'article';
}

export interface ServicePageData {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  summary: string;
  bullets: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export interface LocationPageData {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  summary: string;
  serviceArea: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  content: string;
  keywords: string;
}

export const servicePages: ServicePageData[] = [
  {
    slug: 'residential-solar-installation',
    title: 'Residential Solar Installation in Odisha',
    description: 'Trusted residential solar installation services in Bhubaneswar and Odisha with premium panels, batteries, net metering, and subsidy guidance.',
    keywords: 'residential solar installation odisha, home solar installation bhubaneswar, rooftop solar for home odisha',
    summary: 'Power your home with efficient rooftop solar designed for Odisha households and subsidy-backed installation.',
    bullets: ['On-grid and hybrid system design', 'Net metering support', 'Long-term maintenance plans', 'Affordable EMI options'],
    faqs: [
      { question: 'How much does a rooftop solar system for a home cost?', answer: 'Costs vary by roof size, usage, and battery needs. We provide custom proposals for homes across Bhubaneswar and Odisha.' },
      { question: 'Is PM Surya Ghar subsidy available for homes?', answer: 'Yes, eligible homeowners can receive subsidy support under the PM Surya Ghar programme with our assistance.' },
    ],
  },
  {
    slug: 'commercial-solar-installation',
    title: 'Commercial Solar Installation in Odisha',
    description: 'Professional commercial solar installation for offices, shops, warehouses, and small industries across Odisha.',
    keywords: 'commercial solar installation odisha, solar for business odisha, commercial rooftop solar',
    summary: 'Reduce operating costs with dependable solar systems built for commercial rooftops and industrial buildings.',
    bullets: ['High-performance panels', 'Low downtime installations', 'Turnkey project delivery', 'Energy monitoring support'],
    faqs: [
      { question: 'Can commercial buildings benefit from solar?', answer: 'Yes. Solar reduces electricity bills and improves sustainability for commercial users across Odisha.' },
    ],
  },
  {
    slug: 'industrial-solar',
    title: 'Industrial Solar Solutions Odisha',
    description: 'Scalable industrial solar systems for manufacturing units, warehouses, and high-load operations in Odisha.',
    keywords: 'industrial solar odisha, solar for factories odisha, solar EPC services odisha',
    summary: 'Deliver dependable renewable power for industrial facilities with robust engineering and system design.',
    bullets: ['High-capacity EPC support', 'Remote monitoring', 'Safe installation practices', 'Custom power planning'],
    faqs: [
      { question: 'Do industrial facilities need custom designs?', answer: 'Yes, we design systems around operating hours, power demand, and available roof or land space.' },
    ],
  },
  {
    slug: 'on-grid-solar',
    title: 'On Grid Solar Installation Odisha',
    description: 'Energy-efficient on grid solar installation for homes and businesses in Odisha with net metering support.',
    keywords: 'on grid solar installation odisha, on grid rooftop solar odisha',
    summary: 'Enjoy lower bills and easy grid connectivity with a modern on-grid solar system.',
    bullets: ['Net metering ready', 'Grid-tied performance', 'Simple maintenance', 'Ideal for urban rooftops'],
    faqs: [
      { question: 'What is on grid solar?', answer: 'On-grid solar systems feed surplus power into the grid and reduce your monthly electricity bill.' },
    ],
  },
  {
    slug: 'off-grid-solar',
    title: 'Off Grid Solar Installation Odisha',
    description: 'Standalone off-grid solar systems for remote properties, farms, and facilities needing dependable backup power.',
    keywords: 'off grid solar installation odisha, off grid solar system odisha',
    summary: 'Keep your property powered with an independent solar installation designed for remote areas.',
    bullets: ['Battery storage ready', 'Reliable backup power', 'Suitable for remote sites', 'Low maintenance'],
    faqs: [
      { question: 'Is off grid solar suitable for homes?', answer: 'Yes, especially for properties where grid access is limited or unreliable.' },
    ],
  },
  {
    slug: 'hybrid-solar',
    title: 'Hybrid Solar System Odisha',
    description: 'Hybrid solar systems with battery backup for uninterrupted power and smart energy use.',
    keywords: 'hybrid solar system odisha, hybrid rooftop solar odisha',
    summary: 'Combine solar generation with battery backup for resilient power during outages and peak hours.',
    bullets: ['Battery backup', 'Smart energy control', 'Power during outages', 'Ideal for critical loads'],
    faqs: [
      { question: 'What is a hybrid solar system?', answer: 'A hybrid solar system uses both solar panels and battery storage while staying connected to the grid.' },
    ],
  },
  {
    slug: 'solar-maintenance',
    title: 'Solar Maintenance Odisha',
    description: 'Professional solar maintenance and inspection services to keep rooftop systems performing at peak efficiency.',
    keywords: 'solar maintenance odisha, solar maintenance services odisha',
    summary: 'Protect your investment with regular maintenance, cleaning, diagnostics, and performance checks.',
    bullets: ['Panel cleaning', 'Performance audits', 'Inverter checks', 'AMC support'],
    faqs: [
      { question: 'How often should solar systems be serviced?', answer: 'Routine inspections are recommended every few months, with cleaning and diagnostics scheduled based on site conditions.' },
    ],
  },
  {
    slug: 'solar-amc',
    title: 'Solar AMC Services Odisha',
    description: 'Annual maintenance contracts for solar plants and rooftop projects in Odisha with proactive support.',
    keywords: 'solar amc odisha, annual maintenance contract solar odisha',
    summary: 'Stay protected with an annual maintenance contract that covers technical support and preventive care.',
    bullets: ['Annual inspections', 'Priority support', 'Preventive maintenance', 'Remote monitoring support'],
    faqs: [
      { question: 'Is an AMC useful for solar systems?', answer: 'Yes, it helps reduce downtime and keeps your solar system performing consistently over time.' },
    ],
  },
  {
    slug: 'pm-surya-ghar',
    title: 'PM Surya Ghar Yojana Odisha',
    description: 'Learn how PM Surya Ghar subsidy helps homeowners in Odisha install rooftop solar with lower upfront costs.',
    keywords: 'pm surya ghar odisha, solar subsidy odisha, rooftop solar subsidy',
    summary: 'Make your rooftop solar investment easier with subsidy guidance and end-to-end installation support.',
    bullets: ['Subsidy guidance', 'Documentation support', 'Fast installation planning', 'Eligible rooftop solutions'],
    faqs: [
      { question: 'How much subsidy is available under PM Surya Ghar?', answer: 'The subsidy amount depends on the system size and eligibility. We help homeowners understand the latest scheme details.' },
    ],
  },
];

export const locationPages: LocationPageData[] = [
  {
    slug: 'bhubaneswar',
    title: 'Solar Company in Bhubaneswar',
    description: 'Reliable solar installation company in Bhubaneswar for homes, offices, and commercial buildings across Odisha.',
    keywords: 'solar company in bhubaneswar, solar installation company bhubaneswar, rooftop solar bhubaneswar',
    summary: 'Serving Bhubaneswar with rooftop solar, maintenance, and subsidy support for modern energy needs.',
    serviceArea: ['Bhubaneswar', 'Patia', 'Kalinga Nagar', 'BDA Areas'],
    faqs: [
      { question: 'Do you serve Bhubaneswar neighborhoods?', answer: 'Yes, we work across Bhubaneswar including residential and commercial zones.' },
    ],
  },
  {
    slug: 'cuttack',
    title: 'Solar Installation in Cuttack',
    description: 'Professional solar solutions for homes and businesses in Cuttack with custom rooftop design and installation.',
    keywords: 'solar installation cuttack, solar company cuttack, rooftop solar cuttack',
    summary: 'Trusted solar services for Cuttack properties with expert installation and maintenance support.',
    serviceArea: ['Cuttack', 'Madhupatna', 'Tangi', 'Badambadi'],
    faqs: [
      { question: 'Can you install solar in Cuttack?', answer: 'Yes, we provide site surveys and installation support for properties in and around Cuttack.' },
    ],
  },
  {
    slug: 'puri',
    title: 'Solar Company in Puri',
    description: 'Solar systems for homes, hotels, and commercial spaces in Puri with reliable performance and maintenance.',
    keywords: 'solar company puri, rooftop solar puri, solar installation puri',
    summary: 'Support for Puri customers looking for sustainable power and reduced electricity bills.',
    serviceArea: ['Puri', 'Konark', 'Raghurajpur', 'Brahmagiri'],
    faqs: [
      { question: 'Do you serve hotels and resorts in Puri?', answer: 'Yes, we design custom systems for hospitality and commercial properties.' },
    ],
  },
  {
    slug: 'khordha',
    title: 'Solar Installation in Khordha',
    description: 'Dependable solar projects for homes and businesses in Khordha with easy subsidy support.',
    keywords: 'solar installation khordha, rooftop solar khordha',
    summary: 'Bringing clean energy to Khordha homes and businesses with durable installations.',
    serviceArea: ['Khordha', 'Jatni', 'Bhubaneswar outskirts', 'Dhamnagar'],
    faqs: [
      { question: 'Do you cover rural and semi-urban areas in Khordha?', answer: 'Yes, we extend installation support to several Khordha locations.' },
    ],
  },
  {
    slug: 'nayagarh',
    title: 'Solar Company in Nayagarh',
    description: 'Affordable rooftop solar installations for homes and businesses in Nayagarh.',
    keywords: 'solar company nayagarh, solar installation nayagarh',
    summary: 'Helping Nayagarh customers lower energy costs with efficient solar systems.',
    serviceArea: ['Nayagarh', 'Khandapada', 'Dasapalla', 'Odagaon'],
    faqs: [
      { question: 'Is solar suitable for small towns?', answer: 'Yes, our systems are designed for small-town climates and usage patterns.' },
    ],
  },
  {
    slug: 'balasore',
    title: 'Solar Installation in Balasore',
    description: 'Custom solar installation services in Balasore for residential and commercial requirements.',
    keywords: 'solar installation balasore, solar company balasore',
    summary: 'Reliable solar delivery for Balasore with strong after-sales support.',
    serviceArea: ['Balasore', 'Soro', 'Nilagiri', 'Basta'],
    faqs: [
      { question: 'Do you serve Balasore district?', answer: 'Yes, we support projects across Balasore and nearby areas.' },
    ],
  },
  {
    slug: 'sambalpur',
    title: 'Solar Company in Sambalpur',
    description: 'Professional solar installation and maintenance for homes and business properties in Sambalpur.',
    keywords: 'solar company sambalpur, rooftop solar sambalpur',
    summary: 'Delivering efficient solar solutions for Sambalpur with strong workmanship and support.',
    serviceArea: ['Sambalpur', 'Burla', 'Rairakhol', 'Jharsuguda'],
    faqs: [
      { question: 'Can you support commercial projects in Sambalpur?', answer: 'Yes, we serve a range of commercial and institutional projects.' },
    ],
  },
  {
    slug: 'berhampur',
    title: 'Solar Installation in Berhampur',
    description: 'Trusted solar installations for homes, shops, and small businesses in Berhampur.',
    keywords: 'solar installation berhampur, rooftop solar berhampur',
    summary: 'Helping Berhampur properties adopt clean and cost-effective solar power.',
    serviceArea: ['Berhampur', 'Aska', 'Gopalpur', 'Chhatrapur'],
    faqs: [
      { question: 'Do you serve the Berhampur region?', answer: 'Yes, we cover multiple project types around Berhampur.' },
    ],
  },
  {
    slug: 'rourkela',
    title: 'Solar Company in Rourkela',
    description: 'Sustainable rooftop solar systems for homes and businesses in Rourkela and nearby areas.',
    keywords: 'solar company rourkela, solar installation rourkela',
    summary: 'Supporting Rourkela with dependable solar installations and local service.',
    serviceArea: ['Rourkela', 'Rajgangpur', 'Bondamunda', 'Sundargarh'],
    faqs: [
      { question: 'Can you install in industrial and residential areas?', answer: 'Yes, our solutions are suitable for different property types.' },
    ],
  },
  {
    slug: 'jajpur',
    title: 'Solar Installation in Jajpur',
    description: 'Affordable solar systems for residences and small commercial spaces in Jajpur.',
    keywords: 'solar installation jajpur, rooftop solar jajpur',
    summary: 'Helping Jajpur customers transition to solar with clear planning and execution.',
    serviceArea: ['Jajpur', 'Danagadi', 'Dasarathpur', 'Binjharpur'],
    faqs: [
      { question: 'Do you support small and medium businesses?', answer: 'Yes, we design for small commercial and residential needs.' },
    ],
  },
  {
    slug: 'kendrapara',
    title: 'Solar Company in Kendrapara',
    description: 'Professional rooftop solar design and installation for properties in Kendrapara.',
    keywords: 'solar company kendrapara, solar installation kendrapara',
    summary: 'Delivering dependable solar installations for homes and businesses in Kendrapara.',
    serviceArea: ['Kendrapara', 'Astaranga', 'Mahakalapada', 'Patamundai'],
    faqs: [
      { question: 'Do you cover coastal regions?', answer: 'Yes, we provide solutions considering local weather and site conditions.' },
    ],
  },
  {
    slug: 'jagatsinghpur',
    title: 'Solar Installation in Jagatsinghpur',
    description: 'Solar installation services in Jagatsinghpur for homes, shops, and local business properties.',
    keywords: 'solar installation jagatsinghpur, rooftop solar jagatsinghpur',
    summary: 'Assisting Jagatsinghpur residents with practical rooftop solar projects.',
    serviceArea: ['Jagatsinghpur', 'Paradeep', 'Tirtol', 'Biridi'],
    faqs: [
      { question: 'Can you handle small rooftop projects?', answer: 'Yes, we work on a wide range of rooftop sizes and electrical loads.' },
    ],
  },
  {
    slug: 'angul',
    title: 'Solar Company in Angul',
    description: 'Reliable solar systems and maintenance for Angul homes and commercial properties.',
    keywords: 'solar company angul, solar installation angul',
    summary: 'Enhancing Angul with clean energy solutions that balance cost and reliability.',
    serviceArea: ['Angul', 'Talcher', 'Pallahara', 'Athmallik'],
    faqs: [
      { question: 'Do you serve industrial clusters near Angul?', answer: 'Yes, we support both commercial and industrial project requirements.' },
    ],
  },
  {
    slug: 'dhenkanal',
    title: 'Solar Installation in Dhenkanal',
    description: 'Custom rooftop solar installation in Dhenkanal for homes, offices, and local businesses.',
    keywords: 'solar installation dhenkanal, rooftop solar dhenkanal',
    summary: 'Bringing clear energy savings to Dhenkanal through tailored solar design.',
    serviceArea: ['Dhenkanal', 'Basantpur', 'Hindol', 'Gondia'],
    faqs: [
      { question: 'Do you offer maintenance after installation?', answer: 'Yes, we provide maintenance and AMC support after project completion.' },
    ],
  },
  {
    slug: 'koraput',
    title: 'Solar Company in Koraput',
    description: 'Solar energy solutions for homes and institutions in Koraput with durable installations.',
    keywords: 'solar company koraput, solar installation koraput',
    summary: 'Supporting Koraput residents with dependable solar projects and renewable energy guidance.',
    serviceArea: ['Koraput', 'Jeypore', 'Kotpad', 'Nandapur'],
    faqs: [
      { question: 'Do you support remote locations?', answer: 'Yes, we can assess remote site conditions and recommend suitable systems.' },
    ],
  },
  {
    slug: 'rayagada',
    title: 'Solar Installation in Rayagada',
    description: 'Solar installation services for Rayagada homes, schools, and commercial buildings.',
    keywords: 'solar installation rayagada, rooftop solar rayagada',
    summary: 'Helping Rayagada customers embrace renewable energy with quality installations.',
    serviceArea: ['Rayagada', 'Gunupur', 'Paralakhemundi', 'Kalyansinghpur'],
    faqs: [
      { question: 'Can you work with institutional clients?', answer: 'Yes, we support schools, offices, and other institutional projects.' },
    ],
  },
  {
    slug: 'nabarangpur',
    title: 'Solar Company in Nabarangpur',
    description: 'Reliable solar solutions for homes and public infrastructure in Nabarangpur.',
    keywords: 'solar company nabarangpur, solar installation nabarangpur',
    summary: 'Driving clean energy adoption in Nabarangpur with practical solar systems.',
    serviceArea: ['Nabarangpur', 'Umarkote', 'Kodinga', 'Raighar'],
    faqs: [
      { question: 'Can you assist with site assessment?', answer: 'Yes, we begin with a detailed site review and system recommendation.' },
    ],
  },
  {
    slug: 'kalahandi',
    title: 'Solar Installation in Kalahandi',
    description: 'Affordable rooftop solar installation services for homes and establishments in Kalahandi.',
    keywords: 'solar installation kalahandi, rooftop solar kalahandi',
    summary: 'Supporting Kalahandi with solar systems built for local energy needs.',
    serviceArea: ['Kalahandi', 'Bhawanipatna', 'Junagarh', 'Kesinga'],
    faqs: [
      { question: 'Is solar useful in Kalahandi?', answer: 'Yes, solar is a strong fit for reducing electricity dependence and improving power reliability.' },
    ],
  },
  {
    slug: 'bargarh',
    title: 'Solar Company in Bargarh',
    description: 'Trusted solar installations for homes and local businesses in Bargarh district.',
    keywords: 'solar company bargarh, solar installation bargarh',
    summary: 'Helping Bargarh customers achieve efficient solar adoption with dependable support.',
    serviceArea: ['Bargarh', 'Sohela', 'Padmapur', 'Barpali'],
    faqs: [
      { question: 'Do you offer project consultation?', answer: 'Yes, we help clients choose the right system size and technology during consultation.' },
    ],
  },
  {
    slug: 'jharsuguda',
    title: 'Solar Installation in Jharsuguda',
    description: 'Modern solar systems for residences and commercial spaces in Jharsuguda.',
    keywords: 'solar installation jharsuguda, solar company jharsuguda',
    summary: 'Supporting Jharsuguda with efficient solar projects designed for local demand.',
    serviceArea: ['Jharsuguda', 'Brajarajnagar', 'Laikera', 'Belpahar'],
    faqs: [
      { question: 'Can you help with commercial rooftops?', answer: 'Yes, we provide commercial and industrial solar assessments to match the site.' },
    ],
  },
];

export const blogPosts: BlogPostData[] = [
  {
    slug: 'benefits-of-solar-in-odisha',
    title: 'Why Solar Makes Sense in Odisha',
    excerpt: 'Learn how rooftop solar helps homes and businesses in Odisha lower bills and support cleaner energy.',
    category: 'Guide',
    publishedAt: '2026-07-20',
    content: 'Odisha receives strong sunlight for most of the year and many homeowners are now seeing the benefit of solar power for daily consumption.',
    keywords: 'solar odisha, rooftop solar guide, solar benefits odisha',
  },
  {
    slug: 'pm-surya-ghar-for-homeowners',
    title: 'PM Surya Ghar and Solar Subsidy in Odisha',
    excerpt: 'Understand the subsidy pathway and how Air Comfort helps families apply for rooftop solar support.',
    category: 'Subsidy',
    publishedAt: '2026-07-22',
    content: 'The PM Surya Ghar scheme can reduce upfront costs. We help homeowners plan the right system size and documentation.',
    keywords: 'pm surya ghar subsidy odisha, solar subsidy odisha',
  },
  {
    slug: 'net-metering-for-rooftop-solar',
    title: 'Net Metering for Rooftop Solar in Odisha',
    excerpt: 'Find out how net metering allows you to use solar power efficiently and save more every month.',
    category: 'Technical',
    publishedAt: '2026-07-24',
    content: 'Net metering helps customers balance their generation and consumption while simplifying the billing process.',
    keywords: 'net metering odisha, rooftop solar net metering',
  },
];

export function buildCanonical(path: string) {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildBaseSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: businessName,
      url: siteUrl,
      telephone: businessPhone,
      email: businessEmail,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bhubaneswar',
        addressRegion: 'Odisha',
        addressCountry: 'IN',
      },
      areaServed: businessAreas,
      sameAs: [siteUrl],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: businessName,
      url: siteUrl,
      telephone: businessPhone,
      email: businessEmail,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bhubaneswar',
        addressRegion: 'Odisha',
        addressCountry: 'IN',
      },
      areaServed: businessAreas,
      description: 'Air Comfort Solar installs rooftop solar systems across Odisha with support for residential, commercial, and industrial projects.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: businessName,
      url: siteUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];
}

export function buildServiceSchema(service: ServicePageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    provider: {
      '@type': 'Organization',
      name: businessName,
      url: siteUrl,
    },
    areaServed: businessAreas,
    description: service.description,
    url: buildCanonical(`/services/${service.slug}`),
  };
}

export function buildLocationSchema(location: LocationPageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName,
    url: buildCanonical(`/locations/${location.slug}`),
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.title.split('in ')[1] || 'Bhubaneswar',
      addressRegion: 'Odisha',
      addressCountry: 'IN',
    },
    areaServed: location.serviceArea,
    description: location.description,
  };
}

export function buildFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; item: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function buildContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: businessName,
    url: buildCanonical('/contact'),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: businessPhone,
      contactType: 'customer service',
      email: businessEmail,
      areaServed: businessAreas,
    },
  };
}
