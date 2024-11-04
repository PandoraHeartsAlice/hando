import React, { useState } from "react";
import { DataStructureFilters } from "../../../interface/DataStructureFilters.ts";
import style from "./FilterCard.module.css";

import { BuyButton } from "../../Buttons/BuyButton/BuyButton.tsx";
import { QuantityControl } from "../../Buttons/QuantityControlButton/QuantityControlButton.tsx";

import { useBasket } from "../../Context/BasketContext.tsx";

export const ProductCard: React.FC<{ filter: DataStructureFilters }> = ({
  filter,
}) => {
  const { addToBasket, removeFromBasket, basketItems } = useBasket();
  const basketItem = basketItems.find((item) => item.id === filter.id);

  const discountedPrice = filter.discount.hasDiscount
    ? filter.price - (filter.price * filter.discount.amount) / 100
    : filter.price;

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToBasket = () => {
    addToBasket({ ...filter, type: "filters", quantity: 1 });
    setIsAdded(true);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(filter.id);
    const itemIndex = basketItems.findIndex((item) => item.id === filter.id);
    if (itemIndex !== -1 && basketItems[itemIndex].quantity - 1 === 0) {
      setIsAdded(false);
    }
  };

  return (
    <article className={style.productCard}>
      {filter.img && (
        <figure>
          <img
            src={new URL(filter.img, import.meta.url).href}
            alt={`Изображение ${filter.model}`}
            loading="lazy"
          />
        </figure>
      )}
      <div className={style.productDetails}>
        <header>
          <h3 className={style.productName}>{filter.name}</h3>
        </header>
        <div>Размер: {filter.size.join("x")}</div>
        <div>Давление воды: {filter.waterPressure.join(" - ")}</div>
        <div>С фитингом: {filter.withFitting ? "Да" : "Нет"}</div>
        <section className={style.pricingActions}>
          <div className={style.priceContainer}>
            {filter.discount.hasDiscount ? (
              <>
                <del className={style.originalPrice}>{filter.price}</del>
                <ins className={style.discountedPrice}>{discountedPrice} ₽</ins>
              </>
            ) : (
              <span className={style.originalPriceNoStock}>
                {filter.price} ₽
              </span>
            )}
          </div>
          <div className={style.buttonBuyContainer}>
            {!isAdded && <BuyButton onAddToBasket={handleAddToBasket} />}
            {isAdded && basketItem && (
              <div className={style.buttonQuantityContainer}>
                <QuantityControl
                  quantity={basketItem.quantity}
                  onIncrement={() =>
                    addToBasket({ ...filter, type: "filters", quantity: 1 })
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
