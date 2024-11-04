import React, { useState, useEffect } from "react";
import {
  useBasket,
  BasketItem,
} from "../../components/Context/BasketContext.tsx";

import style from "./Basket.module.css";
import ProductDetails from "./ProductDetails";

export const Basket = () => {
  const [showDeletePromptForId, setShowDeletePromptForId] = useState<
    string | null
  >(null);

  const modifiedRemoveFromBasket = (id: string) => {
    const item = basketItems.find((item) => item.id === id);
    if (item && item.quantity === 1) {
      setShowDeletePromptForId(id);
    } else {
      removeFromBasket(id);
    }
  };

  const handleDeleteConfirmation = (shouldDelete: boolean, id: string) => {
    if (shouldDelete) {
      removeFromBasket(id);
    }
    setShowDeletePromptForId(null);
  };

  const handlePageClick = (event: MouseEvent) => {
    const isActionButton = (event.target as HTMLElement).matches(
      `.${style.actionButton}`
    );
    const isItemAction = (event.target as HTMLElement).closest(
      `.${style.itemActions}`
    );

    if (!isActionButton || !isItemAction) {
      setShowDeletePromptForId(null);
    }
  };

  const {
    basketItems,
    addToBasket,
    removeFromBasket,
    getTotalPrice,
    clearBasket,
  } = useBasket();

  const calculateDiscountedPrice = (item: BasketItem): number => {
    if (item.finalPrice) {
      return item.finalPrice;
    }
    if (item.discount.hasDiscount) {
      return item.price - (item.price * item.discount.amount) / 100;
    }
    return item.price;
  };

  interface OrderData {
    name: string | null;
    email: string | null;
    phone: string | null;
    items: {
      id: string;
      name: string;
      price: number;
      quantity: number;
    }[];
    total: number;
  }

  const submitOrder = async (orderData: OrderData) => {
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Ошибка при отправке заказа:", error);
    }
  };

  const handleOrderSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const orderData: OrderData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      items: basketItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: calculateDiscountedPrice(item),
        quantity: item.quantity,
      })),
      total: getTotalPrice(),
    };
    submitOrder(orderData);
  };

  useEffect(() => {
    document.addEventListener("click", handlePageClick);
    return () => {
      document.removeEventListener("click", handlePageClick);
    };
  }, [showDeletePromptForId]);

  return (
    <div className={style.basketContainer}>
      {basketItems.map((item) => (
        <div key={item.id} className={style.item}>
          <div className={style.cardImg}>
            <img
              src={item.img}
              alt={item.name}
              className={style.productImage}
            />
          </div>
          <ProductDetails item={item} />
          <div
            className={style.itemActions}
            onClick={(e) => e.stopPropagation()}
          >
            {showDeletePromptForId === item.id ? (
              <>
                <button
                  data-delete
                  onClick={() => handleDeleteConfirmation(true, item.id)}
                  className={style.actionButton}
                >
                  Удалить
                </button>
                <button
                  onClick={() => handleDeleteConfirmation(false, item.id)}
                  className={style.actionButton}
                >
                  Оставить
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => modifiedRemoveFromBasket(item.id)}
                  className={style.actionButton}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => addToBasket({ ...item, quantity: 1 })}
                  className={style.actionButton}
                >
                  +
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      <div>
        <strong>Общая стоимость:</strong> {getTotalPrice()} руб.
      </div>
      <button onClick={clearBasket} className={style.clearButton}>
        Очистить корзину
      </button>
      <form onSubmit={handleOrderSubmit}>
        <input type="text" name="name" placeholder="Ваше имя" required />
        <input type="email" name="email" placeholder="Ваш email" required />
        <input type="tel" name="phone" placeholder="Ваш телефон" required />
        <button type="submit">Оформить заказ</button>
      </form>
    </div>
  );
};
