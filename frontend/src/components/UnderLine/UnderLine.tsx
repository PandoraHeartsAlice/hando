import React from "react";
import styles from "./UnderLine.module.css";

type UnderLineProps = {
  children?: React.ReactNode;
};

export const UnderLine: React.FC<UnderLineProps> = ({ children }) => {
  return <div className={styles.underLine}>{children}</div>;
};
