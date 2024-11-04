//BuyButton.tsx
import React from "react";
import style from "./BuyButton.module.css";

interface BuyButtonProps {
  onAddToBasket: () => void;
}

export const BuyButton: React.FC<BuyButtonProps> = ({ onAddToBasket }) => (
  <button className={style.button} onClick={onAddToBasket}>
    <span>КУПИТЬ</span>
  </button>
);
