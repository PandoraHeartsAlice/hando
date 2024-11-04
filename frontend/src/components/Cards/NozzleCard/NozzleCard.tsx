import React, { useState } from "react";
import { DataStructureNozzles } from "../../../interface/DataStructureNozzles.ts";
import style from "./NozzleCard.module.css";

import { BuyButton } from "../../Buttons/BuyButton/BuyButton.tsx";
import { QuantityControl } from "../../Buttons/QuantityControlButton/QuantityControlButton.tsx";

import { useBasket } from "../../Context/BasketContext.tsx";

export const NozzleCard: React.FC<{ nozzle: DataStructureNozzles }> = ({
  nozzle,
}) => {
  const { addToBasket, removeFromBasket, basketItems } = useBasket();
  const basketItem = basketItems.find((item) => item.id === nozzle.id);

  const discountedPrice = nozzle.discount.hasDiscount
    ? nozzle.price - (nozzle.price * nozzle.discount.amount) / 100
    : nozzle.price;

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToBasket = () => {
    addToBasket({ ...nozzle, type: "nozzles", quantity: 1 });
    setIsAdded(true);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(nozzle.id);
    const itemIndex = basketItems.findIndex((item) => item.id === nozzle.id);
    if (itemIndex !== -1 && basketItems[itemIndex].quantity - 1 === 0) {
      setIsAdded(false);
    }
  };

  return (
    <article className={style.nozzleCard}>
      {nozzle.img && (
        <figure>
          <img
            src={new URL(nozzle.img, import.meta.url).href}
            alt={`Изображение ${nozzle.model}`}
            loading="lazy"
          />
        </figure>
      )}
      <div className={style.nozzleDetails}>
        <header>
          <h3 className={style.nozzleName}>{nozzle.name}</h3>
        </header>
        <div>Размер: {nozzle.size.join("x")}</div>
        <div>Подходит для моделей машин: {nozzle.machineModels.join(", ")}</div>
        <div>Особенности: {nozzle.peculiarities}</div>
        <section className={style.pricingActions}>
          <div className={style.priceContainer}>
            {nozzle.discount.hasDiscount ? (
              <>
                <del className={style.originalPrice}>{nozzle.price}</del>
                <ins className={style.discountedPrice}>{discountedPrice} ₽</ins>
              </>
            ) : (
              <span className={style.originalPriceNoStock}>
                {nozzle.price} ₽
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
                    addToBasket({ ...nozzle, type: "nozzles", quantity: 1 })
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
