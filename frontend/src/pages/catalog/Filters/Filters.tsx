import React, { useState, useEffect } from "react";
import axios from "axios";

import { DataStructureFilters } from "../../../interface/DataStructureFilters.ts";
import { SizeRangeSlider } from "../../../components/filters/sizeRangeSlider/SizeRangeSlider.tsx";
import { ProductCard } from "../../../components/Cards/FilterCard/FilterCard.tsx";
import { FirmFilter } from "../../../components/filters/FirmFilter/FirmFilter.tsx";
import { FittingFilter } from "../../../components/filters/FittingFilter/FittingFilter.tsx";
import { UnderLine } from "../../../components/UnderLine/UnderLine.tsx";

import style from "./Filters.module.css";

export const Filters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [withFitting, setWithFitting] = useState<boolean>(false);
  const [selectedFirms, setSelectedFirms] = useState<Set<string>>(new Set());

  const [ignoreSize, setIgnoreSize] = useState<boolean>(true);

  const [filtersData, setFiltersData] = useState<DataStructureFilters[]>([]);
  useEffect(() => {
    axios
      .get("/api/filters")
      .then((response) => {
        // Assuming the server response wraps the array in a `filters` property
        setFiltersData(response.data);
      })
      .catch((error) => {
        console.error("Ошибка при получении данных о фильтрах:", error);
      });
  }, []);

  const [sizeRange, setSizeRange] = useState({
    width: [50, 300],
    height: [50, 400],
    depth: [50, 450],
  });

  const [waterPressureRange, setWaterPressureRange] = useState<number[]>([
    0, 20,
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleFittingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWithFitting(event.target.checked);
  };

  const handleFirmChange =
    (firm: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedFirms((prevSelectedFirms) => {
        const newSelectedFirms = new Set(prevSelectedFirms);
        if (event.target.checked) {
          newSelectedFirms.add(firm);
        } else {
          newSelectedFirms.delete(firm);
        }
        return newSelectedFirms;
      });
    };

  const handleIgnoreSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIgnoreSize(event.target.checked);
  };

  const handleSizeChange =
    (dimension: keyof typeof sizeRange) => (values: number[]) => {
      if (ignoreSize) setIgnoreSize(false);
      setSizeRange((prevSizes) => ({
        ...prevSizes,
        [dimension]: values,
      }));
    };

  const handleWaterPressureChange = (values: number[]) =>
    setWaterPressureRange(values);

  const filteredFilters = filtersData
    .filter((filter: DataStructureFilters) => {
      const matchesSearchTerm =
        filter.firm.toLowerCase().includes(searchTerm) ||
        filter.model.toLowerCase().includes(searchTerm);
      const matchesFitting = !withFitting || filter.withFitting;
      const matchesFirm =
        selectedFirms.size === 0 || selectedFirms.has(filter.firm);
      const matchesSize =
        ignoreSize ||
        (filter.size[0] >= sizeRange.width[0] &&
          filter.size[1] <= sizeRange.width[1] &&
          filter.size[0] >= sizeRange.height[0] &&
          filter.size[1] <= sizeRange.height[1] &&
          filter.size[0] >= sizeRange.depth[0] &&
          filter.size[1] <= sizeRange.depth[1]);
      const matchesWaterPressure =
        filter.waterPressure[0] >= waterPressureRange[0] &&
        filter.waterPressure[1] <= waterPressureRange[1];

      return (
        matchesSearchTerm &&
        matchesFitting &&
        matchesFirm &&
        matchesSize &&
        matchesWaterPressure
      );
    })
    .sort((a, b) => (a.isPopular === b.isPopular ? 0 : a.isPopular ? -1 : 1));

  const [displayedItemCount, setDisplayedItemCount] = useState<number>(0);

  useEffect(() => {
    setDisplayedItemCount(filteredFilters.length);
  }, [filteredFilters]);

  const firms = Array.from(
    new Set(filtersData.map((filter: DataStructureFilters) => filter.firm))
  );

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <input
          type="text"
          placeholder="Поиск по фирме или модели..."
          onChange={handleSearchChange}
        />
        <div className={style.numbOfElement}>
          Всего отображено товаров: {displayedItemCount}
        </div>
        <UnderLine />
        <div className={style.textFirm}>Фирмы:</div>
        <div>
          <FirmFilter
            firms={firms}
            selectedFirms={selectedFirms}
            onFirmChange={handleFirmChange}
          />
        </div>
        <UnderLine />
        <div>
          <FittingFilter
            withFitting={withFitting}
            onFittingChange={handleFittingChange}
          />
        </div>
        <UnderLine />
        <SizeRangeSlider
          ranges={[
            sizeRange.width,
            sizeRange.height,
            sizeRange.depth,
            waterPressureRange,
          ]}
          labels={["Ширина", "Высота", "Глубина", "Давление воды"]}
          min={[0, 0, 0, 0]}
          max={[500, 500, 500, 20]}
          steps={[10, 10, 10, 1]}
          onChangeHandlers={[
            handleSizeChange("width"),
            handleSizeChange("height"),
            handleSizeChange("depth"),
            handleWaterPressureChange,
          ]}
          ignoreSize={ignoreSize}
          onIgnoreSizeChange={handleIgnoreSizeChange}
        />
      </div>
      <div className={style.products}>
        {filteredFilters.map((filter, index) => (
          <ProductCard key={index} filter={filter} />
        ))}
      </div>
    </div>
  );
};
