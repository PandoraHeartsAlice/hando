// SliderCatalog.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { ProductCard } from "../../components/Cards/FilterCard/FilterCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { DataStructureFilters } from "../../interface/DataStructureFilters";
import style from "./SliderCatalog.module.css";

export const SliderCatalog: React.FC = () => {
  const [filtersData, setFiltersData] = useState<DataStructureFilters[]>([]);
  useEffect(() => {
    axios.get("http://localhost:5000/filters")
      .then(response => {
        setFiltersData(response.data);
      })
      .catch(error => {
        console.error('Ошибка при получении данных о фильтрах:', error);
      });
  }, []);

  const popularFilters = Array.isArray(filtersData) ? filtersData.filter(
    (filter) => filter.isPopular
  ) : [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className={style.container}>
      <div className={style.containerTop}>
        <h2>Популярные товары</h2>
        <Link className={style.buttoncontainer} to="/stock">
          <button className={style.button}>
            <span>Все товары со скидкой</span>
          </button>
        </Link>
      </div>
      <Slider {...settings}>
        {popularFilters.map((filter) => (
          <div key={filter.model} className={style.cardcontainer}>
            <ProductCard key={filter.model} filter={filter} />
          </div>
        ))}
      </Slider>
    </section>
  );
};
