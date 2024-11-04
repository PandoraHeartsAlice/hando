//ResinCars.tsx
import React, { useState } from "react";
import { DataStructureResin } from "../../../interface/DataStructureResin.ts";
import style from "./ResinCard.module.css";

import { BuyButton } from "../../Buttons/BuyButton/BuyButton.tsx";
import { QuantityControl } from "../../Buttons/QuantityControlButton/QuantityControlButton.tsx";

import { useBasket } from "../../Context/BasketContext.tsx";

export const ResinCard: React.FC<{ resin: DataStructureResin }> = ({
  resin,
}) => {
  const { addToBasket, removeFromBasket, basketItems } = useBasket();
  const basketItem = basketItems.find((item) => item.id === resin.id);

  const discountedPrice = resin.discount.hasDiscount
    ? resin.price - (resin.price * resin.discount.amount) / 100
    : resin.price;

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToBasket = () => {
    addToBasket({ ...resin, type: "resin", quantity: 1 });
    setIsAdded(true);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(resin.id);
    const itemIndex = basketItems.findIndex((item) => item.id === resin.id);
    if (itemIndex !== -1 && basketItems[itemIndex].quantity - 1 === 0) {
      setIsAdded(false);
    }
  };

  return (
    <div className={style.card}>
      {resin.img && (
        <img
          src={new URL(resin.img, import.meta.url).href}
          alt={`Изображение ${resin.model}`}
        />
      )}
      <div className={style.cardContent}>
        <h3 className={style.cardName}>{resin.name}</h3>
        <div>Фирма: {resin.firm}</div>
        <div>Модель: {resin.model}</div>
        <div>Особенности: {resin.peculiarities}</div>
        <div>Популярный: {resin.isPopular ? "Да" : "Нет"}</div>
        <div className={style.priceAndButtonContainer}>
          {resin.discount.hasDiscount ? (
            <>
              <span className={style.originalPrice}>{resin.price}</span>
              <span className={style.discountedPrice}>{discountedPrice} ₽</span>
            </>
          ) : (
            <span>{resin.price}₽</span>
          )}
          <div className={style.buttonBuyContainer}>
            {!isAdded && <BuyButton onAddToBasket={handleAddToBasket} />}
            {isAdded && basketItem && (
              <div className={style.buttonQuantityContainer}>
                <QuantityControl
                  quantity={basketItem.quantity}
                  onIncrement={() =>
                    addToBasket({ ...resin, type: "resin", quantity: 1 })
                  }
                  onDecrement={handleRemoveFromBasket}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
