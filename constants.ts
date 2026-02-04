
import { Product, StockStatus, SiteSettings, PolicyPage } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Noir Éclat',
    brand: 'MONTCL△IRÉ Privé',
    price: 245,
    category: 'Unisex',
    stockStatus: StockStatus.IN_STOCK,
    images: ['https://picsum.photos/seed/noir1/800/1000', 'https://picsum.photos/seed/noir2/800/1000'],
    notes: {
      top: ['Bergamot', 'Saffron'],
      middle: ['Bulgarian Rose', 'Oud'],
      base: ['Patchouli', 'Leather', 'Amber']
    },
    description: 'A dark, magnetic fragrance that captures the essence of midnight in a Parisian garden.',
    reviews: [],
    featured: true,
    seo: { title: 'Noir Éclat Luxury Oud Fragrance', description: 'Experience the dark mystery of Noir Éclat.', slug: 'noir-eclat' }
  },
  {
    id: '2',
    name: 'Emerald Vetiver',
    brand: 'MONTCL△IRÉ',
    price: 185,
    discountPrice: 155,
    category: 'Men',
    stockStatus: StockStatus.LIMITED_STOCK,
    images: ['https://picsum.photos/seed/vetiver1/800/1000'],
    notes: {
      top: ['Grapefruit', 'Pink Pepper'],
      middle: ['Geranium', 'Vetiver'],
      base: ['Cedar', 'Benzoin']
    },
    description: 'Crisp, earthy, and undeniably sophisticated. The definitive scent for the modern gentleman.',
    reviews: [],
    featured: true,
    seo: { title: 'Emerald Vetiver Men\'s Scent', description: 'Fresh and earthy vetiver fragrance.', slug: 'emerald-vetiver' }
  },
  {
    id: '3',
    name: 'Ivory Musk',
    brand: 'MONTCL△IRÉ',
    price: 210,
    category: 'Women',
    stockStatus: StockStatus.IN_STOCK,
    images: ['https://picsum.photos/seed/ivory1/800/1000'],
    notes: {
      top: ['White Pear', 'Aldehydes'],
      middle: ['Lily of the Valley', 'Iris'],
      base: ['White Musk', 'Sandalwood']
    },
    description: 'A cloud-like softness that lingers on the skin, evoking purity and timeless elegance.',
    reviews: [],
    featured: false,
    seo: { title: 'Ivory Musk Elegant Perfume', description: 'Soft and clean ivory musk fragrance.', slug: 'ivory-musk' }
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  contact: {
    email: 'montclaire91@gmail.com',
    address: 'Emerald Tower, Block 5, Clifton, Karachi, 75600, Karachi, Pakistan',
    phone: '+92 337 1292112'
  },
  social: {
    instagram: 'https://instagram.com/montclaire',
    pinterest: 'https://pinterest.com/montclaire',
    whatsapp: 'https://wa.me/923371292112',
    tiktok: 'https://tiktok.com/@montclaire'
  },
  newsletter: {
    title: 'Stay Connected',
    successMessage: 'Welcome to the inner circle of MONTCL△IRÉ.'
  }
};

export const INITIAL_POLICIES: PolicyPage[] = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: 'At Montclaire (MONTCL△IRÉ), we take the privacy and security of our customers and website visitors very seriously. Protecting your personal information is a top priority, and we are committed to maintaining your trust by handling your data with care, transparency, and responsibility.\n\nInformation We Collect: We may collect personal information including full name, email, shipping address, and payment details to fulfill orders efficiently.',
    lastUpdated: '2023-10-27',
    enabled: true,
    seo: { title: 'Privacy Policy | MONTCL△IRÉ', description: 'Our commitment to your privacy.', slug: 'privacy-policy' }
  },
  {
    id: 'shipping',
    title: 'Shipping Policy',
    content: 'Montclaire currently ships within Pakistan only, using reliable courier partners. Orders are processed within 1–3 business days after confirmation. Estimated delivery time is 3–7 business days, depending on destination. Shipping charges are displayed at checkout.',
    lastUpdated: '2023-10-27',
    enabled: true,
    seo: { title: 'Shipping Policy | MONTCL△IRÉ', description: 'Information about delivery and coverage.', slug: 'shipping-policy' }
  },
  {
    id: 'accessibility',
    title: 'Accessibility Statement',
    content: 'Montclaire is committed to ensuring that our website and digital services are accessible to everyone, including individuals with disabilities. Features include alternative text for images, color contrast compliance, and screen reader compatibility.',
    lastUpdated: '2023-10-27',
    enabled: true,
    seo: { title: 'Accessibility Statement | MONTCL△IRÉ', description: 'Our commitment to digital inclusion.', slug: 'accessibility' }
  }
];
