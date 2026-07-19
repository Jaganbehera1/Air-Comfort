import Fuse from 'fuse.js';

// ============================================
// FAQ DATA - 60+ Questions with Answers
// ============================================

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
  // ============================================
  // INSTALLATION CATEGORY (8 Questions)
  // ============================================
  {
    id: 'faq_1',
    question: 'How long does solar installation take?',
    answer: 'Most residential installations are completed within 1 to 3 days after site assessment and approval, depending on system size and roof condition. Commercial installations may take 5-7 days. Here\'s the typical timeline:\n\n• Day 1: Site assessment & measurement\n• Day 2: Mounting structure installation\n• Day 3: Panel installation & wiring\n• Day 4: Inverter & electrical connection\n• Day 5: Testing & commissioning',
    category: 'Installation',
    popular: true,
    keywords: ['installation', 'timeline', 'duration', 'site visit', 'time', 'days', 'schedule', 'complete', 'how long'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_2',
    question: 'Is my roof suitable for solar panels?',
    answer: 'Most rooftops can be evaluated for solar. We check the following factors:\n\n✅ Roof area: Minimum 100 sq ft per kW\n✅ Shading: Trees, buildings, or structures blocking sunlight\n✅ Structure strength: Must support panel weight\n✅ Orientation: South-facing is best in India\n✅ Age: Roof should have 10+ years of life left\n\nWe offer a FREE site assessment to determine suitability.',
    category: 'Installation',
    popular: true,
    keywords: ['roof', 'suitability', 'shading', 'orientation', 'south facing', 'structure', 'assessment', 'check', 'suitable'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_3',
    question: 'Can solar panels be installed on all types of roofs?',
    answer: 'Yes, solar panels can be installed on most roof types including:\n\n• Tile Roof: Using specialized hooks and mounts\n• Metal Roof: Clamp-on systems without drilling\n• Concrete/RCC Roof: Ballasted or anchored systems\n• Flat Roof: Tilted mounting structures\n• Asphalt Shingle: Standard rail mounting\n\nOur team uses specialized mounting structures for each roof type to ensure safety and durability.',
    category: 'Installation',
    popular: false,
    keywords: ['roof type', 'tile', 'metal', 'concrete', 'flat', 'RCC', 'mounting', 'installation', 'shingle'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_4',
    question: 'Do solar panels require a lot of maintenance?',
    answer: 'Solar panels require MINIMAL maintenance. Here\'s what\'s recommended:\n\n• Cleaning: 2-4 times per year (remove dust, bird droppings)\n• Visual Inspection: Monthly check for damage\n• Professional Service: Annual maintenance check\n• Monitoring: Real-time performance tracking via app\n\nOur Annual Maintenance Package includes professional cleaning, system inspection, and performance optimization.',
    category: 'Installation',
    popular: false,
    keywords: ['maintenance', 'cleaning', 'dust', 'debris', 'inspection', 'optimization', 'service', 'care'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_5',
    question: 'What happens during the site assessment?',
    answer: 'Our FREE site assessment includes:\n\n1. 📏 Roof measurement & structural check\n2. 🌞 Shading analysis (trees, buildings)\n3. 🔌 Electrical system evaluation\n4. 📋 Consumption pattern review\n5. 📊 Custom system design proposal\n6. 💰 Detailed quotation with savings estimate\n\nDuration: 1-2 hours. You\'ll receive a comprehensive report within 48 hours.',
    category: 'Installation',
    popular: false,
    keywords: ['site assessment', 'survey', 'inspection', 'measurement', 'analysis', 'evaluation'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_6',
    question: 'Will solar panels damage my roof?',
    answer: 'No, when installed professionally, solar panels do NOT damage your roof. Our installation process:\n\n• Uses waterproof mounting systems\n• No unnecessary drilling\n• Proper weight distribution\n• Weatherproof seals on all penetrations\n• 10-year warranty on mounting structures\n\nIn fact, solar panels protect your roof from weather elements and can extend its life.',
    category: 'Installation',
    popular: false,
    keywords: ['damage', 'roof', 'leak', 'drilling', 'mounting', 'waterproof', 'warranty', 'safe'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_7',
    question: 'Can I install solar panels myself?',
    answer: 'While DIY solar installation is possible, we STRONGLY recommend professional installation:\n\n❌ Risks of DIY:\n• Electrical hazards\n• Roof damage\n• Voided warranties\n• Poor performance\n• Safety issues\n\n✅ Benefits of Professional Installation:\n• Certified experts\n• 25-year warranty\n• Optimal performance\n• Safety compliance\n• Government subsidy support\n\nWe handle everything from design to commissioning.',
    category: 'Installation',
    popular: false,
    keywords: ['DIY', 'self', 'professional', 'safety', 'hazard', 'warranty', 'risk', 'installation'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_8',
    question: 'Do solar panels work during monsoon?',
    answer: 'Yes, solar panels work during monsoon, though at reduced efficiency:\n\n• Cloudy days: 30-50% of normal output\n• Light rain: 40-60% of normal output\n• Heavy rain: 20-30% of normal output\n\nModern panels work with diffused sunlight. The system automatically switches to grid power when needed. Panels are also self-cleaning during rain!',
    category: 'Installation',
    popular: false,
    keywords: ['monsoon', 'rain', 'cloudy', 'weather', 'efficiency', 'output', 'diffused', 'grid'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ============================================
  // MAINTENANCE CATEGORY (6 Questions)
  // ============================================
  {
    id: 'faq_9',
    question: 'Do you provide maintenance services after installation?',
    answer: 'Yes! We offer comprehensive maintenance services:\n\n📋 Annual Maintenance Contract (AMC):\n• Professional cleaning (2 times/year)\n• System performance check\n• Inverter & battery inspection\n• Wiring & connections check\n• Software updates\n• Priority support\n\nPrices start from ₹500/month. Call us for customized plans.',
    category: 'Maintenance',
    popular: true,
    keywords: ['maintenance', 'cleaning', 'service', 'support', 'checkup', 'monitoring', 'inspection', 'AMC'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_10',
    question: 'What happens if my solar system stops working?',
    answer: 'If your system stops working, follow these steps:\n\n1. 🔍 Check the inverter display for error codes\n2. 📱 Check monitoring app for alerts\n3. 📞 Contact our 24/7 support team\n4. 🔧 We\'ll diagnose remotely if possible\n5. 👨‍🔧 On-site visit within 24-48 hours if needed\n\nMost issues are resolved quickly. All equipment comes with manufacturer warranty for peace of mind.',
    category: 'Maintenance',
    popular: true,
    keywords: ['breakdown', 'fault', 'repair', 'warranty', 'support', 'issue', 'problem', 'not working', 'failure'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_11',
    question: 'How often should solar panels be cleaned?',
    answer: 'Solar panels should be cleaned every 3-6 months depending on:\n\n• Location: Dusty areas need more frequent cleaning\n• Season: More cleaning needed in summer\n• Surroundings: Trees, birds, pollution\n• Roof type: Flat roofs collect more dust\n\nImpact of dust: Efficiency can drop 15-25% if not cleaned. We offer professional cleaning services with guaranteed results.',
    category: 'Maintenance',
    popular: false,
    keywords: ['clean', 'cleaning', 'dust', 'dirt', 'efficiency', 'pollution', 'service', 'professional'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_12',
    question: 'What is the warranty on installation work?',
    answer: 'We provide comprehensive warranty coverage:\n\n✅ Installation Work: 5-year workmanship warranty\n✅ Mounting Structure: 10-year structural warranty\n✅ Solar Panels: 25-year performance warranty\n✅ Inverter: 5-10 years manufacturer warranty\n✅ Battery: 3-5 years warranty (varies by brand)\n\nExtended warranties are available for purchase. All warranties are backed by our company and brand partners.',
    category: 'Maintenance',
    popular: false,
    keywords: ['warranty', 'guarantee', 'workmanship', 'structural', 'performance', 'extended', 'coverage'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_13',
    question: 'Can I clean solar panels myself?',
    answer: 'Yes, you can clean panels yourself, but follow these guidelines:\n\n✅ DO:\n• Clean early morning or evening (cool panels)\n• Use soft cloth or sponge\n• Use plain water or mild soap\n• Rinse thoroughly\n\n❌ DON\'T:\n• Use high-pressure water\n• Use abrasive materials\n• Clean hot panels (risk of cracks)\n• Walk on panels\n• Use chemicals or detergents\n\nAlternatively, we offer professional cleaning services for best results.',
    category: 'Maintenance',
    popular: false,
    keywords: ['self cleaning', 'DIY cleaning', 'water', 'soap', 'high pressure', 'abrasive', 'professional'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_14',
    question: 'What is included in annual maintenance?',
    answer: 'Our Annual Maintenance Contract (AMC) includes:\n\n1. 🔧 System Health Check: Full diagnostics\n2. 🧹 Panel Cleaning: Professional cleaning service\n3. 🔌 Electrical Inspection: Wiring & connections\n4. 📊 Performance Report: Generation & savings\n5. 🛡️ Priority Support: 24/7 assistance\n6. 💻 Software Updates: Monitoring system\n\nAMC starts at ₹6,000/year. Customized plans available for commercial systems.',
    category: 'Maintenance',
    popular: false,
    keywords: ['AMC', 'annual', 'health check', 'cleaning', 'inspection', 'report', 'support', 'package'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ============================================
  // PROCESS CATEGORY (6 Questions)
  // ============================================
  {
    id: 'faq_15',
    question: 'What documents are needed for a rooftop solar proposal?',
    answer: 'We need the following documents for a complete proposal:\n\n📋 Required Documents:\n1. Property ownership proof (Sale deed, Registry)\n2. Aadhaar Card of the owner\n3. PAN Card of the owner\n4. Last 6 months electricity bills\n5. Roof photos or measurements\n6. Any existing electrical drawings\n\nThese help us design a system that meets your specific needs and ensures compliance with government regulations.',
    category: 'Process',
    popular: true,
    keywords: ['documents', 'proposal', 'electricity bill', 'roof photos', 'measurements', 'ownership', 'address', 'Aadhaar', 'PAN'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_16',
    question: 'Can I get a quotation before booking a site visit?',
    answer: 'Absolutely! We provide a preliminary estimate based on:\n\n📊 What we consider:\n• Your monthly electricity consumption\n• Your rooftop area (approximate)\n• System type preference (On-Grid/Hybrid)\n• Budget range\n\n📝 How it works:\n1. Share your details (phone, email, address)\n2. Share your electricity bill\n3. We provide rough quote within 24 hours\n4. Site visit for accurate quote\n\nIt\'s 100% free and no-obligation. Contact us today!',
    category: 'Process',
    popular: true,
    keywords: ['quotation', 'estimate', 'quote', 'site visit', 'preliminary', 'rough', 'budget', 'cost', 'price', 'free'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_17',
    question: 'What is the process for getting a solar system installed?',
    answer: 'Our complete installation process has 7 steps:\n\n1️⃣ Free Consultation & Site Assessment\n   • Visit your property\n   • Measure & analyze\n\n2️⃣ Custom System Design\n   • Create optimal design\n   • Provide detailed quotation\n\n3️⃣ Approval & Documentation\n   • Get your approval\n   • Complete paperwork\n\n4️⃣ Equipment Procurement\n   • Order high-quality components\n   • Prepare for installation\n\n5️⃣ Professional Installation\n   • Mount panels & equipment (1-3 days)\n   • Connect & configure system\n\n6️⃣ Quality Check & Commissioning\n   • Test entire system\n   • Ensure optimal performance\n\n7️⃣ Ongoing Support & Maintenance\n   • Handover & training\n   • After-sales support\n\nWe guide you through every step with transparency!',
    category: 'Process',
    popular: false,
    keywords: ['process', 'steps', 'procedure', 'consultation', 'design', 'approval', 'installation', 'support', 'commissioning'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_18',
    question: 'Do I need permission from the electricity department?',
    answer: 'Yes, for grid-connected systems, you need approval from your local DISCOM (electricity distribution company). We handle the entire process:\n\n📋 What we do:\n1. Prepare net metering application\n2. Submit to DISCOM\n3. Coordinate inspections\n4. Install bidirectional meter\n5. Final approval & commissioning\n\n⏱️ Timeline: Usually 15-30 days\n💡 We manage all paperwork, so you don\'t have to!',
    category: 'Process',
    popular: false,
    keywords: ['permission', 'electricity department', 'DISCOM', 'grid', 'net metering', 'approval', 'documentation', 'bidirectional'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_19',
    question: 'How long does the subsidy approval take?',
    answer: 'Subsidy approval timeline varies:\n\n⏱️ Typical Timeline:\n• Application submission: Day 1\n• Technical inspection: 7-10 days\n• Installation completion: 15-20 days\n• Final inspection: 20-25 days\n• Subsidy disbursement: 30-60 days\n\nWe help speed up the process by:\n• Complete documentation\n• Regular follow-ups\n• Coordinating with officials\n• Tracking application status\n\nTotal time: 45-90 days from application to disbursement.',
    category: 'Process',
    popular: false,
    keywords: ['subsidy', 'approval', 'timeline', 'application', 'inspection', 'disbursement', 'process', 'time'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_20',
    question: 'Can I upgrade my system later?',
    answer: 'Yes, solar systems are designed to be expandable!\n\n🔄 Upgrade Options:\n• Add more panels (increase capacity)\n• Increase battery storage\n• Upgrade inverter\n• Add monitoring features\n\n📋 Planning Tips:\n• Inform us during initial design\n• Leave space for future panels\n• Choose compatible components\n• Consider future needs\n\nContact us for a free upgrade consultation!',
    category: 'Process',
    popular: false,
    keywords: ['upgrade', 'expand', 'add', 'capacity', 'future', 'planning', 'modular', 'flexible', 'compatible'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ============================================
  // GENERAL CATEGORY (8 Questions)
  // ============================================
  {
    id: 'faq_21',
    question: 'What services do you offer?',
    answer: 'We offer comprehensive solar solutions:\n\n✨ Services:\n• 🔌 Rooftop Solar Installation (Residential & Commercial)\n• 📐 System Design & Engineering\n• 🧹 Annual Maintenance Contracts\n• 💧 Solar Water Pumping\n• 💡 Solar Street Lighting\n• 🔋 Battery Storage Solutions\n• ⚡ Inverter Upgrades\n• 📊 Energy Monitoring Systems\n• 🏛️ Government Subsidy Assistance\n• 🌐 Net Metering Support\n\nWe provide end-to-end solutions from consultation to post-installation support.',
    category: 'General',
    popular: true,
    keywords: ['services', 'installation', 'maintenance', 'design', 'battery', 'inverter', 'subsidy', 'monitoring', 'cleaning', 'pumping'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_22',
    question: 'What is the warranty period for solar panels and equipment?',
    answer: 'We offer comprehensive warranty coverage:\n\n📋 Warranty Details:\n• Solar Panels: 25-year performance warranty\n• Solar Inverters: 5-10 years manufacturer warranty\n• Battery Systems: 3-5 years (varies by brand)\n• Mounting Structures: 10-year structural warranty\n• Installation Work: 5-year workmanship warranty\n\n💰 Extended Warranties:\n• Inverter warranty extension available\n• Battery warranty extension available\n\nAll warranties are backed by leading brands and our company.',
    category: 'General',
    popular: true,
    keywords: ['warranty', 'guarantee', 'panels', 'inverter', 'battery', 'mounting', 'labor', 'extended', 'performance', 'structural'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_23',
    question: 'How much does a solar system cost?',
    answer: 'Solar system costs vary based on several factors:\n\n💰 Typical Costs:\n• 3kW system: ₹1,20,000 - ₹1,80,000\n• 5kW system: ₹2,00,000 - ₹3,50,000\n• 7kW system: ₹2,80,000 - ₹4,90,000\n• 10kW system: ₹4,00,000 - ₹7,00,000\n\n📊 Factors affecting cost:\n• System size (capacity)\n• Panel brand & efficiency\n• Inverter type & brand\n• Battery requirement\n• Installation complexity\n\n💡 Note: Costs vary by location and specific requirements. Contact us for a free quote!',
    category: 'General',
    popular: true,
    keywords: ['cost', 'price', 'budget', 'system size', '3kW', '5kW', '7kW', '10kW', 'lakhs', 'affordable', 'investment'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_24',
    question: 'Is solar energy reliable in rainy or cloudy weather?',
    answer: 'Yes, solar panels work in all weather conditions!\n\n☀️ Sunny: 100% efficiency\n⛅ Cloudy: 30-50% efficiency\n🌧️ Light Rain: 40-60% efficiency\n🌧️ Heavy Rain: 20-30% efficiency\n\nModern panels work with diffused sunlight. During extended rainy periods, your system automatically switches to grid power. For areas with frequent power cuts, we recommend hybrid systems with battery backup.',
    category: 'General',
    popular: false,
    keywords: ['rainy', 'cloudy', 'monsoon', 'weather', 'efficiency', 'diffused', 'backup', 'reliable', 'grid'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_25',
    question: 'What is net metering and how does it work?',
    answer: 'Net metering is a billing mechanism that credits solar energy system owners for the electricity they add to the grid.\n\n⚡ How It Works:\n1. Solar panels generate electricity\n2. Home uses the electricity first\n3. Excess energy goes to the grid\n4. Bi-directional meter measures both import & export\n5. You get credit for exported units\n\n📊 Benefits:\n• Reduce electricity bills by 60-90%\n• Earn credits for excess generation\n• Use credits during non-sunny hours\n• Environmentally friendly\n\nNet metering is available in most Indian states!',
    category: 'General',
    popular: true,
    keywords: ['net metering', 'bi-directional', 'export', 'import', 'credit', 'bill reduction', 'grid', 'sell', 'meter'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_26',
    question: 'Can I run my AC on solar power?',
    answer: 'Yes, solar panels can power AC units! Here\'s what you need:\n\n❄️ AC Power Requirements:\n• 1.5 ton AC: ~1.5 kW per hour\n• Running time: 8-10 hours/day\n• Required system: 3-5 kW system\n\n📋 Recommendations:\n• Choose energy-efficient (5-star) AC\n• Add battery backup for night operation\n• System sizing: Add 30% buffer\n• Consider hybrid system for reliability\n\nContact us for a custom design based on your AC usage!',
    category: 'General',
    popular: false,
    keywords: ['AC', 'air conditioner', 'cooling', 'power', 'load', 'capacity', 'energy efficient', 'inverter'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_27',
    question: 'What is the lifespan of a solar system?',
    answer: 'Solar systems are built for long-term performance:\n\n📅 Component Lifespan:\n• Solar Panels: 25-30 years (80% efficiency after 25 years)\n• Inverters: 10-15 years (may need replacement once)\n• Batteries: 5-10 years (depending on usage)\n• Mounting Structure: 25+ years\n\n💡 Tips for Longer Life:\n• Regular maintenance (AMC recommended)\n• Keep panels clean\n• Monitor performance\n• Professional inspections\n\nWe offer performance guarantees for your peace of mind!',
    category: 'General',
    popular: false,
    keywords: ['lifespan', 'life', 'durability', 'longevity', 'years', 'efficiency', 'degradation', 'replacement'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_28',
    question: 'Do solar panels work at night?',
    answer: 'No, solar panels do NOT generate electricity at night. However, your system continues to power your home through:\n\n🌙 Night Power Options:\n1. Grid Power: Automatically switches to grid\n2. Battery Storage: Uses stored solar energy\n3. Hybrid System: Combines both options\n\n🔋 Battery Storage Benefits:\n• Use solar power at night\n• Backup during power cuts\n• Energy independence\n\nWe recommend hybrid systems for energy independence!',
    category: 'General',
    popular: false,
    keywords: ['night', 'evening', 'dark', 'grid', 'battery', 'storage', 'backup', 'hybrid', 'independent'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ============================================
  // PRODUCTS CATEGORY (6 Questions)
  // ============================================
  {
    id: 'faq_29',
    question: 'Do you provide battery backup solutions?',
    answer: 'Yes! We offer comprehensive battery storage solutions:\n\n🔋 Battery Options:\n• Lithium-ion Batteries (5-15 years life)\n• Lead-acid Batteries (3-5 years life)\n\n📊 Capacity Options:\n• 2.5kWh: 2-4 hours backup\n• 5kWh: 4-8 hours backup\n• 10kWh: 8-16 hours backup\n• 20kWh: 16-24 hours backup\n\n🔧 Features:\n• Automatic switching during power cuts\n• Smart battery management\n• Extended warranty options\n• Compatible with all inverter types',
    category: 'Products',
    popular: true,
    keywords: ['battery', 'backup', 'storage', 'lithium', 'lead acid', 'capacity', 'inverter', 'power cut', 'hybrid', 'hours'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_30',
    question: 'What brands do you use for solar equipment?',
    answer: 'We partner with the best-in-class brands:\n\n☀️ Solar Panels:\n• Tata Power Solar\n• Waaree Energies\n• Adani Solar\n• Vikram Solar\n• RenewSys\n\n⚡ Inverters:\n• SMA (Germany)\n• Huawei\n• Fronius\n• GoodWe\n• Growatt\n• SolarEdge\n\n🔋 Batteries:\n• Luminous\n• Exide\n• Livguard\n• Amaron\n\nAll equipment comes with manufacturer warranty and is tested for Indian conditions!',
    category: 'Products',
    popular: false,
    keywords: ['brands', 'tata', 'waaree', 'adani', 'vikram', 'sma', 'huawei', 'fronius', 'goodwe', 'luminous', 'exide', 'livguard'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_31',
    question: 'What is the difference between on-grid and hybrid systems?',
    answer: 'Here\'s a detailed comparison:\n\n🔌 On-Grid System:\n✅ Lower cost\n✅ Government subsidy available\n✅ Sell excess power to grid\n❌ No power during grid outage\n❌ No battery backup\n\n🔋 Hybrid System:\n✅ Works during power cuts\n✅ Battery backup\n✅ Stores excess solar energy\n✅ Lower electricity bills\n❌ Higher cost\n❌ Battery replacement needed\n\n📌 Recommendation:\n• No power cuts → On-Grid\n• Frequent cuts → Hybrid\n• Need backup → Hybrid\n• Lowest investment → On-Grid',
    category: 'Products',
    popular: true,
    keywords: ['on-grid', 'hybrid', 'difference', 'comparison', 'battery', 'power cut', 'backup', 'grid', 'system', 'cost'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_32',
    question: 'What is the difference between mono and poly solar panels?',
    answer: 'Here\'s the comparison:\n\n⬛ Monocrystalline:\n• Efficiency: 20-24% (Highest)\n• Appearance: Sleek black\n• Space: Less required\n• Cost: Higher\n• Lifespan: 25-30 years\n• Best for: Limited roof space\n\n🔷 Polycrystalline:\n• Efficiency: 15-18% (Good)\n• Appearance: Blue color\n• Space: More required\n• Cost: Lower\n• Lifespan: 20-25 years\n• Best for: Budget-conscious\n\nWe recommend monocrystalline for most installations!',
    category: 'Products',
    popular: false,
    keywords: ['monocrystalline', 'polycrystalline', 'difference', 'comparison', 'efficiency', 'cost', 'appearance', 'lifespan'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_33',
    question: 'What size solar system do I need?',
    answer: 'System size depends on your consumption:\n\n📊 Quick Guide:\n• 1-2 kW: Small homes (2-3 rooms)\n• 3-4 kW: Medium homes (3-4 rooms with AC)\n• 5-7 kW: Large homes (4+ rooms with AC)\n• 10+ kW: Commercial properties\n\n📐 Calculation Method:\n1. Annual consumption (kWh) ÷ 365 = daily usage\n2. Daily usage ÷ 4 = required kW system\n3. Add 20% for future needs\n\nExample: 6000 kWh/year → 4.16 kW → Recommended: 5 kW\n\nContact us for a free sizing consultation!',
    category: 'Products',
    popular: true,
    keywords: ['size', 'capacity', 'kW', 'calculation', 'consumption', 'guide', 'recommendation', 'sizing'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_34',
    question: 'What is a hybrid inverter and why do I need it?',
    answer: 'A hybrid inverter is a versatile device that manages multiple power sources:\n\n⚡ Features:\n• Manages solar power generation\n• Charges & manages batteries\n• Handles grid connection\n• Switches automatically during power cuts\n• Optimizes energy usage\n\n📋 Benefits:\n• Power backup during outages\n• Maximizes solar usage\n• Reduces electricity bills\n• Smart energy management\n\n🔧 Best for: Homes with power cuts or wanting energy independence.',
    category: 'Products',
    popular: false,
    keywords: ['hybrid inverter', 'features', 'benefits', 'backup', 'management', 'optimization', 'smart'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ============================================
  // SUPPORT CATEGORY (5 Questions)
  // ============================================
  {
    id: 'faq_35',
    question: 'Do you provide support after installation?',
    answer: 'Yes! We provide comprehensive post-installation support:\n\n📋 Support Services:\n• 📞 24/7 Technical Support Hotline\n• 🔧 Annual Maintenance Contracts\n• 📊 Performance Monitoring (App/Web)\n• 👨‍🔧 On-site Service Support\n• 🛡️ Warranty Management\n• 📈 System Health Reports (Monthly)\n\n💡 Response Times:\n• Phone: Immediate\n• Remote diagnosis: 2-4 hours\n• On-site visit: 24-48 hours\n\nWe\'re with you for the lifetime of your system!',
    category: 'Support',
    popular: true,
    keywords: ['support', 'after sales', 'service', 'warranty', 'monitoring', 'maintenance', 'help', 'technical', 'hotline'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_36',
    question: 'What happens to my solar system during a power outage?',
    answer: 'Here\'s what happens during a power outage:\n\n🔌 On-Grid System:\n• Automatically shuts down for safety\n• No power during outage\n• Restarts automatically when power returns\n\n🔋 Hybrid System:\n• Switches to battery backup\n• Keeps essential loads running\n• Continuous power supply\n\n⚡ Off-Grid System:\n• Continues working normally\n• Uses battery storage\n• Independent power supply\n\n📌 Recommendation: Hybrid system for areas with frequent power cuts.',
    category: 'Support',
    popular: false,
    keywords: ['power outage', 'power cut', 'blackout', 'backup', 'on-grid', 'hybrid', 'safety', 'automatic', 'shutdown'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_37',
    question: 'How can I monitor my solar system performance?',
    answer: 'We provide multiple monitoring options:\n\n📱 Mobile App:\n• Real-time generation & consumption\n• Daily, monthly, yearly reports\n• System health status\n• Savings tracker\n\n💻 Web Portal:\n• Detailed performance analytics\n• Export/import data\n• Historical trends\n• Custom reporting\n\n📧 Email Reports:\n• Monthly performance summaries\n• Maintenance reminders\n• Savings reports\n\nAll monitoring is FREE with our installation!',
    category: 'Support',
    popular: false,
    keywords: ['monitor', 'app', 'portal', 'performance', 'track', 'savings', 'reports', 'real-time', 'analytics', 'trends'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_38',
    question: 'Do you offer emergency repair services?',
    answer: 'Yes, we offer emergency repair services:\n\n🚨 Emergency Support:\n• 24/7 Helpline: Call us anytime\n• Priority Dispatch: Within 2-4 hours\n• On-site Visit: Same day emergency\n• Quick Diagnosis: Remote first\n\n🛠️ Coverage:\n• Inverter failures\n• Panel damage\n• Electrical faults\n• Battery issues\n\n📞 Emergency Contact: 8260660327\n\nNormal and emergency services available 365 days a year!',
    category: 'Support',
    popular: false,
    keywords: ['emergency', 'repair', 'urgent', 'breakdown', 'fault', 'damage', 'dispatch', 'on-site', 'same day'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_39',
    question: 'What is the process for warranty claims?',
    answer: 'Warranty claim process is simple:\n\n📋 Steps:\n1. Contact our support team\n2. Describe the issue\n3. We diagnose remotely\n4. On-site inspection if needed\n5. Claim submitted to manufacturer\n6. Replacement/repair arranged\n\n⏱️ Timeline:\n• Response: Within 4 hours\n• Diagnosis: 24-48 hours\n• Resolution: 3-7 days\n\n🛡️ Coverage:\n• Panels: 25 years\n• Inverters: 5-10 years\n• Batteries: 3-5 years\n\nWe manage the entire process for you!',
    category: 'Support',
    popular: false,
    keywords: ['warranty', 'claim', 'process', 'replacement', 'repair', 'manufacturer', 'coverage', 'timeline'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ============================================
  // GOVERNMENT CATEGORY (6 Questions)
  // ============================================
  {
    id: 'faq_40',
    question: 'What government subsidies are available for solar?',
    answer: 'Government subsidies for solar installation:\n\n🏛️ Central Government:\n• PM Surya Ghar Yojana: 30-40% subsidy\n• Up to 10kW capacity\n• Direct benefit transfer\n\n🏢 State Government (Odisha):\n• Additional 20-30% subsidy\n• State-specific schemes\n• Priority for rural areas\n\n📊 Total Subsidy:\n• 3kW system: ~₹70,000\n• 5kW system: ~₹1,10,000\n• 7kW system: ~₹1,50,000\n\n💡 We handle the complete subsidy application process for you!',
    category: 'Government',
    popular: true,
    keywords: ['subsidy', 'government', 'PM Surya Ghar', 'central', 'state', 'Odisha', '30%', '40%', 'scheme', 'benefit'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_41',
    question: 'How do I apply for solar subsidy?',
    answer: 'We handle the entire subsidy application process!\n\n📋 Steps we follow:\n1. System Design & Approval\n   • Design compliant system\n   • Get technical approval\n\n2. Application Submission\n   • Submit to DISCOM\n   • Complete documentation\n\n3. Technical Inspection\n   • Site inspection\n   • System verification\n\n4. Installation & Commissioning\n   • Professional installation\n   • Quality check\n\n5. Final Approval & Disbursement\n   • Final inspection\n   • Subsidy transfer\n\n⏱️ Timeline: 45-90 days total\n💡 We handle all paperwork and follow-ups!',
    category: 'Government',
    popular: false,
    keywords: ['apply', 'application', 'process', 'subsidy', 'DISCOM', 'approval', 'commissioning', 'documentation', 'inspection'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_42',
    question: 'Who is eligible for solar subsidy?',
    answer: 'Subsidy eligibility criteria:\n\n✅ Who can apply:\n• Indian citizens\n• Residential property owners\n• Valid electricity connection\n• PAN Card & Aadhaar Card\n• Systems up to 10kW\n• Non-commercial property\n\n❌ Not eligible:\n• Commercial/industrial setups\n• Rented properties\n• Agricultural land (different scheme)\n• Systems over 10kW\n\n📌 Note: Conditions vary by state. Contact us for detailed eligibility check!',
    category: 'Government',
    popular: false,
    keywords: ['eligible', 'who', 'qualify', 'residential', 'owner', 'property', 'Aadhaar', 'PAN', 'conditions'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_43',
    question: 'Is GST applicable on solar systems?',
    answer: 'GST rates for solar systems:\n\n📊 GST Structure:\n• Solar Panels: 5% GST\n• Inverters: 5% GST\n• Batteries: 5% GST\n• Installation Services: 5% GST\n• Complete System: 5% (composite supply)\n\n💡 Benefits:\n• Reduced tax burden\n• Input tax credit available\n• Same rate for all components\n• Simplified compliance\n\nAll our quotations include GST for complete transparency!',
    category: 'Government',
    popular: false,
    keywords: ['GST', 'tax', 'rates', 'panels', 'inverter', 'battery', 'installation', 'composite', 'input credit'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_44',
    question: 'What is the PM Surya Ghar Yojana?',
    answer: 'PM Surya Ghar Yojana is a government scheme to promote solar energy:\n\n🌞 Scheme Highlights:\n• Launched by: Government of India\n• Target: 10 million homes\n• Subsidy: 30-40% of system cost\n• Capacity: Up to 10kW\n\n📋 Benefits:\n• Reduced electricity bills\n• Low-interest loans\n• Quality equipment guarantee\n• Technical support\n\n💡 Who should apply:\n• All residential consumers\n• Budget-conscious homeowners\n• Environment-conscious families\n\nContact us for scheme details and application support!',
    category: 'Government',
    popular: true,
    keywords: ['PM Surya Ghar', 'scheme', 'government', 'target', 'subsidy', 'benefits', 'apply', 'loans'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_45',
    question: 'Do government schemes apply to commercial properties?',
    answer: 'Government solar schemes for commercial properties:\n\n🏢 Commercial Schemes:\n• Accelerated Depreciation: 40% depreciation\n• Capital Subsidy: Limited programs\n• Net Metering: Available\n• Tax Benefits: Various\n\n📊 Differences from Residential:\n• Lower subsidy percentage\n• Higher capacity allowed\n• Different documentation\n• Business tax implications\n\n📌 Recommendation:\n• Consult our team for commercial options\n• We design cost-effective solutions\n• ROI analysis provided\n\nContact us for commercial solar consultation!',
    category: 'Government',
    popular: false,
    keywords: ['commercial', 'business', 'scheme', 'depreciation', 'tax', 'ROI', 'subsidy', 'net metering'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // ============================================
  // EXTRA - CONTACT & OTHER (5 Questions)
  // ============================================
  {
    id: 'faq_46',
    question: 'What are your business hours?',
    answer: 'Our business hours:\n\n🕐 Working Hours:\n• Monday - Saturday: 8:00 AM - 8:00 PM\n• Sunday: 8:00 AM - 2:00 PM\n• Emergency Support: 24/7\n\n📞 Contact:\n• Phone: 8260660327\n• WhatsApp: 8260660327\n• Email: info@greenleafenergy.com\n\nWe respond to all queries within 24 hours!',
    category: 'Contact',
    popular: true,
    keywords: ['hours', 'timing', 'working', 'open', 'closed', 'emergency', 'contact', 'phone', 'email'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_47',
    question: 'How do I contact customer support?',
    answer: 'You can reach our customer support team through:\n\n📞 Phone: 8260660327\n💬 WhatsApp: 8260660327\n✉️ Email: info@greenleafenergy.com\n\n🕐 Support Hours:\n• Chat: 24/7\n• Phone: 8:00 AM - 8:00 PM\n• Email: Response within 4 hours\n• Emergency: 24/7\n\n📱 Live Chat: Available on our website\n📍 Visit: Sahajpur, Pipili, Puri, Odisha\n\nWe\'re here to help!',
    category: 'Contact',
    popular: true,
    keywords: ['contact', 'support', 'phone', 'email', 'whatsapp', 'chat', 'visit', 'address', 'helpline'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_48',
    question: 'What is your address?',
    answer: '📍 Visit us at:\n\nAir Comfort\nSahajpur, Pipili\nPuri, Odisha\nIndia\n\n📞 Phone: 8260660327\n✉️ Email: info@greenleafenergy.com\n\n🕐 Visiting Hours:\n• Monday-Saturday: 8:00 AM - 8:00 PM\n• Sunday: 8:00 AM - 2:00 PM\n\nWe recommend calling before visiting!',
    category: 'Contact',
    popular: false,
    keywords: ['address', 'location', 'visit', 'office', 'Odisha', 'Pipili', 'Puri', 'Sahajpur'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_49',
    question: 'Do you provide services in my area?',
    answer: 'We serve customers across multiple areas:\n\n📍 Service Areas:\n• Pipili & Surrounding areas\n• Puri District\n• Bhubaneswar & Cuttack\n• Khordha District\n• Other parts of Odisha\n\n📞 New Areas:\n• We\'re expanding to new areas\n• Call us to check availability\n• Free site assessment available\n\nContact us to confirm service availability in your area!',
    category: 'General',
    popular: false,
    keywords: ['area', 'service', 'Pipili', 'Puri', 'Bhubaneswar', 'Cuttack', 'Khordha', 'Odisha', 'location'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'faq_50',
    question: 'What is the return on investment for solar?',
    answer: 'Solar ROI is excellent for most homeowners:\n\n📊 ROI Breakdown:\n• Payback Period: 4-7 years\n• System Lifespan: 25-30 years\n• Total Return: 300-400% over lifetime\n• Annual Savings: ₹20,000-₹50,000\n\n💰 Savings Example:\n• System Cost: ₹2,50,000\n• Annual Savings: ₹35,000\n• Payback: 7 years\n• Total Savings: ₹7,00,000+ (25 years)\n\n💡 Factors Affecting ROI:\n• Electricity costs (rising yearly)\n• Government subsidies\n• System size & efficiency\n• Usage patterns',
    category: 'General',
    popular: false,
    keywords: ['ROI', 'return', 'investment', 'payback', 'savings', 'profit', 'benefit', 'years'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// ============================================
// DATA MANAGEMENT FUNCTIONS
// ============================================

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

export function getCategories(): string[] {
  const items = readAll();
  const categories = new Set(items.map(item => item.category));
  return ['All', ...Array.from(categories)];
}

export function getPopularFaqs(): FAQItem[] {
  return readAll().filter(item => item.popular).slice(0, 10);
}

export function searchFaqs(query: string): FAQItem[] {
  const items = readAll();
  if (!query.trim()) return items;
  
  const term = query.toLowerCase().trim();
  return items.filter(faq => 
    faq.question.toLowerCase().includes(term) ||
    faq.answer.toLowerCase().includes(term) ||
    faq.keywords?.some(k => k.toLowerCase().includes(term)) ||
    faq.category.toLowerCase().includes(term)
  );
}

export function getFaqsByCategory(category: string): FAQItem[] {
  const items = readAll();
  if (category === 'All') return items;
  return items.filter(item => item.category === category);
}

// ============================================
// FUSE.JS SEARCH FUNCTION
// ============================================

export interface FaqMatch {
  faq?: FAQItem;
  score?: number;
  answer: string;
  found: boolean;
  category?: string;
}

const DEFAULT_ACCEPT_SCORE = 0.45;

const fuseOptions = {
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

  // Quick contact detection
  if (/(call|phone|contact|mobile|number|reach|whatsapp|talk|speak|connect|help)/i.test(q)) {
    return { 
      found: true, 
      answer: '📞 You can reach our team at:\n• Phone: 8260660327\n• WhatsApp: 8260660327\n• Email: info@greenleafenergy.com\n• Working Hours: 8:00 AM - 8:00 PM (Mon-Sat)\n\nWe\'re here to help!', 
      score: 0,
      category: 'Contact'
    };
  }

  // Quick price/cost detection
  if (/(price|cost|budget|estimate|quote|₹|rupees|lakh|thousand|money)/i.test(q)) {
    const items = readAll();
    const priceFaq = items.find(item => 
      item.question.toLowerCase().includes('cost') || 
      item.question.toLowerCase().includes('price') ||
      item.keywords?.some(k => k.includes('cost') || k.includes('price'))
    );
    if (priceFaq) {
      return { found: true, faq: priceFaq, answer: priceFaq.answer, score: 0.1, category: priceFaq.category };
    }
  }

  // Quick warranty detection
  if (/(warranty|guarantee|service|repair|replacement|cover)/i.test(q)) {
    const items = readAll();
    const warrantyFaq = items.find(item => 
      item.question.toLowerCase().includes('warranty') || 
      item.keywords?.some(k => k.includes('warranty'))
    );
    if (warrantyFaq) {
      return { found: true, faq: warrantyFaq, answer: warrantyFaq.answer, score: 0.1, category: warrantyFaq.category };
    }
  }

  const items = readAll();
  const fuse = new Fuse(items, fuseOptions);
  const results = fuse.search(q);

  if (!results || results.length === 0) {
    return { 
      found: false, 
      answer: "I couldn't find a specific answer to your question. Please try rephrasing or contact our support team at 8260660327 for assistance." 
    };
  }

  const topResults = results.slice(0, 3);
  const best = topResults[0];
  const score = typeof best.score === 'number' ? best.score : 1;

  if (score <= acceptScore) {
    return { 
      found: true, 
      faq: best.item, 
      score, 
      answer: best.item.answer,
      category: best.item.category
    };
  }

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