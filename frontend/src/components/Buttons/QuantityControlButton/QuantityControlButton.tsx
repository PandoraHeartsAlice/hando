import React from "react";
import style from "./QuantityControlButton.module.css";

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrement,
  onDecrement,
}) => (
  <div className={style.counter}>
    <button className={style.button} onClick={onDecrement}>
      <span className={style.textDec}>-</span>
    </button>
    <span className={style.quantity}>{quantity}</span>
    <button className={style.button} onClick={onIncrement}>
      +
    </button>
  </div>
);
