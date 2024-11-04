import React from "react";
import { Checkbox } from "../../Checkbox/Checkbox.tsx";
//import style from "./FirmFilter.module.css";

interface FirmFilterProps {
  firms: string[];
  selectedFirms: Set<string>;
  onFirmChange: (
    firm: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FirmFilter: React.FC<FirmFilterProps> = ({
  firms,
  selectedFirms,
  onFirmChange,
}) => {
  return (
    <div>
      {firms.map((firm, index) => (
        <Checkbox
          key={index}
          id={`checkbox-${index}`}
          checked={selectedFirms.has(firm)}
          onChange={onFirmChange(firm)}
          label={firm}
        />
      ))}
    </div>
  );
};
