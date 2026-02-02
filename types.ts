
export interface Perfume {
  id: string;
  name: string;
  brand: string;
  notes: string[];
  description: string;
  price: number;
  image: string;
  category: 'floral' | 'woody' | 'oriental' | 'fresh';
}

export interface CartItem extends Perfume {
  quantity: number;
}

export interface ScentRecommendation {
  scentProfile: string;
  explanation: string;
  suggestedNotes: string[];
}
