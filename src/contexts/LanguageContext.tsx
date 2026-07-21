import React, { createContext, useContext, useEffect, useState } from 'react';

type Lang = 'en' | 'od';

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_services: 'Services',
    nav_projects: 'Projects',
    nav_contact: 'Contact',
    language_od: 'Odia',
    language_en: 'English',
    language_short_od: 'OD',
    language_short_en: 'EN',
    nav_powering_tomorrow: 'Powering Tomorrow',
    nav_quotation: 'Quotation',

    // Hero Section
    hero_line1: 'Solar Energy',
    hero_line2: 'for Every Home',
    hero_bullet_1: 'Save up to 90% on electricity bills',
    hero_bullet_2: 'Clean, renewable, pollution-free',
    hero_bullet_3: 'Government subsidy available',
    book_consult: 'Book Consultation',
    view_projects: 'View Projects',
    
    // Residential Section
    residential_title: 'Residential Solar Installation',
    residential_desc: 'High-efficiency panels and professional installation tailored to your home.',
    book_free_consultation: 'Book a Free Consultation',
    view_our_projects: 'View Our Projects',
    
    // What is Solar Energy
    what_is_solar: 'What is Solar Energy?',
    what_is_solar_desc: 'Solar energy is electricity generated from sunlight. It is clean, renewable, pollution-free, and helps reduce electricity bills while offering a long-term investment.',
    solar_is_electricity: 'Solar energy is electricity generated from sunlight.',
    it_is_clean: 'It is clean, renewable, and pollution-free.',
    helps_reduce_bills: 'It helps reduce electricity bills.',
    long_term_investment: 'It is a long-term investment for your home or business.',
    
    // Why Choose Solar
    why_choose_solar: 'Why Choose Solar?',
    why_choose_solar_desc: 'Solar energy delivers savings, sustainability, and long-term value.',
    save_electricity_bills: 'Save Electricity Bills',
    eco_friendly: 'Eco Friendly',
    renewable_energy: 'Renewable Energy',
    low_maintenance: 'Low Maintenance',
    suitable_homes_businesses: 'Suitable for Homes & Businesses',
    increases_property_value: 'Increases Property Value',
    
    // Types of Solar Panels
    types_of_solar_panels: 'Types of Solar Panels',
    types_of_solar_panels_desc: 'Choose the right solar panel technology for your needs.',
    monocrystalline: 'Monocrystalline',
    monocrystalline_desc: 'Highest efficiency, sleek black appearance, space-efficient.',
    polycrystalline: 'Polycrystalline',
    polycrystalline_desc: 'Cost-effective, blue color, good efficiency for homes.',
    thin_film: 'Thin Film',
    thin_film_desc: 'Flexible, lightweight, good for curved surfaces.',
    bifacial: 'Bifacial',
    bifacial_desc: 'Generates from both sides, higher output, modern design.',
    
    // Types of Inverters
    types_of_inverters: 'Types of Inverters',
    types_of_inverters_desc: 'Different inverter technologies for different solar needs.',
    string_inverter: 'String Inverter',
    string_inverter_desc: 'Most common, cost-effective, works well for standard installations.',
    micro_inverter: 'Micro Inverter',
    micro_inverter_desc: 'Per-panel optimization, ideal for complex roofs, higher efficiency.',
    hybrid_inverter: 'Hybrid Inverter',
    hybrid_inverter_desc: 'Works with batteries, grid, and solar. Best for power backup.',
    central_inverter: 'Central Inverter',
    central_inverter_desc: 'For large commercial systems, high power output, industrial use.',
    
    // Types of Rooftop Solar Systems
    types_of_rooftop_solar: 'Types of Rooftop Solar Systems',
    types_of_rooftop_solar_desc: 'Choose the right rooftop solar system for your home or business.',
    on_grid_system: 'On-Grid System',
    on_grid_system_desc: 'Connected to utility grid, low cost, no battery needed. Best for areas with stable grid.',
    off_grid_system: 'Off-Grid System',
    off_grid_system_desc: 'Independent system with batteries, works without grid. Best for remote areas.',
    hybrid_system: 'Hybrid System',
    hybrid_system_desc: 'Combines on-grid & off-grid features, battery backup, grid connectivity. Best for power cuts.',
    
    // On-Grid vs Hybrid
    on_grid_vs_hybrid: 'On-Grid vs Hybrid System',
    on_grid_vs_hybrid_desc: 'Understand the difference and choose the right system for your needs.',
    on_grid_solar_system: 'On-Grid Solar System',
    how_it_works: 'How it works',
    solar_panels: 'Solar Panels',
    solar_inverter: 'Solar Inverter',
    home: 'Home',
    net_meter: 'Net Meter',
    electric_grid: 'Electric Grid',
    hybrid_solar_system: 'Hybrid Solar System',
    hybrid_inverter_label: 'Hybrid Inverter',
    battery: 'Battery',
    grid: 'Grid',
    lowest_cost: 'Lowest cost',
    government_subsidy_available: 'Government subsidy available',
    reduce_electricity_bill: 'Reduce electricity bill',
    sell_extra_electricity: 'Sell extra electricity to the grid',
    doesnt_work_power_cuts: "Doesn't work during power cuts",
    works_during_power_cuts: 'Works during power cuts',
    battery_backup: 'Battery backup',
    lower_electricity_bill: 'Lower electricity bill',
    stores_solar_energy: 'Stores solar energy',
    higher_cost: 'Higher cost',
    battery_replacement: 'Battery replacement after several years',
    which_one_should_i_choose: 'Which One Should I Choose?',
    no_power_cuts: 'No power cuts',
    frequent_power_cuts: 'Frequent power cuts',
    want_lowest_investment: 'Want lowest investment',
    need_backup: 'Need backup',
    
    // Solar System Components
    solar_system_components: 'Solar System Components',
    solar_system_components_desc: 'The essential parts that make a solar system work efficiently.',
    solar_panels_comp: 'Solar Panels',
    solar_panels_comp_desc: 'Convert sunlight into electricity using photovoltaic cells.',
    solar_inverter_comp: 'Solar Inverter',
    solar_inverter_comp_desc: 'Turns DC power from panels into AC power for your home.',
    hybrid_inverter_comp: 'Hybrid Inverter',
    hybrid_inverter_comp_desc: 'Manages solar power, battery storage, and grid input seamlessly.',
    battery_comp: 'Battery',
    battery_comp_desc: 'Stores energy so your home can run during power cuts.',
    net_meter_comp: 'Net Meter',
    net_meter_comp_desc: 'Measures electricity exported to and imported from the grid.',
    mounting_structure: 'Mounting Structure',
    mounting_structure_desc: 'Supports solar panels securely on the roof.',
    dc_cable: 'DC Cable',
    dc_cable_desc: 'Carries direct current from panels to the inverter.',
    acdb_dcdb: 'ACDB/DCDB',
    acdb_dcdb_desc: 'Distributes AC and DC power safely throughout the system.',
    earthing: 'Earthing',
    earthing_desc: 'Protects the system and your home from electrical faults.',
    lightning_arrester: 'Lightning Arrester',
    lightning_arrester_desc: 'Guards the system against lightning and surges.',
    
    // Why Replace Coal
    why_replace_coal: 'Why Replace Coal Electricity?',
    why_replace_coal_desc: 'Solar energy is a cleaner, more sustainable alternative to coal-generated power.',
    coal: 'Coal',
    solar: 'Solar',
    pollution: 'Pollution',
    clean: 'Clean',
    limited_resource: 'Limited Resource',
    unlimited: 'Unlimited',
    cost_increasing: 'Cost Increasing',
    cost_reducing: 'Cost Reducing',
    environmental_damage: 'Environmental Damage',
    eco_friendly_label: 'Eco Friendly',
    
    // Applications
    applications_of_solar: 'Applications of Solar',
    applications_of_solar_desc: 'Solar energy can power a wide range of homes, businesses and public services.',
    home_rooftop: 'Home Rooftop',
    water_pump: 'Water Pump',
    street_lights: 'Street Lights',
    water_heater: 'Water Heater',
    solar_cooking: 'Solar Cooking',
    industries: 'Industries',
    commercial_buildings: 'Commercial Buildings',
    
    // Government Subsidy
    government_subsidy: 'Government Subsidy',
    government_subsidy_desc: 'Government subsidies can reduce the cost of solar installations, and the program details may change over time.',
    central_government_subsidy: 'Central Government subsidy',
    central_government_subsidy_desc: 'Support from the central government for approved solar systems.',
    state_government_subsidy: 'State Government subsidy',
    state_government_subsidy_desc: 'Additional state-level incentives and rebates.',
    loan_facility: 'Loan facility',
    loan_facility_desc: 'Easy financing options to make your solar investment affordable.',
    insurance: 'Insurance',
    insurance_desc: 'Optional coverage for equipment and installation.',
    net_meter_subsidy: 'Net Meter',
    net_meter_subsidy_desc: 'Net metering lets you sell excess solar power back to the grid.',
    installation_timeline: 'Installation timeline',
    installation_timeline_desc: 'Fast execution with professional workmanship and timely delivery.',
    
    // Required Documents
    required_documents: 'Required Documents',
    required_documents_desc: 'Keep these documents ready when you book your solar site visit.',
    aadhaar_card: 'Aadhaar Card',
    pan_card: 'PAN Card',
    electricity_bill: 'Electricity Bill',
    bank_passbook: 'Bank Passbook',
    mobile_number: 'Mobile Number',
    
    // Solar Cost Calculator
    solar_cost_calculator: 'Solar Cost Calculator',
    solar_cost_calculator_desc: 'Enter your annual electricity consumption to get a personalized solar estimate.',
    annual_consumption: 'Annual electricity consumption (kWh)',
    monthly_electricity_bill: 'Monthly electricity bill (₹)',
    house_location: 'House location',
    roof_type: 'Roof type',
    tile_roof: 'Tile Roof',
    metal_roof: 'Metal Roof',
    concrete_roof: 'Concrete Roof',
    flat_roof: 'Flat Roof',
    calculate_estimate: 'Calculate Estimate',
    your_solar_estimate: 'Your Solar Estimate',
    recommended_system_size: 'Recommended system size',
    approximate_installation_cost: 'Approximate installation cost',
    estimated_subsidy: 'Estimated subsidy',
    expected_monthly_savings: 'Expected monthly savings',
    payback_period: 'Payback period',
    get_personalized_quote: 'Get a personalized quote from our experts!',
    enter_your_details: 'Enter your details',
    fill_form_click_calculate: 'Fill in the form and click "Calculate Estimate" to see your personalized solar savings.',
    
    // What We Offer
    what_we_offer: 'What We Offer',
    what_we_offer_desc: 'End-to-end solar services for residential & commercial needs',
    annual_maintenance: 'Annual Maintenance',
    solar_upgradation: 'Solar Upgradation',
    solar_panel_cleaning: 'Solar Panel Cleaning',
    battery_maintenance: 'Battery Maintenance',
    inverter_upgrade: 'Inverter Upgrade',
    installation_service: 'Installation',
    solar_irrigation_pumping: 'Solar Irrigation Pumping',
    solar_street_lighting: 'Solar Street Lighting',
    
    // How We Work
    how_we_work: 'How We Work',
    contact_us_step: 'Contact Us',
    contact_us_step_desc: 'Easily reach out to our support team to inquire about our range of solar products.',
    estimation_step: 'Estimation',
    estimation_step_desc: 'Receive a comprehensive solar installation quote tailored to your needs.',
    execution_step: 'Execution',
    execution_step_desc: 'Ensuring perfect implementation of your solar system.',
    maintenance_step: 'Maintenance',
    maintenance_step_desc: 'Reliable maintenance services to keep your system running smoothly.',
    
    // Affiliations
    our_affiliations: 'Our Affiliations',
    we_are_tpcodl: 'We are TPCODL empanelled vendor!',
    
    // CTA
    ready_to_go_solar: 'Ready to Go Solar?',
    join_thousands: 'Join thousands of homeowners switching to affordable solar energy.',
    installations: 'Installations',
    years_warranty: 'Years Warranty',
    savings: 'Savings',
    get_started_today: 'Get Started Today',
    contact_us_free_consultation: 'Contact us for a free consultation and custom quote.',
    contact_us_now: 'Contact Us Now',
    
    // FAQ
    faq_title: 'Frequently Asked Questions',
    faq_desc: 'Answers to the most common solar questions from our customers.',
    faq_on_grid: 'What is On-Grid Solar?',
    faq_on_grid_ans: 'A system connected to the grid that exports excess power and reduces your electricity bill.',
    faq_hybrid: 'What is Hybrid Solar?',
    faq_hybrid_ans: 'A system with battery backup that works during power cuts and stores solar energy.',
    faq_better: 'Which is better?',
    faq_better_ans: 'On-grid is best for lowest cost, while hybrid is best if you need backup during outages.',
    faq_rainy: 'Does solar work in rainy weather?',
    faq_rainy_ans: 'Yes, solar panels still generate electricity on cloudy days, though output is lower.',
    faq_lifespan: 'How many years do panels last?',
    faq_lifespan_ans: 'Solar panels typically last 20-25 years with proper maintenance.',
    faq_subsidy: 'How much subsidy is available?',
    faq_subsidy_ans: 'Subsidy varies by state and system type; contact us for the latest government support.',
    faq_ac: 'Can I run AC on solar?',
    faq_ac_ans: 'Yes, a properly sized system with battery backup can run AC and other appliances.',
    faq_power_cut: 'What happens during a power cut?',
    faq_power_cut_ans: 'On-grid systems stop during cuts; hybrid systems continue using stored battery energy.',
    faq_maintenance: 'Is maintenance expensive?',
    faq_maintenance_ans: 'Maintenance is usually low-cost and includes cleaning and annual inspections.',
  },
  od: {
    // Navigation
    nav_home: 'ମୂଳପୃଷ୍ଠା',
    nav_about: 'ଆମ ବିଷୟରେ',
    nav_services: 'ସେବାସମୂହ',
    nav_projects: 'ପ୍ରକଳ୍ପ',
    nav_contact: 'ଯୋଗାଯୋଗ',
    language_od: 'ଓଡ଼ିଆ',
    language_en: 'ଇଂରାଜୀ',
    language_short_od: 'ଓଡ଼ିଆ',
    language_short_en: 'EN',
    nav_powering_tomorrow: 'ଆସନ୍ତାକାଲିକୁ ଶକ୍ତି ଦେଉଛୁ',
nav_quotation: 'କୋଟ୍',

    // Hero Section
    hero_line1: 'ସୌର ଶକ୍ତି',
    hero_line2: 'ପ୍ରତ୍ୟେକ ଘର ପାଇଁ',
    hero_bullet_1: 'ବିଦ୍ୟୁତ୍ ବିଲରେ ୯୦% ପର୍୍ୟନ୍ਤ ସଞ୍ଚୟ କରନ୍ਤୁ',
    hero_bullet_2: 'ପରିଷ୍କାର, ନବୀକରଣୀୟ, ପ୍ରଦୂଷଣ ମୁକ୍ତ',
    hero_bullet_3: 'ସରକାରୀ ସବସିଡି ଉପଲବ୍ଧ',
    book_consult: 'ପରାମର୍ଶ ବୁକ୍ କରନ୍ତୁ',
    view_projects: 'ପ୍ରୋଜେକ୍ଟ ଦେଖନ୍ତୁ',
    
    // Residential Section
    residential_title: 'ଆବାସିକ ସୋଲାର ସ୍ଥାପନ',
    residential_desc: 'ଉଚ୍ଚ-କ୍ଷମତା ପ୍ୟାନେଲ ଏବଂ ଆପଣଙ୍କ ଘର ପାଇଁ ପେସାଦାର ସ୍ଥାପନ।',
    book_free_consultation: 'ମାଗଣା ପରାମର୍ଶ ବୁକ୍ କରନ୍ତୁ',
    view_our_projects: 'ଆମର ପ୍ରୋଜେକ୍ଟ ଦେଖନ୍ତୁ',
    
    // What is Solar Energy
    what_is_solar: 'ସୌର ଶକ୍ତି କ\'ଣ?',
    what_is_solar_desc: 'ସୌର ଶକ୍ତି ହେଉଛି ସୂର୍ଯ୍ୟ କିରଣରୁ ଉତ୍ପନ୍ନ ବିଦ୍ୟୁତ୍। ଏହା ପରିଷ୍କାର, ନବୀକରଣୀୟ, ପ୍ରଦୂଷଣ ମୁକ୍ତ, ଏବଂ ବିଦ୍ୟୁତ୍ ବିଲ ହ୍ରାସ କରିବାରେ ସାହାଯ୍ୟ କରେ ଏବଂ ଦୀର୍ଘମିଆଦୀ ନିବେଶ ପ୍ରଦାନ କରେ।',
    solar_is_electricity: 'ସୌର ଶକ୍ତି ହେଉଛି ସୂର୍ଯ୍ୟ କିରଣରୁ ଉତ୍ପନ୍ନ ବିଦ୍ୟୁତ୍।',
    it_is_clean: 'ଏହା ପରିଷ୍କାର, ନବୀକରଣୀୟ, ଏବଂ ପ୍ରଦୂଷଣ ମୁକ୍ତ।',
    helps_reduce_bills: 'ଏହା ବିଦ୍ୟୁତ୍ ବିଲ ହ୍ରାସ କରିବାରେ ସାହାଯ୍ୟ କରେ।',
    long_term_investment: 'ଏହା ଆପଣଙ୍କ ଘର କିମ୍ବା ବ୍ୟବସାୟ ପାଇଁ ଏକ ଦୀର୍ଘମିଆଦୀ ନିବେଶ।',
    
    // Why Choose Solar
    why_choose_solar: 'କାହିଁକି ସୋଲାର ବାଛିବେ?',
    why_choose_solar_desc: 'ସୌର ଶକ୍ତି ସଞ୍ଚୟ, ସ୍ଥିରତା ଏବଂ ଦୀର୍ଘମିଆଦୀ ମୂଲ୍ୟ ପ୍ରଦାନ କରେ।',
    save_electricity_bills: 'ବିଦ୍ୟୁତ୍ ବିଲରେ ସଞ୍ଚୟ',
    eco_friendly: 'ପରିବେଶ ଅନୁକୂଳ',
    renewable_energy: 'ନବୀକରଣୀୟ ଶକ୍ତି',
    low_maintenance: 'କମ୍ ରକ୍ଷଣାବେକ୍ଷଣ',
    suitable_homes_businesses: 'ଘର ଓ ବ୍ୟବସାୟ ପାଇଁ ଉପଯୋଗୀ',
    increases_property_value: 'ସମ୍ପତ୍ତିର ମୂଲ୍ୟ ବୃଦ୍ଧି କରେ',
    
    // Types of Solar Panels
    types_of_solar_panels: 'ସୋଲାର ପ୍ୟାନେଲ ପ୍ରକାର',
    types_of_solar_panels_desc: 'ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ସଠିକ୍ ସୋଲାର ପ୍ୟାନେଲ ଟେକ୍ନୋଲୋଜି ବାଛନ୍ତୁ।',
    monocrystalline: 'ମୋନୋକ୍ରିଷ୍ଟାଲାଇନ',
    monocrystalline_desc: 'ସର୍ବୋଚ୍ଚ ଦକ୍ଷତା, ଚିକ୍କଣ କଳା ରୂପ, ସ୍ଥାନ-ଦକ୍ଷ।',
    polycrystalline: 'ପଲିକ୍ରିଷ୍ଟାଲାଇନ',
    polycrystalline_desc: 'ଖର୍ଚ୍ଚ-ପ୍ରଭାବଶାଳୀ, ନୀଳ ରଙ୍ଗ, ଘର ପାଇଁ ଭଲ ଦକ୍ଷତା।',
    thin_film: 'ଥିନ୍ ଫିଲ୍ମ',
    thin_film_desc: 'ନମନୀୟ, ହାଲୁକା, ବଙ୍କା ପୃଷ୍ଠ ପାଇଁ ଭଲ।',
    bifacial: 'ବାଇଫେସିଆଲ',
    bifacial_desc: 'ଉଭୟ ପାର୍ଶ୍ୱରୁ ଉତ୍ପନ୍ନ କରେ, ଅଧିକ ଉତ୍ପାଦନ, ଆଧୁନିକ ଡିଜାଇନ।',
    
    // Types of Inverters
    types_of_inverters: 'ଇନଭର୍ଟର ପ୍ରକାର',
    types_of_inverters_desc: 'ବିଭିନ୍ନ ସୌର ଆବଶ୍ୟକତା ପାଇଁ ଭିନ୍ନ ଇନଭର୍ଟର ଟେକ୍ନୋଲୋଜି।',
    string_inverter: 'ଷ୍ଟ୍ରିଙ୍ଗ୍ ଇନଭର୍ଟର',
    string_inverter_desc: 'ସବୁଠାରୁ ସାଧାରଣ, ଖର୍ଚ୍ଚ-ପ୍ରଭାବଶାଳୀ, ମାନକ ସ୍ଥାପନ ପାଇଁ ଭଲ କାମ କରେ।',
    micro_inverter: 'ମାଇକ୍ରୋ ଇନଭର୍ଟର',
    micro_inverter_desc: 'ପ୍ରତି ପ୍ୟାନେଲ ଅପ୍ଟିମାଇଜେସନ, ଜଟିଳ ଛାତ ପାଇଁ ଆଦର୍ଶ, ଉଚ୍ଚ ଦକ୍ଷତା।',
    hybrid_inverter: 'ହାଇବ୍ରିଡ୍ ଇନଭର୍ଟର',
    hybrid_inverter_desc: 'ବ୍ୟାଟେରୀ, ଗ୍ରିଡ୍ ଏବଂ ସୋଲାର ସହିତ କାମ କରେ। ପାୱାର ବ୍ୟାକଅପ ପାଇଁ ସର୍ବୋତ୍ତମ।',
    central_inverter: 'ସେନ୍ଟ୍ରାଲ୍ ଇନଭର୍ଟର',
    central_inverter_desc: 'ବଡ଼ ବ୍ୟବସାୟିକ ସିଷ୍ଟମ ପାଇଁ, ଉଚ୍ଚ ପାୱାର ଆଉଟପୁଟ, ଔଦ୍ୟୋଗିକ ବ୍ୟବହାର।',
    
    // Types of Rooftop Solar Systems
    types_of_rooftop_solar: 'ଛାତ ସୋଲାର ସିଷ୍ଟମ ପ୍ରକାର',
    types_of_rooftop_solar_desc: 'ଆପଣଙ୍କ ଘର କିମ୍ବା ବ୍ୟବସାୟ ପାଇଁ ସଠିକ୍ ଛାତ ସୋଲାର ସିଷ୍ଟମ ବାଛନ୍ତୁ।',
    on_grid_system: 'ଅନ୍-ଗ୍ରିଡ୍ ସିଷ୍ଟମ',
    on_grid_system_desc: 'ଉପଯୋଗିତା ଗ୍ରିଡ୍ ସହିତ ସଂଯୁକ୍ତ, କମ୍ ଖର୍ଚ୍ଚ, ବ୍ୟାଟେରୀ ଆବଶ୍ୟକ ନାହିଁ। ସ୍ଥିର ଗ୍ରିଡ୍ ଥିବା ଅଞ୍ଚଳ ପାଇଁ ସର୍ବୋତ୍ତମ।',
    off_grid_system: 'ଅଫ୍-ଗ୍ରିଡ୍ ସିଷ୍ଟମ',
    off_grid_system_desc: 'ବ୍ୟାଟେରୀ ସହିତ ସ୍ୱାଧୀନ ସିଷ୍ଟମ, ଗ୍ରିଡ୍ ବିନା କାମ କରେ। ଦୂରବର୍ତ୍ତୀ ଅଞ୍ଚଳ ପାଇଁ ସର୍ବୋତ୍ତମ।',
    hybrid_system: 'ହାଇବ୍ରିଡ୍ ସିଷ୍ଟମ',
    hybrid_system_desc: 'ଅନ୍-ଗ୍ରିଡ୍ ଏବଂ ଅଫ୍-ଗ୍ରିଡ୍ ବୈଶିଷ୍ଟ୍ୟଗୁଡିକୁ ମିଶ୍ରଣ କରେ, ବ୍ୟାଟେରୀ ବ୍ୟାକଅପ, ଗ୍ରିଡ୍ ସଂଯୋଗ। ପାୱାର କଟ୍ ପାଇଁ ସର୍ବୋତ୍ତମ।',
    
    // On-Grid vs Hybrid
    on_grid_vs_hybrid: 'ଅନ୍-ଗ୍ରିଡ୍ ବନାମ ହାଇବ୍ରିଡ୍ ସିଷ୍ଟମ',
    on_grid_vs_hybrid_desc: 'ପାର୍ଥକ୍ୟ ବୁଝନ୍ତୁ ଏବଂ ଆପଣଙ୍କ ଆବଶ୍ୟକତା ପାଇଁ ସଠିକ୍ ସିଷ୍ଟମ ବାଛନ୍ତୁ।',
    on_grid_solar_system: 'ଅନ୍-ଗ୍ରିଡ୍ ସୋଲାର ସିଷ୍ଟମ',
    how_it_works: 'କିପରି କାମ କରେ',
    solar_panels: 'ସୋଲାର ପ୍ୟାନେଲ',
    solar_inverter: 'ସୋଲାର ଇନଭର୍ଟର',
    home: 'ଘର',
    net_meter: 'ନେଟ୍ ମିଟର',
    electric_grid: 'ବିଦ୍ୟୁତ୍ ଗ୍ରିଡ୍',
    hybrid_solar_system: 'ହାଇବ୍ରିଡ୍ ସୋଲାର ସିଷ୍ଟମ',
    hybrid_inverter_label: 'ହାଇବ୍ରିଡ୍ ଇନଭର୍ଟର',
    battery: 'ବ୍ୟାଟେରୀ',
    grid: 'ଗ୍ରିଡ୍',
    lowest_cost: 'ସର୍ବନିମ୍ନ ଖର୍ଚ୍ଚ',
    government_subsidy_available: 'ସରକାରୀ ସବସିଡି ଉପଲବ୍ଧ',
    reduce_electricity_bill: 'ବିଦ୍ୟୁତ୍ ବିଲ ହ୍ରାସ କରନ୍ତୁ',
    sell_extra_electricity: 'ଅତିରିକ୍ତ ବିଦ୍ୟୁତ୍ ଗ୍ରିଡ୍ କୁ ବିକ୍ରୟ କରନ୍ତୁ',
    doesnt_work_power_cuts: 'ପାୱାର କଟ୍ ସମୟରେ କାମ କରେ ନାହିଁ',
    works_during_power_cuts: 'ପାୱାର କଟ୍ ସମୟରେ କାମ କରେ',
    battery_backup: 'ବ୍ୟାଟେରୀ ବ୍ୟାକଅପ',
    lower_electricity_bill: 'ସାନ ବିଦ୍ୟୁତ୍ ବିଲ',
    stores_solar_energy: 'ସୌର ଶକ୍ତି ସଂରକ୍ଷଣ କରେ',
    higher_cost: 'ଅଧିକ ଖର୍ଚ୍ଚ',
    battery_replacement: 'କିଛି ବର୍ଷ ପରେ ବ୍ୟାଟେରୀ ବଦଳାଇବା',
    which_one_should_i_choose: 'ମୁଁ କେଉଁଟି ବାଛିବି?',
    no_power_cuts: 'ପାୱାର କଟ୍ ନାହିଁ',
    frequent_power_cuts: 'ବାରମ୍ବାର ପାୱାର କଟ୍',
    want_lowest_investment: 'ସର୍ବନିମ୍ନ ନିବେଶ ଚାହୁଁଛନ୍ତି',
    need_backup: 'ବ୍ୟାକଅପ ଆବଶ୍ୟକ',
    
    // Solar System Components
    solar_system_components: 'ସୋଲାର ସିଷ୍ଟମ ଉପାଦାନ',
    solar_system_components_desc: 'ଏକ ସୋଲାର ସିଷ୍ଟମକୁ ଦକ୍ଷତାର ସହ କାମ କରୁଥିବା ମୂଳ ଅଂଶ।',
    solar_panels_comp: 'ସୋଲାର ପ୍ୟାନେଲ',
    solar_panels_comp_desc: 'ଫଟୋଭୋଲଟେଇକ୍ ସେଲ୍ ବ୍ୟବହାର କରି ସୂର୍ଯ୍ୟ କିରଣକୁ ବିଦ୍ୟୁତରେ ପରିଣତ କରେ।',
    solar_inverter_comp: 'ସୋଲାର ଇନଭର୍ଟର',
    solar_inverter_comp_desc: 'ପ୍ୟାନେଲରୁ DC ଶକ୍ତିକୁ ଆପଣଙ୍କ ଘର ପାଇଁ AC ଶକ୍ତିରେ ପରିଣତ କରେ।',
    hybrid_inverter_comp: 'ହାଇବ୍ରିଡ୍ ଇନଭର୍ଟର',
    hybrid_inverter_comp_desc: 'ସୌର ଶକ୍ତି, ବ୍ୟାଟେରୀ ସଂରକ୍ଷଣ ଏବଂ ଗ୍ରିଡ୍ ଇନପୁଟକୁ ସହଜରେ ପରିଚାଳନା କରେ।',
    battery_comp: 'ବ୍ୟାଟେରୀ',
    battery_comp_desc: 'ଆପଣଙ୍କ ଘର ପାୱାର କଟ୍ ସମୟରେ ଚାଲିବା ପାଇଁ ଶକ୍ତି ସଂରକ୍ଷଣ କରେ।',
    net_meter_comp: 'ନେଟ୍ ମିଟର',
    net_meter_comp_desc: 'ଗ୍ରିଡ୍ କୁ ରପ୍ତାନି କରାଯାଇଥିବା ଏବଂ ଆମଦାନୀ କରାଯାଇଥିବା ବିଦ୍ୟୁତ୍ ମାପ କରେ।',
    mounting_structure: 'ମାଉଣ୍ଟିଙ୍ଗ୍ ଷ୍ଟ୍ରକଚର',
    mounting_structure_desc: 'ଛାତ ଉପରେ ସୋଲାର ପ୍ୟାନେଲଗୁଡ଼ିକୁ ସୁରକ୍ଷିତ ଭାବରେ ସମର୍ଥନ କରେ।',
    dc_cable: 'DC କେବଲ୍',
    dc_cable_desc: 'ପ୍ୟାନେଲରୁ ଇନଭର୍ଟରକୁ ପ୍ରତ୍ୟକ୍ଷ କରେଣ୍ଟ୍ ବହନ କରେ।',
    acdb_dcdb: 'ACDB/DCDB',
    acdb_dcdb_desc: 'ସିଷ୍ଟମରେ AC ଏବଂ DC ଶକ୍ତିକୁ ସୁରକ୍ଷିତ ଭାବରେ ବିତରଣ କରେ।',
    earthing: 'ଅର୍ଥିଙ୍ଗ',
    earthing_desc: 'ବିଦ୍ୟୁତ୍ ତ୍ରୁଟିରୁ ସିଷ୍ଟମ ଏବଂ ଆପଣଙ୍କ ଘରକୁ ସୁରକ୍ଷା ଦିଏ।',
    lightning_arrester: 'ଲାଇଟନିଂ ଆରେଷ୍ଟର',
    lightning_arrester_desc: 'ବଜ୍ରପାତ ଏବଂ ଶକ୍ତି ବୃଦ୍ଧିରୁ ସିଷ୍ଟମକୁ ସୁରକ୍ଷା ଦିଏ।',
    
    // Why Replace Coal
    why_replace_coal: 'କାହିଁକି କୋଇଲା ବିଦ୍ୟୁତ୍ ବଦଳାଇବେ?',
    why_replace_coal_desc: 'ସୌର ଶକ୍ତି ହେଉଛି କୋଇଲା-ଉତ୍ପନ୍ନ ଶକ୍ତିର ଏକ ପରିଷ୍କାର, ଅଧିକ ଟିକସ ବିକଳ୍ପ।',
    coal: 'କୋଇଲା',
    solar: 'ସୋଲାର',
    pollution: 'ପ୍ରଦୂଷଣ',
    clean: 'ପରିଷ୍କାର',
    limited_resource: 'ସୀମିତ ସମ୍ବଳ',
    unlimited: 'ଅସୀମିତ',
    cost_increasing: 'ଖର୍ଚ୍ଚ ବଢ଼ୁଛି',
    cost_reducing: 'ଖର୍ଚ୍ଚ କମୁଛି',
    environmental_damage: 'ପରିବେଶ କ୍ଷତି',
    eco_friendly_label: 'ପରିବେଶ ଅନୁକୂଳ',
    
    // Applications
    applications_of_solar: 'ସୋଲାରର ପ୍ରୟୋଗ',
    applications_of_solar_desc: 'ସୌର ଶକ୍ତି ବିଭିନ୍ନ ପ୍ରକାରର ଘର, ବ୍ୟବସାୟ ଏବଂ ସାର୍ବଜନୀନ ସେବାକୁ ଶକ୍ତି ଦେଇପାରେ।',
    home_rooftop: 'ଘର ଛାତ',
    water_pump: 'ଜଳ ପମ୍ପ',
    street_lights: 'ଷ୍ଟ୍ରିଟ୍ ଲାଇଟ୍',
    water_heater: 'ଜଳ ହିଟର',
    solar_cooking: 'ସୌର ରନ୍ଧନ',
    industries: 'ଶିଳ୍ପ',
    commercial_buildings: 'ବ୍ୟବସାୟିକ ଅଟ୍ଟାଳିକା',
    
    // Government Subsidy
    government_subsidy: 'ସରକାରୀ ସବସିଡି',
    government_subsidy_desc: 'ସରକାରୀ ସବସିଡି ସୋଲାର ସ୍ଥାପନର ଖର୍ଚ୍ଚ ହ୍ରାସ କରିପାରେ, ଏବଂ କାର୍ଯ୍ୟକ୍ରମ ବିବରଣୀ ସମୟ ସହିତ ପରିବର୍ତ୍ତନ ହୋଇପାରେ।',
    central_government_subsidy: 'କେନ୍ଦ୍ର ସରକାରଙ୍କ ସବସିଡି',
    central_government_subsidy_desc: 'ଅନୁମୋଦିତ ସୋଲାର ସିଷ୍ଟମ ପାଇଁ କେନ୍ଦ୍ର ସରକାରଙ୍କ ସମର୍ଥନ।',
    state_government_subsidy: 'ରାଜ୍ୟ ସରକାରଙ୍କ ସବସିଡି',
    state_government_subsidy_desc: 'ଅତିରିକ୍ତ ରାଜ୍ୟ-ସ୍ତରୀୟ ପ୍ରୋତ୍ସାହନ ଏବଂ ରିବେଟ୍।',
    loan_facility: 'ଋଣ ସୁବିଧା',
    loan_facility_desc: 'ଆପଣଙ୍କ ସୋଲାର ନିବେଶକୁ ସୁଲଭ କରିବା ପାଇଁ ସହଜ ଫାଇନାନ୍ସିଂ ବିକଳ୍ପ।',
    insurance: 'ବୀମା',
    insurance_desc: 'ଉପକରଣ ଏବଂ ସ୍ଥାପନ ପାଇଁ ଐଚ୍ଛିକ କଭରେଜ୍।',
    net_meter_subsidy: 'ନେଟ୍ ମିଟର',
    net_meter_subsidy_desc: 'ନେଟ୍ ମିଟରିଂ ଆପଣଙ୍କୁ ଅତିରିକ୍ତ ସୌର ଶକ୍ତି ଗ୍ରିଡ୍ କୁ ବିକ୍ରୟ କରିବାକୁ ଅନୁମତି ଦିଏ।',
    installation_timeline: 'ସ୍ଥାପନ ସମୟସୀମା',
    installation_timeline_desc: 'ପେସାଦାର କାରିଗରୀ ଏବଂ ସମୟସୀମା ଡେଲିଭରି ସହିତ ଦ୍ରୁତ କାର୍ଯ୍ୟକାରିତା।',
    
    // Required Documents
    required_documents: 'ଆବଶ୍ୟକ ଡକ୍ୟୁମେଣ୍ଟ',
    required_documents_desc: 'ଆପଣ ଆପଣଙ୍କ ସୋଲାର ସାଇଟ୍ ପରିଦର୍ଶନ ବୁକ୍ କରିବା ସମୟରେ ଏହି ଡକ୍ୟୁମେଣ୍ଟଗୁଡ଼ିକୁ ପ୍ରସ୍ତୁତ ରଖନ୍ତୁ।',
    aadhaar_card: 'ଆଧାର କାର୍ଡ',
    pan_card: 'PAN କାର୍ଡ',
    electricity_bill: 'ବିଦ୍ୟୁତ୍ ବିଲ',
    bank_passbook: 'ବ୍ୟାଙ୍କ ପାସବୁକ୍',
    mobile_number: 'ମୋବାଇଲ୍ ନମ୍ବର',
    
    // Solar Cost Calculator
    solar_cost_calculator: 'ସୋଲାର ଖର୍ଚ୍ଚ କ୍ୟାଲକୁଲେଟର',
    solar_cost_calculator_desc: 'ଏକ ବ୍ୟକ୍ତିଗତ ସୋଲାର ଆକଳନ ପାଇବାକୁ ଆପଣଙ୍କ ବାର୍ଷିକ ବିଦ୍ୟୁତ୍ ବ୍ୟବହାର ପ୍ରବେଶ କରନ୍ତୁ।',
    annual_consumption: 'ବାର୍ଷିକ ବିଦ୍ୟୁତ୍ ବ୍ୟବହାର (kWh)',
    monthly_electricity_bill: 'ମାସିକ ବିଦ୍ୟୁତ୍ ବିଲ (₹)',
    house_location: 'ଘର ଅବସ୍ଥାନ',
    roof_type: 'ଛାତ ପ୍ରକାର',
    tile_roof: 'ଟାଇଲ୍ ଛାତ',
    metal_roof: 'ଧାତୁ ଛାତ',
    concrete_roof: 'କଂକ୍ରିଟ୍ ଛାତ',
    flat_roof: 'ସମତଳ ଛାତ',
    calculate_estimate: 'ଆକଳନ ଗଣନା କରନ୍ତୁ',
    your_solar_estimate: 'ଆପଣଙ୍କ ସୋଲାର ଆକଳନ',
    recommended_system_size: 'ସୁପାରିଶ କରାଯାଇଥିବା ସିଷ୍ଟମ ଆକାର',
    approximate_installation_cost: 'ଆନୁମାନିକ ସ୍ଥାପନ ଖର୍ଚ୍ଚ',
    estimated_subsidy: 'ଆକଳନ କରାଯାଇଥିବା ସବସିଡି',
    expected_monthly_savings: 'ଆଶାକରାଯାଉଥିବା ମାସିକ ସଞ୍ଚୟ',
    payback_period: 'ପରିଶୋଧ ସମୟ',
    get_personalized_quote: 'ଆମର ବିଶେଷଜ୍ଞଙ୍କ ଠାରୁ ଏକ ବ୍ୟକ୍ତିଗତ କୋଟ୍ ପାଆନ୍ତୁ!',
    enter_your_details: 'ଆପଣଙ୍କ ବିବରଣୀ ପ୍ରବେଶ କରନ୍ତୁ',
    fill_form_click_calculate: 'ଫର୍ମ ପୂରଣ କରନ୍ତୁ ଏବଂ ଆପଣଙ୍କ ବ୍ୟକ୍ତିଗତ ସୋଲାର ସଞ୍ଚୟ ଦେଖିବାକୁ "ଆକଳନ ଗଣନା କରନ୍ତୁ" କ୍ଲିକ୍ କରନ୍ତୁ।',
    
    // What We Offer
    what_we_offer: 'ଆମେ କ\'ଣ ପ୍ରଦାନ କରୁ',
    what_we_offer_desc: 'ଆବାସିକ ଏବଂ ବ୍ୟବସାୟିକ ଆବଶ୍ୟକତା ପାଇଁ ଶେଷ-ଠାରୁ-ଶେଷ ସୋଲାର ସେବା',
    annual_maintenance: 'ବାର୍ଷିକ ରକ୍ଷଣାବେକ୍ଷଣ',
    solar_upgradation: 'ସୋଲାର ଅପଗ୍ରେଡେସନ',
    solar_panel_cleaning: 'ସୋଲାର ପ୍ୟାନେଲ ପରିଷ୍କାର',
    battery_maintenance: 'ବ୍ୟାଟେରୀ ରକ୍ଷଣାବେକ୍ଷଣ',
    inverter_upgrade: 'ଇନଭର୍ଟର ଅପଗ୍ରେଡ୍',
    installation_service: 'ସ୍ଥାପନ',
    solar_irrigation_pumping: 'ସୌର ସେଚନ ପମ୍ପିଙ୍ଗ',
    solar_street_lighting: 'ସୌର ଷ୍ଟ୍ରିଟ୍ ଲାଇଟିଙ୍ଗ',
    
    // How We Work
    how_we_work: 'ଆମେ କିପରି କାମ କରୁ',
    contact_us_step: 'ଆମକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ',
    contact_us_step_desc: 'ଆମର ସୋଲାର ଉତ୍ପାଦ ପରିସର ବିଷୟରେ ପଚାରିବା ପାଇଁ ଆମର ସମର୍ଥନ ଦଳକୁ ସହଜରେ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
    estimation_step: 'ଆକଳନ',
    estimation_step_desc: 'ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ଏକ ବ୍ୟାପକ ସୋଲାର ସ୍ଥାପନ କୋଟ୍ ଗ୍ରହଣ କରନ୍ତୁ।',
    execution_step: 'କାର୍ଯ୍ୟକାରିତା',
    execution_step_desc: 'ଆପଣଙ୍କ ସୋଲାର ସିଷ୍ଟମର ଉତ୍ତମ କାର୍ଯ୍ୟକାରିତା ସୁନିଶ୍ଚିତ କରିବା।',
    maintenance_step: 'ରକ୍ଷଣାବେକ୍ଷଣ',
    maintenance_step_desc: 'ଆପଣଙ୍କ ସିଷ୍ଟମକୁ ସୁରୁଖୁରୁରେ ଚଳାଇବା ପାଇଁ ବିଶ୍ୱସନୀୟ ରକ୍ଷଣାବେକ୍ଷଣ ସେବା।',
    
    // Affiliations
    our_affiliations: 'ଆମର ସହଯୋଗ',
    we_are_tpcodl: 'ଆମେ TPCODL ଏମ୍ପାନେଲଡ୍ ଭେଣ୍ଡର!',
    
    // CTA
    ready_to_go_solar: 'ସୋଲାର ଯିବାକୁ ପ୍ରସ୍ତୁତ?',
    join_thousands: 'ସୁଲଭ ସୌର ଶକ୍ତିରେ ପରିବର୍ତ୍ତନ କରୁଥିବା ହଜାର ହଜାର ଘର ମାଲିକଙ୍କ ସହ ଯୋଗ ଦିଅନ୍ତୁ।',
    installations: 'ସ୍ଥାପନ',
    years_warranty: 'ବର୍ଷ ଓ୍ବାରେଣ୍ଟି',
    savings: 'ସଞ୍ଚୟ',
    get_started_today: 'ଆଜି ଆରମ୍ଭ କରନ୍ତୁ',
    contact_us_free_consultation: 'ଏକ ମାଗଣା ପରାମର୍ଶ ଏବଂ କଷ୍ଟମ୍ କୋଟ୍ ପାଇଁ ଆମକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
    contact_us_now: 'ଏବେ ଯୋଗାଯୋଗ କରନ୍ତୁ',
    
    // FAQ
    faq_title: 'ବାରମ୍ବାର ପଚରାଯାଉଥିବା ପ୍ରଶ୍ନ',
    faq_desc: 'ଆମର ଗ୍ରାହକଙ୍କ ଠାରୁ ସବୁଠାରୁ ସାଧାରଣ ସୋଲାର ପ୍ରଶ୍ନର ଉତ୍ତର।',
    faq_on_grid: 'ଅନ୍-ଗ୍ରିଡ୍ ସୋଲାର କ\'ଣ?',
    faq_on_grid_ans: 'ଏକ ସିଷ୍ଟମ ଯାହା ଗ୍ରିଡ୍ ସହିତ ସଂଯୁକ୍ତ ଯାହା ଅତିରିକ୍ତ ଶକ୍ତି ରପ୍ତାନି କରେ ଏବଂ ଆପଣଙ୍କ ବିଦ୍ୟୁତ୍ ବିଲ ହ୍ରାସ କରେ।',
    faq_hybrid: 'ହାଇବ୍ରିଡ୍ ସୋଲାର କ\'ଣ?',
    faq_hybrid_ans: 'ଏକ ସିଷ୍ଟମ ଯାହା ବ୍ୟାଟେରୀ ବ୍ୟାକଅପ୍ ସହିତ ପାୱାର କଟ୍ ସମୟରେ କାମ କରେ ଏବଂ ସୌର ଶକ୍ତି ସଂରକ୍ଷଣ କରେ।',
    faq_better: 'କେଉଁଟି ଭଲ?',
    faq_better_ans: 'ସର୍ବନିମ୍ନ ଖର୍ଚ୍ଚ ପାଇଁ ଅନ୍-ଗ୍ରିଡ୍ ଉତ୍ତମ, ଯେତେବେଳେ ବ୍ୟାକଅପ୍ ଆବଶ୍ୟକ ହେଲେ ହାଇବ୍ରିଡ୍ ଉତ୍ତମ।',
    faq_rainy: 'ବର୍ଷା ଦିନରେ ସୋଲାର କାମ କରେ କି?',
    faq_rainy_ans: 'ହଁ, ସୋଲାର ପ୍ୟାନେଲଗୁଡ଼ିକ ମେଘୁଆ ଦିନରେ ମଧ୍ୟ ବିଦ୍ୟୁତ୍ ଉତ୍ପନ୍ନ କରେ, ଯଦିଓ ଉତ୍ପାଦନ କମ୍ ହୁଏ।',
    faq_lifespan: 'ପ୍ୟାନେଲଗୁଡ଼ିକ କେତେ ବର୍ଷ ରହେ?',
    faq_lifespan_ans: 'ସୋଲାର ପ୍ୟାନେଲଗୁଡ଼ିକ ସାଧାରଣତଃ ଉପଯୁକ୍ତ ରକ୍ଷଣାବେକ୍ଷଣ ସହିତ ୨୦-୨୫ ବର୍ଷ ରହିଥାଏ।',
    faq_subsidy: 'କେତେ ସବସିଡି ଉପଲବ୍ଧ?',
    faq_subsidy_ans: 'ରାଜ୍ୟ ଏବଂ ସିଷ୍ଟମ ପ୍ରକାର ଅନୁଯାୟୀ ସବସିଡି ଭିନ୍ନ ହୁଏ; ସଦ୍ୟତମ ସରକାରୀ ସମର୍ଥନ ପାଇଁ ଆମକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ।',
    faq_ac: 'ମୁଁ AC ଚଲାଇ ପାରିବି କି?',
    faq_ac_ans: 'ହଁ, ଏକ ଉପଯୁକ୍ତ ଆକାରର ସିଷ୍ଟମ ବ୍ୟାଟେରୀ ବ୍ୟାକଅପ୍ ସହିତ AC ଏବଂ ଅନ୍ୟ ଉପକରଣ ଚଲାଇପାରିବ।',
    faq_power_cut: 'ପାୱାର କଟ୍ ସମୟରେ କ\'ଣ ହୁଏ?',
    faq_power_cut_ans: 'ଅନ୍-ଗ୍ରିଡ୍ ସିଷ୍ଟମ କଟ୍ ସମୟରେ ବନ୍ଦ ହୋଇଯାଏ; ହାଇବ୍ରିଡ୍ ସିଷ୍ଟମ ସଂରକ୍ଷିତ ବ୍ୟାଟେରୀ ଶକ୍ତି ବ୍ୟବହାର କରି ଜାରି ରଖେ।',
    faq_maintenance: 'ରକ୍ଷଣାବେକ୍ଷଣ ମହଙ୍ଗା କି?',
    faq_maintenance_ans: 'ରକ୍ଷଣାବେକ୍ଷଣ ସାଧାରଣତଃ କମ୍ ଖର୍ଚ୍ଚର ଏବଂ ଏଥିରେ ପରିଷ୍କାର ଏବଂ ବାର୍ଷିକ ଯାଞ୍ଚ ଅନ୍ତର୍ଭୁକ୍ତ।',
  }
};

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}>({ lang: 'en', setLang: () => {}, t: (k) => k });

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('kse_lang');
      return (stored as Lang) || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kse_lang', lang);
    } catch {}
  }, [lang]);

  const t = (key: string) => translations[lang][key] || translations['en'][key] || key;

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;