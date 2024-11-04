//ResinCars.tsx
import React, { useState } from "react";
import { DataStructureWires } from "../../../interface/DataStructureWires.ts";
import { DataStructureCoils } from "../../../interface/DataStructureCoils.ts";
import style from "./WireCard.module.css";

import { BuyButton } from "../../Buttons/BuyButton/BuyButton.tsx";
import { QuantityControl } from "../../Buttons/QuantityControlButton/QuantityControlButton.tsx";

import { useBasket, BasketItem } from "../../Context/BasketContext.tsx";

export const WireCard: React.FC<{ wire: DataStructureWires, coilsData: DataStructureCoils }> = ({ wire, coilsData }) => {
  const { addToBasket, removeFromBasket, basketItems } = useBasket();
  const basketItem = basketItems.find((item) => item.id === wire.id);

  const [selectedCoil, setSelectedCoil] = useState<number>(
    coilsData.diameter_coils[0]
  );
  const [selectedWire, setSelectedWire] = useState<number>(
    coilsData.diameter_wire[0]
  );

  const calculateFinalPrice = (
    wire: DataStructureWires,
    coil: number,
    wireDiameter: number
  ) => {
    const priceAfterDiscount = wire.discount.hasDiscount
      ? wire.price - (wire.price * wire.discount.amount) / 100
      : wire.price;
    return (8000 * priceAfterDiscount * coil * wireDiameter * 3.1) / 100000;
  };

  const calculateWeight = (coil: number, wire: number) => {
    return (8000 * coil * wire * 3.1) / 100000;
  };

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToBasket = () => {
    const finalPrice = calculateFinalPrice(wire, selectedCoil, selectedWire);
    const weight = calculateWeight(selectedCoil, selectedWire);

    const basketItem: BasketItem = {
      ...wire,
      type: "wires",
      quantity: 1,
      selectedCoil,
      selectedWire,
      weight,
      finalPrice,
    };

    addToBasket(basketItem);
    setIsAdded(true);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(wire.id);
    const itemIndex = basketItems.findIndex((item) => item.id === wire.id);
    if (itemIndex !== -1 && basketItems[itemIndex].quantity - 1 === 0) {
      setIsAdded(false);
    }
  };

  const ButtonSelection: React.FC<{
    options: number[];
    selectedOption: number;
    setSelectedOption: React.Dispatch<React.SetStateAction<number>>;
  }> = ({ options, selectedOption, setSelectedOption }) => {
    return (
      <div className={style.buttonGroup}>
        {options.map((option) => (
          <button
            key={option}
            className={
              selectedOption === option ? style.selectedButton : style.button
            }
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className={style.card}>
      {wire.img && (
        <img
          src={new URL(wire.img, import.meta.url).href}
          alt={`Изображение ${wire.model}`}
        />
      )}
      <div className={style.cardContent}>
        <h3 className={style.cardName}>{wire.name}</h3>
        <div>Фирма: {wire.firm}</div>
        <div className={style.selectionContainer}>
          <div className={style.textButtonUp}>Диметр проволки мм:</div>
          <ButtonSelection
            options={coilsData.diameter_coils}
            selectedOption={selectedCoil}
            setSelectedOption={setSelectedCoil}
          />
          <div className={style.textButtonUp}>Диметр катушки мм:</div>
          <ButtonSelection
            options={coilsData.diameter_wire}
            selectedOption={selectedWire}
            setSelectedOption={setSelectedWire}
          />
        </div>
        <div>
          Вес:{calculateWeight(selectedCoil, selectedWire)} - {wire.price} ₽/кг
        </div>
        <div className={style.priceAndButtonContainer}>
          <div className={style.priceContainer}>
            {wire.discount.hasDiscount ? (
              <>
                <span className={style.originalPrice}>
                  {calculateFinalPrice(wire, selectedCoil, selectedWire)}₽
                </span>
                <span className={style.discountedPrice}>
                  {calculateFinalPrice(wire, selectedCoil, selectedWire)} ₽
                </span>
              </>
            ) : (
              <span>
                {calculateFinalPrice(wire, selectedCoil, selectedWire)}₽
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
                    addToBasket({ ...wire, type: "wires", quantity: 1 })
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
