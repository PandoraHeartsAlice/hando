//DataStructureFilters.ts
export interface DataStructureFilters {
  id: string;
  name: string;
  firm: string;
  model: string;
  size: number[];
  waterPressure: number[];
  withFitting: boolean;
  machineModels: string[];
  peculiarities: string;
  price: number;
  discount: { hasDiscount: boolean; amount: number };
  isPopular: boolean;
  img: string;
}
