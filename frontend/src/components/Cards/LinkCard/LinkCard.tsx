import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./LinkCard.module.css";

interface LinkCardProps {
  title: string;
  image: string;
  path: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({ title, image, path }) => {
  const location = useLocation();

  return (
    <div
      className={`${style.container__card} ${
        location.pathname === path ? style.active : ""
      }`}
    >
      <Link
        className={style.card__link}
        to={path}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={style.card__text_wrapper}>
          <span className={style.card__text}>{title}</span>
        </div>
      </Link>
    </div>
  );
};
