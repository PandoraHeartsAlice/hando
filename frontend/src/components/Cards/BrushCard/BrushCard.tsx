import React, { useState } from "react";
import { DataStructureBrushes } from "../../../interface/DataStructureBrushes.ts";
import style from "./BrushCard.module.css";

import { BuyButton } from "../../Buttons/BuyButton/BuyButton.tsx";
import { QuantityControl } from "../../Buttons/QuantityControlButton/QuantityControlButton.tsx";

import { useBasket } from "../../Context/BasketContext.tsx";

export const BrushCard: React.FC<{ brush: DataStructureBrushes }> = ({
  brush,
}) => {
  const { addToBasket, removeFromBasket, basketItems } = useBasket();
  const basketItem = basketItems.find((item) => item.id === brush.id);

  const discountedPrice = brush.discount.hasDiscount
    ? brush.price - (brush.price * brush.discount.amount) / 100
    : brush.price;

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToBasket = () => {
    addToBasket({ ...brush, type: "brushes", quantity: 1 });
    setIsAdded(true);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(brush.id);
    const itemIndex = basketItems.findIndex((item) => item.id === brush.id);
    if (itemIndex !== -1 && basketItems[itemIndex].quantity - 1 === 0) {
      setIsAdded(false);
    }
  };

  return (
    <article className={style.brushCard}>
      {brush.img && (
        <figure>
          <img
            src={new URL(brush.img, import.meta.url).href}
            alt={`Изображение ${brush.model}`}
            loading="lazy"
          />
        </figure>
      )}
      <div className={style.brushDetails}>
        <header>
          <h3 className={style.brushName}>{brush.name}</h3>
        </header>
        <div>Размер: {brush.size.join("x")}</div>
        <div>Подходит для моделей машин: {brush.machineModels.join(", ")}</div>
        <div>Особенности: {brush.peculiarities}</div>
        <section className={style.pricingActions}>
          <div className={style.priceContainer}>
            {brush.discount.hasDiscount ? (
              <>
                <del className={style.originalPrice}>{brush.price}</del>
                <ins className={style.discountedPrice}>{discountedPrice} ₽</ins>
              </>
            ) : (
              <span className={style.originalPriceNoStock}>
                {brush.price} ₽
              </span>
            )}
          </div>
          <div className={style.purchaseButtonContainer}>
            {!isAdded && (
              <div className={style.buttonBuyContainerNoStock}>
                <BuyButton onAddToBasket={handleAddToBasket} />
              </div>
            )}
            {isAdded && basketItem && (
              <div className={style.buttonQuantityContainer}>
                <QuantityControl
                  quantity={basketItem.quantity}
                  onIncrement={() =>
                    addToBasket({ ...brush, type: "brushes", quantity: 1 })
                  }
                  onDecrement={handleRemoveFromBasket}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </article>
  );
};
