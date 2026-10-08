// Copy and data for /festive-reach — a dedicated paid-campaign landing page.
// Every stat, partner and case-study figure here is taken directly from the brief;
// nothing on this page is invented beyond what was supplied.

export const heroCopy = {
    eyebrow: 'Festive campaign 2026',
    headline: 'Make your festive campaign reach further.',
    headlineLead: 'Make your festive campaign',
    headlineAccent: 'reach further.',
    tagline: 'One distribution ecosystem. Multiple ways to reach high-intent audiences at scale.',
    sub: 'Parivestra brings together OEM, brand, college, creator, affiliate and offline distribution channels to help brands build sharper acquisition and reach strategies.',
};

export const heroNodes = ['OEM', 'Brand inventory', 'Colleges', 'Creators', 'Affiliate', 'Programmatic', 'Offline'];

export const stats = [
    { value: 800, suffix: 'M+', label: 'OEM devices' },
    { value: 1, suffix: 'B+', label: 'Daily active users' },
    { value: 20000, suffix: '+', label: 'Promoters' },
    { value: 15000, suffix: '+', label: 'Content creators' },
    { value: 3000, suffix: '+', label: 'Colleges' },
    { value: 1000, suffix: '+', label: 'Brand inventories' },
];

export const ecosystemNodes = [
    { key: 'oem', label: 'OEM', icon: 'digital' },
    { key: 'brand', label: 'Brand inventories', icon: 'retail' },
    { key: 'college', label: 'College', icon: 'communities' },
    { key: 'creators', label: 'Creators', icon: 'creators' },
    { key: 'affiliate', label: 'Affiliate', icon: 'data' },
    { key: 'programmatic', label: 'Programmatic', icon: 'ai' },
    { key: 'offline', label: 'Offline', icon: 'offline' },
];

export const channelCards = [
    {
        id: 'gated',
        index: '01',
        icon: 'retail',
        title: 'Gated brand inventories',
        description: 'Exclusive brand inventories at negotiated price points with high-quality users.',
        tags: ['Swiggy', 'Instamart', 'Toing', 'GPay', 'MakeMyTrip', 'Goibibo', 'redBus', 'Tata 1mg', 'ixigo', 'Pocket FM'],
    },
    {
        id: 'oem',
        index: '02',
        icon: 'digital',
        title: 'Native OEM inventories',
        description: 'Device-native placements across the largest Android OEMs in India.',
        kicker: 'OEM partners',
        tags: ['OPPO', 'vivo', 'Xiaomi', 'Samsung', 'OnePlus', 'LAVA'],
        kicker2: 'Key formats',
        tags2: ['App Store / App Market', 'Native App Placements', 'Discovery Feed', 'Lock Screen', 'Smart Messages', 'OOBE', 'Utility Surfaces'],
    },
    {
        id: 'college',
        index: '03',
        icon: 'communities',
        title: 'College inventories',
        description: '3,000+ colleges, pan India.',
        kicker: 'Channels',
        tags: ['Campus ambassadors', 'Events', 'Student digital placements', 'Promoters', 'Student creators', 'Student communities'],
        kicker2: 'Outcomes',
        tags2: ['Registrations', 'Leads', 'Transactions', 'Installs', 'Downloads', 'Orders', 'Offer-led conversions'],
    },
    {
        id: 'affiliate',
        index: '04',
        icon: 'data',
        title: 'Affiliate & performance',
        description: 'Intent-led performance buying and mass-scale audience reach through creator and publisher-led acquisition.',
        tags: ['OEM SDK', 'Programmatic', 'SSP', 'DSP', 'Affiliate', 'Media buying'],
    },
    {
        id: 'offline',
        index: '05',
        icon: 'offline',
        title: 'Offline inventories',
        description: 'Physical-world distribution across transit, retail and campus.',
        tags: ['OOH & Transit', 'Residential & Corporate', 'Digital OOH', 'Malls & Retail', 'Airport', 'Auto & Mobility', 'Campus & Youth', 'Youth & Events'],
    },
];

export const objectives = [
    {
        index: '01',
        title: 'Reach',
        description: 'For campaigns focused on broad visibility and audience reach.',
        channels: ['Native OEM inventories', 'Offline inventories', 'Gated brand inventories'],
    },
    {
        index: '02',
        title: 'Acquisition',
        description: 'For campaigns focused on users, installs, registrations, leads and transactions.',
        channels: ['Gated brand inventories', 'Native OEM inventories', 'Affiliate & performance'],
    },
    {
        index: '03',
        title: 'College & youth',
        description: 'For campaigns targeting students and young professionals.',
        channels: ['College inventories', 'Offline inventories', 'Affiliate & performance'],
    },
];

export const whyPoints = [
    { title: 'Multi-channel distribution', description: 'OEM, brand, college, creator, affiliate and offline — one ecosystem instead of a dozen vendors.' },
    { title: 'High-intent inventories', description: 'Gated and negotiated placements with users already primed to convert.' },
    { title: 'On-ground first-party signals', description: 'A 20,000+ promoter network adds a first-party data layer that helps map audiences, inventory and user cohorts.' },
    { title: 'Performance-led acquisition', description: 'Every channel is measured against the outcome it was deployed for — not impressions alone.' },
];

export const trustedBrands = ['Swiggy', 'Paytm', 'PhonePe', 'Google', 'MakeMyTrip', 'Goibibo', 'redBus', 'ixigo', 'Tata 1mg', 'Zomato', 'Blinkit', 'JioSaavn'];
export const trustedSub = 'Working with 50+ companies across 7 industries and 11+ countries.';

export const caseStudies = [
    {
        brand: 'PhonePe',
        engagement: 'New user acquisition campaign',
        channels: 'OEM and digital inventories, strengthened through on-ground data',
        result: '20L+',
        resultLabel: 'New users',
    },
    {
        brand: 'Paytm',
        engagement: 'Acquisition campaign for UPI and Gold products',
        channels: 'OEM and on-ground data',
        result: '50L+',
        resultLabel: 'New users',
        secondaryResult: '20,000',
        secondaryLabel: 'SP disbursals',
    },
    {
        brand: 'Swiggy',
        engagement: 'College-going user acquisition',
        channels: 'BTL events, student influencer content, college inventories',
        result: '11K+',
        resultLabel: 'New users from colleges / month',
        stats: ['500+ events per month', '1,000+ student IG reels', '3,000+ colleges pan India'],
    },
];

export const objectiveOptions = ['Reach', 'Acquisition', 'College & Youth', 'Other'];
