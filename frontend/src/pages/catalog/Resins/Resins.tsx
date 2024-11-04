import { ResinCard } from "../../../components/Cards/ResinCard/ResinCard";
//import resinData from "../../../../public/resin.json";

import axios from "axios";

import style from "./Resins.module.css";
import { useEffect, useState } from "react";

export const Resin = () => {
  const [resins, setResins] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/resins")
      .then((response) => {
        setResins(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных:", error);
      });
  }, []);

  return (
    <div className={style.cont}>
      <h2>Ионообменная смола для ЭЭ проволочно-вырезных станков</h2>
      <div className={style.container}>
        <span className={style.cardContainer}>
          {resins.map((resin, index) => (
            <ResinCard key={index} resin={resin} />
          ))}
        </span>
        <div className={style.textContainer}>
          Ионообменная смола готова к эксплуатации и предназначена для
          обессоливания воды, применяемой в проволочно-вырезных станках в
          качестве диэлектрика. Смолу рекомендуется хранить при плюсовой
          температуре от 3 до 40 °С без прямого попадания солнечных лучей. При
          замерзании – медленно разморозить при комнатной температуре. Макс.
          рабочая температура: +60 °С. Мин. высота слоя: 100-600 мм. Рабочий
          диапазон pH: 0-14.Стойкость смолы существенно зависит от
          обрабатываемого материала.
        </div>
      </div>
      <div className={style.textContainer2}>
        Например, при резании алюминия выпадает глинозем, который плохо
        поддается фильтрации. При обработке твердого сплава для получения
        хорошей чистоты поверхности, нередко приходится повышать штатное
        сопротивление воды в 2 раза, что также сказывается на сроке службы
        смолы.
      </div>
    </div>
  );
};
