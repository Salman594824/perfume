
export enum StockStatus {
  IN_STOCK = 'In Stock',
  OUT_OF_STOCK = 'Out of Stock',
  LIMITED_STOCK = 'Limited Stock'
}

export interface FragranceNotes {
  top: string[];
  middle: string[];
  base: string[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  moderated: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  discountPrice?: number;
  category: string;
  stockStatus: StockStatus;
  images: string[];
  notes: FragranceNotes;
  description: string;
  reviews: Review[];
  featured: boolean;
  seo: {
    title: string;
    description: string;
    slug: string;
  };
}

export interface PolicyPage {
  id: string;
  title: string;
  content: string;
  lastUpdated: string;
  enabled: boolean;
  seo: {
    title: string;
    description: string;
    slug: string;
  };
}

export interface SiteSettings {
  contact: {
    email: string;
    address: string;
    phone: string;
  };
  social: {
    instagram: string;
    pinterest: string;
    whatsapp: string;
    tiktok: string;
  };
  newsletter: {
    title: string;
    successMessage: string;
  };
}
