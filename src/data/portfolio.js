/** Portfolio cases — mock content for design preview */
export const portfolioFilters = [
  { id: 'all', label: 'All' },
  { id: 'logo', label: 'Logo' },
  { id: 'website', label: 'Website' },
  { id: 'bundle', label: 'Full Bundle' },
];

export const portfolio = [
  {
    id: 'case-01',
    title: 'Adaora Atelier',
    businessType: 'Fashion boutique · Lagos',
    type: 'bundle',
    problem: 'Selling on WhatsApp with a phone wallpaper as the “logo.”',
    solution: 'Identity + 4-page shop site shipped in 11 days.',
    image:
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=900&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'case-02',
    title: 'Suya Street Co.',
    businessType: 'Catering · Abuja',
    type: 'logo',
    problem: 'Handwritten name on foil packs — hard to remember, hard to trust.',
    solution: 'Bold badge mark + packaging-ready file set in 5 days.',
    image:
      'https://images.unsplash.com/photo-1555939596-1923b999c501?w=900&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'case-03',
    title: 'Paylite NG',
    businessType: 'Fintech solopreneur · Remote',
    type: 'website',
    problem: 'A Notion page pretending to be a product site.',
    solution: 'Clean 3-page launch site with waitlist CTA.',
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=900&q=80&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'case-04',
    title: 'Grace House Media',
    businessType: 'Faith-based ministry · Port Harcourt',
    type: 'bundle',
    problem: 'Inconsistent sermon graphics and a broken old blog.',
    solution: 'Emblem identity + sermon-friendly site in 2 weeks.',
    image:
      'https://images.unsplash.com/photo-1438232999694-caa4f15fc9bd?w=900&q=80&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'case-05',
    title: 'Lumina Skin Lab',
    businessType: 'Beauty brand · Ibadan',
    type: 'logo',
    problem: 'Canva mark that looked like every other skincare page.',
    solution: 'Soft lettermark + color system for product labels.',
    image:
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=80&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'case-06',
    title: 'Chop & Chill',
    businessType: 'Restaurant · Enugu',
    type: 'website',
    problem: 'Only discoverable via a friend’s Instagram story.',
    solution: 'Menu-first mobile site with WhatsApp ordering.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80&auto=format&fit=crop',
    featured: false,
  },
];

export const featuredWork = portfolio.filter((p) => p.featured);
