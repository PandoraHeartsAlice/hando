import React from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked,
  onChange,
  label,
}) => {
  return (
    <label className={styles.checkboxContainer}>
      <input
        id={id}
        className={styles.checkboxHidden}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span className={styles.checkboxCustom}></span>
      {label}
    </label>
  );
};
