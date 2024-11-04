import axios from "axios";
import { useState, useEffect } from "react";
import { NozzleCard } from "../../../components/Cards/NozzleCard/NozzleCard.tsx";
import { DataStructureNozzles } from "../../../interface/DataStructureNozzles.ts";
import style from "./Nozzles.module.css";

export const Nozzles = () => {
  const [nozzles, setNozzles] = useState<DataStructureNozzles[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/nozzles")
      .then((response) => {
        // Предполагается, что ответ содержит массив соплов в свойстве data
        setNozzles(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных о соплах:", error);
      });
  }, []);

  return (
    <div className={style.container}>
      <section className={style.nozzles}>
        {nozzles.map((nozzle) => (
          <NozzleCard key={nozzle.id} nozzle={nozzle} />
        ))}
      </section>
    </div>
  );
};
