// BasketContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";

import { DataStructureBrushes } from "../../interface/DataStructureBrushes";
import { DataStructureFilters } from "../../interface/DataStructureFilters";
import { DataStructureResin } from "../../interface/DataStructureResin";
import { DataStructureWires } from "../../interface/DataStructureWires";
import { DataStructureGuides } from "../../interface/DataStructureGuides";
import { DataStructureNozzles } from "../../interface/DataStructureNozzles";

export type Product =
  | (DataStructureBrushes & { type: "brushes" })
  | (DataStructureFilters & { type: "filters" })
  | (DataStructureGuides & { type: "guides" })
  | (DataStructureResin & { type: "resin" })
  | (DataStructureWires & { type: "wires" })
  | (DataStructureNozzles & { type: "nozzles" });

export type BasketItem = Product & {
  quantity: number;
  finalPrice?: number;
  selectedCoil?: number;
  selectedWire?: number;
  weight?: number;
};

type BasketContextType = {
  basketItems: BasketItem[];
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (itemId: string) => void;
  getTotalPrice: () => number;
  clearBasket: () => void;
};

const BasketContext = createContext<BasketContextType>({
  basketItems: [],
  addToBasket: () => {},
  removeFromBasket: () => {},
  getTotalPrice: () => 0,
  clearBasket: () => {},
});

export const useBasket = () => useContext(BasketContext);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>(() => {
    const savedBasketItems = localStorage.getItem("basketItems");
    return savedBasketItems ? JSON.parse(savedBasketItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("basketItems", JSON.stringify(basketItems));
  }, [basketItems]);

  const addToBasket = (item: BasketItem) => {
    setBasketItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => {
      return total + calculateDiscount(item) * item.quantity;
    }, 0);
  };

  const removeFromBasket = (itemId: string) => {
    setBasketItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === itemId && item.quantity > 1) {
          acc.push({ ...item, quantity: item.quantity - 1 });
        } else if (item.id !== itemId) {
          acc.push(item);
        }
        return acc;
      }, [] as BasketItem[])
    );
  };

  const clearBasket = () => {
    setBasketItems([]);
  };

  function calculateDiscount(item: BasketItem): number {
    // Проверяем, есть ли итоговая цена, и если да, то используем её
    if (item.finalPrice) {
      return item.finalPrice;
    }
    // Если нет итоговой цены, но есть скидка, то рассчитываем цену со скидкой
    if (item.discount.hasDiscount) {
      return item.price - (item.price * item.discount.amount) / 100;
    }
    // Если нет ни итоговой цены, ни скидки, возвращаем обычную цену
    return item.price;
  }

  return (
    <BasketContext.Provider
      value={{
        basketItems,
        addToBasket,
        removeFromBasket,
        getTotalPrice,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
