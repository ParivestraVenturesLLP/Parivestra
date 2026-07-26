const rules = [
    {
        keywords: ['hi', 'hello', 'hey', 'namaste', 'hii', 'helo'],
        reply: "Hey there! I'm the Parivestra AI Assistant. Ask me about our services, clientele, partnerships, or how to get in touch.",
    },
    {
        keywords: ['service', 'offer', 'what do you do', 'what we do', 'work'],
        reply: "Parivestra blends AI-optimized marketing, influencer & affiliate ecosystems, and offline/on-ground distribution (colleges, RWAs, events) to drive measurable outcomes. Check the Distribution page for the full breakdown.",
    },
    {
        keywords: ['contact', 'phone', 'number', 'email', 'call', 'reach'],
        reply: "You can reach us at +91 7970476060 or ayush@parivestra.com, or just fill out the form on our Contact page and our team will get back within 24 hours.",
    },
    {
        keywords: ['partner', 'partnership', 'collaborate', 'collab'],
        reply: "We partner with brands, agencies, and platforms on distribution access, GTM execution, affiliate stacks, and AI marketing infrastructure. Visit the Partnerships page to see all our models.",
    },
    {
        keywords: ['client', 'brand', 'worked with', 'clientele'],
        reply: "We've worked with 100+ brands including Amazon, Uber, Swiggy, Nestlé, Myntra, and more. Check out the Clientele page for the full list.",
    },
    {
        keywords: ['case study', 'case studies', 'example', 'portfolio', 'result'],
        reply: "Our Case Studies page has detailed breakdowns of campaigns for Swiggy, Uber, FlixBus, Nestlé, Meesho, and Myntra with measurable outcomes.",
    },
    {
        keywords: ['about', 'who are you', 'company', 'parivestra'],
        reply: "Parivestra is a modern distribution and growth infrastructure company — built for brands that want outcomes, not just impressions. More on the About page.",
    },
    {
        keywords: ['ai agent', 'ai agents', 'custom ai', 'automation', 'chatbot'],
        reply: "We build customized AI agents for brands — tailored to your workflows and audience. Check out the AI & Apps page for details, or share your requirement on the Contact page.",
    },
    {
        keywords: ['app', 'playstore', 'play store', 'mobile app', 'android'],
        reply: "Our Parivestra app is coming soon on the Play Store! Head to the AI & Apps page for a preview.",
    },
    {
        keywords: ['price', 'pricing', 'cost', 'budget', 'charge'],
        reply: "Pricing depends on the scope of your campaign or partnership. Share a few details on the Contact page and our team will get back with a tailored quote.",
    },
    {
        keywords: ['distribution', 'college', 'offline', 'rwa', 'campus'],
        reply: "We run offline distribution across 500+ college campuses, RWAs, turfs, and on-ground events pan-India. Full details on the Distribution page.",
    },
    {
        keywords: ['thank', 'thanks', 'thank you', 'shukriya', 'dhanyavad'],
        reply: "You're welcome! Let us know if there's anything else you'd like to know about Parivestra.",
    },
    {
        keywords: ['bye', 'goodbye', 'alvida'],
        reply: "Take care! Feel free to reach out anytime via the Contact page.",
    },
];

const fallbackReplies = [
    "I'm not sure I caught that — could you rephrase it? Or ask me about our services, clientele, partnerships, or contact details.",
    "I can help best with questions about Parivestra's services, distribution network, partnerships, or how to get in touch. Try asking about one of those!",
];

export function getAssistantReply(userText) {
    const text = userText.toLowerCase();

    for (const rule of rules) {
        if (rule.keywords.some((kw) => text.includes(kw))) {
            return rule.reply;
        }
    }

    return fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
}
