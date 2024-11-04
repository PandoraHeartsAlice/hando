// FittingFilter.tsx
import React from "react";
import { Checkbox } from "../../Checkbox/Checkbox.tsx";
import styles from "./FittingFilter.module.css";

interface FittingFilterProps {
  withFitting: boolean;
  onFittingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FittingFilter: React.FC<FittingFilterProps> = ({
  withFitting,
  onFittingChange,
}) => {
  return (
    <div className={styles.fittingContainer}>
      <Checkbox
        id="fitting-checkbox"
        checked={withFitting}
        onChange={onFittingChange}
        label="С фитингом"
      />
    </div>
  );
};
