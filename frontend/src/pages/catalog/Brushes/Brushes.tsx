import axios from "axios";
import { useState, useEffect } from "react";
import { BrushCard } from "../../../components/Cards/BrushCard/BrushCard.tsx";
import { DataStructureBrushes } from "../../../interface/DataStructureBrushes.ts";
import style from "./Brushes.module.css";

export const Brushes = () => {
  const [brushes, setBrushes] = useState<DataStructureBrushes[]>([]);

  useEffect(() => {
    axios
      .get("/api/brushes")
      .then((response) => {
        // Предполагается, что ответ содержит массив кистей в свойстве data
        const formattedBrushes: DataStructureBrushes[] = response.data.map(
          (brush: DataStructureBrushes) => ({
            // Явно указываем тип для brush
            ...brush,
            size: [brush.size[0], brush.size[1]],
          })
        );
        setBrushes(formattedBrushes);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных о кистях:", error);
      });
  }, []);

  return (
    <div className={style.container}>
      <section className={style.brushes}>
        {brushes.map((brush) => (
          <BrushCard key={brush.id} brush={brush} />
        ))}
      </section>
    </div>
  );
};
