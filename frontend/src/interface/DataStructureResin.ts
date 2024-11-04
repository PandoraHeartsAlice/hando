//DataStructureResin.ts
export interface DataStructureResin {
  id: string;
  name: string;
  firm: string;
  model: string;
  peculiarities: string;
  img: string;
  price: number;
  discount: { hasDiscount: boolean; amount: number };
  isPopular: boolean;
}
