/** Site-wide config — update contact details here */
export const site = {
  name: 'Nova',
  tagline: 'Novus-grade design, sized for where you are right now.',
  positioning: 'Look credible. Launch fast. Spend less.',
  email: 'info@nova.com',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '2348012345678', // [PLACEHOLDER] real WhatsApp number
  instagram: 'https://instagram.com/nova_kulture',
  instagramHandle: '@nova_kulture',
  novusUrl: 'https://www.novus.africa',
  url: 'https://nova.novus.africa', // [PLACEHOLDER] confirm production URL
};

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Logo Mart', path: '/logo-mart' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const stats = [
  { value: '40+', label: 'SMEs launched' },
  { value: '7-day', label: 'Avg. turnaround' },
  { value: 'From ₦45k', label: 'Starting price' },
  { value: '100%', label: 'Fixed-scope packages' },
];

export const whyNova = [
  {
    title: 'Fast turnaround',
    body: 'Most packages ship in days, not months. You get a clear timeline before you pay.',
  },
  {
    title: 'Fixed, transparent pricing',
    body: 'No vague quotes. You see the price, you know what’s included, you start when you’re ready.',
  },
  {
    title: 'Novus-grade quality',
    body: 'Same craft standards as Novus Africa — scoped for small-business budgets and timelines.',
  },
];
