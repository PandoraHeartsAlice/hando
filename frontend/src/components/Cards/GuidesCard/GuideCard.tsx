import React, { useState } from "react";
import { DataStructureGuides } from "../../../interface/DataStructureGuides.ts";
import style from "./GuideCard.module.css";

import { BuyButton } from "../../Buttons/BuyButton/BuyButton.tsx";
import { QuantityControl } from "../../Buttons/QuantityControlButton/QuantityControlButton.tsx";

import { useBasket } from "../../Context/BasketContext.tsx";

export const GuideCard: React.FC<{ guide: DataStructureGuides }> = ({
  guide,
}) => {
  const { addToBasket, removeFromBasket, basketItems } = useBasket();
  const basketItem = basketItems.find((item) => item.id === guide.id);

  const discountedPrice = guide.discount.hasDiscount
    ? guide.price - (guide.price * guide.discount.amount) / 100
    : guide.price;

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToBasket = () => {
    addToBasket({ ...guide, type: "guides", quantity: 1 });
    setIsAdded(true);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(guide.id);
    const itemIndex = basketItems.findIndex((item) => item.id === guide.id);
    if (itemIndex !== -1 && basketItems[itemIndex].quantity - 1 === 0) {
      setIsAdded(false);
    }
  };

  return (
    <article className={style.guideCard}>
      {guide.img && (
        <figure>
          <img
            src={new URL(guide.img, import.meta.url).href}
            alt={`Изображение ${guide.model}`}
            loading="lazy"
          />
        </figure>
      )}
      <div className={style.guideDetails}>
        <header>
          <h3 className={style.guideName}>{guide.name}</h3>
        </header>
        <div>Размер: {guide.size.join("x")}</div>
        <div>Подходит для моделей машин: {guide.machineModels.join(", ")}</div>
        <div>Особенности: {guide.peculiarities}</div>
        <section className={style.pricingActions}>
          <div className={style.priceContainer}>
            {guide.discount.hasDiscount ? (
              <>
                <del className={style.originalPrice}>{guide.price}</del>
                <ins className={style.discountedPrice}>{discountedPrice} ₽</ins>
              </>
            ) : (
              <span className={style.originalPriceNoStock}>
                {guide.price} ₽
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
                    addToBasket({ ...guide, type: "guides", quantity: 1 })
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
