// All homepage copy lives here. Source: "Parivestra — Complete Website Revamp Plan".
// Case-study figures come from the results already published on the previous site
// (see src/pages/PariCaseStudies.jsx) — swap for verified business outcomes before launch.

export const CTA_LABEL = 'Book a Call';

export const hero = {
    eyebrow: 'Outcome infrastructure for consumer brands',
    headline: "We're reimagining how brands reach, engage and convert consumers.",
    sub: 'Parivestra connects millions of consumer touchpoints across digital, communities, creators and the physical world — and engineers them toward measurable business outcomes.',
    secondary: 'Explore Outcomes',
};

export const proof = [
    { shape: 'circle', prefix: '', value: 300, suffix: '+', label: 'Brands' },
    { shape: 'square', prefix: '', value: 300, suffix: 'M+', label: 'Consumer touchpoints' },
    { shape: 'triangle', prefix: '₹', value: 500, suffix: 'Cr+', label: 'Sales driven' },
];

export const outcomeNodes = ['Sale', 'Lead', 'Signup', 'Transaction', 'Footfall'];

// Channel segments shown on the "Attribution" donut in the Consumer Mesh scene.
export const touchpointChannels = ['Apps', 'Partnerships', 'Web3', 'Communities', 'Creators'];

export const outcomes = [
    {
        id: 'acquire',
        name: 'Acquire',
        promise: 'Get new customers.',
        infra: ['Performance', 'Affiliates', 'Campuses', 'Communities'],
    },
    {
        id: 'transact',
        name: 'Transact',
        promise: 'Drive measurable purchases.',
        infra: ['CPA / CPS / CPT networks', 'Commerce', 'Retargeting'],
    },
    {
        id: 'launch',
        name: 'Launch',
        promise: 'Enter markets rapidly.',
        infra: ['Offline activation', 'Creators', 'Communities', 'OOH', 'Digital'],
    },
    {
        id: 'engage',
        name: 'Engage',
        promise: 'Reach hard-to-access audiences.',
        infra: ['WhatsApp', 'Telegram', 'Colleges', 'RWAs', 'Social', 'Influencers'],
    },
    {
        id: 'scale',
        name: 'Scale',
        promise: 'Turn successful channels into millions of touchpoints.',
        infra: ['Proprietary inventories', 'Automation', 'Intelligence'],
    },
];

export const flow = [
    { id: 'consumer', name: 'Consumer', text: 'Students, communities, shoppers and audiences — on campuses, in societies, online and in stores.' },
    { id: 'intent', name: 'Intent', text: 'Signals from search, social, community and on-ground interaction show who is ready to act.' },
    { id: 'distribution', name: 'Distribution', text: 'Proprietary inventory and partner networks route each audience to the right touchpoint.' },
    { id: 'engagement', name: 'Engagement', text: 'WhatsApp, Telegram, creators and on-ground teams turn attention into interaction.' },
    { id: 'transaction', name: 'Transaction', text: 'Every action is tracked back to a sale, signup, lead or footfall.' },
];

// Each solution maps 1:1 to an outcome product in the plan (§5).
export const solutions = [
    {
        id: 'acquisition',
        name: 'Acquisition',
        outcome: 'Acquire',
        promise: 'Get new customers.',
        points: ['Performance marketing', 'Affiliates', 'Campus networks', 'Community channels', 'Creator programmes'],
    },
    {
        id: 'commerce',
        name: 'Commerce',
        outcome: 'Transact',
        promise: 'Drive measurable purchases.',
        points: ['CPA / CPS / CPT networks', 'Affiliate commerce', 'Retargeting'],
    },
    {
        id: 'engagement',
        name: 'Engagement',
        outcome: 'Engage',
        promise: 'Reach hard-to-access audiences.',
        points: ['WhatsApp and Telegram communities', 'Colleges and RWAs', 'Social', 'Influencers'],
    },
    {
        id: 'market-launch',
        name: 'Market Launch',
        outcome: 'Launch',
        promise: 'Enter markets rapidly.',
        points: ['Offline activation', 'Creators', 'Communities', 'OOH', 'Digital'],
    },
    {
        id: 'distribution',
        name: 'Agents',
        outcome: 'Scale',
        promise: 'AI agents built for enterprise.',
        points: ['Enterprise workflow agents', 'Proprietary inventories', 'Automation', 'Real-time intelligence'],
    },
];

export const infrastructure = [
    { id: 'digital', name: 'Digital', text: 'Performance, affiliates and retargeting.' },
    { id: 'communities', name: 'Communities', text: 'Campuses, RWAs, WhatsApp and Telegram.' },
    { id: 'creators', name: 'Creators', text: 'Influencer and UGC networks.' },
    { id: 'offline', name: 'Offline', text: 'Kiosks, promoters, events and OOH.' },
    { id: 'retail', name: 'Retail', text: 'In-store and retail execution.' },
    { id: 'data', name: 'Data', text: 'Attribution across offline and online journeys.' },
    { id: 'ai', name: 'AI', text: 'Search, reputation and audience targeting.' },
];

