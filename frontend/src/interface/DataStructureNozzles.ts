//DataStructureNozzles.ts
export interface DataStructureNozzles {
  id: string;
  name: string;
  firm: string;
  model: string;
  size: [number, number];
  machineModels: string[];
  peculiarities: string;
  img: string;
  price: number;
  discount: { hasDiscount: boolean; amount: number };
  isPopular: boolean;
}
