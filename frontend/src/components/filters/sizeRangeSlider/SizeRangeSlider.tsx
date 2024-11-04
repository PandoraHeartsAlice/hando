// SizeRangeSlider.tsx
import React from "react";
import { Range } from "react-range";
import style from "./SizeRangeSlider.module.css";

import { Checkbox } from "../../../components/Checkbox/Checkbox";
import { SizeRangeSliderProps } from "../../../interface/SizeRangeSliderProps.ts";

export const SizeRangeSlider: React.FC<SizeRangeSliderProps> = ({
  ranges,
  labels,
  min,
  max,
  steps,
  onChangeHandlers,
  ignoreSize,
  onIgnoreSizeChange,
}) => {
  return (
    <div className={style.sliderContainer}>
      <div className={style.ignoreSize}>
        <Checkbox
          id="ignore-size-checkbox"
          checked={ignoreSize}
          onChange={onIgnoreSizeChange}
          label="Игнорировать размеры"
        />
      </div>
      {ranges.map((range, index) => (
        <div key={index} className={style.rangeWrapper}>
          <label>{labels[index]}:</label>
          <Range
            step={steps[index]}
            min={min[index]}
            max={max[index]}
            values={range}
            onChange={onChangeHandlers[index]}
            renderTrack={({ props, children }) => {
              const activeTrackStyle = {
                ...props.style,
                backgroundColor: "green",
                left: `${
                  ((range[0] - min[index]) / (max[index] - min[index])) * 100
                }%`,
                right: `${
                  100 -
                  ((range[1] - min[index]) / (max[index] - min[index])) * 100
                }%`,
              };
              return (
                <div {...props} className={style.trackStyle}>
                  <div
                    className={style.activeTrackStyle}
                    style={activeTrackStyle}
                  />
                  {children}
                </div>
              );
            }}
            renderThumb={({ props }) => (
              <div {...props} className={style.thumbStyle} />
            )}
          />
          <span>
            Текущее значение: {range[0]} - {range[1]} (Мин: {min[index]}, Макс:{" "}
            {max[index]})
          </span>
        </div>
      ))}
    </div>
  );
};