export const caseStudies = [
    {
        brand: 'Swiggy',
        sector: 'Food Delivery',
        metric: '50+',
        unit: 'Colleges activated',
        title: 'Hyper-local community distribution',
        overview: 'Swiggy needed distribution that reached students where they already gather, not just where ads could be bought. We built a campus-first activation stack across 50+ colleges, paired offline trials with a community-led GTM in Tier-2 cities, and tied every touchpoint back to app installs.',
        stack: ['Offline activation', 'Community GTM', 'Data attribution'],
        execution: ['Campus activation across 50+ colleges', 'Community-first GTM in Tier-2 cities', 'Brand trials correlated with app installs'],
    },
    {
        brand: 'Uber',
        sector: 'Mobility',
        metric: '15+',
        unit: 'Cities of UGC campaigns',
        title: 'Rider acquisition through UGC and influencers',
        overview: "Uber's rider growth needed a city-by-city playbook that felt native, not paid. We ran UGC campaigns across 15+ cities, layered influencer-led first-ride pushes on top, and closed the loop with AI-led attribution back to completed rides.",
        stack: ['UGC', 'Influencers', 'AI attribution'],
        execution: ['UGC campaigns across 15+ cities', 'Influencer-driven first-ride conversions', 'AI-led attribution to ride completions'],
    },
    {
        brand: 'Meesho',
        sector: 'Social Commerce',
        metric: '8',
        unit: 'States of revenue-linked distribution',
        title: 'Seller ecosystem expansion',
        overview: "Meesho's next growth lever was Tier-3 sellers, not Tier-1 shoppers. We built an affiliate reseller network on the ground, activated it through in-person campaigns, and linked every seller's activity back to revenue across 8 states.",
        stack: ['Affiliate commerce', 'On-ground activation', 'Revenue attribution'],
        execution: ['Affiliate seller network built in Tier-3 markets', 'On-ground reseller activation campaigns', 'Revenue-linked distribution across 8 states'],
    },
    {
        brand: 'FlixBus',
        sector: 'Intercity Travel',
        metric: '20',
        unit: 'Routes of performance marketing',
        title: 'Market entry and distribution stack',
        overview: 'Entering India meant FlixBus needed trust before it needed traffic. We stood up a pan-India affiliate ecosystem, ran an ORM strategy to build rider confidence, and layered performance marketing across 20 routes to convert that trust into bookings.',
        stack: ['GTM execution', 'Affiliate stack', 'ORM'],
        execution: ['Pan-India affiliate ecosystem built', 'ORM strategy for brand trust building', 'Performance marketing across 20 routes'],
    },
];

export const executionPhotos = [
    { src: '/exec/stall.webp', alt: 'Branded campus activation stall with students', caption: 'Campus activation' },
    { src: '/exec/crowd.webp', alt: 'Students gathered around a sampling stall', caption: 'Community capture' },
    { src: '/exec/sampling.webp', alt: 'Promoters running product sampling on campus', caption: 'On-ground sampling' },
    { src: '/exec/booth.webp', alt: 'Students at a branded booth', caption: 'Brand trial' },
];

export const objectives = ['Acquisition', 'Transactions', 'Launch', 'Awareness', 'Other'];

export const nav = [
    { label: 'Outcomes', to: '/#outcomes' },
    { label: 'Solutions', to: '/#solutions' },
    { label: 'Consumer Mesh', to: '/#consumer-mesh' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'About', to: '/about' },
];

// Stories that do not yet have an approved headline number — shown as text-only until verified.
export const moreStories = [
    {
        brand: 'Nestlé', sector: 'FMCG', title: 'Youth-first community engagement',
        overview: 'Nestlé wanted youth mindshare that translated to shelf pull, not just impressions. We ran RWA and turf activations nationwide, sampled product through community-led campaigns, and tracked brand visibility through to sales correlation.',
        stack: ['Offline distribution', 'Community activation', 'Sales correlation'], execution: ['RWA and turf activations nationwide', 'Brand visibility to sales correlation tracked', 'Community-led product sampling campaigns'],
    },
    {
        brand: 'Myntra', sector: 'Fashion E-Commerce', title: 'Campus and youth distribution',
        overview: 'Myntra needed a foothold with fashion-forward students before they formed shopping habits elsewhere. We built a college influencer ambassador program, targeted high-intent fashion communities on campus, and tracked brand presence through to sales correlation.',
        stack: ['Influencer ecosystem', 'Campus GTM', 'Performance tracking'], execution: ['College influencer ambassador program', 'High-intent fashion community targeting', 'Sales-correlated brand presence tracking'],
    },
];

// Solution → Book a Call objective (plan §10 objective list)
export const objectiveFor = { Acquire: 'Acquisition', Transact: 'Transactions', Launch: 'Launch', Engage: 'Awareness', Scale: 'Other' };

export const about = {
    why: 'Consumer brands buy reach in dozens of places and still cannot see what it produced. Parivestra exists to replace that with one layer: distribution engineered toward a single measurable outcome.',
    philosophy: [
        { k: 'Buy outcomes', v: 'Don’t buy channels. Tell us the outcome and we engineer the distribution to reach it.' },
        { k: 'Community-first', v: 'We execute in high-intent environments — campuses, societies, creators and retail — where trust is already built.' },
        { k: 'Data-led', v: 'Unified capture across offline and online journeys, mapped to real business results.' },
    ],
    advantage: ['Proprietary distribution', 'Communities', 'Creators', 'Digital inventory', 'Offline networks', 'Intelligence'],
};
